#!/usr/bin/env node
// check_funnel.mjs: checks a live GoHighLevel funnel, step by step, at phone and desktop size. No installs.
// Drives your installed Google Chrome over the DevTools protocol (Node 22+, built-in WebSocket).
//
// Usage:
//   node tools/check_funnel.mjs <funnel.json> [--out DIR] [--live] [--json]
//   node tools/check_funnel.mjs --help
// funnel.json (template: templates/funnel.json; example: examples/rickey-headstart-funnel/funnel.json):
//   { "name": "…", "steps": [
//       { "type": "sales",    "url": "https://REPLACE-ME.invalid/offer-page",     "root": "xx-root",   "next": "/offer-checkout" },
//       { "type": "checkout", "url": "https://REPLACE-ME.invalid/offer-checkout", "root": "xxc-root",  "bump": true, "price": "$27" },
//       { "type": "upsell",   "url": "https://REPLACE-ME.invalid/offer-upsell",   "root": "xxu-root",  "yes": "YES", "yes_product": "<Internal Product ID>", "no": "/offer-thank-you" },
//       { "type": "thankyou", "url": "https://REPLACE-ME.invalid/offer-thank-you", "root": "xxty-root" } ] }
//   "root" is optional but recommended: with it, the page passes "injected" only if that element holds our HTML.
//   The tool refuses to run while any value still holds a template placeholder (REPLACE-ME, YOUR-DOMAIN, OFFER-, [name], $PRICE, a .invalid host).
//
// What it checks (PASS/FAIL per step; screenshots in --out):
//   every step   loads, our HTML is injected (not blank, not a GitHub 404), no sideways scroll on a phone
//   sales        at least one button/link goes to the checkout step ("next"); NOTE when a button with the same label jumps down the page instead
//   checkout     the order form is there; on a phone the first form field is on the first screen (≤ 852px);
//                the phone card's "See everything included" toggle, if there is one, opens and closes (NOTE if there is none);
//                "Select product" is hidden; the order bump is there (if "bump": true) and starts unticked; the price shows inside
//                the order form; no visible address or shipping field; NOTE when the funnel is in test mode
//   upsell       a YES button and a NO link to the next step ("no"), and the YES button's REAL ACTION, read from the page data:
//                it must be sell-product (one click up/down sell product) with a product. A plain look at the button can't tell.
//   thankyou     loads with content; no link to a file (pdf, zip, doc: paid files stay behind the login); NOTE on greyed links
//   NOTE lines don't fail the run: test mode, no privacy/terms link, greyed links. Settle or list each one before real traffic.
// Exit code: 0 = every row PASS; 1 = at least one FAIL, or the run itself failed (Chrome, network); 2 = usage or input error.
// It never submits a form, clicks a buy button or enters card details.

import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, existsSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const USAGE = `Usage: node tools/check_funnel.mjs <funnel.json> [--out DIR] [--live] [--json]

  <funnel.json>  the steps to check (template: templates/funnel.json)
  --out DIR      save one screenshot per step and size into DIR
  --live         fail if the funnel is in test mode (use it for the final run before real traffic)
  --json         print machine-readable results instead of the report
  -h, --help     show this help

Exit code: 0 all PASS, 1 any FAIL or run error, 2 usage or input error.
It never submits a form, clicks a buy button or enters card details.`;

function usageError(msg) { console.error(`check_funnel: ${msg}\n\n${USAGE}`); process.exit(2); }

// ---- arguments ----
const argv = process.argv.slice(2);
let file = null, outDir = null, jsonOnly = false, liveOnly = false;
if (!argv.length) usageError('no funnel.json given');
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '-h' || a === '--help') { console.log(USAGE); process.exit(0); }
  else if (a === '--json') jsonOnly = true;
  else if (a === '--live') liveOnly = true;
  else if (a === '--out' || a.startsWith('--out=')) {
    const v = a === '--out' ? argv[++i] : a.slice('--out='.length);
    if (!v || v.startsWith('-')) usageError('--out needs a folder name, e.g. --out my-funnel/shots');
    outDir = v;
  }
  else if (a.startsWith('-')) usageError(`unknown option ${a}`);
  else if (file) usageError(`only one funnel.json, got "${file}" and "${a}"`);
  else file = a;
}
if (!file) usageError('no funnel.json given');

// ---- input ----
let cfg;
try { cfg = JSON.parse(readFileSync(file, 'utf8')); }
catch (e) { console.error(`check_funnel: can't read ${file}: ${e.message}`); process.exit(2); }

const TYPES = ['sales', 'checkout', 'upsell', 'thankyou'];
const PLACEHOLDER = /REPLACE-ME|YOUR-DOMAIN|OFFER-|\[name\]|\[Name\]|\$PRICE/;
const problems = [];
if (!cfg || !Array.isArray(cfg.steps) || !cfg.steps.length) problems.push('"steps" must be a non-empty list');
else cfg.steps.forEach((s, n) => {
  const at = `step ${n + 1}${s && s.type ? ` (${s.type})` : ''}`;
  if (!s || !TYPES.includes(s.type)) { problems.push(`${at}: "type" must be one of ${TYPES.join(', ')}`); return; }
  let u = null;
  try { u = new URL(s.url); } catch { problems.push(`${at}: "url" is not a full URL: ${s.url}`); }
  if (u && !/^https?:$/.test(u.protocol)) problems.push(`${at}: "url" must start with https://`);
  if (u && /(^|\.)(invalid|example)$|(^|\.)example\.(com|org|net)$/i.test(u.hostname)) problems.push(`${at}: "url" still uses a placeholder host (${u.hostname})`);
  for (const k of ['url', 'next', 'no', 'price', 'root', 'yes', 'yes_product']) {
    if (typeof s[k] === 'string' && PLACEHOLDER.test(s[k])) problems.push(`${at}: "${k}" still holds a template placeholder: ${s[k]}`);
  }
});
if (problems.length) {
  console.error(`check_funnel: ${file} isn't ready, nothing was checked:\n  - ${problems.join('\n  - ')}\nFill in the real live URLs and values from your plan first (Stage 1, step 14).`);
  process.exit(2);
}

const VIEWS = { mobile: { width: 393, height: 852, deviceScaleFactor: 2, mobile: true }, desktop: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false } };
const chromePath = [process.env.CHROME_PATH, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p => existsSync(p));
if (!chromePath) { console.error('Google Chrome not found. Set CHROME_PATH.'); process.exit(1); }
if (typeof WebSocket === 'undefined') { console.error('Needs Node 22+.'); process.exit(1); }

const probe = (step) => `(() => {
  const H = innerHeight, W = innerWidth, txt = document.body.innerText || '';
  const vis = e => !!(e && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden');
  const want = ${JSON.stringify(step.root || '')};
  const hasHtml = r => !!(r && r.innerHTML.length > 500 && r.querySelector('*'));
  const roots = [...document.querySelectorAll('[id$="-root"]')];
  const rootEl = want ? document.getElementById(want) : null;
  // with "root": that element must hold our HTML; without it: any *-root with content, or a page with some text (loose)
  const injected = want ? hasHtml(rootEl) : (roots.some(hasHtml) || txt.trim().length > 800);
  const gh404 = /There isn't a GitHub Pages site here|404: Not Found|File not found/i.test(txt);
  const links = [...document.querySelectorAll('a[href], button')].map(a => ({ t: (a.innerText || '').trim().replace(/\\s+/g, ' ').slice(0, 80), h: a.getAttribute('href') || '' }));
  const r = { title: document.title, injected, root: want || null, root_found: want ? !!rootEl : null, gh404, sideways_px: Math.max(0, document.documentElement.scrollWidth - W), text_len: txt.length };
  const type = ${JSON.stringify(step.type)};
  if (type === 'sales') {
    const next = ${JSON.stringify(step.next || '')};
    r.to_checkout = links.filter(l => next && l.h.includes(next)).length;
    const label = a => (a.innerText || a.textContent || '').trim().replace(/\\s+/g, ' ').toLowerCase(), as = [...document.querySelectorAll('a[href]')];
    const cta = new Set(as.filter(a => next && a.getAttribute('href').includes(next)).map(label).filter(Boolean));
    r.jumps = as.filter(a => a.getAttribute('href').startsWith('#') && cta.has(label(a))).length;
    r.buttons = [...new Set(links.filter(l => /instant access|buy|get /i.test(l.t)).map(l => l.t))].slice(0, 3);
  }
  r.legal_links = links.filter(l => /privacy|terms|refund/i.test(l.t + ' ' + l.h)).length;
  if (type === 'thankyou') {
    r.file_links = links.filter(l => /\\.(pdf|zip|docx?|xlsx?)(\\?|#|$)/i.test(l.h)).map(l => l.h.slice(0, 80));
    r.grey = [...document.querySelectorAll('.btn.off')].map(b => b.innerText.trim().slice(0, 40));
  }
  if (type === 'checkout') {
    const order = document.querySelector('.c-order-form');
    const form = order || document.querySelector('form');
    const field = form && [...form.querySelectorAll('input')].find(i => vis(i) && i.type !== 'hidden' && i.type !== 'checkbox');
    r.order_form = !!form;
    r.first_field_top = field ? Math.round(field.getBoundingClientRect().top + scrollY) : null;
    r.form_on_first_screen = field ? (field.getBoundingClientRect().top + scrollY) < H : false;
    const tg = document.querySelector('.gtc-m .tg[aria-controls]');
    if (tg && vis(tg)) { const pn = document.getElementById(tg.getAttribute('aria-controls')), st = () => tg.getAttribute('aria-expanded') === 'true' && !!pn && pn.classList.contains('open');
      const a = st(); tg.click(); const b = st() && pn.innerText.trim().length > 40; tg.click(); r.toggle = { closed_on_load: !a, opens: b, closes: !st() }; } else r.toggle = null;
    const offer = document.querySelector('.order-form__offer');
    r.select_product_hidden = !offer || !vis(offer);
    r.bump = !!document.querySelector('.order-form__bump');
    r.bump_ticked = [...document.querySelectorAll('.order-form__bump input[type=checkbox]')].some(c => c.checked);
    r.address_fields = order ? [...order.querySelectorAll('label')].filter(l => vis(l) && /address|shipping|city|state|zip|postal/i.test(l.innerText)).map(l => l.innerText.trim().slice(0, 30)) : [];
    r.test_mode = /test mode/i.test(order ? order.innerText : '') || [...document.querySelectorAll('.test-mode-badge')].some(vis);
    // the price must show inside the order form (the total row), not just in our left column
    const price = ${JSON.stringify(step.price || '')};
    r.price_shown = price ? !!(order && (order.innerText || '').includes(price)) : null;
  }
  if (type === 'upsell') {
    const yes = ${JSON.stringify(step.yes || 'YES')}, no = ${JSON.stringify(step.no || '')};
    r.yes_button = links.filter(l => l.t.toUpperCase().startsWith(yes.toUpperCase())).map(l => l.t).slice(0, 1);
    r.no_link = links.filter(l => no && l.h.includes(no)).map(l => l.t.slice(0, 60)).slice(0, 1);
  }
  return r;
})()`;

const verdict = (step, view, r) => {
  const fails = [];
  if (!r.injected) fails.push(r.root ? (r.root_found ? `#${r.root} is empty (loader did not inject?)` : `no #${r.root} on the page (wrong root id in the loader or in funnel.json?)`) : 'page looks empty (loader did not inject?)');
  if (r.gh404) fails.push('GitHub 404 text on the page (fragment not deployed or wrong URL)');
  if (view === 'mobile' && r.sideways_px > 0) fails.push(`sideways scroll ${r.sideways_px}px on phone`);
  if (step.type === 'sales' && !r.to_checkout) fails.push(`no button links to the checkout step (${step.next})`);
  if (step.type === 'checkout') {
    if (!r.order_form) fails.push('no order form');
    if (view === 'mobile' && !r.form_on_first_screen) fails.push(`first form field below the phone fold (top ${r.first_field_top} of 852)`);
    if (view === 'mobile' && r.toggle && !(r.toggle.closed_on_load && r.toggle.opens && r.toggle.closes)) fails.push(`the "See everything included" toggle is broken (closed on load ${r.toggle.closed_on_load}, opens ${r.toggle.opens}, closes ${r.toggle.closes})`);
    if (!r.select_product_hidden) fails.push('"Select product" block is visible');
    if (step.bump && !r.bump) fails.push('order bump missing');
    if (liveOnly && r.test_mode) fails.push('the funnel is in TEST MODE: real buyers cannot pay (--live)');
    if (r.bump_ticked) fails.push('the order bump is ticked by default');
    if (r.address_fields && r.address_fields.length) fails.push(`the form asks for an address (${r.address_fields.join(', ')})`);
    if (r.price_shown === false) fails.push(`price ${step.price} not shown in the order form`);
  }
  if (step.type === 'upsell') {
    if (!r.yes_button || !r.yes_button.length) fails.push('no YES button');
    if (step.no && (!r.no_link || !r.no_link.length)) fails.push(`no "No thanks" link to ${step.no}`);
    const a = r.yes_action;
    if (!a) fails.push('could not read the YES action from the page data: check it by eye in the builder (Button Actions)');
    else if (a.action !== 'sell-product') fails.push(`YES does not sell: its action is "${a.action}", it must be "One click up/down sell product"`);
    else if (!a.product) fails.push('YES has the one-click action but no product');
    else if (step.yes_product && a.product !== step.yes_product) fails.push(`YES sells product ${a.product}, but funnel.json expects ${step.yes_product}`);
    else if (!a.sale) fails.push('YES has no sale action (what happens after the charge)');
  }
  if (step.type === 'thankyou' && r.file_links && r.file_links.length) fails.push(`public page links a file: ${r.file_links.join(', ')}`);
  return fails;
};
const notesOf = (step, r, view) => {
  const n = [];
  if (step.type === 'sales' && r.jumps) n.push(`${r.jumps} button(s) jump down the page instead of going to the checkout`);
  if (step.type === 'checkout' && view === 'mobile' && !r.toggle) n.push('no "See everything included" toggle on the phone card');
  if (step.type === 'checkout' && r.test_mode) n.push('the funnel is in TEST MODE: real buyers cannot pay');
  if (step.type === 'checkout' && !r.legal_links) n.push('no privacy / terms / refund link on this page');
  if (step.type === 'sales' && !r.legal_links) n.push('no privacy / terms / refund link on this page');
  if (step.type === 'thankyou' && r.grey && r.grey.length) n.push(`greyed links to fill in: ${r.grey.join(', ')}`);
  return n;
};

// GHL pages carry their settings as a flat array in a <script>: objects point to other entries by index. Decode it to read the button's action.
async function yesAction(url, yes) {
  try {
    const t = await (await fetch(url + (url.includes('?') ? '&' : '?') + 'v=' + Date.now())).text();
    for (const m of t.matchAll(/<script[^>]*>(\[[\s\S]*?\])<\/script>/g)) {
      let a; try { a = JSON.parse(m[1]); } catch { continue; }
      const val = (i, d = 0) => { if (!Number.isInteger(i) || i < 0 || i >= a.length || d > 5) return i; const v = a[i]; if (Array.isArray(v)) return v.map(x => val(x, d + 1)); if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, val(x, d + 1)])); return v; };
      const btns = [];
      a.forEach((v, i) => { if (v && typeof v === 'object' && !Array.isArray(v) && 'action' in v && 'productId' in v) { const e = val(i), un = x => x && typeof x === 'object' && 'value' in x ? x.value : x; const pid = un(e.productId); btns.push({ text: String(un(e.text) || '').replace(/<[^>]+>/g, ''), action: un(e.action), sale: un(e.saleAction) || null, product: pid && typeof pid === 'object' ? (pid.id || null) : (pid || null) }); } });
      const hit = btns.find(b => b.text.toUpperCase().startsWith((yes || 'YES').toUpperCase())) || (btns.length === 1 ? btns[0] : null);
      if (hit) return hit;
    }
  } catch {}
  return null;
}

if (outDir) { try { mkdirSync(outDir, { recursive: true }); } catch (e) { console.error(`check_funnel: can't create ${outDir}: ${e.message}`); process.exit(2); } }

const userDir = mkdtempSync(join(tmpdir(), 'funnel-'));
const port = 9800 + Math.floor(Math.random() * 150);
const chrome = spawn(chromePath, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--remote-debugging-port=${port}`, `--user-data-dir=${userDir}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function wsUrl() { for (let i = 0; i < 60; i++) { try { const l = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p = l.find(t => t.type === 'page'); if (p) return p.webSocketDebuggerUrl; } catch {} await sleep(250); } throw new Error('Chrome did not start'); }
function connect(url) { return new Promise((res, rej) => { const ws = new WebSocket(url); let id = 0; const pend = new Map(); ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { const { resolve, reject } = pend.get(m.id); pend.delete(m.id); m.error ? reject(new Error(m.error.message)) : resolve(m.result); } }; ws.onopen = () => res({ send: (method, params = {}) => new Promise((resolve, reject) => { const i = ++id; pend.set(i, { resolve, reject }); ws.send(JSON.stringify({ id: i, method, params })); }), close: () => ws.close() }); ws.onerror = rej; }); }

const report = [];
let failCount = 0, runError = false;
const actions = {};
try {
  const cdp = await connect(await wsUrl());
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable');
  for (const [n, step] of cfg.steps.entries()) {
    for (const [view, vp] of Object.entries(VIEWS)) {
      await cdp.send('Emulation.setDeviceMetricsOverride', vp);
      await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: vp.mobile });
      await cdp.send('Page.navigate', { url: step.url + (step.url.includes('?') ? '&' : '?') + 'chk=' + Date.now() });
      // Builder pages, the loader's fetch, the order form, and the one-click button (its text stays hidden for about 7 to 10 s) all load late:
      // look every 2 s, up to 24 s, until nothing is missing.
      let r = {}, fails = ['not loaded'];
      await sleep(5000);
      for (let t = 0; t < 10; t++) {
        r = (await cdp.send('Runtime.evaluate', { expression: probe(step), returnByValue: true })).result.value || {};
        if (step.type === 'upsell') { if (actions[step.url] === undefined) actions[step.url] = await yesAction(step.url, step.yes); r.yes_action = actions[step.url]; }
        fails = verdict(step, view, r);
        if (!fails.length) break;
        await sleep(2000);
      }
      failCount += fails.length;
      report.push({ step: step.type, view, url: step.url, pass: !fails.length, fails, notes: notesOf(step, r, view), details: r });
      if (outDir) {
        const s = await cdp.send('Page.captureScreenshot', { format: 'png' });
        writeFileSync(join(outDir, `${n + 1}-${step.type}-${view}.png`), Buffer.from(s.data, 'base64'));
      }
    }
  }
  cdp.close();
} catch (e) { console.error('check failed:', e.message); runError = true; }
finally { chrome.kill('SIGKILL'); try { rmSync(userDir, { recursive: true, force: true }); } catch {} }

if (jsonOnly) { console.log(JSON.stringify(report, null, 2)); }
else {
  console.log(`FUNNEL CHECK  ${cfg.name || ''}\n${'-'.repeat(72)}`);
  for (const r of report) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.step.padEnd(9)} ${r.view.padEnd(8)} ${r.fails.join('; ') || summary(r)}`);
  const notes = [...new Set(report.flatMap(r => (r.notes || []).map(n => `${r.step}: ${n}`)))];
  notes.forEach(n => console.log('NOTE  ' + n));
  const verdictLine = runError ? 'Run did not finish (see the error above)' : failCount ? failCount + ' problem(s)' : 'All steps pass';
  console.log('-'.repeat(72) + `\n${verdictLine}${outDir ? '   screenshots: ' + outDir : ''}`);
}
process.exitCode = (runError || failCount || !report.length) ? 1 : 0;

function summary(r) {
  const d = r.details;
  if (r.step === 'sales') return `${d.to_checkout} button(s) to checkout`;
  if (r.step === 'checkout') return `form field at ${d.first_field_top}px, bump ${d.bump ? 'yes, unticked' : 'no'}${d.toggle ? ', toggle works' : ''}`;
  if (r.step === 'upsell') return `YES sells (${d.yes_action.sale || 'no sale action'}): "${((d.yes_button || [])[0] || '').slice(0, 34)}…", NO link ok`;
  return `"${d.title}"`;
}

#!/usr/bin/env node
// check_funnel.mjs: checks a live GoHighLevel funnel, step by step, at phone and desktop size. No installs.
// Drives your installed Google Chrome over the DevTools protocol (Node 22+, built-in WebSocket).
//
// Usage:
//   node tools/check_funnel.mjs <funnel.json> [--out DIR] [--json]
// funnel.json (example: examples/rickey-headstart-funnel/funnel.json):
//   { "name": "…", "steps": [
//       { "type": "sales",    "url": "https://domain.com/offer-page",     "next": "/offer-checkout" },
//       { "type": "checkout", "url": "https://domain.com/offer-checkout", "bump": true, "price": "$27" },
//       { "type": "upsell",   "url": "https://domain.com/offer-upsell",   "yes": "YES", "no": "/offer-thank-you" },
//       { "type": "thankyou", "url": "https://domain.com/offer-thank-you" } ] }
//
// What it checks (PASS/FAIL per step; screenshots in --out):
//   every step   loads, our HTML is injected (not blank, not a GitHub 404), no sideways scroll on a phone
//   sales        at least one button/link goes to the checkout step ("next")
//   checkout     the order form is there; on a phone the first form field is on the first screen (≤ 852px);
//                "Select product" is hidden; the order bump is there (if "bump": true); the price shows
//   upsell       a YES button (native builder button) and a NO link to the thank-you step
//   thankyou     loads with content
// It never submits a form, clicks a buy button or enters card details.

import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, existsSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const args = process.argv.slice(2);
if (!args[0] || args[0] === '-h') { console.log('Usage: node tools/check_funnel.mjs <funnel.json> [--out DIR] [--json]'); process.exit(0); }
const cfg = JSON.parse(readFileSync(args[0], 'utf8'));
const outDir = args.includes('--out') ? args[args.indexOf('--out') + 1] : null;
const jsonOnly = args.includes('--json');

const VIEWS = { mobile: { width: 393, height: 852, deviceScaleFactor: 2, mobile: true }, desktop: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false } };
const chromePath = [process.env.CHROME_PATH, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p => existsSync(p));
if (!chromePath) { console.error('Google Chrome not found. Set CHROME_PATH.'); process.exit(2); }
if (typeof WebSocket === 'undefined') { console.error('Needs Node 22+.'); process.exit(2); }

const probe = (step) => `(() => {
  const H = innerHeight, W = innerWidth, txt = document.body.innerText || '';
  const vis = e => !!(e && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden');
  const roots = [...document.querySelectorAll('[id$="-root"]')];
  const injected = roots.some(r => r.innerHTML.length > 500 && r.querySelector('*')) || txt.trim().length > 800;
  const gh404 = /There isn't a GitHub Pages site here|404: Not Found|File not found/i.test(txt);
  const links = [...document.querySelectorAll('a[href], button')].map(a => ({ t: (a.innerText || '').trim().replace(/\\s+/g, ' ').slice(0, 80), h: a.getAttribute('href') || '' }));
  const r = { title: document.title, injected, gh404, sideways_px: Math.max(0, document.documentElement.scrollWidth - W), text_len: txt.length };
  const type = ${JSON.stringify(step.type)};
  if (type === 'sales') {
    const next = ${JSON.stringify(step.next || '')};
    r.to_checkout = links.filter(l => next && l.h.includes(next)).length;
    r.buttons = [...new Set(links.filter(l => /instant access|buy|get /i.test(l.t)).map(l => l.t))].slice(0, 3);
  }
  if (type === 'checkout') {
    const form = document.querySelector('.c-order-form, form');
    const field = form && [...form.querySelectorAll('input')].find(i => vis(i) && i.type !== 'hidden' && i.type !== 'checkbox');
    r.order_form = !!form;
    r.first_field_top = field ? Math.round(field.getBoundingClientRect().top + scrollY) : null;
    r.form_on_first_screen = field ? (field.getBoundingClientRect().top + scrollY) < H : false;
    const offer = document.querySelector('.order-form__offer');
    r.select_product_hidden = !offer || !vis(offer);
    r.bump = !!document.querySelector('.order-form__bump, [class*="bump"]');
    r.price_shown = ${JSON.stringify(step.price || '')} ? txt.includes(${JSON.stringify(step.price || '')}) : null;
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
  if (!r.injected) fails.push('page looks empty (loader did not inject?)');
  if (r.gh404) fails.push('GitHub 404 text on the page (fragment not deployed or wrong URL)');
  if (view === 'mobile' && r.sideways_px > 0) fails.push(`sideways scroll ${r.sideways_px}px on phone`);
  if (step.type === 'sales' && !r.to_checkout) fails.push(`no button links to the checkout step (${step.next})`);
  if (step.type === 'checkout') {
    if (!r.order_form) fails.push('no order form');
    if (view === 'mobile' && !r.form_on_first_screen) fails.push(`first form field below the phone fold (top ${r.first_field_top} of 852)`);
    if (!r.select_product_hidden) fails.push('"Select product" block is visible');
    if (step.bump && !r.bump) fails.push('order bump missing');
    if (r.price_shown === false) fails.push(`price ${step.price} not shown`);
  }
  if (step.type === 'upsell') {
    if (!r.yes_button.length) fails.push('no YES button');
    if (step.no && !r.no_link.length) fails.push(`no "No thanks" link to ${step.no}`);
  }
  return fails;
};

const userDir = mkdtempSync(join(tmpdir(), 'funnel-'));
const port = 9800 + Math.floor(Math.random() * 150);
const chrome = spawn(chromePath, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--remote-debugging-port=${port}`, `--user-data-dir=${userDir}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function wsUrl() { for (let i = 0; i < 60; i++) { try { const l = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p = l.find(t => t.type === 'page'); if (p) return p.webSocketDebuggerUrl; } catch {} await sleep(250); } throw new Error('Chrome did not start'); }
function connect(url) { return new Promise((res, rej) => { const ws = new WebSocket(url); let id = 0; const pend = new Map(); ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { const { resolve, reject } = pend.get(m.id); pend.delete(m.id); m.error ? reject(new Error(m.error.message)) : resolve(m.result); } }; ws.onopen = () => res({ send: (method, params = {}) => new Promise((resolve, reject) => { const i = ++id; pend.set(i, { resolve, reject }); ws.send(JSON.stringify({ id: i, method, params })); }), close: () => ws.close() }); ws.onerror = rej; }); }

const report = [];
let failCount = 0;
try {
  const cdp = await connect(await wsUrl());
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable');
  for (const step of cfg.steps) {
    for (const [view, vp] of Object.entries(VIEWS)) {
      await cdp.send('Emulation.setDeviceMetricsOverride', vp);
      await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: vp.mobile });
      await cdp.send('Page.navigate', { url: step.url + (step.url.includes('?') ? '&' : '?') + 'chk=' + Date.now() });
      await sleep(7000); // builder pages + the loader's fetch + the order form render
      const r = (await cdp.send('Runtime.evaluate', { expression: probe(step), returnByValue: true })).result.value || {};
      const fails = verdict(step, view, r);
      failCount += fails.length;
      report.push({ step: step.type, view, url: step.url, pass: !fails.length, fails, details: r });
      if (outDir && !jsonOnly) {
        mkdirSync(outDir, { recursive: true });
        const s = await cdp.send('Page.captureScreenshot', { format: 'png' });
        writeFileSync(join(outDir, `${cfg.steps.indexOf(step) + 1}-${step.type}-${view}.png`), Buffer.from(s.data, 'base64'));
      }
    }
  }
  cdp.close();
} catch (e) { console.error('check failed:', e.message); process.exitCode = 1; }
finally { chrome.kill('SIGKILL'); try { rmSync(userDir, { recursive: true, force: true }); } catch {} }

if (jsonOnly) { console.log(JSON.stringify(report, null, 2)); }
else {
  console.log(`FUNNEL CHECK  ${cfg.name || ''}\n${'-'.repeat(72)}`);
  for (const r of report) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.step.padEnd(9)} ${r.view.padEnd(8)} ${r.fails.join('; ') || summary(r)}`);
  console.log('-'.repeat(72) + `\n${failCount ? failCount + ' problem(s)' : 'All steps pass'}${outDir ? '   screenshots: ' + outDir : ''}`);
}
function summary(r) {
  const d = r.details;
  if (r.step === 'sales') return `${d.to_checkout} button(s) to checkout`;
  if (r.step === 'checkout') return `form field at ${d.first_field_top}px, bump ${d.bump ? 'yes' : 'no'}`;
  if (r.step === 'upsell') return `YES: "${(d.yes_button[0] || '').slice(0, 40)}…", NO link ok`;
  return `"${d.title}"`;
}

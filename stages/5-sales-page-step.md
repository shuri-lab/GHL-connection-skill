# Stage 5 of 12: Sales page step

**Goal:** the Sales Page step has a GHL page made of one full-width section holding one Custom Code element with the loader. It is saved, published, and live at `https://<domain>/<slug>-page`: our HTML injected, no white strips, no sideways scroll on a phone, the tab title set, and the buy button going to the checkout.

**Why:** this is the first page in the builder, and the builder is where most time was lost on Nov 20. It is a cross-origin frame, so `find`, `read_page`, `get_page_text`, `form_input` and `javascript_tool` can't see inside it: everything is done with screenshots, coordinate clicks, keys and typing. Dragging a card onto the canvas never registers. The toolbar `</>` icon is page tracking code, not a code element. The builder shows **"Autosave off"**: unsaved work is lost without a prompt when you navigate away. And after the first publish, the page had 10 px of padding, a 1170 px width cap and an empty tab title, which the builder's own settings couldn't remove.

**Read first:** `knowledge/builder-quirks.md` (all of it), `knowledge/loader.md`.

## Before you start (inputs)
- Stage 2: the sales fragment URL, live and returning the current content, with the wrapper fix for its root id.
- Stage 4: the funnel, the Sales Page step id, the domain and paths.
- The loader text ready to type, one line, from `templates/loader.html`: replace `ROOTID` (both places) with the page's root id from the plan (Rickey: `gt-root`) and the URL with the fragment's Pages URL:
  ```html
  <div id="ROOTID"></div><script>(function(){var u='https://OWNER.github.io/REPO/FOLDER/FRAGMENT.html';fetch(u,{cache:'no-cache'}).then(function(r){if(!r.ok){throw 0;}return r.text();}).then(function(h){var root=document.getElementById('ROOTID');root.innerHTML=h;root.querySelectorAll('script').forEach(function(s){var n=document.createElement('script');if(s.src){n.src=s.src;}else{n.textContent=s.textContent;}s.parentNode.replaceChild(n,s);});}).catch(function(){});})();</script>
  ```
  (`innerHTML` never runs `<script>` tags, so the loader re-creates each one; `if(!r.ok) throw` stops a GitHub 404 page from being injected; `cache:'no-cache'` makes every push show on the next load.)

## Steps

### A. Create the page
1. Open the Sales Page step **Overview**. The CONTROL card shows **Use existing** and **Create from blank**, an **Edit** dropdown, an open-in-new-tab icon and a gear. `find "Create from blank"` → click the ref. Wait 8 to 15 s.
2. The builder opens at `https://app.gohighlevel.com/location/{loc}/page-builder/{page}` (no `/v2`). Copy the page id into `funnel-record.md`.
   - **Never open the inner frame** (`page-builder.leadconnectorhq.com/…`) by itself: it broke the session on Nov 20.
   - The header has **Back**, an autosave badge ("Autosave off", later "Last saved <date time>"), **Preview** (eye), **Save** (floppy disk; a **yellow dot** = unsaved changes) and **Publish** (a yellow dot = saved but not published).
   - The toolbar has **+** (add panel, far left), Ask AI, Layers, Pages, `</>` (Tracking Code: page-level, not an element), a page selector, desktop/tablet/mobile, zoom, undo/redo, settings.
3. The **Ask AI** panel opens by default over the left side. Close it with its **X**. Take a screenshot.

### B. Add the section and the Code element
4. The empty canvas shows "Start Creating your Funnel Page" with **Blank Section**, **Insert Element** and **Generate with AI**. Click **Blank Section** (or toolbar **+** → **Sections** → **Full Width**). Clicking an element card on a page with no section adds nothing.
5. Click the **+** in the middle of the new green-outlined section. It often needs two clicks: the first selects the section, the second opens **Quick Add** (left list: Quick Add, Sections, Rows, Elements, Prebuilt Sections, Saved Assets, … and a search box).
6. **Clear the search box** (it keeps the last query): click it → `End` → `Backspace` ×10. Type `code` (or `custom`). Click the **Code** card in the "Custom" group (not "QR Code"), **while the section is selected**. GHL inserts **1 Column Row › 1st Column › Custom Code** with a "Custom HTML/Javascript" placeholder. Don't drag.
7. Select the element. The right panel "Custom Code" has **General / Styles**, **Element name** and **Open Code Editor**. Optional: name it (`Loader · sales page`) so the bottom breadcrumb shows it (Page › Section › 1 Column Row › 1st Column › …).
8. Click **Open Code Editor**. The **"Custom Javascript/HTML"** modal opens with a dark editor ("Add your code here") and **Cancel / Save**.
9. Click inside the editor. If it isn't empty, `cmd+a` then `Delete` (select-all works in this editor, unlike most GHL fields).
10. **Type the loader** in one `type` action. The editor does not auto-close brackets or quotes (tested), and paste doesn't reach the pane. About 560 characters type fine; 100 KB would not.
11. **Zoom** on the editor and read the code: root id, URL, `if(!r.ok)`, the closing `</script>`. Then click the modal's **Save**.
12. **Save the page now** (floppy icon). The modal Save only commits the code to the element. The first page save may pop an **"SEO & AI search optimization"** panel (Preview, Content, Keywords, Author, …): close it with X. The badge should read "Last saved …".

### C. Full width, then publish
13. In the bottom breadcrumb click **Section**. General → **"Allow Rows to take entire width"** = on. Styles → **Margin & Padding** → click the top padding value → a popup with a slider and presets **0 / 10 / 20 / 40 / 60 / 80 / 100 / 140** → choose **0** → Escape; same for bottom. (This is a fallback only; the wrapper fix in the fragment does the real work.)
14. **Save** the page again, then **Publish** (top right). The toast says **"Page published successfully"** and the URL bar badge shows **"• Live"**.

## Verify (on the live page, never in the builder)
Open a **separate tab** (`tabs_create`, then `navigate`) on `https://<domain>/<slug>-page`. The live page is same-origin for JS, unlike the builder.

1. **Desktop** (pane size, or `resize_window` 1280×800), wait 5 s, then:
   ```js
   ({title:document.title, root:(document.querySelector('[id$="-root"]')||{}).id,
     rootLen:(document.querySelector('[id$="-root"]')||{innerHTML:''}).innerHTML.length,
     W:innerWidth, scrollW:document.documentElement.scrollWidth,
     brokenImgs:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).length,
     toCheckout:[...document.querySelectorAll('a[href]')].filter(a=>a.href.includes('-checkout')).map(a=>a.href).length,
     jumps:document.querySelectorAll('[id$="-root"] a.btn[href^="#"]').length})
   ```
   Expect: the title you set, a long `rootLen` (Rickey: 117,173), `scrollW` = `W`, 0 broken images, `toCheckout` = every button on the page (Rickey: 14), `jumps` = 0 (since Nov 24 every button, the sticky bar included, goes straight to checkout).
2. **If there is padding or a width cap**, walk up from the root and print each layer:
   ```js
   let a=[],e=document.getElementById('<ROOTID>');   // e.g. 'gt-root'
   for(let i=0;i<10&&e;i++){const cs=getComputedStyle(e);a.push(e.tagName+'.'+String(e.className).split(' ').slice(0,2).join('.')+' p:'+cs.padding+' mt:'+cs.marginTop+' mw:'+cs.maxWidth+' top:'+Math.round(e.getBoundingClientRect().top));e=e.parentElement}
   a
   ```
   Rickey's chain before the fix: `custom-code-container` (0) → `c-custom-code` (0) → `vertical.inner` (0) → **`c-column` (10px 5px)** → `inner` → **`row-align-center` (10px 5px)** → **`inner` (max-width 1170px)**, and the page started 10 px from the left. Fix it in the fragment (wrapper fix), push, poll, reload. Never in the builder.
3. **Phone:** `resize_window` 393×852 on that tab, navigate again, wait 5 s, run the same check. Then the overflow finder:
   ```js
   const W=document.documentElement.clientWidth;
   [...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>W+1).slice(0,10).map(e=>(e.className||e.tagName).toString().slice(0,40)+' '+Math.round(e.getBoundingClientRect().width))
   ```
   Expect `scrollW` = 393 and an empty list. Take a screenshot of the hero (Rickey: the hero button's bottom at 784 px, inside 852).
4. **No bump on the sales page:** `document.body.innerText.includes('<bump product name>')` → `false`.
5. `curl -s -o /dev/null -w "%{http_code}"` on `https://<domain>/<slug>` → 200 (the funnel root serves step 1).
6. **Checker:** make `my-funnel/funnel.partial.json`: copy `my-funnel/funnel.json` and delete every step you haven't built yet (here, keep only the sales step). Then run
   `node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.partial.json --out my-funnel/shots`.
   Expect `PASS sales mobile` and `PASS sales desktop` ("N button(s) to checkout", N = every button; a NOTE says if any still jumps down the page) and exit code 0. Use `funnel.partial.json` until Stage 8: the full `funnel.json` FAILs (exit code 1) on the steps you haven't built yet.
7. Reset the viewport: `resize_window` preset `desktop`.

## Rickey example values
- Builder page `ADjS2vRSoBdGH6bc314y`: `https://app.gohighlevel.com/location/54EJrjBw49eCsIsOZH44/page-builder/ADjS2vRSoBdGH6bc314y`.
- Root `gt-root`; fragment `https://shuri-lab.github.io/rickey-tiktokshop-project/offer-1-sales-page/ghl-sales-page.html`.
- Live: `https://davidhsai.com/headstart-page` (also `https://davidhsai.com/headstart`). Title "TikTok Shop Headstart | Game Tape". All 14 buttons → `https://davidhsai.com/headstart-checkout`.
- The first Rickey loader had no `r.ok` check and didn't copy `src`; use the guarded one above.
- The fragment also ends with a `fit()` script from the Sales Page Playbook: on screens up to 820 px it sizes `#page` to the window and cancels any leftover builder offset.
- Quality bar: `examples/rickey-headstart-funnel/screenshots/1-sales-mobile.png` and `1-sales-desktop.png`.

## ★ Gates
None.

## Done when
- [ ] Page created from blank, one full-width section, one Code element with the guarded loader (zoom-checked).
- [ ] Saved (badge "Last saved"), published ("Page published successfully").
- [ ] Live page: title set, content injected, no padding strip, `scrollWidth` = width at 393 px, 0 broken images, buy button → checkout, no bump mention.
- [ ] `check_funnel.mjs` passes the sales step at phone and desktop.
- [ ] Page id and builder URL in `funnel-record.md`.

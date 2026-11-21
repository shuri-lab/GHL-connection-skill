# Upsell recipe: our HTML page + native YES button (one-click upsell) + NO link

This is how Rickey's $97 one-click upsell (`https://davidhsai.com/headstart-upsell`) was built on Nov 20 2026. Live fragment: `examples/rickey-headstart-funnel/pages/3-upsell.html`. Screenshots: `3-upsell-desktop.png`, `3-upsell-mobile.png`. The full section-by-section design spec (sizes, colors, every line of copy) is in `upsell-checkout-bump-design.md` part D; this file is the GHL build and the rules around it. Quirk codes (B5, D1, P4...) refer to `builder-quirks.md`.

## 0. How the one-click upsell works

```
Checkout (card entered, main + optional bump paid)
   │  order form → After purchase = "Go to the next funnel step"
   ▼
Upsell step  (our HTML + native YES button + NO link)
   ├─ YES  → Button action "One click up/down sell product" charges the saved card for the step product → GHL goes to the next step
   └─ NO   → plain link to the thank-you URL (nothing charged)
   ▼
Thank-you step
```
- The buyer never types the card again. That only works with a **native GHL button** whose action is **One click up/down sell product**, pointing at a product attached to the **Upsell step's Products tab**.
- If the checkout's After purchase is a website URL, buyers skip the upsell. If the YES button keeps its default action ("Open popup" with no popup), **YES does nothing**.

## 1. Study the reference page (repeatable method)

David gave a reference upsell from another funnel in the same account (`https://www.davidhsai.com/upsell-1-product--model-videos-page`, the AI Avatars Upsell #1). **Study a reference only on its live page, with JS. Never open another client's page builder,** not even read-only: one stray Save publishes changes to their live page, and leaving a builder can break the session (`pitfalls.md` 3). You don't need it: the YES button settings are documented below.
```js
// sections: id, visibility, first 300 chars
[...document.querySelectorAll('.c-section')].map(s=>({id:s.id,display:getComputedStyle(s).display,text:s.innerText.trim().replace(/\s+/g,' ').slice(0,300)}))
// buttons: find YES / NO by text, read tag, class, href
[...document.querySelectorAll('a,button')].filter(b=>/yes|no thanks|add/i.test(b.innerText)).map(b=>({tag:b.tagName,cls:b.className,href:b.getAttribute('href'),text:b.innerText.trim().slice(0,90)}))
```
- Its offer row was hidden until a video timer ended (`display:none`). To see the styling, reveal it temporarily on the live page: `document.getElementById('row-XXXX').style.display='block'` (nothing is saved).
- What it showed: YES = native GHL button `div.c-button#button-XXXX > button#button-XXXX_btn.cbutton-XXXX.pulse-button` (no href: a one-click action). NO = also a GHL button, but rendered as `<a href="https://www.davidhsai.com/thank-you">` (link-to-URL action).
- Reference copy: "Your order is on the way & will be available to download in the next 5 minutes. Please watch this important video below for access details and an exclusive opportunity...", "⚡ You Just Unlocked The System. Now Get Results 10x Faster...", a countdown ("Next Step Will Unlock when the timer reaches Zero"), "ONLY $67 $47 NOW", "➡️ This is exclusive one-time offer. Only available right here, right now", "YES! Add The AI Avatars Bonus to My Order For Only $47", "No thanks, I'll spend a lot of time coming up with average AI avatars every time and spend x10 more time".
- The YES button's settings (seen on Nov 20, when Claude did open that builder; that is no longer allowed): **Button Actions → link to = "One click up/down sell product"**, **Products = "AI Avatars System Upsell"**. Those labels are all you need; don't go back to check them.

## 2. Page structure and copy patterns

Everything is HTML (one fragment) **except the YES button**. The NO is a tiny Custom Code link (section 6).

| # | Section | Rickey copy | Pattern for any client |
|---|---|---|---|
| 1 | **Alert bar** (red, full width, `role="status"`, 17/18 px phone, 20/22 px desktop) | "✓ Your order is confirmed! You'll have access to TikTok Shop Headstart in the next 5 minutes." / bold: "Don't close this page. Take a look at this exclusive one-time opportunity first ↓" | Confirm the purchase + access time. Then "Don't close this page" + "exclusive one-time opportunity" + ↓. No VSL: don't say "watch the video". |
| 2 | **Progress band** (ink) | "ORDER 90% COMPLETE" + 90% bar with moving red stripes | Same. |
| 3 | **Hero** | Pill "⚡ Exclusive one-time offer"; H1 "You Just Unlocked Your Headstart. Now Get Your Sales **10x Faster**…"; product image; product title chip "My $4M TikTok Shop System"; subheadline "The exact system behind my $4M TikTok Shop. **How I find winning products, hook people in the first 2 seconds, and film videos that sell**, so every video you post has a real shot at making money." | "You Just Unlocked Your [Offer 1]. Now Get Your [Result] 10x Faster…" + the upsell's product image + one strong subheadline. |
| 4 | **Bridge** (dark card) | "The Headstart gets you your first sale. **This is how you keep them coming.**" + 3 ✓ wins | "[Offer 1] gets you [first result]. This is how you [keep / multiply it]." + 3 concrete wins. |
| 5 | **Offer stack** (2 px ink border, red offset shadow) | "Everything You **Get Today**" + chip "One-time $97 · instant access"; items with thumbnail + title + one-line benefit + crossed value: course ~~$297~~ (with its 8 module titles), Product Checklist ~~$47~~, Hook Bank ~~$47~~, Format List ~~$37~~; "Total value: ~~$428~~"; chip "Exclusive discount · you save $331"; "Today, only on this page: **$97**"; "One-time payment. Added to your order in one click, no need to enter your card again." | Each item = name + "so you..." benefit + crossed value. Total crossed. Savings = total minus price. "Today, only on this page: $X". One-click reassurance. |
| 6 | **Guarantee strip** | "**Your money's protected.** Do the work and still no sale? You get a full refund." | Short, matches the client's real guarantee. |
| 7 | **Lead-in** | "➡️ This is an exclusive one-time offer." / "Only available right here, right now. Once you leave this page, it's gone." + bouncing ↓ | Urgency that is true for a one-time offer. Never "today only" if no deadline exists. |
| 8 | **YES** (native button) | "YES! Add My $4M TikTok Shop System to My Order For Only $97" | "YES! Add [Product] to My Order For Only $[price]". Must start with "YES!". |
| 9 | **NO** (link) | "No thanks, I'll keep guessing which products and hooks work, and take 10x longer to get my sales." | "No thanks, I'll [keep doing the painful thing] and take 10x longer to [get the result]." Must start with "No thanks". |

Content sourcing: the offer stack and module titles came from the project PDFs (`pypdf`; for an image-only deck, a contact sheet of each page's largest image). The price came from the person. **Item values were placeholders made up by Claude** (as on Offer 1) and must be flagged for the client to approve.

Design rules: same brand tokens and fonts as the sales page; everything scoped under `#gtu`; mobile-first sizes with one `@media(min-width:768px)` block and one `@media(max-width:420px)` block; offset "sticker" shadows and dashed pills for the special cues; `prefers-reduced-motion` turns off the stripes, the bouncing arrow and the YES pulse.

## 3. Product setup (catalog + step)

1. **Catalog product:** Payments → Products → **Create Product** → **Include in Online store OFF** → Title `<Client> · <Upsell name>` (`Rickey · My $4M TikTok Shop System`) → Pricing: Type **Onetime**, Amount `97` → **Save** (by ref). URL becomes `/payments/products/edit/<id>?source=create`. "Additional options >" only has Statement Descriptor; there is no product-type field (it defaults to Physical, which doesn't matter for a one-click charge).
2. **Step product:** Funnel → **Upsell** step → **Products** tab → **+ Add Product** (`/steps/{step}/products/create`):
   - **Products**: click, type `4M`, `hover` the result, `Return`.
   - **Price**: click, `hover` "Rickey · My $4M TikTok Shop System @ 97", `Return`.
   - **Product name** (public): prefilled with the catalog name. Clear it (End, Backspace ×80, Delete ×40), then type `My $4M TikTok Shop System`.
   - Price display override: optional, left empty. **Save**.
   - The table shows "My $4M TikTok Shop System | Internal Product ID 6b00cbc6... | $97 USD | One Time". The step product gets its own id, different from the catalog id.
   - The YES button's Products picker lists **only** this step's products.

## 4. Build the page in GHL (save after every step)

Rule: the builder has **no autosave**, and leaving the page discards unsaved work without a prompt (P1 to P4). The first Rickey build was lost exactly that way.

1. Upsell step → **Overview** → **Create from blank**. Wait about 12 s. Close **Ask AI**.
2. Toolbar **+** → **Sections** → **Full Width**. Section **+** (twice if needed) → Quick Add → clear the search (End, Backspace ×10) → `custom` → **Code**.
3. Select the code element → **Open Code Editor** → type the one-line loader from `templates/loader.html` (root id `gtu-root` or yours, URL of the hosted `ghl-upsell.html`) → `zoom` → modal **Save** → **page Save** (floppy). Close the "SEO & AI search optimization" panel if it opens.
   ```html
   <div id="gtu-root"></div><script>(function(){var u='https://OWNER.github.io/REPO/FOLDER/ghl-upsell.html';fetch(u,{cache:'no-cache'}).then(function(r){if(!r.ok){throw 0;}return r.text();}).then(function(h){var root=document.getElementById('gtu-root');root.innerHTML=h;root.querySelectorAll('script').forEach(function(s){var n=document.createElement('script');if(s.src){n.src=s.src;}else{n.textContent=s.textContent;}s.parentNode.replaceChild(n,s);});}).catch(function(){});})();</script>
   ```
4. Select the row, click the **blue +** on the "1 Column Row"'s bottom edge (add a row below) → Quick Add → clear → `button` → **Button**.
5. Select the button → General tab:
   - **Text** (under Text Options): click → End → Backspace ×20 (clears "Get Started") → type `YES! Add My $4M TikTok Shop System to My Order For Only $97`.
   - **Element name**: click → End → Backspace ×12 → type `YES button (one-click upsell)`. It now shows on the canvas label and the breadcrumb.
   - **Page Save.**
6. With the YES button selected, click the **orange +** on its bottom edge (adds an element below, same column) → Quick Add → `custom` → **Code** → Open Code Editor → type the NO link (section 6) → modal **Save** → **page Save**.
7. **Publish**. Toast "Page published successfully"; the URL badge shows "• Live".
8. Set the YES action (section 7). If you can't, hand it off.

Final layout: Section 1 (full width) → Row 1: Code (loader) → Row 2: Button (YES) and, under it in the same column, Code (NO link).

Alternative first-build layout (also works): a separate **Wide** section under the code section for the buttons (green + on the section's bottom edge → Sections → Wide). Rickey's final page uses the one-section layout above.

## 5. Styling the native YES button from the fragment

GHL gives no easy way to add a class to a native button, so the fragment **finds the buttons by their text** and tags them. It retries for about 9 s while the builder renders:
```html
<script>
document.title='One-time offer | My $4M TikTok Shop System';
(function(){
  function tag(){
    document.querySelectorAll('.c-button a, .c-button button').forEach(function(b){
      var t=(b.textContent||'').trim().toLowerCase();
      if(t.indexOf('yes!')===0) b.classList.add('gtu-yes');
      else if(t.indexOf('no thanks')===0) b.classList.add('gtu-no');
    });
  }
  tag(); var n=0,iv=setInterval(function(){tag();if(++n>30)clearInterval(iv);},300);
})();
</script>
```
CSS (global, so it reaches outside `#gtu`; `!important` beats GHL's button styles):
```css
.c-button:has(.gtu-yes){padding:4px 18px 0!important;max-width:756px;margin:0 auto!important}
.c-custom-code:has(.gtu-no){padding:0 18px 44px!important}
[class*="section-"]:has(.gtu-yes){padding-bottom:0!important}
.gtu-yes,.gtu-yes *{font-family:Poppins,sans-serif!important}
.gtu-yes{display:block!important;width:100%!important;max-width:720px;margin:0 auto!important;background:var(--gtu-red,#D30805)!important;color:#fff!important;border:2px solid #101017!important;border-radius:14px!important;padding:20px 18px!important;font-weight:900!important;font-size:21px!important;line-height:1.25!important;text-transform:none!important;box-shadow:5px 5px 0 #101017!important;cursor:pointer;animation:gtupulse 1.8s ease-in-out infinite;white-space:normal!important}
.gtu-yes:hover{filter:brightness(1.06)}
@keyframes gtupulse{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}
.gtu-no,.gtu-no *{font-family:Lato,sans-serif!important}
.gtu-no{display:block!important;width:100%!important;max-width:620px;margin:18px auto 0!important;text-align:center!important;background:none!important;border:0!important;box-shadow:none!important;color:#6b6b75!important;font-weight:700!important;font-size:15px!important;line-height:1.45!important;text-decoration:underline!important;text-underline-offset:3px;text-transform:none!important;padding:6px 10px!important;white-space:normal!important}
@media(min-width:768px){.gtu-yes{font-size:25px!important;padding:24px 22px!important}.gtu-no{font-size:16px!important}}
@media(prefers-reduced-motion:reduce){.gtu-yes{animation:none!important}}
```
- GHL button DOM: `div.c-button.c-wrapper#button-XXXX > button#button-XXXX_btn.cbutton-XXXX` (action button) or `> a#button-XXXX_btn[href]` (URL link); the text sits in `.main-heading-button`.
- `white-space:normal` is required, or the long YES text overflows on phones.
- **Keep the texts starting exactly with "YES!" and "No thanks"**, or the tagging breaks and the buttons fall back to GHL's default look.
- The script also tags a native NO button, so if someone later replaces the NO link with a native button, it is styled the same.
- The planned wrapper class `.gtu-btns` didn't exist in GHL's markup; `:has()` on `.c-button`, `.c-custom-code` and the section replaced it.

## 6. The NO link

Typed into the Code element under YES:
```html
<a class="gtu-no" href="https://davidhsai.com/headstart-thank-you">No thanks, I'll keep guessing which products and hooks work, and take 10x longer to get my sales.</a>
```
Why a code link and not a second native button (David asked for both buttons in GHL, like the reference): a decline needs no payment action, and a native button's "link to" is the same native select the pane can't operate (D1). The code link avoids that and is styled by the fragment. If the person prefers a native NO button: Button → Text "No thanks, ..." → Button Actions → link to = the URL option → the thank-you URL; the fragment styles it anyway.

## 7. The YES action: setting, blocker and human handoff

**The setting:** select the YES button → right panel **General** → scroll to **Button Actions** → **link to** = **One click up/down sell product** → **Products** = the step product (`My $4M TikTok Shop System`) → page **Save** → **Publish**. New buttons default to link to = "Open popup" with an empty "Popup" field.

**The blocker (expect it):** "link to" and "Products" are native `<select>` menus inside the cross-origin builder iframe. From the browser pane: the open list is never drawn; click, chevron click, typing "One" + Return, Down + Return, Space and double-click all leave "Open popup"; arrow keys scroll the panel; Escape deselects the button; `find` returns "No matches"; `javascript_tool` can't reach into `page-builder.leadconnectorhq.com`. Copying a working YES button from another funnel (Saved Assets) doesn't help: its Products select would still need changing (and on Rickey's build that picker didn't open either).

Try once. If the value stays "Open popup", stop and hand it off. Don't burn time.

**Human handoff message (send it as is, filled in):**
> Everything on the upsell is live except one setting I can't reach from my browser: the YES button's action. It takes about 30 seconds:
> 1. GHL → Sites → Funnels → "<funnel name>" → **Upsell** → **Edit**.
> 2. Click the **YES** button on the page.
> 3. In the right panel (General), scroll to **Button Actions** → **link to** → choose **One click up/down sell product**.
> 4. **Products** → choose **<step product name>**.
> 5. Click **Save** (disk icon), then **Publish**.
> Until this is done, the YES button does nothing. Tell me when it's done and I'll check it.

Offer two buttons: "Done, test it" and "Use my Chrome". The second means trying Claude in Chrome (`mcp__claude-in-chrome__*`) in the person's own signed-in Chrome, where native selects may work. That route is **unverified**; use it only with the person's OK.

Other untried ideas, for the record: opening the iframe URL as the top page so DOM tools are same-origin is **not allowed** (it broke the session once; see `builder-quirks.md` S4).

**How to check it was done:** `check_funnel.mjs` and the live-page JS can only see that a YES button exists, not its action. Ask the person to confirm the two fields, or check during the test purchase (YES charges and lands on the thank-you page).

## 8. Checkout routing

Checkout builder → click the order form → **Customize order form** → **Checkout options** → **After purchase** = **Go to the next funnel step** (custom dropdown: open → `Up`/`Down` as separate keys → `Return` → `zoom`; it once landed on "Choose a specific funnel step") → close the modal (X) → page **Save** → **Publish**. The funnel's step order must be Checkout → Upsell → Thank You.

## 9. Verify live and fix (design fixes never need the builder)

At 393×852 on `https://<domain>/<upsell path>`:
```js
const W=document.documentElement.clientWidth; ({W, scrollW:document.documentElement.scrollWidth,
 wide:[...document.querySelectorAll('#gtu *, .c-button, .c-button *, .gtu-no')].filter(e=>e.getBoundingClientRect().right>W+1).slice(0,8).map(e=>(e.className||e.tagName).toString().slice(0,40)+' '+Math.round(e.getBoundingClientRect().width)),
 yes:!!document.querySelector('.gtu-yes'), no:!!document.querySelector('.gtu-no')})
```
Pass: `scrollW === W`, `wide` empty, `yes` and `no` true.

Mobile fixes found on Rickey's page (all in the fragment, pushed, no GHL edit):
1. **Image overflow:** `scrollW 778` vs `W 393`, offender `shot 760`. `#gtu .shot{max-width:760px}` beat `#gtu img{max-width:100%}` (class outranks element). Fix: `#gtu .shot{width:100%;max-width:760px}`.
2. **Buttons touching the screen edge:** 18 px side padding on the button wrappers via `:has()` (section 5).
3. **Bullets split into columns:** a `<b>` inside a flex `li` became its own flex item. Wrap each `li`'s content in one `<span>`.
4. **NO link not centered:** `text-align:center!important`.

After a push, poll Pages for a marker from the change (e.g. `grep -q 'shot{width:100%'`), reload, re-check, then check desktop at 1280×800 and reset with `resize_window preset:"desktop"`. Scroll to sections for screenshots with `window.scrollTo(0, el.getBoundingClientRect().top+scrollY-N)` on `.bridge`, `.total`, `.guar`.

## 10. After the upsell

- YES (once set) charges the saved card and GHL continues to the next step (Thank You). NO goes straight to the thank-you URL.
- **Delivery of the upsell is a separate job** (it was not built on Nov 20): a course or content for the upsell, plus a workflow "Order submitted, Global product Is <upsell catalog product>" → Grant course access → email. Recipe in `memberships-and-workflows.md`.
- The thank-you page can't tell whether the upsell was bought. Put upsell access in its own email.

## 11. Done when

- [ ] Upsell catalog product + step product (public name without prefix).
- [ ] Page: loader + YES button (text starts "YES!", element named) + NO link; saved; published.
- [ ] Live at 393×852: no sideways scroll; `.gtu-yes` and `.gtu-no` present; alert bar and price readable. Desktop checked.
- [ ] YES action = One click up/down sell product + Products = step product (by Claude or by the person, confirmed).
- [ ] Checkout After purchase = Go to the next funnel step.
- [ ] Upsell delivery workflow built, or listed as open.
- [ ] Placeholder item values flagged for the client.

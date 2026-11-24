# Stage 7 of 12: Upsell step

**Goal:** the Upsell step is live with our HTML (alert bar, progress bar, hero, offer stack, guarantee, lead-in arrow), a **native GHL YES button** whose action is **"One click up/down sell product"** with the upsell step product, and a plain **NO link** to the thank-you page. Both buttons are styled by the fragment. YES charges the card saved at checkout and moves on to the thank-you step; NO goes straight there.

**Why:** a one-click upsell only works if three things line up: the upsell product is on the upsell step (Stage 4), the checkout's After purchase is "Go to the next funnel step" (Stage 6), and the YES button has the one-click action. On Nov 20:
- The first upsell build was **lost**: Claude navigated away to look at another funnel's upsell button in its builder (don't: never open another client's builder), the builder said "Autosave off", nothing had been saved, and there was no "Leave site?" prompt.
- The YES button was published with its default action, **"Open popup"**, so it could not sell anything, and the old checker still passed it. The "link to" and "Products" fields are native dropdowns inside the cross-origin builder frame: clicking, typing words and arrow keys do nothing. On Nov 23 Claude set both anyway (section D) and the checker now reads the real action from the live page.
- Once the action is right, GHL shows the button **disabled, with a spinner, for about 7 to 10 seconds** after the page loads. That's normal: wait before judging it, and tell testers.
- GHL forced the YES text to 16px. The fragment now overrides `.main-heading-button` (21px phone, 25px desktop).
- On the phone the product image overflowed (page 778 px wide on a 393 px screen) and a bullet split into columns.

**Read first:** `knowledge/upsell-recipe.md`, `knowledge/upsell-checkout-bump-design.md` section D, `knowledge/builder-quirks.md`.

## Before you start (inputs)
- Stage 2: the upsell fragment live (root `gtu-root`, wrapper fix, button-tagging script, button CSS).
- Stage 3/4: the upsell catalog product and the upsell **step product** (its buyer-facing name is what the YES Products picker lists).
- Stage 6: After purchase = Go to the next funnel step.
- The YES text (must start with `YES!`) and the NO text (must start with `No thanks`): the fragment finds and styles the buttons by those first words.
- The thank-you URL.

## Steps

### A. The page and the loader (save after every element)
1. Upsell step → **Overview**. It shows the step URL, the CONTROL card (**Use existing**, **Create from blank**, **Edit**), "Start split test", **Delete Funnel Step**, **Clone Funnel Step**. `find "Create from blank"` → click the ref → wait about 12 s. Copy the page id. Close **Ask AI**.
2. Toolbar **+** (far left) → **Sections** ("Add A Section": Full Width, Wide, Medium, Small) → **Full Width**.
3. The section's center **+** (twice if needed) → Quick Add → clear the search (`End`, `Backspace` ×10) → `custom` → click **Code** (Custom group; it inserts "Custom HTML/Javascript" inside a "1 Column Row").
4. Select it → **Open Code Editor** → click inside → type the loader (the upsell root id from the plan, Rickey: `gtu-root`; the `ghl-upsell.html` URL) → zoom-check → modal **Save** → **page Save** right away. Close the "SEO & AI search optimization" panel if it opens. The header must read "Last saved …"; Publish gets a yellow dot (saved, not published).

### B. The YES button (native)
5. Close the element panel and select the row. Click the **blue +** on the bottom edge of the "1 Column Row" to **add a row below** (green + on a section's edge = section below; blue + on a row = row below; orange + on an element = element below).
6. Quick Add → clear the search → `button` → click **Button** (Form group).
7. Select the button. Right panel: **General / Styles / Animations**. Under General: **Element name**, **Text Options** (**Text**, **Sub Text**, each with a `{+}` picker), Typography, **Button Actions**, Color, Icon.
   - **Text** (default "Get Started"): click → `End` → `Backspace` ×20 → type `<YES text from the plan>` (it must start with `YES!`; Rickey: `YES! Add My $4M TikTok Shop System to My Order For Only $97`) → zoom.
   - **Element name:** click → `End` → `Backspace` ×12 → type `YES button (one-click upsell)` → zoom. It now shows on the canvas label and in the breadcrumb.
   - Leave Sub Text empty. Leave colours and typography: the fragment restyles the button.
8. **Page Save.**

### C. The NO link (a small Code element)
9. With the YES button selected, click the **orange +** on its bottom edge to **add an element below** (same column). Quick Add → clear → `custom` → **Code** → Open Code Editor → type:
   ```html
   <a class="gtu-no" href="https://<domain>/<slug>-thank-you"><NO text from the plan, starting with "No thanks"></a>
   ```
   (Rickey's NO text: "No thanks, I'll keep guessing which products and hooks work, and take 10x longer to get my sales.")
   → zoom → modal **Save** → **page Save**. (A plain link avoids a second native button with another awkward native dropdown. The reference page used a native button linked to a URL; either works, because NO charges nothing.)
10. **Publish.** Toast: "Page published successfully"; badge "• Live".

### D. The YES action (Claude can set it: Ask AI + one key press)
The target: **link to = "One click up/down sell product"**, **Products = the upsell step product**, **Sale Actions = "Go to Next step"** (the thank-you step).

11. Pane at 1440×1000. Select the YES button (the right panel's title is its element name). Scroll the panel to **Button Actions** and zoom.
12. With the button still selected, click the **Ask AI sparkle** (second icon, top-left toolbar). In its **Build** tab the button shows as a chip in the box. Type, filling in your names:
    > Only change this button's action: set "link to" to "One click up/down sell product" and choose the step product "<upsell step product>" ($<price>). After purchase go to the next funnel step. Do not change any text, style, layout or other element.

    Send, wait about 30 s. It usually answers that it needs the product ID.
13. Get the ID in a second tab: `…/v2/location/{loc}/funnels-websites/funnels/{funnel}/steps/{step}/products`, column **Internal Product ID** (24 characters). Then tell Ask AI:
    > The step product ID is <id>. Set the button action to sell-product (one click up/down sell product) with that product ID. Change nothing else.

    Result: "link to" is right and Sale Actions reads "Go to Next step", but **Products stays empty**: Ask AI can't bind it.
14. **Products, by one key press.** Close the Ask AI panel. Click the **Products** select once (blue focus ring; its list never shows in the pane). Press **one** key: the first letter of the product's name, with the `key` action, once. (`type` and arrows do nothing.) Zoom: it must show your product. If two products share the first letter, press it again and zoom.
15. Click the page **Save** (disk icon, yellow dot), wait 6 s, then **Publish**, wait 7 s.
16. **Prove it on the live page:** add the upsell step to `funnel.partial.json` first, with `"yes_product": "<Internal Product ID>"` (step 13), then run `node PLAYBOOK/tools/check_funnel.mjs …`. It also fails if the product is another one or there's no sale action. (On Rickey's page the data held the step's Internal Product ID, not the catalog id.) It decodes the page data and fails unless the YES action is `sell-product` with a product. Right looks like: `YES sells (go-to-next-funnel-step)`. Wrong looks like: `its action is "openPopup"`.
17. If Ask AI isn't available or changes anything else: undo, don't save, and ★ ask the person for 4 clicks: YES button → General → Button Actions → **link to** = One click up/down sell product → **Products** = <upsell step product> → **Save** → **Publish**. Then step 16.

Ask AI may be billed to the account: say so in your report. Never copy a button from another live funnel or open another client's builder.

### E. Design fixes go through Git, not the builder
The fragment tags the native elements by their text and styles them (`.gtu-yes`: full-width red block, 2 px ink border, 5 px ink offset shadow, Poppins 900 21 px (25 px desktop), pulse animation, `white-space:normal` so the long text wraps; `.gtu-no`: centred, underlined grey Lato 15/16 px). Wrapper spacing uses `:has()`:
```css
.c-button:has(.gtu-yes){padding:4px 18px 0!important;max-width:756px;margin:0 auto!important}
.c-custom-code:has(.gtu-no){padding:0 18px 44px!important}
[class*="section-"]:has(.gtu-yes){padding-bottom:0!important}
```
Any fix: edit the file, push, poll for a marker, reload the live page. No builder edit.

## Verify
On a separate tab on `https://<domain>/<slug>-upsell`:
1. **Phone** (393×852), wait 5 s:
   ```js
   const W=document.documentElement.clientWidth; ({W, scrollW:document.documentElement.scrollWidth,
    wide:[...document.querySelectorAll('#gtu *, .c-button, .c-button *, .gtu-no')].filter(e=>e.getBoundingClientRect().right>W+1).slice(0,8).map(e=>(e.className||e.tagName).toString().slice(0,40)+' '+Math.round(e.getBoundingClientRect().width)),
    yes:!!document.querySelector('.gtu-yes'), no:!!document.querySelector('.gtu-no'), title:document.title})
   ```
   Expect `scrollW` = 393, `wide` empty, `yes` and `no` true. Rickey's first run: `scrollW 778`, offender `shot 760` (`#gtu .shot{max-width:760px}` beat `#gtu img{max-width:100%}`; fix: `width:100%;max-width:760px`).
2. Screenshot the sections: `window.scrollTo(0, document.querySelector('#gtu .offer').getBoundingClientRect().top+scrollY-20)` (also `.bridge`, `.total`, `.guar`), and the buttons. Known fixes: wrap each `li`'s text in one `<span>` (a `<b>` became its own flex item); `text-align:center` on `.gtu-no`.
3. **Desktop** 1280×800: centred column, YES 25 px, NO under it.
4. **Checker:** add the upsell step (`"yes": "YES", "no": "/<slug>-thank-you"`) to the partial file and run `check_funnel.mjs`. Expect PASS at both sizes (`YES sells (…)`, NO link ok).
5. **NO link:** `document.querySelector('.gtu-no').href` → the thank-you URL.
6. The YES action: the checker reads it from the live page data (step 16). Also zoom on it once in the builder.
6b. **Wait about 10 s** on the live page before judging the YES button: it loads disabled with a spinner.
7. Compare with `examples/rickey-headstart-funnel/screenshots/3-upsell-mobile.png` and `3-upsell-desktop.png`. Reset the viewport.

## Rickey example values
| What | Value |
|---|---|
| Builder page | `LdwO92TMbPLv9CaOVOqI` (step `2e4e00f0-5834-4f28-a2cd-ca65bc7d26d1`) |
| Live | `https://davidhsai.com/headstart-upsell` |
| Fragment | `https://shuri-lab.github.io/rickey-tiktokshop-project/offer-2-upsell/ghl-upsell.html`, root `gtu-root`, scope `#gtu` |
| Catalog / step product | `Rickey · My $4M TikTok Shop System` ($97, `6b00cb846b61070feb19cb0a`) / "My $4M TikTok Shop System" |
| YES | "YES! Add My $4M TikTok Shop System to My Order For Only $97", element name "YES button (one-click upsell)". Action set by Claude on Nov 23 (Ask AI + key press), proven in the live page data: sell-product, go-to-next-funnel-step |
| NO | `<a class="gtu-no" href="https://davidhsai.com/headstart-thank-you">No thanks, I'll keep guessing which products and hooks work, and take 10x longer to get my sales.</a>` |
| Reference studied | AI Avatars Funnel → Upsell #1 (page `xOzdUz04zbV6ZNcIkXrm`): YES = link to "One click up/down sell product", Products "AI Avatars System Upsell"; nothing saved there. Its builder was opened on Nov 20; **don't repeat that**: the labels are now documented here, and another client's builder is off-limits |
| Layout | Section 1 (full width) → Row 1: Code (loader) → Row 2: Button (YES) → Code (NO) below it |

## ★ Gates (ask the person)
- Only if step 14 fails: the person sets the YES action (4 clicks).
- Approve placeholder values in the offer stack if the client didn't give them (Rickey's $297/$47/$47/$37 were made up).

## Done when
- [ ] Page saved after each element, published.
- [ ] YES native button with the exact text and element name; NO link to the thank-you URL.
- [ ] The checker prints `YES sells (…)`. A real charge is proven only by the test order (Stage 12).
- [ ] Live: no sideways scroll at 393 px, `.gtu-yes` and `.gtu-no` present, title set; `check_funnel.mjs` passes the upsell at both sizes.
- [ ] Page id, texts and the YES status in `funnel-record.md`.

# Stage 7 of 12: Upsell step

**Goal:** the Upsell step is live with our HTML (alert bar, progress bar, hero, offer stack, guarantee, lead-in arrow), a **native GHL YES button** whose action is **"One click up/down sell product"** with the upsell step product, and a plain **NO link** to the thank-you page. Both buttons are styled by the fragment. YES charges the card saved at checkout and moves on to the thank-you step; NO goes straight there.

**Why:** a one-click upsell only works if three things line up: the upsell product is on the upsell step (Stage 4), the checkout's After purchase is "Go to the next funnel step" (Stage 6), and the YES button has the one-click action. On Nov 20:
- The first upsell build was **lost**: Claude navigated away to look at another funnel's upsell button, the builder said "Autosave off", nothing had been saved, and there was no "Leave site?" prompt.
- The YES button's **"link to"** and **"Products"** fields behave like native dropdowns inside the cross-origin builder frame. From the built-in browser pane, nothing worked (click, chevron, typing "One" + Return, arrows, Space, double-click), arrow keys scrolled the panel, and Escape deselected the element. David set the action by hand in about 30 s. Until then YES did nothing (a new button defaults to "Open popup" with no popup).
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
4. Select it → **Open Code Editor** → click inside → type the loader (root `gtu-root`, the upsell URL) → zoom-check → modal **Save** → **page Save** right away. Close the "SEO & AI search optimization" panel if it opens. The header must read "Last saved …"; Publish gets a yellow dot (saved, not published).

### B. The YES button (native)
5. Close the element panel and select the row. Click the **blue +** on the bottom edge of the "1 Column Row" to **add a row below** (green + on a section's edge = section below; blue + on a row = row below; orange + on an element = element below).
6. Quick Add → clear the search → `button` → click **Button** (Form group).
7. Select the button. Right panel: **General / Styles / Animations**. Under General: **Element name**, **Text Options** (**Text**, **Sub Text**, each with a `{+}` picker), Typography, **Button Actions**, Color, Icon.
   - **Text** (default "Get Started"): click → `End` → `Backspace` ×20 → type `YES! Add My $4M TikTok Shop System to My Order For Only $97` → zoom.
   - **Element name:** click → `End` → `Backspace` ×12 → type `YES button (one-click upsell)` → zoom. It now shows on the canvas label and in the breadcrumb.
   - Leave Sub Text empty. Leave colours and typography: the fragment restyles the button.
8. **Page Save.**

### C. The NO link (a small Code element)
9. With the YES button selected, click the **orange +** on its bottom edge to **add an element below** (same column). Quick Add → clear → `custom` → **Code** → Open Code Editor → type:
   ```html
   <a class="gtu-no" href="https://<domain>/<slug>-thank-you">No thanks, I'll keep guessing which products and hooks work, and take 10x longer to get my sales.</a>
   ```
   → zoom → modal **Save** → **page Save**. (A plain link avoids a second native button with more settings the pane can't operate. The reference page used a native button linked to a URL; either works, because NO charges nothing.)
10. **Publish.** Toast: "Page published successfully"; badge "• Live".

### D. The YES action: one try, then hand it to the person
11. Select the YES button → General → scroll to **Button Actions**. The target is **link to = "One click up/down sell product"**, then **Products = <the upsell step product>**.
12. In the built-in browser pane, **try once**: click the "link to" field and take a screenshot. If no list appears or the value doesn't change, **stop**. Don't press Escape (it deselects the element). Don't try keys in a loop (they scroll the panel). Don't open the frame URL on its own. Don't copy a button from another live funnel (its Products value would still point at the other funnel's product, behind the same blocked field; and you must never save someone else's page).
13. ★ **Ask the person** (it takes about 30 s), with the exact labels:
    1. Open GHL → Sites → Funnels → "<funnel>" → Upsell → **Edit**.
    2. Click the **YES** button.
    3. Right panel → General → **Button Actions** → **link to** = **One click up/down sell product**.
    4. **Products** = **<upsell step product name>**.
    5. **Save**, then **Publish**.

    Offer the alternative as a second button: drive the person's own Chrome with Claude in Chrome (`mcp__claude-in-chrome__*`), where native dropdowns may work. That is **untested**; use it only if they agree and are signed in to GHL there.
14. **Check it yourself after they say done:** open the upsell builder, select the YES button, scroll to Button Actions and **zoom**: you can read the values even though you can't change them. Record "YES action set by <person> on <date>" in `funnel-record.md`. Until then, record "YES does nothing" as an open item.

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
4. **Checker:** add the upsell step (`"yes": "YES", "no": "/<slug>-thank-you"`) to the partial file and run `check_funnel.mjs`. Expect PASS at both sizes ("YES: …, NO link ok").
5. **NO link:** `document.querySelector('.gtu-no').href` → the thank-you URL.
6. The YES action, checked by zoom in the builder (step 14). The checker can't see it.
7. Compare with `examples/rickey-headstart-funnel/screenshots/3-upsell-mobile.png` and `3-upsell-desktop.png`. Reset the viewport.

## Rickey example values
| What | Value |
|---|---|
| Builder page | `LdwO92TMbPLv9CaOVOqI` (step `2e4e00f0-5834-4f28-a2cd-ca65bc7d26d1`) |
| Live | `https://davidhsai.com/headstart-upsell` |
| Fragment | `https://shuri-lab.github.io/rickey-tiktokshop-project/offer-2-upsell/ghl-upsell.html`, root `gtu-root`, scope `#gtu` |
| Catalog / step product | `Rickey · My $4M TikTok Shop System` ($97, `6b00cb846b61070feb19cb0a`) / "My $4M TikTok Shop System" |
| YES | "YES! Add My $4M TikTok Shop System to My Order For Only $97", element name "YES button (one-click upsell)", action set by David by hand |
| NO | `<a class="gtu-no" href="https://davidhsai.com/headstart-thank-you">No thanks, I'll keep guessing which products and hooks work, and take 10x longer to get my sales.</a>` |
| Reference studied (read-only) | AI Avatars Funnel → Upsell #1 (page `xOzdUz04zbV6ZNcIkXrm`): YES = link to "One click up/down sell product", Products "AI Avatars System Upsell"; nothing saved there |
| Layout | Section 1 (full width) → Row 1: Code (loader) → Row 2: Button (YES) → Code (NO) below it |

## ★ Gates (ask the person)
- Set the YES action (link to + Products), unless you set it yourself in a browser where it works.
- Approve placeholder values in the offer stack if the client didn't give them (Rickey's $297/$47/$47/$37 were made up).

## Done when
- [ ] Page saved after each element, published.
- [ ] YES native button with the exact text and element name; NO link to the thank-you URL.
- [ ] YES action = One click up/down sell product + the upsell step product, confirmed by zoom (or listed as open).
- [ ] Live: no sideways scroll at 393 px, `.gtu-yes` and `.gtu-no` present, title set; `check_funnel.mjs` passes the upsell at both sizes.
- [ ] Page id, texts and the YES status in `funnel-record.md`.

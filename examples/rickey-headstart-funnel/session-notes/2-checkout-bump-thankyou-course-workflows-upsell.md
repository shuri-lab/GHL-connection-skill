# GHL Funnel Playbook: mined notes, part 2 (middle of the Nov 20 2026 session)

Source: `mine/ghl2.txt` (raw session transcript, not included in this repo; post-compaction continuation through David's big feedback round and the study of the reference upsell page). The actual upsell build (GHL product, page, buttons, YES-action blocker, after-purchase switch) happened right after this slice, so it was read from the start of `mine/ghl3.txt` (also not included; lines 1-2106) and the full session log to make section C complete. Final file states were checked against the repo: `offer-1-sales-page/ghl-checkout-left.html`, `offer-1-sales-page/ghl-thank-you.html`, `offer-2-upsell/ghl-upsell.html`, `README.md`.

Project constants used below (swap per client):

| Thing | Value in this project |
|---|---|
| Sub-account | Hot Pursuit LLC (location id `54EJrjBw49eCsIsOZH44`) |
| Funnel | "Rickey · TikTok Shop Headstart" (funnel id `DH9wPGw485e8HHkbWJaf`), domain davidhsai.com |
| Steps | Sales `/headstart-page` → Checkout `/headstart-checkout` (step `feb56458-…`, builder page `NPewVghQNsX2rU9aEb0q`) → Upsell `/headstart-upsell` (step `2e4e00f0-…`, builder page `LdwO92TMbPLv9CaOVOqI`) → Thank You `/headstart-thank-you` (step `eb441c41-…`, builder page `gm6ze7UIIxHSVB1HTQ8M`) |
| HTML host | GitHub Pages `https://shuri-lab.github.io/rickey-tiktokshop-project/` (public repo) |
| Brand | red `#D30805`, ink `#101017`, cream `#FFF8E7`, line `#E7E3DC`; Poppins (headings), Lato (body), Caveat (signature) |
| Naming rule | Every new internal GHL item is prefixed with the client tag "Rickey ·". Buyer-facing names (course title, funnel product display name) are NOT prefixed. |
| Safety rules followed | Never touch other projects' items (AI Avatars funnel/courses/products, existing draft workflows), Stripe connection, domains, users, billing. Never type card data. Never save/publish a page that belongs to another live funnel. |

---

## A. Step-by-step log of every GHL task in this slice

### A1. Checkout: order form theme color (Accent = brand red)
- **Request:** finish the checkout styling (carry-over task from before compaction).
- **How:** Checkout builder → select the Order Form element → its settings ("Form settings" modal) → **Theme & style** → **Theme & brand** → **Accent** color picker → **Custom Colors + Add** → hex field = `D30805`, name = "Game Tape Red" → confirm name → Save → Escape closes the picker. Primary text was already near-black, left as is.
- **Problems:** (1) The first coordinate click after the picker opened failed with "this tab's page, zoom or size has changed; take a new screenshot". (2) `triple_click` + type did not replace the hex value; `cmd+a` + Backspace did not clear it either.
- **Workaround:** take a fresh screenshot before any coordinate action; to clear the hex field: click it → `End` → `Backspace ×20` → wait 1s → zoom to verify the placeholder shows → type `D30805` once → zoom to verify.
- **Verification:** zoomed screenshot of the picker; button turned red in the live preview.
- **General procedure:** Form settings → Theme & style → Theme & brand → set Accent (buttons, checkbox, focus) and Primary text to brand colors via "Custom Colors + Add". Always clear fields with End+Backspace, never trust select-all.

### A2. Checkout: left column (offer summary) via Custom Code loader
- **Request:** two-column checkout like David's reference screenshot (offer info left, order form right).
- **How:**
  1. Wrote `offer-1-sales-page/ghl-checkout-left.html` (scoped `#gtc`): logo, pill "You're one step away", H1, mockup image, dark "What you get today" box with crossed-out values ($57/$47/$97), "Total value ~~$201~~", "Today $27", dashed-border guarantee box using the exact approved copy ("Your Money's Protected / Do the 30-day challenge, post every day, and if you haven't made a sale in 90 days, you get a full refund."). Checked the approved wording in `copy.md` first and replaced a paraphrase with it.
  2. Committed + pushed to GitHub.
  3. In the builder: click the empty left Custom Code element → **Open code editor** (right panel) → click into the editor → type the loader (see B1) → **Save** (in the code modal) → top-right **Save** (disk icon) → **Publish**.
- **Problems:** (1) Clicking Save opened an SEO panel by accident: close it, then Publish. (2) First live check showed GitHub's "Page not found" page inside the column: Pages hadn't deployed the new file yet, and this first loader had no `r.ok` check, so it injected the 404 HTML.
- **Workaround/fix:** poll Pages until it returns 200 before checking live (`for i in …; curl -s -o /dev/null -w '%{http_code}' URL`), and use the guarded loader (`if(!r.ok){throw 0;}` + `.catch(function(){})`) for all later pages.
- **Verification:** live https://davidhsai.com/headstart-checkout on desktop (two columns, Stripe card field, bump checkbox; CTA faded until the form is valid) and at 393×852 (offer summary first, form below).
- **General procedure:** left column = Custom Code element loading an HTML fragment; right column = native Order Form. Publish, wait for Pages, then check live at desktop and 393×852.

### A3. Guide PDFs for delivery
- Copied the two Offer 1 PDFs into the repo under clean URLs: `downloads/30-day-first-sale-challenge.pdf`, `downloads/starter-product-list.pdf` (public on GitHub Pages "for now"; move to GHL Media before the repo goes private).

### A4. Thank-you page
- **Request:** build the thank-you page from Moses's copy, WhatsApp link as a placeholder.
- **How:**
  1. Wrote `offer-1-sales-page/ghl-thank-you.html` (scoped `#gty`, root `#gtty-root`), with all variable links in one config object `GT_LINKS={course:'',whatsapp:'',support:''}` (empty = greyed placeholder state + a note).
  2. GHL: from the builder press Back (top-left) to the funnel → **Thank You** step → **Overview** → **Create from blank** (wait ~6-11s; builder opens with the "Ask AI" panel open: close it).
  3. On the empty page, Insert Element → search "custom" → clicking the card added nothing. Workaround: **Add section** → elements panel **Sections** category → full-width section → the section's **+** (click once to open, once more for "Add") → Quick Add search `custom` → **Custom HTML/Javascript** card.
  4. Select the element → Open code editor → type the loader (`gtty-root`, guarded version) → Save → Save page → Publish.
- **Problems:** (1) Thin 20px white strip at the top. JS ancestry walk on the live page showed `section-F-CL68HH2J pt:20px`: GHL sections are `<div class="… c-section … section-XXXX">`, not `<section>`, so the reset rule `section:has(#gtty-root)` missed it. Fix: add `[class*="section-"]:has(#gtty-root)` to the reset. (2) After pushing, Pages served the old file for ~1+ minutes (a curl after 45s still showed the old content). (3) Mobile: the numbered step circles were squashed because `flex:0 0 44px` in a `flex-direction:column` layout sizes the height, not the width. Fix: `#gty .n{flex:none;width:44px;height:44px;…}` and `#gty .rk img{flex:none;…}`.
- **Course link:** once the course existed, set `GT_LINKS.course` to the client-portal URL (A6) with a one-line `sed`, pushed.
- **Verification:** live page at desktop and 393×852 after polling Pages with a cache-busting query (`?x=$i`) until the new marker string appeared ("live after ~60s").
- **General procedure:** see section D.

### A5. Course in Memberships
- **Request:** "TikTok Shop Headstart" course granted on purchase (videos to be filmed later).
- **How:**
  1. Direct URL `/v2/location/<loc>/memberships/courses/products` returned a 404 shell. Use the menu instead: Memberships → **Courses ▾** → **Products** (lands on `/memberships/courses/products-v2`).
  2. Two existing AI Avatars courses had members (4 and 6): left untouched; created a new one: **Create New** → start from scratch (`course-creator-studio?view=starter`).
  3. Wizard: **Details** (title "TikTok Shop Headstart" with no client prefix because buyers see it; description "Rickey's 7-day course to get your first TikTok Shop sales, starting from zero. Do one lesson a day, about 15 minutes each, then follow the 30-Day First Sale Challenge.") → **Upload Thumbnail** (skipped: the browser pane can't upload files) → **Pricing**: options Free / Recurring / One Time. "Free course: anyone with the link can enroll at no charge", so chose **One Time** and $27 → **Create Course**.
  4. GHL creates the course with sample lessons in a module "Course Contents" ("Welcome Aboard!", Lesson 1-3, "What's Next?"). Lesson titles came from the approved copy's numbered list (the course deck PDF had no extractable text; `pypdf` wasn't installed at that point).
  5. Renamed sample lessons: hover a lesson → edit → name + description → **Save and publish**: "Start here: welcome + your downloads" (description includes the 30-Day guide URL), "Day 1: How TikTok Shop works + posting your first video", "Day 2: Getting to your first 1,000 followers (the gate that lets you sell)", "Day 3: Picking a product that sells", "Day 4: Hooking people in the first 2 seconds". Description template: "Rickey's Day N video is coming here. Watch it, then do today's task from your 30-Day First Sale Challenge."
  6. Added Days 5-7: **Add Content** → **Lesson** → title → module dropdown = "Course Contents" → Create (creates a **draft**) → open it → description → Save and publish. "Day 5: Filming your first product video on the phone you already own", "Day 6: Posting the right way + keeping your account safe", "Day 7: Your first sale + what to do next".
- **Problems:** (1) `cmd+a` in the lesson name field sometimes didn't select, so the new title got appended (Day 2 and Day 3 came out wrong); fixed with click → End → Backspace ×90-100 → type → zoom to verify. (2) Module dropdown: plain click on the option didn't register; keyboard Down+Return worked once then stopped; clicking by `find` ref highlighted it and Return confirmed. Most reliable: open dropdown → `hover` the option → `Return`.
- **Side effect noticed:** creating the course auto-created a Payments product "TikTok Shop Headstart" (type MEMBERSHIP/Service, $27). Left alone; the checkout uses "Rickey · TikTok Shop Headstart".
- **Offers tab:** course → **Offers (Advanced)** was empty ("Nothing here!"). New-style GHL courses don't need an offer: access is granted by the workflow action **Grant course access**. Banner seen: "Classic courses retires Dec 1, 2026".
- **Login URL:** Memberships → **Client Portal ▾ → Dashboard** → "Client portal URL" (format `https://<location id lowercased>.app.clientclub.net/`).
- **Verification:** all 8 lessons published (screenshots of the outline).

### A6. Delivery workflow "Rickey · Headstart delivery"
- **How:**
  1. Automation → Workflows (direct URL `/v2/location/<loc>/automation/workflows` shows a 404 note but loads after a few seconds) → **Create workflow** → **Start from scratch**. A prompt about saving mode appeared: kept **manual save** so no account setting changed.
  2. Rename: click the title (pencil) at top → type → Return.
  3. **Add new trigger** → search `order` → under **Payments**: "Order form submission" / **Order submitted** ("Fires after checkout completion in Funnel/Store") → pick Order submitted.
  4. **Filters** → Select → Standard fields: **Global product** (other options: Order source, custom fields) → operator **Is** → product list → type `Headstart` → hover + click "Rickey · TikTok Shop Headstart" → **Save trigger**.
  5. **+** under the trigger → search `course` → **Grant course access** ("Give a contact access to a course") → Course = "TikTok Shop Headstart" → **Save action**. Save the workflow (top-right Save).
  6. **+** → search `send email` → **Send email**: Action name "Delivery email", Subject "You're in. Here's Day 1", Preview text "Your course login, your guides and the Rickey Army link." → body via the editor's **source code** (`<>`) view (see pitfalls) → Save source → Save action → Save workflow.
  7. Top toggle **Draft → Publish**.
- **Problems:** (1) Long HTML typed in one go got garbled (dropped keystrokes) and duplicated "Hey". (2) Select-all in the source box stopped working; modifier keys didn't reach it; `find`/`form_input` can't see the textarea (cross-origin frame). Fix: Cancel the source dialog → in the visual editor click body → `cmd+a` → Backspace (works there) → reopen source → type one paragraph at a time (≈100-230 chars per `type`, 1s wait between) → zoom-check after each batch. (3) The editor stripped paragraph spacing: put inline `style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6"` on every `<p>`. (4) Saving flagged a field error: a **From name** requires a **From email**; the sender address was unknown, so the From name was cleared (End + Backspace ×10) and GHL's default sender is used.
- **Final email body (chunks typed in this order):**
  ```html
  <p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">Hey {{contact.first_name}},</p>
  <p style="margin:0 0 16px;…">You're in. Here's everything in one place:</p>
  <p style="margin:0 0 12px;…">1. Your course: <a href="https://<loc>.app.clientclub.net/" style="color:#D30805;font-weight:bold">Open my course</a>. Your login: {{contact.email}}. First time in? Click "Forgot password" on the login page to set your password.</p>
  <p style="margin:0 0 12px;…">2. Your 30-Day Guide: <a href="…/downloads/30-day-first-sale-challenge.pdf" style="color:#D30805;font-weight:bold">Download</a></p>
  <p style="margin:0 0 16px;…">3. The Rickey Army, my private WhatsApp channel: <a href="https://WHATSAPP-LINK-GOES-HERE" style="color:#D30805;font-weight:bold">Join</a></p>
  <p style="margin:0 0 16px;…">Do Day 1 today. It's about 15 minutes, and it's the one that gets you moving.</p>
  <p style="margin:0 0 16px;…">Rickey</p>
  <p style="margin:0;…">P.S. Stuck on anything? Just reply to this email.</p>
  ```
- **Verification:** preview in the action panel; workflow canvas shows Order Submitted ("Global product is in 'Rickey · TikTok…'") → Grant Course Access → Delivery email; published. No end-to-end test purchase was run.

### A7. Bump delivery workflow "Rickey · Starter Product List delivery"
- **Why a second workflow:** GHL can't show/hide parts of one email based on whether the bump was bought, so each product gets its own trigger + email.
- **How:** same steps: Order submitted → Filter Global product **Is** "Rickey · The Starter Product List" (search `Starter`) → Send email "Starter Product List email", Subject "Your Starter Product List", Preview "Pick your first products tonight instead of guessing.", body:
  ```html
  <p …>Hey {{contact.first_name}},</p>
  <p …>Here's The Starter Product List you added to your order: <a href="…/downloads/starter-product-list.pdf" style="color:#D30805;font-weight:bold">Download</a></p>
  <p …>Pick your first products tonight instead of guessing.</p>
  <p style="margin:0;…">Rickey</p>
  ```
  → Save → Publish.

### A8. Product cross-check
- Funnel → Checkout step → **Products** tab lists: "TikTok Shop Headstart" $27 One Time (the funnel display name; underlying global product "Rickey · TikTok Shop Headstart") and "The Starter Product List" **Bump** $17 One Time. Payments → Products listed 5 products: the auto-created MEMBERSHIP "TikTok Shop Headstart" ($27, Service), "Rickey · The Starter Product List" ($17, Physical), "Rickey · TikTok Shop Headstart" ($27, Physical), and two AI Avatars products. Conclusion: the workflow filter must use the **global product** that the funnel step points to, not the course's auto-created membership product.

### A9. First wrap-up and the test-purchase question
- Checkout is on **live** Stripe; Claude can't enter card details. Options offered: David buys once with the bump, checks both emails and the course login, then refunds; or switch the funnel to **Stripe test mode** (funnel Payment mode toggle) and buy with a test card (real buyers can't pay while in test mode). README got a "GoHighLevel funnel" status table.

### A10. Feedback round (David's long message) → plan
David's asks, in order: (1) remove the order-bump announcement from the sales page; (2) make all sales-page media load fast; (3) mobile checkout: left column too tall, form below the fold, make it compact (desktop unchanged); (4) restyle the contact section (font, inputs), remove "Select Product"; payment section and "GET INSTANT ACCESS" button are fine; (5) order bump: add the product image, stronger copy with a concrete product count, background, animated arrow, dashed border, make it pop; (6) build the upsell page in custom HTML modeled on davidhsai.com/upsell-1-product--model-videos-page, with two GHL buttons (YES one-click at $97, NO link). Plan list created with these 8 steps.

### A11. Sales page: bump removed + speed (summary only)
- Removed the bump block and its lone "1 / 2" step labels from `body-src.html` (the sales page source in the Rickey project repo, not here); verified tag balance; no "Starter Product List" text remains on the live page.
- Speed (details skipped per brief): all images → WebP at display size in `images/opt/` (Pillow in a venv), `srcset`/`sizes`, `decoding="async"`, `loading="lazy"` except hero; videos via Cloudinary `w_320,q_auto:eco,ac_none,du_10,f_auto`, loaded by IntersectionObserver, loop duplicates wait for the original's `loadeddata` so each video downloads once. One rebuild script regenerates body → page → check → export → repo copy → GHL fragment with absolute URLs. Live measurement via `performance.getEntriesByType('resource')`: ~1.2 MB images on phone (~1.5 MB desktop) vs ~15 MB before. The checkout/thank-you fragments were also switched to the WebP files.

### A12. Bump copy research
- Counted the Starter Product List PDF with `pypdf`: 37 product picks = 29 across 8 all-year lanes + 8 viral "scroll stoppers", plus a seasonal calendar. Used the real count in the copy (David asked for "X amount of products").

### A13. Checkout rework (mobile compact, form styling, Select Product, bump)
- **Discovery:** probed the live checkout DOM with JS (element paths for "Contact information", "Full Name *", "Select Product", "Subtotal", bump headline, checkboxes; plus a trimmed `outerHTML` of `.c-order-form`). That gave every class name in B3.
- **Build:** rewrote `ghl-checkout-left.html`: desktop block `.gtc-d` + phone card `.gtc-m`, plus global CSS that restyles `.c-order-form`, plus the enhancer script. Pushed. Nothing changes in GHL for this part (the loader already points at the file).
- **GHL bump settings:** builder → select the Order Form → its settings button → **Order bump** → kept preset **Hairline** (plain; CSS restyles it) → click the bump item "Rickey · The Starter Product List · $17 · Customer selects" → Content: **OTO headline** "Only $17 today. One-time payment." (was "[ONE-TIME ADD-ON] Only $17!"), **Description** "Stop guessing what to sell. Get 37 hand-picked products you can start promoting this week: 29 picks across 8 lanes that sell all year, 8 viral scroll-stoppers, plus a seasonal calendar that shows you what's about to spike. Pick your first products tonight." (Headline unchanged: "Yes! Add The Starter Product List"). **Custom image** is "Upload image" only, so the image is injected by the script instead. Close (X top-right) → Save → Publish.
- **Problems:** description textarea: `cmd+a` didn't select, new text mixed into old. Fix: click → `cmd+Down` → Backspace ×500 (5 batches of 100) → Delete ×300 → zoom to confirm empty → type.
- **Iterations after live check at 393×852:** (1) bump layout: description was squeezed in the 3rd grid column → made `.order-form__bump-body{display:contents}` so headline/OTO sit next to arrow+checkbox and the description spans full width; image moved inside the description and floated right (110px, 96px under 400px); removed the summary top border (only the total row has a 1px top border, found with a JS border scan). (2) Text was centered by GHL → `text-align:left!important` on headline/OTO/desc.
- **Verification (JS on the live page):** before = "Total due today $27.00"; click `.order-form__bump-check` → "$44.00"; click again → "$27.00"; `.order-form__prod-radio` still checked; exactly 1 `.gt-bump-img` and 1 `.gt-arrow` after re-renders. Desktop checked at 1280×800.

### A14. Reference upsell study
- Loaded https://www.davidhsai.com/upsell-1-product--model-videos-page and dumped `.c-section`s and button elements with JS:
  - Section 1: alert "Your order is on the way & will be available to download in the next 5 minutes. Please watch this important video below for access details and an exclusive opportunity..."
  - Section 2: "⚡ You Just Unlocked The System. Now Get Results 10x Faster..." + VSL ("Hit play on the video and Enable sound")
  - Section 3: countdown "Next Step Will Unlock when the timer reaches Zero"
  - Section 4: offer row `row-MpwJqze4wB` with `display:none` until the timer ends: "ONLY $67 $47 NOW", description, "➡️ This is exclusive one-time offer. Only available right here, right now", YES, NO.
  - YES = native GHL Button: `div.c-button#button-XXXX > button#button-XXXX_btn.cbutton-XXXX.pulse-button` (no href: one-click action). NO = also a GHL Button but rendered as `<a href="https://www.davidhsai.com/thank-you">` (link-to-URL action).
  - Revealed the hidden row with `document.getElementById('row-…').style.display='block'` to screenshot its styling (live page, nothing saved).
- Offer 2 contents: offer stack PDF text via `pypdf`; Offer 2 course deck is image-only, and the Swift/PDFKit renderer no longer compiled (SDK/compiler mismatch), so page images were pulled out of the PDF with `pypdf` + Pillow into a contact sheet to read the 8 module titles. Offer 2 product image: `project-files/offer-2-image-v2.png` (in the Rickey project repo, not here) ("My $4M TikTok Shop System": laptop + three guides).

### A15. Upsell build (from ghl3 lines 1-2106)
1. Images: copied the Offer 2 image, made `offer-2-system-720/1280.webp` and 240px thumbnail crops of each item (`o2-course`, `o2-hooks`, `o2-formats`, `o2-checklist`) with Pillow; checked a preview strip.
2. Wrote `offer-2-upsell/ghl-upsell.html` (see C), added the button-tagging script, pushed, waited for Pages (~70s), previewed the raw file at 393×852 before touching GHL.
3. **Product:** Payments → Products → **Create Product** → turned off **Include in Online store** → title "Rickey · My $4M TikTok Shop System" → **Pricing** section: amount 97 (one-time) → "Additional options" has no product-type option (defaults to Physical like the others; irrelevant for one-click) → Save.
4. **Attach to step:** Funnel → **Upsell** step → **Products** tab → **Add Product** → Products dropdown (type `4M`, hover option, Return) → **Price** dropdown "Rickey · My $4M TikTok Shop System @ 97" (hover, Return) → **Product name** (prefilled; clear with End + Backspace ×80 + Delete ×40) = "My $4M TikTok Shop System" → (Price display override optional) → Save.
5. **Page:** Upsell → Overview → **Create from blank** (wait ~12s) → close Ask AI → Add elements (**+**, top-left toolbar) → Sections → full-width section → section **+** twice → search `custom` → Custom HTML/Javascript → Open code editor → type loader (`gtu-root`, guarded) → Save.
6. **Buttons, first attempt (lost):** added a second wide section, Quick Add `button`, duplicated it (duplicate icon on the element toolbar) for NO, set YES text and element name, then could not set **Button Actions → link to** (blocker, see C6). Navigated away to inspect the AI Avatars upsell, and because the builder shows **"Autosave off"** and nothing had been saved, the whole upsell page was empty when reopened.
7. **Rebuild, saving after every step:** section + code element → Save code → Save page. Select the section/row → **add row below** (the "+" under the row) → Quick Add `button` → Button element → Text "YES! Add My $4M TikTok Shop System to My Order For Only $97", Element name "YES button (one-click upsell)" → Save page. Select the button → **+** below it (adds into the same column) → Custom HTML/Javascript → code `<a class="gtu-no" href="https://davidhsai.com/headstart-thank-you">No thanks, I'll keep guessing which products and hooks work, and take 10x longer to get my sales.</a>` → Save → Save page → Publish.
8. **Live checks (393×852):** JS overflow scan `{W:393, scrollW:778, wide:["shot 760"]}` → fixed `.shot` width; buttons got their classes (`.gtu-yes`, `.gtu-no` present). Second pass fixed bullet layout and centered the NO link. Desktop 1280×800 checked.
9. **Checkout → upsell routing:** Checkout builder → Order Form settings → **Checkout options** → **After purchase** (this dropdown DOES open): options "Go to the next funnel step" / "Go to a website URL" (was selected, pointing to the thank-you URL) / "Choose a specific funnel step". Keyboard: hover + Up + Return landed on "Choose a specific funnel step"; reopened, Up, Up, Return → **Go to the next funnel step** → close → Save → Publish.
10. Final check of the sales page at 393×852: `scrollWidth` = viewport, 0 broken images. README updated (upsell row + "Speed" section + after-purchase note).
11. **Blocked:** the YES button's one-click action had to be set by David (C6).

---

## B. Checkout page recipe

### B1. Page structure in GHL
- One section (full width) → one **2-column row** → left column: **Custom HTML/Javascript** element (loader) → right column: **Order Form** element.
- Loader (guarded version, use this one everywhere):
  ```html
  <div id="gtc-root"></div><script>(function(){var u='https://<pages-host>/<repo>/offer-1-sales-page/ghl-checkout-left.html';fetch(u,{cache:'no-cache'}).then(function(r){if(!r.ok){throw 0;}return r.text();}).then(function(h){var root=document.getElementById('gtc-root');root.innerHTML=h;root.querySelectorAll('script').forEach(function(s){var n=document.createElement('script');n.textContent=s.textContent;s.parentNode.replaceChild(n,s);});}).catch(function(){});})();</script>
  ```
  Notes: `innerHTML` doesn't run scripts, so each `<script>` is re-created. This version copies inline scripts only (the sales-page loader also copies `src`). The fragment's `<style>` is global, which is exactly what lets it restyle GHL's order form in the other column.

### B2. Left column: desktop vs compact mobile
- Desktop `.gtc-d` (unchanged from v1): logo (WebP 400w, 34px tall), red pill, H1 26px Poppins 800 with red span, mockup image, dark box `#101017` radius 16 with red ✓ circles and crossed values, total row with 2px red top border, "Today $27" with the price on a red chip, dashed red guarantee box. Max width 520px.
- Phone `.gtc-m` (≤767px; `.gtc-d` hidden): only
  - small centered logo (22px tall);
  - one dark card: `grid-template-columns:96px 1fr`, 96px mockup thumbnail, title "TikTok Shop Headstart" (Poppins 800 16px), one line of contents "7-Day Course + 30-Day Challenge + Rickey Army channel" (12.5px, 78% white), price row `<s>$201</s><b>$27 today</b>` (red chip);
  - trust row "✓ One-time payment · ✓ Instant access · ✓ 90-day refund" (11.5px).
  - Plus padding trims so the form starts high:
    ```css
    [class*="section-"]:has(.c-order-form){padding-top:6px!important;padding-bottom:6px!important}
    .c-column:has(#gtc-root)>.inner,.c-column:has(.c-order-form)>.inner{padding-top:4px!important;padding-bottom:4px!important}
    ```
- Why this approach: GHL stacks columns on mobile with the left column first; instead of reordering GHL columns, the left column renders a ~150px card on phones. Result: "1 Contact information" starts well above the fold at 393×852.

### B3. GHL order form DOM (as rendered on the live page)
```
div#order-form-XXXX.c-order-form.c-wrapper
 └ div.order-form__surface.order-form__surface--input-line.order-form__surface--labels-above.order-form__surface--products-table
    ├ div.order-form__split
    │  ├ div.order-form__form-col
    │  │   div.order-form__headline.order-form__headline--with-sub  ("Contact information")
    │  │   div.order-form__subheadline                              ("Upgrade Your Order & Save!")
    │  │   div.order-form__field-grid > div.order-form__field > div.order-form__control >
    │  │        label.order-form__label ("Full Name *") + input.order-form__input[aria-label="Full Name"]
    │  │        label.order-form__label ("Email *")     + input.order-form__input[type=email][aria-label="Email"]
    │  └ div.order-form__offer-col > div.order-form__offer-stick
    │      div.order-form__offer.order-form__offer--quantity-hidden
    │         div.order-form__offer-head ("Select Product")
    │         div.order-form__product-table-head ("Item" / "Price")
    │         label.order-form__prod.order-form__prod--selected > input.order-form__prod-radio[checked] … .order-form__prod-name / .order-form__prod-desc / .order-form__prod-price
    │      div.order-form__bumps > div.order-form__bump.order-form__bump--row.order-form__bump--img-none.order-form__bump--cb-left.order-form__bump--align-left
    │         input.order-form__bump-check[type=checkbox]
    │         div.order-form__bump-body > .order-form__bump-headline / .order-form__bump-oto / .order-form__bump-desc / .order-form__bump-price
    │      div.order-form__summary > div.order-form__summary-row (Subtotal) + div.order-form__summary-row.order-form__summary-row--total ("Total due today")
    ├ (hidden) input[name=cf-turnstile-response]
    └ div.order-form__payment
        div.order-form__pay-head ("Payment details")
        div.payment-form … div.StripeElement (iframe)
        button.order-form__cta[disabled until valid] > i.order-form__cta-icon + span.order-form__cta-text (> span + span.order-form__cta-sub)
        div.order-form__footer ("Secure checkout powered by Stripe")
```
Form settings that produced this (set before/at the start of this slice): Steps = one-step; Contact fields = Full Name + Email only; Products: quantity, multi-product and coupons off; Content: step headline "Contact information", button "GET INSTANT ACCESS →", subtext "One-Time Payment • Instant Access", footer "Secure checkout powered by Stripe"; Theme: Accent `#D30805`.

### B4. Form styling CSS (in the left-column fragment, applies globally)
```css
.c-order-form,.c-order-form *{font-family:Lato,system-ui,sans-serif}
.c-order-form .order-form__surface{background:#fff;border:1px solid #E7E3DC!important;border-radius:16px!important;box-shadow:0 10px 30px rgba(16,16,23,.07)!important;padding:22px 20px!important}
/* numbered steps "1 Contact information", "2 Payment details" */
.c-order-form{counter-reset:gtstep}
.c-order-form .order-form__headline,.c-order-form .order-form__pay-head{display:flex!important;align-items:center;gap:10px;font:800 19px/1.2 Poppins,sans-serif!important;color:#101017!important;margin:0 0 14px!important;letter-spacing:0}
.c-order-form .order-form__headline:before,.c-order-form .order-form__pay-head:before{counter-increment:gtstep;content:counter(gtstep);flex:none;width:28px;height:28px;border-radius:50%;background:#101017;color:#fff;font:800 14px/28px Poppins,sans-serif;text-align:center}
.c-order-form .order-form__subheadline{display:none!important}
/* boxed inputs instead of thin underline */
.c-order-form .order-form__field-grid{gap:12px 14px!important}
.c-order-form .order-form__label{display:block;font:700 14px/1.2 Lato,sans-serif!important;color:#101017!important;margin:0 0 6px!important;text-transform:none!important;letter-spacing:0!important}
.c-order-form .order-form__input{box-sizing:border-box!important;width:100%!important;height:50px!important;padding:0 14px!important;background:#FAF9F7!important;border:1.5px solid #D6D2CA!important;border-radius:10px!important;font:400 16px/1 Lato,sans-serif!important;color:#101017!important;box-shadow:none!important;outline:none!important;transition:border-color .15s,box-shadow .15s,background .15s}
.c-order-form .order-form__input::placeholder{color:#9A968F!important;opacity:1}
.c-order-form .order-form__input:hover{border-color:#B9B4AA!important}
.c-order-form .order-form__input:focus{background:#fff!important;border-color:#D30805!important;box-shadow:0 0 0 4px rgba(211,8,5,.12)!important}
.c-order-form .gt-help{display:block;font:400 12.5px/1.3 Lato,sans-serif;color:#6b6b75;margin-top:6px}
```
- 16px input font avoids iOS zoom on focus; 50px height = big tap targets.
- v1 had hidden "Upgrade Your Order & Save!" with a script that searched text nodes; v2 hides `.order-form__subheadline` in CSS (cleaner).

### B5. Hiding "Select Product"
```css
.c-order-form .order-form__offer{display:none!important}                                   /* product table */
.c-order-form .order-form__summary-row:not(.order-form__summary-row--total){display:none!important}  /* Subtotal */
.c-order-form .order-form__summary{margin-top:14px!important;padding-top:4px!important}
.c-order-form .order-form__summary-row--total{font:800 16px/1.2 Poppins,sans-serif!important;color:#101017!important}
```
The radio stays checked when hidden (verified), so the main product is still charged. Only works for single-product checkouts.

### B6. Order bump design CSS
```css
.c-order-form .order-form__bumps{margin:18px 0 0!important}
.c-order-form .order-form__bump{position:relative;display:grid!important;grid-template-columns:auto auto 1fr;align-items:start;column-gap:10px;padding:0 14px 14px!important;background:#FFF8E7!important;border:2.5px dashed #D30805!important;border-radius:14px!important;overflow:hidden;animation:gtglow 2.2s ease-in-out infinite;box-shadow:none}
.c-order-form .order-form__bump:has(.order-form__bump-check:checked){background:#FFEDEC!important;border-style:solid!important;animation:none;box-shadow:0 0 0 4px rgba(211,8,5,.12)}
@keyframes gtglow{0%,100%{box-shadow:0 0 0 0 rgba(211,8,5,.0)}50%{box-shadow:0 0 0 6px rgba(211,8,5,.16)}}
.c-order-form .gt-bump-top{grid-column:1/-1;margin:0 -14px 12px;background:#D30805;color:#fff;text-align:center;font:800 12.5px/1 Poppins,sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:9px 10px}
.c-order-form .gt-arrow{grid-column:1;align-self:start;margin-top:1px;width:30px;height:24px;color:#D30805;animation:gtnudge 1s ease-in-out infinite}
.c-order-form .gt-arrow svg{display:block;width:30px;height:24px}
@keyframes gtnudge{0%,100%{transform:translateX(-3px)}50%{transform:translateX(4px)}}
.c-order-form .order-form__bump-check{grid-column:2;width:24px!important;height:24px!important;margin:1px 0 0!important;accent-color:#D30805;cursor:pointer;flex:none}
.c-order-form .order-form__bump-body{display:contents!important}   /* children join the bump grid */
.c-order-form .order-form__bump-headline,.c-order-form .order-form__bump-oto,.c-order-form .order-form__bump-desc{text-align:left!important}
.c-order-form .order-form__bump-headline,.c-order-form .order-form__bump-oto{grid-column:3;min-width:0}
.c-order-form .order-form__bump-desc{grid-column:1/-1;margin-top:8px!important}
.c-order-form .order-form__bump-desc:after{content:"";display:block;clear:both}
.c-order-form .gt-bump-img{float:right;width:110px;height:auto;margin:2px 0 6px 12px;border-radius:8px}
.c-order-form .order-form__bump-headline{font:800 17px/1.25 Poppins,sans-serif!important;color:#101017!important;margin:0 0 4px!important;text-decoration:underline;text-decoration-color:rgba(211,8,5,.45);text-underline-offset:3px}
.c-order-form .order-form__bump-oto{font:800 13.5px/1.3 Lato,sans-serif!important;color:#D30805!important;margin:0 0 6px!important}
.c-order-form .order-form__bump-desc{font:400 14.5px/1.45 Lato,sans-serif!important;color:#2b2b33!important}
.c-order-form .order-form__bump-price{display:none!important}   /* price already in the OTO line */
@media(max-width:400px){.c-order-form .gt-bump-img{width:96px}.c-order-form .order-form__bump-headline{font-size:16px}}
@media(prefers-reduced-motion:reduce){.c-order-form .order-form__bump,.c-order-form .gt-arrow{animation:none}}
```
Result: red banner "⚡ ONE-TIME OFFER · ONLY ON THIS PAGE", cream background, dashed red border with pulsing glow, nudging red arrow → big red checkbox → underlined headline, red price line, description wrapping around the product image; ticked state turns solid and light red.

### B7. Enhancer script (placeholders, help text, banner, arrow, image) with re-render protection
```html
<script>
(function(){
  var IMG='https://<pages-host>/<repo>/images/opt/starter-product-list-320.webp';
  var ARROW='<svg viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h20M15 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function enhance(){
    var f=document.querySelector('.c-order-form'); if(!f) return;
    var n=f.querySelector('input[aria-label="Full Name"]'); if(n&&n.placeholder!=='Your full name') n.placeholder='Your full name';
    var e=f.querySelector('input[type="email"]');
    if(e){ if(e.placeholder!=='you@example.com') e.placeholder='you@example.com';
      e.setAttribute('autocomplete','email');
      var c=e.parentNode; if(c&&!c.querySelector('.gt-help')){var s=document.createElement('span');s.className='gt-help';s.textContent='Your course login is sent here.';c.appendChild(s);} }
    if(n) n.setAttribute('autocomplete','name');
    var b=f.querySelector('.order-form__bump');
    if(b){
      if(!b.querySelector('.gt-bump-top')){var t=document.createElement('div');t.className='gt-bump-top';t.textContent='⚡ One-time offer · only on this page';b.insertBefore(t,b.firstChild);}
      var cb=b.querySelector('.order-form__bump-check');
      if(cb&&!b.querySelector('.gt-arrow')){var a=document.createElement('span');a.className='gt-arrow';a.innerHTML=ARROW;b.insertBefore(a,cb);}
      var d=b.querySelector('.order-form__bump-desc');
      if(d&&!d.querySelector('.gt-bump-img')){var i=document.createElement('img');i.className='gt-bump-img';i.src=IMG;i.alt='The Starter Product List';i.width=320;i.height=200;d.insertBefore(i,d.firstChild);}
    }
  }
  enhance();
  var tries=0,iv=setInterval(function(){enhance();if(++tries>40)clearInterval(iv);},250);
  if('MutationObserver' in window){new MutationObserver(function(){enhance();}).observe(document.body,{childList:true,subtree:true});}
})();
</script>
```
- Every insertion is guarded by "already there?" checks, so it is idempotent: GHL's Vue form re-renders (for example when the bump is ticked) and the observer simply re-adds anything that disappeared. Verified: still exactly one image and one arrow after toggling.
- The interval covers the case where the form mounts after the fragment; the observer covers later re-renders. Only placeholder/attribute changes on GHL inputs, no value changes, so GHL's own validation is untouched.
- Image is placed *inside* `.order-form__bump-desc` (not in `.order-form__bump-body`) so text wraps around it.

### B8. Bump settings in the order form (GHL UI)
- Form settings modal sections: **Steps · Contact fields · Products · Order bump · Checkout options · Content · Theme & style** (changes preview live and save automatically inside the modal; the page still needs Save + Publish).
- **Order bump:** "Enable order bumps" toggle → bump list item ("Rickey · The Starter Product List · $17 · Customer selects") → **+ Add order bump** → **Presets** (applies to all bumps): Legacy, Ledger, **Hairline** (used), Accent Rail, Soft Tint, Ribbon Deal; plus **Layout** and **Text & color** accordions.
- Click the bump item → **Content (editing for …)**: Headline, OTO headline, Description, **Custom image** ("Overrides the product image for this bump", Upload image only), **Preselect this product** toggle (left off), Badge text.
- Final values in this slice: Headline "Yes! Add The Starter Product List"; OTO "Only $17 today. One-time payment."; Description (37-products version). Note: in the next part of the session David found it too long/number-heavy and it was replaced with "Stop guessing what to sell. Get my list of 37 products people are buying right now, so you can pick your first product tonight." (one number, one promise, fits next to the image on a phone).
- Image limits: the browser pane can't upload, so the custom image field stayed empty and the image comes from the fragment (`starter-product-list-320.webp`). A human could upload it in GHL later, but then remove the script injection to avoid two images (the bump would lose the `--img-none` modifier).

### B9. After-purchase setting
- Form settings → **Checkout options**: Sticky contact, Create new contact on every purchase, Validate disposable email, Postal code on payment form, Terms & conditions toggles (all left off), **After purchase**: "Go to the next funnel step" / "Go to a website URL" / "Choose a specific funnel step".
- Before an upsell exists: "Go to a website URL" = `https://<domain>/<thank-you path>`. With a one-click upsell: **Go to the next funnel step** (required, so the card is on file for the one-click charge on the upsell step).

### B10. How totals were tested (no purchase needed)
```js
const t=()=>document.querySelector('.order-form__summary-row--total').innerText.replace(/\s+/g,' ');
const before=t(); document.querySelector('.order-form__bump-check').click(); await new Promise(r=>setTimeout(r,800));
const after=t(); const radio=document.querySelector('.order-form__prod-radio').checked;
document.querySelector('.order-form__bump-check').click(); await new Promise(r=>setTimeout(r,800));
({before,after,back:t(),mainProductStillSelected:radio,bumpImgs:document.querySelectorAll('.gt-bump-img').length,arrows:document.querySelectorAll('.gt-arrow').length})
// → {before:"Total due today $27.00", after:"Total due today $44.00", back:"Total due today $27.00", mainProductStillSelected:true, bumpImgs:1, arrows:1}
```

---

## C. Upsell page recipe

### C1. What is HTML vs native GHL
- **HTML fragment** (`offer-2-upsell/ghl-upsell.html`, root `#gtu-root`, scope `#gtu`), loaded by the guarded loader in a Custom HTML/Javascript element in a full-width section: alert bar, progress bar, hero, bridge, offer stack, guarantee, lead-in arrow. It also contains the CSS and JS that style the GHL elements below it.
- **Native GHL Button** (YES): needed because only a GHL button can run the **One click up/down sell product** action (charges the card saved at checkout).
- **NO link:** a tiny Custom HTML/Javascript element with a plain `<a class="gtu-no" href="https://<domain>/<thank-you>">…</a>` (the reference page used a GHL button linked to a URL; either works since NO needs no payment action).
- Layout in the builder: Section 1 (full width) → Row 1: code element (loader) → Row 2 (added with "add row below"): Button (YES) → code element (NO link) under it in the same column.

### C2. Sections and copy (the pattern)
1. **Alert bar** (red, full width, `role="status"`): "✓ Your order is confirmed! You'll have access to TikTok Shop Headstart in the next 5 minutes." / bold: "Don't close this page. Take a look at this exclusive one-time opportunity first ↓". 17/18px on phones, 20/22px on desktop.
2. **Progress bar** (ink): "ORDER 90% COMPLETE" + 90% bar with moving red stripes (`repeating-linear-gradient(45deg,#ff3b37 0 10px,#D30805 10px 20px)` animated `background-position`).
3. **Hero:** pill "⚡ Exclusive one-time offer" (cream, dashed red border); H1 "You Just Unlocked Your Headstart. Now Get Your Sales <mark>10x Faster</mark>…" (30px phone / 44px desktop, Poppins 900); product image (`offer-2-system-720/1280.webp`, `fetchpriority="high"`); product title block "My $4M TikTok Shop System" (ink chip, rotated -1deg, 5px red offset shadow); subheadline "The exact system behind my $4M TikTok Shop. **How I find winning products, hook people in the first 2 seconds, and film videos that sell**, so every video you post has a real shot at making money."
4. **Bridge** (dark rounded box): "The Headstart gets you your first sale. <mark>This is how you keep them coming.</mark>" + 3 ✓ wins: know if a product will sell before you film it; stop the scroll in the first 2 seconds with hook stacks; film a whole week in one sitting, turn one winner into steady income.
5. **Offer stack** (2px ink border, 8px red offset shadow): head "Everything You <mark>Get Today</mark>" + chip "One-time $97 · instant access"; items with thumbnail + title + one-line benefit + crossed value: My $4M TikTok Shop System ~~$297~~ (with the 8 module titles in a 2-column numbered list), The Product Checklist ~~$47~~, The Hook Bank ~~$47~~, The Format List ~~$37~~; "Total value: ~~$428~~"; chip "Exclusive discount · you save $331"; "Today, only on this page: **$97**" (64px/76px red); note "One-time payment. Added to your order in one click, no need to enter your card again." (Item values are made-up placeholders, same approach as Offer 1.)
6. **Guarantee strip** (shield SVG): "**Your money's protected.** Do the work and still no sale? You get a full refund."
7. **Lead-in:** "➡️ This is an exclusive one-time offer." / "Only available right here, right now. Once you leave this page, it's gone." + bouncing down-arrow SVG.
8. **YES** (GHL button): "YES! Add My $4M TikTok Shop System to My Order For Only $97".
9. **NO** (link): "No thanks, I'll keep guessing which products and hooks work, and take 10x longer to get my sales." → thank-you page.

Copy pattern from David's brief: alert = order confirmed + access in N minutes + "exclusive one-time opportunity"; headline = "You just unlocked X. Now get results 10x faster"; YES = "YES! Add <product> to My Order For Only $<price>"; NO = "No thanks, I'll <keep doing the slow painful thing> and <take 10x longer>". No VSL yet, so no timer gating: the buttons are always visible.

### C3. Design system
- Tokens on `#gtu`: `--red:#D30805;--ink:#101017;--cream:#FFF8E7;--line:#E7E3DC`; `.wrap` max-width 860px, 18px side padding; `img{max-width:100%;height:auto;display:block}`.
- Breakpoints: `min-width:768px` scales up type (H1 44px, product title 38px, price 76px, items 92px thumbs); `max-width:420px` makes module list single-column and thumbnails 60px.
- Motion: stripe bar, bouncing arrow, YES pulse; all disabled under `prefers-reduced-motion`.
- Wrapper reset (same pattern as every page):
  ```css
  section:has(#gtu-root),[class*="section-"]:has(#gtu-root),.c-row:has(#gtu-root),.c-column:has(#gtu-root),.inner:has(#gtu-root),.c-custom-code:has(#gtu-root),.custom-code-container:has(#gtu-root){padding:0!important;margin:0!important;max-width:none!important;width:100%!important}
  ```

### C4. Styling the native GHL buttons from the fragment
GHL gives no easy way to add a custom class to a button, so the fragment tags them by their text:
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
CSS (global, so it reaches outside `#gtu`):
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
```
- GHL button DOM: `div.c-button.c-wrapper#button-XXXX > button#button-XXXX_btn.cbutton-XXXX` (action button) or `> a#button-XXXX_btn[href]` (URL link); text inside `.main-heading-button`. `white-space:normal` is needed or the long YES text overflows on phones.
- Keep the button text starting exactly with "YES!" / "No thanks", or the tagging breaks.

### C5. Mobile fixes found on the live page
- **Image overflow:** `#gtu .shot{max-width:760px}` beat `#gtu img{max-width:100%}` (class outranks element), so the 1280px image rendered 760px wide on a 393px screen (`scrollWidth` 778). Fix: `#gtu .shot{width:100%;max-width:760px;…}`. Detection snippet:
  ```js
  const W=document.documentElement.clientWidth; ({W, scrollW:document.documentElement.scrollWidth, wide:[...document.querySelectorAll('#gtu *, .c-button, .c-button *, .gtu-no')].filter(e=>e.getBoundingClientRect().right>W+1).slice(0,8).map(e=>(e.className||e.tagName).toString().slice(0,40)+' '+Math.round(e.getBoundingClientRect().width)), yes:!!document.querySelector('.gtu-yes'), no:!!document.querySelector('.gtu-no')})
  ```
- **Buttons touching the screen edge:** the planned wrapper `.gtu-btns` didn't exist in GHL's markup; replaced with `:has()` rules on `.c-button` / `.c-custom-code` / section (C4).
- **Bullets:** `li:before` + mixed text and `<b>` children in a flex `li` split into separate flex items; wrap each `li`'s content in one `<span>`.
- **NO link** not centered: `text-align:center!important`.

### C6. Products and one-click configuration (and the blocker)
1. Payments → Products → **Create Product**: Include in Online store OFF, name "Rickey · My $4M TikTok Shop System", one-time $97, Save.
2. Funnel → Upsell step → **Products** → Add Product → Product + Price ("… @ 97") + Product name "My $4M TikTok Shop System" → Save.
3. Checkout → Order Form → Checkout options → After purchase = **Go to the next funnel step**.
4. Upsell page → select the YES button → right panel **General** → **Button Actions** → **link to** = **One click up/down sell product** → **Products** = the upsell product ("My $4M TikTok Shop System") → Save → Publish. (Seen on the AI Avatars reference button: link to "One click up/down sell product", Products "AI Avatars System Upsell". New buttons default to link to "Open popup" with an empty "Popup" field.)
- **Blocker:** the "link to" control is a native `<select>` rendered inside the cross-origin builder iframe (`https://page-builder.leadconnectorhq.com/location/<loc>/page-builder/<pageId>`, covering the whole app). Its popup doesn't appear in screenshots and ignored every synthetic input: click, click on the arrow, typing "One" + Return, Down/Return (Down scrolled the panel), Space, double-click. `find`/`read_page` can't see into the frame, so no ref-click either. Tried borrowing the working button from the live AI Avatars upsell (open its builder, save the button as an asset): its Products picker didn't open either; nothing there was saved.
- **Resolution:** David sets it by hand (~30 s): open the Upsell page in the builder → click YES → Button Actions → link to = One click up/down sell product → Products = My $4M TikTok Shop System → Save → Publish. Alternative offered: do it through Claude in Chrome (real Chrome session), where native dropdowns should work. Until set, the YES button does nothing.
- Contrast: the After purchase dropdown in the Form settings modal is a custom (non-native) dropdown and works with hover + arrow keys + Return.

### C7. After the upsell
- YES (once configured) charges the saved card and GHL continues to the next step (Thank You). NO → thank-you URL directly.
- Not built in this slice: Offer 2 delivery (course + "order submitted, product = upsell" workflow + email), like A5-A7.

---

## D. Thank-you page recipe + course/delivery pieces

### D1. Thank-you page fragment (`ghl-thank-you.html`, root `#gtty-root`, scope `#gty`)
- Top (ink background): white stacked logo, red ✓ badge 64px, H1 "You're in. Your <span>Headstart</span> begins now." (34px/28px), sub "Everything is below and in your email. Start with Day 1 today, it takes about 15 minutes."
- `.wrap` max 720px pulled up over the dark band (`margin:-28px auto 0`), three white step cards with red number circles:
  1. "Watch Day 1." → button "Open my course →" (`GT_LINKS.course`).
  2. "Download your guides." → dark button "⬇ 30-Day Guide (PDF)" + note "Added The Starter Product List? Its download link is in your email." (the page can't know if the bump was bought).
  3. "Join the Rickey Army." + "My private WhatsApp channel, where I post what's working on TikTok Shop right now." → "Join the channel →" (`GT_LINKS.whatsapp`).
- Rickey quote card (photo + Caveat signature): "Most people never make a sale because they wait until they feel ready. You just stopped waiting. See you in Day 1."
- Small print: "Didn't get the email? Check spam or Promotions." (+ ", or write to <support>" when `GT_LINKS.support` is set).
- Config + placeholder logic:
  ```js
  var GT_LINKS={course:'https://<loc>.app.clientclub.net/',whatsapp:'',support:''};
  document.title="You're in | TikTok Shop Headstart";
  if(GT_LINKS.course){c.href=GT_LINKS.course;}else{c.className+=' off';note.textContent='Your course login is on its way to your email.';}
  if(GT_LINKS.whatsapp){w.href=GT_LINKS.whatsapp;}else{w.className+=' off';note2.textContent='The channel link is coming to your email.';}
  if(GT_LINKS.support){h.innerHTML="Didn't get the email? Check spam or Promotions, or write to <a href=\"mailto:"+GT_LINKS.support+"\">"+GT_LINKS.support+"</a>.";}
  ```
  `.btn.off{background:#c9c9cf;pointer-events:none}` = greyed placeholder.
- Mobile (≤767px): cards become columns, buttons full width, quote card centered; badge fix `#gty .n{flex:none;width:44px;height:44px}`.
- Wrapper reset must include `[class*="section-"]:has(#gtty-root)`.

### D2. Course (Memberships)
- See A5. Reusable rules: buyer-facing title without client prefix; choose One Time pricing (never Free, which is open enrollment); delete nothing that has members; Start-here lesson carries the downloads; lesson titles from the approved copy; new lessons are drafts until "Save and publish"; course access is granted by workflow, not by an offer; get the login URL from Client Portal → Dashboard.

### D3. Delivery
- One workflow per purchased product: trigger **Order submitted** + filter **Global product Is <exact global product used by the funnel step>**.
- Main product: Grant course access → Send email (course link + `{{contact.email}}` login + "Forgot password" first-time instruction + guide link + community link).
- Bump: Send email with the bump download.
- Upsell: still to build (grant Offer 2 course + email).
- Emails sent from the account's default sender until a sender email is chosen (From name needs From email).
- GHL can't branch one email on "bump bought"; split emails per product instead.

---

## E. Builder quirks and workarounds found in this slice

| Quirk | Workaround |
|---|---|
| Builder loads with the "Ask AI" panel open, covering the left side | Close it first (X near top-left of the panel), wait 8-14s for the builder to load |
| "Autosave off" in the builder | Save after every element. Navigating away (even to inspect another funnel) silently discards everything unsaved; the upsell page had to be rebuilt |
| Clicking an element card on a completely empty page adds nothing | Add a section first (Add elements "+" → Sections → full-width), then use the section's "+" → Add → Quick Add search |
| Section "+" needs two clicks | First click opens the add menu, second click "Add", then search box |
| Quick Add search keeps the previous query | Click search → End → Backspace ×10 → type (`custom`, `button`) |
| Code element label | Search "custom" → card "Custom HTML/Javascript"; select element → "Open code editor" in the right panel → type → Save in the modal |
| Typing into the code editor | The editor doesn't auto-close tags; paste doesn't reach the pane, typing does. Type the loader in one line |
| Save button area | Clicking near Save once opened an SEO panel; close it, then Publish |
| Native `<select>` inside the builder iframe (button "link to", button Products picker) | Cannot be operated by the browser pane at all. Hand it to the user, or use Claude in Chrome |
| Custom GHL dropdowns (After purchase, course module, workflow filters, product/price pickers) | Open → `hover` the option → `Return` (most reliable); or `find` ref click then Return; plain click on options often doesn't register; arrow keys sometimes land one option off: always zoom to verify |
| Select-all (`cmd+a`) unreliable in many GHL inputs (color hex, lesson name, bump description, email source) | Click → `End` (or `cmd+Down` in textareas) → `Backspace ×N` (+ `Delete ×N`) → zoom to confirm empty → type |
| Pre-filled fields (funnel product name) | Same clearing routine, otherwise text is inserted into the old value |
| Email editor source view | Lives in a cross-origin frame (no `form_input`); type in ≤230-char chunks with 1s waits; inline `margin` on each `<p>`; clear via the visual editor (cmd+a works there) |
| "this tab's page, zoom or size has changed" error | Take a new screenshot before coordinate clicks (layout shifts when panels open or the pane resizes) |
| Direct app URLs (`/memberships/courses/products`, `/automation/workflows`, `/payments/products`) report HTTP 404 in tab context | Benign SPA note; wait a few seconds or use the menu (Courses ▾ → Products = `products-v2`) |
| Browser pane can't upload files | Course thumbnail, bump custom image, videos: list them for the user; inject images via fragment where possible |
| Builder iframe URL opened standalone (earlier in the session) hung and caused 401s | Never open `page-builder.leadconnectorhq.com` directly |
| GHL sections are divs (`.c-section … section-XXXX`), columns `.c-column > .inner`, rows `.c-row`, code `.c-custom-code` | Target with `[class*="section-"]:has(#root)` etc. |
| GHL adds 20px section padding | Wrapper reset per page (C3) |

---

## F. Pitfalls and fixes

1. **Loader injected GitHub's 404 page** (file not yet deployed). Fix: guarded loader (`if(!r.ok) throw` + `catch`), and poll Pages for HTTP 200 before checking live.
2. **GitHub Pages cache lag** (~10-70s, sometimes longer). Poll with a cache-busting query and a marker string from the new version: `for i in $(seq 1 18); do curl -s "URL?r=$i" | grep -q 'MARKER' && break; sleep 10; done`.
3. **Reset selector missed GHL sections** (`section:has()` only). Always include `[class*="section-"]:has(#root)`.
4. **Flex shorthand in column layouts** squashes circles. Use `flex:none` + explicit width/height.
5. **Mobile checkout form below the fold.** Separate phone markup (compact card) instead of shrinking the desktop column.
6. **"Select Product" table with one product.** Hide `.order-form__offer` and non-total summary rows; the radio stays checked.
7. **Bump description squeezed into one narrow grid column.** `display:contents` on `.order-form__bump-body`, description `grid-column:1/-1`, image floated inside the description.
8. **GHL re-renders the order form** (wipes injected nodes). Idempotent enhancer + MutationObserver + short interval.
9. **Bump custom image is upload-only.** Inject via script; if someone uploads later, remove the injection.
10. **Bump copy:** use real counts from the deliverable (pypdf count of the PDF), but keep it to one number and one promise (David later rejected the long multi-number version).
11. **Class specificity trap:** `#scope .cls{max-width:760px}` beats `#scope img{max-width:100%}`; add `width:100%`.
12. **Native select in builder iframe** blocks the one-click action. Plan for a human step or Claude in Chrome; say so up front.
13. **Unsaved builder work lost** when navigating away (Autosave off). Save after each element.
14. **Text replacement in GHL fields** (select-all failing) produced appended titles (Day 2/Day 3). Always clear with End+Backspace and zoom-verify.
15. **Email HTML typed in one burst got garbled.** Chunked typing.
16. **From name without From email** blocks saving the email action. Leave both empty (default sender) or set both.
17. **Course creation side effect:** a MEMBERSHIP product with the course name appears in Payments. Workflows must filter on the funnel's product, not this one.
18. **Free course pricing** = anyone with the link can enroll. Use One Time.
19. **Opening another project's funnel** (to copy a working button): read-only only; never save or publish it.
20. **Swift/PDFKit renderer failed** (SDK vs compiler mismatch). Use `pypdf` (+ Pillow) in a venv for PDF text and embedded page images.

---

## G. Open items at the end of this slice (+ the upsell part)

- **YES button one-click action** (David, by hand, or via Claude in Chrome): link to = One click up/down sell product, Products = My $4M TikTok Shop System, Save, Publish.
- **Test purchase** (live Stripe): checkout with bump → upsell YES → thank-you; confirm both emails, course access, totals. Or switch the funnel to Stripe test mode first. Claude doesn't enter card details.
- **Offer 2 delivery:** course + workflow + email for the $97 System (nothing delivers it yet).
- **WhatsApp channel link:** thank-you `GT_LINKS.whatsapp` + delivery email placeholder `https://WHATSAPP-LINK-GOES-HERE` (broken in any email sent now).
- **Support email:** `GT_LINKS.support`.
- **Sender:** From name/email for the workflow emails (currently default sender).
- **Course thumbnail and lesson videos:** upload in GHL (pane can't upload); confirm whether GHL sends a password-setup email (the email tells first-timers to use "Forgot password").
- **Bump custom image** optionally uploaded in GHL (then drop the script injection).
- **PDFs and page code on public GitHub:** move downloads to GHL Media and fragments/images into GHL storage before making the repo private.
- **Offer 2 item values** ($297/$47/$47/$37) are placeholders; confirm.
- **Bump copy** was rewritten again right after this slice (shorter, one number).
- The auto-created "TikTok Shop Headstart" MEMBERSHIP product in Payments was left in place; decide whether to keep it.
- One builder screenshot showed the upsell header URL as `/upsell-page` while the live page answered at `/headstart-upsell`; worth confirming the step path in the Upsell step's Publishing tab.

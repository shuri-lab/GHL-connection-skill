# GHL Funnel Playbook: mining notes, slice 1 (ghl1.txt)

Source: `scratchpad/mine/ghl1.txt` (5,276 lines, read in full) plus the screenshots it references (in the session's `tool-results/` folder; ~40 of them viewed for exact UI labels) and the repo `rickey-tiktokshop-project/` (README GHL section, `offer-1-sales-page/ghl-*.html`, git log).

**Where this slice starts and ends.** It starts with David's request to do the GHL setup ourselves (not Moses), and ends in the middle of the checkout order form's **Theme & style → Theme & brand → Accent colour picker**. Everything after that point is in slices 2 and 3: the left-column checkout code, saving and publishing the checkout, the thank-you page, the Memberships course, the workflows and emails, the upsell, and the test purchase. In this slice, **courses and workflows were only looked at, read-only, during the audit.** Sections B.8 and B.9 record what was seen, and the rest belongs to the later slices.

Conventions: `{loc}` = location (sub-account) id, `{funnel}` = funnel id, `{step}` = funnel step id, `{page}` = builder page id. "Pane" = the Claude desktop app's built-in browser (`mcp__Claude_Browser__*`).

---

## A. Step-by-step log (in order) with the general procedure

### A1. Scoping the job and the safety plan (no GHL clicks yet)
- **David asked:** "setup and configure everything in GHL, not Moses... be careful, I don't know if the account is being used on any other project."
- **What Claude did:** listed what it needed and how it would keep other projects safe, before touching anything.
  - **Needs from the user:**
    - the user signs in to HighLevel in the pane themselves (Claude never types passwords) and names the sub-account
    - a go-ahead to **create new things only**: products, one funnel, the order form and bump, the upsell step, the delivery workflow, the course membership
    - inputs: the community or WhatsApp channel link, the sender email for delivery emails, the upsell (Offer 2) name and price, the final PDFs, the course videos
    - **test purchases are done by the user or in Stripe test mode**, never with Claude typing card details
  - **Safety rules:**
    - "look first, change nothing": a read-only audit is reported before any change
    - prefix everything Claude creates with **"Rickey ·"**, and never edit or delete existing items
    - no account settings: Claude doesn't touch the Stripe connection, domains, users or billing without asking
  - **Coordination:** the copywriter (Moses) had already written the thank-you and delivery copy. Claude would reuse it and draft a short note telling him we're doing the setup ourselves, and show that note to the user before sending.
- **General procedure:** always open with this needs list and safety contract. Then wait for the user to sign in.

### A2. Opening HighLevel and signing in
- **David asked:** "go ahead and access `https://app.gohighlevel.com/v2/location/54EJrjBw49eCsIsOZH44/dashboard`".
- **How:** `navigate` to that URL in the pane. It redirected to the sign-in page (`https://app.gohighlevel.com/?url=...`). Claude took a screenshot, then ended the turn with a blocked question that had a single "Signed in" button. The user signed in themselves (email and password, or "Sign in with Google").
- **Quirk:** every app.gohighlevel.com route reports "served with HTTP status 404" in the pane. This is harmless: it's a single-page app.
- **General:** `navigate` to `https://app.gohighlevel.com/v2/location/{loc}/dashboard`. If you get the login page, stop and ask the user to sign in, with a "Signed in" button. After sign-in, navigate to the dashboard again and wait 4 s before reading anything.

### A3. Read-only audit of the sub-account
- **David:** "Signed in."
- **How:** navigate to each page, `wait` 4 to 7 s, then `get_page_text` (max_chars 2,500 to 4,000), or a screenshot where the text was sparse (workflows, courses).

| Area | URL (`https://app.gohighlevel.com/v2/location/{loc}/...`) | What was found here |
|---|---|---|
| Dashboard | `dashboard` | Sub-account name "Hot Pursuit LLC"; no pipelines; $0 won revenue; expired Google Analytics and Ads connections |
| Funnels | `funnels-websites/funnels` | 1 funnel: "AI Avatars Funnel" (3 steps) |
| Products | `payments/products` | 2 products: "AI Avatars System" and "AI Avatars System Upsell", both $67, MEMBERSHIP / SERVICE |
| Payment providers | `payments/integrations` | **Stripe = Default, "Connected"**; PayPal and Authorize.net not connected |
| Workflows | `automation/workflows` (it lands on `?listTab=all`) | 2 unnamed drafts ("New Workflow : 1749480932675", "New Workflow : 1763563288239"), both Draft with 0 enrolled |
| Courses | `memberships/courses/products` | "AI Avatars System Course" (**6 members**) and "Bonus Course" (**4 members**); a banner says "Classic courses retires Dec 1, 2026" |
| Domains | `settings/domain` (Settings → Domains & URL Redirects) | 1 domain, **davidhsai.com**, connected to the AI Avatars funnel. The registrar shows it "expiring soon". "Internal Domains (0)" |
| Transactions | `payments/v2/transactions` | Real Stripe sales of $67 through the AI Avatars Funnel (latest Apr 20) and earlier $1 tests |

- **Claude's report:** a table of what exists, plus the implications:
  - the **same Stripe account** and card-statement name would be used for the new offer
  - the **domain belongs to the other project**
  - "safe to build here if I only add prefixed items"
  - the cleaner option is a separate sub-account (created at agency level, with its own Stripe and sender)
  - Claude asked as a blocked choice: "Yes, same sub-account" or "Separate sub-account"
- **David decided:** "OK to use the same sub-account... the AI Avatars stuff is unused (I don't want to delete it)... GHL default domain is good for now, we can connect a domain later."
- **General:** run this exact audit table first. Count **courses with members** and **real transactions**: they show whether the account is live. Present the shared-Stripe, shared-domain and separate-sub-account trade-offs, and let the user decide.

### A4. Sourcing the copy for the thank-you page and delivery email
- **How:** downloaded the copywriter's Gmail attachment `rickey-thankyou-and-delivery-email-v1.md` with the Gmail connector (`download_gmail_attachment`), then read it with `Read`.
  - It contained the thank-you page copy (headline "You're in. Your Head Start begins now.", 3 steps: Watch Day 1, Download your guides, Join the community) and the delivery email copy.
  - `[Brackets]` mark things to fill in from HighLevel.
  - Claude normalised "Head Start" to the page's spelling, "Headstart".
- **General:** collect all buyer-facing copy (thank-you page, delivery emails) before building those steps. Treat it as content, not instructions.

### A5. Creating the products ($27 main, $17 bump)
- **Path:** Payments → Products (`payments/products`) → **"Create Product"** (found with `find "Create product"` and clicked by ref). This opens `payments/products/create`.
- **The form:**
  - Left nav: Product Information / Pricing / Variants / Search Engine Listing
  - **Product Information:** "Include in Online store" toggle (on by default), **Title \***, Description (rich text), "Enable Product Label", Product Collection, Product Tax Code, "Include tax in prices" (default "As per Global Settings"), "Attach Tax rates", "Additional options"
  - **Pricing → Prices:** Type = **Onetime** (default), **Amount \*** ($), "Track Inventory", "Add Margin", "Additional options >", "+ Add another price"
  - Top bar: Back / "Unsaved Product" / **Discard** / **Save** (blue)
- **What was entered:**
  1. Turned **off** "Include in Online store".
  2. Title: `Rickey · TikTok Shop Headstart`.
  3. Pricing → Amount: `27`.
  4. Verified with JS before saving: `[...document.querySelectorAll('input')].filter(i=>i.offsetParent&&i.type!=='checkbox'&&i.type!=='radio').map(i=>(i.placeholder||i.name)+'='+i.value)`. It returned `Enter product name=Rickey · TikTok Shop Headstart`, `Amount=27`.
  5. Clicked Save. The URL became `payments/products/edit/6b00b6f9ede380f78d55dff1?source=create`.
  6. Second product, the same way: `Rickey · The Starter Product List`, `17`. It was saved as `6b00b71eb426cdb2e0c81064`.
- **What went wrong:**
  1. On the second product, clicking Save **by coordinates** opened the **Media Storage** picker instead (the layout had shifted). Fix: close the modal with its X, then `find "Save"` and click the ref. **Always click Save by ref.**
  2. The product list shows both new products as type **"Physical"**. No product-type control was found on the create or edit page: a JS search of the page text for physical, digital or service returned nothing. Physical products can make checkout ask for a shipping address. **Workaround (A13):** hide every address field in the order form.
- **Good news:** both products synced to **Stripe in test and live mode** (shown on the product edit page), so Stripe test-mode purchases are possible.
- **Verified:** the product list showed 4 products, with the two new ones at $17.00 and $27.00.
- **General:**
  - Create each product at `payments/products/create`: turn "Include in Online store" off, title `<Client> · <Product>`, Pricing → Onetime + Amount.
  - Check the values with the JS input dump, then click Save **by ref**.
  - Read the new product id from the URL (`/edit/<id>`).
  - Expect the "Physical" type, and plan to hide the address fields in the order form.

### A6. Creating the funnel
- **Path:** Sites → Funnels (`funnels-websites/funnels`) → **"New funnel"** (by ref). The **"Create new funnel"** modal has 3 cards: **From blank** (field "Funnel name \*"), **Build with AI**, **From templates** ("Over 1000+ Templates"), plus Cancel / **Create**.
- **Entered:** From blank, name `Rickey · TikTok Shop Headstart`, then Create.
- **Result:** the funnel opened at `funnels-websites/funnels/DH9wPGw485e8HHkbWJaf`, with tabs **Steps · Stats · Sales · Security · Events · SEO & AEO · Settings** and an empty state reading "Get started by adding a new step!".
- **General:** always start From blank, name it `<Client> · <Offer>`, and save the funnel id from the URL.

### A7. Adding the 4 steps
- **Path:** Steps tab → **"+ Add new step or import"**. The **"New step in funnel"** modal has:
  - "Name for page \*"
  - "Start from a URL" (Beta: "Paste a link to any live page... We'll rebuild it here so you can edit it", with a Preview button; not used)
  - Cancel / **Create funnel step**
- **Steps created:** `Sales Page`, `Checkout`, `Upsell`, `Thank You`.
- **Step ids:**

| Step | Id |
|---|---|
| Sales | `69f4c9e5-083a-4864-8812-bbe8e88a20dc` |
| Checkout | `feb56458-d661-4006-a888-b379d3fb4535` |
| Upsell | `2e4e00f0-5834-4f28-a2cd-ca65bc7d26d1` |
| Thank You | `eb441c41-4ec2-4553-8b42-62e0c39d9091` |

- **What went wrong:**
  1. Claude had resized the pane to 1440×900 because the builder needs a wide screen. The pane's width then changed and **the app cleared the emulated size**, so every coordinate click failed with "this tab's page, zoom or size has changed; take a new screenshot".
  2. A batch of 18 coordinate actions aborted at the first click.
- **Fix that worked:** click by element. Use `find "Name for page"` → click the textbox ref → type the name → `find "Create funnel step"` → click the ref → `find "Add new step or import"` → click the ref, and repeat.
- **The step page:**
  - Tabs: **Overview / Products / Publishing**
  - Banner: "Please add a domain in the settings to see your Funnel live!"
  - CONTROL card: **"Use existing"** / **"Create from blank"**, an **Edit** dropdown, an open-in-new-tab icon, and a gear
  - VARIATION: "Create variation" (split test)
  - Buttons: "Delete Funnel Step" / "Clone Funnel Step"
- **General:** add steps in funnel order, clicking by ref with `find`. Take the step ids from the URL (`/steps/{step}/overview`) after each step is created.

### A8. Domain: what's available, and what to tell the user
- **How:** Funnel → **Settings** tab (direct URL `funnels/{funnel}/settings`) → the "Domain" dropdown ("Please select a domain").
  - It listed only **www.davidhsai.com** and **davidhsai.com**. The account has **no free default GHL funnel domain**.
  - Claude closed the dropdown with Escape without choosing, and asked first.
- **David asked:** "Can you use a GHL default domain?"
- **Answer:** no, the only choices are the existing domain. The options:
  1. **Preview links**: for review only, not for live payments.
  2. **The existing domain with its own paths** (e.g. `/headstart`): this works right away, but the domain belongs to the other brand and is expiring soon.
  3. **Buy or connect a brand domain** (Settings → Domains → Purchase domain, about $10 to $20 a year). Buying is the user's decision.
- **David asked:** "if we use davidhsai.com can we change it later easily?"
- **Answer:** yes. In funnel Settings, pick the new domain; the pages and steps stay the same. Watch out for:
  - links already shared break, so update them or add redirects (**Settings → Domains & URL Redirects → URL Redirects**)
  - the Meta pixel and the verified domain must be re-verified
  - renew a domain that is expiring, because if it lapses the whole funnel goes down
  - the best time to switch is before ads start
- **David:** "Okay, we can use that one and change it later."
- **General:** check the funnel Settings → Domain list. If there's no default domain, present those three options and get the user's choice before attaching a domain.

### A9. Attaching the step products and the order bump at step level
- **Path:** Checkout step → **Products** tab (`steps/{step}/products`). The table has columns Product name / Internal Product ID / Amount / Type / Last updated. Banner: "Multiple recurring products and bump products with subscriptions not supported with Paypal." Then click **"+ Add Product"** (`steps/{step}/products/create`).
- **Form fields:**
  - **Products \*** (dropdown of catalogue products), with "Create a new product by clicking here"
  - **Price \*** (e.g. "Rickey · The Starter Product List @ 17")
  - **Product name \*** (help text: "This information will be displayed publicly", so this is the **buyer-facing name**)
  - **Price display override** (optional)
  - **Additional Options** (expand): radio **Main Product** (with "Allow multiple quantity to be purchased" and "Maximum units per order") or **Bump Product** ("Should this product be the bump on the order page if present?")
  - **Save** / Cancel
- **Entered:**
  1. Product "Rickey · TikTok Shop Headstart" → Price "...@ 27" → **Product name `TikTok Shop Headstart`** (internal prefix removed because buyers see it) → Main Product → Save.
  2. Product "Rickey · The Starter Product List" → Price "@ 17" → Product name `The Starter Product List` → Additional Options → **Bump Product** → Save.
- **What went wrong:**
  1. A coordinate click in the product dropdown picked the **wrong product ("AI Avatars System Upsell")**. Fix: Escape, reopen, pick the right one, and check with a screenshot.
  2. In a fast batch, the **price and name didn't stick**. Fix: one click at a time, with a screenshot after each.
  3. Save wasn't found by `find "Save button"`, but `find "Save"` worked (ref).
- **Verified:** the Products table shows
  - "TikTok Shop Headstart" | `6b00b80fb0326fba63be8f1a` | $27 USD | One Time
  - "The Starter Product List" **[Bump]** | `6b00b84e4b82cee7675e7862` | $17 USD | One Time
- **General:** add the main product first (Main Product), then the bump (Bump Product). Always rename the public Product name without the internal prefix, and confirm the table shows the "Bump" badge.

### A10. Funnel settings: domain, path and Optimize JavaScript
- **How:** `funnels/{funnel}/settings` → open the Domain dropdown by ref.
  - Clicking an option by coordinate didn't select it. **`key "Down Down Enter"`** selected `davidhsai.com`. The field then shows "Can't find your domain? Purchase or connect domain" and "Remove".
  - **Path**: the default was `/rickey--tiktok-shop-headstart`. Claude triple-clicked it and typed `/headstart`.
  - Verified with JS (`[...document.querySelectorAll('input')].filter(i=>i.offsetParent&&i.type==='text').map(i=>i.value)`): `["Rickey · TikTok Shop Headstart","/headstart",""]`.
  - Clicked **Save** (bottom right) by ref.
- **The Settings page also has:**
  - Favicon URL
  - **Tracking & scripts** (Head tracking code / Body tracking code)
  - "Require credit card" (on: "customers must enter a credit card even for $0 purchases")
  - **Performance & compliance:** Image Optimization (on), **Optimize JavaScript** (on: "Custom javascript and html codes added will be lazy loaded"), GDPR compliant fonts (off)
  - **SEO & AEO:** Auto-generate schema (on)
  - **Funnel access:** Delete funnel
- **Turning Optimize JavaScript off:** it lazy-loads custom code, so a page made entirely of custom code shows up late.
  - **What went wrong:** after Save, **GHL jumps back to the Steps view**, so the next coordinate click landed on the step's open-in-new-tab icon (the pane blocked the new tab).
  - **Fix:** navigate to `/settings` again, then toggle the switch with JS:
    ```js
    const t=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='Optimize JavaScript');
    let row=t;for(let i=0;i<6&&row;i++){if(row.querySelector&&row.querySelector('.hr-switch'))break;row=row.parentElement;}
    const sw=row.querySelector('.hr-switch');sw.click();
    // check: sw.getAttribute('aria-checked') -> "false"
    ```
    (The switch is a `DIV.hr-switch` with `aria-checked`; `hr-switch--active` means on.) Then `find "Save"` → click the ref → check `location.href`.
- **General:** set the domain and a short funnel path. **Turn off Optimize JavaScript** whenever pages use Custom Code. Save by ref, then re-navigate, because Save leaves the settings page.

### A11. Step paths (the Publishing tab)
- **What went wrong:** navigating straight to `.../steps/{step}/publishing` showed a **blank page**. The real route is **`/publish`**: open `/overview`, then `find "Publishing"` → click the ref, and the URL becomes `.../steps/{step}/publish`. After that, direct navigation to `/publish` works.
- **The fields:** step name (placeholder "Input Name") and **path** (placeholder "Please Input"), plus an **"Update step"** button. The default paths were `/sales-page`, `/checkout`, `/upsell` and `/thank-you`.
- **Why change them:** on a shared domain those generic paths could collide with the other funnel's pages, so every step got the offer prefix.
- **How (JS on the top document; this works because these are app-level inputs, not builder inputs):**
  ```js
  const i=[...document.querySelectorAll('input')].filter(i=>i.offsetParent)[1]; // 2nd visible input = path
  const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;
  set.call(i,'/headstart-checkout');
  i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));
  const b=[...document.querySelectorAll('button,span,div')].find(e=>e.textContent.trim()==='Update step'&&e.children.length<=1);
  b&&b.click(); await new Promise(r=>setTimeout(r,2500));
  [...document.querySelectorAll('input')].filter(i=>i.offsetParent).map(i=>i.value)
  ```
- **Result:** `/headstart-page`, `/headstart-checkout`, `/headstart-upsell` and `/headstart-thank-you`. Each was re-read after a reload to confirm it was saved.
- **General:** set every step path to `/<offer-slug>-<step>`, update it through the native value setter, click "Update step", reload, and re-read.

### A12. Getting the sales page into GHL: the "loader" approach
- **David asked:** "I don't see the landing page in GHL... create one blank and put an HTML component with our code... images?... build the checkout with an order bump checkbox (screenshot reference)... finish everything except the upsell."
  - His reference screenshot showed the checkout structure: on the left a headline, a product mockup and a subhead. On the right, the form: "CONTACT INFORMATION" (name, email), "PAYMENT", an item table, and a **dashed bump box** containing a red arrow, a checkbox and a headline, "[ONE-TIME ADD-ON] Only $X!" in red, a description, and an image.
- **Preparing the HTML (local repo):** started from `offer-1-sales-page/paste-ready.html`, the builder-ready fragment: no `<html>`/`<head>`, its own `<style>`/`<script>`, 29 unique `images/...` references and 1 `PASTE-YOUR-CHECKOUT-LINK`. A Python script (`python3 -I`) then:
  - rewrote `src="images/` and `url(images/` to absolute GitHub Pages URLs (`https://shuri-lab.github.io/rickey-tiktokshop-project/images/`): 65 replacements
  - replaced `PASTE-YOUR-CHECKOUT-LINK` with `https://davidhsai.com/headstart-checkout`
  - wrote the result as `offer-1-sales-page/ghl-sales-page.html` (115,760 bytes)
  - then git commit and push
- **What went wrong:** the push was rejected because GitHub Pages setup had added commits ("Create CNAME", "Delete CNAME"). Fix: `git fetch`, then `git log HEAD..origin/main` to inspect them, then `git pull --rebase`, then push.
- **CORS check:** `curl -sI <file> | grep -i access-control` returned `access-control-allow-origin: *`. GitHub Pages allows cross-origin fetch, which the loader needs.
- **Waiting for Pages:** the new file returned 404 for about a minute. A chained `sleep 60` was **blocked** by the harness, so Claude used a polling loop: `for i in $(seq 1 30); do c=$(curl -s -o /dev/null -w "%{http_code}" URL); [ "$c" = 200 ] && break; sleep 5; done`.
- **Builder:** Sales step → Overview → **"Create from blank"** (by ref; wait 8 s). The builder opened at `https://app.gohighlevel.com/location/{loc}/page-builder/ADjS2vRSoBdGH6bc314y` (note: no `/v2`).
  - **Top bar:** ← Back · "Autosave off" pill · Preview (eye) · **Save** (floppy disk; a yellow dot means unsaved) · **Publish**
  - **Toolbar:** + (Quick Add) · Ask AI · Layers · Pages · `</>` (**Tracking Code, a page-level setting, not an element**) · ... · page selector ("Sales Page") · desktop / tablet / mobile · zoom 100% · undo / redo · settings
  - **Empty canvas:** "Blank Section" · "Insert Element" · "Generate with AI"
  - The **Ask AI panel opens by default**: close it with its X
  - The **bottom breadcrumb** (Page › Section › 1 Column Row › 1st Column › Custom Code) selects parent containers
- **Adding the Code element (the route that worked):**
  1. **Blank Section** adds a green-outlined Section with a "+".
  2. Click the "+" in the section (select it first, then click again). This opens the **Quick Add** panel.
     - Left list: Quick Add, Sections, Rows, Elements, Prebuilt Sections, Saved Assets, Widget Marketplace, Store, Icons And Graphics, Buttons, Forms Surveys And Quizzes, Social Media Icons, Countdown Timers, Images, Progress Bar...
     - Search box. Rows: 1 to 6 Column. Text: Headline, Sub-Headline, Paragraph, Bullet list, Rich Text...
  3. Type `code` in the search. A **"Code"** card appears under "Custom" (next to "QR Code").
  4. Click the card **while the section is selected**. GHL creates **1 Column Row › 1st Column › Custom Code**, showing a "Custom HTML/Javascript" placeholder.
  5. Things that did not work:
     - **dragging the card onto the canvas never registers** in this builder
     - clicking the card before any section exists did nothing
     - the toolbar `</>` icon is page Tracking Code, not an element
  6. Select the element. The right panel shows "Custom Code" with General / Styles, "Element name", and **"Open Code Editor"**. Clicking that opens the **"Custom Javascript/HTML"** modal: a dark code editor ("Add your code here") with Cancel / **Save**.
- **Why a loader, not the full HTML:**
  - The builder is a **cross-origin iframe** (`https://page-builder.leadconnectorhq.com/location/{loc}/page-builder/{page}`), so JS can't reach the editor and neither can find, read_page or form_input.
  - **`pbcopy` + `cmd+v` doesn't reach the pane** (the macOS clipboard isn't shared with it).
  - Typing works, and the editor **doesn't auto-close brackets or quotes**. It was tested by typing `<!-- test -->` and `<div style="a:b">x(y){z}['q']</div>` and zooming in: the text came out verbatim.
  - But typing 115 KB isn't practical. So Claude typed a **short loader** that fetches the fragment from GitHub Pages and injects it.
- **What went wrong (badly):** Claude opened the iframe URL `page-builder.leadconnectorhq.com/...` in a new pane tab to try to reach the editor directly. It showed 404 or blank, and **soon after, the GHL session broke**: spinner only, with 401/403 errors in the console. The user had to sign in again. **Never open the builder iframe URL on its own.**
- **The loader typed into the editor** (first `cmd+a`, then `Delete` to clear the editor, then `type`):
  ```html
  <div id="gt-root"></div><script>(function(){var u='https://shuri-lab.github.io/rickey-tiktokshop-project/offer-1-sales-page/ghl-sales-page.html';fetch(u,{cache:'no-cache'}).then(function(r){return r.text();}).then(function(h){var root=document.getElementById('gt-root');root.innerHTML=h;root.querySelectorAll('script').forEach(function(s){var n=document.createElement('script');if(s.src){n.src=s.src;}else{n.textContent=s.textContent;}s.parentNode.replaceChild(n,s);});});})();</script>
  ```
  - Scripts injected through `innerHTML` don't run. The loader re-creates each `<script>` so it executes.
  - `cache:'no-cache'` makes edits pushed to the repo show up on the next page load.
  - Claude checked the typed code with `zoom` on the editor region before saving.
- **Saving:**
  1. The modal's **Save** button.
  2. The page **Save** (the floppy-disk icon). An **"SEO & AI search optimization"** side panel popped open (preview URL, Content, Keywords, Author, Images, Links & tags, Language, Schema markup); close it with X.
- **Full-width section:**
  1. Breadcrumb **Section** → General → **"Allow Rows to take entire width"** = on.
  2. **Styles → Margin & Padding** → click the padding top value. A popup appears with a slider and presets **0 / 10 / 20 / 40 / 60 / 80 / 100 / 140** and Reset. Choose **0**, Escape, then do the same for bottom.
- **Publish:** the **Publish** button at the top right (no dialog appeared).
- **Live check, desktop:** open a background tab (`tabs_create`), navigate to `https://davidhsai.com/headstart-page`, then run JS:
  - `#gt-root` exists, with innerHTML length 117,173, and `#page` exists
  - but `pageLeft: 10`, `pageW: 987` at `innerWidth: 1007`, and the document **title was empty**
  - the wrapper chain under `#gt-root`:
    `DIV.custom-code-container.ccustom-code-<id>` (p 0) → `DIV.c-custom-code.c-wrapper` (0) → `DIV.vertical.inner` (0) → **`DIV.c-column` (padding 10px 5px)** → `DIV.inner` → **`DIV.row-align-center` (10px 5px)** → **`DIV.inner` (max-width 1170px)**
  - So the builder's Section settings were **not enough**: the row and column still pad, and the inner container caps the width.
- **Fix:** put the CSS in the fetched HTML (prepended to `ghl-sales-page.html`, then pushed; it was live about 50 s later, checked with grep in a polling loop):
  ```html
  <!-- HighLevel wrapper fix: no padding or width cap around the page, and the browser tab title -->
  <style>
  section:has(#gt-root),.c-row:has(#gt-root),.c-column:has(#gt-root),.inner:has(#gt-root),.c-custom-code:has(#gt-root),.custom-code-container:has(#gt-root){padding:0!important;margin:0!important;max-width:none!important;width:100%!important}
  </style>
  <script>document.title='TikTok Shop Headstart | Game Tape';</script>
  ```
  - The repo's current version also adds `[class*="section-"]:has(#gt-root)` to the selector list (from a later slice).
  - `paste-ready.html` also ends with a `fit()` script. On screens ≤820 px it sets `#page` to `width:innerWidth px; margin-left:-left px; max-width:none`, which breaks the page out of any builder padding to the full width.
- **Live check, phone:** `resize_window` 393×852 on the test tab, navigate again, then JS:
  - title = "TikTok Shop Headstart | Game Tape"
  - `scrollWidth == innerWidth` (no sideways scroll)
  - the hero button's bottom at 784 px, inside the 852 px viewport
  - `#buy .btn` href = `https://davidhsai.com/headstart-checkout`
  - the screenshot showed the hero rendering correctly
- **Also checked with curl:** `/headstart-page` 200, `/headstart-checkout` 200, `/headstart` 200. **The funnel's root path serves its first step.**
- **General:**
  1. Build the page as a self-contained HTML fragment with absolute asset URLs, and host it on GitHub Pages (or GHL Media later).
  2. In GHL: Create from blank → Blank Section → "+" → Quick Add search "code" → Code card → Open Code Editor → type the loader → Save → page Save → Publish.
  3. Put the wrapper-fix CSS and the `document.title` inside the hosted HTML.
  4. Verify the live URL with JS at 393×852 and at desktop width.
  5. Remember the fragment updates live on every push, with no builder edits.

### A13. Session expiry mid-build
- **Symptoms:** the Checkout step's Overview never showed "Create from blank" (find returned no matches several times), a screenshot showed only a spinner, and `read_console_messages` showed `401`, `403` and `[whatsapp] init catch ... 403` errors.
- **What Claude did:** reported it honestly. It said it **probably caused this by opening the builder iframe URL directly**, asked the user to sign in again, and ended the turn blocked with a "Signed in" button. It also listed what was done and what was left, and reminded the user that **before the GitHub repo is made private, the page and images must move into GHL storage, or the page will go blank**.
- **David asked:** "We don't have the link yet, have you created and verified the offer 1 page and the checkout?"
- **Claude checked with curl, and gave an honest status:**
  - Sales page: **created and verified**
  - Checkout: **started, not finished**. The step and its products exist, but the address loads with **no order form** (grepping the HTML for `order-form` found nothing), and no test purchase has been made.
  - The missing WhatsApp link would be a marked placeholder.
- **General:** if the GHL app spins forever or the console fills with 401s, stop and ask the user to sign in again. Never claim a step is done without checking the live URL.

### A14. Building the checkout page (two columns: code on the left, order form on the right)
- **David:** "continue". GHL loaded again.
- **Builder:** Checkout step → Overview → **Create from blank** (by ref; wait 15 s). The builder opened at `.../page-builder/NPewVghQNsX2rU9aEb0q`.
  1. Close Ask AI → **Blank Section** → select the section → "+" → Quick Add → Rows → **"2 Column"**.
  2. Left column "+": search `code` → **Code** card. The Custom Code element lands in **2 Column Row › 1st Column**. (Its loader for `ghl-checkout-left.html` was added in a later slice.)
  3. Right column "+": search `order`.
     - `cmd+a` in the search box did not replace the old text; **`triple_click`** on the search box and then typing did.
     - The **"Order Form"** card lands in the 2nd Column.
- **The default Order Form:** heading "Checkout / Upgrade Your Order & Save!" with fields Full Name\*, Email\*, Phone, **Company\***, address search, Address, Country, State, City and Zip Code.
  - Right panel "Order Form": "Element name"; "Steps, fields, products, the order bump, and theme all live in one full settings workspace."; **"Customize order form"**; Mode: One-step; Fields: 9 shown.
- **"Customize order form"** opens the full-screen **"Form settings"** modal: "Everything for this order form, in one place — changes preview live and save automatically". It has a live preview on the right. Sections:
  1. **Steps:** One-step / Two-step / Split. Kept **One-step** ("Single step — Checkout: Contact + payment on one page").
  2. **Contact fields:** rows with a drag handle, required marker (a red asterisk when required), width toggle (half/full), edit pencil, and visibility eye; plus "+ Add Field" ("Custom fields save to the contact record").
     - First clicked Company's **required** marker to make it optional (it was required), then clicked the **eye** on Phone, Company, Address, Country, State, City and Zip Code.
     - **What went wrong:** a fast batch of 8 clicks left Company, Country and City visible. Fix: click them again one at a time with 2 s waits.
     - Result: **"2 shown"** (Full Name + Email).
  3. **Products:** warning "Products added or edited here will update across all Order Forms on this funnel step". List: TikTok Shop Headstart $27.00 USD (One Time), The Starter Product List $17.00 USD (One Time, **Bump**); "+ Add Product". Toggles:

     | Toggle | Default | Set to |
     |---|---|---|
     | Show images | off | off |
     | **Show quantity** | on | **off** |
     | Show product description | off | off |
     | Show price description | on | on (kept) |
     | **Enable multi-product selection** | on | **off** |
     | **Enable coupon codes** | on | **off** |

  4. **Order bump:** "Enable order bumps" toggle (turned **on**) → **"+ Add order bump"** → pick "Rickey · The Starter Product List" ("$17 · Customer selects"). Then CONTENT ("Editing for ..."):
     - **Headline:** the default is the **internal product name with the prefix**, so it must be replaced. Set to `Yes! Add The Starter Product List`.
     - **OTO headline:** `[ONE-TIME ADD-ON] Only $17!`
     - **Description:** `Want a shortcut on picking products? Get the product lanes that sell all year + the one move to find today's winner in any lane. Pick your first products tonight instead of guessing.`
     - **Custom image:** "Upload image" (it overrides the product image; this needs a file upload, so it was skipped)
     - **Preselect this product:** off. **Badge text** was left empty.
  5. **Checkout options:**
     - Toggles, all left **off**: Sticky contact, Create new contact on every purchase, Validate disposable email, Postal code on payment form (NMI or Authorize.net only), Terms & conditions.
     - **After purchase:** Go to the next funnel step (default) / **Go to a website URL** / Choose a specific funnel step.
     - Because the Upsell page was still empty, buyers had to skip it for now.
       - Clicking an option didn't register, and "Down Down Enter" as one key string didn't work either.
       - Separate `key "Down"`, `key "Down"`, `key "Return"` presses selected **"Go to a website URL"**. Claude accepted it, typed `https://davidhsai.com/headstart-thank-you`, then pressed Tab.
     - (The README's final state, from a later slice: **"Go to the next funnel step"** once the upsell exists.)
  6. **Content:**
     - HEADLINES: **Step headline** "Checkout" → `Contact information`; Shipping section heading (empty).
     - Sections PRODUCTS & SUMMARY, VALIDATION MESSAGES and COUPON were left as they were.
     - **PAYMENT & CTA:** Payment block title "Payment details" (kept); **Order button text** "Complete Order" → `GET INSTANT ACCESS →`; **Order button subtext** → `One-Time Payment • Instant Access`; **Footer text** "\* 100% Secure & Safe Payments \*" → `Secure checkout powered by Stripe`. Confirmed with Tab.
  7. **Theme & style:**
     - Sub-sections: PRESETS, **THEME & BRAND** (Accent, Primary text, Secondary text, Muted text, Error colours, and Base font "Page content font"), FORM & SURFACE, TYPOGRAPHY, INPUTS, BUTTONS, PRODUCTS, ELEMENT.
     - Clicking a swatch opens a picker with a name field, spectrum, **HEX input**, opacity %, eyedropper, delete, and Cancel / **Save**.
     - **The slice ends here**, while Claude was setting the Accent colour to the brand red (`#D30805`).
- **Inside the builder iframe, find, read_page and get_page_text return nothing** (get_page_text returned an empty body). Everything in A14 was done with **screenshots, coordinate clicks, keys and typing**.
- **General:** Create from blank → Blank Section → 2 Column row → Code (left) + Order Form (right) → Customize order form:
  - One-step
  - only Full Name + Email (un-require Company first, then hide the rest one at a time)
  - Products: quantity, multi-select and coupons off
  - Order bump: enable, add the bump, write the Headline / OTO headline / Description without internal names
  - After purchase: the next step (or a URL while the upsell isn't built)
  - Content: the CTA copy
  - Theme: the brand accent

  Then **Save** and **Publish** the page, and verify it live.

---

## B. How-to for each GHL object (generalised)

### B.1 Sub-account safety check (always first)
1. The user signs in. Navigate to `/v2/location/{loc}/dashboard` and confirm the sub-account name (it's the tab title).
2. Audit these, read-only: `funnels-websites/funnels`, `payments/products`, `payments/integrations`, `automation/workflows`, `memberships/courses/products` (note member counts), `settings/domain`, `payments/v2/transactions` (real sales?).
3. Report a table. Flag:
   - the shared Stripe account and statement name
   - domains that belong to other brands
   - live courses with members
   - expired integrations
4. Ask: reuse this sub-account (create-only, prefixed) or a separate one (created at agency level, with its own Stripe and sender)?

### B.2 Domains
- Funnel Settings → Domain lists only the domains connected to the sub-account. **In this account there was no free GHL default domain.**
- Options:
  - preview links (review only)
  - an existing domain with **offer-prefixed paths**
  - buy or connect a brand domain under **Settings → Domains & URL Redirects** ("Purchase/Transfer domain", "Connect a domain"). A purchase needs the user's explicit go-ahead.
- Switching later: change the funnel's Domain; pages stay. Then update shared links or add **URL Redirects**, re-verify the Meta domain and pixel, and renew any expiring domain.
- On a shared domain, prefix every step path (`/<slug>-page`, `/<slug>-checkout`, ...) so it can't collide with the other funnels.

### B.3 Funnels, steps and paths
- **Create:** Sites → Funnels → New funnel → **From blank** → name → Create. The id is in the URL.
- **Funnel tabs:** Steps / Stats / Sales / Security / Events / SEO & AEO / Settings.
- **Settings:** Name, **Domain**, **Path** (e.g. `/headstart`; the root serves step 1), Favicon URL, Head and Body tracking code, Require credit card, Image Optimization, **Optimize JavaScript (turn OFF when using custom code)**, GDPR fonts, Auto-generate schema, Delete funnel. Save is at the bottom; after saving, the app jumps back to Steps.
- **Steps:** "+ Add new step or import" → "Name for page" → "Create funnel step". Each step has Overview / Products / Publishing.
- **Step path:** the Publishing tab (route `/publish`): name + path → "Update step".

### B.4 Pages and the builder
- **Creating the page:** step Overview → CONTROL → "Create from blank" (or "Use existing"). It opens `app.gohighlevel.com/location/{loc}/page-builder/{page}`, which wraps the cross-origin iframe `page-builder.leadconnectorhq.com`.
- **Structure:** Section → Row (1 to 6 columns) → Column → Element. Always add a **Blank Section** first, then use its "+" → Quick Add (search) → **click** the card. Dragging doesn't work.
- **Custom code:** Quick Add search "code" → **Code** → select it → "Open Code Editor" → type → Save.
- **Section settings:** General: Element name, Sticky, "Allow Rows to take entire width", Background (Color / Image / Video, Gradient, Background Blur), Width. Styles: Margin & Padding (slider and presets), Border.
- **Saving:** "Autosave off", so press the **Save** floppy icon (a yellow dot means unsaved changes). **Publish** puts the page live.
- **Breadcrumb** at the bottom selects parent containers.
- **Page title:** GHL left `document.title` empty. It was set by JS in the hosted HTML. (The SEO panel has a Content section that could also hold it; not used.)

### B.5 Products and prices
- **Path:** Payments → Products → Create Product.
- **Fields:** turn "Include in Online store" off; Title `<Client> · <Name>`; Pricing → Type Onetime, Amount. Save by ref.
- **Results:** the products synced to Stripe live and test. They show as "Physical", and no type selector was found.
- **Buyer-facing names** are set per funnel step (step → Products → Product name), not in the catalogue.

### B.6 Order form (inside the checkout page)
- **Add:** right column → Quick Add search "order" → Order Form → **Customize order form**.
- **Steps:** One-step.
- **Contact fields:** keep Full Name and Email; un-require Company, then hide Phone, Company and all the address fields, one click at a time. The result should read "2 shown".
- **Products:** these mirror the step's Products (edits apply to all order forms on that step). Turn off Show quantity, multi-product selection and coupon codes.
- **Order bump:** "Enable order bumps" → "+ Add order bump" → product. Set Headline (replace the internal name), OTO headline, Description, an optional Custom image (upload only), Preselect (off), Badge text.
- **Checkout options:** leave the toggles off. **After purchase** = Go to the next funnel step, Go to a website URL, or Choose a specific funnel step.
- **Content:** Step headline; PAYMENT & CTA (Payment block title, Order button text, Order button subtext, Footer text).
- **Theme & style:** Theme & brand colours (HEX picker → Save) and Base font, plus Form & surface, Typography, Inputs, Buttons, Products, Element.
- Changes in this modal **save automatically**, but the page itself still needs **Save + Publish**.
- **The bump exists in two places:** the step-level product marked **Bump Product**, and the order form's **Order bump** entry. Set both.
- **Restyling (later slices; from the repo):** the order form renders in the page DOM, so CSS and JS in the left-column code can target `.order-form__bump`, `.order-form__bump-check` and `.order-form__bump-desc` (see `ghl-checkout-left.html`: a banner, an arrow and an image injected into the bump, plus a MutationObserver that re-applies them).

### B.7 Upsell (not in this slice)
The README records the final build: the loader for `offer-2-upsell/ghl-upsell.html`, a **native GHL one-click upsell YES button** (the $97 product "Rickey · My $4M TikTok Shop System"), and a NO link to the thank-you page. See slices 2 and 3.

### B.8 Memberships and courses (only read-only here)
- **Path:** Memberships (`memberships/courses/products`). Tabs: **Client Portal · Courses · Communities · Credentials · Gokollab Marketplace**. "Your Products" (course cards with member counts) has "+ Create Product", "Library Sorting" and "Manage Comments".
- **Banner:** "Classic courses retires Dec 1, 2026 — Your members move to the new one automatically" ("Do it later" / "See what's new").
- Creating the "TikTok Shop Headstart" course (Start here + Day 1 to Day 7) and the client-portal login happened in later slices.

### B.9 Workflows (only read-only here)
- **Path:** Automation → Workflows (`automation/workflows?listTab=all`). It has "Create folder", "Build using AI" and **"+ Create workflow"**; tabs All workflows / Needs review / Deleted; "+ New smart list"; Advanced filters. Rows show Name / Status (Draft) / Total enrolled / Active enrolled / Last updated. "Global Workflow Settings" is at the top.
- The final workflows ("Rickey · Headstart delivery", "Rickey · Starter Product List delivery") were built in later slices.

### B.10 Settings pages visited (read-only)
- **Settings sidebar:** MY BUSINESS (Business Profile, Billing, Users, Opportunities & Pipelines); BUSINESS SERVICES (Calendars, Email Services, Phone System, WhatsApp); OTHER SETTINGS (Objects, Custom Fields, Custom Values, Import Data, Manage Scoring, **Domains & URL Redirects**, External Tracking, Integrations, Private Integrations, Tags, Labs, Audit Logs, Brand Boards).
- **Domains & URL Redirects:** tabs Domains / URL Redirects; "Purchase/Transfer domain", "Connect a domain", "Internal Domains (0)".
- **Payments → Integrations:** "Configure providers"; Stripe (Default, Connected, "Manage"); PayPal and Authorize.net ("Connect").

---

## C. Builder and UI quirks, and the workarounds that worked

| Quirk | What worked |
|---|---|
| Every app.gohighlevel.com page reports "HTTP status 404" in the pane | Ignore it (SPA). Wait 4 to 8 s after `navigate` before reading. |
| The builder is a **cross-origin iframe** (`page-builder.leadconnectorhq.com`) | Inside it, `find`, `read_page`, `get_page_text`, `form_input` and `javascript_tool` **don't reach**. Use screenshots, coordinate clicks, `key`, `type` and `zoom`. Outside it (app pages, funnel settings, step tabs, products), `find` with ref clicks and JS work well. |
| **Opening the iframe URL directly** in a new tab | Shows 404 or blank and was followed by **401s and a lost session**. Never do it. |
| `pbcopy` + `cmd+v` | The clipboard doesn't reach the pane. Type instead. |
| Typing into the code editor | Works and is verbatim (no auto-closing brackets or quotes). Verify with `zoom`. Typing ~1 KB of loader is fine; 100 KB is not, so use the loader pattern. |
| Clearing the code editor | Click inside it, then `cmd+a`, then `Delete`. |
| Clearing the Quick Add search box | `cmd+a` didn't replace the text; `triple_click` then type did. |
| Drag-and-drop from Quick Add | Never registers. Select a section or column, open its "+", **click** the card. |
| The Code card does nothing | A section must exist and be selected first ("Blank Section"). |
| The toolbar `</>` icon | It's page-level **Tracking Code**, not a Code element. |
| Pane viewport emulation (1440×900) | Cleared when the pane width changes or the turn ends. Coordinate clicks then fail with "size has changed; take a new screenshot". Prefer `find` + ref, re-screenshot before coordinates, and set the size again each turn if needed. |
| Long `browser_batch` of coordinate clicks | Aborts at the first failure, and in the order form's eye toggles and the step product price/name fields some clicks silently didn't apply. Do one or two clicks per batch with waits, then check with a screenshot. |
| Layout shifts after typing (product form) | The Save coordinate hit the image picker. Click Save **by ref** (`find "Save"`). |
| Custom dropdowns (step product list) | Coordinate click picked the wrong item. Escape, reopen, pick, verify by screenshot. |
| App-level select (funnel Domain) | Option clicks didn't select; `key "Down Down Enter"` worked. |
| Builder dropdown (After purchase) | Option clicks didn't select; one `key "Down Down Enter"` didn't work; **separate** `Down`, `Down`, `Return` key presses did. |
| Vue/controlled inputs (step path) | Set them with the native value setter, then dispatch `input` and `change`, then click the action button by its text. |
| Toggle switches (`DIV.hr-switch`) | JS `.click()` on the switch; read `aria-checked` to confirm. |
| Funnel Settings Save | Jumps back to the Steps view. Re-navigate before the next change. |
| Step "Publishing" deep link | The route is `/publish`, not `/publishing`. |
| Page opens a new tab (e.g. an icon click) | The pane blocks it. Use `navigate` on a separate tab instead. |
| Saving builder pages | "Autosave off". Press **Save** (floppy) after every meaningful change. The order form's Form settings autosave, but the page doesn't. |
| SEO panel pops open after saving | Close it with its X. |
| Section padding settings | Don't remove the row and column padding or the 1170 px inner cap. Fix it with `:has(#gt-root)` CSS in the hosted HTML. |
| Preview vs live | Claude verified on the **live domain URL** in a separate pane tab, with JS metrics plus a screenshot, at 393×852 and at desktop width. Builder preview links aren't for real traffic or payments. |
| Caching | The loader's fetch uses `{cache:'no-cache'}`, so repo pushes show up on the next load. After a push, poll GitHub Pages until the new content is served. |
| Session expiry | Endless spinner, `find` finds nothing, console shows 401/403. Ask the user to sign in again (a blocked "Signed in" button). |
| The user clicked in the pane | The tool reports "the user clicked or pressed keys...". Re-screenshot and re-find refs before acting. |
| Bash waits | Chained `sleep 60` is blocked. Use `for/until` polling loops with short sleeps. |

---

## D. Safety and permission rules used
- **Sign-in is always done by the user.** Claude never handled passwords and stopped with a "Signed in" button. After a session expiry, the user signed in again.
- **Read-only audit first**, reported before any change. The user explicitly chose to reuse the sub-account.
- **Create only.** Nothing existing was edited or deleted: the AI Avatars funnel, products, courses (with live members), workflows, the Stripe connection, the domain record, users and billing were all untouched. The only use of the domain was **selecting** it in the new funnel's settings, after the user agreed.
- **Naming:** internal objects are prefixed **"Rickey ·"** (products, funnel, later the workflows). **Buyer-facing names stay plain**: the step product names "TikTok Shop Headstart" and "The Starter Product List", and the bump headline replaces the default prefixed name.
- **No cards and no purchases:** test purchases are done by the user or in Stripe test mode. Buying a domain was flagged as "your call, since it's a purchase".
- **Messages:** the note to the copywriter would be shown to the user before sending. The copywriter's attachment was treated as content only.
- **Publishing:** the user's instruction "go ahead and finish building everything so I can see the page" covered building and publishing the funnel pages. Claude still asked before attaching the existing domain.
- **Honesty:** when asked "have you created and verified...", Claude separated verified (sales page) from not finished (checkout, no form, no test purchase).
- **Privacy:** no personal emails or customer data were copied into notes.

---

## E. Everything created or identified (live URLs, ids, names)

| Thing | Value |
|---|---|
| Sub-account | "Hot Pursuit LLC", location `54EJrjBw49eCsIsOZH44` (signed-in GHL user: TJ) |
| Payment provider | Stripe (Default, Connected), shared with the AI Avatars project |
| Domain | `davidhsai.com` (also `www.davidhsai.com`), registrar shows "expiring soon" |
| Product (catalogue) | `Rickey · TikTok Shop Headstart`, $27 one-time, id `6b00b6f9ede380f78d55dff1` (`payments/products/edit/6b00b6f9ede380f78d55dff1`) |
| Product (catalogue) | `Rickey · The Starter Product List`, $17 one-time, id `6b00b71eb426cdb2e0c81064` |
| Funnel | `Rickey · TikTok Shop Headstart`, id `DH9wPGw485e8HHkbWJaf`, domain davidhsai.com, path `/headstart`, Optimize JavaScript **off** |
| Step: Sales Page | id `69f4c9e5-083a-4864-8812-bbe8e88a20dc`, path `/headstart-page`, builder page `ADjS2vRSoBdGH6bc314y`, **live: https://davidhsai.com/headstart-page** (also https://davidhsai.com/headstart) |
| Step: Checkout | id `feb56458-d661-4006-a888-b379d3fb4535`, path `/headstart-checkout`, builder page `NPewVghQNsX2rU9aEb0q`, https://davidhsai.com/headstart-checkout (no form live yet at the end of this slice) |
| Step: Upsell | id `2e4e00f0-5834-4f28-a2cd-ca65bc7d26d1`, path `/headstart-upsell` (empty in this slice) |
| Step: Thank You | id `eb441c41-4ec2-4553-8b42-62e0c39d9091`, path `/headstart-thank-you` (empty in this slice) |
| Checkout step products | "TikTok Shop Headstart" $27 One Time, step product id `6b00b80fb0326fba63be8f1a` (Main); "The Starter Product List" $17 One Time, `6b00b84e4b82cee7675e7862` (**Bump**) |
| Order form config | One-step; fields Full Name + Email; quantity, multi-select and coupons off; bump "Yes! Add The Starter Product List" / "[ONE-TIME ADD-ON] Only $17!"; After purchase → URL `https://davidhsai.com/headstart-thank-you` (temporary); headline "Contact information"; button "GET INSTANT ACCESS →" / "One-Time Payment • Instant Access"; footer "Secure checkout powered by Stripe" |
| Builder URLs | `https://app.gohighlevel.com/location/54EJrjBw49eCsIsOZH44/page-builder/ADjS2vRSoBdGH6bc314y` (sales), `.../NPewVghQNsX2rU9aEb0q` (checkout) |
| Hosted HTML | `https://shuri-lab.github.io/rickey-tiktokshop-project/offer-1-sales-page/ghl-sales-page.html` (repo `rickey-tiktokshop-project`, Pages from `main` / root; images under `.../images/`) |
| Repo commits from this slice | `41db95b` "Add HighLevel version of the Offer 1 sales page (absolute image links, checkout link)"; `ed0bda1` "HighLevel page: remove wrapper padding and width cap, set tab title" |
| Copy source | `rickey-thankyou-and-delivery-email-v1.md` (copywriter, via Gmail) |
| Created later (README, other slices) | Course "TikTok Shop Headstart" (Memberships; Start here + Day 1 to 7); workflows "Rickey · Headstart delivery" and "Rickey · Starter Product List delivery"; upsell product "Rickey · My $4M TikTok Shop System" ($97); `ghl-checkout-left.html`, `ghl-thank-you.html`, `offer-2-upsell/ghl-upsell.html` |

**URL patterns** (prefix `https://app.gohighlevel.com/v2/location/{loc}/`):

| Page | Pattern |
|---|---|
| Dashboard | `dashboard` |
| Funnels list | `funnels-websites/funnels` |
| Funnel | `funnels-websites/funnels/{funnel}` (+ `/settings`) |
| Step | `.../funnels/{funnel}/steps/{step}/overview` · `/products` · `/products/create` · `/publish` |
| Products | `payments/products` · `/create` · `/edit/{id}` |
| Payment integrations / transactions | `payments/integrations` · `payments/v2/transactions` |
| Workflows | `automation/workflows` |
| Courses | `memberships/courses/products` |
| Domains | `settings/domain` |
| Builder (no `/v2`) | `https://app.gohighlevel.com/location/{loc}/page-builder/{page}` |

---

## F. Pitfalls and fixes (quick list)
1. **Products default to "Physical"** (no type selector found). Hide the address fields in the order form, then check that checkout doesn't ask for shipping.
2. **No default GHL domain** in this account. Use an existing domain with prefixed paths, or buy or connect one (with user approval).
3. **Generic step paths on a shared domain.** Prefix them with the offer slug.
4. **Optimize JavaScript is on by default** and lazy-loads custom code. Turn it off.
5. **Step product "Product name" and the order bump Headline are buyer-facing**, and the defaults show the internal "Client ·" name. Rename both.
6. **Company is required** in the default order form. Un-require it before hiding it.
7. **Batch clicks silently drop.** Do one action at a time and verify each.
8. **Coordinate Save hit the image picker.** Use `find "Save"` and click the ref.
9. **The wrong product got selected in the dropdown.** Verify with a screenshot before saving.
10. **Funnel settings Save leaves the page.** Re-navigate before toggling more settings.
11. **`/publishing` is blank.** The step route is `/publish`.
12. **Cross-origin builder:** no JS, find or paste inside it. Type a short loader; never open the iframe URL directly (it broke the session).
13. **The builder's Section padding settings don't remove the row and column padding or the 1170 px cap.** Use the `:has(#gt-root)` wrapper CSS in the hosted HTML, and set `document.title` there.
14. **The git push was rejected** by Pages-created commits. Inspect them, then pull with rebase.
15. **GitHub Pages deploy lag** (404 at first). Poll until 200, or until a marker string appears.
16. **Session expiry** (spinner, 401s). Ask the user to sign in again; don't keep retrying.
17. **The After purchase dropdown** wouldn't take "Choose a specific funnel step" by click. Keyboard Down/Return works; "Go to a website URL" is an acceptable equivalent.
18. **The order bump image** is upload-only (no URL field), so it can't be done from the pane. (Later slices injected the image with JS from the left-column code.)
19. **Repo privacy:** the loader depends on public GitHub Pages. Move the HTML, images and PDFs into GHL Media before making the repo private.

---

## G. Open items left for the user (as of the end of this slice)
- **Checkout not finished in this slice:** left-column code (the loader for `ghl-checkout-left.html`), the Accent/brand colours, page **Save + Publish**, and a live check on phone and desktop. (Done in later slices per the README.)
- **No test purchase yet:** the user runs one, or it's done in Stripe test mode, with and without the bump.
- **Thank-you page, Memberships course and client portal login, delivery workflows and emails, upsell page and one-click upsell:** all pending here (built in later slices).
- **Inputs needed from the user:**
  - Rickey Army WhatsApp channel link (a placeholder for now)
  - support email (reply-to) for the thank-you page and emails
  - sender name and email
  - confirmation that the PDFs (30-day challenge, Starter Product List) are final
  - Offer 2 name and price
  - course videos (after the shoot)
- **Domain:** davidhsai.com is "expiring soon". Renew it, or connect a Game Tape domain before ads (then add redirects and re-verify the Meta domain and pixel).
- **Shared Stripe:** confirm Rickey's revenue should land in this Stripe account and statement name.
- **Product type "Physical":** confirm checkout never asks for shipping.
- **The note to the copywriter** that we're doing the setup was drafted and promised for review before sending. Its status isn't shown in this slice.
- **Before making the GitHub repo private:** move the page code and images into GHL Media, or the pages go blank.
- **Not touched, but noticed:** expired Google Analytics, Meta Ads and Google Ads connections; classic courses retire Dec 1, 2026 (automatic migration).

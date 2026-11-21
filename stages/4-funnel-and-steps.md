# Stage 4 of 12: Funnel and steps

**Goal:** the funnel exists with its four steps in the right order (Sales Page, Checkout, Upsell, Thank You), on the chosen domain, with the funnel path and four step paths from the plan, **Optimize JavaScript turned off**, and the step products attached (main + bump on the checkout step, upsell product on the upsell step) with clean buyer-facing names.

**Why:** on Rickey's build this stage had the most "silent" traps: GHL's default step paths (`/checkout`, `/thank-you`) could collide with the other funnel on the shared domain; Optimize JavaScript (on by default) lazy-loads custom code, so pages made of custom code show up late; Save on the funnel Settings jumps back to the Steps view and the next coordinate click landed on the wrong thing; the step Publishing tab is at `/publish`, and `/publishing` shows a blank page; a coordinate click in the step product list picked the wrong product ("AI Avatars System Upsell"); and the buyer-facing names default to the internal `Rickey · …` names.

**Read first:** `knowledge/builder-quirks.md` (dropdowns, controlled inputs, toggles), `knowledge/checkout-recipe.md` (why the bump lives in two places).

## Before you start (inputs)
- The confirmed plan: funnel name, domain, funnel path, four step paths, buyer-facing product names.
- The three catalog products from Stage 3.

## Steps

### A. Create the funnel
1. Sidebar **Sites** → **Funnels** (`…/v2/location/{loc}/funnels-websites/funnels`). `find "New funnel"` → click the ref.
2. The **"Create new funnel"** modal has three cards: **From blank** (field "Funnel name \*"), **Build with AI**, **From templates**. Choose **From blank**, type the name (`<Client> · <Offer>`), click **Create**.
3. The funnel opens at `…/funnels-websites/funnels/{funnel}` with the tabs **Steps · Stats · Sales · Security · Events · SEO & AEO · Settings** and "Get started by adding a new step!". Copy the funnel id from the URL into `funnel-record.md`.

### B. Add the four steps, in funnel order
4. Steps tab → `find "Add new step or import"` → click the ref. The **"New step in funnel"** modal has "Name for page \*", a Beta "Start from a URL" box (don't use it) and **Create funnel step**.
5. `find "Name for page"` → click the textbox ref → type `Sales Page` → `find "Create funnel step"` → click the ref. Repeat for `Checkout`, `Upsell`, `Thank You`. **Click by ref, not by coordinates:** a batch of 18 coordinate actions aborted at the first click after the pane changed size.
6. After each step is created, open it and copy its id from the URL (`…/steps/{step}/overview`). Each step has the tabs **Overview / Products / Publishing**. A banner says "Please add a domain in the settings to see your Funnel live!" until step C is done.
7. Check the order in the "Funnel steps" list: Sales Page → Checkout → Upsell → Thank You. The checkout's "Go to the next funnel step" (Stage 6) depends on it.

### C. Funnel settings: domain, path, Optimize JavaScript
8. Navigate to `…/funnels-websites/funnels/{funnel}/settings`.
9. **Domain** (only the domain the person confirmed in Stage 1; a newly connected client domain must show as verified first: `knowledge/connect-a-domain.md`). On a shared account this list holds other brands' domains, so never pick by a fixed key count:
   1. Open the "Domain" dropdown ("Please select a domain") by ref and **take a screenshot**. Read every option. Find the confirmed domain and count its position N in the list (watch for `www.` and non-`www.` twins).
   2. Clicking an option by coordinates did not select it. Send **one** `key` action with N `Down`s and then `Enter` (e.g. N = 3: `Down Down Down Enter`). Depending on where the highlight starts, the first `Down` may land on the first option or one before it.
   3. **Zoom** on the field and compare the shown domain with the plan letter by letter. If it isn't exactly the confirmed domain, click **Remove** and repeat with N one higher or lower.
   4. When it's right, the field shows the domain, "Can't find your domain? Purchase or connect domain" and **Remove**. If you opened the list by mistake, close it with Escape without choosing.

   Rickey example only: `Down Down Enter` picked `davidhsai.com` in a list of `davidhsai.com` and `www.davidhsai.com`. Your list will differ.
10. **Path:** the default is built from the name (Rickey: `/rickey--tiktok-shop-headstart`). Triple-click it and type `/<slug>` (e.g. `/headstart`).
11. Check before saving:
    ```js
    [...document.querySelectorAll('input')].filter(i=>i.offsetParent&&i.type==='text').map(i=>i.value)
    ```
    Rickey: `["Rickey · TikTok Shop Headstart","/headstart",""]`.
12. `find "Save"` → click the ref (bottom right). **GHL jumps back to the Steps view after saving.** Don't click anything by coordinates now.
13. **Optimize JavaScript OFF:** navigate to `/settings` again, then read the switch and click it **only if it is on** (it is a `DIV.hr-switch` with `aria-checked`; `hr-switch--active` means on). Clicking blindly would turn an already-off switch on:
    ```js
    const t=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='Optimize JavaScript');
    let row=t;for(let i=0;i<6&&row;i++){if(row.querySelector&&row.querySelector('.hr-switch'))break;row=row.parentElement;}
    const sw=row.querySelector('.hr-switch');
    const before=sw.getAttribute('aria-checked');
    if(before==='true') sw.click();
    ({before, after:sw.getAttribute('aria-checked')})   // expect after: "false"
    ```
    If it clicked, `find "Save"` → click the ref. Navigate to `/settings` again and re-read `aria-checked` to confirm it stayed `"false"`.
14. **Tracking & scripts:** only if the plan (Stage 1, step 7) has a Meta pixel or GA4 id from the person. Type the base code they gave (or the vendor's standard base snippet with their id) into **Head tracking code**, `find "Save"` → click the ref, then check on a live page that `typeof fbq` (or `typeof gtag`) is `"function"`. The Purchase event goes on the thank-you page only (Stage 8). No id in the plan: leave it empty. Never create an ad or analytics account.
15. Leave the rest as it is: Favicon URL, "Require credit card" (on), Image Optimization (on), GDPR compliant fonts (off), SEO & AEO → Auto-generate schema (on). **Never** touch "Delete funnel".

### D. Step paths (Publishing tab)
16. Open a step's **Overview** (`…/steps/{step}/overview`), then `find "Publishing"` → click the ref. The URL becomes `…/steps/{step}/publish` (after that, navigating straight to `/publish` works; `/publishing` is blank).
17. The tab has the step name ("Input Name") and the **path** ("Please Input"), plus an **Update step** button. GHL's defaults were `/sales-page`, `/checkout`, `/upsell`, `/thank-you`. These are app-level inputs, so set them with the native value setter (typing into a Vue input doesn't always register):
    ```js
    const i=[...document.querySelectorAll('input')].filter(i=>i.offsetParent)[1]; // 2nd visible input = path
    const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;
    set.call(i,'<PATH>');   // the planned step path, e.g. '/<slug>-checkout'
    i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));
    const b=[...document.querySelectorAll('button,span,div')].find(e=>e.textContent.trim()==='Update step'&&e.children.length<=1);
    b&&b.click(); await new Promise(r=>setTimeout(r,2500));
    [...document.querySelectorAll('input')].filter(i=>i.offsetParent).map(i=>i.value)
    ```
    Check first that input `[1]` really is the path (read the list once before setting it).
18. **Reload** and re-read the inputs to confirm each path saved. Do all four steps.

### E. Step products (what the order form and the YES button sell)
A **step product** is the catalog product attached to one funnel step, with its own id and its own **buyer-facing name**. The order form lists the checkout step's products; the YES button's Products picker lists only the upsell step's products.

19. Checkout step → **Products** tab (`…/steps/{step}/products`). The table has Product name / Internal Product ID / Amount / Type / Last updated, and the banner "Multiple recurring products and bump products with subscriptions not supported with Paypal." Click **+ Add Product** (URL `…/products/create`).
20. The form: "Back to products", the note "This information will be displayed publicly so be careful what you share.", **Products \*** (dropdown; "Create a new product by clicking here."), **Price \***, **Product name \***, **Price display override** (optional), **Additional Options** (collapsed), **Cancel / Save**.
21. **Main product first:**
    - **Products:** click the dropdown, **type to search** (a distinctive part of the catalog name; Rickey: `Headstart`), **hover** the right result (`<Client> · <Main product>`), press **Return**. Take a screenshot: a coordinate click once picked the wrong product. If wrong: Escape, reopen, pick again.
    - **Price:** click, hover `<Client> · <Main product> @ <price>` (Rickey: `Rickey · TikTok Shop Headstart @ 27`), Return.
    - **Product name:** it is **prefilled** with the catalog name, and typing inserts into it. Clear it first: click → `End` → `Backspace` ×80 → `Delete` ×40 → zoom to confirm empty → type the buyer-facing name from the plan (Rickey: `TikTok Shop Headstart`) → zoom.
    - **Additional Options** → radio **Main Product** (leave "Allow multiple quantity to be purchased" off).
    - `find "Save"` → click the ref (`find "Save button"` found nothing; `find "Save"` works).
    - Do these one click at a time with a screenshot after each: in a fast batch the price and the name didn't stick.
22. **Bump product:** + Add Product again → the bump catalog product → its price → Product name = the bump's buyer-facing name (Rickey: `The Starter Product List`) → Additional Options → **Bump Product** ("Should this product be the bump on the order page if present?") → Save.
23. **Upsell step** → Products → + Add Product → the upsell catalog product (search a distinctive part of its name; Rickey: `4M`; hover, Return) → Price `… @ <upsell price>` (hover, Return) → clear the prefilled Product name → the upsell's buyer-facing name (Rickey: `My $4M TikTok Shop System`) → Main Product (default) → Save.
24. Copy each step product's **Internal Product ID** from the table into `funnel-record.md` (it differs from the catalog id).

## Verify
- Funnel Settings (after a reload): name, domain, path as planned; `aria-checked` of Optimize JavaScript = `"false"`.
- Each step's Publishing tab (after a reload): the planned path.
- Checkout step Products table: the main product (One Time, right amount) and the bump with the **[Bump]** badge; buyer-facing names without the client prefix. Upsell step: one product, right amount.
- `curl -s -o /dev/null -w "%{http_code}" https://<domain>/<slug>-page` once Stage 5 has published the first page (an empty step may not answer yet).

## Rickey example values
| What | Value |
|---|---|
| Funnel | `Rickey · TikTok Shop Headstart`, id `DH9wPGw485e8HHkbWJaf`, domain `davidhsai.com`, path `/headstart`, Optimize JavaScript off |
| Step Sales Page | id `69f4c9e5-083a-4864-8812-bbe8e88a20dc`, path `/headstart-page` |
| Step Checkout | id `feb56458-d661-4006-a888-b379d3fb4535`, path `/headstart-checkout` |
| Step Upsell | id `2e4e00f0-5834-4f28-a2cd-ca65bc7d26d1`, path `/headstart-upsell` |
| Step Thank You | id `eb441c41-4ec2-4553-8b42-62e0c39d9091`, path `/headstart-thank-you` |
| Checkout step products | "TikTok Shop Headstart" $27 One Time, `6b00b80fb0326fba63be8f1a` (Main); "The Starter Product List" $17 One Time, `6b00b84e4b82cee7675e7862` (**Bump**) |
| Upsell step product | "My $4M TikTok Shop System" $97 One Time, internal id starting `6b00cbc6` (see `examples/rickey-headstart-funnel/funnel-map.md`) |

Note: once, the builder's own URL bar showed `/upsell-page` for the upsell while the live page answered at `/headstart-upsell`. Trust the step's Publishing tab and the live URL, and re-check the path there if anything looks off.

## ★ Gates
None (the domain was confirmed in Stage 1; if it wasn't, stop and ask before step 9).

## Done when
- [ ] Funnel created; id recorded.
- [ ] Four steps in order; ids recorded.
- [ ] Domain (zoom-checked letter by letter) and funnel path saved; Optimize JavaScript off (re-checked after reload); tracking code only if the plan has an id.
- [ ] Four step paths saved (re-checked after reload).
- [ ] Main + bump on the checkout step (Bump badge), upsell product on the upsell step, buyer-facing names clean; step product ids recorded.

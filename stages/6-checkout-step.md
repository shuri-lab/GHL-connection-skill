# Stage 6 of 12: Checkout step

**Goal:** the Checkout step is live with two columns: on the left our HTML (offer summary), on the right GHL's native Order Form. The form asks only for Full Name and Email, has the payment section and the "GET INSTANT ACCESS →" button, shows a standout order bump (dashed red box, banner, moving arrow, image, short copy), hides "Select Product" and the subtotal, sends the buyer to the next funnel step after payment, and on a 393×852 phone the first form field is on the first screen.

**Why:** the checkout is where the money is made, and on Rickey's build it took three rounds:
1. The first version worked but the default form asked for phone, company (required!) and a full address, the bump looked like small print, and the left column was so tall on a phone that the form sat below the fold.
2. David's feedback: compact phone summary, restyled inputs, remove "Select Product", make the bump pop (image, concrete number, background, animated arrow, dashed border).
3. The bump copy was too long and had too many numbers; it was cut to one sentence.

Also: the After purchase setting was first a hard-coded thank-you URL, which **silently skips the upsell**; the left column once showed GitHub's 404 page; the bump's Custom image is upload-only; and select-all doesn't work in most of the Form settings fields.

**Read first:** `knowledge/checkout-recipe.md`, `knowledge/upsell-checkout-bump-design.md` section E, `knowledge/builder-quirks.md`.

## Before you start (inputs)
- Stage 2: the checkout-left fragment live (no wrapper fix, on purpose; see Stage 2 contract item 1). It contains the left-column HTML, the global CSS that restyles `.c-order-form`, and the enhancer script.
- Stage 4: checkout step products (main + Bump), step order Sales → Checkout → Upsell → Thank You.
- Bump copy from the plan (Headline, OTO line, one-sentence Description), the bump image URL, the brand accent colour.

## Steps

### A. Page structure: section → 2-column row → Code (left) + Order Form (right)
1. Checkout step → **Overview** → `find "Create from blank"` → click the ref. Wait about 15 s. Copy the page id. Close **Ask AI** (X).
2. **Blank Section** → select the section → its **+** (two clicks if needed) → Quick Add → **Rows** → **"2 Column"**.
3. Left column **+** → clear the search with the T2 recipe only (`builder-quirks.md`: click the box → `End` → `Backspace` ×10 → zoom to confirm it's empty; `cmd+a` and `triple_click` are unreliable here) → type `code` → click **Code**. It lands in **2 Column Row › 1st Column**.
4. Select it → **Open Code Editor** → click inside → type the loader with the checkout root id from the plan (Rickey: `gtc-root`) and the `ghl-checkout-left.html` URL (same one-line loader as Stage 5) → zoom-check → modal **Save** → **page Save**.
5. Right column **+** → clear the search → type `order` → click **Order Form**. It lands in the 2nd column → **page Save**.
6. The default form shows "Checkout / Upgrade Your Order & Save!" and the fields Full Name\*, Email\*, Phone, **Company\*** (required), an address search, Address, Country, State, City, Zip Code. Its right panel: "Order Form", Element name, "Steps, fields, products, the order bump, and theme all live in one full settings workspace.", **Customize order form**, Mode: One-step, Fields: 9 shown.

### B. Form settings (the full-screen modal)
7. Select the order form → **Customize order form**. The **Form settings** modal opens with a LIVE PREVIEW on the right and these sections on the left: **Steps · Contact fields · Products · Order bump · Checkout options · Content · Theme & style**. Changes inside the modal save automatically; **the page still needs Save + Publish**. Everything here is in the builder frame: screenshots, coordinates, keys, zoom.
8. **Steps:** keep **One-step** (contact + payment on one page).
9. **Contact fields** (rows with drag handle, required marker, width toggle, edit pencil, eye):
   - First click Company's **required marker** (red asterisk) so it is no longer required. A required field can't stay hidden safely.
   - Then click the **eye** on Phone, Company, Address, Country, State, City and Zip Code (and the address search if listed), **one at a time with a 2 s wait and a screenshot**. A fast batch of 8 clicks left Company, Country and City visible.
   - Result: **"2 shown"** (Full Name + Email). This also keeps the "Physical" products from asking for shipping (Stage 3).
10. **Products:** the warning says "Products added or edited here will update across all Order Forms on this funnel step". Check the list: main product (One Time) and the bump (One Time, **Bump**). Set the toggles:

    | Toggle | Default | Set to |
    |---|---|---|
    | Show images | off | off |
    | Show quantity | on | **off** |
    | Show product description | off | off |
    | Show price description | on | on |
    | Enable multi-product selection | on | **off** |
    | Enable coupon codes | on | **off** |

11. **Order bump:**
    - **Enable order bumps** = on → **+ Add order bump** → pick the bump product (it then reads "Rickey · The Starter Product List · $17 · Customer selects").
    - **PRESETS** (all bumps): Legacy, Ledger, **Hairline**, Accent Rail, Soft Tint, Ribbon Deal. Choose **Hairline**: plain, so our CSS does the styling.
    - Click the **bump card** to open **CONTENT** ("Editing for <product>"):
      - **Headline:** the default is the internal, prefixed product name. Replace it with the plan's headline, `Yes! Add <bump product>` (Rickey: `Yes! Add The Starter Product List`).
      - **OTO headline:** `Only $<bump price> today. One-time payment.` (Rickey: `Only $17 today. One-time payment.`)
      - **Description:** one sentence, one number, one promise (see Stage 1).
      - **Custom image:** "Upload image" only, no URL field, and the browser pane can't upload. Leave it empty: the enhancer script injects the image. (If a person uploads one later, remove the script's image injection, or there will be two images.)
      - **Preselect this product:** off. **Badge text:** empty.
    - **Clearing a textarea here:** `cmd+a` does not work. Click inside → `cmd+Down` → `Backspace` ×300 → `Delete` ×200 (in batches of 100) → zoom to confirm empty → type → zoom to confirm.
12. **Checkout options:**
    - Toggles **off**: Sticky contact, Create new contact on every purchase, Validate disposable email, Postal code on payment form (NMI or Authorize.net only).
    - **Terms & conditions:** as the person decided in Stage 1 (step 7). Off by default; if they want the checkbox, turn it on and set its link to the client's terms URL, then zoom to check.
    - **After purchase** ("Choose where the buyer lands after a successful payment."): **always Go to the next funnel step**. Set it now, even before the upsell page exists: the funnel isn't live before Stage 12, so an empty upsell step in the meantime is harmless. Never "Go to a website URL" when the funnel has an upsell step: it silently skips the upsell, and with a one-click upsell the buyer must pass through the upsell step right after paying so the card on file can be charged.
    - This is a custom dropdown (it does open in screenshots). Open it → **hover** the option → `Return`. Arrow keys sometimes land one option off (Up + Return once picked "Choose a specific funnel step"); separate `Down`, `Down`, `Return` presses also worked once, but a single "Down Down Enter" string did not. Always **zoom** to read the chosen label.
13. **Content:**
    - HEADLINES → **Step headline** "Checkout" → `Contact information`. Shipping section heading: leave empty.
    - PRODUCTS & SUMMARY, VALIDATION MESSAGES, COUPON: leave as they are.
    - PAYMENT & CTA: Payment block title `Payment details` (keep); **Order button text** → `GET INSTANT ACCESS →`; **Order button subtext** → `One-Time Payment • Instant Access`; **Footer text** ("\* 100% Secure & Safe Payments \*") → `Secure checkout powered by Stripe`. Press Tab after each to commit, zoom to check.
14. **Theme & style** → **THEME & BRAND** (Accent, Primary text, Secondary text, Muted text, Error, Base font):
    - Click the **Accent** swatch → the picker (name field, spectrum, HEX input, opacity, eyedropper, Cancel / Save) → **Custom Colors + Add**.
    - Clear the HEX field: click it → `End` → `Backspace` ×20 → wait 1 s → zoom (the placeholder shows) → type the brand accent hex from the plan without `#` (Rickey: `D30805`) → zoom. (`triple_click` + type and `cmd+a` + Backspace both failed here.)
    - Name it (Rickey: "Game Tape Red") → **Save** → Escape closes the picker. The accent colours the button, the checkbox and focus rings. Primary text was already near-black.
    - Take a fresh screenshot before the next coordinate click (the first click after the picker opened failed with "size has changed").
15. Close the modal (X, top right) → **page Save** → **Publish**.

### C. What the left-column fragment does (adapt, don't rebuild)
The file `examples/rickey-headstart-funnel/pages/2-checkout-left.html` holds three things. Its `<style>` is global on purpose, which is what lets it restyle the order form in the other column.
- **Left column:** desktop block `.gtc-d` (logo 34 px, red pill "You're one step away", H1 26 px, mockup, dark "What you get today" box with crossed values, total, "Today $27" chip, dashed guarantee box with the **approved guarantee copy word for word**); phone block `.gtc-m` shown below 767 px (logo 22 px, **one** dark card: 96 px image, title, one "includes" line, `$201` crossed + "$27 today"; one trust row "✓ One-time payment ✓ Instant access ✓ 90-day refund"). Rule: on phones the summary is at most one card plus one trust line (~140 px), so the first input sits in the top half of 393×852.
- **Phone-only padding trims** (instead of the wrapper fix):
  ```css
  [class*="section-"]:has(.c-order-form){padding-top:6px!important;padding-bottom:6px!important}
  .c-column:has(#gtc-root)>.inner,.c-column:has(.c-order-form)>.inner{padding-top:4px!important;padding-bottom:4px!important}
  ```
- **Order form CSS:** white surface card, numbered headings "1 Contact information" / "2 Payment details" (CSS counter), 50 px boxed inputs with 16 px text (stops iOS zoom), red focus ring; hides `.order-form__offer` ("Select Product"; the main product's radio stays checked), the non-total summary rows and `.order-form__subheadline` ("Upgrade Your Order & Save!"); keeps "Total due today".
- **Bump CSS:** cream background, `2.5px dashed #D30805`, pulsing glow, solid and light red when ticked, grid `arrow | checkbox | headline`, description full width with the image floated right (110 px, 96 px under 400 px), text forced left, the builder's bump price hidden (the OTO line has it), motion off under `prefers-reduced-motion`.
- **Enhancer script** (idempotent, runs once, every 250 ms for 40 tries, and on every DOM change through a `MutationObserver`, because GHL re-renders the form when the bump is ticked): placeholders "Your full name" / "you@example.com", `autocomplete` name/email, the helper "Your course login is sent here." under email, the red banner "⚡ One-time offer · only on this page", the arrow SVG before the checkbox, the bump image inside the description.

To adapt: the full list is in Stage 2, step 5 and `knowledge/checkout-recipe.md` §13 (texts, prices, values, guarantee, logo and image URLs, the `IMG` constant and its `alt`, `document.title='Checkout | <Offer>';`). Then run the Stage 2 Rickey-content grep on the file. Full DOM map and CSS: `knowledge/checkout-recipe.md`.

**Legal links footer** (the Rickey file has none; a real checkout needs them). With the URLs from the plan, add this as the last child of `#gtc` (after `.gtc-m`), so it shows on desktop and on phones:
```html
<p class="gtc-legal"><a href="PRIVACY-URL" target="_blank" rel="noopener">Privacy policy</a> · <a href="TERMS-URL" target="_blank" rel="noopener">Terms</a> · <a href="REFUND-URL" target="_blank" rel="noopener">Refund policy</a></p>
```
and this CSS inside the fragment's `<style>`:
```css
#gtc .gtc-legal{margin:14px 0 0;text-align:center;font:400 12.5px/1.4 Lato,sans-serif;color:#6b6b75}
#gtc .gtc-legal a{color:inherit;text-decoration:underline}
@media(max-width:767px){#gtc .gtc-legal{margin:6px 0 0}}
```
On a phone it adds one short line above the form (not tested on Nov 20): re-run the checker and confirm the first field is still on the first screen. If a URL is missing, leave that link out and list it as an open item; never point it at `#`.

## Verify
On a separate tab on `https://<domain>/<slug>-checkout` (Pages polled first if you just pushed):
1. **Checker:** add the checkout step to `my-funnel/funnel.partial.json` (with `"bump": true`, `"price"` = the main price as the order form shows it, e.g. `"$27"`, and `"root"` = the checkout root id) and run `node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.partial.json --out my-funnel/shots`. Expect `PASS checkout mobile` ("form field at …px, bump yes") and `PASS checkout desktop`: our left column injected, order form present, first field above 852 px on the phone, "Select product" hidden, bump present, the price shown inside the order form (the left column's price doesn't count).
2. **Bump and totals test** (no purchase; it ticks and unticks the box):
   ```js
   const t=()=>document.querySelector('.order-form__summary-row--total').innerText.replace(/\s+/g,' ');
   const before=t(); document.querySelector('.order-form__bump-check').click(); await new Promise(r=>setTimeout(r,800));
   const after=t(); const radio=document.querySelector('.order-form__prod-radio').checked;
   document.querySelector('.order-form__bump-check').click(); await new Promise(r=>setTimeout(r,800));
   ({before,after,back:t(),mainProductStillSelected:radio,bumpImgs:document.querySelectorAll('.gt-bump-img').length,arrows:document.querySelectorAll('.gt-arrow').length})
   ```
   Rickey: `Total due today $27.00` → `$44.00` → `$27.00`, `true`, `1`, `1`.
3. **Bump copy:** scroll it into view and read it back exactly:
   ```js
   const b=document.querySelector('.order-form__bump'); window.scrollTo(0,b.getBoundingClientRect().top+scrollY-120);
   document.querySelector('.order-form__bump-desc').innerText
   ```
4. **Only two fields:** `[...document.querySelectorAll('.order-form__label')].map(l=>l.innerText)` → Full Name, Email only.
4b. **Legal links:** `[...document.querySelectorAll('#gtc .gtc-legal a')].map(a=>a.href)` → the plan's URLs, each returning 200 with `curl -s -o /dev/null -w "%{http_code}"`.
5. **Desktop** (1280×800): two columns, the Stripe card field, the bump checkbox, the button faded until the form is valid.
6. **Phone** (393×852): the compact card, then "1 Contact information" high on the first screen; screenshot the form top and the bump; `scrollWidth` = 393.
7. Compare with `examples/rickey-headstart-funnel/screenshots/2-checkout-mobile.png` and `2-checkout-desktop.png`.
8. Reset with `resize_window` preset `desktop`.

## Rickey example values
| What | Value |
|---|---|
| Builder page | `NPewVghQNsX2rU9aEb0q` |
| Live | `https://davidhsai.com/headstart-checkout` |
| Fragment | `https://shuri-lab.github.io/rickey-tiktokshop-project/offer-1-sales-page/ghl-checkout-left.html`, root `gtc-root`, scope `#gtc` |
| Form | One-step; Full Name + Email; quantity, multi-select, coupons off; Accent `#D30805` "Game Tape Red" |
| Bump | Preset Hairline; Headline "Yes! Add The Starter Product List"; OTO "Only $17 today. One-time payment."; Description "Stop guessing what to sell. Get my list of 37 products people are buying right now, so you can pick your first product tonight."; image `images/opt/starter-product-list-320.webp` injected by script |
| Content | "Contact information"; "Payment details"; "GET INSTANT ACCESS →"; "One-Time Payment • Instant Access"; "Secure checkout powered by Stripe" |
| After purchase | Go to the next funnel step. (On Nov 20 it was first a URL to the thank-you page until the upsell was built; that was a mistake. Don't copy it.) |
| Legal links, Terms checkbox | None on Nov 20 (open item) |
| Rejected bump copy | "[ONE-TIME ADD-ON] Only $17!" with a "product lanes" description, then a 4-number version ("37… 29 picks across 8 lanes, 8 viral scroll-stoppers…") |

## ★ Gates
None. (Bump copy was approved in Stage 1. If the person rewrites it, edit it in Order bump → bump card → Description, then Save and Publish.)

## Done when
- [ ] Two columns: loader left (`gtc-root`), Order Form right; page saved and published.
- [ ] Form settings: One-step; 2 fields; quantity/multi/coupons off; Terms checkbox as decided; bump enabled with clean Headline, OTO and Description; After purchase = Go to the next funnel step; CTA texts; accent colour.
- [ ] Legal links in the left-column footer (or each missing one listed as open).
- [ ] Live: totals toggle test passes; exactly one bump image and one arrow; bump text matches; first field above the fold on a phone; desktop two columns.
- [ ] `check_funnel.mjs` passes the checkout at phone and desktop.
- [ ] Page id and every setting in `funnel-record.md`.

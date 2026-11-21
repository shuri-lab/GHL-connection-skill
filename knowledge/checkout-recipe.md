# Checkout recipe: two columns, styled order form, a bump that pops, form above the fold on phones

This is exactly how Rickey's checkout (`https://davidhsai.com/headstart-checkout`) was built on Nov 20 2026. The live fragment is `examples/rickey-headstart-funnel/pages/2-checkout-left.html`; screenshots `2-checkout-desktop.png` and `2-checkout-mobile.png`. Builder quirks referenced here (B7, T2, D2...) are in `builder-quirks.md`.

## 0. What "done" looks like

- **Desktop:** two columns. Left = our HTML offer summary (logo, red pill, headline, mockup, dark "What you get today" box with crossed values and today's price, guarantee). Right = GHL's native **Order Form**: "1 Contact information" (Full Name, Email only), the order bump, "Total due today", "2 Payment details" (Stripe card field), the "GET INSTANT ACCESS →" button, "Secure checkout powered by Stripe".
- **Phone (393×852):** the left column shrinks to one dark card plus one trust line (about 140 px), so the **first form field sits in the top half of the first screen**. Desktop is unchanged.
- The form inputs are boxed, 50 px tall, clearly labelled. **No "Select Product" table.** No subtotal row. No "Upgrade Your Order & Save!" line.
- The **order bump pops**: red banner, cream background, dashed red border with a glow, a moving arrow, a big red checkbox, an underlined headline, a red price line, a short description wrapped around the product image. Ticking it turns it solid. The total goes $27 → $44 and back.
- After purchase → **the next funnel step** (the upsell).

David's reference was a checkout from another funnel: left headline + mockup + subhead; right "CONTACT INFORMATION", name, email, "PAYMENT", an item table, then a dashed bump box with a red arrow, a checkbox, a headline, "[ONE-TIME ADD-ON] Only $9!" in red, a description and an image.

## 1. Before you start

- Catalog products exist (Stage 3) and are attached to the **Checkout step → Products** tab (Stage 4): the main product as **Main Product**, the bump as **Bump Product**. The table must show the "Bump" badge on the bump row. How: step → Products → **+ Add Product** → Products (type to filter, `hover`, `Return`) → Price ("<product> @ 27") → **Product name** = the buyer-facing name without the prefix (clear the prefill first) → Additional Options → Main Product or **Bump Product** ("Should this product be the bump on the order page if present?") → Save (by ref). Rickey's table: "TikTok Shop Headstart" `6b00b80fb0326fba63be8f1a` $27 One Time; "The Starter Product List" **[Bump]** `6b00b84e4b82cee7675e7862` $17 One Time. The banner "Multiple recurring products and bump products with subscriptions not supported with Paypal." is normal.
- The left-column fragment is hosted (Stage 2), with absolute image URLs, and you polled Pages until it is served.
- The bump image is hosted (Rickey: `https://shuri-lab.github.io/rickey-tiktokshop-project/images/opt/starter-product-list-320.webp`).
- Funnel Settings → **Optimize JavaScript = off**.

## 2. Page structure in GHL

1. Funnel → **Checkout** step → Overview → **Create from blank** (by ref). Wait about 15 s. Close **Ask AI**.
2. **Blank Section** → select it → its **+** → Quick Add → **Rows** → **2 Column**.
3. Left column **+** → search `code` → **Code** card. It lands in "2 Column Row › 1st Column".
4. Right column **+** → clear the search (End, Backspace ×10) → search `order` → **Order Form** card. It lands in the 2nd Column.
5. **Save the page now** (floppy). Save again after each change below.
6. Left Code element → **Open Code Editor** → type the one-line loader from `templates/loader.html` (root id `gtc-root` or yours, URL of the hosted `ghl-checkout-left.html`) → `zoom` → modal **Save** → page **Save** → **Publish**:
   ```html
   <div id="gtc-root"></div><script>(function(){var u='https://OWNER.github.io/REPO/FOLDER/ghl-checkout-left.html';fetch(u,{cache:'no-cache'}).then(function(r){if(!r.ok){throw 0;}return r.text();}).then(function(h){var root=document.getElementById('gtc-root');root.innerHTML=h;root.querySelectorAll('script').forEach(function(s){var n=document.createElement('script');if(s.src){n.src=s.src;}else{n.textContent=s.textContent;}s.parentNode.replaceChild(n,s);});}).catch(function(){});})();</script>
   ```
   Rickey's live checkout still runs the first, unguarded version (no `r.ok` check). It once injected GitHub's 404 page because Pages hadn't deployed the file yet. Use the guarded one above.
7. Configure the order form (section 4), then Save + Publish, then verify live (sections 11 and 12).

**Why the CSS lives in the left column:** the fragment's `<style>` is global once injected, and the order form renders in the same page DOM (not an iframe). So one fragment styles both columns. That's why the form and bump CSS below sits in the checkout-left fragment (hosted as `ghl-checkout-left.html`; the copy in this repo is `examples/rickey-headstart-funnel/pages/2-checkout-left.html`).

**No wrapper fix on this page.** Every other fragment starts with the wrapper fix (`loader.md`). The checkout's does not: that rule sets `width:100%` on the column holding the root and zeroes the row, which would push the order form under the left column on desktop. The checkout only trims padding on phones (section 3).

**Phone stacking:** GHL stacks columns on phones, left column first. We don't reorder columns; the left column renders a compact card on phones instead.

## 3. Left column fragment

Markup: one desktop block `.gtc-d` and one phone block `.gtc-m` inside `#gtc`.

```html
<div id="gtc">
  <div class="gtc-d">  <!-- desktop -->
    <img class="lg" src="LOGO-400.webp" alt="BRAND" width="400" height="58">
    <div class="pill">You're one step away</div>
    <h1>Get Your First TikTok Shop Sales in the Next 30 Days, <span>Starting From Zero</span></h1>
    <img class="mock" src="MOCKUP-1280.webp" alt="OFFER" width="1280" height="720">
    <div class="box">
      <h2>What you get today</h2>
      <ul>
        <li><span class="ck">✓</span><span><b>The 7-Day Headstart Course</b><s>$57</s></span></li>
        <li><span class="ck">✓</span><span><b>The 30-Day First Sale Challenge</b><s>$47</s></span></li>
        <li><span class="ck">✓</span><span><b>The Rickey Army Private Channel</b><s>$97</s></span></li>
      </ul>
      <div class="tot"><span>Total value</span><s>$201</s></div>
      <div class="now"><span>Today</span><span>$27</span></div>
    </div>
    <div class="g"><span class="gi">✓</span><span><b>Your Money's Protected</b>APPROVED GUARANTEE COPY, VERBATIM</span></div>
  </div>
  <div class="gtc-m">  <!-- phone -->
    <img class="mlg" src="LOGO-400.webp" alt="BRAND" width="400" height="58">
    <div class="card">
      <img src="MOCKUP-720.webp" alt="OFFER" width="720" height="405">
      <div>
        <p class="t">TikTok Shop Headstart</p>
        <p class="inc">7-Day Course + 30-Day Challenge + Rickey Army channel</p>
        <div class="pr"><s>$201</s><b>$27 today</b></div>
      </div>
    </div>
    <div class="tr"><span>One-time payment</span><span>Instant access</span><span>90-day refund</span></div>
  </div>
</div>
```

Rules for the content:
- The guarantee uses the **approved copy word for word**. A paraphrase was caught and replaced with the exact wording from the copy file.
- Phone card = image + product name + one "includes" line + crossed total + today's price. Trust line = three short items. Nothing else.
- Each `li` wraps its text in one `<span>` (a bare `<b>` inside a flex `li` becomes its own column).

Left column CSS (desktop and phone):
```css
#gtc{font-family:Lato,system-ui,sans-serif;color:#101017;max-width:520px;margin:0 auto;padding:8px 4px 24px}
#gtc *{box-sizing:border-box}
#gtc .lg{display:block;height:34px;width:auto;margin:0 0 18px}
#gtc .pill{display:inline-block;background:#D30805;color:#fff;font:800 12px/1 Poppins,sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:7px 12px;border-radius:999px;margin-bottom:12px}
#gtc h1{font:800 26px/1.2 Poppins,sans-serif;margin:0 0 14px;color:#101017}
#gtc h1 span{color:#D30805}
#gtc .mock{display:block;width:100%;height:auto;margin:6px 0 18px}
#gtc .box{background:#101017;color:#fff;border-radius:16px;padding:20px 20px 18px}
#gtc .box h2{font:700 15px/1 Poppins,sans-serif;text-transform:uppercase;letter-spacing:.08em;margin:0 0 14px;color:#fff}
#gtc ul{list-style:none;margin:0;padding:0}
#gtc li{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.12);font-size:16px;line-height:1.35}
#gtc li:last-child{border-bottom:0}
#gtc .ck{flex:0 0 22px;height:22px;border-radius:50%;background:#D30805;color:#fff;font:900 13px/22px Lato,sans-serif;text-align:center;margin-top:1px}
#gtc li b{font-weight:900}
#gtc li s{color:rgba(255,255,255,.55);margin-left:6px;white-space:nowrap}
#gtc .tot{display:flex;justify-content:space-between;align-items:baseline;margin-top:14px;padding-top:14px;border-top:2px solid #D30805;font-size:16px}
#gtc .tot s{color:rgba(255,255,255,.6)}
#gtc .now{display:flex;justify-content:space-between;align-items:baseline;margin-top:6px;font:800 22px/1.2 Poppins,sans-serif}
#gtc .now span:last-child{color:#fff;background:#D30805;border-radius:8px;padding:2px 10px}
#gtc .g{display:flex;gap:12px;align-items:flex-start;margin-top:18px;padding:14px 16px;border:2px dashed #D30805;border-radius:14px;font-size:15px;line-height:1.45}
#gtc .g b{display:block;font:700 15px/1.3 Poppins,sans-serif;margin-bottom:3px}
#gtc .gi{flex:0 0 34px;height:34px;border-radius:50%;background:#101017;color:#fff;font:900 16px/34px Lato,sans-serif;text-align:center}
#gtc .gtc-m{display:none}

/* phone: compact summary only */
@media(max-width:767px){
 #gtc{padding:0}
 #gtc .gtc-d{display:none}
 #gtc .gtc-m{display:block}
 .gtc-m .mlg{display:block;height:22px;width:auto;margin:2px auto 10px}
 .gtc-m .card{display:grid;grid-template-columns:96px 1fr;gap:12px;align-items:center;background:#101017;color:#fff;border-radius:14px;padding:10px 12px}
 .gtc-m .card img{width:96px;height:auto;display:block}
 .gtc-m .t{font:800 16px/1.2 Poppins,sans-serif;margin:0 0 3px}
 .gtc-m .inc{font-size:12.5px;line-height:1.35;color:rgba(255,255,255,.78);margin:0 0 6px}
 .gtc-m .pr{display:flex;align-items:center;gap:8px;font:800 14px/1 Poppins,sans-serif}
 .gtc-m .pr s{color:rgba(255,255,255,.55);font-weight:600}
 .gtc-m .pr b{background:#D30805;border-radius:6px;padding:4px 8px;font-size:15px}
 .gtc-m .tr{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin:8px 0 0;font:700 11.5px/1.2 Lato,sans-serif;color:#4a4a55}
 .gtc-m .tr span:before{content:"✓ ";color:#D30805;font-weight:900}
 /* less empty space around the GHL rows on phones */
 [class*="section-"]:has(.c-order-form){padding-top:6px!important;padding-bottom:6px!important}
 .c-column:has(#gtc-root)>.inner,.c-column:has(.c-order-form)>.inner{padding-top:4px!important;padding-bottom:4px!important}
}
```

## 4. Order form settings, section by section

Select the Order Form in the canvas. The right panel shows "Order Form" (Element name), "Steps, fields, products, the order bump, and theme all live in one full settings workspace.", **Customize order form**, Mode: One-step, Fields: N shown. Click **Customize order form** → full-screen **Form settings** modal with a LIVE PREVIEW on the right. Left nav: **Steps · Contact fields · Products · Order bump · Checkout options · Content · Theme & style**. The modal autosaves the form; the page still needs Save + Publish.

Do every click one at a time with a short wait, and check the preview after each (batched clicks dropped changes here).

### 4.1 Steps
- Options: One-step / Two-step / Split. Choose **One-step** ("Checkout: Contact + payment on one page").

### 4.2 Contact fields
- The default form shows Full Name\*, Email\*, Phone, **Company\* (required)**, an address search, Address, Country, State, City, Zip Code. (Catalog products default to type "Physical", which is why the address block is there. No product-type selector exists.)
- Each row has: drag handle, **required marker** (red asterisk when required), width toggle (half/full), edit pencil, **visibility eye**. Plus "+ Add Field".
- Order matters: **first click Company's required marker to make it optional**, then hide it. Then click the **eye** on Phone, Company, Address, Country, State, City, Zip Code, **one at a time with a 2 s wait**.
- Result must read **"2 shown"** (Full Name + Email). Confirm on the live page that checkout never asks for a shipping address.

### 4.3 Products
- Warning: "Products added or edited here will update across all Order Forms on this funnel step". The list mirrors the step's Products tab (main + bump with the "Bump" tag).

| Toggle | Default | Set to |
|---|---|---|
| Show images | off | off |
| Show quantity | on | **off** |
| Show product description | off | off |
| Show price description | on | on |
| Enable multi-product selection | on | **off** |
| Enable coupon codes | on | **off** |

### 4.4 Order bump
- **Enable order bumps** = on → **+ Add order bump** → pick the bump product (it shows "$17 · Customer selects").
- **PRESETS** (apply to all bumps; picking one replaces the Layout and Text & color settings): Legacy, Ledger, **Hairline** (used: plain, our CSS restyles it), Accent Rail, Soft Tint, Ribbon Deal. Plus **LAYOUT** and **TEXT & COLOR** accordions (left as the preset set them).
- Click the bump card ("Rickey · The Starter Product List · $17 · Customer selects") → **CONTENT, "Editing for <product>"**:

| Field | Rickey value | Rule |
|---|---|---|
| Headline | `Yes! Add The Starter Product List` | The default is the **internal prefixed name**. Always replace it. Form: "Yes! Add [Product]". |
| OTO headline | `Only $17 today. One-time payment.` | First version was `[ONE-TIME ADD-ON] Only $17!`. Plain is better. |
| Description | `Stop guessing what to sell. Get my list of 37 products people are buying right now, so you can pick your first product tonight.` | One pain + one number + one promise. ~130 characters. Rules in section 9. |
| Custom image | (empty) | "Upload image" only, no URL field. The pane can't upload. The image is injected by the enhancer script. |
| Preselect this product | off | Never preselect. |
| Badge text | (empty) | Our banner replaces it. |

- Clearing the Description: `cmd+a` doesn't work. Click → `cmd+Down` → Backspace ×300 to 500 → Delete ×200 to 300 → `zoom` (empty) → type → `zoom`.

### 4.5 Checkout options
- Toggles left **off**: Sticky contact, Create new contact on every purchase, Validate disposable email, Postal code on payment form (NMI/Authorize.net only).
- **Terms & conditions:** off on Rickey's build; for a new client, as the person decided in Stage 1 (on = a checkbox that needs the terms URL).
- **After purchase** ("Choose where the buyer lands after a successful payment."): Go to the next funnel step / Go to a website URL / Choose a specific funnel step. Always the first one: see section 10.

### 4.6 Content
- HEADLINES: **Step headline** "Checkout" → `Contact information`. Shipping section heading: empty.
- PRODUCTS & SUMMARY, VALIDATION MESSAGES, COUPON: unchanged.
- PAYMENT & CTA: Payment block title `Payment details` (kept); **Order button text** "Complete Order" → `GET INSTANT ACCESS →`; **Order button subtext** → `One-Time Payment • Instant Access`; **Footer text** "\* 100% Secure & Safe Payments \*" → `Secure checkout powered by Stripe`. Confirm each with Tab.

### 4.7 Theme & style
- Sub-sections: PRESETS, **THEME & BRAND** (Accent, Primary text, Secondary text, Muted text, Error colours, Base font "Page content font"), FORM & SURFACE, TYPOGRAPHY, INPUTS, BUTTONS, PRODUCTS, ELEMENT.
- **Accent** = brand color (buttons, checkbox, focus). Click the swatch → picker (name field, spectrum, HEX input, opacity %, eyedropper, delete, Cancel / Save) → **Custom Colors + Add** → clear the HEX field (click → End → Backspace ×20 → `zoom`) → type `D30805` → name "Game Tape Red" → Save → Escape closes the picker. Primary text was already near-black: left as is.
- Everything else is done by our CSS (sections 6 to 8).

Close the modal (X, top right) → page **Save** → **Publish**.

## 5. The order form's DOM (as rendered on the live page)

Found by probing the live checkout with JS (element paths for "Contact information", "Full Name \*", "Select Product", "Subtotal", the bump headline, the checkboxes, and a trimmed `outerHTML` of `.c-order-form`).

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
Notes: the CTA is faded (disabled) until the form is valid; that's normal. The card field is Stripe's own iframe: don't style it. Re-probe the DOM for a new account (GHL can change class names); if a selector stops matching, the styling silently disappears.

## 6. Form CSS (contact section)

```css
.c-order-form,.c-order-form *{font-family:Lato,system-ui,sans-serif}
.c-order-form .order-form__surface{background:#fff;border:1px solid #E7E3DC!important;border-radius:16px!important;box-shadow:0 10px 30px rgba(16,16,23,.07)!important;padding:22px 20px!important}
/* numbered steps: "1 Contact information", "2 Payment details" */
.c-order-form{counter-reset:gtstep}
.c-order-form .order-form__headline,.c-order-form .order-form__pay-head{display:flex!important;align-items:center;gap:10px;font:800 19px/1.2 Poppins,sans-serif!important;color:#101017!important;margin:0 0 14px!important;letter-spacing:0}
.c-order-form .order-form__headline:before,.c-order-form .order-form__pay-head:before{counter-increment:gtstep;content:counter(gtstep);flex:none;width:28px;height:28px;border-radius:50%;background:#101017;color:#fff;font:800 14px/28px Poppins,sans-serif;text-align:center}
.c-order-form .order-form__subheadline{display:none!important}
/* inputs: clear boxes instead of a thin underline */
.c-order-form .order-form__field-grid{gap:12px 14px!important}
.c-order-form .order-form__label{display:block;font:700 14px/1.2 Lato,sans-serif!important;color:#101017!important;margin:0 0 6px!important;text-transform:none!important;letter-spacing:0!important}
.c-order-form .order-form__input{box-sizing:border-box!important;width:100%!important;height:50px!important;padding:0 14px!important;background:#FAF9F7!important;border:1.5px solid #D6D2CA!important;border-radius:10px!important;font:400 16px/1 Lato,sans-serif!important;color:#101017!important;box-shadow:none!important;outline:none!important;transition:border-color .15s,box-shadow .15s,background .15s}
.c-order-form .order-form__input::placeholder{color:#9A968F!important;opacity:1}
.c-order-form .order-form__input:hover{border-color:#B9B4AA!important}
.c-order-form .order-form__input:focus{background:#fff!important;border-color:#D30805!important;box-shadow:0 0 0 4px rgba(211,8,5,.12)!important}
.c-order-form .gt-help{display:block;font:400 12.5px/1.3 Lato,sans-serif;color:#6b6b75;margin-top:6px}
```
- 16 px input text stops iOS from zooming on focus; 50 px height gives big tap targets.
- `!important` is needed to beat GHL's own styles.
- The first version hid "Upgrade Your Order & Save!" with a script that searched text nodes. Hiding `.order-form__subheadline` in CSS is cleaner.
- Keep what the client liked: the payment block, the button and its subtext, the footer. Restyle only the contact section.

## 7. Hiding "Select Product" (and the subtotal)

```css
.c-order-form .order-form__offer{display:none!important}
.c-order-form .order-form__summary-row:not(.order-form__summary-row--total){display:none!important}
.c-order-form .order-form__summary{margin-top:14px!important;padding-top:4px!important}
.c-order-form .order-form__summary-row--total{font:800 16px/1.2 Poppins,sans-serif!important;color:#101017!important}
```
- The product radio stays **checked** while hidden (verified with JS), so the main product is still charged.
- Only for a single-product checkout. With a product choice, keep the table.
- A border scan found that only the total row has a 1 px top border; the summary's own top border was removed so there is no double divider.

## 8. Order bump design (CSS + enhancer script)

### 8.1 CSS
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
.c-order-form .order-form__bump-body{display:contents!important}
.c-order-form .order-form__bump-headline,.c-order-form .order-form__bump-oto,.c-order-form .order-form__bump-desc{text-align:left!important}
.c-order-form .order-form__bump-headline,.c-order-form .order-form__bump-oto{grid-column:3;min-width:0}
.c-order-form .order-form__bump-desc{grid-column:1/-1;margin-top:8px!important}
.c-order-form .order-form__bump-desc:after{content:"";display:block;clear:both}
.c-order-form .gt-bump-img{float:right;width:110px;height:auto;margin:2px 0 6px 12px;border-radius:8px}
.c-order-form .order-form__bump-headline{font:800 17px/1.25 Poppins,sans-serif!important;color:#101017!important;margin:0 0 4px!important;text-decoration:underline;text-decoration-color:rgba(211,8,5,.45);text-underline-offset:3px}
.c-order-form .order-form__bump-oto{font:800 13.5px/1.3 Lato,sans-serif!important;color:#D30805!important;margin:0 0 6px!important}
.c-order-form .order-form__bump-desc{font:400 14.5px/1.45 Lato,sans-serif!important;color:#2b2b33!important}
.c-order-form .order-form__bump-desc b{font-weight:900;color:#101017}
.c-order-form .order-form__bump-price{display:none!important}
@media(max-width:400px){.c-order-form .gt-bump-img{width:96px}.c-order-form .order-form__bump-headline{font-size:16px}}
@media(prefers-reduced-motion:reduce){.c-order-form .order-form__bump,.c-order-form .gt-arrow{animation:none}}
```
What each part does:
- Grid `auto auto 1fr` = arrow | checkbox | headline. `.order-form__bump-body{display:contents}` lets the headline and price line join the grid next to the checkbox, while the description spans the full width (`grid-column:1/-1`). Without it the description was squeezed into one narrow column on phones.
- GHL centered or right-aligned the text (the OTO line was right-aligned): `text-align:left!important` on all three.
- The builder's own bump price is hidden: the price is already in the OTO line.
- Checked state: solid border, light red background, static ring, no animation.

### 8.2 Enhancer script (placeholders, email helper, banner, arrow, image) with re-render protection

```html
<script>
(function(){
  var IMG='https://OWNER.github.io/REPO/images/opt/BUMP-IMAGE-320.webp';
  var ARROW='<svg viewBox="0 0 30 24" aria-hidden="true"><path d="M2 12h20M15 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function enhance(){
    var f=document.querySelector('.c-order-form'); if(!f) return;
    // clearer placeholders + a hint under email
    var n=f.querySelector('input[aria-label="Full Name"]'); if(n&&n.placeholder!=='Your full name') n.placeholder='Your full name';
    var e=f.querySelector('input[type="email"]');
    if(e){ if(e.placeholder!=='you@example.com') e.placeholder='you@example.com';
      e.setAttribute('autocomplete','email');
      var c=e.parentNode; if(c&&!c.querySelector('.gt-help')){var s=document.createElement('span');s.className='gt-help';s.textContent='Your course login is sent here.';c.appendChild(s);} }
    if(n) n.setAttribute('autocomplete','name');
    // order bump: banner, arrow, image
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
Why it is built this way:
- GHL's order form is a framework-rendered component that **re-renders** (for example when the bump is ticked), which wipes injected nodes.
- So every insertion checks "already there?" first (idempotent), and it runs three ways: once; every 250 ms for 40 tries (the form may mount after the fragment); and on every DOM change (MutationObserver) to re-add anything a re-render removed.
- It only sets placeholders and attributes on GHL inputs, never values, so GHL's validation is untouched.
- The image goes **inside** `.order-form__bump-desc` (not the body) so the text wraps around it.
- Verified: after ticking and unticking, still exactly one image and one arrow.

## 9. Bump settings, copy rules and image limits

- The bump exists in **two places** and both must be set: the step product marked **Bump Product** (Checkout step → Products), and the order form's **Order bump** entry (section 4.4).
- **The sales page never mentions the bump.** It appears only at checkout.
- Copy rules (from David's feedback):
  1. Headline = the checkbox sentence: "Yes! Add [Product]".
  2. Price line: "Only $[price] today. One-time payment." No brackets, no shouting.
  3. Description = **one pain + one number + one promise**, one or two short sentences. Count something concrete the buyer gets, and take the number from the real deliverable (Rickey: 37, counted in the PDF with `pypdf`).
  4. **One number only.** "37 hand-picked products ... 29 picks across 8 lanes ... 8 viral scroll-stoppers ... seasonal calendar" was rejected as long and confusing.
  5. No internal structure words ("lanes", "scroll-stoppers", "seasonal calendar"). The first version said "Get the product lanes", which David said made no sense.
  6. 5th-grade test: a 10-year-old can say what they get and why it helps.
  7. Length: it must fit on a phone next to the 96 to 110 px image. About 130 characters worked; about 256 was too long.
- **Image limits:** Custom image is upload-only and the pane can't upload. So the image is injected from the fragment (`starter-product-list-320.webp`, 320 px wide source shown at 110 px, 96 px under 400 px). If a person uploads one in GHL later, **remove the script injection** (two images otherwise; the bump also loses its `--img-none` class).

## 10. After purchase

**Always "Go to the next funnel step"** (it is GHL's default, per session notes 1). The step order must be Checkout → Upsell → Thank You. Never "Go to a website URL" when the funnel has an upsell step: a hard-coded thank-you URL silently skips the upsell, and the one-click charge never happens. Set it in Stage 6 even if the upsell page isn't built yet: the funnel isn't live before Stage 12, so an empty upsell step in the meantime is harmless. "Choose a specific funnel step" is only for unusual routing the person asks for.

On Nov 20 Rickey's checkout first pointed at the thank-you URL until the upsell was published. That was the mistake this rule prevents; don't copy it. The dropdown is custom: open → `Up`/`Down` as separate keys → `Return` → `zoom` to read the label (it once landed on "Choose a specific funnel step" by mistake).

## 11. Test the totals without buying

On the live checkout (any size), in `javascript_tool`:
```js
const t=()=>document.querySelector('.order-form__summary-row--total').innerText.replace(/\s+/g,' ');
const before=t(); document.querySelector('.order-form__bump-check').click(); await new Promise(r=>setTimeout(r,800));
const after=t(); const radio=document.querySelector('.order-form__prod-radio').checked;
document.querySelector('.order-form__bump-check').click(); await new Promise(r=>setTimeout(r,800));
({before,after,back:t(),mainProductStillSelected:radio,bumpImgs:document.querySelectorAll('.gt-bump-img').length,arrows:document.querySelectorAll('.gt-arrow').length})
```
Rickey's result: `{before:"Total due today $27.00", after:"Total due today $44.00", back:"Total due today $27.00", mainProductStillSelected:true, bumpImgs:1, arrows:1}`. For a new client: main price → main + bump → main, `true`, `1`, `1`.

This proves the bump math and the re-render protection. It does not charge anything and does not prove payment, delivery or the upsell: that needs the test purchase (Stage 12).

## 12. Check the phone layout

At 393×852 on the live checkout:
```js
const f=[...document.querySelectorAll('.c-order-form input')].find(i=>i.offsetParent&&i.type!=='hidden'&&i.type!=='checkbox');
({firstFieldTop:Math.round(f.getBoundingClientRect().top+scrollY), fold:innerHeight, sideways:document.documentElement.scrollWidth-innerWidth,
  selectProductVisible:!!document.querySelector('.order-form__offer')?.offsetParent})
```
Pass: `firstFieldTop` well under 852 (aim for the top half), `sideways` 0, `selectProductVisible` false. Then scroll the bump into view and screenshot it:
```js
const b=document.querySelector('.order-form__bump'); window.scrollTo(0,b.getBoundingClientRect().top+scrollY-120);
document.querySelector('.order-form__bump-desc').innerText
```
Then run `node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.partial.json` (the full `funnel.json` only from Stage 8 on, when every step exists) and check at desktop width too.

## 13. Adapting to a new client

Change: brand colors (`#D30805` red, `#101017` ink, `#FFF8E7` cream, `#FFEDEC` checked tint, `#E7E3DC` line) and fonts; all image URLs and `alt`s (logo, mockup); `IMG` and its `alt` in the enhancer; the banner text; the email helper line ("Your course login is sent here." fits a course); the pill and H1; the desktop box items, values, total and price; the phone card text; the trust line (refund period); the guarantee (verbatim from the approved copy); `document.title`; the HTML comment at the top. Add: the legal links footer (Stage 6, section C). Keep: every selector, the order of CSS rules, the idempotent enhancer pattern, the phone padding trims.

Then run the Rickey-content grep from Stage 2 (Verify) on the file: it must print nothing, or only lines the person approved.

# Stage 3 of 12: Products

**Goal:** three catalog products exist in Payments → Products (main, bump, upsell), each with one one-time price, named `<Client> · <Product>`, not listed in the online store, synced to Stripe. Their ids are in `funnel-record.md`.

**Why:** the checkout's order form, the order bump, the one-click YES button and the delivery workflows all point at these products. On Rickey's build: a Save clicked by coordinates hit the Media Storage picker instead (the layout had shifted after typing); the products came out as type "Physical" with no way to change it, which can make a checkout ask for a shipping address; and the upsell product was created late, which delayed the upsell. Create all three now, carefully, one at a time.

**Read first:** `knowledge/builder-quirks.md` (clicking by ref, layout shifts), `knowledge/glossary.md` (catalog product vs step product).

## Before you start (inputs)
- The confirmed offer map (Stage 1): internal names and prices.
- You are signed in and on the right sub-account (Stage 0).

## Steps (repeat for main, bump, upsell)
1. **Open the products list:** sidebar **Payments** → **Products**, or navigate to `https://app.gohighlevel.com/v2/location/{loc}/payments/products`. Wait 4 s.
2. **Create:** `find "Create Product"` and click the ref (top right). The URL becomes `…/payments/products/create` and the header reads "Unsaved Product" with **Discard** and **Save**.
   - Left nav: **Product Information**, **Pricing**, **Variants**, **Search Engine Listing**.
3. **Product Information:**
   - Switch **Include in Online store** OFF (it defaults to ON). These products are sold only through the funnel.
   - **Title \***: `<Client> · <Product>`, e.g. `Rickey · TikTok Shop Headstart`. This is the internal catalog name. The buyer never sees it (the buyer-facing name is set on the funnel step in Stage 4).
   - Leave Description, Enable Product Label, Product Collection, Product Tax Code, "Include tax in prices" (As per Global Settings) and Attach Tax rates as they are, unless the person asks.
4. **Pricing:** click **Pricing** in the left nav to jump there. Under **Prices**:
   - **Type** = `Onetime` (the default).
   - **Amount \*** = the price, digits only (`27`).
   - Leave Track Inventory and Add Margin unchecked. **Additional options >** only reveals **Statement Descriptor** ("Overrides default account descriptors…"); leave it empty unless the person wants a different card-statement name. Don't use **+ Add another price**.
   - There is **no product-type selector** anywhere on the create or edit page (a JS search of the page text for physical/digital/service found nothing). The product will show as "Physical". Stage 6 hides every address field so the checkout never asks for shipping.
5. **Check the values before saving** (the product page is a normal app page, so JS works):
   ```js
   [...document.querySelectorAll('input')].filter(i=>i.offsetParent&&i.type!=='checkbox'&&i.type!=='radio').map(i=>(i.placeholder||i.name)+'='+i.value)
   ```
   Expect `Enter product name=<your title>` and `Amount=<price>`.
6. **Save by ref, never by coordinates:** `find "Save"` → click the ref. If a **Media Storage** picker opens instead, close it with its X and save by ref again.
7. **Read the id** from the new URL: `…/payments/products/edit/<productId>?source=create`. The edit view now also shows **Additional Information** in the left nav, a **Product Tax Code** section, and the Stripe sync status (Rickey's products showed as synced in **test and live** mode). Write the id into `funnel-record.md`.
8. **Repeat** for the bump and the upsell. Do them one at a time, with a screenshot after each save.

## What not to touch
- Existing products (other projects' products, even if "unused").
- Later, creating a course (Stage 9) **auto-creates a Payments product** with the course name and price (type MEMBERSHIP / Service). Leave it alone. The funnel and the workflows use the catalog products you create here, not that one.

## Verify
- Back on `payments/products`, the list shows your three products with the right amounts (e.g. $27.00, $17.00, $97.00). Use `get_page_text` and compare names letter by letter, including the ` · ` separator.
- Open each product once: Include in Online store is OFF, Type Onetime, the amount is right.
- Nothing else in the list changed (compare with your Stage 0 audit).

## Rickey example values
| Catalog product | Price | Product id |
|---|---|---|
| `Rickey · TikTok Shop Headstart` | $27 one-time | `6b00b6f9ede380f78d55dff1` |
| `Rickey · The Starter Product List` | $17 one-time | `6b00b71eb426cdb2e0c81064` |
| `Rickey · My $4M TikTok Shop System` | $97 one-time | `6b00cb846b61070feb19cb0a` |

All three show type "Physical". After the course was created, the list also held the auto-created "TikTok Shop Headstart" (MEMBERSHIP, $27, Service) and the two AI Avatars products (untouched): 6 products in all.

## ★ Gates
None. (Only ask if the person's prices or names are missing from the plan.)

## Done when
- [ ] Three products created, online store off, one-time prices, names prefixed.
- [ ] Each checked with the JS dump before saving and re-opened after.
- [ ] Three product ids in `funnel-record.md`.
- [ ] No existing product touched.

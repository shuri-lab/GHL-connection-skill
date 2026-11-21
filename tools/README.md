# Tools

## `check_funnel.mjs`: check a live funnel at phone and desktop size

Loads every step of a live funnel in headless Chrome, at phone (393×852, touch, 2x) and desktop (1440×900), and reports PASS/FAIL per step and size, with optional screenshots. It never submits a form, clicks a buy button or enters card details.

### Requirements
- Node 22 or newer (uses the built-in `WebSocket`; no `npm install`).
- Google Chrome installed. Found at the usual macOS, Linux and Windows paths; otherwise set `CHROME_PATH`.

### Usage
```bash
node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.json                 # report
node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.json --out shots/    # + screenshots (1-sales-mobile.png ...)
node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.json --json          # machine-readable
node PLAYBOOK/tools/check_funnel.mjs examples/rickey-headstart-funnel/funnel.json   # the worked example
```

### Input (`funnel.json`, template in `templates/funnel.json`)
```json
{
  "name": "[Client] · [Offer]",
  "steps": [
    { "type": "sales",    "url": "https://DOMAIN/OFFER-page",      "next": "/OFFER-checkout" },
    { "type": "checkout", "url": "https://DOMAIN/OFFER-checkout",  "bump": true, "price": "$PRICE" },
    { "type": "upsell",   "url": "https://DOMAIN/OFFER-upsell",    "yes": "YES", "no": "/OFFER-thank-you" },
    { "type": "thankyou", "url": "https://DOMAIN/OFFER-thank-you" }
  ]
}
```

### What it checks

| Step | Check | Fails when |
|---|---|---|
| every step | Our HTML was injected | No `*-root` with content and little page text (loader didn't run) |
| every step | No GitHub 404 | "There isn't a GitHub Pages site here" / "404: Not Found" / "File not found" on the page |
| every step (phone) | No sideways scroll | `scrollWidth` wider than the viewport |
| sales | A button or link goes to `next` | No `href` containing the checkout path |
| checkout | Order form present | No `.c-order-form` (or form) |
| checkout (phone) | **First form field on the first screen** | First visible input's top ≥ 852 px |
| checkout | "Select product" hidden | `.order-form__offer` visible |
| checkout | Bump present (if `"bump": true`) | No `.order-form__bump` |
| checkout | Price shown (if `"price"` set) | The price text isn't on the page |
| upsell | YES button | No link or button whose text starts with `yes` |
| upsell | NO link to the thank-you step | No link whose `href` contains `no` |
| thankyou | Loads with content | (covered by the every-step checks) |

Each page gets 7 s to load (the builder page, the loader's fetch, the order form render). A cache-buster (`?chk=<time>`) is added to every URL.

### Output (real run on the Rickey example, Nov 20 2026)
```
FUNNEL CHECK  Rickey · TikTok Shop Headstart (davidhsai.com)
------------------------------------------------------------------------
PASS  sales     mobile   1 button(s) to checkout
PASS  sales     desktop  1 button(s) to checkout
PASS  checkout  mobile   form field at 313px, bump yes
PASS  checkout  desktop  form field at 134px, bump yes
PASS  upsell    mobile   YES: "YES! Add My $4M TikTok Shop System to My…", NO link ok
PASS  upsell    desktop  YES: "YES! Add My $4M TikTok Shop System to My…", NO link ok
PASS  thankyou  mobile   "You're in | TikTok Shop Headstart"
PASS  thankyou  desktop  "You're in | TikTok Shop Headstart"
------------------------------------------------------------------------
All steps pass
```
On a phone the first checkout field sits at 313 px of 852: that is the bar. The run takes about a minute (8 page loads × 7 s). Exit code 1 only if the run itself failed (Chrome didn't start, bad JSON); FAIL lines don't change the exit code, so read the report.

### What it can't check (do these by hand)
- **The YES button's action.** A native button left on "Open popup" still passes. Confirm "One click up/down sell product" + the right product with the person, then prove it in the test purchase.
- Payment, the bump charge, delivery emails, course access, the client portal login: only a test purchase proves them (Stage 12).
- The bump total math: use the JS test in `knowledge/checkout-recipe.md` §11 ($27 → $44 → $27 on Rickey's page).
- Design quality: compare its screenshots with `examples/rickey-headstart-funnel/screenshots/` and look at them yourself.
- Pages that need a timer or a click to reveal content.

## In-browser checks (copy into `javascript_tool` on the live page)

These live in the knowledge files, next to the step they belong to:
- Overflow / title / root check, and the wrapper-chain walk: `knowledge/builder-quirks.md` §8.
- Checkout totals test and the phone above-the-fold check: `knowledge/checkout-recipe.md` §11 and §12.
- Upsell overflow + YES/NO tagging check: `knowledge/upsell-recipe.md` §9.
- Reference-page study (sections and buttons): `knowledge/upsell-recipe.md` §1.
- Waiting for GitHub Pages to serve a new file: `knowledge/builder-quirks.md` §9.

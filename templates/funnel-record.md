# Funnel record: [Client] · [Offer]

> Fill in as you build (Stage 0 onward). This is how the next person finds everything. No passwords, card details or buyer personal data.

| What | Name | ID / URL | Settings that matter | Status |
|---|---|---|---|---|
| Sub-account | | location id: | same or separate | |
| Domain | | | connected by whom and when, DNS records, verified date, https date | |
| Stripe / statement name | | | whose Stripe; Statement Descriptor on the products | |
| Sender | | | From name + email, or default sender as read | |
| Client portal | | URL | name and logo buyers see | |
| GitHub repo | | repo URL, Pages base URL | public; last commit hash | |
| Funnel | [Client] · … | funnel id: | path; Optimize JavaScript off (re-checked); tracking code (ids or none) | |
| Step 1 Sales page | | step id / path / page id / builder URL | loader root id, fragment URL | published? |
| Step 2 Checkout | | step id / path / page id / builder URL | root id, fragment URL; order form products, bump, Terms checkbox, after purchase = next step; legal links | |
| Step 3 Upsell | | step id / path / page id / builder URL | root id, fragment URL; YES text; NO link → | |
| YES action | | | link to = One click up/down sell product; Products = | set by whom, date, zoom-checked? |
| Step 4 Thank you | | step id / path / page id / builder URL | root id, fragment URL, `GT_LINKS` values, Purchase event | |
| Product: main (catalog) | | product id | price, one-time, online store off, statement descriptor, tax | |
| Product: bump (catalog) | | product id | | |
| Product: upsell (catalog) | | product id | | |
| Step product: main | | internal product id | buyer-facing name, Main | |
| Step product: bump | | internal product id | buyer-facing name, Bump | |
| Step product: upsell | | internal product id | buyer-facing name | |
| Course | | product_id | modules, lessons, One Time price, paid files attached | |
| Auto-created membership product | (course name) | product id if shown | created by the course; not used by the funnel or workflows | keep or not: owner |
| Workflow: main delivery | [Client] · … delivery | workflow id | trigger + filter (zoom-checked), course, tag, email, sender | published? enrolled 0 before test? |
| Workflow: bump delivery | | | | |
| Workflow: upsell delivery | | | | |
| Buyer tags | | | tag per product | |
| Rickey-content grep (Stage 2) | | | "0 hits" or the approved lines | |
| Users invited | | | role | |

## Open items
-

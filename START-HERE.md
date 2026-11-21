# GHL FUNNEL PLAYBOOK: START HERE (instructions for Claude)

You are putting a complete sales funnel live in **GoHighLevel (GHL)** for a client's offer. A complete funnel has:
- the sales page, the checkout with an order bump, the one-click upsell and the thank-you page;
- the products and prices;
- the course in Memberships;
- the delivery workflows and emails;
- team access;
- a final test.

You do the work yourself in the browser, signed in as the person. You ask the person only for what you can't do or decide.

This playbook is how David and Claude put Rickey's "TikTok Shop Headstart" funnel live on Nov 20 2026. You can see it live: https://davidhsai.com/headstart-page → `/headstart-checkout` → `/headstart-upsell` → `/headstart-thank-you`. That is the quality bar: `examples/rickey-headstart-funnel/screenshots/`.

`PLAYBOOK` = the folder this file is in.

## Related playbook: the sales page
Use the **Sales Page Playbook** (https://github.com/shuri-lab/landing-pages-skill) to write and design the pages: copy, brand, images, phone-first layout, speed. It builds the **sales page** completely.

The other three pages (checkout left column, upsell, thank-you) also need GHL-specific blocks that only the four Rickey page files in `examples/rickey-headstart-funnel/pages/` have: the order form and bump CSS with the enhancer script, the YES/NO button tagging, the `GT_LINKS` link config, the wrapper fix. Start those three from the Rickey files (the checkout always), and take their copy and design from the Sales Page Playbook. Stage 2 has the table of what must come from where.

This playbook is self-contained for everything inside GHL.

## How to run it
- **Read `knowledge/safety-rules.md` first, every time.** It's a shared, live account connected to real money.
- **Then read `knowledge/builder-quirks.md`.** The GHL builder has traps: the editor runs in a cross-origin frame, some dropdowns can't be clicked by Claude, typing appends instead of replacing, and unsaved work is lost. Knowing them saves hours.
- **One stage at a time.** Show **"Stage 6 of 12: checkout"**. Read the stage file in full before starting it.
- **Do, then check.** After every change, open the live URL at phone (393×852) and desktop size and confirm it worked. After each page stage run `node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.partial.json` (only the steps built so far; the full `funnel.json` from Stage 8 on). Exit code 0 = all PASS.
- **Save and publish explicitly.** The builder does not autosave reliably. Save after every element you add.
- **Record everything** you create (names, IDs, URLs, settings) in `my-funnel/funnel-record.md`.
- **Ask only at the ★ gates.** Between them, work without asking.

## The stages (0 to 12)

| Stage | File | What you produce | ★ Needs the person |
|---|---|---|---|
| 0 Access | `stages/0-access-and-safety.md` | Signed-in browser; read-only inventory of the sub-account (with the triggers of Published workflows, the sender and the portal); Stripe and domain checked | ★ Sign in; confirm which sub-account (same or separate) and what's off-limits; decide on flagged workflows. If separate: the agency admin and client do the checklist, then "Sub-account ready" |
| 1 Plan | `stages/1-plan-the-funnel.md` | `my-funnel/funnel-plan.md`: steps, paths, domain, money and identity, products, prices, bump, upsell, course, emails, legal links, tracking, tax, buyer tags, names | ★ Confirm the offer map and the domain (connecting a client domain: they add the DNS records); money and identity (Stripe, statement name, sender, portal); legal links, tracking ids, tax |
| 2 Host the pages | `stages/2-host-the-pages.md` | Page fragments on GitHub Pages, each with the wrapper fix (not on the checkout's left column), absolute URLs and a unique root id; no Rickey content left; no paid files | ★ Create the GitHub repo if needed; confirm what becomes public; turn on Pages if you can't; approve any line the Rickey-content grep still finds |
| 3 Products | `stages/3-products.md` | Main, bump and upsell products with one-time prices (statement descriptor and tax as planned) | none |
| 4 Funnel | `stages/4-funnel-and-steps.md` | The funnel, its 4 steps and paths, on the chosen domain | none |
| 5 Sales page | `stages/5-sales-page-step.md` | Loader on the sales step; buttons go to checkout; live and checked | none |
| 6 Checkout | `stages/6-checkout-step.md` | Two columns (our HTML left, GHL order form right), styled form, standout order bump, form above the fold on phones, after-purchase → next step | none |
| 7 Upsell | `stages/7-upsell-step.md` | Our HTML + native YES button (one-click upsell) + NO link | ★ If Claude can't set the YES action (native dropdown), the person sets it in 4 clicks; approve placeholder offer-stack values |
| 8 Thank-you | `stages/8-thank-you-step.md` | Thank-you page with the course and channel links | ★ Links the client hasn't given yet (e.g. WhatsApp) |
| 9 Course | `stages/9-course-memberships.md` | Course with modules and lessons, its offer/product, paid files behind the login, client portal | ★ Videos, thumbnails and paid files are uploaded by the person; lesson titles that aren't in the copy |
| 10 Delivery | `stages/10-delivery-workflows.md` | Workflows: purchase → course access → buyer tag → delivery email; bump and upsell deliveries; each filter zoom-checked before Publish | ★ Approve email text; sender details (or the default sender, after you've read it) |
| 11 Team | `stages/11-team-access.md` | Teammates invited with the right role | ★ Confirm email and role; approve the text and recipients of any message to the teammate |
| 12 Test and go live | `stages/12-test-and-go-live.md` | `check_funnel.mjs` all pass; test purchase plan and result; sign-off list | ★ The test purchase (the person buys and refunds, or types Stripe's test card in a funnel-scoped test mode); refunds; go-live sign-off (TJ) |

## Always
- **Never type passwords or card numbers** (test cards included). Never delete or change things outside this funnel without an explicit yes.
- **Never open another client's page builder.** Read their live pages if you must.
- **Paid files never go on public hosting** (GitHub Pages): they go in the course or GHL Media.
- **Prefix everything you create** with the client name (`Rickey · …`).
- **The sales page never mentions the order bump.** It lives only on the checkout.
- **Every page passes the phone check:** no sideways scroll. On the checkout, the first form field shows on the first phone screen.
- **Publish only what you built.** Real customers only after the required sign-off (TJ for his projects).

## When you finish
Tell the person, in a few lines:
- the 4 live URLs;
- the `check_funnel.mjs` result;
- what's still open, such as the YES button action, links, videos, the test purchase and sign-off;
- where `funnel-record.md` is.

## Map of this repo
- `stages/`: the steps.
- `knowledge/`:
  - `safety-rules.md`, `builder-quirks.md`, `loader.md`, `connect-a-domain.md`
  - `checkout-recipe.md`, `upsell-recipe.md`, `upsell-checkout-bump-design.md`
  - `memberships-and-workflows.md`, `pitfalls.md`, `feedback-log.md`, `glossary.md`
- `templates/`: the loader snippet, the wrapper fix, the funnel plan and record, `funnel.json`. (Email copy to adapt: `examples/rickey-headstart-funnel/emails/`.)
- `tools/check_funnel.mjs`: checks a live funnel at phone and desktop size, with screenshots.
- `examples/rickey-headstart-funnel/`: the four live page files, the funnel map with every ID and setting, the emails, screenshots and the session log.
- `test/`: the test for a teammate, the rubric and the review sheet.

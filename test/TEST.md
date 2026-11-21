# Replication test: rebuild the Rickey funnel as a safe test funnel

> For the Claude agent taking the test (e.g. Moses's agent), working with its person. TJ grades it with `test/rubric.md` and `test/review-sheet.md`.

## The task in one paragraph
Using this playbook only, build a **complete copy of Rickey's TikTok Shop Headstart funnel as a separate test funnel** in the same GHL sub-account: four pages on test paths (sales page, two-column checkout with the standout order bump, one-click upsell with a native YES button and a NO link, thank-you page), test-prefixed products, a test course (or access to the existing course), three test delivery workflows, a full check with `tools/check_funnel.mjs`, screenshots, and a filled `funnel-record.md`. Nothing reaches real customers, no real money moves unless the person does it, and nothing that existed before the test is changed.

`[Name]` below is your person's first name (e.g. `Moses`); `[name]` is the same in lower case (e.g. `moses`).

## Ground rules (read before anything else)
1. Read `START-HERE.md`, then `knowledge/safety-rules.md`, then `knowledge/builder-quirks.md`. Follow the stages in order and read each stage file in full before starting it. Show "Stage N of 12: …" as you go.
2. **The person signs in. You never type a password, a card number (Stripe test cards included) or an API key**, and you never write one to a file.
3. **Create only.** Never edit, save, publish, unpublish or delete anything that existed before the test: Rickey's funnel, pages, products, course and workflows; the AI Avatars funnel and its courses and products; other workflows; the Stripe connection; domains; users; billing; account settings. You may *read* Rickey's live pages and the files in `examples/`. Selecting `davidhsai.com` in your test funnel's own Settings is allowed.
4. **Everything you create is named `TEST · [Name] · …`** (funnel, products, workflows, course).
5. **No real traffic.** Never share the test URLs outside the team, link them from anything public or use them in ads. Workflow emails must only ever reach the test buyer (your person).
6. **Money:** a test purchase is made only by the person (real card, then they refund it themselves), or in Stripe test mode **scoped to the test funnel only** with the person typing the test card. Look for that switch only where Stage 12 says (the checkout step's Products tab, the funnel Settings). If no funnel-scoped switch is there, the person uses their real card or skips the purchase. Never switch an account-wide test mode, and never open Payments → Integrations to change modes.
7. **Clean-up** (unpublish, delete, archive) happens only after the person says yes to the exact list.
8. **Be honest.** Report a check as passed only if the output says so. If you lose unsaved work or hit a wall, write it in the log.
9. **Never open another funnel's page builder** (Rickey's, AI Avatars'). Read their live pages only. You open only your own test pages' builders. The one read-only look into existing items is the Stage 0 trigger check of Published workflows (open, zoom, leave without saving).

## Test values (use exactly these)
| What | Test value | Rickey's live value (for comparison) |
|---|---|---|
| Sub-account | Hot Pursuit LLC (`54EJrjBw49eCsIsOZH44`), unless the person says otherwise | same |
| Funnel | `TEST · [Name] · Headstart` | `Rickey · TikTok Shop Headstart` |
| Domain / funnel path | `davidhsai.com` / `/test-[name]` | `davidhsai.com` / `/headstart` |
| Step paths | `/test-[name]-page`, `/test-[name]-checkout`, `/test-[name]-upsell`, `/test-[name]-thank-you` | `/headstart-page`, `-checkout`, `-upsell`, `-thank-you` |
| Catalog products | `TEST · [Name] · TikTok Shop Headstart` $27; `TEST · [Name] · The Starter Product List` $17; `TEST · [Name] · My $4M TikTok Shop System` $97 (one-time, online store off) | `Rickey · …` same prices |
| Step products (buyer-facing) | "TikTok Shop Headstart" (Main), "The Starter Product List" (Bump), "My $4M TikTok Shop System" (upsell step) | same |
| Root ids | `test-gt-root`, `test-gtc-root`, `test-gtu-root`, `test-gtty-root` | `gt-root`, `gtc-root`, `gtu-root`, `gtty-root` |
| Course | `TEST · [Name] · Headstart course`, One Time $27, 2 lessons published ("Start here: welcome + your downloads", "Day 1: How TikTok Shop works + posting your first video"); or access to the existing "TikTok Shop Headstart" course if the person chooses (a test purchase then adds the test buyer as **one extra member** of Rickey's live course: expected and allowed, logged in `log.md`, and on the clean-up list) | "TikTok Shop Headstart", 8 lessons |
| Workflows | `TEST · [Name] · Headstart delivery`, `TEST · [Name] · Starter Product List delivery`, `TEST · [Name] · System delivery` | `Rickey · Headstart delivery`, `Rickey · Starter Product List delivery` (upsell delivery never built) |
| Buyer tags | `test-[name]-headstart-buyer`, `test-[name]-starter-list-buyer`, `test-[name]-system-buyer` | none |
| Email subjects | `[TEST] You're in. Here's Day 1`, `[TEST] Your Starter Product List`, `[TEST] Your $4M TikTok Shop System` | without `[TEST]` |
| Page titles | each starts with `TEST · ` | e.g. "TikTok Shop Headstart \| Game Tape" |

**Reusing Rickey's products instead** is allowed only if the person says so at the start gate. Warn them first: a test purchase of Rickey's real products fires **Rickey's live delivery workflows** (they listen for those products), and your test workflows would then have to listen for Rickey's products too. Test products avoid both.

## Your working folder: `my-funnel/`
Create it inside the playbook folder at the start (it is git-ignored there) and run every command below from the playbook folder. Submit it at the end. It must contain:

| File | What |
|---|---|
| `funnel-plan.md` | from the template, with the test values |
| `funnel-record.md` | every name, id, URL, setting and status (template in `templates/`) |
| `funnel.json` | the checker input (below) |
| `check-result.txt` | the final `check_funnel.mjs` output |
| `shots/` | the 8 checker screenshots from the final run |
| `evidence/` | the builder and app screenshots listed in "Evidence" below |
| `inventory-before.md`, `inventory-after.md` | the Stage 0 audit at the start and at the end |
| `rickey-before.txt`, `rickey-after.txt` | the checker run on Rickey's live funnel before and after (regression proof) |
| `log.md` | each ★ question you asked (time, answer), every problem you hit and how you solved it |
| `handoff.md` | your final message to the person |
| `cleanup.md` | the list of everything you created, and what was removed with the person's yes |

`my-funnel/funnel.json`:
```json
{
  "name": "TEST · [Name] · Headstart (davidhsai.com)",
  "steps": [
    { "type": "sales",    "url": "https://davidhsai.com/test-[name]-page",      "root": "test-gt-root",   "next": "/test-[name]-checkout" },
    { "type": "checkout", "url": "https://davidhsai.com/test-[name]-checkout",  "root": "test-gtc-root",  "bump": true, "price": "$27" },
    { "type": "upsell",   "url": "https://davidhsai.com/test-[name]-upsell",    "root": "test-gtu-root",  "yes": "YES", "no": "/test-[name]-thank-you" },
    { "type": "thankyou", "url": "https://davidhsai.com/test-[name]-thank-you", "root": "test-gtty-root" }
  ]
}
```

Replace `[name]` with the lower-case name everywhere: the checker refuses to run while `[name]` is still in the file.

## How to run it, stage by stage
Follow each stage file. Only the differences are listed here.

**Stage 0: Access and safety.**
- The person signs in. Run the full audit table (with the trigger and filter of each Published workflow, read-only) and save it as `my-funnel/inventory-before.md`.
- Regression baseline: `node tools/check_funnel.mjs examples/rickey-headstart-funnel/funnel.json > my-funnel/rickey-before.txt` (read-only: it never clicks buy or submits).

**Stage 1: Plan.** Fill `funnel-plan.md` with the test values. Money and identity: the test uses the account's Stripe, no statement descriptor, the default sender (read it and write what you saw) and the existing portal; confirm that inside point 1 of the start gate. Legal links, tracking and tax: write "not used: test". Then the **★ start gate**: one message to the person, and wait for a clear yes to each point:
1. Build in Hot Pursuit LLC, on `davidhsai.com`, on the test paths above.
2. Test-prefixed products (recommended) or Rickey's products (with the warning above).
3. Where the test page files are hosted (your own public GitHub repo with Pages, or a `test-[name]/` folder in a team repo they name). Not Rickey's client repo unless they say so.
4. OK to **publish** the four test pages on the unlinked test paths and **publish** the three test workflows (they only fire for the test products).
5. A small test course, or access to the existing course.
6. How the test purchase will be made (they buy and refund, Stripe test mode scoped to this funnel with them typing the card, or no purchase). You can ask again at Stage 12.
7. Nothing is deleted at the end without their yes to the list.

**Stage 2: Host the pages.** Copy the four files from `examples/rickey-headstart-funnel/pages/` into the approved repo folder and change only:
| File | Change |
|---|---|
| `1-sales-page.html` | `#gt-root` → `#test-gt-root` (7 places); `https://davidhsai.com/headstart-checkout` → `https://davidhsai.com/test-[name]-checkout` (1 place); `document.title` → `TEST · TikTok Shop Headstart \| Game Tape` |
| `2-checkout-left.html` | `#gtc-root` → `#test-gtc-root` (1 place, in the phone padding trim); `document.title` → `TEST · Checkout \| TikTok Shop Headstart` (top of the script). No wrapper fix: this page has two columns (Stage 2, contract item 1) |
| `3-upsell.html` | `#gtu-root` → `#test-gtu-root` (8 places); title → `TEST · One-time offer \| My $4M TikTok Shop System` |
| `4-thank-you.html` | `#gtty-root` → `#test-gtty-root` (7 places); title → `TEST · You're in \| TikTok Shop Headstart`; `GT_LINKS.course` = the client portal URL from Stage 9 (the portal is per sub-account); `whatsapp` and `support` stay empty |

Keep every image and PDF URL as it is (absolute links to Rickey's public Pages host; you only read them). Check the counts with `grep -c` before and after each replacement. The Stage 2 Rickey-content grep doesn't apply here: the test keeps Rickey's content on purpose.

Also add to **each** of the four test fragments, as its first line: `<meta name="robots" content="noindex,nofollow">` (the test pages are public; if the funnel's SEO & AEO tab offers a noindex switch, turn it on too). And in `2-checkout-left.html`, add `<div class="pill">TEST, do not buy</div>` as the first child of both `.gtc-d` and `.gtc-m`. Then push, poll with a marker, and run the CORS check.

**Stage 3: Products.** The three `TEST · [Name] · …` products. Record their ids.

**Stage 4: Funnel and steps.** Funnel `TEST · [Name] · Headstart`; four steps in order; domain `davidhsai.com`; path `/test-[name]`; **Optimize JavaScript off**; the four test step paths; step products with the buyer-facing names (Main, **Bump**, upsell).

**Stages 5 to 8: the pages.** Exactly as the stage files say, with the test root ids and fragment URLs. The checkout must match Rickey's final settings (One-step, Full Name + Email only, quantity/multi/coupons off, bump preset Hairline with Headline "Yes! Add The Starter Product List", OTO "Only $17 today. One-time payment.", the one-sentence 37-products description, CTA "GET INSTANT ACCESS →" / "One-Time Payment • Instant Access" / "Secure checkout powered by Stripe", Accent `#D30805`, **After purchase = Go to the next funnel step**). The upsell: YES text "YES! Add My $4M TikTok Shop System to My Order For Only $97", element name "YES button (one-click upsell)", NO link to `https://davidhsai.com/test-[name]-thank-you`. The YES action (link to = One click up/down sell product, Products = "My $4M TikTok Shop System" of the **test** upsell step): try once, then ★ hand it to the person (Stage 7). Save after every element.

**Stage 9: Course.** As chosen at the start gate. A test course must be **One Time** (never Free). Creating it adds an auto-created Payments product with the course name: record it for clean-up.

**Stage 10: Workflows.** Three workflows, each `Order submitted` + `Global product Is <TEST product>`, each with its Add Tag action (tags above):
- Headstart delivery: Grant course access (test course, or the existing course if chosen) → Add tag → Send email `[TEST] You're in. Here's Day 1` (Rickey's body from Stage 10, with the portal link, **without** paragraph 3, the WhatsApp paragraph: its link is a placeholder).
- Starter Product List delivery: Add tag → Send email `[TEST] Your Starter Product List` (Rickey's bump email body).
- System delivery (the upsell, never built for Rickey): Add tag → Send email `[TEST] Your $4M TikTok Shop System`, two short paragraphs: thanks for adding it, and the access will be in the course portal (portal link). Grant course access only if a course for it exists.
Default sender (leave From name and From email empty; you read it in Stage 0). Show the person the three emails.
- **Before Publish, zoom each trigger card:** it must read `Global product is in 'TEST · [Name] · …'` with that workflow's test product. If it doesn't, **don't publish**: fix the filter first. Publishing a test workflow without its filter is a hard fail (H8): it would email "[TEST]" messages to Rickey's and AI Avatars' real buyers.
- After publishing, each shows **0 enrolled** until your test purchase. If a count goes up before that, set the workflow to Draft at once and tell the person.

**Stage 11: Team access.** **Don't create or invite anyone.** In `log.md`, write the exact steps you would take for a new teammate (menu path, fields, what you leave empty, the role question with its three options, the invite and the note to the teammate) and what you would do about "Error while bootstrapping the session". You may open Settings → Users read-only and take a screenshot; don't open the Add user form.

**Stage 12: Test and verify.**
1. `node tools/check_funnel.mjs my-funnel/funnel.json --out my-funnel/shots > my-funnel/check-result.txt`. It must end with **"All steps pass"**. Fix and re-run until it does.
2. Confirm the non-checker settings by eye (Stage 12 section B) and take the evidence screenshots.
3. Run the bump totals snippet on your checkout: `$27.00 → $44.00 → $27.00`, main product still selected, 1 image, 1 arrow. Paste the result in `log.md`.
4. ★ The test purchase, the way the person chose. If made: record the transactions, the three emails (arrival time, links working), the course login and the enrolment counts. Whether the bump and the one-click upsell fire "Order submitted" was never proven on Rickey's funnel: write down exactly what happened. If the person declines, write "declined by <person>, <date>" and keep the plan in `log.md`.
5. Regression proof: `node tools/check_funnel.mjs examples/rickey-headstart-funnel/funnel.json > my-funnel/rickey-after.txt`, and redo the audit as `inventory-after.md`. Apart from your `TEST · [Name] ·` items, your tags, the auto-created course product and, if the person chose the existing course, **+1 member** on "TikTok Shop Headstart" from the test buyer, the two inventories must match.
6. Write `handoff.md`: the 4 test URLs, the checker result, the YES status, the test purchase result, open items, where the record is.
7. ★ **Clean-up question:** send the person the full list from `cleanup.md` and ask: keep everything, set the workflows to Draft only, or remove items (which ones). Do only what they approve, in this order: workflows to Draft first (nothing can fire), then the funnel, then the products, then the course and its auto-created product (or, if the existing course was used, removing the test buyer's access), then the tags, then the repo folder. Record each removal in `cleanup.md`. Refunds are theirs to make.

## Evidence screenshots (`my-funnel/evidence/`)
Name them with a number and a word:
1. `01-products.png`: the products list with the three test products and amounts.
2. `02-funnel-settings.png`: domain, path, Optimize JavaScript off.
3. `03-step-paths.png`: the four Publishing tabs (or one per step).
4. `04-checkout-step-products.png`: Main + **[Bump]** badge.
5. `05-form-contact-fields.png`: "2 shown".
6. `06-form-products-toggles.png`.
7. `07-form-order-bump.png`: the bump card content (Headline, OTO, Description).
8. `08-form-after-purchase.png`: "Go to the next funnel step" (zoomed).
9. `09-yes-button-action.png`: Button Actions with "One click up/down sell product" and the product (zoomed).
10. `10-course-outline.png`: lessons published (or the person's choice noted).
11. `11-workflow-main.png`: the canvas, Published, the trigger card zoomed on its filter.
12. `12-workflow-bump.png`: same.
13. `13-workflow-upsell.png`: same.
14. `14-thank-you-links.png`: the live thank-you page with the course button active.

Optional, if a test purchase was made: transactions list, the emails received (cropped to subject and links, no personal data), numbered from `15-`.

## What "done" looks like
- [ ] `check-result.txt` ends with "All steps pass"; `shots/` has 8 images.
- [ ] Every row of `funnel-record.md` is filled (ids, URLs, settings, status) and Open items is honest.
- [ ] All evidence screenshots present.
- [ ] `rickey-after.txt` passes like `rickey-before.txt`; the inventories match apart from TEST items.
- [ ] Every ★ question is in `log.md` with the answer and time.
- [ ] `handoff.md` and `cleanup.md` written; nothing removed without a yes.

Time guide: 3 to 5 hours of agent work, with the person reachable for sign-in, the start gate, the YES action, the test purchase and the clean-up question.

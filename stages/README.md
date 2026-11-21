# Stages: index

Run them in order, one at a time. Show "Stage N of 12: <name>". Read the stage file in full before starting it. Ask the person only at the ★ gates. After every page stage, check the live URL at 393×852 and desktop width and run `node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.json`. Record every name, ID and URL in `my-funnel/funnel-record.md`.

| Stage | File | What you produce | ★ Needs the person | Knowledge to have open | Rickey reference (`examples/rickey-headstart-funnel/funnel-map.md`) |
|---|---|---|---|---|---|
| 0 Access | `0-access-and-safety.md` | Signed-in browser; read-only inventory of the sub-account (funnels, products, Stripe, workflows, courses with member counts, domains, transactions); Stripe and domain checked | ★ Sign in; confirm which sub-account and what's off-limits | `safety-rules.md`, `builder-quirks.md` §1 and S1 to S11 | §1 Account, §2 Domain |
| 1 Plan | `1-plan-the-funnel.md` | `my-funnel/funnel-plan.md`: steps, paths, products, prices, bump, upsell, course, emails, names | ★ Confirm the offer map and the domain | `templates/funnel-plan.md`, `feedback-log.md`, `pitfalls.md` 8 to 10 | the offer table in the example README |
| 2 Host the pages | `2-host-the-pages.md` | Page fragments on GitHub Pages, each with the wrapper fix (not on the checkout's left column), absolute URLs and a unique root id | ★ Create the GitHub repo if needed | `loader.md`, `templates/wrapper-fix.html` | §11 Static host |
| 3 Products | `3-products.md` | Main, bump and upsell catalog products with one-time prices, online store off | none | `pitfalls.md` 14 to 20 | §5 Products (catalog) |
| 4 Funnel | `4-funnel-and-steps.md` | The funnel, its 4 steps and paths, on the chosen domain; Optimize JavaScript off; step products attached (main + bump on Checkout, upsell on Upsell) with buyer-facing names | none | `builder-quirks.md` N2, F1 to F3, section 6 | §3 Funnel, §4 Steps, §5 Step products |
| 5 Sales page | `5-sales-page-step.md` | Loader on the sales step; buttons go to the checkout; saved, published, live and checked | none | `loader.md`, `builder-quirks.md` §3, `templates/loader.html` | §4 Sales Page row |
| 6 Checkout | `6-checkout-step.md` | Two columns (our HTML left, GHL order form right), styled form, Select Product hidden, standout order bump, form above the fold on phones, after purchase → next step | none | `checkout-recipe.md`, `upsell-checkout-bump-design.md` part E | §4 Checkout row, §6 Order form |
| 7 Upsell | `7-upsell-step.md` | Our HTML + native YES button (one-click upsell) + NO link; checkout routed to it | ★ If Claude can't set the YES action (native dropdown), the person sets it in 4 clicks | `upsell-recipe.md`, `upsell-checkout-bump-design.md` part D | §4 Upsell row, §7 Upsell settings |
| 8 Thank-you | `8-thank-you-step.md` | Thank-you page with the course and channel links (config object; empty = placeholder state) | ★ Links the client hasn't given yet (e.g. WhatsApp) | `loader.md`, `memberships-and-workflows.md` A6 | §4 Thank You row, §11 `GT_LINKS` |
| 9 Course | `9-course-memberships.md` | Course with modules and lessons (One Time pricing, not Free), client portal URL | ★ Videos and thumbnails are uploaded by the person | `memberships-and-workflows.md` part A | §8 Course |
| 10 Delivery | `10-delivery-workflows.md` | Workflows: purchase → course access → delivery email; bump and upsell deliveries | ★ Approve email text; sender details | `memberships-and-workflows.md` parts B to E | §9 Workflows |
| 11 Team | `11-team-access.md` | Teammates invited with the right role; follow-up email sent after approval | ★ Confirm email and role | `safety-rules.md`, `pitfalls.md` 71 to 77 | §10 Users |
| 12 Test and go live | `12-test-and-go-live.md` | `check_funnel.mjs` all pass; totals test; test purchase plan and result; sign-off list | ★ The test purchase (person or Stripe test mode); go-live sign-off (TJ) | `checkout-recipe.md` §11 and §12, `pitfalls.md` 78 to 82, `tools/README.md` | §13 Open items |

Stage files are written to be followed literally. If a stage file and a knowledge file disagree, the knowledge file holds the detail and the stage file the order of work; tell the person about the mismatch.

## Finish line

When Stage 12 is done, tell the person in a few lines: the 4 live URLs, the `check_funnel.mjs` result, what's still open (YES action, links, videos, the test purchase, sign-off), and where `funnel-record.md` is.

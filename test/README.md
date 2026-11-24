# The replication test

**What it proves:** that a teammate's Claude agent that wasn't there on Nov 20 can follow this playbook and rebuild the whole Rickey funnel (pages, products, checkout with the order bump, one-click upsell, thank-you, course access, delivery workflows, checks and record) to the same quality, **without touching anything live**.

**Who:** the tester is a teammate (a person) and their Claude agent; first: Moses, the copywriter, and his agent. The grader is TJ.

## How it stays safe
- It builds a **separate** funnel, `TEST · [Name] · Headstart`, in the same sub-account, on test paths (`/test-[name]-page` …) that are never shared or advertised.
- It uses **test-prefixed products** (`TEST · [Name] · …`), three test courses (or access to the existing course, if the person prefers: the test buyer then shows as one extra member, which is expected) and test workflows that only fire for the test products, each published only after its product filter was zoom-checked.
- It reuses Rickey's four page files from `examples/rickey-headstart-funnel/pages/`, with their own root ids and links, hosted where the person approves.
- The person signs in; Claude never types passwords or card numbers. A test purchase is made only by the person: with their own card (refunded by them), or in the test funnel's own Payment mode (switched back to Live after), with the person typing Stripe's test card.
- The test pages are marked noindex and the test checkout says "TEST, do not buy".
- Nothing that existed before is changed. Before/after inventories and a before/after check of Rickey's live funnel prove it.
- Clean-up happens only after the person says yes to the list.

## Files
| File | For | What |
|---|---|---|
| `TEST.md` | the tester's agent | The brief: rules, exact test values, stage-by-stage differences, evidence to collect, the start gate, clean-up |
| `rubric.md` | TJ | 100 points (35 automatic, 65 judged), pass at 85, hard fails |
| `review-sheet.md` | TJ | The sheet to fill while grading: commands to run, where to look, scores, decision |
| `README.md` | everyone | This page |

## How to start the test (the tester's person)
1. Get the playbook folder onto your computer and open a Claude Code session in it, with the browser your agent will use (the Claude desktop app's built-in browser, or Claude in Chrome).
2. Have Node 22+ and Google Chrome installed (the checker needs both).
3. Be reachable for: signing in to GHL, the start-gate questions, setting the upsell YES button (about 30 s, if your agent can't), the test purchase (optional), and the clean-up question.
4. Paste this to your agent:
   > Read `START-HERE.md` and `test/TEST.md` in this folder, then run the replication test. My name for the test is `[Name]`. Ask me at every ★ gate, and don't create anything in GHL until I've answered the start gate.
5. When it finishes, send TJ your `my-funnel/` folder (privately; it holds account ids) and the agent's `handoff.md`.

## How TJ grades
1. Run the two commands at the top of `review-sheet.md` (the test funnel, then Rickey's live funnel as a regression check).
2. Check the hard fails first. Any one = FAIL.
3. Score sections A to E with `rubric.md`, looking at the live account read-only and the tester's `evidence/` screenshots.
4. Decide: PASS (≥ 85, own check run "All steps pass", no hard fail), REDO (named stages), or FAIL.
5. Tell the tester's person what to do with the test funnel (keep, workflows to Draft, or remove the `cleanup.md` list).
6. Copy anything new the test taught (a quirk, a label that changed, whether a one-click upsell fires "Order submitted") into `knowledge/feedback-log.md`.

## Time
About 3 to 5 hours of agent work, plus 30 to 45 minutes for TJ's review.

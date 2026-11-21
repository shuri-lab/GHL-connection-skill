# Templates

Copy these into the client's working folder (`my-funnel/`, which git ignores) or into the client's page repo, then fill them in. `[Brackets]` and UPPERCASE words are placeholders.

| File | Use it in | What to do with it |
|---|---|---|
| `funnel-plan.md` | Stage 1 | Copy to `my-funnel/funnel-plan.md`. Fill in the account facts, the domain decision, money and identity (Stripe, statement name, sender, portal), the offer map (main, bump, upsell, names, prices, delivery, buyer tags), the copy decisions, legal links, tracking and tax, the steps and paths, the course, the deliveries, the team. Get the person's OK at the ★ gate before building. |
| `funnel-record.md` | Stage 0 onward | Copy to `my-funnel/funnel-record.md`. Add every name, ID, URL and setting the moment you create it. The filled-in Rickey version is `examples/rickey-headstart-funnel/funnel-map.md`. |
| `funnel.json` | Stages 5 to 8 and 12 | Copy to `my-funnel/funnel.json`. Replace every `REPLACE-ME.invalid` URL with the four live URLs, and set the checkout path as `next`, the main price as shown in the order form, the YES text start, the thank-you path as `no`, and each page's `root` id. Input for `tools/check_funnel.mjs`, which refuses to run while a `REPLACE-ME` placeholder is left. Until Stage 8, copy it to `my-funnel/funnel.partial.json` and keep only the steps you have built. |
| `loader.html` | Stages 5 to 8 | The one-line snippet you **type** into each page's Custom Code element (paste doesn't reach the browser pane). Replace `ROOTID` (both places, unique per page) and the fragment URL. Type only the last line, in one `type` action; `zoom` to check before Save. This is the guarded version (it never injects a 404 page). |
| `wrapper-fix.html` | Stage 2 | The first lines of every fragment (same `ROOTID` as its loader), plus `document.title`. **Do not** add it to the checkout's left column: it would push the order form under it. |

Delivery email templates (main product, bump, upsell as a course, calls or a community) are copy-ready in `knowledge/memberships-and-workflows.md` section C. The thank-you page and email copy from the Rickey build is in `examples/rickey-headstart-funnel/emails/`.

Page templates: start from the four Rickey fragments in `examples/rickey-headstart-funnel/pages/` (sales page, checkout left column with the form and bump styling, upsell with the button styling, thank-you with the links config), or build new pages with the Sales Page Playbook. The checkout, upsell and thank-you pages always keep their GHL-specific blocks from the Rickey files (table in Stage 2).

Naming reminder: every internal object starts with the client prefix and a middle dot (`Rickey · ...`); buyer-facing names (step product names, course title, bump headline) have no prefix.

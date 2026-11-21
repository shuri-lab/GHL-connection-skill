# Templates

Copy these into the client's working folder (`my-funnel/`, which git ignores) or into the client's page repo, then fill them in. `[Brackets]` and UPPERCASE words are placeholders.

| File | Use it in | What to do with it |
|---|---|---|
| `funnel-plan.md` | Stage 1 | Copy to `my-funnel/funnel-plan.md`. Fill in the account facts, the offer map (main, bump, upsell, names, prices, delivery), the steps and paths, the course, the deliveries, the team. Get the person's OK at the ★ gate before building. |
| `funnel-record.md` | Stage 0 onward | Copy to `my-funnel/funnel-record.md`. Add every name, ID, URL and setting the moment you create it. The filled-in Rickey version is `examples/rickey-headstart-funnel/funnel-map.md`. |
| `funnel.json` | Stages 5 to 8 and 12 | Copy to `my-funnel/funnel.json`. Put in the four live URLs, the checkout path as `next`, the main price, the YES text start and the thank-you path as `no`. Input for `tools/check_funnel.mjs`. |
| `loader.html` | Stages 5 to 8 | The snippet you type into each page's Custom Code element. Replace `ROOTID` (unique per page) and the fragment URL. Type it as one line; `zoom` to check before Save. This is the guarded version (it never injects a 404 page). |
| `wrapper-fix.html` | Stage 2 | The first lines of every fragment (same `ROOTID` as its loader), plus `document.title`. **Do not** add it to the checkout's left column: it would push the order form under it. |

Delivery email templates (main product, bump, upsell) are copy-ready in `knowledge/memberships-and-workflows.md` section C. The thank-you page and email copy from the Rickey build is in `examples/rickey-headstart-funnel/emails/`.

Page templates: start from the four Rickey fragments in `examples/rickey-headstart-funnel/pages/` (sales page, checkout left column with the form and bump styling, upsell with the button styling, thank-you with the links config), or build new pages with the Sales Page Playbook.

Naming reminder: every internal object starts with the client prefix and a middle dot (`Rickey · ...`); buyer-facing names (step product names, course title, bump headline) have no prefix.

# Knowledge files

Reference material the stage files point to. Read `safety-rules.md` and `builder-quirks.md` before you touch GHL; read the others when their stage comes up.

| File | What it covers | Read it |
|---|---|---|
| `safety-rules.md` | Sign-in, what you may touch (never another client's builder), money and identity, paid files, naming, publishing, emails, invites, records. Not optional. | **Every time, first** (Stage 0) |
| `connect-a-domain.md` | Connecting the client's own domain: who does what, the DNS records the person adds at the registrar, polling with `dig`, verify, SSL, selecting it in the funnel. | Stage 1 (option 3), Stage 0 (separate sub-account), Stage 4 step 9 |
| `builder-quirks.md` | What your browser tools can and can't reach (app shell vs. the cross-origin builder iframe vs. the email editor); every UI quirk with its exact workaround: never open the iframe URL, empty pages need a section, Quick Add, select-all failing, typing in chunks, native vs. custom dropdowns, Autosave off and the yellow dot, code modal Save vs. page Save, Optimize JavaScript, batched clicks, preview vs. live, caching, Remote Control. | **Before Stage 0** (right after `safety-rules.md`), and whenever something in GHL won't respond |
| `loader.md` | How our HTML gets into GHL: the loader snippet, the fragment contract, the wrapper-padding fix, the deploy-and-verify loop, limits. | Stages 2, 5 to 8 |
| `checkout-recipe.md` | The complete checkout: two columns in GHL, the left column (desktop + compact phone card), order form settings section by section, the order form DOM, the form CSS, hiding Select Product, the required Company field, the bump CSS and enhancer script, bump settings and image limits, after purchase, the $27 → $44 → $27 total test, the phone check. | Stage 6 |
| `upsell-recipe.md` | The one-click upsell: reference study method, structure and copy patterns, HTML vs. native, products, the build order (save after every step), styling the native YES button by text, the NO link, the YES action and its proof, after-purchase routing, mobile fixes. | Stage 7 |
| `upsell-checkout-bump-design.md` | The design spec for the upsell page, the checkout's left column and the bump: every section, size, color and line of copy, plus the bump copy rules. | Stages 6 and 7 (design detail) |
| `memberships-and-workflows.md` | The course (One Time pricing, the extra product it creates, modules and lessons, client portal URL), the delivery workflows (Order submitted + product filter, Grant course access, the email builder technique, sender rules), the bump and upsell deliveries, and copy-ready email templates. | Stages 9 and 10 (and the thank-you link in 8) |
| `pitfalls.md` | 104 numbered problems and fixes, grouped by area (87 to 91 after the first review, 92 to 104 from finishing and testing). Cite them by number. | Skim before you start; search when stuck |
| `feedback-log.md` | David's feedback during the build, in his words → the general rule → how it was implemented. Shows what the person will ask for, so you can deliver it first. | Stage 1 and before showing any page |
| `glossary.md` | GHL terms (agency, sub-account, funnel, step, page, order form, bump, one-click upsell, products, Memberships, workflows, Custom Code, publish) and this playbook's own terms, in plain words. | Whenever a word is unclear |

Related outside this folder:
- `examples/rickey-headstart-funnel/funnel-map.md`: every object and ID of the worked example.
- `examples/rickey-headstart-funnel/session-notes/`: the full build log.
- The Sales Page Playbook (https://github.com/shuri-lab/landing-pages-skill): writing and designing the pages themselves.

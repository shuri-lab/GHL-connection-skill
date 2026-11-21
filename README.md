# GHL Funnel Playbook

**Put a complete sales funnel live in GoHighLevel with Claude, for any offer, the way we did for Rickey's TikTok Shop Headstart.**

On Nov 20 2026, David and Claude took Rickey's finished sales page and built the whole funnel around it in GoHighLevel (GHL) in one day:
- a sales page (our own HTML inside GHL);
- a two-column checkout with a standout $17 order bump and the form on the first phone screen;
- a $97 one-click upsell page;
- a thank-you page;
- the course in Memberships;
- delivery workflows with emails;
- team access.

This repo packages every step, setting, workaround and piece of feedback, so any teammate's Claude agent (Moses's agent first; Moses is the copywriter, a person) can do it for the next client without David.

**Keep this repo private.** `examples/` holds the Rickey account's real ids (location, funnel, step, page and workflow ids, the portal URL).

| Step | Live (Rickey) | Phone screenshot |
|---|---|---|
| Sales page | https://davidhsai.com/headstart-page | `examples/rickey-headstart-funnel/screenshots/1-sales-mobile.png` |
| Checkout + order bump | https://davidhsai.com/headstart-checkout | `…/2-checkout-mobile.png` |
| One-click upsell ($97) | https://davidhsai.com/headstart-upsell | `…/3-upsell-mobile.png` |
| Thank you | https://davidhsai.com/headstart-thank-you | `…/4-thankyou-mobile.png` |

`tools/check_funnel.mjs` passes on all 4 steps, at phone and desktop size.

## How to start (2 minutes)
1. **Get this repo:** clone https://github.com/shuri-lab/GHL-connection-skill (or unzip it). The folder is named `GHL-connection-skill` when cloned; it may be `ghl-funnel-playbook` when unzipped or renamed. Both are the same playbook.
2. **Have the pages ready.** Build the sales page with the **Sales Page Playbook** (https://github.com/shuri-lab/landing-pages-skill). Start the checkout, upsell and thank-you pages from the four Rickey files in `examples/rickey-headstart-funnel/pages/`: they carry the GHL-specific parts (table in `stages/2-host-the-pages.md`).
3. **Open Claude Code.** The desktop app is best, because its built-in browser is what drives GHL. Then say:
   > Read `<path to this folder>/START-HERE.md` and start. The offer is [X]; the pages are at [URL or folder].

   Or install the skill: copy `.claude/skills/ghl-funnel-playbook/` into `~/.claude/skills/`.
4. **Sign in to GHL yourself** in Claude's browser when it asks. Claude never types passwords.

## The stages (0 to 12)

| # | Stage | What Claude does | What you do |
|---|---|---|---|
| 0 | Access and safety | Checks the sub-account, what's already there and off-limits, other clients' live workflows, Stripe, sender, portal, domain | Sign in; say what's off-limits; same or separate sub-account |
| 1 | Plan | Writes the funnel plan: steps, paths, domain, whose Stripe/sender/portal, products, bump, upsell, course, emails, legal links, tracking, tax | Confirm it; add DNS records if connecting your domain |
| 2 | Host the pages | Puts each page on GitHub Pages in the format GHL needs | Create the repo if needed |
| 3 | Products | Main, bump and upsell products with one-time prices | none |
| 4 | Funnel | The funnel, its 4 steps and paths on your domain | none |
| 5 | Sales page | A custom-code "loader" pulls our HTML into GHL; buttons go to checkout | none |
| 6 | Checkout | Two columns: our content left, GHL order form right. Styled form, a bump that pops, form above the fold on phones | none |
| 7 | Upsell | Our HTML + the native YES button (one-click upsell) + a NO link | Set the YES button's action if Claude can't (4 clicks) |
| 8 | Thank you | Course and channel links | Give the missing links |
| 9 | Course | Memberships course, lessons, offer, client portal | Upload videos |
| 10 | Delivery | Workflows: purchase → access → email; bump and upsell deliveries | Approve emails, sender |
| 11 | Team | Invite teammates with the right role | Confirm email and role |
| 12 | Test and go live | Funnel check at phone and desktop size, test plan, sign-off list | Test purchase (you type the card); refunds; sign-off (TJ) |

## What's inside

| Folder | What |
|---|---|
| [`START-HERE.md`](START-HERE.md) | The instructions Claude follows |
| [`stages/`](stages/) | One file per stage: exact GHL menus, settings, what works, how to verify |
| [`knowledge/safety-rules.md`](knowledge/safety-rules.md) | **Read first.** Shared live account, real money: what Claude may and may not touch |
| [`knowledge/builder-quirks.md`](knowledge/builder-quirks.md) | The GHL builder's traps and the workarounds that worked |
| [`knowledge/loader.md`](knowledge/loader.md) | How our HTML gets into GHL (custom code + GitHub Pages) |
| [`knowledge/checkout-recipe.md`](knowledge/checkout-recipe.md) · [`upsell-recipe.md`](knowledge/upsell-recipe.md) | The checkout and upsell, with all the CSS and scripts |
| [`knowledge/memberships-and-workflows.md`](knowledge/memberships-and-workflows.md) | Course and delivery |
| [`knowledge/pitfalls.md`](knowledge/pitfalls.md) · [`feedback-log.md`](knowledge/feedback-log.md) · [`glossary.md`](knowledge/glossary.md) | What went wrong, what David asked for, GHL terms |
| [`templates/`](templates/) | Loader snippet, wrapper fix, funnel plan, funnel record, `funnel.json` |
| [`tools/check_funnel.mjs`](tools/check_funnel.mjs) | Checks a live funnel step by step at phone and desktop size, with screenshots (never buys anything) |
| [`examples/rickey-headstart-funnel/`](examples/rickey-headstart-funnel/) | The four live page files, the funnel map (every name, ID, setting), emails, screenshots, the session notes |
| [`test/`](test/) | The test for a teammate's agent (Moses's first): build a test copy of the funnel safely, graded by TJ |

## Related
- **Sales Page Playbook** (build the pages first): https://github.com/shuri-lab/landing-pages-skill
- This playbook is self-contained for everything inside GHL.

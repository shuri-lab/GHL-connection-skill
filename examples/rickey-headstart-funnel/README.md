# Worked example: Rickey's "TikTok Shop Headstart" funnel

The funnel David and Claude put live in GoHighLevel on Nov 20 2026 and finished on Nov 23 (delivery, YES button, tests on contacts). Use it as the quality bar and as a starting point you adapt for a new client.

## The offer

| Piece | Name (buyer sees) | Price | Delivered by |
|---|---|---|---|
| Main product | TikTok Shop Headstart (7-day course + 30-Day First Sale Challenge PDF + Rickey Army WhatsApp channel) | $27 one-time | Course access in Memberships + delivery email |
| Order bump (checkout only) | The Starter Product List (37 products) | $17 one-time | Its own one-lesson course + its own email, only to bump buyers |
| One-click upsell | My $4M TikTok Shop System (course + 3 guides) | $97 one-time | Its own course (8 lessons + 3 PDFs) + its own email |

Brand: Game Tape. Red `#D30805`, ink `#101017`, cream `#FFF8E7`; Poppins, Lato, Caveat.

## Live URLs

1. Sales page: https://davidhsai.com/headstart-page (also https://davidhsai.com/headstart)
2. Checkout: https://davidhsai.com/headstart-checkout
3. Upsell: https://davidhsai.com/headstart-upsell
4. Thank you: https://davidhsai.com/headstart-thank-you
5. Course login (client portal): https://54ejrjbw49ecsisozh44.app.clientclub.net/

In GHL: Sites → Funnels → "Rickey · TikTok Shop Headstart" → a step → Edit.

## What's in this folder

| Path | What it is |
|---|---|
| `funnel-map.md` | **Every object created**: sub-account, domain, funnel, step and page ids, paths, products and prices, order form settings, course, client portal, workflows, users, hosted files, and the open items. Read this to see what "complete" looks like. |
| `funnel.json` | Input for `tools/check_funnel.mjs` (the four live URLs, the checkout path, the $27 price, the YES text and the NO path). |
| `pages/1-sales-page.html` | Sales page fragment (root `gt-root`). Built with the Sales Page Playbook, then made GHL-ready: wrapper fix, `document.title`, absolute image URLs, checkout link. |
| `pages/2-checkout-left.html` | Checkout left column (root `gtc-root`, scope `#gtc`): desktop block + phone card with its "See everything included" toggle (v1.1, Nov 24), **plus the CSS that restyles GHL's order form and bump, and the enhancer script**. No wrapper fix (on purpose: see `knowledge/checkout-recipe.md`). |
| `pages/3-upsell.html` | Upsell page (root `gtu-root`, scope `#gtu`): alert bar to lead-in, **plus the script and CSS that style the native YES button and the NO link** by their text. |
| `pages/4-thank-you.html` | Thank-you page (root `gtty-root`, scope `#gty`) with the `GT_LINKS` config (course, WhatsApp, support; empty = greyed placeholder). |
| `emails/moses-thank-you-and-delivery-copy-v1.md` | The copywriter's thank-you page and delivery email copy (Moses, the copywriter, a person). History: the live emails replaced it. |
| `emails/published-emails.md` | **The three emails as published** on Nov 23. Use these, not the v1 copy |
| `screenshots/` | The live pages at phone and desktop size (`1-sales-*`, `2-checkout-*`, `3-upsell-*`, `4-thankyou-*`). |
| `session-notes/` | The detailed build log, in three parts: (1) setup, products, funnel, sales page, checkout start; (2) checkout finish, bump, thank-you, course, workflows, upsell; (3) upsell button, bump copy, Remote Control, team access. Use it when a stage file or knowledge file isn't enough. |

All page files fetch images from `https://shuri-lab.github.io/rickey-tiktokshop-project/`. For a new client, change every URL to the client's host, then run the Rickey-content grep in `stages/2-host-the-pages.md` (Verify). This folder holds the account's real ids: keep the repo private.

## How to use it for a new client

1. Read `funnel-map.md` once, top to bottom: it is the target state.
2. Make the client's pages with the Sales Page Playbook (Part 1 and Part 2). These four files are the reference and the fallback.
3. Follow `stages/` in order. Record your own IDs in `my-funnel/funnel-record.md` (template in `templates/`).
4. Compare your live pages with `screenshots/` at the same sizes.
5. Run `node tools/check_funnel.mjs my-funnel/funnel.json` and compare with this example: `node tools/check_funnel.mjs examples/rickey-headstart-funnel/funnel.json`.

## Known differences between this example and the recommended build

- The sales page and checkout loaders are the first, **unguarded** version (no `r.ok` check). The playbook's template is guarded. Use the template.
- The upsell's YES action was wrong until Nov 23 (default "Open popup"). It's set and proven now.
- **No test order yet** (Nov 24). Delivery is proven on test contacts only.
- The NO decline is a Custom Code link, not a native button (reason in `knowledge/upsell-recipe.md` section 6).
- The first build put paid files on public hosting. They're in the courses now. Never repeat it.
- No legal links, tracking, tax decision, buyer tags or statement descriptor. A new build decides these in Stage 1.
- The After purchase setting was a thank-you URL until the upsell existed. The recommended build sets "Go to the next funnel step" from the start.
- `pages/2-checkout-left.html` now sets `document.title`; the live fragment did not.

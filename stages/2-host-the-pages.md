# Stage 2 of 12: Host the pages

**Goal:** the four page fragments (sales page, checkout left column, upsell, thank-you) are live on GitHub Pages, each one following the fragment contract: wrapper fix (where it applies), absolute URLs, a unique root id, a tab title, no `<html>/<head>/<body>`. Each URL returns the new content and sends `access-control-allow-origin: *`.

**Why:** GHL's builder cannot take a 116 KB page. Clipboard paste does not reach the browser pane (`pbcopy` + `cmd+v` did nothing), and typing that much is slow and error-prone. So on Rickey's funnel each GHL page holds a ~500-character **loader** (Stage 5) that fetches its fragment from GitHub Pages. That only works if the fragment is hosted correctly. On Nov 20: the checkout once showed GitHub's 404 page because the new file wasn't deployed yet; the thank-you page had a 20 px white strip because the wrapper fix missed GHL's `div` sections; and a push was rejected because GitHub had added its own commits.

**Read first:** `knowledge/loader.md` (the loader, the fragment contract, the wrapper fix, the deploy loop), `knowledge/pitfalls.md`.

## Building the pages themselves
Write and design the pages with the **Sales Page Playbook**: https://github.com/shuri-lab/landing-pages-skill (copy, brand, images, phone-first layout, speed). Its `stages/9-share.md` covers the repo, GitHub Pages and the loader in more depth. This stage is self-contained for what GHL needs. For a quick start, adapt the four Rickey files in `examples/rickey-headstart-funnel/pages/` (their structure, CSS and scripts are proven live).

| Rickey file in this playbook | Hosted as | Root id | Scope id |
|---|---|---|---|
| `pages/1-sales-page.html` | `offer-1-sales-page/ghl-sales-page.html` | `gt-root` | `#page` (kit layout) |
| `pages/2-checkout-left.html` | `offer-1-sales-page/ghl-checkout-left.html` | `gtc-root` | `#gtc` |
| `pages/3-upsell.html` | `offer-2-upsell/ghl-upsell.html` | `gtu-root` | `#gtu` |
| `pages/4-thank-you.html` | `offer-1-sales-page/ghl-thank-you.html` | `gtty-root` | `#gty` |

## Before you start (inputs)
- The confirmed plan (Stage 1): slug, domain, paths, root ids.
- The page sources: a builder-ready `paste-ready.html` from the Sales Page Playbook, or the Rickey files to adapt.
- A public GitHub repo with push access (★ below).
- Deliverable PDFs (they get clean URLs under `downloads/`).

## The fragment contract (every file)
1. **Wrapper fix first**, using the page's own root id (`templates/wrapper-fix.html`):
   ```html
   <style>
   section:has(#ROOTID),[class*="section-"]:has(#ROOTID),.c-row:has(#ROOTID),.c-column:has(#ROOTID),.inner:has(#ROOTID),.c-custom-code:has(#ROOTID),.custom-code-container:has(#ROOTID){padding:0!important;margin:0!important;max-width:none!important;width:100%!important}
   </style>
   ```
   GHL wraps a code element in a section (a `div` with a `section-XXXX` class, not a `<section>` tag), a row (`p:10px 5px`), a column (`p:10px 5px`) and an inner box capped at `max-width:1170px`. The builder's own section settings don't remove the row and column padding or the cap. Keep `[class*="section-"]` in the list: without it the thank-you page kept a 20 px white strip.
   - **Exception, the checkout left column:** the checkout page has two columns (our HTML left, GHL's order form right). Do **not** add the full wrapper fix there: `width:100%` on `.c-column:has(#gtc-root)` would push the order form under the left column on desktop. The Rickey checkout file has no wrapper fix; it only trims padding on phones (Stage 6).
2. **Fonts:** `<link rel="preconnect">` and the Google Fonts `<link>`. They work when injected into the body.
3. **CSS scoped** under a unique container id (`#gtc`, `#gtu`, `#gty`), with `!important` only where builder styles must be overridden. Exception on purpose: rules that style GHL's own elements (the order form, the native YES button) must be global.
4. **Absolute URLs** for every image, `srcset` entry, CSS `url()` and PDF link, pointing at the Pages host. A relative `images/x.webp` resolves against the funnel domain and breaks.
5. **Inline scripts only**, idempotent, tolerant of late DOM (a retry interval and/or a `MutationObserver`). The loader re-creates each `<script>` so it runs.
6. **`document.title='…'`** in a script. GHL left the page title empty. (The Rickey checkout file is missing this; add it when you adapt it.)
7. **Config at the top** for anything the client fills in later, e.g. `var GT_LINKS={course:'',whatsapp:'',support:''}`. Empty = a greyed button and a "coming to your email" note.
8. **No `<html>`, `<head>` or `<body>`.**
9. **Root id** unique per page and ending in `-root`. The id itself lives in the loader (`<div id="gt-root">`), the fragment only references it in its CSS.

## Steps
1. ★ **Repo.** Ask the person to create an **empty public** GitHub repo (no README, so the first push isn't rejected) and send its URL, or to approve a folder in an existing team repo. Free GitHub plans need the repo public for Pages. Before the first public push, list what becomes public and get a yes (client research, transcripts, photos with unclear licences).
2. **Check push access** before relying on it: `git --version`, `git config --global credential.helper`, `ls ~/.ssh`, `ssh -o BatchMode=yes -o ConnectTimeout=8 -T git@github.com`. If SSH says "Permission denied (publickey)", test HTTPS with the keychain without prompts: `GIT_TERMINAL_PROMPT=0 git push -q https://github.com/<owner>/<repo>.git main`, then `git remote set-url origin https://github.com/<owner>/<repo>.git`. Commit identity: `<owner>@users.noreply.github.com`, never a personal email.
3. **Lay out the repo:**
   ```
   <repo>/
     index.html              # optional: the plain sales page preview
     images/  images/opt/    # originals and <name>-<width>.webp variants
     downloads/              # deliverable PDFs with clean names, e.g. 30-day-first-sale-challenge.pdf
     offer-1-sales-page/ghl-sales-page.html  ghl-checkout-left.html  ghl-thank-you.html
     offer-2-upsell/ghl-upsell.html
   ```
4. **Make the sales fragment** from `paste-ready.html` with a small script (`python3 -I`):
   - rewrite `src="images/` and `url(images/` (and `srcset` entries) to `https://<owner>.github.io/<repo>/images/`; print the number of replacements (Rickey: 65);
   - replace the checkout placeholder `PASTE-YOUR-CHECKOUT-LINK` with `https://<domain>/<slug>-checkout`;
   - prepend the wrapper fix with the sales root id, and `<script>document.title='<Offer> | <Brand>';</script>`;
   - check: `grep -c 'src="images/' file` → 0, `grep -c 'PASTE-YOUR' file` → 0, and the bump product name → 0 matches (the sales page never mentions the bump).
5. **Make the other three fragments** from the Rickey files: change texts, prices, image URLs, the bump image constant (`IMG=` in the checkout script), the `GT_LINKS` config, the title, and the root id in the wrapper-fix CSS. Keep the structure and class names: the checkout CSS and the upsell button tagging depend on GHL's class names (`.c-order-form`, `.order-form__bump`, `.c-button`).
6. **Speed** (Rickey went from ~15 MB to ~1.2 MB of images on a phone): every image as WebP at display size with `srcset`/`sizes`, `decoding="async"`, `loading="lazy"` except the hero, `fetchpriority="high"` on the hero. Videos through a CDN transform (Rickey: Cloudinary `w_320,q_auto:eco,ac_none,du_10,f_auto`), loaded when scrolled into view.
7. **Secret scan before pushing:** `grep -rIl -E 'sk_(live|test)_|pk_(live|test)_|AKIA[0-9A-Z]{16}|ghp_|xox[bp]-|BEGIN [A-Z ]*PRIVATE KEY|password' .` must return nothing. No files over 50 MB (`find . -size +50M`).
8. **Commit and push.** If the push is rejected because GitHub added commits (Pages setup creates "Create CNAME" / "Delete CNAME"): `git fetch`, inspect with `git log HEAD..origin/main`, then `git pull --rebase` and push again.
9. ★ **Turn on Pages** (the person, or you if they are signed in to GitHub in the browser): repo → Settings → Pages → Branch `main`, folder `/ (root)` → Save. The site is `https://<owner>.github.io/<repo>/`.
10. **Deploy and poll.** A fixed wait is not enough (one check after `sleep 45` still saw the old file) and a chained `sleep 60` is blocked by the harness. Poll for a marker string from your change, with a cache-buster:
    ```bash
    for i in $(seq 1 18); do curl -s "<fragment URL>?r=$i" | grep -q '<marker>' && { echo "live after ~$((i*10))s"; break; }; sleep 10; done
    ```
    For a brand-new file, poll the status code first: `for i in $(seq 1 30); do c=$(curl -s -o /dev/null -w "%{http_code}" "<URL>"); [ "$c" = 200 ] && break; sleep 5; done`. Observed on Nov 20: 50 to 70 s typically, once 10 s.
11. **CORS check** (once per host): `curl -sI "<fragment URL>" | grep -i access-control` must print `access-control-allow-origin: *`. Without it the loader's `fetch()` fails silently.
12. **Preview** each fragment at its Pages URL in the browser. It has no viewport meta tag, so it looks wrong on a phone there; the real phone check happens on the live GHL page (Stages 5 to 8).
13. **Record** every fragment URL, root id and the commit hash in `funnel-record.md`.

## Limits to tell the person
- The live pages depend on a **public** repo and on GitHub Pages being up. **Before anyone makes the repo private**, move the page code into GHL (paste the code) and the images and PDFs into GHL Media storage, or the pages go blank.
- Content appears only after JavaScript runs. That's fine for ad-traffic funnels, bad for SEO pages. Stage 4 turns off GHL's "Optimize JavaScript" so the code is not lazy-loaded.
- From now on, design fixes need **no GHL edit**: edit the file, push, poll, reload the live page (the loader fetches with `cache:'no-cache'`).

## Verify
- `curl -s -o /dev/null -w "%{http_code}"` on each fragment URL → `200`, and your marker string is served.
- `curl -sI` shows `access-control-allow-origin: *`.
- Each file: no `<html>/<head>/<body>`; first `<style>` is the wrapper fix with the right root id (not on the checkout); `document.title` set; zero relative `images/` paths; the sales page contains the checkout URL and no bump mention.
- PDFs open at their `downloads/` URLs.

## Rickey example values
- Repo `shuri-lab/rickey-tiktokshop-project` (public), Pages from `main` / root: `https://shuri-lab.github.io/rickey-tiktokshop-project/`.
- Sales fragment: `…/offer-1-sales-page/ghl-sales-page.html`, 115,760 bytes, 65 URL replacements, checkout link `https://davidhsai.com/headstart-checkout`, title "TikTok Shop Headstart | Game Tape". Commits `41db95b` (absolute links, checkout link) and `ed0bda1` (wrapper fix, title).
- Checkout: `…/offer-1-sales-page/ghl-checkout-left.html`. Thank-you: `…/offer-1-sales-page/ghl-thank-you.html`. Upsell: `…/offer-2-upsell/ghl-upsell.html` (~15.8 KB, title "One-time offer | My $4M TikTok Shop System").
- Downloads: `…/downloads/30-day-first-sale-challenge.pdf`, `…/downloads/starter-product-list.pdf`. Images: `…/images/opt/` (e.g. `starter-product-list-320.webp`, `offer-2-system-720.webp`, `hero-headstart-mockup-nobg-720.webp`).
- Brand: red `#D30805`, ink `#101017`, cream `#FFF8E7`, line `#E7E3DC`; Poppins (headings), Lato (body), Caveat (signature).

## ★ Gates (ask the person)
- Create the GitHub repo (or approve a folder in an existing one) and confirm what becomes public.
- Turn on GitHub Pages if you can't.

## Done when
- [ ] Four fragments live on Pages, each returning 200 with the current content.
- [ ] CORS header confirmed.
- [ ] Contract checks pass for each file (the checkout without the wrapper fix, on purpose).
- [ ] URLs, root ids and commit recorded in `funnel-record.md`.

# Funnel map: Rickey · TikTok Shop Headstart (built Nov 20 2026)

Every object created (or touched) in GoHighLevel and on the static host for Rickey's funnel, with names, IDs, URLs and the settings that matter. This is a filled-in `templates/funnel-record.md`. People are named by role where it matters; no email addresses.

App URL prefix used below: `https://app.gohighlevel.com/v2/location/54EJrjBw49eCsIsOZH44/` (= `{app}`). Builder URLs have no `/v2`.

## 1. Account

| What | Value |
|---|---|
| Sub-account | **Hot Pursuit LLC**, location id `54EJrjBw49eCsIsOZH44` |
| Shared with | An older "AI Avatars" project: funnel "AI Avatars Funnel" (3 steps), products "AI Avatars System" and "AI Avatars System Upsell" ($67 each), courses "AI Avatars System Course" (6 members) and "Bonus Course" (4 members), 2 empty draft workflows. **Off-limits: never edit or delete** (owner: unused, keep it). |
| Payment provider | Stripe, **Default, Connected** (shared with AI Avatars; same statement name). PayPal and Authorize.net not connected. Products sync to Stripe live and test. |
| Real sales seen | $67 sales through the AI Avatars funnel (latest Apr 20) and earlier $1 tests |
| Not touched, noticed | Expired Google Analytics, Meta Ads and Google Ads connections; "Classic courses retires Dec 1, 2026" banner |
| Signed-in GHL user during the build | the manager's (TJ's) login, signed in by the person |

## 2. Domain

| What | Value |
|---|---|
| Domain | `davidhsai.com` (also `www.davidhsai.com`), already connected for AI Avatars. Registrar shows **"expiring soon"**. |
| Why | No free GHL default domain in the account; the owner chose this one "for now, change it later". |
| Settings → Domains & URL Redirects | 1 domain, Internal Domains (0). Nothing changed there; the domain was only **selected** in the funnel's settings. |

## 3. Funnel

| What | Value |
|---|---|
| Name | `Rickey · TikTok Shop Headstart` |
| Funnel id | `DH9wPGw485e8HHkbWJaf` |
| URL | `{app}funnels-websites/funnels/DH9wPGw485e8HHkbWJaf` (Settings: `.../settings`) |
| Domain / path | `davidhsai.com` / `/headstart` (default was `/rickey--tiktok-shop-headstart`). `https://davidhsai.com/headstart` serves step 1. |
| Optimize JavaScript | **Off** (was on) |
| Other settings | Image Optimization on; GDPR fonts off; Auto-generate schema on; Require credit card left as is; no head/body tracking code; no favicon |
| Step order | Sales Page → Checkout → Upsell → Thank You |

## 4. Steps and pages

| Step | Step id | Path (live URL) | Builder page id | Page content |
|---|---|---|---|---|
| Sales Page | `69f4c9e5-083a-4864-8812-bbe8e88a20dc` | `/headstart-page` → https://davidhsai.com/headstart-page | `ADjS2vRSoBdGH6bc314y` | 1 section (Allow Rows to take entire width on, padding top/bottom 0) → Code element, loader root `gt-root` → `offer-1-sales-page/ghl-sales-page.html`. Loader: **first version, no `r.ok` guard**, copies `src` scripts. |
| Checkout | `feb56458-d661-4006-a888-b379d3fb4535` | `/headstart-checkout` → https://davidhsai.com/headstart-checkout | `NPewVghQNsX2rU9aEb0q` | 1 section → 2 Column row: left Code element, root `gtc-root` → `offer-1-sales-page/ghl-checkout-left.html` (loader **unguarded**, inline scripts only); right native **Order Form** (section 6). |
| Upsell | `2e4e00f0-5834-4f28-a2cd-ca65bc7d26d1` | `/headstart-upsell` → https://davidhsai.com/headstart-upsell | `LdwO92TMbPLv9CaOVOqI` | 1 full-width section: Row 1 Code, root `gtu-root` → `offer-2-upsell/ghl-upsell.html` (guarded loader); Row 2 native Button "YES! Add My $4M TikTok Shop System to My Order For Only $97" (Element name "YES button (one-click upsell)") + Code element with the NO link. |
| Thank You | `eb441c41-4ec2-4553-8b42-62e0c39d9091` | `/headstart-thank-you` → https://davidhsai.com/headstart-thank-you | `gm6ze7UIIxHSVB1HTQ8M` | 1 full-width section → Code element, root `gtty-root` → `offer-1-sales-page/ghl-thank-you.html` (guarded loader). |

- Step URLs: `{app}funnels-websites/funnels/DH9wPGw485e8HHkbWJaf/steps/<step id>/overview` (also `/products`, `/products/create`, `/publish`).
- Builder URLs: `https://app.gohighlevel.com/location/54EJrjBw49eCsIsOZH44/page-builder/<page id>`.
- Default step paths were `/sales-page`, `/checkout`, `/upsell`, `/thank-you`; all re-set and re-read after a reload.
- One builder screenshot showed the upsell's URL bar as `/upsell-page`; the live page answers at `/headstart-upsell`. Confirm in the Upsell step's Publishing tab (open item).
- All four pages: **saved and published**. Live checks at 393×852 and desktop: no sideways scroll; titles set by the fragments.

## 5. Products

### Catalog (Payments → Products)

| Name (internal) | Id | Price | Type | Notes |
|---|---|---|---|---|
| `Rickey · TikTok Shop Headstart` | `6b00b6f9ede380f78d55dff1` | $27 one-time | Physical (default, no selector) | Include in Online store **off**. Edit: `{app}payments/products/edit/6b00b6f9ede380f78d55dff1` |
| `Rickey · The Starter Product List` | `6b00b71eb426cdb2e0c81064` | $17 one-time | Physical | Online store off |
| `Rickey · My $4M TikTok Shop System` | `6b00cb846b61070feb19cb0a` | $97 one-time | Physical | Online store off |
| `TikTok Shop Headstart` (auto-created by the course) | not recorded | $27 | MEMBERSHIP / Service | Created automatically by the course's One Time pricing. Left in place. **Not** used by the funnel or the workflows. |

### Step products (buyer-facing names)

| Step | Public product name | Step product id | Price | Role |
|---|---|---|---|---|
| Checkout | TikTok Shop Headstart | `6b00b80fb0326fba63be8f1a` | $27 USD, One Time | Main Product |
| Checkout | The Starter Product List | `6b00b84e4b82cee7675e7862` | $17 USD, One Time | **Bump** Product |
| Upsell | My $4M TikTok Shop System | `6b00cbc6...` (truncated in the screenshot) | $97 USD, One Time | the YES button's product |

## 6. Checkout order form (Form settings)

| Section | Setting |
|---|---|
| Steps | One-step |
| Contact fields | Full Name + Email only ("2 shown"). Company un-required, then hidden; Phone, address search, Address, Country, State, City, Zip Code hidden. |
| Products | Show images off; Show quantity **off**; Show product description off; Show price description on; multi-product selection **off**; coupon codes **off** |
| Order bump | Enabled; preset **Hairline**; bump "Rickey · The Starter Product List · $17 · Customer selects". Headline `Yes! Add The Starter Product List`; OTO headline `Only $17 today. One-time payment.`; Description `Stop guessing what to sell. Get my list of 37 products people are buying right now, so you can pick your first product tonight.`; Custom image empty (injected by script); Preselect off; Badge text empty |
| Checkout options | All toggles off; **After purchase = Go to the next funnel step** (was "Go to a website URL" = the thank-you URL until the upsell existed) |
| Content | Step headline `Contact information`; Payment block title `Payment details`; Order button `GET INSTANT ACCESS →`; subtext `One-Time Payment • Instant Access`; footer `Secure checkout powered by Stripe` |
| Theme & style | Accent `#D30805` (custom color "Game Tape Red"); rest default. All other styling from the left-column fragment's CSS. |
| Verified (live, no purchase) | Total $27.00 → $44.00 (bump ticked) → $27.00; main product radio still checked; 1 bump image, 1 arrow; first field above the fold at 393×852 |

Bump copy history: v1 "Want a shortcut on picking products? Get the product lanes that sell all year + the one move to find today's winner in any lane. Pick your first products tonight instead of guessing." (OTO `[ONE-TIME ADD-ON] Only $17!`) → v2 "Stop guessing what to sell. Get 37 hand-picked products ... 29 picks across 8 lanes ... 8 viral scroll-stoppers, plus a seasonal calendar ..." → **v3 (live)** above.

## 7. Upsell page settings

| What | Value |
|---|---|
| YES button | Native GHL Button; text `YES! Add My $4M TikTok Shop System to My Order For Only $97`; Element name `YES button (one-click upsell)`. **Action to set: Button Actions → link to = "One click up/down sell product", Products = "My $4M TikTok Shop System".** It could not be set from the browser pane (native select); handed to the owner. Status at the end of the session: **not confirmed**. |
| NO link | Custom Code: `<a class="gtu-no" href="https://davidhsai.com/headstart-thank-you">No thanks, I'll keep guessing which products and hooks work, and take 10x longer to get my sales.</a>` |
| Styling | By the fragment (text tagging `.gtu-yes` / `.gtu-no`) |
| Read-only reference | AI Avatars funnel → Upsell #1 (builder page `xOzdUz04zbV6ZNcIkXrm`), live at `https://www.davidhsai.com/upsell-1-product--model-videos-page`. YES = link to "One click up/down sell product", Products "AI Avatars System Upsell". Nothing saved there. |

## 8. Course (Memberships)

| What | Value |
|---|---|
| Title | `TikTok Shop Headstart` (no prefix: buyers see it) |
| Course product id | `e17001aa-9fca-43f5-946a-81dd7b23d240` |
| Editor URL | `{app}memberships/courses/course-creator-studio?view=manager&sub_view=outline&product_id=e17001aa-9fca-43f5-946a-81dd7b23d240` |
| Description | "Rickey's 7-day course to get your first TikTok Shop sales, starting from zero. Do one lesson a day, about 15 minutes each, then follow the 30-Day First Sale Challenge." |
| Pricing | **One Time, $27** (not Free) |
| Offers (Advanced) | Empty; access is granted by the workflow |
| Thumbnail | Not uploaded (pane can't upload) |
| Module | "Course Contents" |
| Lessons (all published) | Start here: welcome + your downloads · Day 1: How TikTok Shop works + posting your first video · Day 2: Getting to your first 1,000 followers (the gate that lets you sell) · Day 3: Picking a product that sells · Day 4: Hooking people in the first 2 seconds · Day 5: Filming your first product video on the phone you already own · Day 6: Posting the right way + keeping your account safe · Day 7: Your first sale + what to do next |
| Lesson content | Text placeholders ("Rickey's Day N video is coming here..."); "Start here" holds the 30-Day guide link. **Videos not uploaded yet.** |
| Client portal (login) | **https://54ejrjbw49ecsisozh44.app.clientclub.net/** (Memberships → Client Portal ▾ → Dashboard) |

## 9. Workflows

| Name | Id / URL | Trigger | Actions | Status |
|---|---|---|---|---|
| `Rickey · Headstart delivery` | `ff695f45-2300-420a-a945-b2ad6a6b7a50` (`{app}automation/workflow/ff695f45-2300-420a-a945-b2ad6a6b7a50`) | Order submitted; filter Global product Is "Rickey · TikTok Shop Headstart" | Grant course access (TikTok Shop Headstart) → Send email "Delivery email": subject "You're in. Here's Day 1", preview "Your course login, your guides and the Rickey Army link." | **Published** |
| `Rickey · Starter Product List delivery` | `adcfb2b0-a859-4660-9d94-9ae04a2700a4` (`{app}automation/workflow/adcfb2b0-a859-4660-9d94-9ae04a2700a4`) | Order submitted; filter Global product Is "Rickey · The Starter Product List" | Send email "Starter Product List email": subject "Your Starter Product List", preview "Pick your first products tonight instead of guessing." | **Published** |
| (upsell delivery) | not built | | | open |

- Sender: GHL default (From name and From email empty; a From name without an email blocked saving).
- Save mode: manual save kept on new workflows.
- Existing drafts "New Workflow : 1749480932675" and "New Workflow : 1763563288239": untouched.
- Email bodies: `knowledge/memberships-and-workflows.md` sections C and D.

## 10. Users

| Who (role) | User type | Role chosen | Notes |
|---|---|---|---|
| Teammate Moses (TJ's Claude agent on this project; also wrote the thank-you and delivery copy) | Account - admin | **Full Admin** (owner's choice over "Admin minus Billing" and "User") | Created Nov 20 via Settings → Users → + Add user; password left empty (he set his own from GHL's invite); last name placeholder "Hot Pursuit" (fix in Settings → Users). Then got "Error while bootstrapping the session" on his own login; owner-approved workaround: "Continue with Google" with the account owner's login. Fix unconfirmed. |

Follow-up email to the teammate: sent as a reply in his access-request thread, manager cc'd, after the owner's explicit "I approve".

## 11. Static host (GitHub Pages)

| What | Value |
|---|---|
| Repo | `shuri-lab/rickey-tiktokshop-project` (public), Pages from `main` / root |
| Base URL | `https://shuri-lab.github.io/rickey-tiktokshop-project/` |
| Fragments | `offer-1-sales-page/ghl-sales-page.html` (= `pages/1-sales-page.html` here), `offer-1-sales-page/ghl-checkout-left.html` (= `2-checkout-left.html`), `offer-2-upsell/ghl-upsell.html` (= `3-upsell.html`), `offer-1-sales-page/ghl-thank-you.html` (= `4-thank-you.html`) |
| Images | `images/opt/*.webp`, e.g. `logo-gametape-black-400.webp`, `hero-headstart-mockup-nobg-720.webp` / `-1280.webp`, `starter-product-list-320.webp` (bump), `offer-2-system-720.webp` / `-1280.webp`, `o2-course-240.webp`, `o2-checklist-240.webp`, `o2-hooks-240.webp`, `o2-formats-240.webp`; thank-you uses `images/logo-gametape-stacked-white.png` and `images/rickey-bestbuy.jpg` |
| Downloads | `downloads/30-day-first-sale-challenge.pdf`, `downloads/starter-product-list.pdf` |
| CORS | `access-control-allow-origin: *` (checked with curl) |
| Thank-you config | `GT_LINKS={course:'https://54ejrjbw49ecsisozh44.app.clientclub.net/',whatsapp:'',support:''}` |
| Commits from the GHL work (first ones) | `41db95b` "Add HighLevel version of the Offer 1 sales page (absolute image links, checkout link)"; `ed0bda1` "HighLevel page: remove wrapper padding and width cap, set tab title" |

## 12. Brand tokens

Red `#D30805`, ink `#101017`, cream `#FFF8E7`, line `#E7E3DC`; fonts Poppins (headings), Lato (body), Caveat (signature). Brand: Game Tape.

## 13. Open items (end of Nov 20 2026)

1. **YES button action** on the upsell: link to = One click up/down sell product, Products = My $4M TikTok Shop System, Save, Publish (owner, about 30 s). Until then YES does nothing.
2. **Test purchase, end to end:** checkout with bump → upsell YES → thank-you; check both emails, course login, totals; also the NO link. Either the owner buys and refunds, or Stripe test mode (real buyers can't pay meanwhile; find the funnel's payment mode setting). Claude never enters cards.
3. **Upsell delivery:** no course, workflow or email delivers the $97 System yet.
4. **WhatsApp channel link** (Rickey Army): `GT_LINKS.whatsapp` on the thank-you page and `https://WHATSAPP-LINK-GOES-HERE` in the live delivery email (broken for any buyer now).
5. **Support email:** `GT_LINKS.support`.
6. **Sender name and email** for the workflow emails (default sender now).
7. **Course thumbnail and the 7 lesson videos** (Rickey films them; the person uploads).
8. **Bump custom image:** optional upload in GHL; if done, remove the script injection.
9. **Upsell stack values** $297 / $47 / $47 / $37 (total $428) are placeholders: client to approve.
10. **Loaders on the sales page and checkout are the unguarded version.** Replace with the guarded loader next time those pages are edited.
11. **Domain:** davidhsai.com belongs to the other brand and is expiring soon. Renew, or connect a Game Tape domain before ads (then redirects + Meta re-verification).
12. **Shared Stripe:** confirm Rickey's revenue should land in this Stripe account and statement name.
13. **Product type "Physical":** confirm during the test purchase that checkout never asks for shipping.
14. **Before making the repo private:** move fragments, images and PDFs into GHL (paste the pages, GHL Media), or pages go blank and downloads break.
15. **Upsell path:** confirm `/headstart-upsell` in the Upsell step's Publishing tab.
16. **Auto-created MEMBERSHIP product** "TikTok Shop Headstart": decide whether to keep it.
17. **Teammate login error** ("Error while bootstrapping the session"): fix his own login; replace the placeholder last name.
18. **Password setup email:** confirm whether GHL sends one when course access is granted (the delivery email tells first-timers to use "Forgot password").
19. **Go-live sign-off:** nothing goes to real customers without the manager's (TJ's) sign-off.

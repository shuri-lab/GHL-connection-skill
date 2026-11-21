# Stage 8 of 12: Thank-you step

**Goal:** the Thank You step is live with our HTML: a confirmation header, three numbered steps (open the course, download the guides, join the community), the client's quote and a help line. Every variable link lives in one config object at the top of the fragment; links the client hasn't given yet show a greyed button and a "coming to your email" note instead of a broken link.

**Why:** this is the page every buyer lands on (after YES or NO on the upsell). On Nov 20 the WhatsApp channel link and the support email were still missing, so the page needed a graceful placeholder state. A 20 px white strip appeared at the top because GHL sections are `div`s with a `section-XXXX` class and the first wrapper fix only targeted `<section>`. On phones the numbered circles were squashed (in a column flex layout, `flex:0 0 44px` sizes the height, not the width). And the page can't know whether the buyer took the bump or the upsell, so those downloads point to the email.

**Read first:** `knowledge/loader.md` (wrapper fix), the copy in `examples/rickey-headstart-funnel/emails/moses-thank-you-and-delivery-copy-v1.md`.

## Before you start (inputs)
- The thank-you copy (from the copywriter or the plan).
- The thank-you fragment live on Pages (root `gtty-root`, scope `#gty`), with the wrapper fix **including** `[class*="section-"]:has(#gtty-root)`.
- The links you have: course login URL (after Stage 9; it can be filled later), guide PDF URLs, community link, support email.

## The config block (top of the fragment script)
```js
var GT_LINKS={course:'',whatsapp:'',support:''};   // empty = placeholder state
document.title="You're in | <Offer>";
if(GT_LINKS.course){c.href=GT_LINKS.course;}else{c.className+=' off';note.textContent='Your course login is on its way to your email.';}
if(GT_LINKS.whatsapp){w.href=GT_LINKS.whatsapp;}else{w.className+=' off';note2.textContent='The channel link is coming to your email.';}
if(GT_LINKS.support){h.innerHTML="Didn't get the email? Check spam or Promotions, or write to <a href=\"mailto:"+GT_LINKS.support+"\">"+GT_LINKS.support+"</a>.";}
```
`.btn.off{background:#c9c9cf;pointer-events:none}` is the greyed state. Filling a link later is a one-line edit + push (e.g. `sed -i '' "s#course:''#course:'https://…/'#" ghl-thank-you.html`), no builder edit.

## Steps
1. From the builder press **Back** (top left) to the funnel, or open the funnel → **Thank You** step → **Overview** → `find "Create from blank"` → click the ref. Wait 6 to 11 s. Copy the page id. Close **Ask AI**.
2. On the empty page, **Insert Element** → search → clicking a card added nothing (no section yet). Instead: toolbar **+** → **Sections** → **Full Width** (or **Blank Section**).
3. The section's **+** (click once to select, once more to open) → Quick Add → clear the search (`End`, `Backspace` ×10) → `custom` → **Code**.
4. Select it → **Open Code Editor** → click inside → type the loader with root `gtty-root` and the thank-you URL → zoom-check → modal **Save** → **page Save** (close the SEO panel if it opens).
5. Breadcrumb **Section** → General → "Allow Rows to take entire width" on; Styles → Margin & Padding → top 0, bottom 0 → **page Save**.
6. **Publish**. Toast "Page published successfully".
7. ★ For each missing link, ask the person (or note it as open): community/channel link, support email. Course URL comes from Stage 9 (Memberships → Client Portal ▾ → Dashboard → "Client portal URL").
8. When a link arrives: edit `GT_LINKS`, push, poll Pages for the new value, reload the live page.

## Verify
On a separate tab on `https://<domain>/<slug>-thank-you`:
1. **No white strip:** at the top of the page, `document.getElementById('gtty-root').getBoundingClientRect().top` → `0`. If not, walk the wrapper chain (Stage 5) and look for `section-XXXX pt:20px`; add `[class*="section-"]:has(#gtty-root)` to the wrapper fix.
2. **Links and placeholders:**
   ```js
   ({title:document.title, course:document.getElementById('gty-course').href, wa:document.getElementById('gty-wa').href,
     off:[...document.querySelectorAll('#gty .btn.off')].map(b=>b.innerText.trim()),
     notes:[...document.querySelectorAll('#gty .note')].map(n=>n.innerText.trim()).filter(Boolean),
     scrollW:document.documentElement.scrollWidth, W:innerWidth})
   ```
   Every filled link is a real URL; every empty one is greyed with its note.
3. **Phone** 393×852: number circles round (44×44: `#gty .n{flex:none;width:44px;height:44px}`), buttons full width, the quote card centred, `scrollW` = 393. **Desktop** 1280×800: cards in a 720 px column pulled up over the dark header.
4. Open each guide link once (PDFs return 200).
5. **Checker, full funnel now:** run `node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.json --out my-funnel/shots`. All four steps exist, so expect 8 PASS lines and "All steps pass".
6. Compare with `examples/rickey-headstart-funnel/screenshots/4-thankyou-mobile.png` and `4-thankyou-desktop.png`. Reset the viewport.

## Rickey example values
| What | Value |
|---|---|
| Builder page | `gm6ze7UIIxHSVB1HTQ8M` (step `eb441c41-4ec2-4553-8b42-62e0c39d9091`) |
| Live | `https://davidhsai.com/headstart-thank-you` |
| Fragment | `https://shuri-lab.github.io/rickey-tiktokshop-project/offer-1-sales-page/ghl-thank-you.html`, root `gtty-root`, scope `#gty` |
| Config | `GT_LINKS={course:'https://54ejrjbw49ecsisozh44.app.clientclub.net/',whatsapp:'',support:''}` |
| Header | white stacked logo, red ✓ badge, "You're in. Your **Headstart** begins now.", "Everything is below and in your email. Start with Day 1 today, it takes about 15 minutes." |
| Steps | 1 "Watch Day 1." → "Open my course →"; 2 "Download your guides." → "⬇ 30-Day Guide (PDF)" + "Added The Starter Product List? Its download link is in your email."; 3 "Join the Rickey Army." → "Join the channel →" (greyed, WhatsApp link missing) |
| Quote | "Most people never make a sale because they wait until they feel ready. You just stopped waiting. See you in Day 1." signed Rickey (Caveat font) |
| Title | "You're in \| TikTok Shop Headstart" |

## ★ Gates (ask the person)
- Links the client hasn't given yet (community/WhatsApp, support email). Don't invent them; leave the placeholder state.

## Done when
- [ ] Page created, saved, published; loader with `gtty-root`.
- [ ] No white strip; circles round on phones; no sideways scroll.
- [ ] Every available link set in `GT_LINKS`; missing ones greyed with a note and listed as open items.
- [ ] `check_funnel.mjs` on the full `funnel.json`: All steps pass.
- [ ] Page id, config values and open links in `funnel-record.md`.

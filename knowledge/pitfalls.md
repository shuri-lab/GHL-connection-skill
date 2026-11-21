# Pitfalls and fixes

Every problem hit while building Rickey's funnel (Nov 20 2026), with the fix that worked. Numbered so stage files and reviews can cite them ("see pitfall 31"). Builder mechanics are explained in `builder-quirks.md`; this list is the "what went wrong and what to do instead".

## Access, safety and the session

1. **The account might be shared with other live work.** Fix: read-only audit first (funnels, products, payment providers, workflows, courses with member counts, domains, transactions), report it, and build only prefixed new items. Hot Pursuit LLC had a live-looking "AI Avatars" funnel with real $67 sales and 10 course members.
2. **"Unused" doesn't mean "deletable".** David said the AI Avatars items were unused but not to delete them. Fix: never delete or edit other items; reading them for reference is fine.
3. **Opening the builder iframe URL directly broke the session.** `page-builder.leadconnectorhq.com/...` in its own tab showed 404/blank, then 401s, and the person had to sign in again. Fix: never open it.
4. **Session expiry looks like a broken page.** Endless spinner, `find` finds nothing, 401/403 in the console. Fix: stop, say so honestly, list done vs. left, ask the person to sign in again.
5. **Claiming "done" without checking.** Asked "have you created and verified the offer 1 page and the checkout?", the honest answer was: sales page verified; checkout started but the live URL had no order form. Fix: check the live URL (curl or the pane) before saying anything is done.
6. **Borrowing from a live funnel.** Opening the AI Avatars upsell builder to copy a button risked changing a live page. Fix: read-only; never Save or Publish another funnel's page.
7. **Asking approval while the person is on the phone (Remote Control).** `AskUserQuestion` came back "Denied by user". Fix: ask in plain text with the choices spelled out, and wait for their words ("send the email ... I approve").

## Domains and funnel settings

8. **No free GHL default domain.** The funnel's Domain list only had the domain another brand used (davidhsai.com). Fix: offer three options (preview links for review only; the existing domain with prefixed paths; buy or connect a brand domain, which is the person's purchase decision) and let the person choose.
9. **Generic step paths collide on a shared domain.** Defaults `/sales-page`, `/checkout`, `/upsell`, `/thank-you`. Fix: `/<offer>-page`, `/<offer>-checkout`, `/<offer>-upsell`, `/<offer>-thank-you`, and a short funnel path (`/headstart`, which serves step 1).
10. **Switching domains later.** Pages stay, but shared links break, the Meta pixel/domain must be re-verified, and an expiring domain takes the whole funnel down. Fix: switch before ads start, add URL Redirects (Settings → Domains & URL Redirects), renew or replace an expiring domain (davidhsai.com showed "expiring soon").
11. **Optimize JavaScript is on by default** and lazy-loads custom code, so Custom Code pages appear late. Fix: turn it off in funnel Settings.
12. **Funnel Settings Save leaves the page** (jumps to Steps), so the next click lands on the wrong thing. Fix: re-navigate to `/settings` before the next change.
13. **`/publishing` is blank.** The step route is `/publish`. Fix: open Publishing from Overview once, then `/publish` works.

## Products

14. **Products default to type "Physical"**, and no type selector exists (not on create, edit, or "Additional options"). Physical products bring address fields into the order form. Fix: hide every address field and confirm checkout never asks for shipping.
15. **Coordinate Save hit the Media Storage picker** after the product form's layout shifted. Fix: `find "Save"` and click the ref.
16. **Step product "Product name" is public** and prefilled with the internal "Rickey · ..." name. Typing inserted into the old value. Fix: clear it (End, Backspace ×80, Delete ×40), type the clean name.
17. **Wrong product picked** in the step product dropdown by coordinates ("AI Avatars System Upsell"). Fix: type to filter, `hover` + `Return`, screenshot before Save.
18. **Price and name didn't stick** in a fast batch. Fix: one action at a time, screenshot after each.
19. **The bump must be set in two places:** step product marked **Bump Product**, and the order form's **Order bump**. Fix: set both; the step Products table shows a "Bump" badge.
20. **Creating a priced course auto-creates a MEMBERSHIP product** with the course name. Fix: leave it; never use it in workflow filters (pitfall 52).

## Builder: structure and saving

21. **Unsaved work lost.** "Autosave off"; navigating away discards everything without a prompt. The first upsell build (code, YES, NO) vanished. Fix: page Save after every element; watch the yellow dot on Save.
22. **Code modal Save is not a page save.** Fix: modal Save, then page Save, then Publish.
23. **Elements can't be added to an empty page.** Fix: add a section first (Blank Section, or + → Sections → Full Width).
24. **Drag-and-drop never registers.** Fix: select the section/column, its +, Quick Add, click the card.
25. **The toolbar `</>` is Tracking Code**, not a Code element. Fix: Quick Add → `custom`/`code` → Code card.
26. **Section settings don't remove all padding.** Row and column still pad `10px 5px`; an inner div caps width at 1170 px. Fix: the wrapper-fix CSS in the fragment.
27. **Wrapper fix missed GHL sections** (they are `div.section-XXXX`, not `<section>`), leaving a 20 px white strip on the thank-you page. Fix: include `[class*="section-"]:has(#root)`.
28. **The wrapper fix must not be used on the checkout's left column.** It sets the column to `width:100%`, which would push the order form under it. Fix: the checkout fragment only trims phone padding (`checkout-recipe.md`).
29. **Page title empty on the live page.** Fix: `document.title='...'` in the fragment.
30. **SEO panel pops open** after the first save or a near-miss click. Fix: close it with X, then Publish.

## Builder: fields and dropdowns

31. **`cmd+a` doesn't select all** in hex, title, button text, element name, bump description, product name, Quick Add search, email source. New text got appended (lesson titles "Day 2" and "Day 3"). Fix: End (or `cmd+Down`) + Backspace ×N + Delete ×N, `zoom` empty, type, `zoom`.
32. **Batched clicks silently dropped changes** (8 eye toggles left Company, Country and City visible). Fix: one click at a time with 2 s waits, then check the preview.
33. **Company is required** in the default order form, so it can't just be hidden. Fix: click its required marker first, then the eye.
34. **Native `<select>` inside the builder** (button "link to", button "Products") can't be operated from the pane at all. Fix: say so up front; hand the 4 clicks to the person (`upsell-recipe.md`), or with their OK try Claude in Chrome (unverified).
35. **Custom dropdown keys land one off** (After purchase landed on "Choose a specific funnel step"). Fix: separate `Up`/`Down` presses from the current value, `Return`, `zoom` to read the label.
36. **Escape deselects the element** instead of closing a dropdown. Fix: re-select and scroll back.
37. **Clipboard paste doesn't reach the pane.** Fix: type; for big pages use the loader.
38. **The pane can't upload** (course thumbnail, videos, bump custom image, product media). Fix: list them for the person; inject images from the fragment where possible.

## Loader and hosting

39. **Loader injected GitHub's 404 page** into the checkout's left column (Pages hadn't deployed; the loader had no `r.ok` check). Fix: guarded loader (`if(!r.ok) throw` + `.catch`), and poll Pages before checking. Rickey's sales and checkout loaders are still the unguarded version (open item).
40. **Pages cache lag** (10 to 70 s, sometimes over a minute; a check after 45 s saw the old file). Fix: poll with a cache-buster for a marker string from the change.
41. **`git push` rejected** because Pages setup added commits ("Create CNAME", "Delete CNAME"). Fix: `git fetch`, inspect `git log HEAD..origin/main`, `git pull --rebase`, push.
42. **A chained `sleep 60` is blocked** by the harness. Fix: polling loops with short sleeps.
43. **Repo privacy.** The loaders fetch from public GitHub Pages. Fix: before making the repo private, move code, images and PDFs into GHL (paste the page, GHL Media) or every page goes blank and downloads break.

## Checkout and order form

44. **Phone: checkout form below the fold.** The stacked left column took the whole first screen. Fix: a separate compact phone card (`.gtc-m`, about 140 px) instead of shrinking the desktop column, plus phone padding trims. Desktop unchanged.
45. **"Select Product" table with one product** (nothing for the buyer to do). Fix: hide `.order-form__offer` and the non-total summary rows; the product radio stays checked.
46. **Default bump headline is the internal prefixed name.** Fix: replace it ("Yes! Add [Product]").
47. **Bump description squeezed into a narrow column, text centered or right-aligned.** Fix: `.order-form__bump-body{display:contents}`, description `grid-column:1/-1`, image floated inside the description, `text-align:left!important`.
48. **GHL re-renders the order form** (e.g. on ticking the bump), wiping injected nodes. Fix: idempotent enhancer + MutationObserver + a short interval.
49. **Bump custom image is upload-only.** Fix: inject it from the fragment; if someone uploads one later, remove the injection.
50. **Bump copy too long, too many numbers** (37, 29, 8 lanes, 8 viral). Fix: one pain, one number, one promise; ~130 characters; 5th-grade clear.
51. **After purchase = website URL skips the upsell.** It was correct while the upsell didn't exist. Fix: "Go to the next funnel step" once the upsell is live.

## Workflows, emails, course

52. **Filtering on the wrong product.** The course's auto-created membership product looks like the right one. Fix: filter on the catalog product the checkout step points to ("Rickey · TikTok Shop Headstart").
53. **One email can't branch on "bump bought".** Fix: one workflow and email per product.
54. **Long email HTML garbled** (dropped keystrokes, "Hey" twice). Fix: one paragraph per `type`, 1 s waits, `zoom`.
55. **Source box ignores select-all and modifiers; `form_input` can't reach it.** Fix: clear in the visual editor, reopen source.
56. **Editor strips paragraph spacing.** Fix: inline `margin` on every `<p>`.
57. **From name without From email** blocks saving. Fix: both set, or both empty (default sender).
58. **"Free" course pricing** lets anyone with the link enroll. Fix: One Time at the product's price.
59. **New lessons are drafts.** Fix: open each → description → Save and publish.
60. **Course module dropdown ignored clicks.** Fix: `hover` the option → `Return`.
61. **Placeholder links in live emails** (`https://WHATSAPP-LINK-GOES-HERE`). Any buyer now gets a broken link. Fix: list as an open item; fill before real traffic.
62. **Upsell bought but nothing delivers it.** Rickey's upsell has no delivery workflow yet. Fix: build it (course + workflow + email) before real traffic.

## Upsell page

63. **YES button left at its default** ("Open popup", no popup): YES does nothing. Fix: link to = One click up/down sell product, Products = the step product.
64. **`check_funnel.mjs` can't see the YES action**; a YES button with no action still passes. Fix: confirm the setting with the person or in the test purchase.
65. **Image overflow on phones** (`scrollWidth` 778 vs 393): `#gtu .shot{max-width:760px}` beat `#gtu img{max-width:100%}`. Fix: `width:100%` plus the max-width.
66. **Flex bullet split** (a `<b>` became its own flex item). Fix: wrap each `li`'s content in one `<span>`.
67. **Squashed circles** on phones: `flex:0 0 44px` in a column layout sets height, not width. Fix: `flex:none;width:44px;height:44px`.
68. **Buttons touching the screen edge.** The planned `.gtu-btns` wrapper didn't exist in GHL markup. Fix: `:has()` padding on `.c-button` / `.c-custom-code`.
69. **Button texts changed later** break the text-based tagging. Fix: keep "YES!" and "No thanks" at the start.
70. **The builder URL bar showed `/upsell-page`** while the live page answered at `/headstart-upsell`. Fix: trust the step Overview URL; confirm in the Publishing tab.

## Team access

71. **Admin is the default role and includes billing.** Fix: ask which role (Admin minus Billing, Full Admin, or User) before saving. David chose Full Admin.
72. **Last name is required** and may be unknown. Fix: ask, or use a placeholder (the org name was used) and report it for a later fix in Settings → Users.
73. **Duplicates.** Fix: search Settings → Users for the person before "+ Add user".
74. **Password.** Leave it empty (Advanced settings) so the invitee sets their own from GHL's invite email. Never type one.
75. **Claude can't see whether the invite email went out.** Fix: ask the invitee. (It did go out; the teammate set a password and entered the login code.)
76. **"Error while bootstrapping the session"** after a successful login (dashboard stuck on "Loading fresh data... Initializing..."). The user existed inside the sub-account as "Account - admin", so it was not a missing location access. Workaround used (owner approved): the teammate signed in with "Continue with Google" as the account owner. Better next steps, not yet tried: private window or another browser with extensions off, clear site data for app.gohighlevel.com and leadconnectorhq.com, the agency's white-label login domain if any, GHL support. Prefer fixing the teammate's own login over sharing the owner's login.
77. **Emailing the teammate.** Fix: draft as a reply in their own access-request thread, show it, send only after an explicit yes; cc only if approved.

## Testing and go-live

78. **No test purchase was run on Nov 20.** Totals were tested without buying (JS: $27 → $44 → $27). Payment, delivery emails, course access and the one-click charge are unproven until a purchase. Fix: the person buys once (bump + upsell YES), checks emails, course login and the next pages, then refunds; or use Stripe test mode with Stripe's test cards. Claude never types card numbers.
79. **Stripe test mode affects real buyers.** While the funnel is in test mode, real buyers can't pay. Where the funnel's payment mode toggle lives was not seen in the session: find it, tell the person, and switch it back after the test.
80. **Shared Stripe account.** The new offer's money lands in the same Stripe account and card-statement name as the other project. Fix: confirm with the person before real traffic.
81. **Going live without sign-off.** Fix: real traffic only after the required sign-off (TJ for his projects).
82. **Placeholder offer values** (upsell stack $297/$47/$47/$37 were made up). Fix: flag them for the client to approve.

## Tooling

83. **Pane viewport changes** (resize, Remote Control, end of turn) invalidate coordinates. Fix: fresh screenshot before every coordinate click.
84. **Remote Control call rewritten by a hook.** Fix: re-send with exactly the provided input, alone.
85. **`claude rc` doesn't apply** in the desktop app. Fix: use the session's set-remote-control tool.
86. **Swift/PDFKit renderer failed** (SDK vs compiler mismatch) when reading the course deck. Fix: `pypdf` (+ Pillow) in a venv; for image-only decks, extract each page's largest image into a contact sheet.

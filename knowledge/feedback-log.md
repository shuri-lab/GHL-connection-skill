# Feedback log: what David asked for during the GHL build, and the rule behind each ask

David's messages from Nov 20 2026 (session messages #36 to #55), in order. For each: **his words** (quoted from voice dictation, typos fixed, lightly trimmed) → **the general rule** for any client → **how it was implemented** for Rickey. Use this to anticipate the same feedback on your build, before the person has to give it.

---

## Context: what the funnel had to do (before the GHL work)

**#36 / #37:** "We want them to be able to just click one button and add it to their order. So they've already paid for offer one... it's a one-click upsell, meaning they just click and they get automatically charged." / "how do we send the PDFs to the buyers? How do we give them access to the course? Where do we host the course?" / "Everything has to work very seamlessly... we can't afford it not working properly."
- **Rule:** a funnel is not done until every piece works end to end: checkout with a checkbox bump, a true one-click upsell (no card re-entry), course hosting and access, file delivery, and a test proving it.
- **Implemented:** GHL native order form + bump, one-click upsell button, Memberships course, per-product delivery workflows, and a test plan (Stage 12).

## 1. Do it ourselves, carefully

**#40:** "I want you to setup and configure everything in GHL not Moses so we can move faster and there's less back and forth... we need to be careful because I don't know if the account is being used on any other project."
- **Rule:** before any change, do a read-only audit of the sub-account and agree a safety contract: create only, prefix everything, touch nothing that exists, the person signs in, no card details.
- **Implemented:** needs list + safety rules first; audit table (funnels, products, Stripe, workflows, courses with members, domain, transactions); everything named `Rickey · ...`. See `safety-rules.md`.

## 2. Reuse the account, keep the old stuff

**#43:** "Yes it's OK to use the same subaccount... the AI avatars stuff is unused (I don't want to delete it but it is unused so we can reuse anything we need...)... GHL default domain is good for now we can connect a domain later."
- **Rule:** "unused" is not permission to delete or edit. Read old items for reference only. Record what's off-limits in the plan.
- **Implemented:** AI Avatars funnel, products, courses and draft workflows left untouched; its upsell page was opened read-only to learn the YES button settings.

## 3. Domains

**#44:** "Can you use a GHL default domain?" **#45:** "if we use that one 'davidhsai.com' can we change it later easily without issues" **#46:** "Okay, we can use that one and change it later."
- **Rule:** check the funnel's Domain list before promising a default domain. If there is none, offer: preview links (review only), the existing domain with prefixed paths, or buy/connect a brand domain (the person's purchase). Explain what switching later involves (links, redirects, pixel re-verification, renewal).
- **Implemented:** davidhsai.com with `/headstart-page`, `/headstart-checkout`, `/headstart-upsell`, `/headstart-thank-you`; funnel path `/headstart`.

## 4. "Create one blank and put an HTML component"

**#46:** "I don't see the page created, the offer one landing page... I believe you have to create one in blank and then put like an HTML component, something like that, and put the HTML code that we have. And I'm not sure what you have to do with the images..."
- **Rule:** every page = a step page **created from blank** + **one Custom Code element** holding our HTML. Images (and every asset) need absolute URLs on a host the page can reach. The person must be able to open the page in GHL and see it.
- **Implemented:** Create from blank → Blank Section → Quick Add `code` → Code element → a ~500-character **loader** that fetches the fragment from GitHub Pages (clipboard paste didn't reach the browser, and 116 KB can't be typed). Image paths rewritten to `https://shuri-lab.github.io/rickey-tiktokshop-project/images/...`. Wrapper-fix CSS and `document.title` inside the fragment. See `loader.md`.

## 5. A checkout in GHL with a checkbox bump, like the reference

**#46 + screenshot:** "for the checkout... create a checkout in Go High Level... And I want to have the order bump there. So it's like a checkbox... I'll upload screenshot here of what I want it to look like regarding structure... It's from a different funnel... different branding, but it's just for you to have a reference of the structure."
- **Rule:** copy the **structure** of a reference, never its branding. Checkout = two columns: offer summary left, GHL order form right, bump as a checkbox box inside the form.
- **Implemented:** section → 2 Column row → left Code (loader for the hosted `ghl-checkout-left.html`, repo copy `examples/rickey-headstart-funnel/pages/2-checkout-left.html`), right native Order Form; one-step; Full Name + Email; bump enabled. See `checkout-recipe.md`.

## 6. "Have you created and verified...?"

**#48:** "We don't have the link yet, have you created and verified the offer 1 page and the checkout"
- **Rule:** report status in two lists: **verified live** vs **not finished**. Check the live URL before claiming anything. Give the links.
- **Implemented:** sales page verified live; checkout reported as "started, no order form live yet, no test purchase", then finished.

## 7. Never announce the bump on the sales page

**#50:** "in the offer one landing page, I don't want to announce the order bump. The order bump is just visible in the checkout page... So remove it from the sales page."
- **Rule:** the bump is a checkout-only surprise. The sales page never names it.
- **Implemented:** the bump block and its step labels removed from the sales page; verified no "Starter Product List" text on the live sales page.

## 8. Everything must load fast

**#50:** "All the images... they're loading super slow. So I need you to fully optimize them... the videos also... I just need them to load fast... Keeping, of course, a level of quality."
- **Rule:** optimize all media on every funnel page (the Sales Page Playbook covers how).
- **Implemented:** WebP at display size, `srcset`/`sizes`, lazy loading except the hero, compressed videos loaded on scroll; about 1.2 MB of images on a phone vs about 15 MB before. The checkout and thank-you fragments use the same WebP files.

## 9. Phone checkout: form above the fold

**#50:** "on desktop, it looks really good, the two columns, but... in the mobile version, everything stacks up... You gotta scroll to see the checkout form... make it way more compact... desktop is fine. You don't have to change anything on desktop... the checkout form is visible above the fold."
- **Rule:** on a 393×852 phone, the first form field is on the first screen (aim for the top half). Compact the phone version only; leave a desktop the person approved alone.
- **Implemented:** a separate phone block: small logo, one dark card (96 px image, name, one "includes" line, crossed total + "$27 today"), one trust line, and phone-only padding trims. `check_funnel.mjs` fails a checkout whose first field is below 852 px.

## 10. A form that looks good and is clear

**#50:** "the font doesn't look really good. The input fields don't look really good. I think it can look way, way better, way more polished, way more clear where the inputs have to go... my main concern is the contact information section."
- **Rule:** the contact section uses the brand fonts, boxed inputs with visible borders, labels above, a clear focus state, numbered steps, and helpful placeholders.
- **Implemented:** form CSS (white card, numbered "1 Contact information" / "2 Payment details", 50 px boxed inputs, brand-red focus ring, placeholders "Your full name" / "you@example.com", helper "Your course login is sent here."). See `checkout-recipe.md` section 6.

## 11. Remove "Select Product"

**#50:** "I don't like the select product section of it because there's nothing the user has to do, right? The product is already selected. So if we can remove that, that would be awesome."
- **Rule:** hide anything the buyer can't act on (single-product picker, subtotal, the builder's default subheading). Make sure the product stays selected.
- **Implemented:** `.order-form__offer` and non-total summary rows hidden; the radio stays checked (verified); `.order-form__subheadline` hidden.

## 12. Keep what the client likes

**#50:** "The payment section is fine. I like the button that says get instant access. All of that's fine."
- **Rule:** when a person approves a part, don't redesign it. Change only what they flagged.
- **Implemented:** payment block, "GET INSTANT ACCESS →" button, its subtext and footer left as they were.

## 13. A bump that pops

**#50:** "the order bump, it needs the image... the headline is fine... make the text inside it more compelling and more strong. It's saying, want a shortcut of picking products, get the product lanes. That doesn't make sense... We have to say get X amount of products... it has to be way more visible... with a background. It needs to have like a narrow arrow pointing at it, moving... It needs to pop out... It needs to have like a striped, discontinuous striped border."
- **Rule:** the bump must be the most eye-catching block in the form: product image, a tinted background, a dashed border, an animated arrow pointing at the checkbox, and copy that counts a concrete thing the buyer gets. No internal jargon.
- **Implemented:** cream background, 2.5 px dashed red border with a pulsing glow, red banner "⚡ ONE-TIME OFFER · ONLY ON THIS PAGE", nudging red arrow, 24 px red checkbox, underlined headline, red price line, product image floated in the description; ticked state turns solid. The real count (37 products) came from counting the PDF.

## 14. The upsell page: structure from the reference, built in HTML

**#50:** "https://www.davidhsai.com/upsell-1-product--model-videos-page ... what I like about this page is the structure of it... build the page your own instead of doing it in go high level... make it in HTML... so we have full control." Then, section by section:
- "all the way at the top. We got that alert bar, and make sure it looks really good. Pops out, the text is big enough, both in mobile version and desktop version."
- "you can say you'll have access to the course in the next 5 minutes... we don't have a VSL video... you gotta mention an exclusive opportunity... you're only gonna get this price here."
- "it's okay to say, you just unlock the system... now get results 10 times faster... super compelling headline"
- "Then you have the product, offer [two] product image. And you have a super compelling headline below it, super compelling subheadline"
- "a super strong and compelling offer stack... list what includes with the prices... You can make up those numbers... then you put the total value, and then you cross it and say... super special exclusive opportunity to get it at this price."
- "below it, you have two buttons... you have to create those with Go High Level... see how it's done in the AI avatars upsell page." Example copy: "➡️ This is exclusive one-time offer. Only available right here, right now" / "YES! Add The AI Avatars Bonus to My Order For Only $47" / "No thanks, I'll spend a lot of time coming up with average AI avatars every time and spend x10 more time". "put 97 for now".
- "use custom HTML code for the entire thing except for those two buttons at the bottom... make sure it looks really good on desktop and on mobile... be super thorough and thoughtful."
- **Rules:** (1) study the reference's structure with JS, copy structure not content; (2) the page is one HTML fragment for full design control; only payment-critical controls are native; (3) the section order is: alert bar (purchase confirmed + access time + "don't close" + exclusive one-time opportunity), progress bar, "You just unlocked X. Now get Y 10x faster" headline, product image, product title, subheadline, bridge, offer stack with crossed values and total, special price, guarantee, one-time-offer line, YES, NO; (4) no video means no "watch the video" and no timer gate; (5) urgency must be true ("only on this page"), never a fake deadline; (6) made-up values are flagged as placeholders.
- **Implemented:** `3-upsell.html` (see `upsell-recipe.md` section 2). YES is a native GHL button styled by the fragment through text matching.
- **Deviation, and why:** David asked for **both** buttons in GHL. The NO became a small Custom Code link to the thank-you page, because a native button's action ("link to") is a native select the browser pane can't operate, and a decline needs no payment action. The fragment would style a native NO button the same way if the person swaps it in. Tell the person about this choice.

## 15. "Where can I see it?"

**#52:** "where can I see the upsell page?"
- **Rule:** every hand-off gives the **live URL** and the **edit path** in GHL.
- **Implemented:** `https://davidhsai.com/headstart-upsell`, and GHL → Sites → Funnels → "Rickey · TikTok Shop Headstart" → Upsell → Edit. Also flagged: the YES action still needed the person's 4 clicks.

## 16. Bump copy: shorter, one number, 5th-grade clear

**#53:** (quoting the long version) "...it's too long... we just give too many numbers. You tell them 37 handpicked products, then 29 picks across 8 lanes, 8 viral scrolls... It's just a bit confusing... one good offer or sales copy is one that a 5th grader could understand... more concise, more compelling, stronger."
- **Rule:** bump description = one pain + one number + one promise, about 130 characters. A 10-year-old can say what they get and why. (The positive feedback in the same message, "this all looks great, super good", means the rest of the design stays.)
- **Implemented:** "Stop guessing what to sell. Get my list of 37 products people are buying right now, so you can pick your first product tonight." Edited in the order form's bump Description, saved, published, read back from the live page.

## 17. Working from the phone

**#53:** "I want to connect you to my phone so I can keep working from my phone... it's saying you have to run Claude space RC in a terminal... you're gonna keep working on the desktop."
- **Rule:** in the desktop app, turn on Remote Control with the session tool (not `claude rc`). Then expect a resized pane and questions that must be asked in plain text.
- **Implemented:** `set_remote_control` on; instructions sent (Claude app → Code → this session; keep the computer awake). See `builder-quirks.md` section 10.

## 18. Give a teammate access, then tell him

**#54:** "We have to grant Moses access to the GHL account, so go into the GHL account and invite him with his email, once it's done email Moses letting him know you sent an invite"
- **Rule:** find the address from the person's mail (not from a guess), search Users first, add the user without a password, **ask which role** before saving (Admin includes billing), then draft the email and show it before sending.
- **Implemented:** address found in the teammate's own access-request thread; user created as Full Admin (the person's choice) with a placeholder last name; email drafted as a reply in that thread with the manager on cc.

**#55:** "send the email to Moses I approve"
- **Rule:** an explicit yes in the person's own words is the approval. An `AskUserQuestion` that comes back "Denied by user" is not a no to the email; re-ask in text.
- **Implemented:** sent unchanged, to the teammate, manager on cc.

## 19. Teammate can't load the dashboard

**(Later, the teammate's report; the owner replied "ok" to the workaround):** login works, then "Error while bootstrapping the session".
- **Rule:** check the user's type and sub-account first; if that's right, it isn't a permission setting. Try another browser/private window and cleared site data, then GHL support. Share an owner login only with the owner's explicit OK, and prefer fixing the teammate's own login.
- **Implemented:** user confirmed as "Account - admin" in the sub-account; owner-approved workaround: sign in with "Continue with Google" as the account owner. Outcome unknown.

---

## 20. Finishing and testing (Nov 23 and 24 2026)

**"do it again" / "everything else has to be finished, fully functional, and tested. And you can test yourself. You can turn on the testing mode"**
- **Rule:** finish means tested. Test what you can without the person, then ask them only for what you can't do (card, password, human check).
- **Implemented:** delivery on test contacts; funnel test mode; a two-order script for the person.

**"I don't want to put them in a GitHub or anything like that… put them inside their login"**
- **Rule:** paid files live behind the login. **Implemented:** lesson attachments; emails and thank-you page say where they are.

**"they should be able to find both courses in their account"**
- **Rule:** one login, everything bought side by side. **Implemented**; on a test contact the three courses are listed together (nobody has logged in as a buyer yet).

**About the "🎉 Welcome to The Starter Product List!" badge email: "just doesnt make any sense to send users… not in Rickey voice… they just need the access to their course or courses and the pdfs"**
- **Rule:** only on-brand emails with access. **Implemented:** badges and credentials to Draft, account course emails off; second test contact got exactly three emails.

**"the order bump… is optional, have you taken that into account?" / "ok as long as they dont get the products list if they didnt get the order bump"**
- **Rule:** nobody gets what they didn't buy; a conditional mention on the shared thank-you page is fine.
- **Implemented:** separate course, workflow and email; the box starts unticked (the checker tests it).

**"you can look at the AI avatars one, because that one was tested a long time ago and it was working"**
- **Rule:** a working funnel is a read-only reference: its live pages and lists, never its builder.

**"do another test where you buy offer 1 and then offer 2… when you buy offer 1 and you decline offer 2"**
- **Rule:** test accept and decline.

**"use Moses… for the support email… for now"**
- **Rule:** temporary values are written down as temporary and raised before launch.

**"So everything is ready except…?" / "be concise and clear"**
- **Rule:** answer with what's proven, what's built but unproven and what's missing, in a few lines. **"Later" means write it down and raise it once, at launch.**

---

## The meta-rules (what all of this adds up to)

1. Copy **structure** from references, never branding.
2. **Phone first:** every page is checked at 393×852; on the checkout, the form is on the first screen.
3. **Keep what was approved;** change only what was flagged.
4. The **bump lives only on the checkout** and must pop.
5. Copy is **5th-grade clear: one number, one promise.**
6. **HTML for design, native GHL only where money moves** (order form, YES button).
7. **Show, don't claim:** live URL + edit path + what's verified vs. open.
8. **Ask before** anything that grants access, sends a message, spends money, or touches what existed before.
9. **Nobody gets what they didn't buy,** and nobody gets an email that isn't in the client's voice.
10. **Look finished ≠ proven.** Read the real setting, use a test buyer, then a test order.

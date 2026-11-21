# Stage 12 of 12: Test and go live

**Goal:** the whole funnel is proven before real customers see it: `check_funnel.mjs` passes every step at phone and desktop size; every setting the checker can't see is confirmed by eye; one test purchase (made by the person, or in Stripe test mode with the person typing the test card) goes checkout + bump → YES → thank-you and delivers every email and the course login; every open item is either closed or listed; and the required sign-off (TJ for his projects) is given before any real traffic.

**Why:** at the end of Nov 20 Rickey's funnel looked finished but was not proven: no purchase had run, so nobody knew whether the bump and upsell emails fire, whether the YES charge works, or whether buyers can log in to the course. The YES action had been set by hand; the WhatsApp link was a placeholder (any email sent then had a broken link); the sender was GHL's default. A funnel that "looks done" and a funnel that delivers are different things.

**Read first:** `knowledge/safety-rules.md` (money, publishing, sign-off), `knowledge/pitfalls.md`.

## Before you start (inputs)
- Stages 5 to 11 done, `my-funnel/funnel.json` complete, `funnel-record.md` up to date.
- The person available for the test purchase and for the sign-off.

## Steps

### A. Automatic check (the whole funnel)
1. Run: `node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.json --out my-funnel/shots`. It drives headless Chrome at 393×852 (phone) and 1440×900 (desktop), never submits a form, never clicks buy, never enters card details. Save the printed output to `my-funnel/check-result.txt`.
2. Expect 8 PASS lines and **"All steps pass"**. For each FAIL, fix the cause (usually the fragment: push, poll, re-run). Don't report "all pass" unless the output says it.

### B. Settings the checker can't see (confirm by eye, write the result in the record)
3. **Funnel Settings:** domain, funnel path, Optimize JavaScript off (`aria-checked` = `"false"`).
4. **Step paths** (each step's Publishing tab) match the plan; the step order is Sales → Checkout → Upsell → Thank You.
5. **Checkout Form settings:** One-step; 2 contact fields; quantity, multi-product and coupons off; bump enabled with the approved texts; **After purchase = Go to the next funnel step** (zoom).
6. **Upsell YES:** in the builder, select YES → Button Actions → zoom: **link to = One click up/down sell product**, **Products = <upsell step product>**. If not set, the upsell is broken: stop and use Stage 7 step 13.
7. **Workflows:** each Published, trigger Order submitted + the right Global product, the right course, the approved email.
8. **Bump totals test** on the live checkout (Stage 6 snippet): base price → base + bump → base.
9. **Every page published** (each builder header: no yellow dot on Publish).

### C. The test purchase
10. ★ **Ask the person how to run it.** Claude never types a card number, test cards included, on a live domain.
    - **Option 1: the person buys for real** with their own card, on the live checkout, then refunds the charges themselves (Payments → Transactions). Simple and tests the real Stripe connection.
    - **Option 2: Stripe test mode.** The Nov 20 notes mention a funnel "payment mode" toggle but never recorded where it is. Look for a Test/Live payment-mode switch **scoped to this funnel** (start on the checkout step's Products tab and the funnel Settings). Use it only if it affects this funnel alone. **Never switch an account-wide Stripe test mode** while other funnels in the account take real payments (real buyers can't pay while in test mode). The person types Stripe's published test card. Switch back to live afterwards and confirm.
11. **The test script** (give it to the person, follow along on your screen if they share it):
    1. On a phone (or 393×852): open the sales page, tap the buy button → the checkout opens.
    2. Full Name + their own email; tick the bump; the total goes from base to base + bump.
    3. Pay. The page goes to the **upsell** (not the thank-you page: if it skips, After purchase is wrong).
    4. Tap **YES**. No card form appears; the page moves on to the **thank-you** page.
    5. Within about 2 minutes, three emails arrive: the main delivery email, the bump email, the upsell email. Every link works.
    6. "Open my course" → the client portal login. First-time login works (note whether GHL sent its own set-password email or "Forgot password" was needed).
    7. The community link opens (if set).
    8. Optional second run: same, but tap the **No thanks** link: it goes straight to the thank-you page, no upsell charge, no upsell email.
12. **What you check afterwards (read-only):**
    - Payments → Transactions (`payments/v2/transactions`): the main + bump charge and the separate upsell charge, right amounts, marked test or live as expected.
    - Contacts: one contact for the test buyer.
    - Automation → Workflows: each workflow's enrolled count went up by one.
    - Memberships: the course's member count went up by one (and the upsell course, if any).
13. **If an email didn't arrive:** check the workflow's enrolment history; if a one-click or bump purchase didn't fire "Order submitted", try the other payment triggers in the trigger search, re-test, and record the answer in `knowledge/feedback-log.md`. Update the email if GHL sends its own set-password email.
14. ★ **Refunds** are the person's to make (it moves money). List each test charge for them with its amount.

### D. Before real traffic
15. **Close or list every open item.** Typical list: placeholders (`GT_LINKS.whatsapp`, `GT_LINKS.support`, `WHATSAPP-LINK-GOES-HERE` in an email: search the repo and the emails for empty or placeholder values), sender name and email, course thumbnail and videos, upsell stack values to approve, a domain that is expiring or belongs to another brand (renew it, or switch before ads and add URL Redirects), the public repo (move code, images and PDFs into GHL before making it private), the auto-created Payments product (keep or not, the owner's call), any placeholder user last name.
16. ★ **Sign-off.** Send the sign-off person (TJ for his projects) the four live URLs, the checker result, the test purchase result and the open items. **Nothing goes to real customers (ads, emails, links) before their explicit yes.**
17. **Hand-off message** to the person, in a few lines: the 4 live URLs; the `check_funnel.mjs` result; what's still open (YES action if not set, links, videos, the test purchase, the sign-off); where `funnel-record.md` is.
18. **Feedback:** add anything new you learned (a quirk, a fix, a label that changed) to `knowledge/feedback-log.md`, dated, with the client name.

## Verify
- `my-funnel/check-result.txt` ends with "All steps pass", and `my-funnel/shots/` has 8 screenshots.
- Section B items each have a ✓ and the date in `funnel-record.md`.
- The test purchase: transactions, emails, course access and contact all seen; refunds listed for the person.
- The open-items list is complete and the sign-off is recorded (who, when).

## Rickey example values
- Live: `https://davidhsai.com/headstart-page` → `/headstart-checkout` → `/headstart-upsell` → `/headstart-thank-you`. `examples/rickey-headstart-funnel/funnel.json` is the checker input.
- Status at the end of Nov 20: pages live and checked at phone and desktop; YES action set by David by hand; **no test purchase yet** (the checkout is on live Stripe; Claude offered "David buys once with the bump, checks both emails and the course login, then refunds" or "switch the funnel to Stripe test mode and buy with a test card"); upsell delivery not built; WhatsApp link, support email, sender, videos, thumbnail and upsell values open; domain `davidhsai.com` expiring soon and owned by another brand; Moses's own login blocked by the bootstrapping error.
- Sign-off rule: TJ signs off before real traffic.
- Moses's copy file sets the bar for the test: "this email arrives in under 2 minutes with every link working, course login works, channel link opens."

## ★ Gates (ask the person)
- How the test purchase is made (they buy and refund, or Stripe test mode with them typing the test card).
- Refunds (theirs to make).
- Go-live sign-off (TJ for his projects).

## Done when
- [ ] `check_funnel.mjs`: All steps pass (output saved, screenshots saved).
- [ ] Every non-checker setting confirmed and recorded, the YES action included.
- [ ] Test purchase done the safe way, with every delivery seen, or explicitly postponed by the person and listed.
- [ ] Open items listed; sign-off given before any real traffic.
- [ ] Hand-off message sent; `funnel-record.md` complete; lessons added to `knowledge/feedback-log.md`.

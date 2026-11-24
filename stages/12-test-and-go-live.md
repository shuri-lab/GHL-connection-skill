# Stage 12 of 12: Test and go live

**Goal:** the whole funnel is proven before real customers see it: `check_funnel.mjs` passes every step at phone and desktop size (exit code 0); every setting the checker can't see is confirmed by eye; two test orders, one that declines the bump and the upsell and one that takes both (made by the person: with their own card, or with Stripe's published test card in a test mode that affects only this funnel; the person types the card either way): both deliver exactly what was bought (emails, courses, login); every open item is either closed or listed; and the required sign-off (TJ for his projects) is given before any real traffic.

**Why:** at the end of Nov 20 Rickey's funnel looked finished but was not proven: no purchase had run, so nobody knew whether the bump and upsell emails fire, whether the YES charge works, or whether buyers can log in to the course. The YES action had been handed to David to set by hand and was never confirmed; the WhatsApp link was a placeholder (any email sent then had a broken link); the sender was GHL's default. A funnel that "looks done" and a funnel that delivers are different things.

**Read first:** `knowledge/safety-rules.md` (money, publishing, sign-off), `knowledge/pitfalls.md`.

## Before you start (inputs)
- Stages 5 to 11 done, `my-funnel/funnel.json` complete, `funnel-record.md` up to date.
- The person available for the two test orders and for the sign-off.

## Steps

### A. Automatic check (the whole funnel)
1. Run: `node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.json --out my-funnel/shots`. It drives headless Chrome at 393×852 (phone) and 1440×900 (desktop), never submits a form, never clicks buy, never enters card details. Save the printed output to `my-funnel/check-result.txt`.
2. Expect 8 PASS lines, **"All steps pass"** and exit code 0 (`echo $?` right after the run; any FAIL line makes it 1). For each FAIL, fix the cause (usually the fragment: push, poll, re-run). Don't report "all pass" unless the output says it.

### B. Settings the checker can't see (confirm by eye, write the result in the record)
3. **Funnel Settings:** domain, funnel path, Optimize JavaScript off (`aria-checked` = `"false"`).
4. **Step paths** (each step's Publishing tab) match the plan; the step order is Sales → Checkout → Upsell → Thank You.
5. **Checkout Form settings:** One-step; 2 contact fields; quantity, multi-product and coupons off; bump enabled with the approved texts; **After purchase = Go to the next funnel step** (zoom).
6. **Upsell YES:** the checker's line must read `YES sells (…)`. Anything else: Stage 7, section D.
7. **Workflows:** each Published, trigger Order submitted + the right Global product (zoom the trigger card: `Global product is in '<Client> · …'`), the right course, the buyer tag, the approved email and sender; 0 enrolled before B2.
8. **Bump totals test** on the live checkout (Stage 6 snippet): base price → base + bump → base.
9. **Every page published** (each builder header: no yellow dot on Publish).

### B2. Prove the delivery without buying (Claude does it, with the person's OK for the addresses and their look at the inbox)
This proves the workflows' actions, the emails and which courses each contact gets. It does **not** prove the checkout, the triggers or what a buyer sees after logging in.

Check every workflow reads 0 enrolled first. If Stage 0 flagged a workflow that starts on **Contact created** or on a tag, ask before adding contacts: they would get that client's emails.
1. **Contacts → + Add** (pane at native size; wait 20 s for the list to load fully, or you open someone else's contact). Two test contacts on the person's own inbox, `+contact1` and `+contact2` (never reuse them for the orders), with their OK: "<Client>test Main", "<Client>test Everything".
2. Contact → **Actions** → expand **Workflows** → **+** next to Active workflows → **Add automation** → type part of the workflow name → **hover the option, wait 1 s, press Return** (a plain click doesn't register) → **Add** is solid blue → click it. First contact: the main workflow only. Second: all three.
3. Wait 30 s. **Actions → Client portal → Course Access:** the first contact shows **only the main course** (this is the proof that the bump isn't given away), the second shows all three.
4. Read each email in the contact's conversation (`?center=conversations`, 1600×1100; its frames are readable by script) **and** ★ ask the person to look at the received ones: inbox or spam, links, only your emails and no badge or other-brand email.
5. Open the sign-in link from one email: it must reach "Set new password" under a neutral portal name. Stop there.
6. Write the enrolled counts after B2 (main 2, bump 1, upsell 1). The test contacts stay until the person says to delete them.

### C. The two test orders
10. ★ **Ask the person how to run it.** The person types the card in every option. Claude never types any card number, Stripe test cards included.
    - **Option 1 (default): test mode for this funnel only.** Sites → Funnels → the funnel → **Settings** → **Payments & checkout** → **Payment mode** (on = Live, off = **Test**). It affects this funnel only. ★ Get their yes (real buyers can't pay meanwhile), switch it, click **Save by ref**, reload and read "Test"; then check the live checkout shows the **TEST MODE** label and a `pk_test` key. The switch by script, then Save:
      ```js
      const f=k=>{const t=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()===k);let row=t;for(let i=0;i<7&&row;i++){if(row.querySelector('.hr-switch'))break;row=row.parentElement;}return row.querySelector('.hr-switch')};
      const s=f('Payment mode'),before=s.getAttribute('aria-checked');if(before==='true')s.click();await new Promise(r=>setTimeout(r,1500));({before,after:s.getAttribute('aria-checked')})
      ```
      The person types Stripe's test card **4242 4242 4242 4242**, any future date, any CVC, **in their normal Chrome**. Not in Claude's pane: Cloudflare's "Verify you are human" fails there even when a person ticks it, and Claude never works around it and never types a card.
    - **Option 2: a real purchase** with their own card, then refunded by them (Payments → Transactions). The money lands in the Stripe connected to this sub-account, and Stripe keeps its fee on refunds. Say both first.
    - **Never** touch Payments → Integrations: an account-wide test mode blocks every buyer in the sub-account.
    - **After the test: switch Payment mode back to Live, the same day, even if the test was postponed or failed** (unless the person says to leave it). The same script with `if(before==='false')`; expect `after:"true"`; Save by ref; reload; re-read. Then run `node PLAYBOOK/tools/check_funnel.mjs my-funnel/funnel.json --live --out my-funnel/shots > my-funnel/check-result.txt`: it fails while the funnel is in test mode. Add a row to "Payment mode" in `funnel-record.md`.
11. **The test script: two orders** (give it to the person):

    | | Order 1 | Order 2 |
    |---|---|---|
    | Email | their inbox + `+test1` | their inbox + `+test2` |
    | Bump | leave unticked (total = base) | tick it (total = base + bump) |
    | Upsell | **No thanks** | **YES** (wait about 10 s for the button; no card form appears) |
    | Should receive | the main email only; main course only | three emails; all three courses under one login |

    Each time: start on the sales page on a phone, the checkout asks only for name, email and card (no address), and after paying the page goes to the **upsell** (if it skips it, After purchase is wrong). Then as the buyer: open the email's sign-in link, choose a password, see exactly the courses bought (and no other client's), download every file, open the community link. Then copy one downloaded file's address into a **private window**: write down whether it opens without logging in, and tell the owner if it does. Pay by **card**: whether bank, Cash App or Amazon Pay support the one-click upsell is unknown, so consider leaving only cards on (★ the owner's setting).
12. **What you check afterwards (read-only):**
    - Payments → Transactions (`payments/v2/transactions`): order 1 = the main price only; order 2 = main + bump, plus a separate upsell charge; right amounts, marked test or live as expected, and the statement descriptor if one was set.
    - Contacts: two (`+test1`, `+test2`), with the buyer tags of what each bought. **`+test1` has only the main course.**
    - Automation → Workflows: enrolled main +2, bump +1, upsell +1.
    - Memberships: course members main +2, bump +1, upsell +1.
13. **If an email didn't arrive:** check the workflow's enrolment history; if a one-click or bump purchase didn't fire "Order submitted", try the other payment triggers in the trigger search, re-test, and record the answer in `knowledge/feedback-log.md`. Update the email if GHL sends its own set-password email.
14. ★ **Refunds** are the person's to make (it moves money). List each test charge for them with its amount.

### D. Before real traffic
15. **Close or list every open item.** First: **Payment mode is Live**. Then the typical list: no privacy/terms links, no tracking, refund → access decision, dedicated sending domain, temporary support email, test contacts to delete, paid files in any public place (ask the owner to check the repos' visibility), GHL's move of classic courses and portal on Dec 1 2026 (recheck access after it), placeholders (`GT_LINKS.whatsapp`, `GT_LINKS.support`, `WHATSAPP-LINK-GOES-HERE` in an email: search the repo and the emails for empty or placeholder values), sender name and email, Stripe account and statement descriptor, portal branding, legal links and the Terms checkbox, tracking ids, the tax decision, other clients' flagged workflows (Stage 0), paid files still on public hosting, course thumbnail and videos, upsell stack values to approve, a domain that is expiring or belongs to another brand (renew it, or switch before ads and add URL Redirects), the public repo (move code and images into GHL before making it private), the auto-created Payments product (keep or not, the owner's call), any placeholder user last name.
16. ★ **Sign-off.** Send the sign-off person (TJ for his projects) the four live URLs, the checker result, the test orders' result and the open items. **Nothing goes to real customers (ads, emails, links) before their explicit yes.**
17. **Hand-off message** to the person, in a few lines: the 4 live URLs; the `check_funnel.mjs` result; what's still open (payment mode, links, videos, the test orders, the sign-off); where `funnel-record.md` is.
18. **Feedback:** add anything new you learned (a quirk, a fix, a label that changed) to `knowledge/feedback-log.md`, dated, with the client name.

## Verify
- `my-funnel/check-result.txt` ends with "All steps pass", and `my-funnel/shots/` has 8 screenshots.
- Section B items each have a ✓ and the date in `funnel-record.md`.
- The two test orders: transactions, emails, course access and contacts all seen; refunds listed for the person (real purchases only).
- **Payment mode is Live** again: `"true"` after a reload, no TEST MODE on the live checkout, `check_funnel.mjs … --live` passes.
- The open-items list is complete and the sign-off is recorded (who, when).

## Rickey example values
- Live: `https://davidhsai.com/headstart-page` → `/headstart-checkout` → `/headstart-upsell` → `/headstart-thank-you`. `examples/rickey-headstart-funnel/funnel.json` is the checker input.
- Status on Nov 24: pages live; `check_funnel.mjs` passes all 8 with `YES sells`; delivery proven on two test contacts added to the workflows by hand (main only → one course; all three → three courses under one contact; the sign-in link reached "Set new password"); the person received the emails. Nobody has logged in as a buyer yet. **Not yet:** the two test orders, Live mode (the funnel is in Test), final domain, videos, legal links, tracking, dedicated sending domain, TJ's sign-off.
- Sign-off rule: TJ signs off before real traffic.
- Moses's copy file sets the bar for the test: "this email arrives in under 2 minutes with every link working, course login works, channel link opens."

## ★ Gates (ask the person)
- The test contacts' addresses (B2) and a look at the inbox.
- Switching the funnel to test mode and back to live; how the test orders are made (the person types the card).
- Refunds (theirs to make).
- Go-live sign-off (TJ for his projects).

## Done when
- [ ] `check_funnel.mjs`: All steps pass (output saved, screenshots saved).
- [ ] Every non-checker setting confirmed and recorded, the YES action included.
- [ ] Payment mode = Live, proven (row in `funnel-record.md`), or the person chose to leave it in Test and it's the first open item.
- [ ] Two test orders done the safe way, with every delivery seen, or explicitly postponed by the person and listed.
- [ ] Open items listed; sign-off given before any real traffic.
- [ ] Hand-off message sent; `funnel-record.md` complete; lessons added to `knowledge/feedback-log.md`.

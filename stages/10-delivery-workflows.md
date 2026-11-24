# Stage 10 of 12: Delivery workflows

**Goal:** one published workflow per product, each triggered by **Order submitted** and filtered on that product (zoom-checked before publishing), that delivers it and tags the buyer: the main product grants the main course, the bump grants only its own small course, the upsell grants only its own course (or sends its booking or invite link); each sends its own email. The email text and the sender are approved by the person.

**Why:** without these, a buyer pays and gets nothing. On Rickey's build:
- GHL can't show or hide parts of one email depending on whether the bump was bought, so each product got **its own** workflow and email.
- The trigger filter must use the **catalog product the funnel step sells** (`Rickey · TikTok Shop Headstart`), not the product auto-created by the course.
- The email body typed in one go got garbled (dropped keystrokes, "Hey" twice); select-all stopped working in the source box; the editor stripped paragraph spacing; and a **From name** without a **From email** blocked saving.
- Nov 23: the upsell delivery was built, and all three workflows were tested on test contacts (added to the workflows by hand: right courses under one contact, right emails). No order has gone through yet, so the **triggers** are still unproven. Stage 12 closes that.
- GHL sends its own emails on top of yours: account-wide course emails (on a shared account, in **another client's brand**) and the Welcome Badge. Section D2 turns them off.
- A saved sender silently didn't stick once. Every save is now checked after a reload.
- On a **shared** account a published workflow whose product filter didn't save fires on the other client's real orders: it emails their buyers and grants them a course. So the filter is zoom-checked before every Publish.

**Read first:** `knowledge/memberships-and-workflows.md`, `knowledge/builder-quirks.md` (custom dropdowns, chunked typing).

## Before you start (inputs)
- The catalog product names (Stage 3), the course(s) (Stage 9), the client portal URL, where the paid files live (each product's own course lesson, Stage 9), and for a calls or community upsell the booking or invite link.
- The approved email copy (from the Sales Page Playbook, Part 2: `dist/emails/`; Rickey's: `examples/rickey-headstart-funnel/emails/published-emails.md`; the v1 copy next to it is history, don't adapt it).
- The sender decision from Stage 1 (Money and identity). Use the default sender **only after you have read it** (Settings → Business Profile and Settings → Email Services, read-only; the Stage 0 audit row) **and the person said yes to it**. Otherwise use the client's From name and From email they gave.
- The buyer tag names from the plan (`<client>-<product>-buyer`).
- The Stage 0 list of flagged Published workflows: those fire for your buyers too, and the owner has decided what to do. Don't edit them.

## Steps (one workflow; repeat per product)

**Before you touch it:** the workflow builder loads slowly (wait 16 to 28 s) and sits in a cross-origin frame, so page JavaScript can't read it: use screenshots and zooms. Use 1440×1000 inside the builder; the workflow **list** and its menus only open at the pane's native size (`resize_window` preset desktop). A workflow's Draft/Publish toggle can show "Draft" while it loads: zoom again before acting. **Duplicating a workflow never worked** (its menu doesn't open): build each from scratch.

### A. Create and name
1. Sidebar **Automation** → **Workflows** (`…/v2/location/{loc}/automation/workflows`; it reports a 404 note and then loads after a few seconds, landing on `?listTab=all`). The page has "Create folder", "Build using AI", **"+ Create workflow"**, tabs All workflows / Needs review / Deleted, "Global Workflow Settings". Don't touch existing workflows (Rickey's account had two empty drafts).
2. **+ Create workflow** → **Start from scratch**. A prompt about the saving mode may appear: keep **manual save**, so no account-level setting changes. The workflow opens at `…/automation/workflow/{id}` (singular "workflow"). Copy the id.
3. **Rename:** click the title at the top (pencil) → clear it (`End`, `Backspace` until empty) → type `<Client> · <Product> delivery` (e.g. `Rickey · Headstart delivery`) → `Return`.

### B. Trigger: Order submitted, filtered on one product
4. **Add new trigger** → search `order` → under **Payments** there are "Order form submission" and **"Order submitted"** ("Fires after checkout completion in Funnel/Store"). Pick **Order submitted**.
5. (If a text file shows the product without the client prefix, still pick the prefixed catalog product.) **Filters** → Select → **Standard fields** → **Global product** (other options: Order source, custom fields) → operator **Is** → the product list: type part of the name (Rickey: `Headstart`) → **hover** the catalog product `<Client> · <Product>` → click it → zoom to check you didn't pick the course's auto-created product of the same name without the prefix.
6. **Save trigger.** Then **zoom on the trigger card**: it must read `Global product is in '<Client> · …'` with your product. If the filter line is missing or shows another product, open the trigger again, set the filter, save, and zoom again. Never leave a trigger without its filter.

### C. Grant course access (this product's own course only), then tag the buyer
7. Click **+** under the trigger → search `course` → **Grant course access** ("Give a contact access to a course"; pick it by name: "Course grant offer" and the revoke actions are listed next to it) → **Course** = the course (hover, click) → **Save action**.
7b. **+** → search `tag` → **Add Tag** → type the tag from the plan (`<client>-<product>-buyer`, e.g. `acme-reset-buyer`; create it if GHL offers "create") → **Save action**. Every product's workflow gets its own tag. It lets the client find their buyers and lets other clients' broadcasts exclude them. (Not built on Nov 20; check the action's label on screen.)
8. **Save the workflow** (top right). Save after every action.

### D. Send email
9. **+** → search `send email` → **Send email**. Fill:
   - **Action name:** e.g. `Delivery email`.
   - **From name / From email:** both or neither. A From name without a From email shows a field error and won't save. Leave both empty (GHL's default sender) **only** if you read the default sender and the person accepted it (inputs above); otherwise type the client's From name and From email. If the sender is still undecided, stop at the ★ gate below; don't publish.
   - **Subject** and **Preview text** from the approved copy.
   - **Before typing any body:** in the Sales Page Playbook run `build_funnel_pages.py … --check`: no `[links.…]` CHECK may be left for a link an email uses (an empty link is built as plain bold text and looks normal). Every course email must contain `membership_contact`; a calls or community upsell email has its booking or invite link instead. Then match each `[label](key)` in the JSON to an `<a>` in `dist/emails/`.
10. **Body through the source view:** in the email editor open the **source code** view (`<>`). It sits in a cross-origin frame: `find` and `form_input` can't reach it, and modifier keys may not either. So:
    - If the editor isn't empty: **Cancel** the source dialog → in the visual editor click the body → `cmd+a` → `Backspace` (select-all works there) → reopen the source view.
    - Type **one paragraph per `type` action** (about 100 to 230 characters; split a longer one at a space into two actions), wait 1 s between, and zoom after each batch.
    - Put an inline style on **every** `<p>`, or the editor removes the spacing: `style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6"`.
    - Links: `style="color:<brand accent>;font-weight:bold"` (Rickey: `#D30805`).
    - Paid files: say where they are ("in the first lesson"), never a public URL, never an attachment link anyone can forward.
    - Merge fields: `{{contact.first_name}}`, `{{contact.email}}`, and **`{{membership_contact.login_url}}`** = the one-click sign-in link (Custom values → group "Client Portal Contact" → "Login URL (Magic Link)"; valid 24 h). Use it for the main "Open my …" link and say so: "This link signs you in and works for 24 hours. The first time, you'll choose your password." Add the plain portal link as a second way in.
    - The emails come ready-made from the Sales Page Playbook, Part 2: `dist/emails/*.html`, one `<p>` per line.
11. **Saving, in this exact order:** source modal **Save** → wait 3 s → **Save action** → wait 5 s → **screenshot: the panel has closed and the top-right button is a blue Save with a red dot** → top **Save** → wait 6 s → zoom: grey **Saved**. Then **reload the workflow, reopen the action and read the sender, subject and body**. Never click the top Save while the panel is still open: that is how a sender change was lost. If GHL flags a field, scroll up to find it.
12. ★ **Show the person the final email text** (subject, preview, body with the links) and the sender (From name and email, or "default sender: <what you read>") before publishing. Once published and the funnel has traffic, it goes to real buyers.
13. **Before Publish, zoom the trigger card once more.** It must read `Global product is in '<Client> · …'` with this workflow's product. **If it doesn't, do not publish.** Fix the filter (step 5) first.
14. **Publish:** the toggle at the top from **Draft** to **Publish**, then Save. The workflow list shows it as Published.
15. **Right after publishing:** the list shows **0 enrolled**, and it must stay 0 until you add your own test contacts (Stage 12 B2: main 2, bump 1, upsell 1). Any enrollment whose contact isn't yours means the workflow caught someone else's order: set it back to **Draft** at once, tell the person, and check the filter.

### D2. Turn off GHL's own emails (once per account, ★ ask first: the setting is account-wide)
16. **Memberships → Client Portal ▾ → Settings → Email Settings → Courses tab** (click the tab; the `#courses` link doesn't always open it). Read every row and open the eye icon to see the template each one sends. On Rickey's shared account, "Course sign-up" said "Welcome to the AI Avatars System!!", another client's brand, and would have gone to every Rickey buyer.
17. Find out **how the other clients deliver** before changing anything: Courses ▾ → **Offers** (`…/courses/offers-list-v2`). AI Avatars delivers by **Offers**, Rickey by **Courses**, so unticking only **Course sign-up** and **Course access** was safe; the **Offer** rows were left alone. If another client also uses Courses, stop and ask.
18. It saves by itself. Reload and read it back. Write each row's name and value, before and after, in `funnel-record.md`. (Rickey's account after the change: Course sign-up off, Offer sign-up on, Course access off, Offer access on.) The unticked rows then show "Default Template"; ticking them again may not bring the old template back, so note what was there first.
19. Badges and certificates: Stage 9 step 9b, on every course.
20. **Proof:** a fresh test contact gets exactly your emails and nothing else (Stage 12, section B2).

### E. The three workflows
| Workflow | Trigger filter (Global product Is) | Actions |
|---|---|---|
| `<Client> · <Main> delivery` | the main catalog product | Grant course access (main course) → Add tag `<client>-<main>-buyer` → Send email (course link + login + where the guides are + community) |
| `<Client> · <Bump> delivery` | the bump catalog product | **Grant course access (the bump's own small course)** → Add tag `<client>-<bump>-buyer` → Send email ("Open my …" sign-in link) |
| `<Client> · <Upsell> delivery` | the upsell catalog product | Grant course access (upsell course, if it is one) → Add tag `<client>-<upsell>-buyer` → Send email (course link, or the booking link for calls, or the invite link for a community: templates C, C2, C3 in `knowledge/memberships-and-workflows.md`) |

- **Nobody gets what they didn't buy:** main workflow → main course only; bump workflow → bump course only; upsell workflow → upsell course only; and the main email never names the bump or the upsell. Check all three before publishing.
- **Refunds:** should a refunded buyer lose access? Ask. The action exists (**Revoke course access**); Rickey's isn't built because it wasn't decided.
- Whether a **one-click upsell** charge and a **bump** fire "Order submitted" with that product as the Global product is **not yet proven** (no order has completed as of Nov 24). The Stage 12 test must show each email arriving. If the upsell or bump email doesn't arrive, look in the trigger search under Payments for another payment trigger, test again, and write what worked in `knowledge/feedback-log.md`.

## Verify
- Each workflow canvas (screenshot + zoom): the trigger with the right "Global product is in '…'" text → the actions in order (course, tag, email). Each shows **Published** and **0 enrolled** until your own test contacts (Stage 12 B2).
- Each email preview: greeting with the merge field, every link present and pointing at the right URL (sign-in link, portal, community), no duplicated lines, paragraphs spaced.
- The workflows list: your workflows with the client prefix; the existing ones unchanged.
- Placeholders still in any email (e.g. `https://WHATSAPP-LINK-GOES-HERE`) are listed in `funnel-record.md` → Open items. An email sent with a placeholder has a broken link.
- End-to-end delivery is verified in Stage 12.

## Sender and inbox
- Set both From name and From email, unless the person accepted the default sender in writing. An address at the client's own domain that GHL isn't authorised to send from (no DNS records) showed as sent but **wasn't seen** in the inbox we could check; GHL's shared address (`reply@amail.msgsndrlf.com`, name = the founder) **reached the inbox** for one of the three emails. The person confirmed getting the emails; nobody recorded inbox or spam.
- The lasting fix is a **dedicated sending domain** (Settings → Email Services → Dedicated Domain) on the client's final domain: the person adds its DNS records. List it as a launch item.
- GHL's "Delivered" doesn't mean inbox. The Gmail connector can't see Spam. ★ Ask the person to look at Inbox, Promotions and Spam.
- Delivered links are rewritten to GHL's tracking address even with Track clicks off, and GHL adds an unsubscribe line. Click the links in a **received** email.

## Rickey example values (as published Nov 23)
Sender on all three: Rickey, `reply@amail.msgsndrlf.com`. No buyer tags were added (a gap: add them). The texts are in `examples/rickey-headstart-funnel/emails/published-emails.md`.

| Workflow | Trigger: Order submitted, Global product Is | Actions |
|---|---|---|
| `Rickey · Headstart delivery` | `Rickey · TikTok Shop Headstart` | Grant "TikTok Shop Headstart" → "You're in. Here's Day 1" |
| `Rickey · Starter Product List delivery` | `Rickey · The Starter Product List` | Grant "The Starter Product List" → "Your Starter Product List" |
| `Rickey · System delivery` | `Rickey · My $4M TikTok Shop System` | Grant "My $4M TikTok Shop System" → "Your $4M TikTok Shop System is ready" |

## ★ Gates (ask the person)
- Approve each email's final text before publishing.
- Turning off the account's course emails (account-wide).
- Refund → revoke access, or not.
- Sender name and sender email, or the default sender after you've shown them what it is.

## Done when
- [ ] One workflow per product, named with the client prefix, ids recorded.
- [ ] Each trigger = Order submitted + Global product Is the right catalog product, zoom-checked before Publish; 0 enrolled after publishing, until your own test contacts.
- [ ] Each workflow grants only its own product's course (an upsell that is calls or a community grants none); each adds its buyer tag; every email has working links and spacing.
- [ ] Email text and sender approved; workflows published; each action reopened after a reload and read.
- [ ] GHL's own course emails and badges are off, and a test contact received only your emails.
- [ ] Placeholders and the sender listed as open items if still missing.

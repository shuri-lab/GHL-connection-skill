# Stage 10 of 12: Delivery workflows

**Goal:** one published workflow per product, each triggered by **Order submitted** and filtered on that product (zoom-checked before publishing), that delivers it and tags the buyer: the main product grants the course and sends the delivery email; the bump sends its download email; the upsell grants its course (or sends its booking or invite link) and sends its email. The email text and the sender are approved by the person.

**Why:** without these, a buyer pays and gets nothing. On Rickey's build:
- GHL can't show or hide parts of one email depending on whether the bump was bought, so each product got **its own** workflow and email.
- The trigger filter must use the **catalog product the funnel step sells** (`Rickey · TikTok Shop Headstart`), not the product auto-created by the course.
- The email body typed in one go got garbled (dropped keystrokes, "Hey" twice); select-all stopped working in the source box; the editor stripped paragraph spacing; and a **From name** without a **From email** blocked saving.
- The upsell delivery was never built, and no purchase ever ran, so these workflows are still untested end to end. Stage 12 closes that.
- On a **shared** account a published workflow whose product filter didn't save fires on the other client's real orders: it emails their buyers and grants them a course. So the filter is zoom-checked before every Publish.

**Read first:** `knowledge/memberships-and-workflows.md`, `knowledge/builder-quirks.md` (custom dropdowns, chunked typing).

## Before you start (inputs)
- The catalog product names (Stage 3), the course(s) (Stage 9), the client portal URL, where the paid files live (the course lesson or GHL Media, Stage 9), and for a calls or community upsell the booking or invite link.
- The approved email copy (Rickey: `examples/rickey-headstart-funnel/emails/moses-thank-you-and-delivery-copy-v1.md`).
- The sender decision from Stage 1 (Money and identity). Use the default sender **only after you have read it** (Settings → Business Profile and Settings → Email Services, read-only; the Stage 0 audit row) **and the person said yes to it**. Otherwise use the client's From name and From email they gave.
- The buyer tag names from the plan (`<client>-<product>-buyer`).
- The Stage 0 list of flagged Published workflows: those fire for your buyers too, and the owner has decided what to do. Don't edit them.

## Steps (one workflow; repeat per product)

### A. Create and name
1. Sidebar **Automation** → **Workflows** (`…/v2/location/{loc}/automation/workflows`; it reports a 404 note and then loads after a few seconds, landing on `?listTab=all`). The page has "Create folder", "Build using AI", **"+ Create workflow"**, tabs All workflows / Needs review / Deleted, "Global Workflow Settings". Don't touch existing workflows (Rickey's account had two empty drafts).
2. **+ Create workflow** → **Start from scratch**. A prompt about the saving mode may appear: keep **manual save**, so no account-level setting changes. The workflow opens at `…/automation/workflow/{id}` (singular "workflow"). Copy the id.
3. **Rename:** click the title at the top (pencil) → clear it (`End`, `Backspace` until empty) → type `<Client> · <Product> delivery` (e.g. `Rickey · Headstart delivery`) → `Return`.

### B. Trigger: Order submitted, filtered on one product
4. **Add new trigger** → search `order` → under **Payments** there are "Order form submission" and **"Order submitted"** ("Fires after checkout completion in Funnel/Store"). Pick **Order submitted**.
5. **Filters** → Select → **Standard fields** → **Global product** (other options: Order source, custom fields) → operator **Is** → the product list: type part of the name (Rickey: `Headstart`) → **hover** the catalog product `<Client> · <Product>` → click it → zoom to check you didn't pick the course's auto-created product of the same name without the prefix.
6. **Save trigger.** Then **zoom on the trigger card**: it must read `Global product is in '<Client> · …'` with your product. If the filter line is missing or shows another product, open the trigger again, set the filter, save, and zoom again. Never leave a trigger without its filter.

### C. Grant course access (main and upsell only), then tag the buyer
7. Click **+** under the trigger → search `course` → **Grant course access** ("Give a contact access to a course") → **Course** = the course (hover, click) → **Save action**.
7b. **+** → search `tag` → **Add Tag** → type the tag from the plan (`<client>-<product>-buyer`, e.g. `acme-reset-buyer`; create it if GHL offers "create") → **Save action**. Every product's workflow gets its own tag. It lets the client find their buyers and lets other clients' broadcasts exclude them. (Not built on Nov 20; check the action's label on screen.)
8. **Save the workflow** (top right). Save after every action.

### D. Send email
9. **+** → search `send email` → **Send email**. Fill:
   - **Action name:** e.g. `Delivery email`.
   - **From name / From email:** both or neither. A From name without a From email shows a field error and won't save. Leave both empty (GHL's default sender) **only** if you read the default sender and the person accepted it (inputs above); otherwise type the client's From name and From email. If the sender is still undecided, stop at the ★ gate below; don't publish.
   - **Subject** and **Preview text** from the approved copy.
10. **Body through the source view:** in the email editor open the **source code** view (`<>`). It sits in a cross-origin frame: `find` and `form_input` can't reach it, and modifier keys may not either. So:
    - If the editor isn't empty: **Cancel** the source dialog → in the visual editor click the body → `cmd+a` → `Backspace` (select-all works there) → reopen the source view.
    - Type **one paragraph per `type` action** (about 100 to 230 characters), wait 1 s between, and zoom after each batch.
    - Put an inline style on **every** `<p>`, or the editor removes the spacing: `style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6"`.
    - Links: `style="color:<brand accent>;font-weight:bold"` (Rickey: `#D30805`).
    - Paid files: link to the course lesson (or the GHL Media URL the person gave), never to a public Pages URL.
    - Merge fields: `{{contact.first_name}}`, `{{contact.email}}`.
11. **Save** the source → check the preview in the action panel → **Save action** → **Save** the workflow. If GHL flags a field problem, scroll up to find it (it was the From name).
12. ★ **Show the person the final email text** (subject, preview, body with the links) and the sender (From name and email, or "default sender: <what you read>") before publishing. Once published and the funnel has traffic, it goes to real buyers.
13. **Before Publish, zoom the trigger card once more.** It must read `Global product is in '<Client> · …'` with this workflow's product. **If it doesn't, do not publish.** Fix the filter (step 5) first.
14. **Publish:** the toggle at the top from **Draft** to **Publish**, then Save. The workflow list shows it as Published.
15. **Right after publishing:** the list shows **0 enrolled** for this workflow, and it must stay 0 until your Stage 12 test purchase. If the count goes up before that, the workflow caught someone else's order: set it back to **Draft** at once, tell the person, and check the filter.

### E. The three workflows
| Workflow | Trigger filter (Global product Is) | Actions |
|---|---|---|
| `<Client> · <Main> delivery` | the main catalog product | Grant course access (main course) → Add tag `<client>-<main>-buyer` → Send email (course link + login + where the guides are + community) |
| `<Client> · <Bump> delivery` | the bump catalog product | Add tag `<client>-<bump>-buyer` → Send email (bump download: GHL Media link, or Grant course access to a small bump course first) |
| `<Client> · <Upsell> delivery` | the upsell catalog product | Grant course access (upsell course, if it is one) → Add tag `<client>-<upsell>-buyer` → Send email (course link, or the booking link for calls, or the invite link for a community: templates C, C2, C3 in `knowledge/memberships-and-workflows.md`) |

- Whether a **one-click upsell** charge and a **bump** fire "Order submitted" with that product as the Global product is **not yet proven** (no purchase ran on Nov 20). The Stage 12 test must show each email arriving. If the upsell or bump email doesn't arrive, look in the trigger search under Payments for another payment trigger, test again, and write what worked in `knowledge/feedback-log.md`.

## Verify
- Each workflow canvas (screenshot + zoom): the trigger with the right "Global product is in '…'" text → the actions in order (course, tag, email). Each shows **Published** and **0 enrolled**.
- Each email preview: greeting with the merge field, every link present and pointing at the right URL (course portal, PDFs), no duplicated lines, paragraphs spaced.
- The workflows list: your workflows with the client prefix; the existing ones unchanged.
- Placeholders still in any email (e.g. `https://WHATSAPP-LINK-GOES-HERE`) are listed in `funnel-record.md` → Open items. An email sent with a placeholder has a broken link.
- End-to-end delivery is verified in Stage 12.

## Rickey example values
Rickey's workflows had no buyer tag, used the default sender without reading it, and link the guides to public Pages PDFs: three gaps the steps above now close.

**`Rickey · Headstart delivery`** (id `ff695f45-2300-420a-a945-b2ad6a6b7a50`): Order submitted, Global product Is `Rickey · TikTok Shop Headstart` → Grant course access "TikTok Shop Headstart" → Send email "Delivery email", Subject "You're in. Here's Day 1", Preview "Your course login, your guides and the Rickey Army link.", default sender. Body (each `<p>` carries the inline style above; the last uses `margin:0`):
```html
<p …>Hey {{contact.first_name}},</p>
<p …>You're in. Here's everything in one place:</p>
<p style="margin:0 0 12px;…">1. Your course: <a href="https://54ejrjbw49ecsisozh44.app.clientclub.net/" style="color:#D30805;font-weight:bold">Open my course</a>. Your login: {{contact.email}}. First time in? Click "Forgot password" on the login page to set your password.</p>
<p style="margin:0 0 12px;…">2. Your 30-Day Guide: <a href="https://shuri-lab.github.io/rickey-tiktokshop-project/downloads/30-day-first-sale-challenge.pdf" style="color:#D30805;font-weight:bold">Download</a></p>
<p …>3. The Rickey Army, my private WhatsApp channel: <a href="https://WHATSAPP-LINK-GOES-HERE" style="color:#D30805;font-weight:bold">Join</a></p>
<p …>Do Day 1 today. It's about 15 minutes, and it's the one that gets you moving.</p>
<p …>Rickey</p>
<p style="margin:0;…">P.S. Stuck on anything? Just reply to this email.</p>
```
**`Rickey · Starter Product List delivery`** (id `adcfb2b0-a859-4660-9d94-9ae04a2700a4`): Order submitted, Global product Is `Rickey · The Starter Product List` → Send email "Starter Product List email", Subject "Your Starter Product List", Preview "Pick your first products tonight instead of guessing.", body: "Hey {{contact.first_name}}," / "Here's The Starter Product List you added to your order: Download" (→ `…/downloads/starter-product-list.pdf`) / "Pick your first products tonight instead of guessing." / "Rickey".

**Upsell delivery:** not built on Nov 20 (open item).

## ★ Gates (ask the person)
- Approve each email's final text before publishing.
- Sender name and sender email, or the default sender after you've shown them what it is.

## Done when
- [ ] One workflow per product, named with the client prefix, ids recorded.
- [ ] Each trigger = Order submitted + Global product Is the right catalog product, zoom-checked before Publish; 0 enrolled after publishing.
- [ ] Main (and upsell) grant the right course; each workflow adds its buyer tag; every email has working links and spacing.
- [ ] Email text and sender approved; workflows published.
- [ ] Placeholders and the sender listed as open items if still missing.

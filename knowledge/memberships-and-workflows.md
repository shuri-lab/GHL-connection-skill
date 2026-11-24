# Memberships (the course) and the delivery workflows and emails

How Rickey's course and deliveries were set up on Nov 20 2026, and the general recipe. Quirk codes refer to `builder-quirks.md`. The published emails are in `examples/rickey-headstart-funnel/emails/published-emails.md` (Moses's v1 copy next to it is history).

## How delivery works in GHL (the model)

```
Buyer pays on the checkout (order form)
  └─ GHL fires "Order submitted" per purchased product (expected, not proven: no order has completed)
       ├─ Workflow A: filter Global product Is <main catalog product>  → Grant course access → Delivery email
       ├─ Workflow B: filter Global product Is <bump catalog product>  → Grant the bump's own small course → Bump email
       └─ Workflow C: filter Global product Is <upsell catalog product> → Grant upsell course access → Upsell email
Buyer logs in at the client portal URL → sees the course
```
- **One workflow per product.** A GHL email can't show or hide a paragraph depending on whether the bump or upsell was bought, so each product gets its own trigger and its own email.
- **Course access is granted by a workflow action** ("Grant course access"), not by an offer.
- Paid files (PDF guides) live behind the login: in a lesson's **Downloadable Resources**, uploaded by the person (`stages/9-course-memberships.md` step 8). **GHL's own emails must be off** (Stage 10 D2, Stage 9 step 9b). The email points to them. They never sit on public GitHub Pages, and the public thank-you page doesn't link them directly (Rickey's build did; see part E).
- Each workflow also tags the buyer (`<client>-<product>-buyer`), so the client can find their buyers and other clients' broadcasts can exclude them.

---

## A. The course (Memberships)

### A1. Look first
- Memberships tabs: **Client Portal · Courses · Communities · Credentials · Gokollab Marketplace**. "Your Products" shows course cards with **member counts**, plus "+ Create Product", "Library Sorting", "Manage Comments".
- If `.../memberships/courses/products` shows only the shell, use the menu **Courses ▾ → Products** (`/memberships/courses/products-v2`).
- Courses **with members are live**. Rickey's account had "AI Avatars System Course" (6 members) and "Bonus Course" (4 members): left untouched.
- Banner seen: "Classic courses retires Dec 1, 2026" ("Your members move to the new one automatically"). Not our concern; don't click "See what's new" migrations on other courses.

### A2. Create the course
1. **Create New** → **start from scratch** (`/memberships/courses/course-creator-studio?view=starter`).
2. **Details:**
   - Title = the **buyer-facing name, no client prefix**: `TikTok Shop Headstart`.
   - Description: `Rickey's 7-day course to get your first TikTok Shop sales, starting from zero. Do one lesson a day, about 15 minutes each, then follow the 30-Day First Sale Challenge.`
3. **Upload Thumbnail:** with the script in `stages/9-course-memberships.md` F (public image), or the person.
4. **Pricing:** options **Free / Recurring / One Time**.
   - **Never Free:** "Free course: anyone with the link can enroll at no charge".
   - Choose **One Time** and the main product's price (`$27`).
5. **Create Course.**

### A3. The extra product it creates
- Creating a priced course **auto-creates a Payments product** with the course's name (Rickey: "TikTok Shop Headstart", type MEMBERSHIP / Service, $27).
- Leave it alone. It is **not** the product the funnel sells. The checkout sells the catalog product "Rickey · TikTok Shop Headstart" (type Physical).
- **Workflows must filter on the funnel's catalog product**, not on this membership product. After Stage 9, Payments → Products shows both; check which one the Checkout step's Products tab points to.

### A4. Modules and lessons
- GHL creates one module, **"Course Contents"**, with sample lessons: "Welcome Aboard!", "Lesson 1", "Lesson 2", "Lesson 3", "What's Next?".
- Lesson titles come from the **approved copy** (the course deck PDF had no extractable text).
- **Rename the samples:** hover a lesson → edit → name + description → **Save and publish**. Clear the name field first (End → Backspace ×90 to 100 → `zoom` → type → `zoom`): `cmd+a` didn't always select, and "Day 2" and "Day 3" came out with the new title appended to the old one.
- **Add more lessons:** **Add Content** → **Lesson** → title → module dropdown = "Course Contents" (custom dropdown: open → `hover` the option → `Return`; see D5) → **Create**. A new lesson is a **draft**: open it → description → **Save and publish**.
- Rickey's outline (all 8 published):

| # | Lesson title | From |
|---|---|---|
| 1 | Start here: welcome + your downloads | "Welcome Aboard!" |
| 2 | Day 1: How TikTok Shop works + posting your first video | Lesson 1 |
| 3 | Day 2: Getting to your first 1,000 followers (the gate that lets you sell) | Lesson 2 |
| 4 | Day 3: Picking a product that sells | Lesson 3 |
| 5 | Day 4: Hooking people in the first 2 seconds | "What's Next?" |
| 6 | Day 5: Filming your first product video on the phone you already own | new |
| 7 | Day 6: Posting the right way + keeping your account safe | new |
| 8 | Day 7: Your first sale + what to do next | new |

- "Start here" description: `Welcome to the TikTok Shop Headstart. Do one lesson a day, about 15 minutes each. Your 30-Day First Sale Challenge guide (PDF) is attached to this lesson. Download it, then start with Day 1.`
- Day lesson description template (until the videos exist): `Rickey's Day N video is coming here. Watch it, then do today's task from your 30-Day First Sale Challenge.`
- **Videos are uploaded by the person** (the pane can't upload). Leave each lesson ready for its video.

### A5. Offers
- Course → **Offers (Advanced)** was empty ("Nothing here!"). New-style courses don't need an offer: the workflow grants access directly. Don't create one.

### A6. Client portal login URL
- Memberships → **Client Portal ▾ → Dashboard** → "Client portal URL".
- Format: `https://<location id in lowercase>.app.clientclub.net/`. Rickey: `https://54ejrjbw49ecsisozh44.app.clientclub.net/`.
- Use it for: the thank-you page's "Open my course" button (`GT_LINKS.course` in the fragment config), the delivery email's course link.
- First-time login: the email's one-click link (`{{membership_contact.login_url}}`, 24 h) opens "Set new password" the first time. "Forgot password" on the portal is the second way.

---

## B. Delivery workflows

### B1. Look first
- Automation → **Workflows** (`/automation/workflows`, lands on `?listTab=all`). It has "Create folder", "Build using AI", **"+ Create workflow"**, tabs All workflows / Needs review / Deleted, "+ New smart list", Advanced filters, "Global Workflow Settings".
- Rickey's account had two empty drafts ("New Workflow : 1749480932675", "New Workflow : 1763563288239", 0 enrolled). Don't touch existing workflows, even empty drafts.

### B2. Create one workflow (main product)
1. **+ Create workflow** → **Start from scratch**. A prompt about the saving mode appears: keep **manual save** (no account setting changes).
2. **Rename:** click the title at the top (pencil) → type `Rickey · Headstart delivery` → `Return`.
3. **Add new trigger** → search `order` → under **Payments** there are "Order form submission" and **"Order submitted"** ("Fires after checkout completion in Funnel/Store"). Pick **Order submitted**.
4. **Filters** → Select → Standard fields → **Global product** (other options: Order source, custom fields) → operator **Is** → product list: type `Headstart` → `hover` + click **"Rickey · TikTok Shop Headstart"** (the catalog product the checkout step uses) → **Save trigger** → **zoom the trigger card**: it must read "Global product is in 'Rickey · TikTok…'". Without that line, never publish.
5. **+** under the trigger → search `course` → **Grant course access** ("Give a contact access to a course") → Course = **TikTok Shop Headstart** → **Save action**. **Save the workflow** (top right).
5b. **+** → search `tag` → **Add Tag** → `<client>-<product>-buyer` (e.g. `rickey-headstart-buyer`) → **Save action** → Save the workflow. (Not built on Nov 20.)
6. **+** → search `send email` → **Send email** → fill it in (B4) → Save action → Save workflow.
7. Zoom the trigger card once more, then the top toggle **Draft → Publish**. The list must show 0 enrolled until your own test contacts (Stage 12 B2).
- The canvas then reads: Order Submitted ("Global product is in 'Rickey · TikTok…'") → Grant Course Access → (Add Tag) → Delivery email.

### B3. Bump workflow
Same steps, a second workflow `Rickey · Starter Product List delivery`: Order submitted → filter Global product **Is** "Rickey · The Starter Product List" (search `Starter`) → **Grant course access** (the bump's own small course) → **Send email** → Save → Publish.

### B4. The email action (builder technique)
Fields: **Action name**, **From name**, **From email**, **Subject**, **Preview text**, then the body editor.

1. Action name: `Delivery email` (bump: `Starter Product List email`).
2. **From name / From email (sender rule):** a From name **requires** a From email, or saving flags a field error. With **both empty** GHL uses the account's default sender, so first **read what that is** (Settings → Business Profile and Settings → Email Services, read-only) and use it only after the person said yes (Stage 1, Money and identity): on a shared account it may be another client's name and address. (Rickey: "Rickey" was typed as From name, then cleared with End + Backspace ×10; the default sender was used without being read.) Never pick or change a sending domain without asking.
3. Subject and Preview text: typed normally.
4. Body: open the editor's **source code view (`<>`)**. It handles links better than the rich-text editor.
   - Type **one `<p>` per `type` action** (about 100 to 230 characters), `wait` 1 s, `zoom` after every two or three. Long bursts dropped keystrokes and duplicated "Hey".
   - Put inline spacing on **every** `<p>` (the editor strips paragraph margins): `style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6"` (use `margin:0 0 12px` inside a list of items, `margin:0` on the last line).
   - Links: `style="color:#D30805;font-weight:bold"`.
   - If the source box already has content: select-all and modifier keys don't work there, and `form_input` can't reach it (cross-origin frame). **Cancel** the source dialog → click the body in the **visual** editor → `cmd+a` → `Backspace` (works there) → reopen `<>` → type.
5. Save the source → check the action's **preview** → **Save action** → **Save** the workflow.
6. Merge fields: `{{contact.first_name}}`, `{{contact.email}}`.

### B5. Upsell delivery
1. Content, depending on what the upsell is: a second course in Memberships (e.g. "My $4M TikTok Shop System", One Time $97, modules from the offer stack); a booking link or calendar for calls or coaching (template C2); a community invite (template C3).
2. Workflow `Rickey · System delivery` (suggested name): Order submitted → Global product **Is** "Rickey · My $4M TikTok Shop System" → Grant course access (the upsell course; skip it for calls or a community) → Add Tag → Send email (template C, C2 or C3 below) → Save → zoom the filter → Publish.
3. Test it in the test purchase: YES on the upsell must produce this email and the course access.

### B6. Check before you call it done
- Both (or all three) workflows show **Published**, with the right product in the filter.
- The filter product is the **catalog** product used by the funnel step, not the auto-created membership product.
- Every link in the email works (open each one). Placeholders (like `https://WHATSAPP-LINK-GOES-HERE`) are listed as open items: any email sent now would carry a broken link.
- A real end-to-end test (Stage 12): the email arrives in under 2 minutes, the course login works, every link opens.

---

## C. Delivery email copy patterns (copy-ready templates)

Write in the client's voice, first person, short lines, one clear next action. Show the text to the person before publishing. Replace `[...]`.

### Template A: main product (course + guides + community)
- **Subject:** `You're in. Here's Day 1`
- **Preview:** `Your course login, your guides and the [community name] link.`
```html
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">Hey {{contact.first_name}},</p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">You're in. Here's everything in one place:</p>
<p style="margin:0 0 12px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">1. Your course: <a href="{{membership_contact.login_url}}" style="color:#D30805;font-weight:bold">Open my course</a>. This link signs you in and works for 24 hours. The first time, you'll choose your password.<br>After that, <a href="[CLIENT PORTAL URL]" style="color:#D30805;font-weight:bold">log in here</a> with {{contact.email}}. No password yet? Click "Forgot password" on that page.</p>
<p style="margin:0 0 12px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">2. Your [guide name] (PDF): it's inside your course, in the first lesson, "Start here".</p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">3. [Community name], my private [channel type]: <a href="[COMMUNITY LINK]" style="color:#D30805;font-weight:bold">Join</a></p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">Do Day 1 today. It's about 15 minutes, and it's the one that gets you moving.</p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">[Client first name]</p>
<p style="margin:0;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">P.S. Stuck on anything? Write to [support email].</p>
```

### Template B: order bump (download)
- **Subject:** `Your [bump product]`
- **Preview:** `[the bump's one promise, e.g. "Pick your first products tonight instead of guessing."]`
```html
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">Hey {{contact.first_name}},</p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">Your [bump product] is ready. It's in your course area, next to your [main product].</p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6"><a href="{{membership_contact.login_url}}" style="color:#D30805;font-weight:bold">Open my [bump product]</a>. This link signs you in and works for 24 hours.<br>After that, <a href="[CLIENT PORTAL URL]" style="color:#D30805;font-weight:bold">log in here</a> with {{contact.email}}.</p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">[The one promise, one sentence.]</p>
<p style="margin:0;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">[Client first name]</p>
```

### Template C: one-click upsell (course access)
- **Subject:** `Your [upsell product] is ready`
- **Preview:** `Your login and where to start.`
```html
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">Hey {{contact.first_name}},</p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">You added [upsell product] to your order. It's in your course area now, right next to [main product].</p>
<p style="margin:0 0 12px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6"><a href="{{membership_contact.login_url}}" style="color:#D30805;font-weight:bold">Open [upsell product]</a>. This link signs you in and works for 24 hours. After that, use the same login as before: {{contact.email}}.</p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">Start with [first module]. [One line on why it comes first.]</p>
<p style="margin:0;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">[Client first name]</p>
```

### Template C2: upsell delivered as calls or coaching (booking link)
- **Subject:** `Book your [upsell product] call`
- **Preview:** `Pick a time that works for you.`
```html
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">Hey {{contact.first_name}},</p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">You added [upsell product] to your order. The first step is to book your call.</p>
<p style="margin:0 0 12px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6"><a href="[BOOKING LINK]" style="color:#D30805;font-weight:bold">Book my call</a>. [How long it is, and what to bring.]</p>
<p style="margin:0;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">[Client first name]</p>
```

### Template C3: upsell delivered as a community (invite link)
- **Subject:** `You're in [community name]`
- **Preview:** `Your invite link and where to start.`
```html
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">Hey {{contact.first_name}},</p>
<p style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">You added [upsell product] to your order. Here's your way in.</p>
<p style="margin:0 0 12px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6"><a href="[INVITE LINK]" style="color:#D30805;font-weight:bold">Join [community name]</a>. [The first thing to do once you're in.]</p>
<p style="margin:0;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6">[Client first name]</p>
```

Replace `#D30805` in every template with the client's brand accent.

### Copy rules learned
- Subject = the buyer's win plus the first step ("You're in. Here's Day 1").
- Preview text lists what's inside.
- Numbered list of everything they got, each with one link. The one-click sign-in link first, then the portal login and "Forgot password".
- One action for today, with the time it takes ("about 15 minutes").
- Sign with the client's first name. P.S. invites a reply.
- The copywriter's draft had "[Only if bump]" / "[Only if upsell]" lines. GHL can't do that inside one email: split them into Templates B and C.
- The thank-you page can't know about the bump either: it says, as a question, "Added [Bump] or [Upsell]? They're in the same place, next to your course."

---

## D. Rickey's live delivery

Three published workflows, one per product, each granting its own course and sending its own email. Table: `stages/10-delivery-workflows.md`; texts: `examples/rickey-headstart-funnel/emails/published-emails.md`. Proven on test contacts on Nov 23, added by hand (access, emails). Not yet proven by an order, and nobody has logged in as a buyer.

## E. Where the files live

- **Paid files never go on public hosting.** A public GitHub repo is browsable and its Pages URLs are guessable, so anyone could download a paid PDF without buying.
  - Main product files: attached to the course's "Start here" lesson (behind the portal login). ★ The person drags them into the lesson's Downloadable Resources.
  - Bump file: in its own small course, granted only by the bump workflow. Not in the main course (every buyer would get it).
  - Upsell files: in the upsell course.
  - Only free files (a free lead magnet) and the page fragments and images belong on Pages.
- A file that was public once stays in the repo's history. Never publish a paid file, not even for a minute.
- **Before the repo is made private**, move the page fragments and images into GHL (paste the page, GHL Media) and update every link. Otherwise the pages break.

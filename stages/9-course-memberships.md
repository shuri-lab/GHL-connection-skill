# Stage 9 of 12: Course in Memberships

**Goal:** the buyer's course exists in Memberships with its lessons published (videos can come later), priced **One Time** (never Free), and you have the **client portal URL** (the login page buyers use). The thank-you page and the delivery email point at it. If the upsell is course content, it gets its own course the same way.

**Why:** on Rickey's build the course had to exist before the delivery workflow could grant it. Things learned: the existing courses in the account had paying members, so nothing there could be touched; the direct Memberships URL sometimes shows an empty 404 shell; **Free** pricing means "anyone with the link can enroll"; creating a course **auto-creates a Payments product** with the same name, which is easy to confuse with the funnel's product; new GHL courses don't need an "offer", access is granted by the workflow; select-all didn't work in the lesson name field, so "Day 2" and "Day 3" titles came out with the old text appended; and the browser pane can't upload thumbnails or videos.

**Read first:** `knowledge/memberships-and-workflows.md`, `knowledge/builder-quirks.md` (dropdowns, clearing fields).

## Before you start (inputs)
- Course title (customer-facing, no client prefix), a one-paragraph description, lesson titles (from the approved copy), the main price.
- Links that belong in lessons (e.g. the guide PDF URL from Stage 2).
- The Stage 0 list of existing courses and their member counts (off-limits).

## Steps

### A. Create the course
1. Sidebar **Memberships** → **Courses ▾** → **Products**. It lands on `…/memberships/courses/products-v2`. (The direct URL `…/memberships/courses/products` once showed a 404 shell; use the menu.) Tabs on Memberships: **Client Portal · Courses · Communities · Credentials · Gokollab Marketplace**. A banner may say "Classic courses retires Dec 1, 2026"; click "Do it later" or ignore it.
2. **Never open, edit or delete** a course with members. Create a new one: **Create New** (or "+ Create Product") → start **from scratch**. The URL becomes `…/memberships/courses/course-creator-studio?view=starter`.
3. **Details:**
   - **Title:** the customer-facing name, no client prefix (buyers see it): `TikTok Shop Headstart`.
   - **Description:** one or two sentences (Rickey: "Rickey's 7-day course to get your first TikTok Shop sales, starting from zero. Do one lesson a day, about 15 minutes each, then follow the 30-Day First Sale Challenge.").
   - **Upload Thumbnail:** skip (the pane can't upload files). ★ The person uploads it later.
4. **Pricing:** options **Free / Recurring / One Time**. Choose **One Time** and the main price. Never Free.
5. **Create Course.** The course opens in the course manager (`…course-creator-studio?view=manager&sub_view=outline&product_id=<id>`). Copy the `product_id` into `funnel-record.md`. GHL adds a module **"Course Contents"** with sample lessons: "Welcome Aboard!", Lesson 1, Lesson 2, Lesson 3, "What's Next?".

### B. Lessons
6. **Rename a sample lesson:** hover the lesson → the edit (pencil) icon → the title field: click → `End` → `Backspace` ×90 to ×100 → zoom (empty) → type the title → zoom. `cmd+a` sometimes didn't select, and the new title was appended to the old one. Then the description → **Save and publish**.
7. **Add a lesson:** **Add Content** → **Lesson** → title → **module** dropdown = "Course Contents" → **Create**. A new lesson is a **draft**: open it → description → **Save and publish**.
   - The module dropdown is custom: a plain click on the option didn't register; keyboard Down + Return worked once and then didn't. Most reliable: open it → **hover** the option → `Return` (or `find` the option, click its ref, then Return). Zoom to check.
8. Put the downloads in the first lesson ("Start here") description, so buyers find them inside the course too.
9. If the plan has fewer lessons than the samples, set the extra sample lessons to draft or delete them (they are part of the course you just created; nothing else).
10. **Videos:** ★ the person uploads them (the pane can't). Until then each lesson description says the video is coming (Rickey: "Rickey's Day N video is coming here. Watch it, then do today's task from your 30-Day First Sale Challenge.").

### C. Things to leave alone, and why
11. **Offers (Advanced)** tab: it was empty ("Nothing here!"). New-style courses don't need an offer: the workflow action **Grant course access** gives access (Stage 10).
12. **The auto-created Payments product:** creating the course added a product with the course name and price (type MEMBERSHIP / Service) to Payments → Products. Leave it. The funnel sells the `<Client> · …` catalog product, and the workflows must filter on **that** product, not this one. Record its existence in `funnel-record.md` so nobody gets confused later.

### D. The login URL
13. Memberships → **Client Portal ▾** → **Dashboard** → **"Client portal URL"**. The format is `https://<location id in lower case>.app.clientclub.net/`. Put it in:
    - the thank-you fragment `GT_LINKS.course` (one-line edit + push, Stage 8);
    - the delivery email's "Open my course" link (Stage 10).
14. How buyers log in the first time is **not confirmed**: the Rickey email tells first-timers to click "Forgot password" on the login page to set their password. Check what actually happens during the Stage 12 test purchase and update the email if GHL sends its own set-password email.

### E. The upsell course (if the upsell is course content)
15. Same steps A to D with the upsell's customer-facing title and price. Rickey's upsell course ("My $4M TikTok Shop System", 8 modules) was **not built** on Nov 20; it is the worked gap to close for the next client.

## Verify
- The course outline screenshot shows every lesson **published** (no draft badge), titles exactly as planned (zoom on each; look for appended old text).
- Pricing reads One Time and the right amount.
- `curl -s -o /dev/null -w "%{http_code}" https://<loc>.app.clientclub.net/` → 200, and opening it shows the login page.
- The existing courses' member counts are unchanged (compare with Stage 0).
- The thank-you page's "Open my course →" button is active and points at the portal (Stage 8 check).

## Rickey example values
| What | Value |
|---|---|
| Course | "TikTok Shop Headstart", product_id `e17001aa-9fca-43f5-946a-81dd7b23d240`, One Time $27, module "Course Contents" |
| Lessons (8, all published) | "Start here: welcome + your downloads" (with the 30-Day guide URL); "Day 1: How TikTok Shop works + posting your first video"; "Day 2: Getting to your first 1,000 followers (the gate that lets you sell)"; "Day 3: Picking a product that sells"; "Day 4: Hooking people in the first 2 seconds"; "Day 5: Filming your first product video on the phone you already own"; "Day 6: Posting the right way + keeping your account safe"; "Day 7: Your first sale + what to do next" |
| Client portal URL | `https://54ejrjbw49ecsisozh44.app.clientclub.net/` |
| Auto-created product | "TikTok Shop Headstart" (MEMBERSHIP, $27, Service), left in place |
| Untouched | "AI Avatars System Course" (6 members), "Bonus Course" (4 members) |
| Open | thumbnail, lesson videos, upsell course |

## ★ Gates (ask the person)
- Videos and the course thumbnail are uploaded by the person.
- If lesson titles aren't in the approved copy, ask before inventing them.

## Done when
- [ ] New course created, customer-facing title, One Time price; product_id recorded.
- [ ] All planned lessons published with exact titles; downloads in the first lesson.
- [ ] Client portal URL recorded and set in the thank-you page; the email will use it.
- [ ] Auto-created Payments product noted; existing courses untouched.
- [ ] Upsell course built if the plan needs one (or listed as open).

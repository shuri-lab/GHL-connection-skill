# Stage 9 of 12: Course in Memberships

**Goal:** the buyer's course exists in Memberships with its lessons published (videos can come later), priced **One Time** (never Free), and you have the **client portal URL** (the login page buyers use). The thank-you page and the delivery email point at it. If the upsell is course content, it gets its own course the same way.

**Why:** on Rickey's build the course had to exist before the delivery workflow could grant it. Things learned: the existing courses in the account had paying members, so nothing there could be touched; the direct Memberships URL sometimes shows an empty 404 shell; **Free** pricing means "anyone with the link can enroll"; creating a course **auto-creates a Payments product** with the same name, which is easy to confuse with the funnel's product; new GHL courses don't need an "offer", access is granted by the workflow; select-all didn't work in the lesson name field, so "Day 2" and "Day 3" titles came out with the old text appended. Nov 23 added: one course per product, so **nobody sees what they didn't buy**; GHL's **Welcome Badge** and **Course Completion Credential** are on by default and email buyers ("🎉 Welcome to …!") in GHL's words; and a page script can upload thumbnails (and files) into a course.

**Read first:** `knowledge/memberships-and-workflows.md`, `knowledge/builder-quirks.md` (dropdowns, clearing fields).

## Before you start (inputs)
- Course title (customer-facing, no client prefix), a one-paragraph description, lesson titles (from the approved copy), the main price.
- The paid files that belong in lessons (the person uploads them; they never go on public Pages, Stage 2).
- The Stage 0 list of existing courses and their member counts (off-limits).

## Steps

### A. Create the course
1. Sidebar **Memberships** → **Courses ▾** → **Products**. It lands on `…/memberships/courses/products-v2`. (The direct URL `…/memberships/courses/products` once showed a 404 shell; use the menu.) Tabs on Memberships: **Client Portal · Courses · Communities · Credentials · Gokollab Marketplace**. A banner may say "Classic courses retires Dec 1, 2026"; click "Do it later" or ignore it.
2. **Never open, edit or delete** a course with members. Create a new one: **Create New** (or "+ Create Product") → start **from scratch**. The URL becomes `…/memberships/courses/course-creator-studio?view=starter`.
3. **Details:**
   - **Title:** the customer-facing name, no client prefix (buyers see it): `TikTok Shop Headstart`.
   - **Description:** one or two sentences (Rickey: "Rickey's 7-day course to get your first TikTok Shop sales, starting from zero. Do one lesson a day, about 15 minutes each, then follow the 30-Day First Sale Challenge.").
   - **Upload Thumbnail:** upload it with the script in section F (from the public image host), or ★ the person uploads it. The button then reads **"Set Up Pricing →"**.
4. **Pricing:** options **Free** (preselected!) **/ Recurring / One Time**. Choose **One Time**. The price defaults to `$ 1.00`: triple-click, `cmd+a`, type the price, Tab, zoom. Never Free ("Anyone with the link can enroll at no charge").
5. **Create Course.** The course opens in the course manager (`…course-creator-studio?view=manager&sub_view=outline&product_id=<id>`). Copy the `product_id` into `funnel-record.md`. GHL adds a module **"Course Contents"** with sample lessons: "Welcome Aboard!", Lesson 1, Lesson 2, Lesson 3, "What's Next?".

### B. Lessons
6. **Rename a sample lesson:** hover the lesson → the edit (pencil) icon → the title field: click → `End` → `Backspace` ×90 to ×100 → zoom (empty) → type the title → zoom. `cmd+a` sometimes didn't select, and the new title was appended to the old one. Then the description → **Save and publish**.
7. **Add a lesson:** **Add Content** → **Lesson** → title → **module** dropdown = "Course Contents" → **Create**. A new lesson is a **draft**: open it → description → **Save and publish**.
   - The module dropdown is custom: a plain click on the option didn't register; keyboard Down + Return worked once and then didn't. Most reliable: open it → **hover** the option → `Return` (or `find` the option, click its ref, then Return). Zoom to check.
8. **Paid files live here, behind the login:** lesson editor → right column **Downloadable Resources**. The name you give the file is the name buyers see. Two ways:
   - ★ **The person drags the PDFs in** (a minute per file). This is the default, because it never puts a paid file anywhere public.
   - **Claude in Chrome's file upload**, if they prefer and are signed in to GHL there (not tried by us on this screen).
   - **Not possible:** reading the PDFs from a server on the person's own computer. We tested it on Nov 24: the pane blocks `app.gohighlevel.com` from reading `localhost`.
   - **Never** put a paid PDF on public hosting "just for the upload": a file that was public once can still be found after it's removed.

   Then **Save & Publish**, wait 5 s, **reload the lesson** and read it back: `(document.body.innerText.match(/Downloadable Resources[\s\S]{0,200}/)||['none'])[0]`. Until a file is in, the lesson says it's coming, and it's an open item.
9. If the plan has fewer lessons than the samples (e.g. a one-file bump course), set the extra sample lessons to **Draft**: Outline → the row's status pill **Published ▾** → **Draft**, 3 s each. Don't delete.
9b. **On every course: turn GHL's own badge and certificate off.** Outline → **Welcome Badge** (top row) → **Draft**; **Course Completion Credential** (bottom row) → **Draft**. Toast: "Members will no longer receive this badge." Screenshot after each (a first click missed twice). Why: they email every buyer in GHL's words. David: it "just doesnt make any sense to send users… not in Rickey voice… they just need the access to their course or courses and the pdfs".
9c. **More lessons than samples: clone.** Hover a lesson row → duplicate icon → **Clone**. The copy ends in "(Clone)"; rename it. Its button may read **Publish** or **Save & Publish**; after saving it goes grey (disabled).
10. **Videos:** ★ the person uploads them (the pane can't). Until then each lesson description says the video is coming (Rickey: "Rickey's Day N video is coming here. Watch it, then do today's task from your 30-Day First Sale Challenge.").

### C. Things to leave alone, and why
11. **Offers (Advanced)** tab: it was empty ("Nothing here!"). New-style courses don't need an offer: the workflow action **Grant course access** gives access (Stage 10).
12. **The auto-created Payments product:** creating the course added a product with the course name and price (type MEMBERSHIP / Service) to Payments → Products. Leave it. The funnel sells the `<Client> · …` catalog product, and the workflows must filter on **that** product, not this one. Record its existence in `funnel-record.md` so nobody gets confused later.

### D. The login URL
13. Memberships → **Client Portal ▾** → **Dashboard** → **"Client portal URL"**. The format is `https://<location id in lower case>.app.clientclub.net/`. There is **one portal per sub-account**: on a shared account, buyers of every client log in to the same portal, under whatever name and logo it has. The person accepted that branding in Stage 1 (Money and identity); don't change it yourself. Put the URL in:
    - `links.course` in `funnel-pages.json` (rebuild, copy `thank-you.html` and the emails, push);
    - so it becomes the email's "log in here" link. "Open my course" stays `{{membership_contact.login_url}}`.
14. **How buyers log in (seen up to "Set new password" on Nov 23; nobody has logged in as a buyer yet):** the delivery email's one-click link is the merge field `{{membership_contact.login_url}}` ("Login URL (Magic Link)", valid 24 hours). The first time it opens a **"Set new password"** screen under the portal's name ("My portal"). Claude stops there (passwords are the buyer's); what the buyer sees after it must be looked at by the person in the Stage 12 test. After that they use the portal URL with their email; "Forgot password" works if they never set one. Expected: one portal, **one login per email**, every course they bought side by side.

### E. The upsell course (if the upsell is course content)
15. Same steps A to D with the upsell's customer-facing title and price: its lessons, its files on its own "Start here" lesson, badges off. (Rickey's "My $4M TikTok Shop System" was built this way on Nov 23: Start here + 8 lessons + 3 PDFs.)
16. If the upsell is calls, coaching or a community instead (Stage 1, step 11), skip this part: Stage 10 delivers it by email with the booking or invite link.
17. **The bump gets its own small course** (one lesson with the file; sample lessons and badges to Draft; One Time at the bump price), granted **only** by the bump workflow. Never put the bump file in the main course: every buyer would get it. (Rickey: "The Starter Product List", $17.)
18. **Two products with the same name.** Creating each course adds a Payments product with its plain name. In every workflow pick the **prefixed** catalog product (`<Client> · …`).

### F. The upload and editing scripts that worked (app pages, not builder frames)
Run them with the JavaScript tool on the course page. **Use them for public images and text.** For paid files see step 8.
```js
// Thumbnail: any CORS-readable public image → 1280×720 JPEG (GHL takes svg/png/jpg, not webp)
const b=await (await fetch('https://<image host>/cover-1280.webp')).blob(), bm=await createImageBitmap(b);
const c=document.createElement('canvas');c.width=1280;c.height=720;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,1280,720);
const k=Math.min(1280/bm.width,720/bm.height),w=bm.width*k,h=bm.height*k;x.drawImage(bm,(1280-w)/2,(720-h)/2,w,h);
const f=new File([await new Promise(r=>c.toBlob(r,'image/jpeg',.9))],'course.jpg',{type:'image/jpeg'});
const inp=[...document.querySelectorAll('input[type=file]')].find(i=>/png/.test(i.accept));
const dt=new DataTransfer();dt.items.add(f);inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,8000));
// Downloadable Resources is the only file input with accept==='*'; the same DataTransfer pattern works there (free files only).
// Course title and description
const sI=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set,sT=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;
const a=document.querySelector('input[placeholder="Enter course title"]'),d=document.querySelector('textarea');
sI.call(a,'<title>');a.dispatchEvent(new Event('input',{bubbles:true}));sT.call(d,'<description>');d.dispatchEvent(new Event('input',{bubbles:true}));
// Lesson title and text (lesson editor open). Guard: stop if the title isn't the one you expect.
const n=document.querySelector('input[placeholder="Post Title"]'); if(n.value!=='<old title>') throw 'wrong lesson: '+n.value;
sI.call(n,'<new title>');n.dispatchEvent(new Event('input',{bubbles:true}));n.dispatchEvent(new Event('change',{bubbles:true}));
const e=document.querySelector('.ProseMirror');e.focus();document.execCommand('selectAll');document.execCommand('insertText',false,'<lesson text>');
[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/^(Save & Publish|Publish)$/.test(b.textContent.trim())).click();
```
If a script stops half way (it did once after the title), screenshot and run the missing part alone.

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
| Lessons (8, all published) | "Start here: welcome + your downloads" (the 30-Day PDF is in its Downloadable Resources); "Day 1: How TikTok Shop works + posting your first video"; "Day 2: Getting to your first 1,000 followers (the gate that lets you sell)"; "Day 3: Picking a product that sells"; "Day 4: Hooking people in the first 2 seconds"; "Day 5: Filming your first product video on the phone you already own"; "Day 6: Posting the right way + keeping your account safe"; "Day 7: Your first sale + what to do next" |
| Client portal URL | `https://54ejrjbw49ecsisozh44.app.clientclub.net/` |
| Auto-created product | "TikTok Shop Headstart" (MEMBERSHIP, $27, Service), left in place |
| Untouched | "AI Avatars System Course" (6 members), "Bonus Course" (4 members) |
| Added Nov 23 | Thumbnails on all courses; "My $4M TikTok Shop System" (Start here + 8 lessons, 3 PDFs) and "The Starter Product List" (1 lesson, 1 PDF); badges and credentials Draft on all three |
| Open | lesson videos (lesson text still says they're coming) |

## ★ Gates (ask the person)
- Videos and paid files are uploaded by the person (or through Claude in Chrome, with their OK).
- If lesson titles aren't in the approved copy, ask before inventing them.

## Done when
- [ ] New course created, customer-facing title, One Time price; product_id recorded.
- [ ] All planned lessons published with exact titles; each product's files in its own course (or the upload listed as open).
- [ ] Client portal URL recorded and set in the thank-you page; the email will use it.
- [ ] Auto-created Payments product noted; existing courses untouched.
- [ ] Upsell course and bump course built, each with its own files; nothing of theirs is in the main course.
- [ ] Welcome Badge and Course Completion Credential are Draft on **every** course.

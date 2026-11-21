# GHL Funnel Playbook: mined know-how, slice 3 (upsell page, one-click upsell, checkout routing, bump copy, Remote Control, team access)

Source: `ghl3.txt` (the end of the Nov 20 2026 session), cross-checked against the raw session log and its screenshots for exact UI labels. The later "Error while bootstrapping the session" report sits outside `ghl3.txt` in the raw log. It is included in section E.

Conventions used below:
- `{loc}` = sub-account (location) id. In this session: `54EJrjBw49eCsIsOZH44` (sub-account "Hot Pursuit LLC").
- `{funnel}` = funnel id (`DH9wPGw485e8HHkbWJaf`, "Rickey · TikTok Shop Headstart").
- `{step}` = funnel step id (Upsell step: `2e4e00f0-5834-4f28-a2cd-ca65bc7d26d1`).
- `{page}` = builder page id. Upsell page: `LdwO92TMbPLv9CaOVOqI`. Checkout page: `NPewVghQNsX2rU9aEb0q`. Another funnel's upsell page (AI Avatars, Upsell #1), opened read-only: `xOzdUz04zbV6ZNcIkXrm`.
- People are named by role: **owner** (David), **teammate** (Moses, TJ's Claude agent operator), **manager** (TJ, sign-off on going live). Email addresses are left out on purpose.
- Tooling: the Claude desktop app's built-in **browser pane** (`mcp__Claude_Browser__*`), signed in to app.gohighlevel.com.

Funnel shape at the end of this slice: Sales `/headstart-page` → Checkout `/headstart-checkout` ($27 plus a $17 bump) → Upsell `/headstart-upsell` ($97 one-click) → Thank You `/headstart-thank-you`. All on domain davidhsai.com.

---

## A. Step-by-step log

### A1. Write the upsell page as an HTML fragment, publish it to GitHub Pages, preview it
- **Request:** build the upsell page in custom HTML. The structure was modelled on an existing upsell page in the same account (AI Avatars Upsell #1): an alert bar ("order confirmed, access in 5 minutes, don't close this page"), an "Order 90% complete" bar, the headline "You just unlocked… now get results 10x faster", the product image, headline and subheadline, an offer stack with crossed-out values and a special price, then the "This is an exclusive one-time offer…" line. Below that go **two buttons created natively in GHL**: "YES! Add … For Only $97" and a "No thanks, …" decline. No VSL.
- **How:** wrote `offer-2-upsell/ghl-upsell.html` (about 15.8 KB, self-contained: fonts, `<style>`, markup, `<script>`). Committed and pushed it to the public GitHub repo, then polled GitHub Pages with curl until it returned 200. That took about 70 s on the first push and about 60 s on later ones.
- **Native-button styling trick:** GHL makes it hard to add custom classes to native buttons. The fragment ships a small script that finds the native buttons by their text and tags them. CSS in the fragment then styles `.gtu-yes` and `.gtu-no`:
  ```html
  <script>
  (function(){
    function tag(){
      document.querySelectorAll('.c-button a, .c-button button').forEach(function(b){
        var t=(b.textContent||'').trim().toLowerCase();
        if(t.indexOf('yes!')===0) b.classList.add('gtu-yes');
        else if(t.indexOf('no thanks')===0) b.classList.add('gtu-no');
      });
    }
    tag(); var n=0,iv=setInterval(function(){tag();if(++n>30)clearInterval(iv);},300);
  })();
  </script>
  ```
  CSS hooks used: `.c-button:has(.gtu-yes){padding:4px 18px 0!important;max-width:756px;margin:0 auto!important}`, `.c-custom-code:has(.gtu-no){padding:0 18px 44px!important}`, `[class*="section-"]:has(.gtu-yes){padding-bottom:0!important}`. `.gtu-yes` gets a big red pulsing block button; `.gtu-no` gets a centred, underlined grey link.
- **Wrapper fix (first CSS rule of every fragment):** this strips GHL's padding and width cap around the code block:
  `section:has(#gtu-root),[class*="section-"]:has(#gtu-root),.c-row:has(#gtu-root),.c-column:has(#gtu-root),.inner:has(#gtu-root),.c-custom-code:has(#gtu-root),.custom-code-container:has(#gtu-root){padding:0!important;margin:0!important;max-width:none!important;width:100%!important}`. GHL sections are `div`s, so the `[class*="section-"]` selector is needed.
- **Verification:** the raw Pages URL was opened at 393×852 in the browser pane. It has no mobile viewport meta, so the real mobile check was done later on the live GHL page.
- **General procedure:** build page HTML outside GHL, host it on a static host, and paste only a small **loader** into GHL (A4). Name things by text so in-fragment JS can style native GHL elements.

### A2. Create the upsell product (Payments → Products)
- **How (exact):**
  1. Go to `https://app.gohighlevel.com/v2/location/{loc}/payments/products` (sidebar **Payments** → Products) and click **Create Product** (top right). The URL becomes `/payments/products/create` and the header reads "Unsaved Product" with **Discard** and **Save**.
  2. Left nav: **Product Information**, **Pricing**, **Variants**, **Search Engine Listing**.
  3. Product Information: switch **Include in Online store** OFF (it defaults to ON). Set **Title \*** to `Rickey · My $4M TikTok Shop System`; the convention is `<Client> · <Product>` for the internal catalog name. Description, **Enable Product Label**, and **Product Collection** were left empty.
  4. Click **Pricing** in the left nav to jump there. Under **Prices**: **Type** = `Onetime` (the default), **Amount \*** = `97`. **Track Inventory** and **Add Margin** stayed unchecked. **Additional options >** only reveals **Statement Descriptor** ("Overrides default account descriptors…"). There is **no product-type selector** there; earlier products defaulted to Physical, which doesn't affect a one-click upsell. **+ Add another price** was not used. **Product Media** (upload) was skipped.
  5. Click **Save**. The URL becomes `/payments/products/edit/<productId>?source=create` (here `6b00cb846b61070feb19cb0a`). The edit view adds **Additional Information** to the left nav and a **Product Tax Code** section.
- **Verification:** the screenshot shows the edit page with the title and the online-store toggle off.
- **General procedure:** create one catalog product per offer (core, bump, upsell), each with a single one-time price. Turn off the online store so it doesn't appear in a store.

### A3. Attach the product to the funnel's Upsell step (step Products tab)
- **How:**
  1. Sites → **Funnels** → open the funnel. Direct URL: `/v2/location/{loc}/funnels-websites/funnels/{funnel}/steps/<anyStep>/overview`, then click **Upsell** in the "Funnel steps" list.
  2. The step pane has the tabs **Overview | Products | Publishing**. Click **Products**. A banner reads "Multiple recurring products and bump products with subscriptions not supported with Paypal." The table is empty ("No data").
  3. Click **+ Add Product**. The URL becomes `/steps/{step}/products/create`. The form has **Back to products**, the note "This information will be displayed publicly so be careful what you share.", **Products \*** (dropdown; "Create a new product by clicking here."), **Product name \***, **Price display override** (optional, "Customize the display of the price on the order form"), **Additional Options** (collapsed), and **Cancel / Save**.
  4. Products dropdown: click it, **type to search** (`4M`), **hover** over the result, then press **Return**. A **Price \*** dropdown appears. Click it, hover `Rickey · My $4M TikTok Shop System @ 97`, then press Return.
  5. **Product name** is **prefilled** with the catalog name. Typing straight into it inserts text into the existing value, so clear it first (End, then Backspace ×80, then Delete ×40) and type the customer-facing name `My $4M TikTok Shop System`.
  6. Scroll down and click **Save**. Back on the Products tab, the table shows "My $4M TikTok Shop System | Internal Product ID 6b00cbc6… | $97 USD | One Time | 2026-11-20". The step product gets its **own id**, different from the catalog product id.
- **General procedure:** every paid step (checkout, upsell, downsell) needs its product added on the step's **Products** tab. The YES button's "Products" picker (B) lists only these step products.

### A4. Create the upsell page from blank and add the loader (first build, later lost)
- **How:**
  1. Step pane → **Overview** shows the URL (`https://davidhsai.com/headstart-upsell`), a **CONTROL** card with **Use existing** and **Create from blank**, plus **Edit**, "Start split test", **Delete Funnel Step**, and **Clone Funnel Step**. Click **Create from blank**, then wait about 12 s for the builder.
  2. The builder opens at `https://app.gohighlevel.com/location/{loc}/page-builder/{page}`. A blank page opens an **Ask AI** panel (Assist/Build tabs, "Hi <name>, let us set the foundations"); close it with its X. The canvas shows "Start Creating your Funnel Page" with **Blank Section**, **Insert Element**, and **Generate with AI**.
  3. Click **+** (far left of the toolbar) to open the add panel. Its left nav lists **Quick Add, Sections, Rows, Elements, Prebuilt Sections, Saved Assets, Widget Marketplace, Store, Icons And Graphics, Buttons, Forms Surveys And Quizzes, Social Media Icons, Countdown Timers, Images, Progress Bar…**. Choose **Sections** ("Add A Section": **Full Width, Wide, Medium, Small**) → **Full Width**.
  4. Click the **+** in the middle of the new empty section. It sometimes needs two clicks: the first selects the section, the second opens **Quick Add**. Type `custom` into the Quick Add search, then click the **Code** card under the "Custom" group. The element is "Custom HTML/Javascript" and the builder wraps it in a "1 Column Row".
  5. Select the code element. The right panel "Custom Code" has the tabs **General / Styles**, an **Element name** field, and an **Open Code Editor** button. Click it to get the modal **Custom Javascript/HTML**, click inside the editor, and type the loader:
     ```html
     <div id="gtu-root"></div><script>(function(){var u='https://shuri-lab.github.io/rickey-tiktokshop-project/offer-2-upsell/ghl-upsell.html';fetch(u,{cache:'no-cache'}).then(function(r){if(!r.ok){throw 0;}return r.text();}).then(function(h){var root=document.getElementById('gtu-root');root.innerHTML=h;root.querySelectorAll('script').forEach(function(s){var n=document.createElement('script');n.textContent=s.textContent;s.parentNode.replaceChild(n,s);});}).catch(function(){});})();</script>
     ```
     Zoom into the modal to check that the code went in intact, then click the modal's **Save**.
  6. **Mistake that caused the loss:** the modal Save does not save the page. The builder header shows an **"Autosave off"** badge, and the page **Save** icon (floppy disk, top right, next to the eye/preview) shows a **yellow dot** when there are unsaved changes. The page was never saved in this first build.
- **First-build layout:** Full Width section (code) plus a separate **Wide** section underneath for the buttons, added with the green **+** at the bottom edge of the section, then Sections → Wide. Quick Add → `button` → **Button** (under "Form"). The button was duplicated with the element toolbar's duplicate icon to make a NO button.

### A5. YES button text, name, and the click action (blocked)
- **How (text and name):** select the button. Its default text is "Get Started". The right panel is titled with the element name and has the tabs **General / Styles / Animations**. Under General: **Element name**, then **Text Options**: **Text** and **Sub Text** (each with a `{+}` custom-value picker), then Typography, **Button Actions**, Color, and Icon.
  - Text: click, End, Backspace ×20, then type `YES! Add My $4M TikTok Shop System to My Order For Only $97`.
  - Element name: click, End, Backspace ×12, then type `YES button (one-click upsell)`. The new name shows in the canvas label and in the breadcrumb (Page › Section › 1 Column Row › 1st Column › YES button…).
- **Button Actions** (scroll down in General): **link to** defaults to `Open popup`, with a **Popup** select under it. The target is **link to = "One click up/down sell product"**, which then shows **Products** = the step product.
- **What was tried, and none of it worked from the browser pane:**
  1. Clicking the "link to" field, the field text, and the chevron. Nothing appeared in screenshots.
  2. `find("Open popup")` and `find("Button Actions")` both returned "No matches". The builder UI lives in a **cross-origin iframe**, so find, read_page, and form_input can't see inside it.
  3. Pressing Escape to close the "dropdown" **deselected the element** instead; the panel showed "Select an element to see and edit its properties here".
  4. Opening the field and typing `One` then Return; pressing Down then Return; pressing Space on the focused field; double-clicking. The value stayed "Open popup". Arrow keys scrolled the settings panel instead.
  5. `javascript_tool` on the top page listed one iframe: `https://page-builder.leadconnectorhq.com/location/{loc}/page-builder/{page}`. Its DOM can't be reached from app.gohighlevel.com.
- **Conclusion:** these two fields behave like native `<select>` menus. Their popup isn't drawn in screenshots, keyboard selection doesn't register, and DOM tools can't reach them across the frame boundary. The owner has to set them by hand (B).

### A6. Look at another funnel's working upsell (read-only)
- **Why:** the plan was to copy a working one-click YES button from a live funnel in the same sub-account (AI Avatars Funnel → **Upsell #1**). The idea was to save it as an asset and insert it here.
- **How:** Sites → Funnels. The funnels list is in the main app, so `find("AI Avatars Funnel")` works there. Open the funnel → **Upsell #1** step → **Edit**, then wait about 14 s. Close Ask AI, scroll to the YES button, and select it. Its panel shows **Button Actions → link to = `One click up/down sell product`**, **Products = `AI Avatars System Upsell`**. That page's NO is also a native button (grey pill).
- Clicking that page's Products field focused it but **didn't open** it either.
- Nothing was saved or published on that page: it's a live funnel, and the standing rule is not to touch or delete the AI Avatars assets. Its header showed "Last saved Dec 17, 8:58 AM", not "Autosave off".
- **Outcome:** confirmed the exact labels. Copying the button wouldn't have helped, because its Products value would still need changing to this funnel's step product, and that is the same blocked select.

### A7. Back to the upsell page: the work was gone, rebuilt with save-as-you-go
- Navigating to `…/page-builder/LdwO92TMbPLv9CaOVOqI` showed the empty "Start Creating your Funnel Page" canvas again. All unsaved work was lost. No "Leave site?" prompt appeared when the browser-pane `navigate` left the builder.
- **Rebuild (all in one section):**
  1. Close Ask AI. Add panel → Sections → **Full Width**. Section **+** → Quick Add, clear the search (End, Backspace ×10), type `custom`, click **Code**. Open Code Editor → type the loader → modal **Save** → **page Save (floppy icon)** right away.
  2. After that first page save, an **"SEO & AI search optimization"** panel opened on the left (Preview, Content, Keywords, Author, Images, Links & tags, Language, Schema markup); close it with X. The header now read **"Last saved Nov 20, 6:44 PM"** and the Publish button had a yellow dot (saved but unpublished).
  3. Close the element panel and select the section/row. Click the **blue +** at the bottom of the "1 Column Row" to **add a row below**. Quick Add → clear the search → `button` → **Button**.
  4. Select the button. Set **Text** = YES copy and **Element name** = `YES button (one-click upsell)` (same as A5). **Save the page.**
  5. With the YES button selected, click the **orange +** at its bottom edge to **add an element below**. Quick Add → `custom` → **Code**.
- **General procedure:** save after every meaningful change. Treat "Autosave off" plus the yellow dot on Save as a hard stop before navigating anywhere.

### A8. The NO link as a Custom Code element, then save and publish
- **Why custom code instead of a second native button:** a decline only needs a plain link to the thank-you page. That avoids another GHL button setting the browser pane can't operate, and the fragment's CSS can style it.
- **Code typed:**
  ```html
  <a class="gtu-no" href="https://davidhsai.com/headstart-thank-you">No thanks, I'll keep guessing which products and hooks work, and take 10x longer to get my sales.</a>
  ```
- Modal **Save**, then page **Save**, then **Publish** (blue, top right). A toast reads **"Page published successfully"** and the URL bar badge reads **"• Live"**.
- The builder's own URL bar showed `https://davidhsai.com/upsell-page`. The live URL is the step path shown on the step Overview (`/headstart-upsell`), and that is the one verified.

### A9. Verify the live upsell (phone and desktop), fix it via GitHub, re-verify
- **Phone (393×852):** `resize_window` 393×852 on a separate tab, navigate to `https://davidhsai.com/headstart-upsell`, wait 5 s, screenshot. The alert bar and headline were fine, but the product image overflowed.
- **Overflow check run on the live page:**
  ```js
  const W=document.documentElement.clientWidth; ({W, scrollW:document.documentElement.scrollWidth,
   wide:[...document.querySelectorAll('#gtu *, .c-button, .c-button *, .gtu-no')].filter(e=>e.getBoundingClientRect().right>W+1).map(e=>(e.className||e.tagName)+' '+Math.round(e.getBoundingClientRect().width)),
   yes:!!document.querySelector('.gtu-yes'), no:!!document.querySelector('.gtu-no')})
  ```
  Result: `scrollW 778` against `W 393`; the offender was `shot 760`. `yes` and `no` were both true, so the native button and the NO link picked up the classes.
- **Fixes, all in the HTML in Git with no GHL edit needed:** `.shot{width:100%;max-width:760px}`; padding for `.c-button:has(.gtu-yes)` and `.c-custom-code:has(.gtu-no)`; bullet text wrapped in `<span>`, because a `<b>` became its own flex item; `.gtu-no` gets `text-align:center`. Push, then poll Pages until the new CSS marker string is served (`curl … | grep -q 'shot{width:100%'`).
- **Re-verify:** `scrollWidth` = 393. Screenshots were taken after scrolling to sections with `window.scrollTo(0, el.getBoundingClientRect().top+scrollY-N)` on `.bridge`, `.total`, and `.guar`. Desktop was checked at 1280×800, then `resize_window preset:"desktop"` reset the viewport.
- **Key point:** with the loader pattern, design fixes never need the GHL builder. Edit the file, push, wait about 60 s, and reload the live page (the loader fetches with `cache:'no-cache'`).

### A10. Checkout: after purchase → next funnel step
- **Before:** the checkout order form's **After purchase** was `Go to a website URL` = `https://davidhsai.com/headstart-thank-you`, which skipped the upsell.
- **How:** open the checkout builder (`…/page-builder/NPewVghQNsX2rU9aEb0q`, wait about 14 s, close Ask AI). Click the **order form** in the canvas. The right panel shows "Order Form" (Element name), the text "Steps, fields, products, the order bump, and theme all live in one full settings workspace.", and a **Customize order form** button (plus Mode: One-step, Fields: 2 shown). Click it to open the full-screen **Form settings** modal ("Everything for this order form, in one place — changes preview live and save automatically.").
  - Left nav: **Steps** (One-step), **Contact fields** (2 shown), **Products**, **Order bump** (1 bump), **Checkout options**, **Content**, **Theme & style**. A **LIVE PREVIEW** sits on the right.
  - **Checkout options** has the toggles Sticky contact, Create new contact on every purchase, Validate disposable email, Postal code on payment form (NMI/Authorize.net only), and Terms & conditions. Then **After purchase** ("Choose where the buyer lands after a successful payment."), a custom dropdown with **Go to the next funnel step / Go to a website URL / Choose a specific funnel step**.
  - **This dropdown does open** in screenshots (unlike the button selects). Hover plus Up plus Return landed on "Choose a specific funnel step" by mistake, so it was reopened and Up, Up, Return chosen; a zoom confirmed **"Go to the next funnel step"**.
  - Close the modal with its X (top right), then page **Save**, then **Publish**.
- **Verify:** the sales page on a phone still fits (`scrollWidth` 393, broken images 0).
- **General rule:** for a one-click upsell, the checkout must route to the next funnel step, which is the upsell step. A hard-coded thank-you URL silently skips the upsell.

### A11. Hand-off to the owner
- The README's GHL table got an upsell row ("Loader → offer-2-upsell/ghl-upsell.html + native GHL YES button (one-click upsell, $97 product …) + NO link to the thank-you page"). Also noted: "The checkout's after-purchase setting is 'Go to the next funnel step' (Checkout → Upsell → Thank You)."
- Closing message: everything is live **except** the YES action. Manual steps (about 30 s): 1) open the Upsell page in the builder; 2) click the YES button; 3) **Button Actions → link to = One click up/down sell product**; 4) **Products = My $4M TikTok Shop System**; 5) Save and Publish. "Until then, the YES button does nothing." The next-step box offered **"Done, test it"** and **"Use my Chrome"** (Claude in Chrome).
- "Where can I see the upsell page?" was answered with the live URL plus the edit path: **GHL → Sites → Funnels → "<funnel>" → Upsell → Edit**.

### A12. Bump copy rewrite and Remote Control (one owner message)
- **Feedback:** the bump text was too long, had too many numbers (37, 29 picks, 8 lanes, 8 viral), and was confusing. It should be concise and compelling enough that a 5th grader gets it.
- **Rewrite rule applied:** **one number, one clear promise, one time cue.**
  - Before: "Stop guessing what to sell. Get 37 hand-picked products you can start promoting this week: 29 picks across 8 lanes that sell all year, 8 viral scroll-stoppers, plus a seasonal calendar that shows you what's about to spike. Pick your first products tonight."
  - After: **"Stop guessing what to sell. Get my list of 37 products people are buying right now, so you can pick your first product tonight."**
  - Headline (`Yes! Add The Starter Product List`) and OTO headline (`Only $17 today. One-time payment.`) stayed as they were.
- **Remote Control:** the owner wanted to drive the desktop session from the Claude phone app; the phone told him to run "claude rc" in a terminal. That command is only for terminal Claude Code. In the desktop app, Claude called `mcp__ccd_session_mgmt__set_remote_control {"session_id":"self","enabled":true}`. A hook rewrote the input to add a `session` description string, and auto mode asked for the call to be **re-sent with exactly that input**. The second call returned `remoteControlState: "on"`.
  - Owner instructions: open the Claude app on the phone → **Code** section → open this session; keep the computer awake with the desktop app open; use the same account on both.
- **Side effects of Remote Control:** see F (pane resized, next-step box and AskUserQuestion behave differently).

### A13. Edit the bump description in GHL, publish, verify
- **How:** checkout builder → click the order form → **Customize order form** → **Order bump** → click the bump card **"Rickey · The Starter Product List — $17 · Customer selects"**. The modal then shows **CONTENT** "Editing for Rickey · The Starter Product List" with **Headline**, **OTO headline**, **Description** (textarea), **Custom image** (Upload image), **Preselect this product** toggle, and **Badge text**.
- **Clearing the textarea:** `cmd+a` does not work here. Click into it, press `cmd+Down` to jump to the end, then Backspace ×300 and Delete ×200. Zoom to confirm it's empty, then type the new text and zoom again to confirm.
- Close the modal (X) → page **Save** → **Publish**. The toast reads "Page published successfully" and the header shows "Last saved Nov 20, 6:58 PM".
- **Verify live:** 393×852 tab → `https://davidhsai.com/headstart-checkout`, then:
  ```js
  const b=document.querySelector('.order-form__bump'); window.scrollTo(0,b.getBoundingClientRect().top+scrollY-120);
  document.querySelector('.order-form__bump-desc').innerText
  ```
  This returned the new sentence exactly. A screenshot confirmed the styled bump (dashed red box, "⚡ ONE-TIME OFFER · ONLY ON THIS PAGE", arrow, checkbox, image). Then reset with `resize_window preset:"desktop"`.

### A14. Invite a teammate as a GHL user
- **Request:** "grant <teammate> access to the GHL account… invite him with his email, once it's done email <teammate> letting him know".
- **Find the address:** Gmail `search_threads` with `from:<name> OR to:<name>`, then `get_thread` on the teammate's latest thread. In that thread he had asked to be added as a HighLevel user to check the setup and run test purchases.
- **GHL steps (exact):**
  1. Navigate to `/v2/location/{loc}/settings/staff/team`. It redirects to `/v2/location/{loc}/settings/users?pageSize=20&page=1` (sidebar **Settings → MY BUSINESS → Users**). The page has a "User role All" filter, a search box ("name, email, phone, ids"), and **+ Add user**.
  2. **Search for the person first** to avoid duplicates; here the result was "No Users found".
  3. **+ Add user** opens `/settings/users/create`, titled "Add user". Left steps: **User info, Roles & permissions, Call & voicemail, User availability, Calendar configuration**.
  4. **User info → Personal Details:** Profile Image, **First name \***, **Last name \***, **Email \***, Phone, Extension; **Advanced settings ▾** (reveals **Password**); Calendar ("Select a calendar"); Signature. **Next** is disabled until the required fields are filled. Last name is required and wasn't known, so a placeholder last name was used (the org name); it can be fixed later in Settings → Users. **Password was left empty** so the invitee sets their own from the invite email.
  5. **Next → Roles & permissions:** a **Copy Permissions** button, **User role** (default **Admin**), a "Restrict data visibility to only assigned data" toggle, "Search permissions", and per-area toggles with counts: **Account Billing 1/1, Account Settings 2/2, Account Tools 1/2, AI Agents 11/11, AI Studio 1/3**, ASK AI, Audit Logs, Automation, Blogs, Calendars, Certificates, and more.
  6. **Ask the owner which role** before saving, since the Admin default includes billing. The options offered were "Admin, minus Billing" (Admin with Account Billing off), "Full Admin", and "User role". The owner chose **Full Admin**.
  7. Click **Save**. A toast reads **"User Created — The user has been created successfully."** The list row shows `<First Last> | <email> | id … | User type: Account - admin`.
- **Note:** Claude could not see whether GHL's invite email went out. It did; the teammate later confirmed he set his password from the invite and entered the login code.

### A15. Email the teammate (approval gate)
- Draft, written as a reply in the teammate's own thread with the manager on cc:
  > You're in. I added <email> as an admin on the HighLevel account (Hot Pursuit LLC). You should have an invite email from HighLevel to set your password. The funnel is "Rickey · TikTok Shop Headstart" on davidhsai.com: sales page, checkout with the $17 bump, the $97 one-click upsell, and the thank-you page. The course is in Memberships, and the delivery workflows are under Automation. Let me know when you're in and we can run the test purchase.
- Approval was first asked through AskUserQuestion, which came back **"Denied by user"**. The owner was on the phone via Remote Control. The draft was then shown in plain text with the question "send as written / without cc / change / skip?". After the owner's explicit "send the email … I approve", it went out with `send_message` (`replyThreadId`, subject `Re: <original subject>`, to = teammate, cc = manager). The body was sent unchanged.

### A16. Later: the teammate's "Error while bootstrapping the session"
- **Report:** the login itself works (password set from the invite, login code entered, session authenticated). But the dashboard stalls at **"Loading fresh data... Initializing..."**, then throws **"Error while bootstrapping the session"**, on every login and fresh reload. The page's own network requests succeed. The teammate guessed that "location access" for the sub-account wasn't checked.
- **What Claude checked:** sub-account **Settings → Users** (`/settings/users?…&query=<name>`). The user exists **inside the sub-account** with user type **Account - admin**, so missing location access is ruled out for a user created this way. No GHL setting was found that would fix it.
- **Workaround sent (owner approved with "ok"):** sign in with **"Continue with Google"** using the account-owner's Google login to get the full sub-account dashboard. Then do the funnel review (sales, $17 bump, $97 upsell, thank-you, Memberships course, delivery workflows) and the test purchase. The reply also restated the manager's rule: nothing goes live to real customers without the manager's sign-off.
- **Not tried yet**, worth adding to the playbook as next steps:
  - Have the teammate try a private window or another browser with extensions off, and clear site data for app.gohighlevel.com and leadconnectorhq.com.
  - Confirm with GHL support.
  - If the agency has its own white-label login domain, try that.
  - Prefer fixing the teammate's own login over sharing the owner's Google login (security and audit trail).
  - The outcome is unknown at the end of the log.

---

## B. One-click upsell: complete recipe and the browser-pane blocker

1. **Catalog product** (Payments → Products → Create Product): Title `<Client> · <Upsell name>`; **Include in Online store OFF**; Pricing → Type **Onetime**, Amount **97**; Save. There is no product-type field to set.
2. **Step product** (Funnel → Upsell step → **Products** tab → **+ Add Product**): **Products** = catalog product (search, hover, Return); **Price** = `<product> @ 97`; **Product name** = customer-facing name (clear the prefill first); optional Price display override; **Save**. The step product gets its own internal id.
3. **Checkout routing** (Checkout page → order form → **Customize order form** → **Checkout options** → **After purchase** = **Go to the next funnel step**) → close → Save → Publish. The step order in the funnel must be Checkout → Upsell → Thank You.
4. **Upsell page** (step **Overview → Create from blank**): section → Code loader (page HTML from Git) → row below → native **Button** with the YES text and **Element name** "YES button (one-click upsell)" → Code element with the NO `<a>` linking to the thank-you URL → **Save after every step** → **Publish**.
5. **YES button action:** select the button → General → **Button Actions** → **link to = "One click up/down sell product"** → **Products = <step product>** (here "My $4M TikTok Shop System") → Save → Publish. The default "Open popup" with no popup makes YES do **nothing**.
6. **Test:** a real or test purchase through checkout with the bump, then YES on the upsell, then confirm the next page and the charges. This was **not done** in the session.

**Why the browser pane couldn't do step 5:**
- The page builder at `app.gohighlevel.com/location/{loc}/page-builder/{page}` is a full-size **cross-origin iframe** from `page-builder.leadconnectorhq.com`. The browser pane's `find`, `read_page`, `form_input`, and `javascript_tool` only reach the top document. Clicks and typing reach the iframe as screen events.
- The "link to" and "Products" fields behave like **native `<select>` menus**. The open list is never drawn in screenshots. Typing an option name, arrow keys, Space, Return, and double-click don't change the value: arrows scrolled the panel, and Escape deselected the element.
- By contrast, the **custom (non-native) dropdowns** do work by coordinates plus keys: funnel step Products and Price (open, type to filter, hover, Return) and the order form's After purchase (open, Up/Down, Return, verify with zoom).

**What the human has to do:** the four clicks in step 5, in their own browser, then Save and Publish. Tell them the exact labels and the product name.

**Alternatives (none of these were tried):**
- **Claude in Chrome** (`mcp__claude-in-chrome__*`), driving the owner's real, signed-in Chrome. It was offered as the "Use my Chrome" button. It may be able to reach into the iframe and set the select with `form_input`. Unverified. Use it only if the owner agrees and is signed in to GHL there.
- **Open the iframe URL as the top-level page** (`https://page-builder.leadconnectorhq.com/location/{loc}/page-builder/{page}`) in the browser pane, so DOM tools are same-origin. Unverified; authentication may not carry over.
- **Saved Assets:** save a working YES button from another funnel with the element toolbar's save icon and insert it from **Add panel → Saved Assets**. Not useful on its own, because the Products select would still point at the other funnel's product.
- Ask the owner to do it. This is what happened, and it is the reliable fallback.

---

## C. Builder quirks and workarounds (this slice)

- **Open a page builder** from the funnel step **Overview → Edit**, or navigate straight to `https://app.gohighlevel.com/location/{loc}/page-builder/{page}`. Wait **12–14 s**. The tab context may note "served with HTTP status 404"; this is harmless on GHL app routes.
- **Ask AI panel** opens on load (blank pages and the checkout); close it with its **X**. It may also open in "Build" mode with a chat box.
- **Header:** **Back**, an autosave badge (**"Autosave off"** or **"Last saved <date time>"**), **preview (eye)**, **Save (floppy)**, and **Publish**.
  - A **yellow dot on Save** means unsaved changes.
  - A **yellow dot on Publish** means saved but unpublished.
  - After publishing, the toast reads **"Page published successfully"** and the URL bar badge shows **"• Live"**.
- **Toolbar:** **+** (add panel), Ask AI, layers and other tools, a page selector (shows the step name, e.g. "Upsell"), device toggles (desktop/tablet/mobile), zoom 100%, undo/redo, and the settings-panel toggle.
- **Saving:** there is **no autosave** on these pages. A Code element's modal **Save** only commits the code to the element; you still need the page **Save**. **Navigating away discards unsaved work with no prompt** (the first upsell build was lost this way). Save after each element. If you must leave the builder to look something up, save first or open the other page in a new tab.
- **First page save may pop an "SEO & AI search optimization" panel** on the left (Preview, Content, Keywords, Author, Images, Links & tags, Language, Schema markup). Close it with X.
- **Adding things:**
  - An empty page can't take elements directly: add a **section** first (add panel → **Sections → Full Width / Wide / Medium / Small**, or the canvas's **Blank Section**).
  - Inside a section, the **center +** opens **Quick Add**, sometimes on the second click.
  - The **green + on the section's bottom edge** adds a section below.
  - The **blue + on a row's bottom edge** adds a row below.
  - The **orange + on an element's bottom edge** adds an element below.
  - **Quick Add search:** the field keeps the last query, so clear it with End and Backspace ×10 before typing. `custom` finds the **Code** card (Custom group; it inserts "Custom HTML/Javascript"). `button` finds the **Button** card (Form group).
- **Toolbars on hover or selection:** left side has up/down (reorder), settings gear, and save-as-asset; right side has expand, **duplicate**, and delete. Sections are green, rows blue, elements orange.
- **Breadcrumb at the bottom** (Page › Section › 1 Column Row › 1st Column › <element>) confirms what is selected. Naming elements (Element name field, General tab) makes them identifiable there and on the canvas label.
- **Text fields:**
  - `cmd+a` doesn't select-all in many builder fields (button text, element name, textareas, and the funnel product name).
  - Clear with **End, then Backspace ×N, then Delete ×N**. In multi-line textareas, use **cmd+Down, then Backspace ×300, then Delete ×200**.
  - Typing into a prefilled field **inserts** into the existing value.
  - Always zoom to verify after typing.
- **Escape** deselects the current element (the panel shows "Select an element to see and edit its properties here"). It does not close dropdowns.
- **Code editor typing:** a roughly 500-character one-line loader typed fine in one `type` action. (Earlier in the day, long typing into the *email* source editor got garbled; type that in chunks.)
- **Live preview:** verify on the published URL in a separate browser-pane tab. That is same-origin for JS checks, unlike the builder. The builder's own URL bar can show a different slug than the step's live path.
- **Pane size changes** (e.g. after Remote Control was turned on, screenshots went from 800×523 to 800×668) invalidate coordinates. The batch fails with "this tab's page, zoom or size has changed; take a new screenshot". Take a fresh screenshot and re-locate everything.

---

## D. Order form and order bump settings

- **Where:** checkout page builder → click the order form element → right panel **Customize order form** → full-screen **Form settings** modal. The modal says it saves automatically, but the **page still needs Save and Publish** to go live.
- **Order bump section:**
  - **Enable order bumps** toggle.
  - A list of bump cards (e.g. "Rickey · The Starter Product List — $17 · Customer selects", with drag handle and remove ×).
  - **+ Add order bump**.
  - **PRESETS** ("All bumps"; styling for every bump on the form; picking a preset replaces the settings below): **Legacy, Ledger, Hairline** (selected here), **Accent Rail, Soft Tint, Ribbon Deal**.
  - Collapsible **LAYOUT** and **TEXT & COLOR**.
- **Bump text lives in the bump card:** click the card to get **CONTENT — "Editing for <product>"** with:
  - **Headline:** `Yes! Add The Starter Product List`
  - **OTO headline:** `Only $17 today. One-time payment.`
  - **Description**
  - **Custom image:** an **Upload image** button only, no URL field; the browser pane can't upload files.
  - **Preselect this product** toggle (off)
  - **Badge text**
- **Editing procedure:** click Description → `cmd+Down` → Backspace ×300 → Delete ×200 → zoom to confirm empty → type → zoom to confirm → modal X → page Save → Publish.
- **Other modal sections seen:** **Checkout options** (see A10 for After purchase), Steps, Contact fields, Products, Content, Theme & style. Visual polish of the bump (dashed border, glow, arrow, banner, inline image) was done with CSS/JS from the page's own loaded HTML, targeting the order form's DOM classes: `.order-form__bump`, `.order-form__bump-check`, `.order-form__bump-desc`, `.order-form__headline`, `.order-form__offer`, `.order-form__summary-row--total`, `.order-form__pay-head`. That works because the order form renders in the live page DOM.
- **Verify live:** on the published checkout (phone size), read `document.querySelector('.order-form__bump-desc').innerText`, scroll the bump into view, and take a screenshot. Earlier in the day the bump was also checked by ticking it and seeing the total change from $27 to $44 and back.
- **Copy rule from the owner's feedback (bumps and short offers):** short, one number, one concrete outcome, one time cue, no jargon. A 5th grader should get it.

---

## E. Users and team access

- **Path:** sub-account **Settings → Users** (`/v2/location/{loc}/settings/users`; the old `/settings/staff/team` redirects there) → search first → **+ Add user**.
- **Form:** User info (First name\*, Last name\*, Email\*, Phone, Extension, **Advanced settings → Password**, Calendar, Signature) → **Next** → Roles & permissions (**User role**: Admin default / User; "Restrict data visibility to only assigned data"; per-module toggles, Account Billing included by default; **Copy Permissions**) → **Save**. Call & voicemail, User availability, and Calendar configuration were not needed.
- **Choices to put to the owner** before saving (this is an access-granting action):
  - **Admin minus Billing:** turn off Account Billing; enough for funnels, payments, workflows, courses, and settings.
  - **Full Admin:** chosen this time.
  - **User:** may hide settings and payments pages the person needs.
- **Leave Password empty** so GHL's invite lets the person set their own. Never type a password. If the last name is unknown, ask, or use a placeholder and say so.
- **Result:** toast "User Created"; the list shows **User type "Account - admin"**, meaning a user of that sub-account.
- **What the invited person sees:** an invite email from HighLevel to set a password, then a login code (2FA) on first sign-in. Claude couldn't see the invite email from GHL's side; ask the person to confirm.
- **Follow-up email:** find the person's address in mail, reply in their access-request thread, show the draft, and send only after an explicit owner yes. Use cc only when the owner approves it (here the manager was cc'd).
- **"Error while bootstrapping the session":** see A16. Check first that the user shows as **Account - admin/user** inside the right sub-account. If they do, it's not a permissions setting. Workarounds: another browser or a private window, cleared site data, GHL support, or a temporary login with an owner-approved account. Don't proactively share owner credentials. Here the owner approved suggesting the owner's Google sign-in.

---

## F. Pitfalls and fixes

| Pitfall | Symptom | Fix |
|---|---|---|
| Builder has no autosave | "Autosave off" badge; yellow dot on Save; work vanished after navigating to another funnel | Page **Save** after every element; save before leaving; open other pages in a new tab |
| Code modal Save ≠ page save | Code appears in the canvas but is lost on reload | Modal Save, then page Save |
| Native selects in the builder (button "link to", "Products") | No list in screenshots; keys and clicks don't change the value; `find` returns no matches | Human sets them, or try Claude in Chrome with the owner's OK (unverified) |
| Builder is a cross-origin iframe | `find`, `read_page`, `form_input`, and `javascript_tool` see only the top app shell | Coordinates plus keys only; verify with zoom; do DOM checks on the live published page instead |
| Escape inside the builder | Deselects the element and closes its settings | Re-select the element and scroll back to the field |
| `cmd+a` doesn't select all | New text appended to old (product name, bump description, button text) | End or cmd+Down, then Backspace ×N, then Delete ×N; zoom to check |
| Prefilled "Product name" on a step product | Typed name got inserted into the prefilled one | Clear first, then type |
| Custom dropdown keyboard pick lands one off | After purchase landed on "Choose a specific funnel step" | Reopen, use Up/Down from the current value, Return; zoom to confirm the label |
| Checkout after purchase = website URL | Buyers skip the upsell | After purchase = **Go to the next funnel step** |
| YES button left at default | "Open popup" with no popup: YES does nothing | link to = **One click up/down sell product** + Products |
| Image overflow on phones | `scrollWidth` 778 vs 393 | `width:100%` with a max-width; check with the overflow JS on the live URL |
| Flex bullet split | First bullet broke into columns because of `<b>` | Wrap each `li`'s text in a `<span>` |
| Pages not deployed yet | Loader got a 404 or old CSS | Poll the Pages URL for a marker string after each push (about 60–70 s); the loader uses `cache:'no-cache'` and `if(!r.ok) throw` |
| Pane resized (Remote Control, user action) | Batch fails: "page, zoom or size has changed" | New screenshot, re-locate the coordinates |
| Remote Control tool call rewritten by a hook | "Hook changed this call's input… issue the call once more with exactly that input" | Re-send with the hook-provided `session` string, alone in that response |
| User on phone (Remote Control) | AskUserQuestion came back "Denied by user"; next-step box may not show | Ask in the closing text message with the choices spelled out |
| Borrowing from a live funnel | Risk of changing a live page | Open read-only; never Save or Publish someone else's page; don't touch the protected (AI Avatars) assets |
| GHL requires Last name | Can't proceed without it | Ask, or use a placeholder and report it so the owner can fix it in Settings → Users |
| Invite email not visible to Claude | Can't confirm it went out | Ask the invitee; resend from Settings → Users if it's missing |

---

## G. Open items left for the owner at the end of the slice

1. **Set the YES button action** on the Upsell page: Button Actions → link to = **One click up/down sell product** → Products = **My $4M TikTok Shop System** → Save → Publish. YES does nothing until this is done.
2. **Test purchase end to end:** checkout with the bump → upsell YES (confirm the charge and where it lands next) → thank-you; check both delivery emails and course access. Also test the NO link.
3. **Offer 2 delivery:** no course or workflow exists yet for the $97 product.
4. **Placeholders:**
   - WhatsApp link (thank-you `GT_LINKS.whatsapp` and the delivery email `WHATSAPP-LINK-GOES-HERE`)
   - support email
   - sender name and email
5. **Course thumbnail and videos** need uploading; the browser pane can't upload files. The bump's Custom image is also upload-only.
6. **Before making the repo private:** move PDFs and images to GHL Media storage, because the loaders fetch from public GitHub Pages.
7. **Upsell stack values** ($297/$47/$47/$37) are placeholders Claude made up; the client needs to approve them.
8. **Teammate access:** the "Error while bootstrapping the session" fix is unconfirmed (workaround: Google sign-in with the owner account). Replace the placeholder last name in Settings → Users.
9. **Go-live gate:** nothing goes live to real customers without the manager's sign-off.

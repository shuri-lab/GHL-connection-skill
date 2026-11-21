# Glossary: GoHighLevel words in plain English

Grouped by topic. "Rickey:" gives the real example from the Nov 20 2026 build.

## Accounts and access

| Term | Plain meaning |
|---|---|
| **GoHighLevel (GHL, HighLevel)** | An all-in-one marketing platform: pages, checkouts, payments, courses, email automations, CRM. App at `app.gohighlevel.com`. Some pages are served from `leadconnectorhq.com` (its white-label domain). |
| **Agency** | The top-level GHL account. It owns many sub-accounts and handles billing and company settings. We don't work at this level: if a new sub-account is needed, an agency admin creates it (Stage 0, "If the person picks Separate sub-account"). |
| **Sub-account / location** | One business inside the agency, with its own funnels, products, contacts, Stripe connection, domains, users. GHL calls it a "location"; its id is in every URL (`/v2/location/{loc}/...`). Rickey: "Hot Pursuit LLC", `54EJrjBw49eCsIsOZH44`, shared with another project. |
| **User** | A login with access to a sub-account. Created in Settings → Users. |
| **User role** | Admin (everything, including billing by default) or User (limited). Per-area permission toggles below the role (Account Billing, Account Settings, Automation, ...). |
| **"Account - admin"** | The user type shown in the users list for an admin of that sub-account. |
| **Ask AI** | GHL's built-in AI panel. It opens by default in the builder; close it. |

## Funnels and pages

| Term | Plain meaning |
|---|---|
| **Funnel** | An ordered set of pages a buyer goes through (Sites → Funnels). It has a name, a domain and a base path. Rickey: "Rickey · TikTok Shop Headstart". |
| **Step (funnel step)** | One stage of the funnel: sales page, checkout, upsell, thank-you. Each step has tabs **Overview** (its page), **Products** (what it sells) and **Publishing** (name and path). |
| **Page** | The actual web page behind a step, built in the page builder. A step can hold a control page and split-test variations. Each page has its own id (`/page-builder/{page}`). |
| **Path** | The URL part after the domain for a step (`/headstart-checkout`) or the funnel (`/headstart`, which shows step 1). |
| **Domain** | The website address the funnel runs on. Connected in Settings → Domains & URL Redirects; chosen in the funnel's Settings. |
| **URL Redirects** | Settings → Domains & URL Redirects → URL Redirects: send an old address to a new one (useful after a domain switch). |
| **Page builder (builder)** | GHL's drag-and-drop page editor. It runs inside a cross-origin frame, so browser automation can only click and type in it. |
| **Section / Row / Column / Element** | The builder's layout layers: a section holds rows; a row has 1 to 6 columns; columns hold elements (text, image, button, form, code). |
| **Quick Add** | The search panel that opens from a section's or column's "+" to insert rows and elements. |
| **Custom Code element ("Code", "Custom HTML/Javascript")** | An element that holds raw HTML, CSS and JavaScript. We put a small **loader** in it that fetches our page HTML from GitHub Pages. |
| **Tracking Code** | Page-level head/body code (the toolbar `</>` icon, and funnel Settings → Tracking & scripts). Not where page content goes. |
| **Element name** | A label you give an element (General tab) so it's identifiable on the canvas and in the breadcrumb. Rickey: "YES button (one-click upsell)". |
| **Save** | Stores the page in the builder (floppy icon). There is no autosave on funnel pages ("Autosave off"). |
| **Publish** | Makes the saved page live on the domain. Toast: "Page published successfully". |
| **Preview** | The builder's eye icon. For looking only: not for traffic or payments. Always check the live URL. |
| **Optimize JavaScript** | A funnel setting (on by default) that lazy-loads custom code. Turn it off for pages made of Custom Code. |
| **Saved Assets** | Elements or sections saved for reuse (element toolbar's save icon; add panel → Saved Assets). |

## Selling

| Term | Plain meaning |
|---|---|
| **Product (catalog product, "global product")** | Something you sell, in Payments → Products, with one or more prices. Synced to Stripe (live and test). Rickey: "Rickey · TikTok Shop Headstart", $27. Workflow filters call it "Global product". |
| **Price** | A product's price entry: Onetime or recurring, plus an amount. |
| **Product type** | Physical, digital, service, membership... New products here defaulted to **Physical** with no selector; courses create **Membership/Service** products. |
| **Include in Online store** | A product toggle (on by default) that lists it in a GHL store. Turn it off for funnel products. |
| **Step product** | A catalog product attached to a funnel step (step → Products → Add Product), with its own **public Product name** and its own id. The order form and the one-click button only see step products. |
| **Main Product / Bump Product** | The two roles a step product can have on a checkout step (step product → Additional Options). |
| **Order form** | GHL's native checkout element: contact fields, products, order bump, total, Stripe card field and buy button. Configured in its full-screen **Form settings** (Customize order form). |
| **Order bump** | A small extra product offered on the checkout as a checkbox ("Yes! Add ..."). Ticking it adds it to the same payment. Rickey: "The Starter Product List", $17. |
| **OTO** | "One-time offer". GHL's bump has an "OTO headline" (the price line). |
| **Upsell / one-click upsell** | An offer on the page after checkout. "One-click" = the YES button charges the card the buyer just used, without asking for it again. Rickey: "My $4M TikTok Shop System", $97. |
| **Downsell** | A cheaper offer shown after someone declines an upsell. Same button action. Not used for Rickey. |
| **"One click up/down sell product"** | The YES button's action (Button Actions → link to) that performs the one-click charge for the chosen step product. |
| **After purchase** | Order form setting (Checkout options): where the buyer goes after paying: next funnel step, a website URL, or a specific step. |
| **Stripe / payment provider** | The company that processes the card. Connected per sub-account in Payments → Integrations. Rickey's account: Stripe, Default, Connected (shared with another project). |
| **Test mode** | Stripe's sandbox. Purchases with Stripe's test cards charge nothing. Real buyers can't pay while in test mode, so only a switch that affects this funnel alone may be used (not located yet: `builder-quirks.md` F4), and the person types the test card. |
| **Transactions** | Payments → Transactions: real sales. Their presence shows an account is live. |
| **Statement descriptor** | The name on the buyer's card statement (product → Pricing → Additional options). Set it when the Stripe account isn't the client's, so buyers recognise the charge (Stage 1, Money and identity). |

## Courses and delivery

| Term | Plain meaning |
|---|---|
| **Memberships** | GHL's course hosting area. Tabs: Client Portal, Courses, Communities, Credentials, Gokollab Marketplace. |
| **Course** | A product in Memberships with modules and lessons. Rickey: "TikTok Shop Headstart" (Start here + Day 1 to 7). |
| **Module / Lesson** | A course section, and one video/text item inside it. New lessons are drafts until "Save and publish". |
| **Offer (course offer)** | An older way to sell or grant a course ("Offers (Advanced)"). Not needed for new-style courses: a workflow grants access. |
| **Client portal** | The buyer-facing site where they log in and see their courses. One per sub-account, with one name and logo for every client in it. URL format `https://<location id lowercase>.app.clientclub.net/`. |
| **Classic courses** | The older course system; a banner says it retires Dec 1, 2026 with automatic migration. |
| **Workflow** | An automation (Automation → Workflows): a **trigger** followed by **actions**. Must be saved and **published** to run. |
| **Trigger** | The event that starts a workflow. Rickey: **Order submitted** ("Fires after checkout completion in Funnel/Store"), with a **filter** on Global product. |
| **Filter** | A condition on the trigger: "Global product Is <product>" makes it fire only for that product. |
| **Action** | A step in a workflow: **Grant course access**, **Send email**, add tag, wait, and so on. |
| **Draft / Published** | A workflow's state (toggle at the top). Drafts don't run. |
| **Merge field / custom value** | Placeholders filled per contact: `{{contact.first_name}}`, `{{contact.email}}`. The `{+}` pickers insert them. |
| **From name / From email** | The sender shown on emails. Setting a name requires an email; with both empty GHL uses the account's default sender. |
| **Media storage (GHL Media)** | GHL's file storage for images, videos and PDFs. Where hosted files should move before the GitHub repo goes private. |
| **Contact** | A person record in the CRM. A checkout creates or updates one. |

## Our own terms (this playbook)

| Term | Plain meaning |
|---|---|
| **Fragment** | One page's HTML (styles, markup, scripts, no `<html>/<head>/<body>`) hosted on GitHub Pages. Rickey: `pages/1-sales-page.html` ... `4-thank-you.html`. |
| **Loader** | The ~500-character script in a Custom Code element that fetches a fragment and injects it (`loader.md`). |
| **Root id** | The unique `<div id="...-root">` each loader injects into (`gt-root`, `gtc-root`, `gtu-root`, `gtty-root`). |
| **Wrapper fix** | CSS at the top of a fragment that removes GHL's section/row/column padding and width cap around the root. Not used on the checkout's left column. |
| **Enhancer script** | The checkout fragment's script that adds the bump banner, arrow, image, placeholders and helper text, and re-adds them after GHL re-renders the form. |
| **Text tagging** | Finding native GHL buttons by their text ("YES!", "No thanks") and adding classes so the fragment can style them. |
| **Client prefix** | `Rickey · ` (with the middle dot) at the start of every internal name we create. Buyer-facing names have no prefix. |
| **Buyer tag** | A contact tag `<client>-<product>-buyer` added by each delivery workflow, so the client can find their buyers and other clients' broadcasts can exclude them. |
| **Money and identity** | The Stage 1 ★ block: whose Stripe, which card-statement name, which sender, which portal branding the buyer sees. |
| **★ gate** | A point in the stages where the person must act or decide. |
| **The phone check** | 393×852, no sideways scroll; on the checkout, the first form field is on the first screen. |

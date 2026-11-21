# Safety rules (read before touching any GoHighLevel account)

A GoHighLevel sub-account is shared, live and connected to real money (Stripe). These rules kept the Rickey build safe. They are not optional.

## Access
- **The person signs in. Claude never types a password**, never reads one out of an email, and never stores one in a file. If a login page appears, stop and ask the person to sign in, in the same browser Claude is using. Two-factor codes are the person's to enter.
- **Signing in as the account owner is a last resort**, used only if the account owner offers it (e.g. "Continue with Google" with the owner's account when a teammate's own user can't load the dashboard). Prefer fixing the teammate's own login first (Stage 0, "When a teammate can't load the dashboard"). Claude still never handles that password.
- **Use the browser the person is already signed in to:** the Claude desktop app's built-in browser pane, or Claude in Chrome if they prefer it.
- **Never enter card numbers.** Test purchases are made by the person: with their own card (then refunded by them), or in a test mode that affects only this funnel, with the person typing Stripe's published test card. Claude never types any card number. Never switch an account-wide test mode (Payments → Integrations): it blocks every real buyer in the sub-account.

## What you may touch
- **Only what this funnel needs.** Before creating anything, look around and list what's already in the sub-account (funnels, products, workflows, courses) and ask whether it's in use. The Hot Pursuit LLC account had an older "AI Avatars" funnel: David said it's unused but **don't delete it**. Reading its **live pages** for reference is fine; changing anything of it is not.
- **Never open another client's page builder,** not even "read-only": one stray Save changes their live page, and leaving a builder can break the session. Read their live pages instead. The one read-only look allowed into another client's items is the trigger of their Published workflows in the Stage 0 audit.
- **Never delete** funnels, pages, products, workflows, courses, contacts or users without the person's explicit yes for that exact item. Leave old things in place and rename or unpublish only if asked.
- **Never touch** without asking: the Stripe/payment integration, domains already in use, other users and their roles, billing, the agency/company settings, phone numbers, email sending domains, the client portal's branding.
- **Name everything you create with the client prefix** so it's easy to find and never confused with other work: `Rickey · TikTok Shop Headstart` (funnel), `Rickey · Headstart delivery` (workflow), `Rickey · My $4M TikTok Shop System` (product). Customer-facing names (the product name the buyer sees, the course title) stay clean.

## Money and identity on a shared account
- Buyers must not pay, receive email from, or log in to another client's brand without the person knowing. Stage 1 settles the Stripe account, the card-statement name, the sender and the portal branding in writing before anything is built.
- Read the default sender before using it. Never change another client's sender, portal or Stripe settings.

## Files
- **Paid deliverables never go on public hosting** (a public GitHub repo or Pages site): anyone could download them without paying. They go into the course (lesson attachment) or GHL Media, uploaded by the person.

## Before anything customer-facing changes
- **Publishing** a page, a workflow or an order form makes it live. Publish only what you were asked to build, and say what you published. A workflow is published only after its product filter was zoom-checked.
- **Emails** to real people (a delivery email test to the client, an invite email to a teammate) are shown to the person before sending.
- **Going live to real customers** (ads pointing at the funnel, a real launch) needs the sign-off the team requires. For TJ's projects: **TJ signs off** before real traffic.
- **Inviting users**: confirm the email address and the role with the person. Admin is broad (includes billing): ask which role.

## Records
- Write every ID, URL and name you create into `my-funnel/funnel-record.md` as you go (template in `templates/funnel-record.md`). The next person (or Claude session) needs it.
- Never put passwords, API keys, card details or customer data in any file or repo. From other clients' transactions, record only counts, amounts and dates.

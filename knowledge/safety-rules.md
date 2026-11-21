# Safety rules (read before touching any GoHighLevel account)

A GoHighLevel sub-account is shared, live and connected to real money (Stripe). These rules kept the Rickey build safe. They are not optional.

## Access
- **The person signs in. Claude never types a password**, never reads one out of an email, and never stores one in a file. If a login page appears, stop and ask the person to sign in, in the same browser Claude is using. Two-factor codes are the person's to enter.
- **Google sign-in works for the owner account.** If a teammate's own user can't load the dashboard ("Error while bootstrapping the session"), the person signs in with "Continue with Google" as the account owner (for Hot Pursuit LLC: the shuri@ Google account). Claude still never handles that Google password.
- **Use the browser the person is already signed in to:** the Claude desktop app's built-in browser pane, or Claude in Chrome if they prefer it.
- **Never enter card numbers.** Test purchases are made by the person, or in Stripe **test mode** with Stripe's published test cards.

## What you may touch
- **Only what this funnel needs.** Before creating anything, look around and list what's already in the sub-account (funnels, products, workflows, courses) and ask whether it's in use. The Hot Pursuit LLC account had an older "AI Avatars" funnel: David said it's unused but **don't delete it**. Reusing its pages for reference is fine; changing them is not.
- **Never delete** funnels, pages, products, workflows, courses, contacts or users without the person's explicit yes for that exact item. Leave old things in place and rename or unpublish only if asked.
- **Never touch** without asking: the Stripe/payment integration, domains already in use, other users and their roles, billing, the agency/company settings, phone numbers, email sending domains.
- **Name everything you create with the client prefix** so it's easy to find and never confused with other work: `Rickey · TikTok Shop Headstart` (funnel), `Rickey · Headstart delivery` (workflow), `Rickey · My $4M TikTok Shop System` (product). Customer-facing names (the product name the buyer sees, the course title) stay clean.

## Before anything customer-facing changes
- **Publishing** a page, a workflow or an order form makes it live. Publish only what you were asked to build, and say what you published.
- **Emails** to real people (a delivery email test to the client, an invite email to a teammate) are shown to the person before sending.
- **Going live to real customers** (ads pointing at the funnel, a real launch) needs the sign-off the team requires. For TJ's projects: **TJ signs off** before real traffic.
- **Inviting users**: confirm the email address and the role with the person. Admin is broad (includes billing): ask which role.

## Records
- Write every ID, URL and name you create into `my-funnel/funnel-record.md` as you go (template in `templates/funnel-record.md`). The next person (or Claude session) needs it.
- Never put passwords, API keys, card details or customer data in any file or repo.

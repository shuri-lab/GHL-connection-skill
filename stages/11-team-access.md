# Stage 11 of 12: Team access

**Goal:** every teammate who needs to review or test the funnel has their own GHL user in the sub-account, with the role the account owner chose, and has been told how to get in. Nobody's password was typed, shared or stored by you.

**Why:** on Nov 20 the copywriter (Moses, a person) asked to be added as a HighLevel user to check the setup and run the test purchase. Adding him taught three things: GHL's default role is **Admin, which includes billing**, so the role is the owner's call; **Last name is required** and wasn't known; and Claude can't see whether GHL's invite email went out. Later his own login loaded forever and ended in "Error while bootstrapping the session", and the owner unblocked the review with his Google sign-in.

**Read first:** `knowledge/safety-rules.md` (Access, "Inviting users"), Stage 0 "When a teammate can't load the dashboard".

## Before you start (inputs)
- Who needs access, their email address and full name. Find the address in the person's mail only if they ask you to, and use the address the teammate gave in their own request.
- ★ The role, confirmed by the account owner.

## Steps
1. Navigate to `…/v2/location/{loc}/settings/users` (sidebar **Settings → MY BUSINESS → Users**; the old `settings/staff/team` redirects to `settings/users?pageSize=20&page=1`). The page has a "User role All" filter, a search box ("name, email, phone, ids") and **+ Add user**.
2. **Search for the person first** (name, then email) to avoid a duplicate. Rickey's case: "No Users found".
3. **+ Add user** → `…/settings/users/create`, titled "Add user". Left steps: **User info, Roles & permissions, Call & voicemail, User availability, Calendar configuration**.
4. **User info → Personal Details:** Profile Image, **First name \***, **Last name \***, **Email \***, Phone, Extension, **Advanced settings ▾** (it reveals **Password**), Calendar ("Select a calendar"), Signature. **Next** stays disabled until the required fields are filled.
   - **Leave Password empty.** The invite email lets the person set their own. Never type a password here.
   - If the last name is unknown, ask. If the owner says to go ahead anyway, use a clear placeholder (Rickey's build used the organisation name) and list it as an open item ("fix in Settings → Users").
   - Leave Phone, Extension, Calendar and Signature empty.
5. **Next → Roles & permissions:** a **Copy Permissions** button, **User role** (default **Admin**), "Restrict data visibility to only assigned data" (leave off), "Search permissions", and per-area toggles with counts (Account Billing 1/1, Account Settings 2/2, Account Tools 1/2, AI Agents 11/11, AI Studio 1/3, Ask AI, Audit Logs, Automation, Blogs, Calendars, Certificates, …).
6. ★ **Ask the owner which role, before saving.** Offer:
   - **Admin minus Billing:** Admin with the **Account Billing** toggle off. Enough for funnels, payments, workflows, courses and settings.
   - **Full Admin:** everything, including billing.
   - **User:** may hide the settings and payments pages the person needs to review the funnel.
7. Set what they chose, then `find "Save"` → click the ref. The toast reads **"User Created"** followed by "The user has been created successfully." (GHL puts a dash between the two parts; if you search for it, `find "User Created"` only.) The list row shows the name, email, id and **User type: Account - admin** (or Account - user).
8. Call & voicemail, User availability and Calendar configuration are not needed for a funnel review.
9. **The invite:** GHL sends an invite email to set a password; on first sign-in the person also enters a login code. You can't see this from GHL. Ask the teammate to confirm they received it. If it's missing, look on their row in Settings → Users for a resend option, and tell the owner.
10. ★ **Tell the teammate** (only after the owner approves the exact text and recipients). Draft a short note: they've been added (role, sub-account name), the invite email lets them set a password, the funnel name and domain, where the course (Memberships) and the workflows (Automation) are, and what you need from them (e.g. the test purchase). Reply in their own access-request thread if there is one. cc someone only if the owner says so. Send only after an explicit yes.
    - If the owner is answering from the phone (Remote Control), a question card may come back "Denied by user" without them seeing it. Ask in a plain text message with the choices spelled out ("send as written / without cc / change / skip?").
11. **If they can't get in** ("Error while bootstrapping the session"): follow Stage 0. Check the user is listed as Account - admin/user in this sub-account first; then a private window or another browser, cleared site data, GHL support. Only if the owner offers it, as a last resort, they may let the teammate sign in with "Continue with Google" on the owner's account. You never handle that password; prefer fixing their own login.

## Verify
- Settings → Users, search the name: one row, the right email, User type as chosen.
- If you used a placeholder last name, it's listed as an open item.
- The teammate confirms they received the invite and can see the funnel (Sites → Funnels), the course (Memberships) and the workflows (Automation).
- No other user was edited.

## Rickey example values
- Teammate: Moses (the copywriter, a person), added on Nov 20 at his request "to check the setup and run test purchases".
- Search: "No Users found" → Add user → First/Last name (last name placeholder = organisation name), email from his own thread, password empty.
- Role: the owner (David) chose **Full Admin** out of "Admin minus Billing / Full Admin / User".
- Result: "User Created", row "User type: Account - admin".
- Note sent after David's explicit "send the email … I approve": a reply in Moses's thread, cc the manager (TJ), saying he was added as admin on the HighLevel account (Hot Pursuit LLC), the invite email sets his password, the funnel is "Rickey · TikTok Shop Headstart" on davidhsai.com (sales page, checkout with the $17 bump, the $97 one-click upsell, thank-you), the course is in Memberships and the delivery workflows are under Automation.
- Then: "Error while bootstrapping the session" on his login; workaround the owner approved: "Continue with Google" with the owner's account. Fix of his own login: unconfirmed.

## ★ Gates (ask the person)
- The teammate's email address and full name.
- The role (Admin minus Billing / Full Admin / User).
- The exact text and recipients of any message to the teammate.

## Done when
- [ ] Each teammate has one user in the sub-account with the owner's chosen role; password left to them.
- [ ] Invite receipt confirmed by the teammate (or listed as open).
- [ ] Any note to them was approved before sending.
- [ ] Users and roles recorded in `funnel-record.md` (no passwords, no personal data beyond what the record needs).

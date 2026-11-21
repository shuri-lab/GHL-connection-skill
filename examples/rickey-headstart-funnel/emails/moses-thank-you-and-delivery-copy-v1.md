# Rickey / Game Tape: thank-you page + delivery email (v1, Moses, 2026-11-20)

For David to load into HighLevel. [Brackets] = fill in from HighLevel. Offer 2's name stays a placeholder until David locks it.

## Thank-you page (after checkout, and after the upsell step)

**Headline:** You're in. Your Head Start begins now.

**Under it:** Everything is below and in your email. Start with Day 1 today, it takes about 15 minutes.

**Three steps, in this order:**
1. **Watch Day 1.** [Button: Open my course] (Memberships login)
2. **Download your guides.** [Button: 30-Day Guide (PDF)] · [Button: Starter Product List (PDF), shows only if they took the bump] · [Button: OFFER 2 NAME, shows only if they took the upsell]
3. **Join the Rickey Army.** My private WhatsApp channel, where I post what's working on TikTok Shop right now. [Button: Join the channel]

**Rickey's line at the bottom:** "Most people never make a sale because they wait until they feel ready. You just stopped waiting. See you in Day 1." Rickey

**Small print:** Didn't get the email? Check spam or Promotions, or write to [support email].

## Delivery email (HighLevel workflow, sends right after payment)

**Subject:** You're in. Here's Day 1
**Preview:** Your course login, your guides and the Rickey Army link.

Hey {{contact.first_name}},

You're in. Here's everything in one place:

1. Your course: [Open my course]. Your login: {{contact.email}}. [Set your password link]
2. Your 30-Day Guide: [Download]
3. [Only if bump] Your Starter Product List: [Download]
4. [Only if upsell] OFFER 2 NAME: [Open it]
5. The Rickey Army, my private WhatsApp channel: [Join]

Do Day 1 today. It's about 15 minutes, and it's the one that gets you moving.

Rickey

P.S. Stuck on anything? Just reply to this email.

## Build notes for David
- Workflow trigger: order form submitted / payment received for Offer 1. Separate branches (or tags) for the bump and upsell so each gets its link.
- Memberships: grant the Head Start course on Offer 1 purchase; grant the Offer 2 content on upsell purchase.
- Test before launch: one real purchase with bump + upsell (then refund). Done = this email arrives in under 2 minutes with every link working, course login works, channel link opens.

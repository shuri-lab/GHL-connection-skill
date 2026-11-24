# Funnel plan: [Client] · [Offer]

> Stage 1 output. Confirm with the person before building. Every name you create starts with "[Client] · ". Mark anything not known yet as "missing, asked on <date>".

## Account
- Sub-account (location name + id):
- Same or separate sub-account (Stage 0 answer):
- Off-limits in this account (existing funnels/products/workflows not to touch), in the person's words:
- Other clients' Published workflows flagged in Stage 0, and the owner's answer for each:
- Who signs off on going live:

## Domain
- Decision: preview links / existing domain with prefixed paths / the client's own domain (`knowledge/connect-a-domain.md`)
- Domain name:
- Trade-off told to the person (whose brand it is, expiry, what switching later involves):
- Slug (one lowercase word):

## Money and identity (★ Stage 1, step 4)
- Stripe account that receives the money (whose?) and the person's written answer:
- Card-statement name / product Statement Descriptor (up to 22 characters; needed if the Stripe isn't the client's):
- Default sender as read (Settings → Business Profile / Email Services):
- Sender to use (From name + From email, or "default sender, accepted on <date>"):
- Client portal name and logo as read, and the person's answer:

## Offer map
| Piece | Customer-facing name | Internal name | Price (one-time / recurring) | Delivered how (course with the file in Downloadable Resources / booking link / community invite) | Buyer tag |
|---|---|---|---|---|---|
| Main product | | [Client] · … | $ | Course access (Memberships) + email | [client]-[main]-buyer |
| Order bump (checkout only) | | [Client] · … | $ | Its own small course + its own email | [client]-[bump]-buyer |
| One-click upsell | | [Client] · … | $ | Course access + email, or booking link, or community invite | [client]-[upsell]-buyer |
| (Downsell, if any) | | | | | |

## Copy decisions
- Bump headline (`Yes! Add [Product]`):
- Bump OTO line (`Only $[price] today. One-time payment.`):
- Bump description (one pain + one number + one promise, about 130 characters):
- Upsell YES text (starts with `YES!`):
- Upsell NO text (starts with `No thanks`):
- Upsell offer stack: items and values (placeholders flagged for approval?):
- Guarantee (the client's real guarantee, word for word):
- Brand tokens (colours with hex, fonts, logo files):

## Legal, tracking, tax
- Privacy policy URL:
- Terms URL:
- Refund policy URL:
- Terms & conditions checkbox on the order form: yes / no
- Meta pixel id / GA4 measurement id (or "none"):
- Sales tax / VAT decision (the client's, with their accountant):

## Funnel steps
| # | Step | Path | Page source (fragment URL) | From the Sales Page Playbook (Rickey file only as a fallback) | Root id |
|---|---|---|---|---|---|
| 1 | Sales page | /[offer]-page | https://OWNER.github.io/REPO/… | | xx-root |
| 2 | Checkout | /[offer]-checkout | left column: …; right: GHL order form | Sales Page Playbook, Part 2: `dist/checkout-left.html` | xxc-root |
| 3 | Upsell | /[offer]-upsell | … + native YES button + NO link | | xxu-root |
| 4 | Thank you | /[offer]-thank-you | … | | xxty-root |

## Course (Memberships)
- Title, modules, lessons (titles), what the buyer gets access to:
- Course per product (main / bump / upsell) and the paid files of each (the person adds them):
- Videos ready? (the person uploads):
- Client portal URL:

## Who gets what (★ confirm: nobody gets what they didn't buy)
| Bought | Courses | Emails |
|---|---|---|
| Main only | | |
| Main + bump | | |
| Main + upsell | | |
| All three (one login) | | |
- Refund → access removed? yes / no / later:
- Support email (final or temporary):

## Delivery
- Purchase of main product → grant course + buyer tag + delivery email (subject, links)
- Purchase of bump → grant the bump's own course + buyer tag + email with the sign-in link (never a file link)
- Purchase of upsell → grant upsell course, or booking / invite link + buyer tag + email
- Links still missing (channel invite, booking link, support email, sender name/email):

## Team
- Who needs access, with which role:

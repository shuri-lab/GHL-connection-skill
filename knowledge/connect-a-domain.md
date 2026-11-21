# Connect a client domain

Use this when the Stage 1 domain choice is "connect a brand domain": the only domain in the sub-account belongs to another brand, or the client wants the funnel on its own name. It also applies to a new separate sub-account (Stage 0, "If the person picks Separate sub-account").

The Rickey build did not do this (it used the existing domain), so the GHL labels below are from the Settings page layout seen on Nov 20, not from a tested run. Take a screenshot before every click, read the labels on screen, and write anything that differs into `knowledge/feedback-log.md`.

## Who does what

| Task | Who |
|---|---|
| Buy the domain, if the client has none | ★ The person or the client. It is a purchase. Claude never buys anything. |
| Sign in to the registrar (GoDaddy, Namecheap, Cloudflare, Google, ...) and add the DNS records | ★ The person or the client. Claude never signs in to a registrar and never sees its password. |
| Add the domain in GHL, copy the records, poll DNS, verify, select it in the funnel | Claude, after the person's yes (it adds a row to the sub-account's Settings) |

## Pick the name first
- **Prefer a subdomain** of the client's site, e.g. `go.<client-domain>` or `join.<client-domain>`. It usually needs one CNAME record and leaves the client's main website and email alone.
- **Use the root domain** (`<client-domain>` itself) only when nothing else lives on it. Pointing the root at GHL moves the client's existing website away. Ask the person in those words before you choose it.
- ★ Write the chosen name in `my-funnel/funnel-plan.md` (Account section) and get a clear yes.

## Steps
1. ★ **Ask first:** "May I add `<domain>` to this sub-account in Settings → Domains & URL Redirects? It doesn't change any existing domain." Wait for a yes.
2. **Open the page:** navigate to `https://app.gohighlevel.com/v2/location/{loc}/settings/domain` (Settings → **Domains & URL Redirects**), wait 4 s, take a screenshot. Compare the existing rows with your Stage 0 audit. Don't touch them.
3. **Start the connection:** `find "Connect a domain"` (or "Connect Domain" / "+ Add domain") and click the ref. If GHL offers an automatic connection through the domain provider (it asks you to sign in to the registrar), don't use it: that is the client's login. Choose the manual option (e.g. "Add records manually").
4. **Type the domain** you agreed on. GHL then shows the DNS records to add. **Copy them exactly as shown** (type, host or name, value, TTL) into `my-funnel/funnel-record.md`. Don't use record values from memory or from old help pages: GHL changes them.
5. ★ **Hand the records to the person** in a small table, with plain steps: "At your domain registrar, open the DNS settings for `<root domain>`, add these records exactly, and save. Don't delete or change any other record." If the registrar is Cloudflare, add: "Set the record to DNS only (grey cloud), not proxied", unless GHL's own note on screen says otherwise. End your turn with a single "Records added" answer button.
6. **Poll DNS** from the terminal (no sign-in needed, short sleeps):
   ```bash
   for i in $(seq 1 60); do r=$(dig +short <TYPE> <full host name>); echo "$i: $r"; echo "$r" | grep -qi '<value GHL showed>' && { echo "resolves"; break; }; sleep 10; done
   ```
   Examples: `dig +short CNAME go.<client-domain>`; for a root domain, `dig +short A <client-domain>`. It usually resolves within minutes but can take hours. If it hasn't resolved after this loop (about 10 minutes), tell the person, and carry on with stages that don't need the domain (3, then 9 and 10) while you wait.
7. **Verify in GHL:** back on Domains & URL Redirects, click the domain row's **Verify** (or refresh) control by ref. Screenshot: the row must show it as connected or verified.
8. **SSL:** GHL issues the certificate after verification. It can take a few minutes, sometimes longer. Check with `curl -sI https://<domain> | head -1`: you want an HTTP status line, not a certificate error such as `curl: (60)` or `curl: (35)`. Buyers must never land on a page without working https.
9. **What the domain serves:** if GHL asks what to link the domain to (a default funnel or website), choose this client's funnel or leave it unlinked. Never link it to another client's funnel or website.
10. **Select it in the funnel:** Stage 4, step 9 (funnel Settings → Domain), with the exact name you connected.
11. **Re-run the path-collision check** (Stage 1, Verify): on a brand-new domain nothing else uses the paths; on a domain that was already connected, compare with every funnel that uses it.
12. **Record** in `funnel-record.md`: the domain, the records, who added them and when, the date GHL verified it, the date https worked.

## Verify
- `dig +short` returns the value GHL showed.
- The GHL domain row shows connected or verified, and no other domain row changed (compare with Stage 0).
- `curl -sI https://<domain>` gives a status line, no certificate error.
- After Stage 5 publishes the first page: `curl -s -o /dev/null -w "%{http_code}" https://<domain>/<slug>-page` → `200` (before that, a 404 is normal).

## If something goes wrong
- **It never resolves:** ask the person to re-read the record at the registrar letter by letter (a trailing dot, the host name typed twice as `go.<client-domain>.<client-domain>`, the wrong root). Poll again.
- **It resolves but GHL won't verify:** wait a few minutes and verify again; on Cloudflare, check the record is DNS only.
- **Never** delete or edit another domain row to make room, and never change the client's email records (MX, SPF, DKIM) here. A sending domain for email is a separate setting (Settings → Email Services) and the person's decision.

## Switching domains later
See Stage 1, step 3: links already shared break (add URL Redirects), a Meta pixel or verified domain must be re-verified, and an expiring domain takes the whole funnel down if it lapses.

# The loader: putting our HTML into GoHighLevel (or any builder with custom code)

## Why
- In the session, pasting 116 KB of page code into the builder's code editor wasn't possible: clipboard paste didn't reach the browser pane, and typing that much is slow and error-prone.
- So the builder element holds a ~500-character loader that fetches the page fragment from GitHub Pages and injects it.
- Side benefits: the page source stays in git, any `git push` goes live in ~1 minute with no builder edits, and the same fragment can be previewed directly at its Pages URL.
- It works because GitHub Pages sends `access-control-allow-origin: *`, which was checked with `curl -sI … | grep -i access-control`, so a page on another domain can `fetch()` the file.

## Generic loader (final form, with the 404 guard)
This is `templates/loader.html` spread over several lines so it's readable. In GHL you type the **one-line** version from the template (or Stage 5), with `X-root` replaced by the page's root id in both places.
```html
<div id="X-root"></div>
<script>(function(){
  var u='https://<owner>.github.io/<repo>/<folder>/<fragment>.html';
  fetch(u,{cache:'no-cache'})
    .then(function(r){ if(!r.ok){ throw 0; } return r.text(); })
    .then(function(h){
      var root=document.getElementById('X-root');
      root.innerHTML=h;
      // innerHTML never runs <script> tags: re-create each one so it executes
      root.querySelectorAll('script').forEach(function(s){
        var n=document.createElement('script');
        if(s.src){ n.src=s.src; } else { n.textContent=s.textContent; }
        s.parentNode.replaceChild(n,s);
      });
    }).catch(function(){});
})();</script>
```
- One unique root id per page: `gt-root` (sales), `gtc-root` (checkout left), `gtty-root` (thank-you), `gtu-root` (upsell).
- `cache:'no-cache'` makes the browser revalidate every load, so pushes show up without hard refreshes.
- Version history in the session:
  - The first loaders had no `r.ok` check. The checkout's left column once rendered **GitHub's 404 page** because Pages hadn't deployed the new file yet. Later loaders added `if(!r.ok) throw` plus `.catch`.
  - The sales-page loader also copies `s.src` for external scripts. The later ones only copied inline `textContent`, because those fragments had only inline scripts. Use the full version above.

## Fragment contract (what each fetched file must contain)
1. **Wrapper fix first** (see "Wrapper-padding fix" below), using the same root id. **Except the checkout's left column** (a two-column page): no wrapper fix there, see `checkout-recipe.md` §2.
2. Font `<link>`s (and `preconnect`). They work when injected into the body.
3. CSS **scoped under a unique container id** (`#gtc`, `#gty`, `#gtu`), with `!important` only where builder styles must be overridden.
4. **Absolute URLs** for every image, `srcset` entry and CSS `url()`, pointing to the static host.
5. Inline scripts only. Make them idempotent and tolerant of late DOM (retry interval and/or MutationObserver).
6. `document.title='…'` in a script. The builder page title came back empty, so the fragment sets it.
7. Config at the top for anything the client fills in later, e.g. `var GT_LINKS={course:'…',whatsapp:'',support:''}`. An empty value shows a graceful placeholder state (greyed button + "coming to your email" note).
8. No `<html>/<head>/<body>`.

## Wrapper-padding fix
Builders wrap custom code in several layers that add padding and a max-width. To diagnose, walk up from the root and print each layer:
```js
let a=[],e=document.getElementById('X-root');
for(let i=0;i<10&&e;i++){const cs=getComputedStyle(e);a.push(e.tagName+'.'+String(e.className).split(' ').slice(0,2).join('.')+' p:'+cs.padding+' mt:'+cs.marginTop+' mw:'+cs.maxWidth+' top:'+Math.round(e.getBoundingClientRect().top));e=e.parentElement}
a
```
Found here: column `p:10px 5px`, row `p:10px 5px`, an inner `max-width:1170px`, and a section with `padding-top:20px`. The section is a **`div` with a `section-XXXX` class, not a `<section>` tag**, so the first rule missed it and left a 20px white strip on the thank-you page. Final rule, prepended to every fragment **except the checkout's left column** (on that two-column page `width:100%` on the column would push the order form under it; see `checkout-recipe.md` §2):
```css
section:has(#X-root),[class*="section-"]:has(#X-root),.c-row:has(#X-root),.c-column:has(#X-root),
.inner:has(#X-root),.c-custom-code:has(#X-root),.custom-code-container:has(#X-root)
{padding:0!important;margin:0!important;max-width:none!important;width:100%!important}
```
- It needs `:has()` (current Chrome, Safari and Firefox; older browsers would just keep the padding).
- Also turn on the builder's own "full width rows" and zero section padding as a fallback.
- The same `:has()` trick restyles native elements next to the fragment (the upsell button wrappers, the checkout section padding on phones).

## Deploy and verify loop
1. Edit the fragment → `git add -A && git commit -m … && git push`.
2. Poll Pages until the **new content** is served (not just HTTP 200, because the CDN can serve the old file for a while). Use a cache-buster and a marker string from the change: `for i in $(seq 1 18); do curl -s "<url>?r=$i" | grep -q '<marker>' && { echo "live after ~$((i*10))s"; break; }; sleep 10; done`. Observed: 50 to 70 s typically, once 10 s. One check after a fixed `sleep 45` still saw the old file.
3. Reload the live step URL (`https://<domain>/<step path>`, never the builder) at 393×852 and 1280×800. Run the overflow check and screenshots.

## Limits and production advice
- The page depends on a **public** repo and GitHub Pages uptime. **Before making the repo private,** move the code into the builder (the full page HTML, e.g. the Sales Page Playbook's `paste-ready.html`) and the images into the platform's media storage, or the pages go blank. Paid PDFs never belong on the public repo in the first place (Stage 2).
- Content appears only after JS runs. Turn off any builder setting that lazy-loads custom code (in this builder, "Optimize JavaScript"). Crawlers that don't run JS see an empty page, which is fine for ad-traffic funnels and bad for SEO pages.
- The Sales Page Playbook's intended production path is still: host images on the platform and paste the full page. Those files are **in the Sales Page Playbook repo, not in this one**: `MAKE-YOUR-PAGE-LOAD-FASTER.txt` step 4, `export_final.py --images urls --urls image-urls.json`, then paste `paste-ready.html` (target under 150 KB with hosted images).

---


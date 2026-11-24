# GHL builder and UI quirks (and the exact workaround for each)

Read this before Stage 0 (Stage 0 needs §1 and S1 to S11; the rest before Stage 4). Every quirk below cost time on the Rickey build (Nov 20 2026). The workaround is the one that worked, not a guess.

Conventions: `{loc}` = sub-account (location) id, `{funnel}` = funnel id, `{step}` = funnel step id, `{page}` = builder page id. "Pane" = the Claude desktop app's built-in browser (`mcp__Claude_Browser__*`). Coordinates are always from the latest screenshot.

---

## 1. What your browser tools can reach (read this first)

GoHighLevel is three different worlds. Your tools behave differently in each.

| Surface | URL | `find` / `read_page` / `get_page_text` | `javascript_tool` | `form_input` | Clicks, keys, `type`, `zoom` |
|---|---|---|---|---|---|
| **App shell**: funnels list, funnel Settings, step tabs (Overview, Products, Publishing), Payments → Products, Settings → Users, workflows list, Memberships | `https://app.gohighlevel.com/v2/location/{loc}/...` | Yes. Click by ref. | Yes | Not used on Nov 20. For Vue-controlled inputs (step path) the native value setter worked (section 6). | Yes |
| **Page builder** (sales, checkout, upsell, thank-you pages) | `https://app.gohighlevel.com/location/{loc}/page-builder/{page}` (no `/v2`). It wraps a full-size **cross-origin iframe** from `https://page-builder.leadconnectorhq.com/location/{loc}/page-builder/{page}` | **No.** They see only the top shell. `get_page_text` returns an empty body. `find` says "No matches". | Top page only. It can list the iframe but not read inside it. | No | Yes, as screen events. This is the only way to work in the builder. |
| **Workflow email editor, source view** | inside the workflow builder | No | No | No ("the form tool can't reach it": cross-origin frame) | Yes, in short chunks (section 5) |
| **Live published page** | `https://<domain>/<step path>` | Yes | **Yes, same-origin.** Do every DOM check here. | n/a | Yes |

Rules that follow from this table:
- In the builder, work only with **screenshots, coordinate clicks, `key`, `type` and `zoom`**. Take a fresh screenshot before every coordinate click.
- **Verify builder work on the live URL**, in a separate pane tab, with JS. That page is same-origin, so `javascript_tool` reads the real DOM (the order form, the injected fragment, the native buttons).
- **Never open the iframe URL (`page-builder.leadconnectorhq.com/...`) directly** in a tab. On Nov 20 it showed 404 or a blank page, and soon after the whole GHL session broke: endless spinner, `401`/`403` in the console, and the person had to sign in again.
- The Memberships course editor and the workflows canvas were driven with coordinates and keys. In the course editor, `find` did return refs for a dropdown option (section 7).

---

## 2. Quick table: quirk → workaround

### Session and tooling

| # | Quirk | Symptom | Workaround that worked |
|---|---|---|---|
| S1 | Every app route says "served with HTTP status 404" in the pane | Tab context note after `navigate` | Harmless (single-page app). `wait` 4 to 8 s, then read or screenshot. |
| S2 | Sign-in page appears | `navigate` lands on `https://app.gohighlevel.com/?url=...` | Stop. Ask the person to sign in, in the same pane, with a single "Signed in" button. Never type a password. Navigate to the dashboard again and wait 4 s. |
| S3 | Session expiry | Endless spinner; `find` finds nothing (e.g. "Create from blank" missing); console shows `401`, `403`, `[whatsapp] init catch ... 403` | Stop retrying. Tell the person honestly (including if you caused it), list done vs. left, ask them to sign in again. |
| S4 | Builder iframe URL opened on its own | 404 or blank, then 401s and a lost session | Never do it. |
| S5 | Clipboard doesn't reach the pane | `pbcopy` + `cmd+v` pastes nothing | Type instead. For big HTML, type a ~500-character loader (see `loader.md`). |
| S6 | No file picker in the pane | A normal upload can't be driven | **App pages (courses): a script can fill the file input** with a `File` made from a public, CORS-readable URL (`DataTransfer`, `stages/9-course-memberships.md` F). Use it for images. **Paid files: the person drags them in** (never make them public to upload them). Tested and blocked: reading `http://localhost` from a GHL page. Builder frames (bump custom image): no, inject from the fragment. |
| S7 | A page tries to open a new tab | The pane blocks it (e.g. the step's open-in-new-tab icon) | `tabs_create`, then `navigate` that tab to the URL. |
| S8 | Emulated size cleared | Batch fails with "this tab's page, zoom or size has changed; take a new screenshot" | Happens when the pane width changes, when the turn ends, when the person resizes, or when Remote Control is turned on. Take a new screenshot, re-locate everything, set the size again if you need it. After phone checks, reset with `resize_window preset:"desktop"`. |
| S9 | The person clicked in the pane | Tool reports "the user clicked or pressed keys..." | Re-screenshot and re-find refs before acting. |
| S10 | Long waits in Bash | A chained `sleep 60` is blocked by the harness | Use a polling loop with short sleeps (section 9). |
| S11 | Remote Control on | The pane resized (screenshots went from 800×523 to 800×668); `AskUserQuestion` came back "Denied by user"; the next-step box may not show | Re-screenshot before clicks. Ask questions in plain text with the choices spelled out. Details in section 10. |
| S12 | Which pane size where | Menus don't open, or controls hide | **1440×1000** for the page builder, workflow builder and course studio. **Native size** (`preset: desktop`) for the workflow list, Create workflow, contacts and Add automation. 1600×1100 to read conversations. 393×852 for phone checks. Reset to desktop after. |
| S13 | Half-loaded pages take the wrong click | A click on a loading contacts list opened another person's contact | Wait (builder 16 s, workflow 16 to 28 s, course studio 10 to 20 s, contacts 20 s), screenshot, then click. Never chain clicks after a navigation. |
| S14 | Cloudflare "Verify you are human" on the checkout | Fails in the pane even when a person ticks it | Don't retry, don't work around it. The person buys in their own Chrome. |
| S15 | Survey and notice popups | Cover Save or Next | Close them first. Don't click "See what's new" (migrations). |
| S16 | `find` misses many GHL buttons ("Next", "Create workflow", "Add Contact") | No refs | Screenshot + coordinates, or a JS click by exact text on app pages. |
| S17 | A page wrote to the person's clipboard during scripted clicks | The app warned them | Mention it if it happens. |

### Navigation and URLs

| # | Quirk | Workaround |
|---|---|---|
| N1 | The builder URL has **no `/v2`** | `https://app.gohighlevel.com/location/{loc}/page-builder/{page}`. Open it from the step's Overview → **Edit**, or navigate to it. Wait 12 to 15 s. |
| N2 | Step "Publishing" deep link `.../steps/{step}/publishing` is blank | The real route is **`/publish`**. Open `/overview`, click the **Publishing** tab by ref once; after that `/publish` works directly. |
| N3 | `memberships/courses/products` may show only the empty shell | Use the menu: Memberships → **Courses ▾ → Products** (lands on `/memberships/courses/products-v2`). |
| N4 | `settings/staff/team` | Redirects to `settings/users?pageSize=20&page=1`. Use that. |
| N5 | `automation/workflows` | Lands on `?listTab=all` after a few seconds. |
| N6 | The builder's own URL bar shows a different slug (it showed `/upsell-page`) | Trust the URL on the step **Overview** (`/headstart-upsell`) and verify that one live. |

### Building pages

| # | Quirk | Workaround |
|---|---|---|
| B1 | Builder opens with the **Ask AI** panel covering the left side | Close it with its X first. It may open in "Build" mode with a chat box. |
| B2 | **Empty page: elements can't be added** | Add a section first: the canvas's **Blank Section**, or toolbar **+** (far left) → **Sections** → **Full Width / Wide / Medium / Small**. "Insert Element" → search → click card added nothing on a blank page. |
| B3 | **Drag-and-drop never registers** | Select the section or column, open its **+**, search in **Quick Add**, then **click** the card. |
| B4 | The section's center **+** sometimes needs two clicks | First click selects the section, second opens Quick Add. |
| B5 | Which **+** does what | **Green +** on a section's bottom edge = add a section below. **Blue +** on a row's bottom edge = add a row below. **Orange +** on an element's bottom edge = add an element below (same column). |
| B6 | Quick Add search keeps the last query | Click the search box → `End` → `Backspace` ×10 → `zoom` (empty) → type (the T2 recipe). Don't rely on `triple_click` (it worked once) or `cmd+a` (it didn't). |
| B7 | Finding the Custom Code element | Search `code` or `custom` → the **Code** card in the "Custom" group (next to "QR Code"). It inserts **"Custom HTML/Javascript"** wrapped in a "1 Column Row". The right panel calls it "Custom Code" (tabs General / Styles, Element name, **Open Code Editor**). |
| B8 | The toolbar `</>` icon | It is **page-level Tracking Code**, not a Code element. Don't use it for page HTML. |
| B9 | Rows with columns | Quick Add → **Rows** → 1 to 6 Column. The checkout uses **2 Column**. Then each column's **+** adds into that column. |
| B10 | Order form and buttons | Quick Add search `order` → **Order Form** card. Search `button` → **Button** card (Form group). New buttons say "Get Started" and default to link to "Open popup". |
| B11 | Element toolbars (on hover or selection) | Left: up/down (reorder), settings gear, save-as-asset. Right: expand, **duplicate**, delete. Sections are green, rows blue, elements orange. |
| B12 | Knowing what is selected | The **breadcrumb at the bottom** (Page › Section › 1 Column Row › 1st Column › element). Click a crumb to select that parent. Set **Element name** (General tab) so elements are identifiable on the canvas label and the breadcrumb. |
| B13 | **Escape** in the builder | Deselects the element ("Select an element to see and edit its properties here"). It does not close dropdowns. Re-select and scroll back to the field. |
| B14 | Section settings don't remove all padding | Section → General → "Allow Rows to take entire width" = on, and Styles → Margin & Padding top/bottom = 0 (preset chips 0 / 10 / 20 / 40 / 60 / 80 / 100 / 140, then Escape). The row and column still pad (`10px 5px`) and an inner div caps width at 1170 px. Fix it with the wrapper-fix CSS in the fragment (`loader.md`). |
| B15 | GHL sections are `div`s, not `<section>` | Class pattern `c-section ... section-XXXX`. Rows `.c-row`, columns `.c-column > .inner`, code `.c-custom-code` / `.custom-code-container`, buttons `.c-button`. Target with `[class*="section-"]:has(#root)`. |
| B16 | Page title is empty on the live page | Set `document.title='...'` from the fragment's script. |

### Typing and clearing fields

| # | Quirk | Workaround |
|---|---|---|
| T1 | Code editor | Typing is verbatim: no auto-closing of brackets, tags or quotes (tested with `<!-- test -->` and `<div style="a:b">x(y){z}['q']</div>`). A ~500-character one-line loader goes in with one `type` action. Clear it with click inside → `cmd+a` → `Delete` (select-all works here). `zoom` on the editor before saving. |
| T2 | **`cmd+a` does not select all** in many fields: color hex, lesson name, bump Description, step product name, button Text, Element name, Quick Add search, email source | Click the field → `End` (or `cmd+Down` in a textarea) → `Backspace` ×N → `Delete` ×N → `zoom` to confirm it's empty (placeholder visible) → type once → `zoom` again. N must exceed the text length: 20 for a hex, 80 to 100 for a title, 300 to 500 for a textarea. |
| T3 | `triple_click` + type | Did not replace the hex value. Did work once in the Quick Add search. Don't rely on it. |
| T4 | Prefilled fields **insert** typed text at the cursor | The step product "Product name" is prefilled with the catalog name. Lesson titles came out appended ("Day 2", "Day 3" were wrong). Always clear first (T2). |
| T5 | Email source view garbles long input | Long HTML typed in one go dropped keystrokes and duplicated "Hey". Type one paragraph per `type` action (about 100 to 230 characters), `wait` 1 s between, `zoom` after each batch. |
| T6 | Email source view ignores modifiers | `cmd+a`, shift-selection and `form_input` all fail there. Cancel the source dialog → click the body in the **visual** editor → `cmd+a` → `Backspace` (works there) → reopen source → type in chunks. |
| T7 | Email editor strips paragraph spacing | Put inline `style="margin:0 0 16px;font-family:Verdana,sans-serif;font-size:16px;line-height:1.6"` on every `<p>`. |

### Dropdowns

| # | Kind | Seen in | What works |
|---|---|---|---|
| D1 | **Native `<select>` inside the builder iframe** | Button → General → **Button Actions → "link to"** and **Products** | Clicking, typing words, arrows: nothing. **Works:** Ask AI (Build) for "link to"; for Products click once to focus, then **one `key` press** of the option's first letter; zoom (`stages/7-upsell-step.md` D). |
| D2 | **Custom (GHL-drawn) dropdowns** | Step Products and Price pickers, course lesson module, workflow trigger filters, order form **After purchase** | Open → type to filter (if it has a search) → **`hover` the option → `Return`**. Most reliable. Plain clicks on options often don't register. Separate key presses (`Down`, `Down`, `Return`) also work; one combined `"Down Down Enter"` string did **not** work in the order form modal. Keys can land one option off: `zoom` to read the chosen label every time. |
| D3 | App-shell select | Funnel Settings → **Domain** | Option clicks didn't select; one `key` string of `Down`s + `Enter` did. On a shared account the list holds other brands' domains, so **never use a fixed count**: open the list, screenshot, count the position N of the domain confirmed in Stage 1, send N `Down`s + `Enter` in one `key` action, then `zoom` and compare letter by letter. Wrong → **Remove** and retry with N one higher or lower. (Rickey only: `Down Down Enter` picked `davidhsai.com`.) |
| D4 | Wrong item picked by coordinates | Step Products dropdown picked "AI Avatars System Upsell" | Escape, reopen, pick again, screenshot before saving. |
| D5 | Course module dropdown | Add Content → Lesson → module | Plain click failed; keyboard worked once then stopped; `find` ref click highlighted the option and `Return` confirmed; `hover` + `Return` was the most reliable. |

### Saving and publishing

| # | Quirk | Workaround |
|---|---|---|
| P1 | **"Autosave off"** in the builder header | There is no autosave on funnel pages. Press the page **Save** (floppy disk, top right, next to the eye/preview) after every element. |
| P2 | Unsaved / unpublished markers | **Yellow dot on Save** = unsaved changes. **Yellow dot on Publish** = saved but not published. After a save the header reads "Last saved <date time>". |
| P3 | **Code modal Save ≠ page Save** | The "Custom Javascript/HTML" modal's Save only commits code to the element. You still need the page Save, then Publish. |
| P4 | **Navigating away discards unsaved work, with no prompt** | The first upsell build (code, YES button, NO button) was lost when Claude navigated to another funnel to inspect a button. Save before leaving; open other pages in a new tab. |
| P5 | First page save opens "SEO & AI search optimization" | A side panel (Preview, Content, Keywords, Author, Images, Links & tags, Language, Schema markup). Close it with X. Also opened once when a click landed near Save. |
| P6 | Publish | Blue **Publish** (top right). No dialog. Toast "Page published successfully"; the URL bar badge shows "• Live". |
| P7 | Order form "Form settings" modal | Says changes preview live and save automatically. True for the form, **but the page still needs Save + Publish** to go live. Close the modal with its X first. |
| P8 | Save buttons in the app shell | Click **Save by ref** (`find "Save"`; `find "Save button"` found nothing). A coordinate click on the product form's Save hit the **Media Storage** picker after the layout shifted. |
| P9 | **Funnel Settings Save jumps back to the Steps view** | Your next coordinate click lands on a step (it hit the open-in-new-tab icon). Navigate to `/funnels/{funnel}/settings` again before the next change. |
| P10 | Workflow builder | Top-right **Save**, then the **Draft → Publish** toggle. A prompt about the save mode appears on a new workflow: keep **manual save** so no account setting changes. |
| P11 | **A workflow action's change silently lost** (saved, yet the old sender was back after a reload) | Order: wait 3 s → Save action → wait 5 s → **see the panel closed and a blue Save with a red dot** → top Save → zoom "Saved" → reload and reopen the action. |
| P12 | Duplicate workflow: the row menu never opened | Build from scratch. |
| P13 | Course row status pill (Published ▾ → Draft): a first click can miss while the menu loads or after a scroll | One at a time, 3 s, screenshot. |

### Funnel settings

| # | Quirk | Workaround |
|---|---|---|
| F1 | **Optimize JavaScript is on by default** ("Custom javascript and html codes added will be lazy loaded") | Turn it **off** for any funnel built with Custom Code. Toggle by JS (section 6), Save by ref, re-navigate. |
| F2 | Step paths default to `/sales-page`, `/checkout`, `/upsell`, `/thank-you`; funnel path to `/<client>--<offer>` | On a shared domain these collide. Set `/<offer>-page`, `/<offer>-checkout`, ... via the native value setter (section 6). |
| F3 | No free GHL default domain in the account | The Domain list showed only the connected domain. Choose with the person (Stage 1, step 3; `pitfalls.md` 8); to use the client's own domain, follow `connect-a-domain.md` first. |
| F4 | Funnel-scoped test/live payment mode | **Funnel → Settings → Payments & checkout → Payment mode** (on = Live, off = Test). Affects this funnel only. Save by ref, reload, read it back; the live checkout shows TEST MODE. Script in `stages/12-test-and-go-live.md` C. Switch back to Live after the test. |

### Batching

| # | Quirk | Workaround |
|---|---|---|
| X1 | A long `browser_batch` of coordinate clicks aborts at the first failure | 18 actions died at the first click after the pane size changed. |
| X2 | **Batched clicks silently drop changes** | 8 fast eye-toggle clicks left Company, Country and City visible; the step product price and name didn't stick. Do one or two clicks per batch with a 1 to 2 s `wait`, then screenshot and check. |
| X3 | Layout shifts after typing or when panels open | Re-screenshot before the next coordinate click. |

### Checking your work

| # | Quirk | Workaround |
|---|---|---|
| V1 | **Preview vs live** | The builder preview is not for real traffic or payments. Check the **live step URL** in a separate pane tab, with JS metrics and a screenshot, at 393×852 and at desktop width. |
| V2 | **Caching** | GitHub Pages serves the old file for 10 to 70 s (once more than a minute) after a push. Poll for a marker string with a cache-buster before checking live (section 9). The loader fetches with `cache:'no-cache'`, so a normal reload is enough once Pages serves the new file. |
| V3 | The loader injected GitHub's 404 page | Happens if you check before Pages deployed and the loader has no `r.ok` guard. Use the guarded loader. |

---

## 3. Details: the builder session, start to finish

1. Step **Overview** → CONTROL card → **Create from blank** (click by ref; this part is the app shell). Wait 8 to 15 s.
2. The builder opens. Close **Ask AI**.
3. Header: ← Back · autosave badge ("Autosave off" or "Last saved ...") · Preview (eye) · **Save** (floppy) · **Publish**.
4. Toolbar: **+** (add panel) · Ask AI · Layers · Pages · `</>` (Tracking Code) · ... · page selector (shows the step name) · desktop / tablet / mobile · zoom 100% · undo / redo · settings toggle.
5. Empty canvas: "Start Creating your Funnel Page" with **Blank Section**, **Insert Element**, **Generate with AI**.
6. Add panel left nav: Quick Add, Sections, Rows, Elements, Prebuilt Sections, Saved Assets, Widget Marketplace, Store, Icons And Graphics, Buttons, Forms Surveys And Quizzes, Social Media Icons, Countdown Timers, Images, Progress Bar...
7. Add a Full Width section → its **+** → Quick Add → search `custom` → **Code** → select the element → **Open Code Editor** → click inside → `type` the loader → `zoom` to check → modal **Save** → page **Save** → close the SEO panel if it opens → **Publish**.
8. Verify on the live URL (section 8).

## 4. Details: clearing a field that won't select-all

```
left_click <field>          # focus it
key End                     # or cmd+Down in a multi-line textarea
key Backspace  (repeat N)   # N > text length; use the key action's repeat (max 100 per call)
key Delete     (repeat M)   # catches text after the cursor
zoom <field region>         # must show the placeholder / empty
type "<new value>"
zoom <field region>         # must show exactly the new value
```
Used for: color hex (Backspace ×20), lesson titles (×90 to 100), step product name (Backspace ×80 + Delete ×40), button Text (×20), Element name (×12), bump Description (`cmd+Down`, Backspace ×300 to 500, Delete ×200 to 300), the From name in a workflow email (×10).

## 5. Details: typing into the email source view

1. In the Send email action, click the **`<>`** (source code) icon of the editor.
2. If it holds old content: Cancel → click the body in the visual editor → `cmd+a` → `Backspace` → reopen `<>`.
3. Type one `<p>...</p>` per `type` action, `wait` 1 s, and `zoom` after every two or three.
4. Save the source dialog, check the action's preview, **Save action**, then the workflow **Save**.

## 6. Details: JS that works on app-shell pages

**Dump visible inputs (check values before Save):**
```js
[...document.querySelectorAll('input')].filter(i=>i.offsetParent&&i.type!=='checkbox'&&i.type!=='radio').map(i=>(i.placeholder||i.name)+'='+i.value)
```

**Set a Vue-controlled input (step path) and click a button by its text:**
```js
const i=[...document.querySelectorAll('input')].filter(i=>i.offsetParent)[1]; // 2nd visible input = path
const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;
set.call(i,'/headstart-checkout');
i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));
const b=[...document.querySelectorAll('button,span,div')].find(e=>e.textContent.trim()==='Update step'&&e.children.length<=1);
b&&b.click(); await new Promise(r=>setTimeout(r,2500));
[...document.querySelectorAll('input')].filter(i=>i.offsetParent).map(i=>i.value)
```
Reload and re-read afterwards to confirm the save.

**Flip a toggle switch (`DIV.hr-switch`, `aria-checked`; `hr-switch--active` = on), e.g. Optimize JavaScript:**
```js
const t=[...document.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='Optimize JavaScript');
let row=t;for(let i=0;i<6&&row;i++){if(row.querySelector&&row.querySelector('.hr-switch'))break;row=row.parentElement;}
const sw=row.querySelector('.hr-switch');
const before=sw.getAttribute('aria-checked');
if(before==='true') sw.click();   // read first: a blind click turns an off switch on
({before, after:sw.getAttribute('aria-checked')}) // expect after: "false"
```
If it clicked, `find "Save"` → click the ref → check `location.href` (Save leaves the settings page).

## 7. Details: dropdown recipes

- **Custom dropdown with search** (step Products): click it → `type` a distinctive part of the name (`4M`, `Headstart`, `Starter`) → `hover` the result → `key Return` → `zoom` to read the value. Then the **Price** dropdown: click → `hover` "<product> @ <amount>" → `Return`.
- **Custom dropdown without search** (After purchase): click it → `key Down` / `key Up` as separate actions → `key Return` → `zoom`. If it lands one off, reopen and move from the current value.
- **Native select in the builder** (button link to, Products): Stage 7, section D (Ask AI + one key press). Fallback: Stage 7 step 17.

## 8. Details: verifying on the live page

Open a separate tab (`tabs_create`), `resize_window` 393×852, navigate to the live step URL, `wait` 5 s, then JS:
```js
const W=document.documentElement.clientWidth;
({title:document.title, W, scrollW:document.documentElement.scrollWidth,
  root:!!document.querySelector('[id$="-root"]'),
  wide:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>W+1).slice(0,8).map(e=>(e.className||e.tagName).toString().slice(0,40)+' '+Math.round(e.getBoundingClientRect().width))})
```
`scrollW` must equal `W`. Then screenshot, repeat at desktop width (1280×800 was used; `check_funnel.mjs` uses 1440×900), and reset with `resize_window preset:"desktop"`. To screenshot a section further down: `window.scrollTo(0, el.getBoundingClientRect().top+scrollY-120)`.

Walk the wrapper chain when something has unexpected padding (`<ROOTID>` = the page's root id, e.g. `gt-root`):
```js
let a=[],e=document.getElementById('<ROOTID>');
for(let i=0;i<10&&e;i++){const cs=getComputedStyle(e);a.push(e.tagName+'.'+String(e.className).split(' ').slice(0,2).join('.')+' p:'+cs.padding+' mt:'+cs.marginTop+' mw:'+cs.maxWidth);e=e.parentElement}
a
```

## 9. Details: waiting for GitHub Pages

```bash
# until HTTP 200 (new file)
for i in $(seq 1 30); do c=$(curl -s -o /dev/null -w "%{http_code}" "$URL"); [ "$c" = 200 ] && break; sleep 5; done
# until the NEW content is served (changed file): grep a marker string from your change
for i in $(seq 1 18); do curl -s "$URL?r=$i" | grep -q 'MARKER' && { echo "live after ~$((i*10))s"; break; }; sleep 10; done
```
Observed: 50 to 70 s typically; once 10 s; one check after a fixed 45 s still saw the old file.

## 10. Details: Remote Control (driving the desktop session from a phone)

- The phone app may say to run `claude rc` in a terminal. That is for terminal Claude Code only. In the desktop app, call `mcp__ccd_session_mgmt__set_remote_control` with `{"session_id":"self","enabled":true}`.
- A hook may rewrite the input (it added a `session` description string) and ask you to issue the call once more with exactly that input. Re-send it, alone in that response. The result should say `remoteControlState: "on"`.
- Tell the person: open the Claude app on the phone → **Code** → open this session; keep the computer awake with the desktop app open; same account on both.
- Side effects seen: the pane changed size (coordinates invalid; re-screenshot), `AskUserQuestion` returned "Denied by user" while the person was on the phone, and the next-step box may not appear. Put questions and choices in the closing text instead.

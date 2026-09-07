# NY MedCare — Master Build Prompt v2
## Same theme. Every section redesigned.

> **Reproduce all values verbatim. They are not approximations.**

This replaces the v1 build currently in this folder. **The theme does not change**
— warm off-white ground, teal + brass, Manrope / Inter / Instrument Serif. What
changes is **every single section's layout language**. v1 was the client's old
page order in new paint: a stat band, a why-us list, an icon grid, a vertical
timeline, a two-column split, a booking panel, a doctor block, a testimonial
rotator, a chip cloud, an accordion, a map, a CTA. Correct, and ordinary.

v2 gives **each section its own archetype** — no two sections share a shape, and
none of them is a card grid. The rule for this build:

> **If a reader can screenshot two sections and not immediately tell them apart,
> the build has failed.**

All body copy is **scraped verbatim from the client's live site and is law —
never reword it.** Lines marked `‹authored — confirm›` are new and are listed
again in §12b.

---

## 0 · WHAT ALREADY EXISTS IN THIS FOLDER

v1 is built here. Treat it as follows:

| path | action |
|---|---|
| `index.html` | **rewrite completely** — the section shapes are what v2 replaces |
| `assets/core.css` | **rewrite** — tokens survive (§3), every section rule is new |
| `assets/engine.js` · `nav.js` | **keep byte-identical** — frozen engine |
| `assets/gl.js` | **keep**, plus the two additions in §6 (rail rotation + lateral dolly) |
| `assets/hero-still.webp` / `.jpg` | **keep** — already generated, 28KB WebP |
| `assets/hero-loop.mp4` | **keep** — 1.2MB, used in S10's media panel, not the hero |
| `assets/mosaic-worktop.jpg` | **keep** — 155KB, the one photograph S5 cuts into |
| `assets/favicon.png` · `og-image.jpg` · `logo-nymedcare-h.png` | keep |
| `robots.txt` · `sitemap.xml` · `privacy-policy/` · `terms/` | keep |
| `_superseded-v1-old-layout.md` | ignore — kept only for comparison |

Because the images already exist, **§2's ladder is already satisfied at Rung 1.**
No generation is needed. Do not regenerate them.

---

## 1 · IDENTITY

| field | value |
|---|---|
| Brand | **NY MedCare** |
| Niche | USCIS-designated civil surgeon · Form I-693 immigration medical exam · Manhattan, NY |
| Preset | **P7 ENAMEL** (clinical white) — unchanged from v1 |
| Scene | **PulseLine** (gl-scenes #22) as ink line-art — now **tied to a section** (§6) |
| Camera | **C18 hero-lock → C5 lateral dolly across the pinned process → C7 pull-back** |
| Site type | **One page**, locked cinematic first viewport, 15 sections below it |
| Stack | Vanilla static — HTML + CSS + ES modules, no build step, no bundler |
| Deploy | Cloudflare Pages (drop the folder — no build command) |

### Contact facts (from the live site)
| field | value |
|---|---|
| Phone | `(917) 905-8140` · `tel:+19179058140` |
| Address | `ADDRESS_TBD, New York, NY ZIP_TBD` ‹**must be filled before launch**› |
| Geo | `40.7831, -73.9712` ‹authored — confirm› |
| Hours | Mon–Fri 9:00–5:00 · Sat 10:00–2:00 · Sun closed |
| Physician | Dr. Huma Irshad, MD — USCIS-Designated Civil Surgeon |
| Booking | GoHighLevel calendar — `https://widgets.leadconnectorhq.com/loader.js` |
| Analytics | GA4 `G-GFF61XS9JJ` (keep, unchanged) |
| Socials | Facebook / Instagram / Yelp / TikTok — **all four point at "Medcare Clinic Danbury" (Connecticut). See §12b.** |

### Head
| page | file | `<title>` | `<meta description>` |
|---|---|---|---|
| Home | `index.html` | `USCIS Immigration Medical Exam Manhattan \| NY MedCare` | `USCIS-designated civil surgeon in Manhattan. One appointment for your Form I-693 — every lab and vaccine order written for you, sealed when results arrive.` |
| Privacy | `privacy-policy/index.html` | `Privacy Policy \| NY MedCare` | `How NY MedCare collects, uses and protects patient information.` |
| Terms | `terms/index.html` | `Terms of Use \| NY MedCare` | `Terms governing use of the NY MedCare website and appointment booking.` |

Every head: `<html lang="en">`, charset, `viewport-fit=cover`, favicon, canonical,
OG tags, `<meta name="theme-color" content="#fbfaf7">`.

---

## 2 · ASSETS

### 2a · Asset table — all resolved, nothing to generate
| role | path | notes |
|---|---|---|
| Fonts | `https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&family=Instrument+Serif&display=swap` | `preconnect` to both Google hosts |
| Three.js | `<script type="importmap">{"imports":{"three":"https://unpkg.com/three@0.160.0/build/three.module.js"}}</script>` | |
| Booking | `https://widgets.leadconnectorhq.com/loader.js` | attached after `window.load` |
| Analytics | `https://www.googletagmanager.com/gtag/js?id=G-GFF61XS9JJ` | `async` |
| **S1 hero bleed column** | `assets/hero-still.webp` (jpg fallback) | already generated |
| **S5 mosaic sheet** | `assets/mosaic-worktop.jpg` | the one photograph six windows cut into |
| **S10 media panel** | `assets/hero-loop.mp4` + `hero-still.webp` poster | muted, loop, playsinline, `preload="none"` |
| S11 doctor portrait | **client-supplied only** | see the hard rule |
| Map | `https://maps.google.com/maps?q=<CONFIRMED_ADDRESS>&t=&z=15&ie=UTF8&iwloc=&output=embed` | lazy, titled |

> **Hard rule — never generate the doctor's face.** Dr. Huma Irshad is a real,
> named physician. A generated portrait is a fabricated image of a real person.
> With no client photo, S11 ships the **monogram plate** — no photo, no
> silhouette, no stock person.

### 2b · Ladder (only if an asset is ever replaced)
> Rung 1 user URLs → Rung 2 a connected generator (**preflight the cost and
> report it before spending**; Read every result before wiring it) → Rung 3
> free-licence stock with credit → Rung 4 build it in code. Never
> `placehold.co`, `picsum`, or scraped Google Images. Downscale anything new to
> ~1200px WebP.

### 2c · Generation prompts (already run — kept for regeneration only)
```
IMG-1 (hero bleed column, 16:9 → cropped to 3:4):
  Ultra-cinematic wide shot. An empty, spotless medical examination room in a
  Manhattan clinic at 8am — a paper-covered exam table, a blood-pressure cuff
  coiled on a pale counter, a window throwing soft daylight across the floor.
  Deep teal #136f63 key light, warm brass #b8813a rim on the metal, warm
  off-white #fbfaf7 ground. Heavy negative space in the upper third, subject
  weighted low. Anamorphic lens, shallow depth of field, fine film grain,
  high-key clinical lighting, photoreal.
  No text, no logos, no watermarks, no UI, no people, no faces, no patients,
  no procedures, no needles, no visible medical records.

IMG-2 (mosaic sheet, 16:9):
  Ultra-cinematic wide overhead shot. A calm clinical worktop — a stethoscope,
  a sealed white envelope, a blood-collection tube rack and a clipboard laid out
  in an even rhythm across a pale surface, shot straight down. Deep teal #136f63
  cool light with a warm brass #b8813a highlight on the metal, warm off-white
  #fbfaf7 ground. Even edge-to-edge composition with no single focal point, so
  any crop of the frame reads as a complete picture. Fine film grain, soft
  high-key lighting, photoreal.
  No text, no logos, no watermarks, no people, no faces, no blood, no needles,
  no readable documents.

VID-1 (S10 media panel, 16:9, 4s, silent):
  <IMG-1> The camera pushes in extremely slowly and steadily on a dolly; first
  and last frame near-identical for a seamless loop.
Poster rule: VID-1's start_image = IMG-1.
```

---

## 3 · TOKENS  *(unchanged from v1 — the theme is the thing that stays)*

```css
:root{
  --void:#fbfaf7; --void-2:#ffffff; --void-3:#f4f1ea;
  --ink:#141210; --muted:#5a544c; --dim:#9a948c;
  --line:rgba(20,18,16,.12); --line-2:rgba(20,18,16,.06);

  --accent:#136f63; --accent-deep:#0d564d; --accent-2:#b8813a;
  --accent-soft:rgba(19,111,99,.10);
  --seal:#b8813a; --seal-soft:rgba(184,131,58,.12);

  --alert:#a63a1e; --alert-soft:rgba(166,58,30,.07);
  --ok:#2f7d4f;

  --glass:rgba(255,255,255,.62); --glass-line:rgba(20,18,16,.10);
  --pill:#141210; --pill-ink:#fbfaf7;

  --shadow-sm:0 2px 8px rgba(20,18,16,.06);
  --shadow-md:0 12px 30px rgba(20,18,16,.10);
  --shadow-lg:0 30px 70px rgba(20,18,16,.14);
  --contact:0 24px 40px -20px rgba(20,18,16,.35);

  --u: calc(100dvh / 1024);
  --h: min(calc(100vw / 1512), calc(100dvh / 1024));
  --gutter: clamp(20px, 5.6vw, 92px);

  /* v2 channels */
  --hero-y:0px; --hero-img-y:0px; --hero-img-s:1; --hero-opacity:1;
  --sub-y:0px; --sub-opacity:1; --veil:0;
  --gl-op:.55; --marq-x:0%; --skew:0deg;
  --rail-x:0px; --rail-p:0; --prog:0%;
  --mos-drift:0px; --idx-y:0px;

  --ease-in:cubic-bezier(.16,1,.3,1);
  --ease-scroll:cubic-bezier(.22,1,.36,1);
}
```

**Colour rules** — `--accent` on `--void` is **5.85:1**, legal for body text.
`--accent-2` is **3.28:1** — decoration and ≥24px/700 text only, never body copy.
`--accent-deep` is the ground of the **one dark panel on the page** (S10's media
side) and nothing else. Never a fourth accent.

**Type scale**
| role | size | line-height | weight | family | tracking |
|---|---|---|---|---|---|
| eyebrow | `calc(12 * var(--h))` | 1.0 | 600 | Inter | `.18em` uppercase |
| h1 | `calc(72 * var(--h))` | .98 | 800 | Manrope | `-.025em` |
| h2 | `calc(46 * var(--h))` | 1.02 | 800 | Manrope | `-.02em` |
| display-name (S11) | `calc(88 * var(--h))` | .94 | 800 | Manrope | `-.03em` |
| quote (S12) | `calc(42 * var(--h))` | 1.28 | 400 | **Instrument Serif** | `-.005em` |
| h3 | `calc(22 * var(--h))` | 1.25 | 700 | Manrope | `-.01em` |
| lead | `calc(20 * var(--h))` | 1.55 | 400 | Inter, `--muted` | `0` |
| body | `calc(16.5 * var(--h))` | 1.68 | 400 | Inter, `--muted` | `0` |
| small | `calc(13.5 * var(--h))` | 1.50 | 500 | Inter, `--dim` | `.01em` |
| index numeral | `calc(150 * var(--h))` | .8 | 800 | Manrope, `--line-2` | `-.04em` |
| ribbon (S2) | `calc(46 * var(--h))` | 1.0 | 800 | Manrope | `.01em` |

Body never resolves below **16px absolute**.

---

## 4 · UNIT SYSTEM  *(unchanged)*

Reference canvas **1512 × 1024**.
`--u` fixed position · `--h` type · `--gutter` horizontal inset · **raw px** for
scroll timelines, never `vh`.
Portrait override at `max-aspect-ratio:11/10`:
`--m: min(calc(100vw / 430), calc(100dvh / 932)); --h: var(--m); --u: calc(100dvh / 932);`

---

## 5 · SHARED CHROME  *(reworked)*

### Brand mark — inline SVG, unchanged
```html
<a class="brand" href="/" aria-label="NY MedCare — home">
  <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
    <rect x="1.25" y="1.25" width="29.5" height="29.5" rx="8.5"
          fill="none" stroke="currentColor" stroke-width="2.5"/>
    <path d="M6 17.4h4.1l2.2-6.2 3.1 11.4 2.6-7.5 1.9 2.3H26"
          fill="none" stroke="currentColor" stroke-width="2.4"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <span class="brand-word">NY <b>MedCare</b></span>
</a>
```

### Header — **new: nav right, scroll hairline under it**
v1 centred the nav. v2 pushes brand hard left, nav + CTA hard right, and hangs a
**1px progress hairline** across the very bottom edge of the header:
```css
.hdr-in{display:grid;grid-template-columns:auto 1fr;align-items:center;
  padding-inline:var(--gutter);height:calc(84 * var(--u))}
.hdr-right{justify-self:end;display:flex;align-items:center;gap:calc(28 * var(--h))}
.hdr::after{content:"";position:absolute;left:0;bottom:0;height:1px;
  width:var(--prog);background:var(--accent);transition:width .1s linear}
```
`--prog` = `(scrollY / (documentHeight - innerHeight) * 100).toFixed(2) + '%'`.
It is the only chrome that moves continuously — a quiet, professional read-depth
signal, and it costs one variable.

Nav, in order: `Included` `#included` · `Process` `#process` · `Checklist` `#bring` ·
`Vaccines` `#vaccines` · `Dr. Irshad` `#doctor` · `FAQ` `#faq`
Right slot: ghost `(917) 905-8140` + pill `Book Your Exam` → `#book`.

`.is-stuck` at `scrollY > 40`, released below 32 (hysteresis):
`background:rgba(251,250,247,.88); backdrop-filter:blur(14px) saturate(1.1);
box-shadow:var(--shadow-sm)`, `.hdr-in` height → `calc(64 * var(--u))`, 340ms.

Topbar above it (desktop ≥1100px only): `height:calc(36 * var(--u))`,
`background:var(--accent-deep)`, `color:#fbfaf7`, `font:600 calc(12.5*var(--h))/1 Inter`,
`letter-spacing:.06em`:
`USCIS-DESIGNATED CIVIL SURGEON` · `ADDRESS_TBD, NEW YORK, NY` · `(917) 905-8140`

### Section-index rail — **new, desktop ≥1300px only**
A vertical stack of 9 dashes pinned to the right edge, one per major section:
```css
.rail{position:fixed;right:calc(26 * var(--h));top:50%;translate:0 -50%;z-index:45;
  display:flex;flex-direction:column;gap:calc(13 * var(--h));pointer-events:auto}
.rail a{display:block;width:14px;height:2px;border-radius:2px;background:var(--line);
  transition:width .32s var(--ease-scroll),background .32s}
.rail a[aria-current="true"]{width:30px;background:var(--accent)}
.rail a:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
```
Each dash is a real anchor with an `aria-label` naming its section. The active
one is set by one IntersectionObserver at `rootMargin:"-45% 0px -45% 0px"`.
Hidden below 1300px, and under `prefers-reduced-motion` it still works — only
the width transition is dropped.

### Mobile menu (≤ 900px)
Burger three bars `22×2px, gap 5px`. Open → `translateY(7px) rotate(45deg)` /
`opacity:0` / `translateY(-7px) rotate(-45deg)`, 300ms. Overlay `fixed inset-0
z-60 background:var(--void)`, items `in-soft` at `.06s` intervals from `.10s`.
Focus trapped, `Escape` closes, focus returns to the burger, `body{overflow:hidden}`.

### Sticky mobile CTA (≤ 900px)
`fixed; bottom:0; z-40; height:68px; background:rgba(251,250,247,.94);
backdrop-filter:blur(12px); border-top:1px solid var(--line)`, two equal buttons,
`padding-bottom:env(safe-area-inset-bottom)`, `body{padding-bottom:68px}`.

### Footer — **new: one wide rule, four hanging columns, no boxes**
`background:var(--void-3); border-top:1px solid var(--line);
padding:calc(86*var(--u)) var(--gutter) calc(38*var(--u))`, grid `2.2fr 1fr 1fr 1.3fr`.
Column heads are `small` uppercase in `--dim`; links are `body` in `--ink` with a
`background-size:0 1px → 100% 1px` underline sweep on hover (240ms), never
`text-decoration`.
1. Mark + *"USCIS-designated civil surgeon in Manhattan, NY. Form I-693 immigration medical examinations — one exam appointment, every lab and vaccine order written for you, and a properly sealed form."* + the four social links as plain labelled text.
2. **Immigration Exam** — `What's Included` · `The Process` · `What to Bring` · `Vaccine Requirements` · `Your Civil Surgeon` · `Frequently Asked Questions` · `Book an Appointment`
3. **Practice** — `About Dr. Irshad` · `Location & Hours` · `Privacy Policy` · `Terms of Use`
4. Phone, address, hours, then ‹authored — confirm›: *"NY MedCare is not affiliated with U.S. Citizenship and Immigration Services. We do not provide legal advice."*

Bottom: 1px `--line`, `© 2026 NY MedCare. All rights reserved.`

### Grain
`.grain{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.028;
mix-blend-mode:multiply}` with an inline SVG `feTurbulence baseFrequency='.82'`.
**No vignette on light** — a dark vignette on white reads as a printing error.

### Stacking contract
```
0   canvas#gl     fixed, pointer-events:none, aria-hidden="true"
1   .grain
2   page content
5   sticky rigs (S7, S12)
40  sticky mobile CTA
45  section-index rail
50  header
60  mobile menu overlay
90  A27 modal (S8)
95  skip link on focus
```

---

## 6 · 3D LAYER

> **Visual Signature: PulseLine ink line-art that ROTATES TO VERTICAL and becomes the rail the pinned process travels along · `#136f63` teal + `#b8813a` brass · C18 hero-lock → C5 lateral dolly across the pin → C7 pull-back · signature move — the wax seal that draws itself and stamps at the CTA.**

v1's canvas was wallpaper. In v2 the scene **does a job in one section** — that
is the difference between a 3D site and a site with 3D on it.

### Renderer  *(unchanged from v1)*
```js
renderer = new THREE.WebGLRenderer({antialias:true, alpha:true, powerPreference:'high-performance'});
renderer.setClearAlpha(0);
renderer.outputColorSpace  = THREE.SRGBColorSpace;
renderer.toneMapping       = THREE.NoToneMapping;
renderer.shadowMap.enabled = false;
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
```
**No bloom, no fog, no lights.** All `MeshBasicMaterial` / `LineBasicMaterial`.

### The scene — PulseLine
```js
function ecg(p){
  const g=(c,w,a)=>a*Math.exp(-Math.pow((p-c)/w,2));
  return g(0.160,0.030,0.13) - g(0.245,0.010,0.16) + g(0.262,0.012,1.00)
       - g(0.285,0.014,0.30) + g(0.440,0.055,0.24);
}
const N = 480, CYCLES = 3, SPAN = 18, AMP = 1.35;
const pts = [];
for(let i=0;i<=N;i++){ const f=i/N;
  pts.push(new THREE.Vector3(-SPAN/2 + SPAN*f, ecg((f*CYCLES)%1)*AMP, 0)); }
const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
```
| element | geometry | material |
|---|---|---|
| base trace | `TubeGeometry(curve, 480, 0.018, 6, false)` | `MeshBasicMaterial{color:0x141210, transparent, opacity:.15, depthWrite:false}` |
| head trace | `TubeGeometry(subCurve, 64, 0.026, 6, false)` from a 40-sample window | `MeshBasicMaterial{color:0x136f63, transparent, opacity:.62, depthWrite:false}` |
| head dot | `SphereGeometry(0.055, 12, 10)` | `MeshBasicMaterial{color:0x136f63, transparent, opacity:.85, depthWrite:false}` |
| baseline | `Line` `(-9,0,0)→(9,0,0)` | `LineBasicMaterial{color:0x141210, transparent, opacity:.07}` |

**One spike per 2.4s**: `head = (t / 2.4) % 1`. Rebuild the head tube in place
(`dispose()` the old geometry) at most **30×/second**, never per frame. Reuse one
scratch `Vector3`. **Never randomise the curve** — identical on every load.

### NEW · the rail rotation (the section tie-in)
Across the pinned process section the whole `pulseGroup` rotates a quarter turn,
so the ECG stops being a horizontal decoration and becomes the **vertical rail**
the five step panels slide along:
```js
pulseGroup.rotation.z = pProcess * Math.PI * 0.5;     // 0 → 90°
pulseGroup.position.x = -0.9 + pProcess * 1.8;        // drifts with the panels
```
`pProcess` is derived **inside gl.js** from `smoothScroll` and two numbers
`engine.js` publishes on load/resize only:
```js
// engine.js, on load + debounced resize — NOT per frame
GL.processTop = processRig.offsetTop;
GL.processLen = processRig.offsetHeight - innerHeight;
// gl.js, per frame
const pProcess = clamp((smoothScroll - GL.processTop) / GL.processLen, 0, 1);
```
This keeps the bridge rule intact: **gl.js reads `smoothScroll` and static
config, never the DOM.** It never calls `getBoundingClientRect`, never reads a
class.

### Canvas opacity channel
| scroll range | `--gl-op` | formula |
|---|---|---|
| 0 → 640 | .55 → .16 | `0.55 - smoothstep(0,640,s) * 0.39` |
| 640 → processTop | .16 | hold |
| processTop → +300 | .16 → **.42** | `0.16 + smoothstep(pt, pt+300, s) * 0.26` |
| across the pin | .42 | the trace is the rail — it must be seen |
| pinEnd → +400 | .42 → .16 | `0.42 - smoothstep(pe, pe+400, s) * 0.26` |
| ctaTop−400 → +300 | .16 → .60 | `0.16 + smoothstep(ct-400, ct+300, s) * 0.44` |

### Camera keyframe table
| scroll px | position | target | fov | note |
|---|---|---|---|---|
| 0 | `(0, 0.15, 7.40)` | `(0, 0.00, 0)` | 34 | **C18 hero-lock** |
| 1400 | `(0, 0.28, 7.70)` | `(0, 0.02, 0)` | 34 | drift only |
| `processTop` | `(-1.60, 0.40, 8.20)` | `(0, 0.05, 0)` | 35 | **C5 dolly starts** |
| `processTop + processLen` | `(1.60, 0.40, 8.20)` | `(0, 0.05, 0)` | 35 | dolly ends, trace fully vertical |
| `proofTop` | `(0, 0.46, 8.80)` | `(0, 0.04, 0)` | 36 | recentre |
| `ctaTop + 200` | `(0, 0.62, 12.80)` | `(0, 0.00, 0)` | 42 | **C7 pull-back** |

**Drift** (C18's whole point): `cam.position.y += Math.sin(t*0.22)*0.060`,
`cam.position.x += Math.sin(t*0.145)*0.045`. Tiny on purpose — nothing may lurch
while someone is reading about their green card.
**Pointer parallax:** `x += px*0.16`, `y += py*0.10`, smoothed
`v += (target - v) * 0.055`. Off entirely on `(hover:none)`.

### Three tiers — all three ship
| tier | trigger | behaviour |
|---|---|---|
| 1 · full | WebGL2 + DPR ≤ 2 + ≥ 4 cores | as above |
| 2 · `html.no-gl` | no WebGL, context loss, < 4 cores | canvas removed. The hero gets an inline SVG ECG path at `opacity:.14`, `stroke:var(--ink)`, animated by `stroke-dashoffset` 2.4s linear infinite. **S7's rail becomes a real 1px CSS line** that rotates via `transform:rotate(calc(var(--rail-p) * 90deg))`. Must look intentional. |
| 3 · reduced motion | media query | one frame at keyframe 0, rAF stopped, head parked at `head = 0.262` (on the R spike). No drift, no parallax, no rotation. All content reachable. |

### Perf budget
≤ 3 draw calls · one rAF loop · one WebGL context · **on-demand rendering**
(render only when `smoothScroll` moved > 0.15px, the pointer moved, or the 2.4s
pulse advanced). Pause on `document.hidden`. Mobile: drop the head dot,
`--gl-op` ceiling `.34`, DPR cap 1.5.

---

## 7 · SCROLL ENGINE

`assets/engine.js` and `assets/nav.js` are **already in this folder and stay
byte-identical.** They own `smoothScroll`, the rAF loop, the `.is-in`
IntersectionObserver and `.is-stuck`. They write numbers into CSS variables;
**CSS holds every transform.**

```js
const clamp = (v,a,b) => v < a ? a : v > b ? b : v;
const seg   = (a,b,s) => clamp((s-a)/(b-a), 0, 1);
const smoothstep = (a,b,s) => { const t = seg(a,b,s); return t*t*(3-2*t); };
const setVar = (el,k,v) => el.style.setProperty(k,v);
```

**Measured once on `load` and on debounced (150ms) `resize` — never per frame:**
```js
const M = {
  docLen:     document.documentElement.scrollHeight - innerHeight,
  processTop: processRig.offsetTop,
  processLen: processRig.offsetHeight - innerHeight,
  proofTop:   proofRig.offsetTop,
  proofLen:   proofRig.offsetHeight - innerHeight,
  ctaTop:     ctaEl.offsetTop,
};
GL.processTop = M.processTop; GL.processLen = M.processLen;   // published to gl.js
```

**Per-frame channel writes, in this order:**
```js
const s = smoothScroll, root = document.documentElement;

/* header progress hairline */
setVar(root,'--prog', (clamp(s / M.docLen, 0, 1) * 100).toFixed(2) + '%');

/* S1 hero — text and image move at DIFFERENT rates (the v2 move) */
const intro = smoothstep(60, 640, s);
setVar(root,'--hero-y',       (intro * -170).toFixed(1) + 'px');
setVar(root,'--hero-img-y',   (intro *  -70).toFixed(1) + 'px');
setVar(root,'--hero-img-s',   (1 + intro * 0.06).toFixed(4));
setVar(root,'--hero-opacity', (1 - intro).toFixed(3));
setVar(root,'--sub-y',        (intro *   78).toFixed(1) + 'px');
setVar(root,'--sub-opacity',  (1 - intro).toFixed(3));
setVar(root,'--veil',         (intro * 0.55).toFixed(3));

/* S2 ribbon — scroll offset on top of the base marquee, plus velocity skew */
setVar(root,'--marq-x', (-(s * 0.045) % 50).toFixed(2) + '%');
vel = s - lastS; lastS = s;
setVar(root,'--skew', clamp(vel * 0.22, -8, 8).toFixed(2) + 'deg');

/* S5 mosaic drift — one photograph behind six windows */
const mr = mosaicEl.getBoundingClientRect();
setVar(mosaicEl,'--mos-drift',
  ((clamp((innerHeight - mr.top) / (innerHeight + mr.height), 0, 1) - 0.5) * 24).toFixed(1) + 'px');

/* S7 horizontal pin — tied to the REAL pin range */
const p7 = clamp((s - M.processTop) / M.processLen, 0, 1);
setVar(processRig,'--rail-p', p7.toFixed(4));
setVar(processRig,'--rail-x', (-p7 * (track.scrollWidth - innerWidth)).toFixed(1) + 'px');

/* S12 quote rig — index only, guarded */
const p12 = clamp((s - M.proofTop) / M.proofLen, 0, 1);
const q = Math.min(2, Math.floor(p12 * 3));
if (q !== activeQuote) { activeQuote = q; renderQuote(q); }

/* canvas opacity — the table in §6 */
setVar(root,'--gl-op', glOpacity(s, M).toFixed(3));
```

`getBoundingClientRect` is read **once per frame for the mosaic only**. Everything
else uses the cached `M`. **Tie every pin to `rig.offsetHeight − innerHeight`,
never a guessed pixel length**, or the last panel lands off-screen.

---

## 8 · THE PAGE — fifteen sections, fifteen shapes

```
a.skip[href="#main"]      "Skip to content"
div.topbar                desktop ≥1100px
header.hdr                §5, with the --prog hairline
canvas#gl                 aria-hidden, fixed, z-0
div.grain                 z-1
nav.rail                  section index, desktop ≥1300px
main#main
 ├─ S1  section.hero              asymmetric bleed split
 ├─ S2  section.ribbon            velocity marquee
 ├─ S3  section.arc               arc stats
 ├─ S4  section.why               sticky-heading rail
 ├─ S5  section.included#included masked mosaic
 ├─ S6  aside.note                margin note
 ├─ S7  section.rig#process       HORIZONTAL PIN
 ├─ S8  section.bring#bring       modal trigger + A27 overlay
 ├─ S9  section.vax#vaccines      pointer-driven index swapper
 ├─ S10 section.book#book         full-bleed working split
 ├─ S11 section.doctor#doctor     editorial asymmetric + watermark
 ├─ S12 section.rig.proof         quote rig, ground tint morphs
 ├─ S13 section.band              three-panel band 2fr/1fr/2fr
 ├─ S14 section.faq#faq           sticky index + rule-only accordion
 └─ S15 section.cta               empty + the seal
footer.ftr
div.mcta                  ≤900px
```

**The shape audit** — no two share a layout:
`split · line · arcs · sticky-rail · mosaic · margin-note · horizontal-pin ·
overlay · index-swapper · working-split · editorial-asymmetric · pinned-quote ·
three-panel-band · sticky-index · void`

---

### S1 · Hero — asymmetric bleed split  *(was: left-aligned stack)*

One composition, one viewport, **nothing else above the fold.** The image column
**bleeds off the right edge of the page** and runs the full height; the seal
medallion straddles the seam between the two columns. Text and image scroll at
**different rates** — that differential is what makes it read as depth rather
than a background.

```css
.hero{min-height:100dvh;display:grid;grid-template-columns:58fr 42fr;
  align-items:end;gap:calc(48 * var(--h));
  padding:0 0 calc(90 * var(--u)) var(--gutter);
  position:relative;overflow-x:clip}
.hero-img{position:relative;height:100dvh;margin-right:0;
  border-radius:26px 0 0 0;overflow:hidden;
  transform:translate3d(0,var(--hero-img-y),0) scale(var(--hero-img-s));
  transform-origin:right bottom}
.hero-img img{width:100%;height:100%;object-fit:cover;object-position:62% 50%}
.hero-img::after{content:"";position:absolute;inset:0;
  background:linear-gradient(90deg, var(--void) 0%, rgba(251,250,247,.35) 22%, transparent 55%)}
.hero-txt{transform:translate3d(0,var(--hero-y),0);opacity:var(--hero-opacity)}
.hero .actions{transform:translate3d(0,var(--sub-y),0);opacity:var(--sub-opacity)}
```
> **Never `overflow-x:hidden` on this or any ancestor of S7/S12** — it kills
> `position:sticky` and the pinned stages go blank. **`clip` only.**

The **seal medallion** sits on the seam, `position:absolute; left:58%;
top:58%; translate:-50% -50%; width:118px; z-index:3`, on a `--void-2` disc with
`box-shadow:var(--shadow-md)`. It is the same SVG as S15, drawn but **not**
spinning here — it spins only at the CTA.

A **scroll cue** (I14 wheel) sits bottom-left in the text column, `opacity` fading
to 0 once `scrollY > 120`, and hidden under reduced motion.

**Strings — verbatim:**
| element | string |
|---|---|
| eyebrow | `USCIS-Designated Civil Surgeon · Manhattan, NY` |
| h1 line 1 | `Your USCIS Immigration Medical Exam,` |
| h1 line 2 | `<em>Guided Start to Finish</em>` |
| lead | `Form I-693 performed and sealed by a USCIS-designated civil surgeon in Manhattan, New York. One exam appointment — we write every lab and vaccine order USCIS requires and complete your form the moment your results arrive.` |
| primary CTA | `Book Your Exam Online` → `#book` |
| secondary CTA | `Call (917) 905-8140` → `tel:+19179058140` |

```html
<h1>
  <span class="line"><span class="appear appear--mask" style="--d:.42s">Your USCIS Immigration Medical Exam,</span></span>
  <span class="line"><span class="appear appear--mask" style="--d:.62s"><em>Guided Start to Finish</em></span></span>
</h1>
```
`.line{display:block;overflow:hidden;padding:.06em .15em .14em}` — the padding is
**required** or descenders clip.
`<em>`: `color:var(--accent); font-style:normal`, with a **drawn underline**,
never a gradient fill:
```css
h1 em::after{content:"";position:absolute;left:0;right:0;bottom:.02em;height:3px;
  background:var(--accent-2);transform-origin:left;transform:scaleX(var(--em,0));
  transition:transform 1.2s var(--ease-in) .72s}
.is-loaded h1 em::after{--em:1}
```
h1 `max-width:calc(760 * var(--h))`, `text-wrap:balance`. lead
`max-width:calc(540 * var(--h))`, `margin-top:calc(26 * var(--h))`. actions
`margin-top:calc(34 * var(--h))`, `gap:calc(18 * var(--h))`.

**Scrub 0 → 640px must produce:** text rising **170px** and fading to 0; the image
column rising only **70px** while scaling to **1.06**; actions sinking 78px;
veil to 0.55; `--gl-op` .55 → .16. The 100px rate difference between the two
columns is the effect — verify it visually, not just numerically.

**Mobile** (`max-aspect-ratio:11/10`): one column. The image becomes a
`clamp(260px, 38svh, 340px)` band **above** the text with
`border-radius:0 0 26px 26px`, the seal drops to 78px and sits at the band's
bottom-right corner. Multipliers: `--hero-y` `-170 → -110`, `--hero-img-y`
`-70 → -34`, `--hero-img-s` `+.06 → +.03`. Hero padding-bottom
`calc(120 * var(--u))` to clear the sticky CTA bar.
**Reduced motion:** all channels frozen at `s = 0`.
**Height breakpoints:** `(min-width:901px) and (max-height:850px)` → h1
`calc(60*var(--h))`; at `max-height:720px` → h1 `calc(50*var(--h))`, lead
`calc(17*var(--h))`. A 1440×720 laptop must not clip the CTAs.

---

### S2 · Credential ribbon — velocity marquee  *(was: a four-cell stat band)*

One line. No boxes, no cards, no grid. An endless marquee of credential phrases
in **stroke-outline type**, which **leans with your scroll speed** (I15) and
drifts a little faster when you scroll (I14 + `--marq-x`).

```css
.ribbon{overflow:hidden;padding-block:calc(34 * var(--u));
  border-block:1px solid var(--line);background:var(--void-2)}
.ribbon-track{display:flex;white-space:nowrap;width:max-content;
  transform:translate3d(var(--marq-x),0,0) skewX(var(--skew));
  animation:marq 34s linear infinite;transition:transform .1s linear}
@keyframes marq{ to{ translate:-50% 0 } }
.ribbon-track span{font:800 calc(46 * var(--h))/1 Manrope;letter-spacing:.01em;
  color:transparent;-webkit-text-stroke:1px rgba(20,18,16,.30);
  padding-inline:calc(26 * var(--h))}
.ribbon-track span:nth-child(3n){color:var(--accent);-webkit-text-stroke:0}
```
Phrases, **duplicated ×2 inside the track** so the loop is seamless:
`USCIS-DESIGNATED CIVIL SURGEON` · `FORM I-693` · `IGRA TB BLOOD TEST` ·
`SEALED THE DAY RESULTS ARRIVE` · `NO REFERRAL NEEDED` · `ALL FIVE BOROUGHS` ·
`INTERPRETERS WELCOME`

Every third phrase renders solid `--accent` instead of stroked — that alternation
is what stops it reading as a plain ticker.

Skew is clamped at **±8°** (softer than the ±15° default — this is a medical
site, not a streetwear one). `aria-hidden="true"` on the duplicate copy so
screen readers hear the list once.
**Reduced motion:** `animation:none`, `--marq-x:0%`, `--skew:0deg` — a static,
centred single row of the seven phrases, which still looks deliberate.
**Mobile:** `font-size:calc(30 * var(--h))`, animation 26s.

---

### S3 · The numbers — arc stats  *(was: numerals in a row)*

Four numbers riding **concentric arcs that sweep in from an off-canvas centre**
and fade out at both ends. This cannot be mistaken for a stat tile row.

```
svg viewBox="0 0 380 700" preserveAspectRatio="xMaxYMid meet" class="arcs"
centre (-110, 300)   ← off-canvas left, so the arcs curve out of the copy
```
| r | arc | dot | value | label |
|---|---|---|---|---|
| 320 | −94° → 12° | −48° | `1` | `EXAM APPOINTMENT` |
| 380 | −60° → 56° | 2° | `3–5` | `DAYS FOR RESULTS` |
| 440 | −20° → 68° | 40° | `11` | `VACCINES CHECKED` |
| 500 | 12° → 78° | 58° | `5` | `BOROUGHS SERVED` |

Every value is derivable from the client's own copy — `11` is the count of the
vaccine list in S9 excluding titers, `5` is the five boroughs. **No invented
facts.**

Each arc: `path` `A r r 0 0 1`, `stroke-width 1.1`, `stroke:var(--ink)`, with its
own `userSpaceOnUse` `linearGradient` running start→end, stops
`0 → .55 @22% → .55 @55% → .12 @85% → 0`. **That double fade at both ends is the
whole trick** — on light the gradient is ink-to-transparent, not white.
At each dot (polar from the centre): filled circle `r 3.4` in `--accent`; ring
`r 7` at 35% opacity; the number at `dot + (16, 4)` 32px Instrument Serif
`--accent-2`; the label at `dot + (18, 22)` 8.5px weight 600 `letter-spacing:2px`
`--muted` at 80% opacity.

```css
.arc-line{stroke-dasharray:var(--len);stroke-dashoffset:var(--len);
  animation:draw 1.6s cubic-bezier(.65,0,.35,1) forwards}     /* delay .4s + i*.22s */
.arc-dot{animation:popIn .55s cubic-bezier(.34,1.56,.64,1) both;
  transform-box:fill-box;transform-origin:center}             /* lineDelay + .9s */
.arc-ring{animation:pulseRing 2.8s ease-in-out infinite}
.arc-text{animation:fadeIn .7s both}                          /* +.15s / +.3s */
@keyframes popIn{0%{transform:scale(.4)}70%{transform:scale(1.25)}100%{transform:scale(1)}}
@keyframes pulseRing{0%{transform:scale(1);opacity:.35}100%{transform:scale(1.45);opacity:0}}
```
`--len` per arc = `r × Δθ` in radians, written into the element.
**`transform-box: fill-box` is not optional** — without it the SVG
transform-origin is the viewport and the dots fly off screen.
Wrap every keyframe in `@media (prefers-reduced-motion: no-preference)`.

Left of the arcs, in the same section: eyebrow `By the numbers` ‹authored›, H2
`One appointment is the whole point` ‹authored — confirm›, and the lead
`The hard part of the I-693 is rarely the exam. It is knowing exactly which tests and vaccines USCIS wants for your age and history, and getting every one of them documented correctly. That is the part we take off your hands.`
(that lead is verbatim; it moves here from the client's why-us block).

`pointer-events:none` on the SVG. **Below 900px the arcs are dropped entirely**
and the four values render as a plain 2×2 numeral grid — arcs need width.

---

### S4 · Why applicants choose us — sticky-heading rail  *(was: numbered rows)*

The **heading column sticks** while the four acts scroll past it. No pin, no rig
— just `position:sticky` on one column, which costs nothing.

```css
.why{display:grid;grid-template-columns:38fr 62fr;gap:calc(80 * var(--h));
  padding-block:calc(120 * var(--u))}
.why-head{position:sticky;top:calc(150 * var(--u));align-self:start}
.act{position:relative;padding-block:calc(58 * var(--u));isolation:isolate}
.act + .act{border-top:1px solid var(--line)}
.act .idx{position:absolute;right:0;top:calc(-24 * var(--u));z-index:-1;
  font:800 calc(150 * var(--h))/.8 Manrope;color:var(--line-2);letter-spacing:-.04em}
.act h3{font:700 calc(26 * var(--h))/1.2 Manrope;margin-bottom:calc(14 * var(--h))}
```
Each `.act` divider **draws in** rather than fading: `transform:scaleX(0)` →
`scaleX(1)`, `transform-origin:left`, 700ms `--ease-scroll`, on `.is-in`.
Hover / focus-within: the index numeral lifts to `--accent-soft` and the `h3`
takes `--accent`, 300ms. No background fill, no border, no card.

Head column: eyebrow `Why Applicants Choose Us`, H2
`Everything USCIS requires, mapped out for you`, plus the pill
`Book Your Exam` → `#book` pinned under it.

| idx | title | body |
|---|---|---|
| 01 | `Authorized Civil Surgeon` | `Only a USCIS-designated civil surgeon may sign Form I-693. Dr. Huma Irshad is designated and signs your form personally.` |
| 02 | `Labs & Vaccines Ordered For You` | `Your exam takes one appointment. We order every test and immunization USCIS requires that same day and tell you exactly where to go — results come back in 3–5 business days.` |
| 03 | `Properly Sealed Form` | `Your I-693 is signed, sealed and stamped exactly the way USCIS requires — plus an unsealed copy for your own records.` |
| 04 | `Multilingual & Judgment-Free` | `We serve applicants from every background. Bring an interpreter if you prefer — no one is rushed and no question is too small.` |

**Mobile:** one column, `position:static` on the head, index numeral shrinks to
`calc(72 * var(--h))` and moves inline above the title.

---

### S5 · What's included — masked mosaic  *(kept, but re-cut asymmetric)*

Six windows, **one photograph** (`assets/mosaic-worktop.jpg`). v1 used an even
3×2. v2 cuts it **asymmetrically** on a 12-column grid so it reads as a sheet
that has been sliced, not a grid that has been filled.

```css
.mosaic{display:grid;grid-template-columns:repeat(12,1fr);
  grid-template-rows:repeat(2, minmax(0,1fr));gap:calc(10 * var(--h));
  min-height:calc(720 * var(--u));position:relative}
.m1{grid-column:span 5} .m2{grid-column:span 4} .m3{grid-column:span 3}
.m4{grid-column:span 3} .m5{grid-column:span 4} .m6{grid-column:span 5}
.mos-card{position:relative;overflow:hidden;border-radius:18px;
  box-shadow:var(--shadow-md);isolation:isolate;
  display:flex;flex-direction:column;justify-content:flex-end;padding:calc(28 * var(--h))}
.mos-card .mos-img{position:absolute;inset:0;z-index:-2;
  background-image:url(assets/mosaic-worktop.jpg);background-repeat:no-repeat;
  background-size:var(--mos-w) var(--mos-h);
  background-position:var(--mx) calc(var(--my) + var(--mos-drift))}
.mos-card::before{content:"";position:absolute;inset:0;z-index:-1;
  background:linear-gradient(0deg,
    rgba(251,250,247,.97) 0%, rgba(251,250,247,.90) 44%, rgba(251,250,247,.34) 100%)}
.mos-card h3,.mos-card p{position:relative;z-index:1}
.mos-card .ico{width:26px;height:26px;color:var(--accent);margin-bottom:calc(14 * var(--h))}
```
The three measurements, run on `load`, on debounced `resize`, and after fonts settle:
```js
function layoutMosaic(sec){
  const r = sec.getBoundingClientRect();
  sec.style.setProperty('--mos-w', r.width.toFixed(1)  + 'px');
  sec.style.setProperty('--mos-h', r.height.toFixed(1) + 'px');
  sec.querySelectorAll('.mos-card').forEach(c => {
    const b = c.getBoundingClientRect();
    c.style.setProperty('--mx', (-(b.left - r.left)).toFixed(1) + 'px');
    c.style.setProperty('--my', (-(b.top  - r.top )).toFixed(1) + 'px');
  });
}
```
`--mos-drift` (§7) moves the photograph ±12px behind **all six windows at once** —
that shared parallax is what proves it is one image.

**Icons are inline SVG line art, 26×26, `stroke-width:1.6`, `currentColor`.**
The client's page uses 🩺🧪💉📋🧠✉️ — **every one is replaced. No emoji ships.**

| span | icon | title | body |
|---|---|---|---|
| 5 | stethoscope | `Physical Examination` | `A head-to-toe examination including eyes, ears, nose and throat, heart, lungs, abdomen, lymph nodes, skin and extremities, plus height, weight, blood pressure and vision.` |
| 4 | test tube | `Tuberculosis Screening (IGRA)` | `We order an Interferon Gamma Release Assay blood test, required by the CDC for applicants aged 2 and older. The older PPD skin test is no longer accepted as the initial screen.` |
| 3 | vial + droplet | `Required Blood & Urine Labs` | `Syphilis serology and gonorrhea testing within the CDC-specified age ranges. Ordered at your visit and processed by the laboratory we direct you to.` |
| 3 | clipboard | `Vaccination Record Review` | `We review your immunization history against the CDC schedule, identify exactly what is missing for your age, and write the prescriptions so you can complete them at your pharmacy.` |
| 4 | outlined head | `Mental Health & Substance Screening` | `A confidential evaluation for mental-health conditions associated with harmful behavior and for drug or alcohol use disorders, as USCIS requires.` |
| 5 | sealed envelope | `Completed & Sealed Form I-693` | `Dr. Irshad completes and signs the current 01/20/2025 edition, seals it in the required envelope, and gives you a duplicate copy to keep.` |

Section head above it: eyebrow `What's Included`, H2
`What happens during your I-693 exam`, lead
`USCIS and the CDC set the exact scope of the immigration medical examination. Here is what a complete exam covers, and what we perform at NY MedCare.`

**Mobile:** `grid-template-columns:1fr; grid-template-rows:auto`, each card
`min-height:230px`, gap 8px. `layoutMosaic` still runs — the illusion survives a
single column. **Reduced motion:** `--mos-drift:0px`.

---

### S6 · If your TB test is positive — margin note  *(was: a filled callout box)*

Deliberately the **quietest** thing on the page, and the only section with no
background, no border-radius and no shadow. A hanging icon in the left margin, a
single hairline rule, ink-weight body copy.

```css
.note{display:grid;grid-template-columns:calc(72 * var(--h)) 1fr;
  max-width:calc(940 * var(--h));margin-inline:auto;
  padding-block:calc(70 * var(--u));border-left:1px solid var(--alert);
  padding-left:calc(34 * var(--h))}
.note .ico{width:24px;height:24px;color:var(--alert);margin-top:4px}
.note h3{font:700 calc(21 * var(--h))/1.3 Manrope;color:var(--ink);
  margin-bottom:calc(12 * var(--h))}
.note p{font-size:calc(18 * var(--h));color:var(--ink)}   /* ink, not muted */
```
A 24px inline warning-triangle SVG — **never the `⚠` character.**

H3 `If your TB blood test comes back positive`
Body `A positive IGRA does not mean you have active tuberculosis, and it does not disqualify you. It does mean a chest X-ray and further evaluation are required before your form can be completed. We coordinate imaging locally and walk you through every step.`

---

### S7 · The process — HORIZONTAL PINNED SCROLL  *(was: a vertical spine)*

The centrepiece. The section pins to the viewport and the five steps travel
**sideways** while the WebGL ECG behind them **rotates upright and becomes the
rail they run along** (§6).

```
section.rig#process   height: calc(5 * 86vh)        /* 430vh */
└─ div.stage          position:sticky; top:0; height:100dvh;
                      overflow:hidden; display:flex; align-items:center
   └─ div.track       display:flex; gap:calc(28 * var(--h));
                      padding-inline:12vw; width:max-content;
                      transform:translate3d(var(--rail-x),0,0)
      └─ article.hpanel × 5    flex:0 0 clamp(360px, 46vw, 640px)
```
```js
const p7   = clamp((s - M.processTop) / M.processLen, 0, 1);   // the REAL pin range
const maxX = track.scrollWidth - innerWidth;
setVar(processRig, '--rail-x', (-p7 * maxX).toFixed(1) + 'px');
```
> **Tie progress to `rig.offsetHeight − innerHeight`, never a guessed pixel
> length**, or step 5 finishes off-screen. **No `transition` on the track** —
> scroll drives it directly; add a 120ms ease only for keyboard prev/next.

**Per-panel focus** — each panel brightens as it reaches centre:
```js
const cx = panel.offsetLeft + panel.offsetWidth/2 + parseFloat(railX);
const a  = clamp(1 - Math.abs(cx - innerWidth/2) / (innerWidth * 0.55), 0, 1);
panel.style.setProperty('--a', a.toFixed(3));
```
```css
.hpanel{opacity:calc(.34 + var(--a) * .66);
  transform:translateY(calc((1 - var(--a)) * 18px));
  background:var(--void-2);border-radius:22px;box-shadow:var(--shadow-md);
  padding:calc(44 * var(--h));transition:opacity .12s linear}
.hpanel .n{font:800 calc(110 * var(--h))/.85 Manrope;letter-spacing:-.04em;
  color:var(--line);transition:color .3s var(--ease-scroll)}
.hpanel[style*="--a: 0.9"] .n, .hpanel.is-lit .n{color:var(--accent)}
.hpanel .when{font:600 calc(13.5 * var(--h))/1 Inter;color:var(--accent-2);
  letter-spacing:.06em;text-transform:uppercase;margin-top:calc(20 * var(--h))}
```
Set `.is-lit` in JS when `a > 0.7` (do not drive colour off an attribute selector
in production — that line above is illustrative).

A **progress rail** sits at the bottom of the stage:
`height:2px; background:var(--line)`, with an inner bar
`width:calc(var(--rail-p) * 100%); background:var(--accent)`.

| n | title | body | when |
|---|---|---|---|
| 1 | `Book Your Slot` | `Pick a time on the calendar below or call us. Same-week appointments are usually available.` | `2 minutes` |
| 2 | `Gather Documents` | `Photo ID, vaccination records and your printed Form I-693 with Part 1 filled in. Full checklist below.` | `Before visit` |
| 3 | `Complete the Exam` | `Physical exam and history review with Dr. Irshad, who writes every lab order and vaccine prescription you need.` | `About an hour` |
| 4 | `Complete Your Orders` | `Take your lab order to the collection site and any prescriptions to your pharmacy. We tell you exactly where to go.` | `Your schedule` |
| 5 | `Collect & File` | `Results reach us in 3–5 business days. We call you, then hand over your sealed envelope plus a copy to keep.` | `3–5 business days` |

The section head (eyebrow `The Process`, H2
`Five steps from booking to sealed envelope`, lead
`No guessing, no runaround. Here is exactly how your immigration medical exam works with us, from booking to sealed envelope.`)
sits **inside the sticky stage**, top-left, so it stays put while the steps pass.

**Mobile / touch (`max-aspect-ratio:11/10` or `hover:none`):** **unpin.** The rig
height goes `auto`, the stage stops being sticky, the track becomes
`overflow-x:auto; scroll-snap-type:x mandatory` with each panel
`scroll-snap-align:center; flex:0 0 82vw`, and `--rail-x` is forced to `0px`.
**Never trap vertical scroll on a phone.**
**Reduced motion:** same unpinned collapse, no snap animation, panels at full
opacity.

---

### S8 · What to bring — trigger card + full-screen overlay  *(was: half of a split)*

The checklist is eight items long. Rather than dumping it inline, S8 is a
**compact composition with a fade-out preview** that opens the full list as a
**full-screen overlay** (A27).

**The trigger section** — `max-width:calc(1000 * var(--h))`, centred:
eyebrow `Come Prepared`, H2 `Arrive with these eight things` ‹authored — confirm›,
lead `Arriving with the right paperwork is the single biggest thing you can do to keep your file moving — it is what lets Dr. Irshad write the right orders the first time.`
Then a single wide `--void-2` plate, `border-radius:22px`,
`box-shadow:var(--shadow-lg)`, showing the **first three** items with the rest
faded under `mask-image:linear-gradient(180deg,#000 58%,transparent 100%)`, and a
pill `Open the full checklist — 8 items` centred over the fade.
Sub-line: `Missing an item rarely stops the exam, but it can delay your sealed form.`

**The overlay** (A27, adapted to light):
```
overlay: fixed inset-0 z-90; background:rgba(20,18,16,.42); backdrop-filter:blur(8px)
panel:   max-width:calc(760 * var(--h)); max-height:86dvh; overflow-y:auto;
         background:var(--void-2); border-radius:24px; box-shadow:var(--shadow-lg);
         padding:calc(48 * var(--h))
close:   top-right 40×40 button + Escape + backdrop click
```
On light the panel is **solid white, not glass over dark** — glass-on-dark is a
dark-preset move and looks muddy here.

**Dashed leader lines** connect each item to its note — the move that makes this
read as a real document:
```css
.chk li{display:flex;align-items:baseline;gap:calc(10 * var(--h));
  padding-block:calc(15 * var(--h))}
.chk .nm{font:600 calc(17 * var(--h))/1.4 Inter;color:var(--ink);flex:0 0 auto}
.chk .dots{flex:1;border-bottom:1px dashed var(--line);transform:translateY(-4px)}
.chk .nt{font-size:calc(14.5 * var(--h));color:var(--muted);flex:0 0 auto;
  max-width:46%;text-align:right}
```
| item | note |
|---|---|
| `Government-issued photo ID` | `passport, driver's license or state ID.` |
| `Form I-693, edition 01/20/2025` | `printed, with Part 1 completed by you. USCIS has accepted only this edition since July 3, 2025.` |
| `All vaccination records` | `including records from your home country, however old.` |
| `USCIS receipt notice or A-number` | `if one has been issued to you.` |
| `List of current medications` | `and any relevant medical or surgical history.` |
| `Prior TB testing or treatment records` | `including any past chest X-ray reports.` |
| `An interpreter` | `if you would be more comfortable with one.` |
| `Payment method` | `immigration exams are typically self-pay. We quote the price before you book.` |

**Must, or it is a bug:** `document.body.style.overflow='hidden'` on open and
**restored on close AND on unmount** (the classic leak); focus trapped inside the
panel; `Escape` closes; backdrop click closes; focus returns to the trigger;
`role="dialog" aria-modal="true"` labelled by the panel title.
**Reduced motion:** instant show/hide, no fade, no scale.
**Mobile:** the panel goes `inset:auto 0 0 0; max-height:92dvh;
border-radius:24px 24px 0 0` — a sheet from the bottom, not a centred card.

---

### S9 · Vaccines — pointer-driven index swapper  *(was: a chip cloud)*

A31's swapper, **driven by pointer and keyboard instead of scroll** — so it costs
no scroll length, stays usable, and lets an applicant scan all eleven at once.

```css
.vax{display:grid;grid-template-columns:1fr 1fr;gap:calc(56 * var(--h));
  align-items:start}
.vax-list{position:relative;list-style:none}
.vax-list li + li{border-top:1px solid var(--line-2)}
.vax-list button{display:flex;justify-content:space-between;align-items:center;
  width:100%;padding:calc(15 * var(--h)) 0;background:none;border:0;text-align:left;
  font:600 calc(18 * var(--h))/1.3 Inter;color:var(--ink);cursor:pointer;
  transition:color .22s var(--ease-scroll)}
.vax-list button[aria-selected="true"]{color:var(--accent)}
.vax-bar{position:absolute;left:calc(-18 * var(--h));width:2px;
  height:calc(30 * var(--h));background:var(--accent);border-radius:2px;
  transform:translateY(var(--idx-y));transition:transform .22s var(--ease-scroll)}
.vax-detail{position:sticky;top:calc(160 * var(--u));background:var(--void-2);
  border-radius:22px;box-shadow:var(--shadow-lg);padding:calc(44 * var(--h));
  min-height:calc(320 * var(--u))}
.vax-detail .n{font:400 calc(56 * var(--h))/1 "Instrument Serif";color:var(--accent-2)}
```
One shared `.vax-bar` slides down the list (`--idx-y` = the active button's
`offsetTop`), rather than each row animating — one moving element, not eleven.

**Semantics:** the list is `role="tablist"` (vertical), each button
`role="tab" aria-selected`, the detail frame `role="tabpanel"` with
`aria-labelledby`. Roving `tabindex`; `↑ ↓` move the selection, `Home`/`End` jump
to first/last. **Guard the swap on index change, not on every pointer move.**
Cross-fade: outgoing `opacity 0, translateY(-6px)` 160ms; incoming
`opacity 1, translateY(0)` 220ms after a 60ms delay.

Section head: eyebrow `Vaccine Requirements`, H2
`Which vaccines USCIS may require`, lead
`Which ones apply depends on your age and immunization history. We identify exactly what you need and write the prescription.`

The eleven, plus titers — names verbatim from the client's page:
`MMR (Measles, Mumps, Rubella)` · `Tdap / Td` · `Polio (IPV)` ·
`Varicella (Chickenpox)` · `Hepatitis A` · `Hepatitis B` ·
`Haemophilus influenzae type b` · `Rotavirus` · `Meningococcal` ·
`Pneumococcal` · `Seasonal Influenza` · `Titers (proof of immunity)`

> **The one-line detail note for each of the twelve is ‹authored›.** Write each as
> a neutral restatement of what the client's own copy already says — required by
> age and history, titers can substitute for records — and **make no clinical
> claim the client's page does not already make.** Every one is listed in §12b
> for Dr. Irshad to sign off. If she will not review them, ship the names alone
> and delete the detail frame.

Under the list, the `--void-3` note block, `border-radius:14px`,
`padding:calc(22 * var(--h))`:
**`Two recent changes worth knowing.`** `Polio (IPV) was added to the CDC technical instructions for civil surgeons in May 2024. The <strong>COVID-19 vaccination requirement was removed</strong> by USCIS effective January 22, 2025 — you no longer need to document it on Form I-693.`

Then the info note (same construction as S6 but `--accent`, with an info-circle
SVG, **never `ℹ`**):
H3 `Lost your vaccination records? You still have options.`
Body `This is one of the most common situations we see. Depending on your age and history we either prescribe the vaccines you need or order blood titers to prove you are already immune. Either route completes the vaccination section of your form.`

**Touch / `(hover:none)` / ≤900px:** the detail frame is **removed entirely** and
each row renders with its note inline underneath. Simpler and better on a phone
than a tab widget.

---

### S10 · Booking — full-bleed working split  *(was: a glass panel and a rail)*

The **only dark panel on the page**, and the only section that runs edge to edge
with no gutter. A21's working-page split: context on the left in
`--accent-deep`, the live calendar on the right in the page ground. The contrast
is what tells a visitor this is the part where something actually happens.

```css
.book{display:grid;grid-template-columns:43fr 57fr;min-height:100dvh}
.book-media{background:var(--accent-deep);color:#fbfaf7;position:relative;
  overflow:hidden;display:flex;flex-direction:column;justify-content:center;
  padding:calc(90 * var(--u)) calc(64 * var(--h))}
.book-media video{position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;opacity:.16;mix-blend-mode:luminosity;z-index:0}
.book-media > *{position:relative;z-index:1}
.book-pane{background:var(--void);padding:calc(70 * var(--u)) calc(56 * var(--h))}
```
Video: `assets/hero-loop.mp4`, `muted loop playsinline preload="none"`,
`poster="assets/hero-still.webp"`, `<source>` attached **after `window.load`**.
**The media side never animates its content** — it is the stage.

Left panel content: eyebrow `Book Online`, H2 (white)
`Reserve your immigration exam appointment`, lead
`Pick any open time below. You will get instant confirmation by text and email, plus a reminder with your document checklist before the visit.`
then three short reassurance rows with a hairline between, in `rgba(251,250,247,.72)`:
`Instant text and email confirmation` · `A reminder with your document checklist` ·
`No referral, and no need to be an existing patient` ‹authored — all three restate the client's own copy›
then `Prefer to talk to a person?` + a bordered white button `Call (917) 905-8140`.

Right pane: the **live status pill** sits inline at the top — not a separate card:
```
[pulse dot] "Open now — closes 5:00 PM"  /  "Closed — opens Mon 9:00 AM"
```
Dot 10px, `--ok` when open / `--dim` when closed, `box-shadow:0 0 0 0 var(--ok)`
pulsing to `0 0 0 8px transparent` over 2s infinite. **Green means live — keep it
green.** No pulse under reduced motion.
```js
const HOURS = {1:[9,17],2:[9,17],3:[9,17],4:[9,17],5:[9,17],6:[10,14],0:null};
const nyc  = new Date(new Date().toLocaleString('en-US',{timeZone:'America/New_York'}));
const span = HOURS[nyc.getDay()];
const hrs  = nyc.getHours() + nyc.getMinutes()/60;
const open = !!span && hrs >= span[0] && hrs < span[1];
```
Computed in **America/New_York**, not the visitor's zone. Render `Checking…` in
the markup so there is never a flash of the wrong status.

Below it, the GoHighLevel embed: **`min-height:700px` reserved before load**
(CLS < 0.1 is not negotiable), skeleton shimmer until `load`
(`linear-gradient(100deg, var(--void-2) 30%, var(--void-3) 50%, var(--void-2) 70%)`,
`background-size:220% 100%`, `animation:shimmer 1.6s linear infinite`; killed
under reduced motion). `loader.js` attached after `window.load`, never in the
head. **Never restyle the iframe's internals.** If it is blocked, keep the
client's fallback copy: `Live booking calendar` / `Real-time availability, instant text and email confirmation, and an automatic reminder with the document checklist — powered by the practice's Go High Level calendar.` / the `Mon Tue Wed Thu Fri Sat` row / `Connects on launch`.

**Mobile:** the media side becomes a `clamp(244px, 34svh, 304px)` band with the
video still behind it, the headline white over it, and the calendar pane
**overlaps upward**: `margin-top:-28px; border-radius:28px 28px 0 0`.
Inputs inside the embed are the vendor's problem, but our own controls stay at
`font-size:16px` on phone or iOS zooms on focus.

---

### S11 · Dr. Irshad — editorial asymmetric  *(was: a two-column media act)*

Magazine layout on a 12-column grid, with a **giant watermark surname** behind it
and the portrait plate **hanging lower than the text**. Square corners — the only
square-cornered image on the page — because editorial plates are not rounded.

```css
.doctor{position:relative;display:grid;grid-template-columns:repeat(12,1fr);
  gap:calc(28 * var(--h));padding-block:calc(150 * var(--u));overflow:hidden}
.doctor .watermark{position:absolute;inset:0;display:grid;place-items:center;
  font:400 22vw/1 "Instrument Serif";text-transform:uppercase;letter-spacing:-.06em;
  color:var(--ink);opacity:.055;pointer-events:none;user-select:none;z-index:0}
.doc-plate{grid-column:2 / span 5;aspect-ratio:4/5;border-radius:0;
  box-shadow:var(--contact);transform:translateY(calc(46 * var(--u)));z-index:1}
.doc-txt{grid-column:8 / span 4;align-self:center;z-index:1}
.doc-name{font:800 calc(88 * var(--h))/.94 Manrope;letter-spacing:-.03em}
.doc-name sup{font-size:calc(26 * var(--h));color:var(--accent-2);
  vertical-align:super;margin-left:.12em}
.creds{list-style:none;margin-top:calc(30 * var(--h))}
.creds li{position:relative;padding-left:calc(28 * var(--h));
  padding-block:calc(11 * var(--h));border-top:1px solid var(--line-2)}
.creds li::before{content:"—";position:absolute;left:0;color:var(--accent-2)}
```
The watermark word is `IRSHAD`, `opacity .055` — **texture, not a headline**, and
the parent must `overflow:hidden` so it never forces horizontal scroll.
Credentials are a **hanging em-dash list** — no check icons anywhere in this
section, which is what separates it from S5, S8 and S13.

Eyebrow `Your Civil Surgeon` · name `Dr. Huma Irshad<sup>MD</sup>` ·
sub `Primary Care Physician · USCIS-Designated Civil Surgeon`
Body `Dr. Irshad has spent her career caring for immigrant families, and she performs every immigration medical examination personally. She understands that this form sits between you and a decision that shapes your family's future — so she takes the time to explain each requirement, answer questions without rushing, and make sure the paperwork leaves our office exactly the way USCIS expects it.`
- `USCIS-designated civil surgeon authorized to complete and sign Form I-693`
- `Board-certified physician licensed in the State of New York`
- `Follows current CDC technical instructions for civil surgeons`
- `Every exam confidential and HIPAA-protected`

CTA: pill `Book with Dr. Irshad` → `#book`.

**Plate, two states.** *With a client photo:* `object-fit:cover`,
`loading="lazy"`, explicit `width`/`height` so nothing shifts, plus a small badge
at `bottom:calc(24*var(--u)); left:calc(-20*var(--h))` on `--void-2` with
`box-shadow:var(--shadow-md)`: `USCIS-Designated` / `Civil Surgeon`.
*Without one (the default today):* the **monogram plate** — `--void-2`, square
corners, `HI` in Instrument Serif at `calc(104 * var(--h))` in `--accent-2`, a
hairline rule, then `Dr. Huma Irshad, MD` and `USCIS-Designated Civil Surgeon`.
**No stock person, ever.**

**Mobile:** one column — plate first at `aspect-ratio:1/1`, no `translateY`,
watermark `font-size:38vw`, name `calc(46 * var(--h))`.

---

### S12 · Patient reviews — pinned quote, ground tint morphs  *(was: a rotator)*

A25's world-swap mechanic, **scoped to a sticky rig instead of html-level scroll
snap.** (Snapping `html` would hijack the entire one-page site — never do that
here.) One quote fills the viewport; the ground shifts between three near-white
tints as you pass through.

```
section.rig.proof   height: calc(1800px + 100dvh)
└─ div.stage        position:sticky; top:0; height:100dvh;
                    display:grid; place-items:center;
                    transition:background .45s ease-in-out
```
```js
const p12 = clamp((s - M.proofTop) / M.proofLen, 0, 1);
const q   = Math.min(2, Math.floor(p12 * 3));
if (q !== activeQuote) {                    // guard: swap on change, not per px
  activeQuote = q;
  stage.style.background = ['#fbfaf7', '#f5f2ea', '#f1f5f3'][q];
  renderQuote(q);
}
```
Quote type: **Instrument Serif** `calc(42 * var(--h))`, `line-height:1.28`,
`max-width:calc(900 * var(--h))`, centred, `--ink`. Attribution below at `small`,
name in `--ink` weight 600, place and tag in `--dim`.
Cross-fade: outgoing `opacity 0, translateY(-10px)` 220ms; incoming
`opacity 1, translateY(0)` 340ms after 120ms.
Three progress bars under it: `height:2px; flex:1; border-radius:2px`, active
`--ink`, inactive `rgba(20,18,16,.2)`. **Bars, not dots**, and clickable.
`aria-live="polite"` on the quote region.

| quote | name | place | tag |
|---|---|---|---|
| `Dr. Irshad and her team are phenomenal. I came in for my immigration physical and was seen within 20 minutes. Professional, thorough, and genuinely caring.` | `Maria S.` | `Manhattan, NY` | `Immigration Physical` |
| `I had lost my childhood vaccination records and thought it would be a nightmare. They ordered titers instead, told me exactly where to go, and my sealed form was ready that same week.` | `Joseph A.` | `Queens, NY` | `I-693 Exam` |
| `Clear pricing, no surprise bills, and they explained every part of the form. The appointment took about an hour and I left knowing exactly what to do next.` | `Rina P.` | `Brooklyn, NY` | `Green Card Exam` |

> Carried over from the client's live site, not generated. **If the client cannot
> point to the real source of each review, cut this entire section.** See §12b.

**Mobile and reduced motion:** **unpin.** Rig height `auto`, stage not sticky,
the three quotes render stacked, each on its own tint, no transition.

---

### S13 · Who we serve + where we are — three-panel band  *(was: two separate sections)*

A22's `2fr / 1fr / 2fr` band. The narrow centre is what stops it reading as three
equal cards — it works as a spacer with content in it.

```css
.band{display:grid;grid-template-columns:2fr 1fr 2fr;
  border-block:1px solid var(--line)}
.band > *{padding:calc(76 * var(--u)) calc(48 * var(--h));position:relative}
.band > * + *{border-left:1px solid var(--line)}
```
| panel | ground | job |
|---|---|---|
| 1 | `--void-2` | **Who we serve** — H3 `Applicants from across all five boroughs`, the lead, then the twelve area names as a plain wrapped list (comma-free, `--line-2` hairline between rows of four), then the four affordances. A faint ECG glyph cut-out sits at `right:0; bottom:0` with `mix-blend-mode:multiply`, `opacity:.06`. |
| 2 | `--void` (lightest) | **Live status** — the pulse dot, `Open now — closes 5:00 PM`, the hours, and a ghost `Call (917) 905-8140`. One per page; this is it. A status with no action is decoration. |
| 3 | `--accent-deep`, ink `#fbfaf7` (darkest) | **Find us** — `Address` / `Phone` / `Hours` as three hairline-separated rows, then the Google iframe at `aspect-ratio:16/11`, `border-radius:14px`, `loading="lazy"`, `title="Map to NY MedCare, Manhattan, NY"`, `referrerpolicy="no-referrer-when-downgrade"`, box reserved before load. |

Panel 1 copy: `You do not need to be an existing patient and you do not need a referral. Applicants travel in from across the metro area because the exam itself takes a single appointment.`
Areas: `Manhattan` `Brooklyn` `Queens` `The Bronx` `Staten Island` `Jersey City`
`Hoboken` `Newark` `Yonkers` `Westchester` `Long Island` `New Jersey`
Affordances: `Interpreters welcome` · `Family appointments` · `Adults & children` ·
`Evening & Saturday slots`
Panel 3 copy: `Convenient to multiple subway lines. Full directions and transit details are confirmed when you book.`

Each panel enters with its own `fadeUp`, **100ms apart, left to right.**
**Mobile:** stack 1 → 2 → 3, borders become `border-top`, panel 3 keeps its dark
ground so the rhythm survives.

---

### S14 · FAQ — sticky index + rule-only accordion  *(was: a centred accordion)*

Left column sticks with a numbered index of all thirteen; right column holds the
answers. No boxes, no fills, no rounded panels — hairline rules only.

```css
.faq{display:grid;grid-template-columns:300px 1fr;gap:calc(72 * var(--h));
  padding-block:calc(130 * var(--u))}
.faq-index{position:sticky;top:calc(150 * var(--u));align-self:start}
.faq-index a{display:flex;gap:calc(12 * var(--h));padding-block:calc(7 * var(--h));
  font:500 calc(14 * var(--h))/1.35 Inter;color:var(--dim);
  transition:color .24s var(--ease-scroll)}
.faq-index a .n{font-variant-numeric:tabular-nums;color:var(--line)}
.faq-index a[aria-current="true"]{color:var(--accent)}
.faq-index a[aria-current="true"] .n{color:var(--accent-2)}

details{border-top:1px solid var(--line)}
details:last-of-type{border-bottom:1px solid var(--line)}
summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;
  align-items:center;gap:calc(20 * var(--h));padding:calc(26 * var(--h)) 0;
  font:700 calc(21 * var(--h))/1.35 Manrope;color:var(--ink)}
summary::-webkit-details-marker{display:none}
summary .chev{width:12px;height:12px;flex:0 0 auto;color:var(--accent);
  transition:transform .38s var(--ease-scroll)}
details[open] summary .chev{transform:rotate(180deg)}
.ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .38s var(--ease-scroll)}
details[open] .ans{grid-template-rows:1fr}
.ans > div{overflow:hidden}
summary:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:6px}
```
The glyph is a **rotating hairline chevron**, not the `+`→`−` from v1 — a
different device for a different section.
The index highlights the question currently in view (one IntersectionObserver,
`rootMargin:"-20% 0px -70% 0px"`). Clicking an index item scrolls its `<details>`
into view **and opens it**.

Native `<details>` — keyboard and screen-reader behaviour comes free. **Do not
re-implement it in JS.**

All **thirteen** Q&As carry over verbatim, in the client's order:
`What exactly is Form I-693?` · `Is Dr. Irshad a USCIS-designated civil surgeon?` ·
`How long does the appointment take?` · `Do I need a TB skin test or a blood test?` ·
`Which vaccinations does USCIS require?` · `What if I have lost my vaccination records?` ·
`Does my completed Form I-693 expire?` · `Which edition of the form should I bring?` ·
`Can I open the sealed envelope?` · `Does insurance cover the immigration physical?` ·
`Do you serve applicants from outside Manhattan?` ·
`Do I need to be an existing patient or have a referral?` ·
`Can my whole family be seen on the same day?`

**Emit the `FAQPage` JSON-LD from the same source array that renders the
accordion**, so the two can never drift.
**Mobile:** the index is hidden; the accordion goes full width.

---

### S15 · Final CTA — the void and the seal

**Wide and empty. Negative space is the point — do not fill it.**
`min-height:calc(780 * var(--u))`, `display:grid; place-items:center;
text-align:center`. The camera reaches its C7 pull-back here and `--gl-op` climbs
to `.60`, so the ECG is visible and distant behind the type. No watermark, no
photo, no band — after fourteen busy sections, the emptiness is the effect.

H2 `Get your I-693 done right the <em>first time</em>`
Lead `One exam appointment. Every order written for you. A USCIS-designated civil surgeon who has walked hundreds of applicants through this exact form.`
Primary `Book Your Exam` → `#book` · Secondary `Call (917) 905-8140` → `tel:`

**The seal** — the same SVG as S1's medallion, at 132px, `color:var(--seal)`:
```html
<svg viewBox="0 0 132 132" width="132" height="132" class="seal" aria-hidden="true">
  <defs><path id="sealArc" d="M66,66 m-49,0 a49,49 0 1,1 98,0 a49,49 0 1,1 -98,0"/></defs>
  <circle class="ring" cx="66" cy="66" r="57" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <circle class="ring" cx="66" cy="66" r="40" fill="none" stroke="currentColor" stroke-width="1"/>
  <g class="spin"><text class="arc" font-size="8.4" letter-spacing="3.1">
    <textPath href="#sealArc">USCIS · CIVIL SURGEON · FORM I-693 · MANHATTAN NY · </textPath>
  </text></g>
  <path class="mono" d="M52 74.5V57.5l14 12 14-12v17" fill="none" stroke="currentColor"
        stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```
1. **Draw.** Both `.ring` circles take `stroke-dasharray:var(--len)` (`--len` from
   `getTotalLength()`, written once on load) and animate
   `stroke-dashoffset: var(--len) → 0` over **1200ms** `--ease-in`, inner ring
   delayed **180ms**, fired on `.is-in`.
2. **Stamp.** At **+900ms** `.mono` scales `1.35 → 1` with a 60ms hold at 1.0,
   `opacity 0 → 1`, over **260ms** `cubic-bezier(.2,.9,.25,1)`; a `--seal-soft`
   ring pulses `scale(1) opacity(.55) → scale(1.5) opacity(0)` over **220ms**.
3. **Rotate.** `.spin{transform-origin:66px 66px; animation:sealspin 24s linear infinite}`
   — only here, never in the hero.

**Reduced motion:** fully drawn, stamped, static. It is a mark, not a toy.

---

## 9 · ENTRANCES

Easing: `cubic-bezier(.16,1,.3,1)` entrances · `cubic-bezier(.22,1,.36,1)` scroll and hover.

```css
.appear{animation-duration:1.05s;animation-fill-mode:both;
  animation-timing-function:var(--ease-in);animation-delay:var(--d,.08s)}
.appear.is-in{animation:none;opacity:1;transform:none;clip-path:none;filter:none}
@keyframes in-scale{from{opacity:0;transform:scale(.84)}}
@keyframes in-soft {from{opacity:0;transform:translateY(14px)}}
@keyframes in-mask {from{opacity:0;transform:translateY(40%)}}
@keyframes in-pop  {0%{opacity:0;transform:scale(.9)}70%{transform:scale(1.03)}100%{transform:scale(1)}}
@keyframes in-btn  {from{opacity:0;transform:translateY(18px) scale(.94)}}
@keyframes in-side {from{opacity:0;transform:translateX(22px)}}
@keyframes draw    {from{stroke-dashoffset:var(--len)} to{stroke-dashoffset:0}}
```
**`.appear` resting opacity is `1`.** If animations never run — blocked,
unsupported, a JS error, an extension — the page is complete and readable.
`animation-fill-mode:both` is what still hides an element during its delay when
they *do* run. This pairing is the whole trick; do not "simplify" it.

**Load stagger**
| element | keyframe | `--d` |
|---|---|---|
| brand mark | `in-scale` | .08s |
| nav 1–6 | alternating `in-scale` / `in-soft` | .16 / .24 / .32 / .40 / .48 / .56s |
| header CTA / burger | `in-scale` | .34s |
| hero eyebrow | `in-soft` | .30s |
| h1 line 1 | `in-mask` | .42s |
| h1 line 2 | `in-mask` | .62s |
| h1 `<em>` underline | `scaleX` | .72s (1.2s duration) |
| lead | `in-soft` | .82s (1.25s duration) |
| primary CTA | `in-btn` | .96s |
| secondary CTA | `in-side` | 1.10s |
| hero image column | `in-scale` from `.94` | .20s (1.4s duration) |
| seal medallion | `in-pop` | 1.24s |

Alternating `in-scale` / `in-soft` across the nav is what stops the row reading
as a mechanical sweep.

**Never blank**
- **First rule in the stylesheet:** `html,body{background:#fbfaf7!important}`, and
  `<body style="background:#fbfaf7">` inline as well. On a light build the
  anti-flash colour is **white, not black.**
- Every image and both embeds have reserved space. **CLS < 0.1.**
- Poster before video; `<source>` attached after `window.load`.
- **A reveal never re-animates on scroll back up** — `unobserve` after firing.

---

## 10 · BREAKPOINTS

| breakpoint | overrides |
|---|---|
| `max-width:1500px` | `--gutter` → `clamp(20px,4.8vw,64px)`; S1 → `56fr 44fr`; S10 → `46fr 54fr` |
| `max-width:1300px` | section-index rail hidden |
| `max-width:1100px` | topbar hidden; nav → burger; S4, S9, S11, S14 → single column; S13 band → stacked; mosaic → 6 cols × 3 rows |
| `max-width:900px` | **S3 arcs dropped** → 2×2 numeral grid; **S7 unpinned** → snap swipe row; **S9 detail frame removed** → notes inline; S8 overlay → bottom sheet |
| `max-aspect-ratio:11/10` | `--m` engaged (§4); S1 → stacked with the image as a top band; **S12 unpinned**; mosaic → 1 column, cards `min-height:230px`; `--gl-op` ceiling `.34`, head dot dropped, DPR cap 1.5; pointer parallax off |
| `max-width:430px` | h1 `calc(38*var(--h))`; ribbon `calc(26*var(--h))`; S11 name `calc(42*var(--h))`; `--gutter:18px` |
| `(min-width:901px) and (max-height:850px)` | h1 `calc(60*var(--h))`; hero padding-bottom `calc(70*var(--u))`; S7 panels `clamp(340px,42vw,560px)` |
| `(min-width:901px) and (max-height:720px)` | h1 `calc(50*var(--h))`; lead `calc(17*var(--h))`; S12 quote `calc(32*var(--h))` |
| `prefers-reduced-motion: reduce` | every channel frozen at `s=0`; canvas one frame then stopped; **S7 and S12 unpinned**; no marquee, no skew, no arc draw, no count-up, no shimmer, no seal draw/spin, no mosaic drift; every content state reachable |

Safe-area insets on the sticky mobile CTA, the S8 bottom sheet and the footer:
`padding-bottom:calc(14px + env(safe-area-inset-bottom))`.

---

## 11 · ACCESSIBILITY & SEO

- **One `<h1>`** (S1). Every other heading descends in order, no level skipped.
- Skip link first in `<body>`; `.skip:focus{left:var(--gutter);top:12px;z-index:95}`.
- `canvas#gl` — `aria-hidden="true"`, `pointer-events:none`. **The canvas must
  never capture pointer events.**
- `:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:4px}`.
  **Never `outline:none` without a replacement.**
- Contrast: `--muted` on `--void` ≥ 7:1; `--accent` on `--void` 5.85:1;
  `--accent-2` **large text and decoration only** (3.28:1); white on
  `--accent-deep` ≥ 9:1 (verify S10's left panel and S13's panel 3).
- Touch targets ≥ 44×44px — including the S9 tab rows, the S14 index links and
  the S3 fallback grid.
- S9 is a real `tablist` with roving tabindex and arrow-key navigation.
- S8's overlay: `role="dialog" aria-modal="true"`, focus trapped, `Escape`,
  focus returned, **body scroll restored on close and on unmount.**
- S7 and S12 unpin entirely under reduced motion — no content lives only inside
  a pinned state.
- Language `en`; body lines ≤ 72 characters; never justified. Many readers here
  are non-native English speakers.

**JSON-LD** — one graph:
| type | notes |
|---|---|
| `MedicalClinic` | `@id`, name, description, url, telephone, image, `PostalAddress`, `GeoCoordinates`, `openingHoursSpecification`, `medicalSpecialty:"PrimaryCare"`, `priceRange:"$$"`, `areaServed[]`, `employee` → `Physician`, `availableService` → `MedicalTest` (Form I-693, `usesDevice`: IGRA), `sameAs[]` |
| `FAQPage` | generated from the S14 source array |
| `HowTo` | `totalTime:"PT90M"`, five steps mirroring S7 |
| `MedicalWebPage` | `about` → the `MedicalTest`, `lastReviewed`, `specialty` |
| `Organization` | name, url, logo, telephone, address, `sameAs[]` |
| ~~`AggregateRating`~~ | **do not emit** — see §12b |

`sitemap.xml` (`/`, `/privacy-policy`, `/terms`) and `robots.txt` already exist —
keep them.

---

## 12 · ACCEPTANCE CRITERIA

**The v2 test — run this first**
1. Screenshot S2, S3, S4, S5, S7, S9, S10, S11, S12, S13 and S14 at 1512×1024.
   **No two may share a layout shape.** If any two could be swapped without a
   reader noticing, the build has failed and the section must be redesigned.
2. Exactly **one** dark-ground panel exists on the page (S10's media side) plus
   S13's third panel. Nothing else inverts.
3. Exactly **two** sticky rigs exist (S7, S12). No third pin.

**Content**
4. Every string in §8 appears verbatim. No rewording, no synonyms.
5. Exactly one `<h1>`, no colon in it.
6. All 13 FAQs render, `FAQPage` JSON-LD generated from the same array.
7. **No emoji anywhere** — all six mosaic icons and both note glyphs are inline SVG.
8. No `AggregateRating` in the emitted schema.
9. S11 shows either a client photo or the monogram plate. No stock person, no
   generated face.

**Motion — as an ordered scrub narrative**
10. **0 → 640px:** hero text rises 170px and fades; the image column rises only
    70px while scaling to 1.06 — the 100px differential must be visible.
    `--gl-op` .55 → .16.
11. The ribbon leans with scroll direction, clamped at ±8°, and never exceeds it.
12. The four arcs draw in sequence (0.4s + i·0.22s), each fading out at **both**
    ends, and the dots pop without flying off-screen.
13. Entering S7 the canvas climbs to `--gl-op .42`, the camera dollies from
    `x −1.60` to `x +1.60`, and the ECG rotates a full 90° — vertical exactly as
    step 5 centres.
14. S7's step 5 finishes **fully on-screen**, proving progress is tied to
    `rig.offsetHeight − innerHeight` and not a guessed length.
15. S12's ground steps through `#fbfaf7 → #f5f2ea → #f1f5f3`, once per quote, on
    index change only — never per pixel.
16. At S15 the camera reaches `(0, 0.62, 12.80)` fov 42, `--gl-op` .60, and the
    seal draws (1200ms) then stamps (+900ms).
17. No reveal re-animates on scroll back up.

**Engineering**
18. `assets/engine.js` and `assets/nav.js` are **byte-identical** to what is in
    this folder now. `gl.js` differs only by the §6 rail rotation and dolly.
19. No GSAP, ScrollTrigger, Lenis, Locomotive, AOS, or any animation library.
20. No loaded 3D models. All geometry procedural. One rAF loop, one WebGL
    context, ≤ 3 draw calls, on-demand rendering.
21. **No `overflow-x:hidden` on any ancestor of S7 or S12** — `clip` only.
    Verified by scrolling both pinned sections end to end.
22. `getBoundingClientRect` is called once per frame (the mosaic) — everything
    else reads the cached `M`, re-measured only on load and debounced resize.
23. All three tiers ship and were each **viewed**: full, `html.no-gl`,
    `prefers-reduced-motion`.
24. CLS < 0.1. The 700px calendar box and the map box are reserved before load.
25. No image over 200KB. `hero-loop.mp4` loads only in S10 with `preload="none"`.
26. Lighthouse: Performance ≥ 90 mobile, Accessibility 100, Best Practices ≥ 95,
    SEO 100.
27. Viewed at **1512×1024**, **1280×720** and **390×844**. Nothing clips, no
    horizontal page scroll, CTAs visible without scrolling at 1440×720.
28. On a phone, S7 swipes horizontally and **never traps vertical scroll**.
29. GA4 `G-GFF61XS9JJ` fires; the GoHighLevel calendar loads and accepts a test
    booking.

**BANNED — every one is a build failure**
- A card grid as any section's primary composition. (S5's mosaic is *not* this —
  it is one photograph cut into windows.)
- Glowing orbs, blurred blob gradients, mesh-gradient wallpaper.
- Emoji, stock illustration, lorem, invented copy where real copy exists.
- Gradient text fills on headings — solid accent + the drawn underline only.
- A `<canvas>` that captures pointer events.
- `outline:none` without a replacement focus ring.
- `placehold.co`, `picsum`, grey placeholders, scraped Google Images.
- A dark vignette on this light page.
- `scroll-snap-type` on `html` or `body`.
- Re-animating a reveal on scroll back up.

---

## 12b · FACTS TO CONFIRM  ← read before launch

| # | item | status |
|---|---|---|
| 1 | **`ADDRESS_TBD` / `ZIP_TBD`** — a placeholder in the client's markup *and* schema. It appears in the topbar, footer, S13 panel 3, the map URL and `PostalAddress`. | **blocks launch** |
| 2 | **Geo `40.7831, -73.9712`** is the Upper West Side centroid, not the practice. | blocks launch |
| 3 | **`AggregateRating 4.9 / 120 reviews`** on the client's site — **cut** from schema and from S3's numbers. Restore only from a real, verifiable profile; fabricated rating markup gets sites penalised. | **cut pending proof** |
| 4 | **The three testimonials** (Maria S., Joseph A., Rina P.). If the client cannot point to their real source, **cut S12 entirely.** | confirm or cut |
| 5 | **All four social links point at "Medcare Clinic Danbury", Connecticut** — and they sit in `sameAs[]`, telling Google the two businesses are one entity. | **likely wrong** |
| 6 | **The twelve S9 detail notes are ‹authored›.** Each must be reviewed by Dr. Irshad. If she will not review them, ship the names alone and delete the detail frame. | **clinical review** |
| 7 | S3's H2 `One appointment is the whole point` and eyebrow `By the numbers` are ‹authored›. | authored |
| 8 | S8's H2 `Arrive with these eight things` is ‹authored›. | authored |
| 9 | S10's three reassurance rows are ‹authored› restatements of the client's own copy. | authored |
| 10 | **Hours** Mon–Fri 9:00–5:00, Sat 10:00–2:00 — S10 and S13 compute live status from these. | confirm |
| 11 | **Booking calendar ID** — the widget still says "Connects on launch". | blocks launch |
| 12 | **Dr. Irshad's portrait** — needed, or S11 ships the monogram plate. | supply |
| 13 | Footer disclaimer *"NY MedCare is not affiliated with U.S. Citizenship and Immigration Services. We do not provide legal advice."* is ‹authored›. | authored |
| 14 | Every regulatory date (01/20/2025 edition · July 3, 2025 · May 2024 polio · January 22, 2025 COVID removal · June 11, 2025 validity guidance) comes from the client's page. **Re-verify against uscis.gov** — USCIS has revised this guidance more than once. | verify |

---

## 13 · BUILD ORDER

```
core.css tokens → chrome + index rail + footer → engine.js (untouched) →
gl.js + rail rotation → S1 → S2 → S3 → S4 → S5 → S6 → S7 → S8 → S9 →
S10 → S11 → S12 → S13 → S14 → S15 → mobile pass → a11y pass → perf pass → ship
```
Report each step as done. Then run §12 — starting with **the v2 test** — and
report any failure with the actual output. Never claim a criterion passed without
checking it.

**Deploy:** static files, no build step, no build config. Same Cloudflare Pages
project. `sitemap.xml`, `robots.txt`, favicon and OG tags already ship with it.

**State plainly at handover:** the booking calendar is a third-party GoHighLevel
embed, the map is a Google iframe, and there is no backend — nothing on this page
stores patient data.

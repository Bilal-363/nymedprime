# NY MedCare — Master Build Prompt (one-page, light 3D)

> **Reproduce all values verbatim. They are not approximations.**

Build a complete redesign of `nymedprime.pages.dev` as **one page**, vanilla
static, light theme, with a single light-safe WebGL layer. All body copy below is
**scraped verbatim from the client's live site and is law — never reword it.**
Lines marked `‹authored — confirm›` are new and are listed again in §12b.

---

## 1 · IDENTITY

| field | value |
|---|---|
| Brand | **NY MedCare** |
| Niche | USCIS-designated civil surgeon · Form I-693 immigration medical exam · Manhattan, NY |
| Preset | **P7 ENAMEL** (clinical white) — light-mode design system, not "dark inverted" |
| Scene | **PulseLine** (gl-scenes #22), rendered as dark-ink line art, no bloom |
| Camera | **C18 hero-lock**, closing on **C7 pull-back** |
| Positioning | One exam appointment. Every lab and vaccine order written for you. A properly sealed Form I-693. |
| Site type | **One page**, locked cinematic first viewport, everything scrolls below it |
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
| Socials | Facebook / Instagram / Yelp / TikTok — **all four currently point at "Medcare Clinic Danbury" (Connecticut). See §12b.** |

### Head (single page)
| page | file | `<title>` | `<meta description>` |
|---|---|---|---|
| Home | `index.html` | `USCIS Immigration Medical Exam Manhattan \| NY MedCare` (53 ch) | `USCIS-designated civil surgeon in Manhattan. One appointment for your Form I-693 — every lab and vaccine order written for you, sealed when results arrive.` (156 ch) |
| Privacy | `privacy-policy/index.html` | `Privacy Policy \| NY MedCare` | `How NY MedCare collects, uses and protects patient information.` |
| Terms | `terms/index.html` | `Terms of Use \| NY MedCare` | `Terms governing use of the NY MedCare website and appointment booking.` |

Every page head: `<html lang="en">`, `<meta charset="utf-8">`,
`<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">`,
`<link rel="icon" href="/assets/favicon.png">`, `<link rel="canonical">`,
OG title/description/image/url/type, `<meta name="theme-color" content="#fbfaf7">`.

---

## 2 · ASSETS

### 2a · Asset table
| role | URL / source | notes |
|---|---|---|
| Fonts | `https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&family=Instrument+Serif&display=swap` | `preconnect` to `fonts.googleapis.com` + `fonts.gstatic.com` (crossorigin) |
| Three.js | `<script type="importmap">{"imports":{"three":"https://unpkg.com/three@0.160.0/build/three.module.js"}}</script>` | only external JS besides the two below |
| Booking | `https://widgets.leadconnectorhq.com/loader.js` | GoHighLevel calendar, `defer`, attached after `window.load` |
| Analytics | `https://www.googletagmanager.com/gtag/js?id=G-GFF61XS9JJ` | `async`, unchanged from current site |
| Logo | `/assets/logo-nymedcare-h.png` | **replaced** by the inline SVG mark in §5 — keep the PNG only for OG/schema `image` |
| Hero still | ‹resolved at build — see 2b, IMG-1› | |
| Mosaic background | ‹resolved at build — see 2b, IMG-2› | the one photograph all six windows cut into |
| Doctor portrait | **Rung 1 only — client-supplied photo of Dr. Irshad** | see the hard rule below |
| Map | `https://maps.google.com/maps?q=<CONFIRMED_ADDRESS>&t=&z=15&ie=UTF8&iwloc=&output=embed` | `loading="lazy"`, titled iframe |

> **Hard rule — never generate the doctor's face.** Dr. Huma Irshad is a real,
> named physician. A generated portrait would be a fabricated image of a real
> person. If no client photo is supplied, the doctor section falls back to the
> **typographic credential card** in §8 — no photo, no silhouette, no stock
> person. This overrides the ladder below.

### 2b · Asset-acquisition ladder (the running agent executes this)

> Walk top to bottom, **stop at the first rung that succeeds for each shot**.
>
> **Rung 1 — user URLs.** In the brief → use verbatim, done.
> **Rung 2 — a generation tool is connected.** Detect any image/video capability
> this session (Higgsfield `generate_image`/`generate_video`, or any equivalent).
> If present: build the shot list, **preflight the cost and report it before
> spending**, generate the still first and pass it as the video's `start_image`,
> **Read each result** before wiring it, drop URLs into 2a.
> **Rung 3 — free-licence stock.** No generator but the shot needs a real
> photograph → hotlink Unsplash/Pexels with size pinned + credit comment. Never
> `placehold.co`, `picsum`, or scraped Google Images.
> **Rung 4 — build it in code.** Nothing above → the PulseLine system in §6.
>
> Decide **per shot, not per project.** The hero and the final CTA are stronger
> empty; the mosaic genuinely needs one photograph.
>
> **Downscale every generated image to ~1200px WebP before shipping.** A 2048²
> PNG is ~7MB; the WebP is ~90KB.

**Shot list**
| need | shot | procedural fallback |
|---|---|---|
| Hero atmosphere | IMG-1 — clinic exam room, morning light, no people | PulseLine only, canvas at `--gl-op:.55`. **This is the preferred hero** — the first viewport is better with space than with a photo. |
| Mosaic background | IMG-2 — one wide clinical still (instruments, pale surfaces, daylight) | flat `--void-2` cards with a `--line` hairline and the accent rule at top; layout unchanged |
| Location plate | IMG-3 — quiet Manhattan street-level daylight, no signage | the map iframe alone, full width |
| Hero loop (optional) | VID-1 — 4s silent loop, first frame = IMG-1 | omit; the canvas carries the motion |
| Doctor portrait | **client-supplied only** | typographic credential card (§8) |

### 2c · Generation prompts (auto-run if an engine is connected; else ignore)

```
IMG-1 (hero, 16:9):
  Ultra-cinematic wide shot. An empty, spotless medical examination room in a
  Manhattan clinic at 8am — a paper-covered exam table, a blood-pressure cuff
  coiled on a pale counter, a window throwing soft daylight across the floor.
  Deep teal #136f63 key light, warm brass #b8813a rim on the metal, warm
  off-white #fbfaf7 ground. Heavy negative space in the left third for
  typography, subject weighted right of centre. Anamorphic lens, shallow depth
  of field, fine film grain, high-key clinical lighting, photoreal.
  No text, no logos, no watermarks, no UI, no people, no faces, no patients,
  no procedures, no needles, no visible medical records or charts.

IMG-2 (mosaic background, 16:9):
  Ultra-cinematic wide overhead shot. A calm clinical worktop — a stethoscope,
  a sealed white envelope, a blood-collection tube rack and a clipboard laid out
  in an even rhythm across a pale surface, shot straight down. Deep teal #136f63
  cool light with a warm brass #b8813a highlight on the metal, warm off-white
  #fbfaf7 ground. Even edge-to-edge composition with no single focal point, so
  any crop of the frame reads as a complete picture. Fine film grain, soft
  high-key lighting, photoreal.
  No text, no logos, no watermarks, no UI, no people, no faces, no blood,
  no needles, no readable documents.

IMG-3 (location plate, 16:9):
  Ultra-cinematic wide shot. A quiet Manhattan side street in flat morning
  daylight, a clean limestone building entrance, shallow steps, no signage.
  Cool #136f63 shadow tint, warm brass #b8813a on the door hardware, warm
  off-white #fbfaf7 sky. Heavy negative space in the upper third, entrance
  weighted right of centre. Anamorphic lens, shallow depth of field, fine film
  grain, photoreal.
  No text, no logos, no watermarks, no street signs, no license plates,
  no people, no faces.

VID-1 (hero loop, 16:9, 4s, silent):
  <IMG-1> The camera pushes in extremely slowly and steadily on a dolly; first
  and last frame near-identical for a seamless loop.

Model hints (use whatever this session exposes):
  images → nano_banana_pro (Higgsfield) or any image tool, aspect 16:9
  video  → kling3_0 (Higgsfield) mode:pro sound:off duration:4, or any video tool
Poster rule: VID-1's start_image = IMG-1, so the poster→video handoff is invisible.
If no engine is connected, skip this block and use the procedural system in §6.
```

---

## 3 · TOKENS

```css
:root{
  /* ground + ink — P7 ENAMEL */
  --void:#fbfaf7; --void-2:#ffffff; --void-3:#f4f1ea;
  --ink:#141210; --muted:#5a544c; --dim:#9a948c;
  --line:rgba(20,18,16,.12); --line-2:rgba(20,18,16,.06);

  /* accents — shifted for this build */
  --accent:#136f63; --accent-deep:#0d564d; --accent-2:#b8813a;
  --accent-soft:rgba(19,111,99,.10);
  --seal:#b8813a; --seal-soft:rgba(184,131,58,.12);

  /* semantic */
  --alert:#a63a1e; --alert-soft:rgba(166,58,30,.07);
  --ok:#2f7d4f; --ok-soft:rgba(47,125,79,.10);

  --glass:rgba(255,255,255,.62); --glass-line:rgba(20,18,16,.10);
  --pill:#141210; --pill-ink:#fbfaf7;

  /* light-mode depth — NOT optional on P7 */
  --shadow-sm:0 2px 8px rgba(20,18,16,.06);
  --shadow-md:0 12px 30px rgba(20,18,16,.10);
  --shadow-lg:0 30px 70px rgba(20,18,16,.14);
  --contact:0 24px 40px -20px rgba(20,18,16,.35);

  /* units — see §4 */
  --u: calc(100dvh / 1024);
  --h: min(calc(100vw / 1512), calc(100dvh / 1024));
  --gutter: clamp(20px, 5.6vw, 92px);

  /* animated channels — JS writes numbers into these only */
  --hero-y:0px; --hero-scale:1; --hero-opacity:1;
  --sub-y:0px; --sub-opacity:1; --veil:0;
  --gl-op:.55; --fill:0%; --mos-drift:0px;

  --ease-in:cubic-bezier(.16,1,.3,1);
  --ease-scroll:cubic-bezier(.22,1,.36,1);
}
```

**Colour rules**
- `--accent #136f63` on `--void` = **5.85:1** → legal for body text, links, small labels.
- `--accent-2 #b8813a` on `--void` = **3.28:1** → **decorative and large text only**
  (≥ 24px at weight 700). Never body copy, never a small label. It is the seal
  colour: the wax-seal ring, the stat numerals, the `<em>` underline.
- `--alert #a63a1e` on `--alert-soft` for the two callout blocks only.
- Never a fourth accent.

**Type scale**
| role | size | line-height | weight | family | tracking |
|---|---|---|---|---|---|
| eyebrow | `calc(12 * var(--h))` | 1.0 | 600 | Inter | `.18em`, uppercase |
| h1 | `calc(76 * var(--h))` | .98 | 800 | Manrope | `-.025em` |
| h2 | `calc(46 * var(--h))` | 1.02 | 800 | Manrope | `-.02em` |
| h3 | `calc(22 * var(--h))` | 1.25 | 700 | Manrope | `-.01em` |
| lead | `calc(20 * var(--h))` | 1.55 | 400 | Inter, `--muted` | `0` |
| body | `calc(16.5 * var(--h))` | 1.68 | 400 | Inter, `--muted` | `0` |
| small | `calc(13.5 * var(--h))` | 1.50 | 500 | Inter, `--dim` | `.01em` |
| numeral | `calc(64 * var(--h))` | .90 | 400 | **Instrument Serif**, `--accent-2` | `-.01em` |
| pill label | `calc(15 * var(--h))` | 1.0 | 600 | Inter | `.01em` |

Body minimum is **16px absolute** — clamp `--h` so `calc(16.5 * var(--h))`
never resolves below `16px`. Medical copy read by non-native speakers must not
shrink on small laptops.

---

## 4 · UNIT SYSTEM

Reference canvas **1512 × 1024**. Four rules, no exceptions:

1. **Fixed position and vertical rhythm → `--u`** (`calc(268 * var(--u))`).
2. **Type and type-relative spacing → `--h`** (`calc(20 * var(--h))`).
3. **Horizontal page inset → `--gutter`**, never a percentage.
4. **Scroll timelines → raw px**, never `vh`.

Portrait / tablet override (`max-aspect-ratio: 11/10`):
```css
:root{ --m: min(calc(100vw / 430), calc(100dvh / 932)); --h: var(--m); --u: calc(100dvh / 932); }
```
Height breakpoints matter as much as width — see §10.

---

## 5 · SHARED CHROME

### Brand mark — inline SVG, no image file
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
`.brand{color:var(--ink)}` · `.brand-word{font:800 calc(19*var(--h))/1 Manrope;letter-spacing:-.02em}`
· `.brand-word b{color:var(--accent);font-weight:800}`. The mark **is** the ECG
line from the scene — that repetition is deliberate.

### Header
```
header.hdr  (position:sticky; top:0; z-index:50)
└─ div.hdr-in   display:grid; grid-template-columns:auto 1fr auto;
                align-items:center; padding-inline:var(--gutter);
                height:calc(88 * var(--u))
   ├─ a.brand
   ├─ nav.nav      (justify-self:center; display:flex; gap:calc(30 * var(--h)))
   └─ div.hdr-cta  (display:flex; gap:calc(12 * var(--h)))
```
Nav items, in order, linking to the on-page anchors:
`What's Included` `#included` · `The Process` `#process` · `What to Bring` `#bring` ·
`Vaccines` `#vaccines` · `Your Civil Surgeon` `#doctor` · `FAQ` `#faq`

Right slot: ghost `Call (917) 905-8140` (`tel:+19179058140`) + pill `Book Your Exam` (`#book`).

`.is-stuck` — added by `engine.js` when `scrollY > 40`, removed below 32
(hysteresis, so it cannot flicker):
```css
.hdr.is-stuck .hdr-in{height:calc(66 * var(--u))}
.hdr.is-stuck{background:rgba(251,250,247,.86);backdrop-filter:blur(14px) saturate(1.1);
  border-bottom:1px solid var(--line);box-shadow:var(--shadow-sm)}
.hdr-in{transition:height .34s var(--ease-scroll)}
.hdr{transition:background .34s var(--ease-scroll),box-shadow .34s var(--ease-scroll)}
```
Above the header on desktop only, a **topbar** strip, `height:calc(38 * var(--u))`,
`background:var(--accent-deep)`, `color:#fbfaf7`, `font:600 calc(13*var(--h))/1 Inter`:
`USCIS-Designated Civil Surgeon` · `ADDRESS_TBD, New York, NY` · `(917) 905-8140`.
Hidden below 1100px.

### Mobile menu (≤ 900px)
Burger: three bars `width:22px; height:2px; gap:5px; background:var(--ink);
border-radius:2px`. Open → bar 1 `translateY(7px) rotate(45deg)`, bar 2
`opacity:0`, bar 3 `translateY(-7px) rotate(-45deg)`, 300ms `--ease-in`.
Overlay: `position:fixed; inset:0; z-index:60; background:var(--void);`
items stagger `in-soft` at `.06s` intervals starting `.10s`. Traps focus,
closes on `Escape`, restores focus to the burger, `body{overflow:hidden}` while open.

### Sticky mobile CTA (≤ 900px)
`position:fixed; left:0; right:0; bottom:0; z-index:40; height:68px;`
`background:rgba(251,250,247,.94); backdrop-filter:blur(12px);`
`border-top:1px solid var(--line); padding-bottom:env(safe-area-inset-bottom);`
two equal buttons — ghost `Call` / pill `Book Exam`. `body{padding-bottom:68px}`.

### Footer
`background:var(--void-3); border-top:1px solid var(--line); padding:calc(80*var(--u)) var(--gutter) calc(40*var(--u))`.
Grid `2fr 1fr 1fr 1.2fr`:
1. Mark + the verbatim line: *"USCIS-designated civil surgeon in Manhattan, NY. Form I-693 immigration medical examinations — one exam appointment, every lab and vaccine order written for you, and a properly sealed form."* + four social links (labelled text, no icons — see §12b).
2. **Immigration Exam** — `What's Included` · `The Process` · `What to Bring` · `Vaccine Requirements` · `Your Civil Surgeon` · `Frequently Asked Questions` · `Book an Appointment`
3. **Practice** — `About Dr. Irshad` · `Location & Hours` · `Privacy Policy` · `Terms of Use`
4. Contact block: phone, address, hours, plus the disclaimer line ‹authored — confirm›:
   *"NY MedCare is not affiliated with U.S. Citizenship and Immigration Services. We do not provide legal advice."*

Bottom rule: 1px `--line`, then `© 2026 NY MedCare. All rights reserved.` at `small`.

### Grain + vignette
```css
.grain{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.028;
  background-image:url("data:image/svg+xml,...feTurbulence baseFrequency='.82' numOctaves='3'...");
  mix-blend-mode:multiply}
```
On light, grain is `multiply` at `.028` — any higher and the page looks dirty.
**No vignette on light.** A dark vignette on white reads as a printing error.

### Stacking contract
```
0   canvas#gl        fixed, inset:0, pointer-events:none, aria-hidden="true"
1   .grain
2   page content
5   sticky section rigs
40  sticky mobile CTA
50  header
60  mobile menu overlay
90  skip link (on focus)
```

---

## 6 · 3D LAYER

> **Visual Signature: PulseLine in ink line-art · accent `#136f63` teal with `#b8813a` seal-brass · C18 hero-lock closing on C7 pull-back · signature move — the wax-seal ring that draws itself and stamps at the final CTA.**

### Renderer
```js
renderer = new THREE.WebGLRenderer({antialias:true, alpha:true, powerPreference:'high-performance'});
renderer.setClearAlpha(0);                       // the page ground shows through
renderer.outputColorSpace   = THREE.SRGBColorSpace;
renderer.toneMapping        = THREE.NoToneMapping;   // tone mapping crushes light line art
renderer.shadowMap.enabled  = false;
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
```
**No bloom. No fog. No lights** — every material is `MeshBasicMaterial` /
`LineBasicMaterial`. On a white ground, bloom is invisible and emissive is noise.

### The scene — PulseLine (one primitive, ≤ 3 draw calls)

An ECG waveform traced across the frame as a tube, in near-black at low opacity,
with a travelling accent head.

```js
// waveform — p in [0,1) is one cardiac cycle
function ecg(p){
  const g=(c,w,a)=>a*Math.exp(-Math.pow((p-c)/w,2));
  return g(0.160,0.030,0.13)   // P wave
       - g(0.245,0.010,0.16)   // Q
       + g(0.262,0.012,1.00)   // R spike
       - g(0.285,0.014,0.30)   // S
       + g(0.440,0.055,0.24);  // T wave
}
const N = 480, CYCLES = 3, SPAN = 18, AMP = 1.35;
const pts = [];
for(let i=0;i<=N;i++){
  const f = i/N;
  pts.push(new THREE.Vector3(-SPAN/2 + SPAN*f, ecg((f*CYCLES)%1)*AMP, 0));
}
const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
```

| element | geometry | material | notes |
|---|---|---|---|
| base trace | `TubeGeometry(curve, 480, 0.018, 6, false)` | `MeshBasicMaterial{color:0x141210, transparent:true, opacity:.15, depthWrite:false}` | the whole waveform, always visible |
| head trace | `TubeGeometry(subCurve, 64, 0.026, 6, false)` — rebuilt from a **40-sample window** of `pts` | `MeshBasicMaterial{color:0x136f63, transparent:true, opacity:.62, depthWrite:false}` | the travelling pulse |
| head dot | `SphereGeometry(0.055, 12, 10)` | `MeshBasicMaterial{color:0x136f63, transparent:true, opacity:.85, depthWrite:false}` | sits on `curve.getPoint(head)` |

**Signature motion — one spike per 2.4s.** `head = (t / 2.4) % 1`, `t` in seconds
from `clock.getElapsedTime()`. The window is `[head, head + 40/N]` wrapped modulo 1.
Rebuild the head tube's geometry **in place** (`dispose()` the old one) at most
**30 times per second**, not per frame — cap it with an accumulator. Never
allocate a new `Vector3` inside the loop; reuse one scratch vector.

**Never randomise the curve.** Identical on every load, so it can be reviewed
and screenshotted.

Behind the trace, a horizontal baseline: `Line` from `(-9,0,0)` to `(9,0,0)`,
`LineBasicMaterial{color:0x141210, transparent:true, opacity:.07}`.

### Canvas opacity channel
The canvas is fixed full-viewport but must never fight body copy. `engine.js`
writes `--gl-op`, and `canvas#gl{opacity:var(--gl-op);transition:opacity .4s linear}`:

| scroll range (px) | `--gl-op` | formula |
|---|---|---|
| 0 → 620 | .55 → .16 | `(0.55 - smoothstep(0,620,s) * 0.39).toFixed(3)` |
| 620 → CTA top − 400 | .16 | hold |
| CTA top − 400 → CTA top + 300 | .16 → .60 | `(0.16 + smoothstep(ctaTop-400, ctaTop+300, s) * 0.44).toFixed(3)` |

### Camera keyframe table (C18 hero-lock → C7)
`fov` is vertical; `up` is `(0,1,0)`; the rig lerps between rows with the
scroll position, then adds drift and pointer parallax on top.

| scroll px | position | target | fov | note |
|---|---|---|---|---|
| 0 | `(0, 0.15, 7.40)` | `(0, 0.00, 0)` | 34 | hero lock — the camera does not travel |
| 900 | `(0, 0.30, 7.65)` | `(0, 0.02, 0)` | 34 | barely moves; the *scene* is what lives |
| 3200 | `(0, 0.42, 8.10)` | `(0, 0.04, 0)` | 35 | slow settle behind the process spine |
| 6400 | `(0, 0.50, 8.60)` | `(0, 0.05, 0)` | 36 | |
| `ctaTop + 200` | `(0, 0.62, 12.80)` | `(0, 0.00, 0)` | 42 | **C7 pull-back** — the trace goes small and distant |

**Drift** (this is the whole point of C18): `cam.position.y += Math.sin(t*0.22)*0.060`
and `cam.position.x += Math.sin(t*0.145)*0.045`. Amplitudes are deliberately
tiny — nothing may lurch while someone is reading about their green card.

**Pointer parallax:** `cam.position.x += px * 0.16`, `cam.position.y += py * 0.10`,
where `px,py ∈ [-1,1]` are the cursor offsets from centre, smoothed by
`v += (target - v) * 0.055` per frame. Disabled entirely on `(hover:none)`.

### The bridge rule
The **only** channel between DOM and WebGL is one scalar: `engine.js` owns
`smoothScroll`; `gl.js` reads `smoothScroll` and nothing else. `gl.js` never
queries the DOM, never reads `getBoundingClientRect`, never touches a CSS class.

### Three tiers — all three ship
| tier | trigger | behaviour |
|---|---|---|
| 1 · full | WebGL2 + `devicePixelRatio ≤ 2` + ≥ 4 logical cores | as specified above |
| 2 · `html.no-gl` | no WebGL, context loss, or < 4 cores | canvas removed; an **inline SVG ECG path** sits in the hero at `opacity:.14`, `stroke:var(--ink)`, with the same waveform, animated by `stroke-dashoffset` over 2.4s linear infinite. Must look intentional, not degraded. |
| 3 · `prefers-reduced-motion: reduce` | media query | canvas renders **one frame** at keyframe 0 and stops the rAF loop. No drift, no parallax, no travelling head — the head sits at `head = 0.262` (on the R spike), which is the best-looking still. All content reachable. |

### Perf budget
≤ 3 draw calls · one rAF loop · one WebGL context · **on-demand rendering only**
(render when `smoothScroll` changed by > 0.15px, when the pointer moved, or when
the 2.4s pulse advanced a frame — otherwise skip). Pause the loop on
`document.hidden`. Mobile (`max-aspect-ratio: 11/10`): drop the head dot,
`--gl-op` ceiling `.34`, DPR cap `1.5`.

---

## 7 · SCROLL ENGINE

`assets/engine.js` is copied **verbatim** — it owns `smoothScroll`, the rAF loop,
the `.is-in` IntersectionObserver, and the `.is-stuck` header toggle. It never
writes a `transform`; it writes numbers into CSS variables and CSS does the rest.

Shared helpers (define once, use everywhere below):
```js
const clamp = (v,a,b) => v < a ? a : v > b ? b : v;
const seg   = (a,b,s) => clamp((s-a)/(b-a), 0, 1);
const smoothstep = (a,b,s) => { const t = seg(a,b,s); return t*t*(3-2*t); };
const setVar = (el,k,v) => el.style.setProperty(k,v);
```

**Per-page channel writes**, every frame, in this order:

```js
const s = smoothScroll;                     // px, smoothed
const root = document.documentElement;

/* hero */
const intro = smoothstep(60, 620, s);
setVar(root,'--hero-y',       (intro * -190).toFixed(1) + 'px');
setVar(root,'--hero-scale',   (1 - intro * 0.07).toFixed(4));
setVar(root,'--hero-opacity', (1 - intro).toFixed(3));
setVar(root,'--sub-y',        (intro * 86).toFixed(1) + 'px');
setVar(root,'--sub-opacity',  (1 - intro).toFixed(3));
setVar(root,'--veil',         (intro * 0.55).toFixed(3));

/* canvas opacity — the table in §6 */
const ctaTop = ctaEl.offsetTop;
const glDown = 0.55 - smoothstep(0, 620, s) * 0.39;
const glUp   = smoothstep(ctaTop - 400, ctaTop + 300, s) * 0.44;
setVar(root,'--gl-op', clamp(glDown + glUp, 0.16, 0.60).toFixed(3));

/* process spine fill */
const sp = spineEl.getBoundingClientRect();
setVar(spineEl,'--fill',
  (clamp((innerHeight * 0.72 - sp.top) / sp.height, 0, 1) * 100).toFixed(1) + '%');

/* mosaic drift */
const mr = mosaicEl.getBoundingClientRect();
const mp = clamp((innerHeight - mr.top) / (innerHeight + mr.height), 0, 1);
setVar(mosaicEl,'--mos-drift', ((mp - 0.5) * 24).toFixed(1) + 'px');
```

`getBoundingClientRect` is read **once per frame per rig**, at the top of the
frame, never inside a loop. Cache `ctaEl.offsetTop` and re-measure only on
`resize` (debounced 150ms) and on `load`.

---

## 8 · THE PAGE

DOM order **is** paint order. One `<h1>`. Skip link first.

```
a.skip[href="#main"]            "Skip to content"
div.topbar                      (desktop only)
header.hdr                      §5
canvas#gl                       aria-hidden="true", fixed, z-0
div.grain                       z-1
main#main
 ├─ S1  section.hero            the locked first viewport
 ├─ S2  section.stats           the four-stat band
 ├─ S3  section.why             A2 problem-stack
 ├─ S4  section.included#included    A16 masked-mosaic
 ├─ S5  aside.callout--alert    TB-positive callout
 ├─ S6  section.process#process A5 process-spine
 ├─ S7  section.bring#bring     two-column: checklist + vaccine chips (#vaccines)
 ├─ S8  section.book#book       A12 booking embed + A29 status card
 ├─ S9  section.doctor#doctor   A9 media-act / credential card
 ├─ S10 section.proof           A6 proof-rotator
 ├─ S11 section.areas           area chips
 ├─ S12 section.faq#faq         A8 accordion
 ├─ S13 section.map#location    location + iframe
 └─ S14 section.cta             A11 final CTA + the seal
footer.ftr                      §5
div.mcta                        sticky mobile CTA (≤900px)
```

---

### S1 · Hero — the locked first viewport

**One composition. Nothing else above the fold.** No stat strip, no chip row, no
logo wall. The hero fills exactly one viewport and is **bottom-weighted, not
centred** — centring wastes the top third; bottom-weighting is what makes it read
as a film frame.

```css
.hero{min-height:100dvh; display:flex; flex-direction:column;
      justify-content:flex-end; padding:0 var(--gutter) calc(96 * var(--u));
      position:relative; overflow-x:clip}
```
> **Never `overflow-x:hidden` on this or any ancestor of a sticky rig** — it kills
> `position:sticky` further down the page and the stage shows blank. `clip` only.

DOM, in order:
```
section.hero
├─ p.eyebrow            "USCIS-Designated Civil Surgeon · Manhattan, NY"
├─ h1                   two .line wrappers, see below
├─ p.lead
├─ div.actions          a.pill + a.ghost
└─ div.veil             (opacity:var(--veil); background:var(--void))
```

**Strings — verbatim from the live site:**
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
**required**, or descenders clip.

The `<em>` accent: `color:var(--accent); font-style:normal;` with a **drawn
underline**, never a gradient fill:
```css
h1 em{position:relative}
h1 em::after{content:"";position:absolute;left:0;right:0;bottom:.02em;height:3px;
  background:var(--accent-2);transform-origin:left;transform:scaleX(var(--em,0));
  transition:transform 1.2s var(--ease-in) .72s}
.is-loaded h1 em::after{--em:1}
```

Layout: h1 `max-width:calc(1020 * var(--h))`, `text-wrap:balance`.
lead `max-width:calc(560 * var(--h))`, `margin-top:calc(26 * var(--h))`.
actions `margin-top:calc(34 * var(--h))`, `gap:calc(18 * var(--h))`.

**Scroll transform** — the exact math, applied by CSS reading §7's channels:
```css
.hero .eyebrow,.hero h1,.hero .lead{
  transform:translate3d(0,var(--hero-y),0) scale(var(--hero-scale));
  opacity:var(--hero-opacity);transform-origin:left bottom}
.hero .actions{transform:translate3d(0,var(--sub-y),0);opacity:var(--sub-opacity)}
```
Scrubbing **0 → 620px** must produce: the eyebrow/h1/lead rising 190px while
scaling to 0.93 and fading to 0; the actions sinking 86px and fading to 0; the
veil reaching 0.55 opacity; `--gl-op` falling 0.55 → 0.16. At 620px the hero is
fully gone and S2 owns the viewport.

**Mobile** (`max-aspect-ratio:11/10`): `--hero-y` multiplier `-190 → -120`,
`--sub-y` `86 → 54`, `--hero-scale` `0.07 → 0.04`, hero padding-bottom
`calc(96*var(--u)) → calc(120*var(--u))` to clear the sticky CTA bar.
**Reduced motion:** all six channels frozen at their `s=0` values; the hero
simply sits there, fully legible.

**Height breakpoints** are as important as width here:
`(min-width:901px) and (max-height:850px)` → h1 `calc(64*var(--h))`, hero
padding-bottom `calc(72*var(--u))`. Again at `max-height:720px` → h1
`calc(54*var(--h))`. A laptop at 1440×720 must not clip the CTAs.

---

### S2 · Stat band

Four stats, below the fold, on `--void-2` with `box-shadow:var(--shadow-sm)` and
a 1px `--line` top and bottom. `grid-template-columns:repeat(4,1fr)`,
`padding-block:calc(52 * var(--u))`, 1px `--line-2` vertical rules between cells.

| numeral | label |
|---|---|
| `USCIS-Designated` | `Civil Surgeon on staff` |
| `1` | `Exam Appointment` |
| `3–5` | `Days for Lab Results` |
| `All` | `Orders Written for You` |

Numerals use the `numeral` type role (Instrument Serif, `--accent-2`). The first
cell's "USCIS-Designated" is too long for 64px — it drops to
`calc(30 * var(--h))` at weight 700 in **Manrope**, `--accent-deep`, and keeps
the same baseline as the others.

Reveal: `data-reveal data-d="1|2|3|4"` → `in-stat`, delays `0 / .09s / .18s / .27s`.
**Count-up** on the two numeric cells (`1` and `3–5`, animating the 5): 900ms,
`eased = 1 - Math.pow(1-t, 3)`, `Math.round(target * eased)`, `aria-live="off"`,
final value written exactly once at `t = 1`.
**Reduced motion:** no count-up — final text rendered on first paint.

The live site's `4.9 / Patient Rating` cell is **cut from this band** — see §12b.

---

### S3 · Why Applicants Choose Us — A2 problem-stack

Not cards. Four numbered rows separated by 1px `--line`.
`grid-template-columns: calc(64 * var(--h)) 1fr 38%`, `padding-block:calc(30*var(--u))` per row.

Eyebrow `Why Applicants Choose Us`
H2 `Everything USCIS requires, mapped out for you`
Lead `The hard part of the I-693 is rarely the exam. It is knowing exactly which tests and vaccines USCIS wants for your age and history, and getting every one of them documented correctly. That is the part we take off your hands.`

| # | title | body |
|---|---|---|
| 01 | `Authorized Civil Surgeon` | `Only a USCIS-designated civil surgeon may sign Form I-693. Dr. Huma Irshad is designated and signs your form personally.` |
| 02 | `Labs & Vaccines Ordered For You` | `Your exam takes one appointment. We order every test and immunization USCIS requires that same day and tell you exactly where to go — results come back in 3–5 business days.` |
| 03 | `Properly Sealed Form` | `Your I-693 is signed, sealed and stamped exactly the way USCIS requires — plus an unsealed copy for your own records.` |
| 04 | `Multilingual & Judgment-Free` | `We serve applicants from every background. Bring an interpreter if you prefer — no one is rushed and no question is too small.` |

Hover / focus-within: numeral `scale(1.12)` + `color:var(--accent)`, row
background → `var(--accent-soft)`, both over **300ms** `--ease-scroll`.
Reveal `data-d="1..4"` → `in-soft`, 120ms apart.
**Mobile:** single column, numeral inline above the title, no hover state.

---

### S4 · What's Included — A16 masked-mosaic  `#included`

**The signature light-preset move, and it replaces the banned six-card grid.**
Six windows all showing a different part of **one** photograph (IMG-2), so the
section reads as one object cut into panes rather than six boxes.

Eyebrow `What's Included`
H2 `What happens during your I-693 exam`
Lead `USCIS and the CDC set the exact scope of the immigration medical examination. Here is what a complete exam covers, and what we perform at NY MedCare.`

```css
.mosaic{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr;
  gap:calc(10 * var(--h));min-height:calc(760 * var(--u));position:relative}
.mos-card{position:relative;overflow:hidden;border-radius:18px;
  box-shadow:var(--shadow-md);isolation:isolate;
  display:flex;flex-direction:column;justify-content:flex-end;
  padding:calc(28 * var(--h))}
.mos-card .mos-img{position:absolute;inset:0;z-index:-2;
  background-image:var(--mos-src);background-repeat:no-repeat;
  background-size:var(--mos-w) var(--mos-h);
  background-position:var(--mx) calc(var(--my) + var(--mos-drift))}
.mos-card::before{content:"";position:absolute;inset:0;z-index:-1;
  background:linear-gradient(0deg,
    rgba(251,250,247,.97) 0%,
    rgba(251,250,247,.90) 44%,
    rgba(251,250,247,.34) 100%)}
.mos-card h3,.mos-card p{position:relative;z-index:1}
.mos-card .ico{width:26px;height:26px;color:var(--accent);margin-bottom:calc(14*var(--h))}
```

**The three measurements**, run on `load`, on debounced `resize`, and after fonts settle:
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
`--mos-drift` comes from §7 and moves the shared photograph ±12px behind all six
windows at once — that parallax is what proves it is one image.

**Icons are inline SVG line art, 26×26, `stroke-width:1.6`, `currentColor` — never emoji.**
The live site uses 🩺🧪💉📋🧠✉️; every one is replaced.

| # | icon | title | body |
|---|---|---|---|
| 1 | stethoscope | `Physical Examination` | `A head-to-toe examination including eyes, ears, nose and throat, heart, lungs, abdomen, lymph nodes, skin and extremities, plus height, weight, blood pressure and vision.` |
| 2 | test tube | `Tuberculosis Screening (IGRA)` | `We order an Interferon Gamma Release Assay blood test, required by the CDC for applicants aged 2 and older. The older PPD skin test is no longer accepted as the initial screen.` |
| 3 | vial + droplet | `Required Blood & Urine Labs` | `Syphilis serology and gonorrhea testing within the CDC-specified age ranges. Ordered at your visit and processed by the laboratory we direct you to.` |
| 4 | clipboard | `Vaccination Record Review` | `We review your immunization history against the CDC schedule, identify exactly what is missing for your age, and write the prescriptions so you can complete them at your pharmacy.` |
| 5 | outlined head | `Mental Health & Substance Screening` | `A confidential evaluation for mental-health conditions associated with harmful behavior and for drug or alcohol use disorders, as USCIS requires.` |
| 6 | sealed envelope | `Completed & Sealed Form I-693` | `Dr. Irshad completes and signs the current 01/20/2025 edition, seals it in the required envelope, and gives you a duplicate copy to keep.` |

**Mobile** (`max-aspect-ratio:11/10`): `grid-template-columns:1fr`,
`grid-template-rows:auto`, each card `min-height:230px`, gap `8px`, and
`layoutMosaic` still runs — the illusion survives a single column and looks
better than six separate photos.
**Reduced motion:** `--mos-drift:0px`, everything else identical.
**Rung-4 fallback (no photograph):** `--mos-src:none`, cards get
`background:var(--void-2); border:1px solid var(--line)` and a 3px `--accent`
rule across the top. Same grid, same copy, no scrim.

---

### S5 · TB-positive callout

`background:var(--alert-soft); border-left:3px solid var(--alert);
border-radius:0 14px 14px 0; padding:calc(30*var(--h)) calc(34*var(--h));
max-width:calc(880 * var(--h))`. A 20px inline warning triangle SVG in `--alert`,
never the `⚠` character.

H3 `If your TB blood test comes back positive`
Body `A positive IGRA does not mean you have active tuberculosis, and it does not disqualify you. It does mean a chest X-ray and further evaluation are required before your form can be completed. We coordinate imaging locally and walk you through every step.`

---

### S6 · The Process — A5 process-spine  `#process`

Eyebrow `The Process` · H2 `Five steps from booking to sealed envelope`
Lead `No guessing, no runaround. Here is exactly how your immigration medical exam works with us, from booking to sealed envelope.`

Five steps on a 1px vertical spine at `left:calc(31 * var(--h))`, with an accent
fill that grows with section progress:
```css
.spine{position:absolute;top:0;bottom:0;left:calc(31 * var(--h));width:1px;background:var(--line)}
.spine::before{content:"";position:absolute;inset:0 auto auto 0;width:100%;
  height:var(--fill);background:var(--accent)}
.step{display:grid;grid-template-columns:calc(62 * var(--h)) 1fr auto;
  align-items:start;gap:calc(24 * var(--h));padding-block:calc(34 * var(--u))}
.step .n{width:calc(62*var(--h));height:calc(62*var(--h));border-radius:50%;
  display:grid;place-items:center;background:var(--void);border:1px solid var(--line);
  font:700 calc(19*var(--h))/1 Manrope;color:var(--muted);
  transition:background .3s var(--ease-scroll),color .3s,border-color .3s}
.step.is-in .n{background:var(--accent);border-color:var(--accent);color:#fbfaf7}
.step .when{font:600 calc(13.5*var(--h))/1 Inter;color:var(--accent-2);
  letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
```
`--fill` formula is in §7: `clamp((innerHeight*0.72 - spineTop) / spineHeight, 0, 1) * 100 + '%'`.
Each `.step` gets `.is-in` from the IntersectionObserver at `threshold:0.45`,
`rootMargin:"0px 0px -12% 0px"`, and **never re-animates on scroll back up**
(`unobserve` after firing).

| # | title | body | when |
|---|---|---|---|
| 1 | `Book Your Slot` | `Pick a time on the calendar below or call us. Same-week appointments are usually available.` | `2 minutes` |
| 2 | `Gather Documents` | `Photo ID, vaccination records and your printed Form I-693 with Part 1 filled in. Full checklist below.` | `Before visit` |
| 3 | `Complete the Exam` | `Physical exam and history review with Dr. Irshad, who writes every lab order and vaccine prescription you need.` | `About an hour` |
| 4 | `Complete Your Orders` | `Take your lab order to the collection site and any prescriptions to your pharmacy. We tell you exactly where to go.` | `Your schedule` |
| 5 | `Collect & File` | `Results reach us in 3–5 business days. We call you, then hand over your sealed envelope plus a copy to keep.` | `3–5 business days` |

**Mobile:** spine moves to `left:calc(22*var(--h))`, `.n` shrinks to
`calc(46*var(--h))`, `.when` drops below the body text.
**Reduced motion:** `--fill:100%` on first paint, `.is-in` applied to all five
steps immediately.

---

### S7 · Come Prepared — two columns  `#bring` / `#vaccines`

Eyebrow `Come Prepared` · H2 `What to bring, and which vaccines USCIS requires`
Lead `Arriving with the right paperwork is the single biggest thing you can do to keep your file moving — it is what lets Dr. Irshad write the right orders the first time.`

`grid-template-columns: 1.15fr 1fr; gap: calc(56 * var(--h));` — collapses to one
column below 900px, checklist first.

**Left · `Bring to your appointment`**
Sub-line: `Missing an item rarely stops the exam, but it can delay your sealed form.`
Eight rows, 1px `--line-2` divider, a 18px `--accent` check SVG in the left slot.
Each row is `<strong>lead phrase</strong> — rest`, verbatim:
1. `Government-issued photo ID` — `passport, driver's license or state ID.`
2. `Form I-693, edition 01/20/2025` — `printed, with Part 1 completed by you. USCIS has accepted only this edition since July 3, 2025.`
3. `All vaccination records` — `including records from your home country, however old.`
4. `USCIS receipt notice or A-number` — `if one has been issued to you.`
5. `List of current medications` — `and any relevant medical or surgical history.`
6. `Prior TB testing or treatment records` — `including any past chest X-ray reports.`
7. `An interpreter` — `if you would be more comfortable with one.`
8. `Payment method` — `immigration exams are typically self-pay. We quote the price before you book.`

**Right · `Vaccines USCIS may require`**  (anchor `#vaccines`)
Sub-line: `Which ones apply depends on your age and immunization history. We identify exactly what you need and write the prescription.`
Twelve chips, `display:flex; flex-wrap:wrap; gap:calc(9 * var(--h))`:
```css
.chip{border:1px solid var(--line);border-radius:999px;background:var(--void-2);
  padding:calc(9*var(--h)) calc(16*var(--h));font:500 calc(14.5*var(--h))/1 Inter;
  color:var(--ink);box-shadow:var(--shadow-sm);
  transition:border-color .25s,color .25s,transform .25s var(--ease-scroll)}
.chip:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px)}
```
`MMR (Measles, Mumps, Rubella)` · `Tdap / Td` · `Polio (IPV)` ·
`Varicella (Chickenpox)` · `Hepatitis A` · `Hepatitis B` ·
`Haemophilus influenzae type b` · `Rotavirus` · `Meningococcal` ·
`Pneumococcal` · `Seasonal Influenza` · `Titers (proof of immunity)`

Below the chips, a `--void-3` note block, `border-radius:14px`, `padding:calc(22*var(--h))`:
**`Two recent changes worth knowing.`** `Polio (IPV) was added to the CDC technical instructions for civil surgeons in May 2024. The <strong>COVID-19 vaccination requirement was removed</strong> by USCIS effective January 22, 2025 — you no longer need to document it on Form I-693.`

Full-width below both columns, an info callout (same construction as S5 but
`--accent-soft` / `--accent`, with an info-circle SVG, never `ℹ`):
H3 `Lost your vaccination records? You still have options.`
Body `This is one of the most common situations we see. Depending on your age and history we either prescribe the vaccines you need or order blood titers to prove you are already immune. Either route completes the vaccination section of your form.`

Reveal: rows `in-soft` at 70ms intervals; chips `in-pop` at 40ms intervals
(cap the total stagger at 480ms so the last chip is never late).

---

### S8 · Booking — A12 embed + A29 status card  `#book`

Eyebrow `Book Online` · H2 `Reserve your immigration exam appointment`
Lead `Pick any open time below. You will get instant confirmation by text and email, plus a reminder with your document checklist before the visit.`

`grid-template-columns: 1fr 340px; gap: calc(40 * var(--h));` — the calendar
left, the status rail right. Below 1100px the rail moves above the calendar.

**Calendar panel** — glass on light:
```css
.book-panel{background:var(--glass);backdrop-filter:blur(14px);
  border:1px solid var(--glass-line);border-radius:20px;
  min-height:700px;box-shadow:var(--shadow-lg);overflow:hidden;position:relative}
```
- Reserve the 700px **before** the widget loads — CLS < 0.1 is not negotiable.
- A skeleton shimmer fills the panel until the widget's `load`:
  `background:linear-gradient(100deg, var(--void-2) 30%, var(--void-3) 50%, var(--void-2) 70%)`,
  `background-size:220% 100%`, `animation:shimmer 1.6s linear infinite`
  (`@keyframes shimmer{to{background-position:-120% 0}}`). Killed under reduced motion.
- `loader.js` is attached **after `window.load`**, never in the head.
- **Never restyle the iframe's internals.**
- If the widget fails or is blocked, the panel keeps the fallback block already
  on the live site: heading `Live booking calendar`, body `Real-time availability, instant text and email confirmation, and an automatic reminder with the document checklist — powered by the practice's Go High Level calendar.`, the `Mon Tue Wed Thu Fri Sat` row, and the label `Connects on launch` ‹authored — confirm: replace with the live calendar ID before launch›.

**Status card (A29)** — one per page, and it must be live, not decorative:
```
glass card: background:var(--glass); backdrop-filter:blur(16px);
  border:1px solid var(--glass-line); border-radius:16px;
  padding:calc(24*var(--h)) calc(28*var(--h)); box-shadow:var(--shadow-md)
row 1: [pulse dot] + "Open now — closes 5:00 PM"  /  "Closed — opens Mon 9:00 AM"
row 2: Mon–Fri 9:00–5:00 · Sat 10:00–2:00
row 3: ghost button "Call (917) 905-8140"
```
The dot is `10px`, `background:var(--ok)` when open / `var(--dim)` when closed,
with `box-shadow:0 0 0 0 var(--ok)` pulsing to `0 0 0 8px transparent` over
2s infinite. **Green means live — keep it green in any preset.** Disabled under
reduced motion (solid dot, no pulse).

Open/closed is computed in the clinic's timezone, not the visitor's:
```js
const HOURS = {1:[9,17],2:[9,17],3:[9,17],4:[9,17],5:[9,17],6:[10,14],0:null};
const nyc  = new Date(new Date().toLocaleString('en-US',{timeZone:'America/New_York'}));
const span = HOURS[nyc.getDay()];
const hrs  = nyc.getHours() + nyc.getMinutes()/60;
const open = !!span && hrs >= span[0] && hrs < span[1];
```
Render the resting state as **`Checking…`** in markup so there is never a flash
of the wrong status, then replace it on first frame.

Under the grid, centred: `Prefer to talk to a person?` + `Call (917) 905-8140`.

---

### S9 · Your Civil Surgeon — A9 media-act  `#doctor`

`grid-template-columns: 0.9fr 1.1fr; gap: calc(56 * var(--h)); align-items:center`.

Eyebrow `Your Civil Surgeon` · H2 `Dr. Huma Irshad, MD`
Sub `Primary Care Physician · USCIS-Designated Civil Surgeon`
Body `Dr. Irshad has spent her career caring for immigrant families, and she performs every immigration medical examination personally. She understands that this form sits between you and a decision that shapes your family's future — so she takes the time to explain each requirement, answer questions without rushing, and make sure the paperwork leaves our office exactly the way USCIS expects it.`

Four credential rows, each with an 18px `--accent` check:
- `USCIS-designated civil surgeon authorized to complete and sign Form I-693`
- `Board-certified physician licensed in the State of New York`
- `Follows current CDC technical instructions for civil surgeons`
- `Every exam confidential and HIPAA-protected`

CTA: pill `Book with Dr. Irshad` → `#book`.

**Portrait column — two states.**
*With a client photo:* `border-radius:20px; box-shadow:var(--contact)`, aspect
`4/5`, `object-fit:cover`, `loading="lazy"`, explicit `width`/`height`
attributes so nothing shifts. A small badge sits at `bottom:calc(20*var(--u));
left:calc(-18*var(--h))` on `--void-2` with `box-shadow:var(--shadow-md)`:
`USCIS-Designated` / `Civil Surgeon`.
*Without one (default):* **the typographic credential card** — a `--void-2`
panel, `border-radius:20px`, `box-shadow:var(--shadow-lg)`, `aspect-ratio:4/5`,
carrying the monogram `HI` set in Instrument Serif at `calc(96 * var(--h))` in
`--accent-2`, a hairline `--line` rule, then `Dr. Huma Irshad, MD` and
`USCIS-Designated Civil Surgeon` stacked below. **No stock person, ever.**

---

### S10 · Patient Reviews — A6 proof-rotator

**One at a time, never a three-across card grid.** Full-width quoted slab on
`--void-3`, crossfading on a **6000ms** timer, with `←` `→` arrows at
`left:var(--gutter)` / `right:var(--gutter)`.

- `aria-live="polite"`, `role="group"`, each slide `aria-roledescription="quote"`.
- **Pause on hover and on focus-within.** Resume 6s after the pointer leaves.
- Crossfade: active `opacity:1; transform:translateY(0)`; inactive
  `opacity:0; transform:translateY(8px); position:absolute` so the height never jumps.
- Progress: three `height:2px; flex:1; border-radius:2px` bars — active `--ink`,
  inactive `rgba(20,18,16,.2)`. Bars, not dots. Clickable.
- **Reduced motion:** show quote 1, no timer, bars clickable.

Quote mark: Instrument Serif `"` at `calc(120 * var(--h))`, `--seal-soft`,
absolutely positioned `top:calc(-30*var(--u)); left:calc(-14*var(--h))`, `z-index:-1`.

| quote | name | place | tag |
|---|---|---|---|
| `Dr. Irshad and her team are phenomenal. I came in for my immigration physical and was seen within 20 minutes. Professional, thorough, and genuinely caring.` | `Maria S.` | `Manhattan, NY` | `Immigration Physical` |
| `I had lost my childhood vaccination records and thought it would be a nightmare. They ordered titers instead, told me exactly where to go, and my sealed form was ready that same week.` | `Joseph A.` | `Queens, NY` | `I-693 Exam` |
| `Clear pricing, no surprise bills, and they explained every part of the form. The appointment took about an hour and I left knowing exactly what to do next.` | `Rina P.` | `Brooklyn, NY` | `Green Card Exam` |

> These three are carried over from the client's live site, not generated.
> **If the client cannot point to the real source of each review, cut this entire
> section** — see §12b.

---

### S11 · Who We Serve

Eyebrow `Who We Serve` · H2 `Applicants from across all five boroughs`
Lead `You do not need to be an existing patient and you do not need a referral. Applicants travel in from across the metro area because the exam itself takes a single appointment.`

Twelve area chips (same `.chip` construction as S7):
`Manhattan` `Brooklyn` `Queens` `The Bronx` `Staten Island` `Jersey City`
`Hoboken` `Newark` `Yonkers` `Westchester` `Long Island` `New Jersey`

Below them, four accented affordance rows, `--accent` check + label:
`Interpreters welcome` · `Family appointments` · `Adults & children` ·
`Evening & Saturday slots`

---

### S12 · FAQ — A8 accordion  `#faq`

Eyebrow `Questions` · H2 `Immigration exam FAQ`
Lead `The questions applicants ask us most often, answered plainly.`

Native `<details>` / `<summary>`, 1px `--line` divider between each,
`max-width:calc(880 * var(--h))`, centred.
```css
details{border-bottom:1px solid var(--line)}
summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;
  align-items:center;gap:calc(20*var(--h));padding:calc(26*var(--h)) 0;
  font:700 calc(19*var(--h))/1.35 Manrope;color:var(--ink)}
summary::-webkit-details-marker{display:none}
summary .g{flex:0 0 auto;width:22px;height:22px;position:relative}
summary .g::before,summary .g::after{content:"";position:absolute;background:var(--accent);
  border-radius:1px;transition:transform .38s var(--ease-scroll)}
summary .g::before{inset:10px 0 auto 0;height:2px}
summary .g::after {inset:0 10px auto auto;width:2px;height:22px}
details[open] summary .g::after{transform:rotate(90deg);opacity:0}
.ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .38s var(--ease-scroll)}
details[open] .ans{grid-template-rows:1fr}
.ans>div{overflow:hidden}
```
`summary:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:6px}`.

All **thirteen** Q&As carry over verbatim from the live site, in the same order:
`What exactly is Form I-693?` · `Is Dr. Irshad a USCIS-designated civil surgeon?` ·
`How long does the appointment take?` · `Do I need a TB skin test or a blood test?` ·
`Which vaccinations does USCIS require?` · `What if I have lost my vaccination records?` ·
`Does my completed Form I-693 expire?` · `Which edition of the form should I bring?` ·
`Can I open the sealed envelope?` · `Does insurance cover the immigration physical?` ·
`Do you serve applicants from outside Manhattan?` ·
`Do I need to be an existing patient or have a referral?` ·
`Can my whole family be seen on the same day?`

**Emit the `FAQPage` JSON-LD from the same source array that renders the visible
accordion**, so the two can never drift.

---

### S13 · Find Us  `#location`

Eyebrow `Find Us` · H2 `Our Manhattan location`
Lead `Convenient to multiple subway lines. Full directions and transit details are confirmed when you book.`

`grid-template-columns: 420px 1fr; gap: calc(40 * var(--h))`. Left column is four
labelled rows (not cards), 1px `--line-2` dividers: `Address` / `Phone` / `Hours`
/ `Booking → Reserve a time →`. Right column is the map iframe,
`aspect-ratio:16/10`, `border-radius:18px`, `box-shadow:var(--shadow-md)`,
`loading="lazy"`, `title="Map to NY MedCare, Manhattan, NY"`,
`referrerpolicy="no-referrer-when-downgrade"`. Reserve its box before load.

---

### S14 · Final CTA — A11, and the signature move

**Wide and empty. Negative space is the whole point — do not fill it.**
`min-height:calc(760 * var(--u))`, `display:grid; place-items:center; text-align:center`.
This is where the camera reaches its C7 pull-back and `--gl-op` climbs back to
`.60`, so the ECG trace is visible and distant behind the type.

H2 `Get your I-693 done right the <em>first time</em>`
Lead `One exam appointment. Every order written for you. A USCIS-designated civil surgeon who has walked hundreds of applicants through this exact form.`
Primary `Book Your Exam` → `#book` · Secondary `Call (917) 905-8140` → `tel:`

**The seal** — 132px SVG above the H2, `color:var(--seal)`:
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
1. **Draw.** Both `.ring` circles get `stroke-dasharray:var(--len)` (`--len` = the
   measured `getTotalLength()`, written once on load) and animate
   `stroke-dashoffset: var(--len) → 0` over **1200ms** `--ease-in`, the inner ring
   delayed **180ms**, triggered when the section hits `.is-in`.
2. **Stamp.** At **+900ms** the `.mono` path scales `1.35 → 1` with a 60ms hold at
   `1.0`, `opacity 0 → 1`, over **260ms** `cubic-bezier(.2,.9,.25,1)`, and a ring
   of `--seal-soft` pulses `scale(1) opacity(.55) → scale(1.5) opacity(0)` over **220ms**.
3. **Rotate.** `.spin{transform-origin:66px 66px; animation:sealspin 24s linear infinite}`
   — slow enough that it never competes with the CTA.

**Reduced motion:** the seal renders fully drawn, stamped and static — no draw,
no stamp, no rotation. It is a mark, not a toy.

---

## 9 · ENTRANCES

Easing: `cubic-bezier(.16,1,.3,1)` for entrances, `cubic-bezier(.22,1,.36,1)`
for scroll and hover.

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
@keyframes in-stat {from{opacity:0;transform:translateY(20px)}}
@keyframes draw    {from{stroke-dashoffset:var(--len)} to{stroke-dashoffset:0}}
```

**`.appear` resting opacity is `1`.** If the animations never run — blocked,
unsupported, a JS error, an extension — the page is complete and readable.
`animation-fill-mode:both` is what still hides an element during its delay when
animations *do* run. This combination is the whole trick; do not "simplify" it.

**Load stagger table**
| element | keyframe | `--d` | duration |
|---|---|---|---|
| brand mark | `in-scale` | .08s | 1.05s |
| nav item 1 | `in-scale` | .16s | |
| nav item 2 | `in-soft` | .24s | |
| nav item 3 | `in-scale` | .32s | |
| nav item 4 | `in-soft` | .40s | |
| nav item 5 | `in-scale` | .48s | |
| nav item 6 | `in-soft` | .56s | |
| header CTA / burger | `in-scale` | .34s | |
| hero eyebrow | `in-soft` | .30s | |
| h1 line 1 | `in-mask` | .42s | |
| h1 line 2 | `in-mask` | .62s | |
| h1 `<em>` underline | `scaleX` | .72s | 1.2s |
| lead | `in-soft` | .82s | **1.25s** |
| primary CTA | `in-btn` | .96s | |
| secondary CTA | `in-side` | 1.10s | |

Alternating `in-scale` / `in-soft` across the nav is what stops the row reading
as a mechanical sweep.

**Never blank**
- The **first rule in the stylesheet** is `html,body{background:#fbfaf7!important}`,
  and `<body style="background:#fbfaf7">` is set inline as well. On a light build
  the anti-flash colour is **white, not black** — a black flash on this page would
  be worse than no animation at all.
- Every image and embed has reserved space. **CLS < 0.1.**
- Poster before video; `<source>` attached after `window.load`.
- A reveal **never re-animates on scroll back up** — `unobserve` after firing.

---

## 10 · BREAKPOINTS

| breakpoint | overrides |
|---|---|
| `max-width:1500px` | `--gutter` → `clamp(20px,4.8vw,64px)`; S8 grid → `1fr 300px` |
| `max-width:1100px` | topbar hidden; nav → burger; S8 rail moves above the calendar; S9 and S13 → single column; mosaic → `repeat(2,1fr)` × 3 rows |
| `max-aspect-ratio:11/10` | `--m` unit engaged (§4); mosaic → 1 column, cards `min-height:230px`; hero multipliers reduced (§ S1); canvas `--gl-op` ceiling `.34`, head dot dropped, DPR cap 1.5; pointer parallax off |
| `600–900px` tablet band | S3 numerals inline; S7 → single column, checklist first; stat band → `repeat(2,1fr)` with a `--line-2` cross rule |
| `max-width:430px` | h1 `calc(40*var(--h))`; chips `font-size:calc(13.5*var(--h))`; step circles `calc(42*var(--h))`; stat band → 1 column; `--gutter:18px` |
| `(min-width:901px) and (max-height:850px)` | h1 `calc(64*var(--h))`; hero padding-bottom `calc(72*var(--u))` |
| `(min-width:901px) and (max-height:720px)` | h1 `calc(54*var(--h))`; lead `calc(17*var(--h))`; actions gap `calc(12*var(--h))` |
| `prefers-reduced-motion: reduce` | all channels frozen at `s=0`; canvas renders one frame then stops; no count-up, no rotator timer, no shimmer, no seal draw/spin, no mosaic drift; every content state reachable |

Safe-area insets on the sticky mobile CTA and the footer:
`padding-bottom:calc(14px + env(safe-area-inset-bottom))`.

---

## 11 · ACCESSIBILITY & SEO

- **One `<h1>`.** Every other heading descends in order with no level skipped.
- Skip link first in `<body>`: `.skip{position:absolute;left:-9999px}`,
  `.skip:focus{left:var(--gutter);top:12px;z-index:90;…}`.
- `canvas#gl` — `aria-hidden="true"`, `pointer-events:none`. **The canvas must
  never capture pointer events.**
- Focus rings everywhere: `:focus-visible{outline:2px solid var(--accent);
  outline-offset:3px;border-radius:4px}`. **Never `outline:none` without a
  replacement.**
- Contrast targets: body `--muted` on `--void` ≥ 7:1; `--accent` on `--void`
  5.85:1; `--accent-2` **large text and decoration only** (3.28:1).
- Touch targets ≥ 44×44px, including chips and accordion summaries.
- `prefers-reduced-motion` honoured by every section (§10).
- The accordion uses native `<details>` — keyboard and screen-reader behaviour
  comes free; do not re-implement it in JS.
- Language: `<html lang="en">`. Many readers are non-native English speakers —
  keep line length ≤ 72 characters in body copy and never justify text.

**JSON-LD** — emit as one `<script type="application/ld+json">` graph:
| type | notes |
|---|---|
| `MedicalClinic` | `@id`, name, description, url, telephone, `image`, `PostalAddress`, `GeoCoordinates`, `openingHoursSpecification`, `medicalSpecialty:"PrimaryCare"`, `priceRange:"$$"`, `areaServed[]`, `employee` → `Physician` (Dr. Huma Irshad), `availableService` → `MedicalTest` (Form I-693, `usesDevice: IGRA`), `sameAs[]` |
| `FAQPage` | generated from the S12 source array — never hand-written twice |
| `HowTo` | `totalTime:"PT90M"`, five steps mirroring S6 |
| `MedicalWebPage` | `about` → the `MedicalTest`, `lastReviewed`, `specialty` |
| `Organization` | name, url, logo, telephone, address, `sameAs[]` |
| ~~`AggregateRating`~~ | **do not emit** unless the client confirms a real, verifiable source — see §12b |

`sitemap.xml` listing `/`, `/privacy-policy`, `/terms`; `robots.txt` pointing at it.
Favicon + OG image on all three pages.

---

## 12 · ACCEPTANCE CRITERIA

**Content**
1. Every string in §8 appears on the page **verbatim**. No rewording, no
   synonyms, no "improved" phrasing.
2. Exactly one `<h1>`. No colon in it.
3. All 13 FAQs render, and the `FAQPage` JSON-LD is generated from the same array.
4. No emoji anywhere in the built page — all six mosaic icons and both callout
   glyphs are inline SVG.
5. No `AggregateRating` in the emitted schema.
6. The doctor section contains either a client-supplied photo or the typographic
   credential card. No stock person, no generated face.

**Motion — as an ordered scrub narrative**
7. Scrubbing **0 → 620px**: eyebrow/h1/lead rise 190px, scale to 0.93, fade to 0;
   actions sink 86px and fade to 0; veil reaches 0.55; `--gl-op` falls .55 → .16.
   At 620px the hero is gone and the stat band owns the viewport.
8. The PulseLine head completes **one traverse per 2.4 seconds**, with the R spike
   visibly sharper than the P and T waves.
9. The process spine fill reaches 100% exactly as step 5 crosses 72% viewport height.
10. The mosaic's shared background drifts ±12px across **all six windows together** —
    proving it is one photograph, not six.
11. At the final CTA the camera reaches `(0, 0.62, 12.80)` fov 42, `--gl-op` .60,
    and the seal draws (1200ms) then stamps (+900ms).
12. No reveal re-animates on scroll back up.

**Engineering**
13. `assets/core.css`, `assets/engine.js`, `assets/gl.js`, `assets/nav.js` are
    byte-identical to the skill's copies.
14. No GSAP, ScrollTrigger, Lenis, Locomotive, AOS, or any animation library.
15. No loaded 3D models. All geometry procedural. One rAF loop, one WebGL context,
    ≤ 3 draw calls, on-demand rendering.
16. **No `overflow-x:hidden` on any ancestor of a sticky rig** — `clip` only.
    Verified by scrolling the whole page with the header stuck.
17. All three tiers ship and were each viewed: full, `html.no-gl`,
    `prefers-reduced-motion`.
18. CLS < 0.1. Every image and both iframes have reserved boxes.
19. No image over 200KB. Generated images downscaled to ~1200px WebP.
20. Lighthouse: Performance ≥ 90 mobile, Accessibility 100, Best Practices ≥ 95, SEO 100.
21. Viewed at **1512×1024**, **1280×720** and **390×844**. Nothing clips, nothing
    overflows horizontally, the CTAs are visible without scrolling at 1440×720.
22. GA4 `G-GFF61XS9JJ` fires, and the GoHighLevel calendar loads and accepts a
    test booking.

**BANNED — every one is a build failure**
- A card grid as the primary composition (the A16 mosaic is *not* this).
- Glowing orbs, blurred blob gradients, mesh-gradient wallpaper.
- Emoji, stock illustration, lorem, invented copy where real copy exists.
- Gradient text fills on headings — solid accent + the drawn underline only.
- A `<canvas>` that captures pointer events.
- `outline:none` without a replacement focus ring.
- Grey placeholders, `placehold.co`, `picsum`, scraped Google Images.
- A dark vignette on this light page.
- Re-animating a reveal on scroll back up.

---

## 12b · FACTS TO CONFIRM  ← read this block before launch

| # | item | status |
|---|---|---|
| 1 | **`ADDRESS_TBD` / `ZIP_TBD`** — the street address is a placeholder in the live site's markup *and* in its schema. It appears in the topbar, the footer, S13, the map URL and the `PostalAddress`. | **blocks launch** |
| 2 | **Geo `40.7831, -73.9712`** is the centroid of the Upper West Side, not the practice. Replace with the real coordinates. | blocks launch |
| 3 | **`AggregateRating 4.9 / 120 reviews`** on the live site. I have **cut it from the schema and from the stat band.** Restore it only if it comes from a real, verifiable profile — fabricated rating markup gets sites penalised by Google. | **cut pending proof** |
| 4 | **The three testimonials** (Maria S., Joseph A., Rina P.) carry over from the live site. If the client cannot point to their real source, **cut section S10 entirely.** | confirm or cut |
| 5 | **All four social links point at "Medcare Clinic Danbury" (Connecticut)** — Facebook, Instagram, Yelp and TikTok. Either these belong to a different practice, or the Manhattan clinic needs its own profiles. They are also in `sameAs[]`, which tells Google the two businesses are the same entity. | **likely wrong** |
| 6 | **Hours** Mon–Fri 9:00–5:00, Sat 10:00–2:00 — the live status card computes from these. | confirm |
| 7 | **Self-pay price** — the copy says "we quote the price before you book" and gives no number. Add one if the client wants it. | optional |
| 8 | **Booking calendar ID** — the GoHighLevel widget currently says "Connects on launch". Needs the real calendar ID. | blocks launch |
| 9 | **Dr. Irshad's portrait** — needed, or S9 ships as the typographic card. | supply |
| 10 | The footer disclaimer *"NY MedCare is not affiliated with U.S. Citizenship and Immigration Services. We do not provide legal advice."* is **‹authored›** — have it approved. | authored |
| 11 | Every regulatory date in the copy (01/20/2025 form edition · July 3, 2025 · May 2024 polio · January 22, 2025 COVID removal · June 11, 2025 validity guidance) comes from the client's existing page. **Re-verify against uscis.gov before launch** — USCIS has revised this guidance more than once. | verify |

---

## 13 · BUILD ORDER

```
core.css tokens → chrome + footer → engine.js + nav.js → gl.js + PulseLine →
S1 hero → S2…S14 in order → mobile pass → a11y pass → perf pass → ship
```
Report each step as done. Then run §12 in full and report any failure with the
actual output — never claim a criterion passed without checking it.

**Deploy:** static files, no build step, no build config. Drag the folder into
Cloudflare Pages (same project as today) or Netlify. `sitemap.xml`, `robots.txt`,
favicon and OG tags ship with it.

**State plainly at handover:** the booking calendar is a third-party GoHighLevel
embed, the map is a Google iframe, and there is no backend — nothing on this page
stores patient data.

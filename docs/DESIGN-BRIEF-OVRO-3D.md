# Expert build brief — Ovro-grade WebGL portfolio

> This is the expanded, execution-ready version of the original prompt. It resolves the
> contradictions in that prompt against the actual Ovro source, fixes the parts that were
> under-specified, and states what must **not** change.

---

## 0. Role

Act as a **Creative Frontend Developer + WebGL Engineer + UI/UX Designer**. Build an
Awwwards-calibre personal portfolio for **Eng. Emmanuel Bahindi** that replicates the
Ovro template's layout language and adds interactive 3D that Ovro itself does not have.

The bar: a conference organiser opening the link on a phone from WhatsApp should
immediately read *"this person is serious about AI"* — and a hiring engineer opening it on
a laptop should read *"this person can build."*

---

## 1. Conflicts in the original prompt, and how they are resolved

The original prompt specified a generic aesthetic **and** "strictly replicate Ovro." Those
are not the same thing. Ovro wins wherever they disagree, because replication was the
strict instruction.

| Original prompt said | Ovro actually is | Resolution |
|---|---|---|
| Base `#0B0B0F` (near-black) | `#061D1E` **deep teal** | **Use Ovro's teal.** |
| Electric purple + cyan neon | `#FFAE00` **amber/gold**, single accent | **Amber only.** No purple, no cyan. |
| (unstated) | Figtree body + **Playfair Display italic** accent | Adopt both. |
| "Bento grid structure" | Ovro uses a **sticky rail + scroll column**, not a bento | Keep Ovro's shell; use bento **inside** the Skills section only. |
| Framer Motion **or** GSAP | Ovro ships GSAP + AOS | Use **Framer Motion**; it composes with React Three Fiber and replaces AOS cleanly. |
| React **or** Next.js | Ovro is Angular 19 | **Next.js App Router**, per the hard requirement. Convert everything. |

**Two further facts discovered in the source, which change the plan:**

1. The Angular package at `Ovro-Angular_v1.1.0/Ovro/src/app/views/` has **empty index
   templates** — `index.component.html` is 0 bytes. The Angular build is an incomplete
   port. The authoritative structure is the **live page**, not the package. The package is
   still useful for `public/assets/scss/utils/_colors.scss` (tokens) and image assets.
2. Ovro has **no WebGL at all**. It is Bootstrap 5 + AOS + GSAP + parallax. So the 3D work
   is a genuine addition, not a replication — it must be designed to sit inside Ovro's
   visual language rather than fight it.

---

## 2. Non-negotiable: the content does not change

This is a real person's site, not a template demo. **Do not invent facts.** No "Alex
Carry", no "10 years of experience", no "2k+ reviews (4.90 of 5)", no fake client logos,
no stock testimonials.

Everything renders from `content/site.ts`. That file is the single source of truth and its
shape must survive the redesign. The positioning established previously stands:

> **"I build software with AI every single day — and I teach a continent to do the same."**

Sections that exist in Ovro but have **no real content** must be **dropped**, not filled
with placeholders. Specifically: **Testimonials** and **Blog** are cut — he has neither.
Ovro's "reviews 4.90 of 5" cluster is cut for the same reason.

Speaking is *added* to the rail, because it is the primary audience's reason to be there.

---

## 3. Design system

Ported from `Ovro/public/assets/scss/utils/_colors.scss`:

```
--teal-900  #061D1E   page ground (Ovro 'bg-1')
--teal-800  #0A2526   raised panel
--teal-700  #1F3434   card / hover ground (Ovro 'bg3')
--amber     #FFAE00   the single accent (Ovro 'btn-bg1')
--amber-2   #FAB41D   gradient partner (Ovro 'btn-bg2')
--ink       #0E161F   text on amber (Ovro 'btn-text1')
--white     #FFFFFF
--line      rgba(255,255,255,0.20)
--line-soft rgba(255,255,255,0.10)
--glass     rgba(255,255,255,0.10)
```

**No other accent colours.** One accent is what makes the amber read as deliberate.

**Type** — both already loaded by Ovro:
- **Figtree** (300–900) — body, UI, headings.
- **Playfair Display italic** — *the accent word only*. This is Ovro's signature move: a
  huge Figtree headline with one word set in italic amber Playfair, underlined.

**Contrast:** amber `#FFAE00` on teal `#061D1E` is ~9.9:1 — passes AA and AAA. Amber text
must never sit on white; on a light ground use `#B87A00` or darker.

---

## 4. Layout shell — replicate this exactly

Ovro's defining structure, confirmed from the live DOM:

```
┌────────────────────────────────────────────────────────┐
│  sticky header: logo · theme toggle · HIRE ME · menu   │
├──────────────┬─────────────────────────────────────────┤
│ STICKY LEFT  │  SCROLLING RIGHT COLUMN                 │
│ (col-lg-4)   │  (col-lg-8, scrollspy target)           │
│              │                                         │
│ ┌──┐ icon    │   Hero  (3D canvas lives here)          │
│ │  │ rail    │   About                                 │
│ └──┘ scroll- │   AI Media Lab                          │
│      spy     │   Speaking                              │
│              │   Work                                  │
│ profile card │   Skills  ← bento grid + 3D widget      │
│  · portrait  │   Contact                               │
│  · name      │                                         │
│  · bio       │                                         │
│  · socials   │                                         │
│  · CTA       │                                         │
└──────────────┴─────────────────────────────────────────┘
```

**Left rail** — icon-only strip, ~64px squares, rounded, `--teal-700` ground. The active
item fills amber. Labels expand on hover. It is a **scrollspy**: the active item tracks the
section in view. Build this with `IntersectionObserver`, not a scroll-position calculation.

**Profile card** — `position: sticky`, portrait, name, one-line bio, social circles,
amber "Download Résumé" pill, copyright line.

**Mobile (< 1024px):** the rail and card are **not** sticky. The card moves inline under
the hero; the rail becomes the mobile menu contents. Never render a 64px icon rail on a
360px screen.

---

## 5. The 3D work

### 5.1 Stack

```
three  @react-three/fiber  @react-three/drei  framer-motion
```

### 5.2 Hero object

A **morphing glassmorphic blob** — an icosahedron with a distortion material, lit so the
amber reads as the light source against the teal ground. It stands for the model: fluid,
responsive, always shifting.

- **Idle:** slow float + slow rotation on a loop.
- **Pointer:** eased parallax tracking. Damp toward the target — never snap to raw pointer
  values.
- **Click:** the surface distortion spikes and settles — a visible "scatter" reaction.
- Wire distortion speed to the same clock as the hero's typing animation so the object
  visibly *reacts* to each predicted word. This is the concept that ties the 3D to the
  positioning instead of leaving it decorative.

### 5.3 Skills bento widget

One bento cell holds a small second canvas: a slowly rotating **wireframe icosahedron**,
amber lines on teal. Lower poly, no lights, no shadows.

### 5.4 Performance — mandatory, this is where WebGL portfolios die

The previous build measured **Lighthouse mobile 94**. WebGL must not destroy that.

- `dpr={[1, 1.5]}` — never uncapped on mobile.
- `shadows` **off**. Ambient + two directional lights only.
- `frameloop="demand"` where the scene is static; the hero uses `"always"` but pauses when
  off-screen.
- **Do not render any canvas until it is in the viewport.** Gate on `IntersectionObserver`.
- `<Suspense>` with a drei `<Html>` loader — an amber ring on teal, matching the theme.
- **`next/dynamic` with `ssr: false`** for every canvas. R3F cannot server-render, and the
  three bundle must stay out of the initial JS.
- Respect `prefers-reduced-motion`: no float, no auto-rotation, no distortion animation.
  Render a still frame.
- **Full no-WebGL fallback.** If the context fails or the device is low-end, render the
  existing portrait treatment. The hero must never be an empty box.

### 5.5 Magnetic cursor

Custom cursor that eases toward the pointer and grows/snaps over interactive elements.
**Desktop pointer devices only** — gate on `(pointer: fine)`. Never ship a custom cursor to
touch devices, and never hide the native cursor without a replacement being visible.

---

## 6. Motion

- Section entrances: fade + rise, staggered, via Framer Motion `whileInView`.
- Project cards: scroll-driven tilt and scale.
- Kinetic hero headline: per-word rise on load.
- Everything obeys `prefers-reduced-motion`.
- The existing progressive-enhancement rule stands: **if JS never runs, all content is
  visible.** Hidden-by-default states stay scoped to a `.js` class set before first paint.

---

## 7. Quality gates — the build is not done until these pass

| Gate | Target |
|---|---|
| Lighthouse mobile — Performance | ≥ 90 |
| Lighthouse mobile — A11y / Best practices / SEO | 100 |
| `npm audit` | 0 vulnerabilities |
| Build + ESLint | zero warnings |
| Horizontal scroll at 360 / 768 / 1280 | none |
| No-JS render | all content visible |
| No-WebGL render | hero still complete |
| Keyboard | rail, menu, cards, CTAs all reachable, visible focus ring |

Accessibility specifics: the canvas is decorative → `aria-hidden`. The rail is a `<nav>`
with `aria-current` on the active item. Every icon-only control needs an accessible name.

---

## 8. Deliverable

Modular architecture, one component per section, all content in `content/site.ts`, 3D
isolated under `components/three/` so it can be removed without touching the page.

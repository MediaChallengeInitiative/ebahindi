# Expert build brief — compact media cards + Pubity card language

> Execution-ready brief for the third change request. Lands on `ovro-3d` (PR #2).
> Layout shell, 3D and content from the two earlier briefs are unchanged.

---

## 0. Role

Act as a **UI Engineer + Visual Designer**. Two jobs:

1. **Cut the height of the embedded TikTok cards.** A 9:16 frame is far too tall to scan —
   at 400px wide it is 711px, taller than most phone viewports. Make them compact and
   fully responsive.
2. **Adopt the card language of [pubitygroup.com](https://www.pubitygroup.com/)** — its
   shape, fill, border and shadow effect — across the site's cards.

Existing gates still bind: Lighthouse mobile **Performance ≥ 90**, **A11y / Best-practices
/ SEO = 100**, zero build/lint warnings, no horizontal scroll at 360/768/1280, and full
function with **no JS** and **no WebGL**.

---

## 1. What Pubity actually is

Measured from the live page's own CSS and rendered output, not guessed:

| Token | Value |
|---|---|
| Ground | `#282828` / `#1E1E1E` charcoal |
| Accent | **`#FFEB00`** electric yellow |
| Secondary accent | `#D10DFF` magenta |
| Card radius | **`23px`** |
| Signature shadow | **`0px -13px 20px rgb(255,235,0)`** — a coloured bloom |
| Type | Montserrat, heavy, **uppercase** |

The defining card — the phone mock in "Trending now" — is:

```
dark fill
+ thick yellow border (~5px)
+ chunky ~24px radius
+ a HARD, UN-BLURRED yellow shadow offset down-and-right
```

That hard offset block is the whole effect. It is a sticker/neo-brutalist treatment: no
soft drop shadow, no gradient — a solid slab of accent colour sitting behind the card.
The circular brand badges are the same idea in a circle: thick yellow ring, solid fill.

### The palette conflict, resolved

Pubity is **yellow on charcoal**. This site is **amber `#FFAE00` on teal `#061D1E`**,
ported from Ovro in PR #2.

**Adopt the treatment, keep our palette.** The request names "design, look, shape, fill and
effect" — the card construction, not a recolour. Amber and Pubity's yellow are the same
warm family, so the translation is direct and the site stays coherent with the OG image,
favicon, rail and buttons already shipped. Swapping in `#FFEB00` and charcoal would undo
PR #2 for one section's benefit.

If the literal Pubity palette is wanted instead, it is four token values in
`tailwind.config.ts` — say so and it is a five-minute change.

---

## 2. Card system to build

One reusable treatment, two weights.

### `.card-pop` — interactive cards (media facades, project cards, talk cards)

```
background: teal-800
border: 3px solid amber
border-radius: 22px
box-shadow: 8px 9px 0 0 amber        /* hard, zero blur — the Pubity move */
```

**Hover/focus:** translate the card `+3px, +3px` and shrink the shadow to `5px 6px 0` —
the card visibly presses into its own shadow. Transition `transform` and `box-shadow`
only, ~200ms. **Never animate `box-shadow` spread on a large surface without
`will-change`** — but here the offset change is cheap and the surfaces are small.

**Active/pressed:** translate `+8px, +9px`, shadow `0 0 0` — fully seated.

### `.card-quiet` — static information cards (about, skills, stats)

Same radius and fill, but a **1px `line-soft` border** and **no hard shadow**. A wall of
amber slabs would be exhausting and would flatten the hierarchy that makes the media cards
read as the clickable things. Pubity itself reserves the heavy treatment for its hero
objects and brand badges, not for body panels.

### Labels

Pubity's labels are heavy uppercase. The site already has `.label` (11px, bold, uppercase,
wide tracking, amber). Reuse it — no new type styles.

### Accessibility

- The 3px amber border must not become the *only* affordance: keep the existing focus ring
  behaviour, and make sure `:focus-visible` is still clearly distinguishable from hover.
- Hard shadows are decorative; they must not carry meaning.
- Respect `prefers-reduced-motion`: no press transform, just an instant state change.

---

## 3. Media card heights — the actual fix

Current: `aspect-[9/16]` for TikTok. At a 400px column that is **711px tall**. Two of them
stacked on a phone is a wall.

**Replace aspect-ratio with explicit, clamped heights.** Aspect ratios tie height to
column width, which is exactly what goes wrong in a two-column grid on a wide screen.

| State | Height |
|---|---|
| TikTok facade (poster) | `clamp(240px, 44vw, 360px)` |
| TikTok active (embed) | `clamp(420px, 76vw, 600px)` |
| YouTube facade & embed | keep `aspect-video` (16:9 is already compact) |

Rationale:

- **The facade is a poster, not a video.** It only has to be legible enough to identify the
  episode and be clicked. Cropping the vertical frame to a compact landscape-ish card is
  the right trade — `object-cover` with a top-biased focal point keeps faces in frame.
- **The embed grows on play.** A user-initiated size change is expected and unsurprising;
  an unplayably short video is not. TikTok's player needs real height to be usable.
- `clamp()` makes both fully fluid with **no breakpoint jumps** — one rule covers 360px to
  1440px.
- The two cards stay in a `sm:grid-cols-2` grid; below `sm` they stack at full width rather
  than being capped at 320px, since the card is no longer tall enough to need it.

---

## 4. Deliverable

- New card utilities in `app/globals.css`, tokens in `tailwind.config.ts` if needed.
- `MediaFacade` takes the height from props/variant rather than hard-coding an aspect.
- Apply `.card-pop` to media facades, project cards and talk cards; `.card-quiet` to about,
  skills and stat cells.
- No content changes. `content/site.ts` is untouched except where a variant needs declaring.
- Re-verify every gate, and re-check 360/768/1280 for overflow after the border and shadow
  are added — a 3px border plus a 9px shadow offset **adds 12px to a card's outer box**,
  which is a real overflow risk inside a grid.

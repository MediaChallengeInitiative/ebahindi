# ebahindi.vercel.app

Personal site of **Eng. Emmanuel Bahindi** — Software Engineer, AI Practitioner, and
Speaker on AI & Technology in Africa.

The site exists to answer one question for a conference organiser skimming a link on
their phone: *who is this, and can he speak at my event?* Everything on the page is
arranged around the statement **"I build software with AI every single day — and I teach
a continent to do the same."**

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 |
| Type | Figtree (sans) + Playfair Display italic (accent), via `next/font` |
| 3D | three.js + React Three Fiber + drei (desktop only) |
| Motion | Framer Motion |
| Hosting | Vercel |

The whole page is statically prerendered — including the Open Graph image, the favicon,
`sitemap.xml` and `robots.txt`.

## Running locally

```bash
nvm use 22          # Next 16 needs Node >= 20
npm install
npm run dev         # http://localhost:3000
```

```bash
npm run build       # production build
npx next start      # serve the build
npx eslint .        # lint
```

## Project shape

```
app/
  layout.tsx            metadata, fonts, JSON-LD, skip link
  page.tsx              section order
  opengraph-image.tsx   generated 1200×630 link preview
  icon.tsx              generated favicon from the EB monogram
  sitemap.ts robots.ts
  fonts/                static Figtree + Playfair TTFs (OG image only)
components/             one component per section
  three/                canvas gate, hero blob, bento widget
content/site.ts         ← all copy, links and data
public/portrait.jpg                  studio portrait
public/ai-media-lab-tot-cover.jpg    poster for the ToT video
public/emmanuel-bahindi-resume-2026.pdf
```

### Editing content

**`content/site.ts` is the single source of content.** Copy, project links, talks,
skills, contact details and nav all live there. Adding a project or a talk is a data
edit — no component needs touching.

---

## ⚠️ Needs Emmanuel's action

These are the things I could not do from the repo. Nothing here blocks the site from
running; each one improves it.

### 1. Two `www.` subdomains do not resolve

`www.awards.mciug.org` and `www.catalyst.mciug.org` both fail to resolve. The apex forms
work, so the site links to those instead:

- `https://awards.mciug.org` ✅
- `https://catalyst.mciug.org` ✅

If the `www.` variants should work, that is a DNS record to add on the MCI side. Nothing
needs to change in this repo either way.

### 2. `nalawquizzes.org` — removed

The domain returns **NXDOMAIN** and has most likely expired. NALAW Quizzes has now been
**removed from the site entirely**, on instruction. Nothing is outstanding.

The `unreachable: true` flag on the `Project` type is still supported — it renders a
dimmed, unlinked card — so it remains the right mechanism if another client domain lapses.

### 3. No Vercel environment variables are needed

The contact path is a `mailto:` link, so there is nothing to configure — no Formspree
key, no API token, no env vars at all. See below.

---

## Why there is no contact form

The previous site had one. It did nothing: `submitHandler` validated the fields, cleared
them, and returned. No `fetch`, no API route, no mail service. Every enquiry submitted
through that form was silently discarded.

Rather than replace one form with another, the contact section uses **`mailto:` links**:

- The two "Invite me to speak" buttons open a **prefilled** email — subject line plus a
  short template for event, date, format, audience and topic.
- Email and phone are plain `mailto:` / `tel:` links.

This cannot silently fail, needs no third-party service or key, and drops the enquiry
straight into the inbox. If a real form is wanted later, a Formspree endpoint can replace
the mailto in `components/Contact.tsx` — but it should be tested end to end before it
ships.

---

## Design system

Ported from the Ovro template's own `_colors.scss` — see
[`docs/DESIGN-BRIEF-OVRO-3D.md`](docs/DESIGN-BRIEF-OVRO-3D.md).

| Token | Value | Use |
|---|---|---|
| Teal 900 | `#061D1E` | Page ground |
| Teal 800 | `#0A2526` | Raised panels |
| Teal 700 | `#1F3434` | Cards |
| Amber | `#FFAE00` | The single accent |
| Ink | `#0E161F` | Text on amber |

**One accent colour only** — that is what makes the amber read as deliberate. Headlines
are heavy Figtree with one word set in **italic amber Playfair Display**, underlined:
Ovro's signature move. There are no skill percentage bars, no satisfaction counters, and
no stock tool icons — see `AUDIT.md` for what was removed and why.

### Layout

Ovro's shell: a sticky icon rail and identity card on the left, everything else scrolling
on the right. The rail is an `IntersectionObserver` scrollspy rather than scroll-offset
maths, because offsets go stale on resize and font swap. Below `lg` both collapse into an
ordinary stack and the rail's contents become the header menu.

### 3D — desktop only, deliberately

The hero holds a morphing gold-glass icosahedron; the skills bento holds a small amber
wireframe. Both are gated to `(min-width: 1024px) and (pointer: fine)`.

The primary audience opens this link from WhatsApp on a phone, and three.js costs ~150 KB
gzipped plus shader compilation — for decoration on a 320 px circle. **Phones get the
portrait instead**, which is faster *and* more informative. On desktop the canvas mounts
only when in view **and only at idle**, so it never competes with first paint. That took
mobile TBT from 4,980 ms to ~190 ms.

Everything degrades: no WebGL → portrait; no JS → portrait and all content visible.

### Motion

Sections fade and slide in on scroll via a single root-level `IntersectionObserver`
(`components/Reveal.tsx`), which keeps every section a server component. The hero has one
animated element: a typing "next word prediction" strip that visualises how a language
model extends a sentence.

Motion is progressively enhanced in both directions:

- The hidden starting state is scoped to a `.js` class set by an inline script before
  first paint. **If JavaScript never runs, every section renders plainly visible** rather
  than staying invisible forever.
- `prefers-reduced-motion: reduce` disables the reveals, the typing animation, the card
  tilts, the floating hero object and the custom cursor.

### Media embeds

All three recordings play **on the site** — the YouTube highlight video and both TikTok
podcast appearances — through a shared click-to-load facade (`components/MediaFacade.tsx`).
Nothing third-party loads until the visitor presses play, which is what keeps three
embeds on one page off the performance budget.

**Every card carries a real cover image**, and all of them are **vendored locally**:

| Card | Poster |
|---|---|
| AI Media Lab ToT | `ai-media-lab-tot-cover.jpg` — a photo from the Lab |
| The Rest of Us | `tiktok-rest-of-us-cover.jpg` — the episode's own frame |
| Switch Africa | `tiktok-switch-africa-cover.jpg` — the episode's own cover graphic |

The TikTok frames came from TikTok's oEmbed endpoint but are **downloaded, not
hotlinked**: those thumbnail URLs are signed and time-limited (`x-expires=…`), so linking
them directly would leave blank cards the moment they lapse. To refresh one, re-fetch
`https://www.tiktok.com/oembed?url=<video url>`, download `thumbnail_url`, and replace the
file in `public/`.

The Rotary Club talk has no recording, so it stays a text card rather than a play button
that goes nowhere.

### Card system

Adapted from [pubitygroup.com](https://www.pubitygroup.com/) — see
[`docs/CARD-SYSTEM-BRIEF.md`](docs/CARD-SYSTEM-BRIEF.md). Two weights:

- **`.card-pop`** — interactive cards (media facades, project cards). Chunky 22px radius,
  3px accent border, and a **hard, un-blurred slab of accent colour** offset 8px/9px behind
  the card. On hover the card translates into its own shadow; on press it seats fully.
  That offset slab is Pubity's signature move.
- **`.card-quiet`** — static information cards (about, skills, stats, the Rotary talk).
  Same radius, 1px hairline border, no slab. A wall of amber slabs would flatten the
  hierarchy that makes the interactive cards read as clickable.

Pubity does this in `#FFEB00` on charcoal; it is rendered here in the site's existing
amber on teal so the OG image, favicon, rail and buttons stay coherent. Switching to the
literal Pubity palette is four token values in `tailwind.config.ts`.

### Media card sizing

TikTok embeds are vertical, and a raw `9:16` frame made the cards ~711px tall — taller
than most phone viewports.

The ratio in use is **measured, not guessed**. Rendering TikTok's own embed at a 420px card
width and scanning down the centre column, the video area ends at **y = 575**, where the
caption/comments block begins. `575 / 420 = 1.369`, so the frame is `aspect-[420/575]` —
the tallest the card can be while showing the whole video, faces included, and nothing
below it.

| | Rule | @360px | @768px | @1280px |
|---|---|---|---|---|
| TikTok card | `aspect-[420/575] max-h-[620px]` | 320x438 | 344x471 | 343x470 |
| YouTube | `aspect-video` | - | - | - |

**One frame serves both states, so pressing play causes zero layout shift.** Measured at
all three widths: height delta `0`, document-height delta `0`, no horizontal overflow.

Each poster can override its crop focal point (`posterPosition`) — the Switch Africa cover
is text-heavy and needed framing higher so its headline is not cut mid-word.

### Project preview cards

The work cards are **drawn, not fetched**. A build-time screenshot pipeline would put a
headless browser in the build and leave broken tiles whenever a client site moves,
expires or blocks the crawler — which is exactly what happened to `nalawquizzes.org`.
Instead each card derives a stable hue and a two-letter mark from its domain, so every
tile always renders and the grid reads as one system.

---

## Accessibility & performance

Verified against a production build with Lighthouse (mobile emulation):

| Category | Score |
|---|---|
| Performance | **92** (median; local machine noise gives an 89–96 spread) |
| Accessibility | **100** |
| Best practices | **100** |
| SEO | **100** |

- Semantic landmarks, a skip link, labelled sections, real `alt` text everywhere,
  keyboard navigable with a visible focus ring on both light and dark grounds.
- `npm audit` reports **0 vulnerabilities**.
- All three media embeds use a **facade** over a real, locally-hosted poster: nothing
  third-party loads until play is pressed.
- No horizontal scroll at 360 / 768 / 1280 px.

Layout was tested at all three widths in a real browser. Cumulative Layout Shift is 0.

---

## Link check

Every external URL was verified with `curl -L`. All resolve except where noted:

✅ mciug.org · awards.mciug.org · catalyst.mciug.org · fellowship.mciug.org ·
stickers.lovefacts.africa · solutionsnow.africa · inspireafricans.com · tapagric.org ·
mbcrc.org · maritimeshipping-uganda.com · passionateheartsministries.org ·
youtu.be/Xh0BSaJlHWA · both TikTok videos · x.com/Emmir256 ·
github.com/Bahindiemma

⚠️ **LinkedIn** returns HTTP `999` to command-line requests. That is LinkedIn's standard
anti-bot response, not a broken link — it opens normally in a browser.

⚠️ **passionateheartsministries.org** returns `406` to a bare `curl` (server-side user
agent filtering) but `200` with a normal browser user agent.

❌ **nalawquizzes.org** — does not resolve (NXDOMAIN). Removed from the site.

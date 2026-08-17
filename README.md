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
| Type | Lora (serif display) + Inter (sans), via `next/font` |
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
  fonts/                static Lora TTFs (for the OG image only)
components/             one component per section
content/site.ts         ← all copy, links and data
public/portrait.jpg
public/resume.pdf       PLACEHOLDER — see below
```

### Editing content

**`content/site.ts` is the single source of content.** Copy, project links, talks,
skills, contact details and nav all live there. Adding a project or a talk is a data
edit — no component needs touching.

---

## ⚠️ Needs Emmanuel's action

These are the things I could not do from the repo. Nothing here blocks the site from
running; each one improves it.

### 1. Replace the placeholder résumé — required

`public/resume.pdf` is a **placeholder**. It is a one-page PDF that says so. The
"Download Résumé" button in the footer points at it. Drop the real CV in at the same
path and the button is done.

### 2. Confirm the GitHub URL

The brief listed LinkedIn and X but not a GitHub profile. The footer currently points at
`https://github.com/MediaChallengeInitiative` — the organisation that owns this repo. If
there is a personal GitHub account, change `contact.github` in `content/site.ts`. I did
not want to guess a username and ship a dead link.

### 3. Two `www.` subdomains do not resolve

`www.awards.mciug.org` and `www.catalyst.mciug.org` both fail to resolve. The apex forms
work, so the site links to those instead:

- `https://awards.mciug.org` ✅
- `https://catalyst.mciug.org` ✅

If the `www.` variants should work, that is a DNS record to add on the MCI side. Nothing
needs to change in this repo either way.

### 4. `nalawquizzes.org` no longer exists

The domain returns **NXDOMAIN** — it does not resolve at all, on either `www.` or apex.
It has most likely expired.

As instructed, the project has **not** been removed. It appears in the "Freelance era"
group as a dimmed card reading *"Domain no longer resolves"*, and it is deliberately
**not** a link, so no visitor can click through to a dead page. When the domain is back,
add `href` to that entry in `content/site.ts` and delete its `unreachable: true` flag.

### 5. Optional: a better portrait

`public/portrait.jpg` is carried over from the old site (600×600, 41 KB). It is a
circular crop on a white background, so the hero scales it slightly to push the white
backing outside the circular mask. A square, full-bleed portrait would look better and
let that scale hack go.

### 6. No Vercel environment variables are needed

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

| Token | Value | Use |
|---|---|---|
| Navy | `#0A1B2E` | Dark section grounds; `#06121F` for the footer |
| White | `#FFFFFF` | Alternating light sections |
| Amber | `#FFB627` | The single accent, on dark |
| Amber ink | `#D9760A` | The same accent on light, for AA contrast |
| Slate | `#94A3B8` | Secondary text on dark |

Sections alternate dark and light to give the page an editorial rhythm. Headlines are
Lora with the key phrase set in **italic amber**. Labels are small-caps Inter with wide
tracking. There are no skill percentage bars, no satisfaction counters, and no stock tool
icons — see `AUDIT.md` for what was removed and why.

### Motion

Sections fade and slide in on scroll via a single root-level `IntersectionObserver`
(`components/Reveal.tsx`), which keeps every section a server component. The hero has one
animated element: a typing "next word prediction" strip that visualises how a language
model extends a sentence.

Motion is progressively enhanced in both directions:

- The hidden starting state is scoped to a `.js` class set by an inline script before
  first paint. **If JavaScript never runs, every section renders plainly visible** rather
  than staying invisible forever.
- `prefers-reduced-motion: reduce` disables the reveals, the typing animation and the
  pulsing hero rings.

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
| Performance | **94** (median of 5 runs; 85–95 spread from local machine noise) |
| Accessibility | **100** |
| Best practices | **100** |
| SEO | **100** |

- Semantic landmarks, a skip link, labelled sections, real `alt` text everywhere,
  keyboard navigable with a visible focus ring on both light and dark grounds.
- `npm audit` reports **0 vulnerabilities**.
- The YouTube embed uses a **facade**: only a thumbnail loads until the play button is
  clicked, so the player bundle never touches first paint.
- No horizontal scroll at 360 / 768 / 1280 px.

Layout was tested at all three widths in a real browser. Cumulative Layout Shift is 0.

---

## Link check

Every external URL was verified with `curl -L`. All resolve except where noted:

✅ mciug.org · awards.mciug.org · catalyst.mciug.org · fellowship.mciug.org ·
stickers.lovefacts.africa · solutionsnow.africa · inspireafricans.com · tapagric.org ·
mbcrc.org · maritimeshipping-uganda.com · passionateheartsministries.org ·
youtu.be/Xh0BSaJlHWA · both TikTok links · x.com/Emmir256

⚠️ **LinkedIn** returns HTTP `999` to command-line requests. That is LinkedIn's standard
anti-bot response, not a broken link — it opens normally in a browser.

⚠️ **passionateheartsministries.org** returns `406` to a bare `curl` (server-side user
agent filtering) but `200` with a normal browser user agent.

❌ **nalawquizzes.org** — does not resolve. Handled as described above.

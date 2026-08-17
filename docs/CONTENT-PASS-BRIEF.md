# Expert build brief — real assets, playable media, mobile pass

> Execution-ready expansion of the second change request. Everything here lands on
> `ovro-3d` (PR #2). Design system, layout shell and 3D from
> [`DESIGN-BRIEF-OVRO-3D.md`](./DESIGN-BRIEF-OVRO-3D.md) are unchanged.

---

## 0. Role

Act as a **Frontend Engineer + Content Integrator**. Swap every placeholder for the real
asset, make all four media items play **without leaving the site**, correct the identity
details, and tighten mobile.

The quality gates from the previous brief still bind and are re-verified at the end:
Lighthouse mobile **Performance ≥ 90**, **A11y / Best-practices / SEO = 100**, `npm audit`
clean, zero build/lint warnings, no horizontal scroll at 360/768/1280, and full function
with **no JS** and with **no WebGL**.

---

## 1. Real assets — rename on the way in

Source files are outside the repo and carry export-tool names. Rename to
kebab-case, web-meaningful names as they are vendored in.

| Source | Repo path | Processing |
|---|---|---|
| `~/Downloads/Emmanuel_Bahindi_-_Software_Engineer_-_Resume_2026.pdf` | `public/emmanuel-bahindi-resume-2026.pdf` | none (2 pages, 174 KB) |
| `~/Downloads/ebahindi.jpg` | `public/emmanuel-bahindi-portrait.jpg` | 853×1280 → **666×1000**, quality-capped |
| `~/Downloads/AI MEDIA LAB PHOTOES/AI.jpg` | `public/ai-media-lab-tot-cover.jpg` | 6000×4000 → centre-crop **16:9** → **1600×900** |

**The résumé is no longer a placeholder.** Remove the "replace this file" note from the
README and point the footer/profile buttons at the new path. Serve it with a
`download` attribute carrying a human filename so it doesn't save as `resume.pdf`.

**The portrait is now a real full-bleed studio shot**, not a circular crop on white. The
`scale-[1.32]` hack that pushed that white backing outside the mask **must be removed** in
both `HeroScene` and `ProfileCard` — it now crops the subject for no reason. Use
`object-cover` with the focal point biased upward so the face survives a square crop.

---

## 2. Media must play on the site

All four items currently either leave the site or are unplayable. After this pass, three
of four play inline; the fourth has no recording to play.

| Item | Now | After |
|---|---|---|
| AI Media Lab ToT (YouTube `Xh0BSaJlHWA`) | facade → inline player | same, but poster is the **real Lab photo** |
| AI vs Human Intelligence (The Rest of Us) | link out to TikTok | **inline TikTok embed** |
| "Starlink Is a Meaningful Disruptor" (Switch Africa) | link out to TikTok | **inline TikTok embed** |
| The Wise Man and the Clever Machine (Rotary, Aug 2026) | text card | unchanged — no recording exists |

### Resolved TikTok IDs

The stored links are `vt.tiktok.com` shorteners, which are **not embeddable**. They were
resolved to canonical IDs:

```
AI vs Human Intelligence   @the_rest_of_us_256  7674706974071606536
Starlink / Switch Africa   @switch_africa       7663036221840608520
```

Embed URL: `https://www.tiktok.com/embed/v2/{videoId}` — vertical, treat as **9:16**.

### Posters: real frames, downloaded not hotlinked

Every card carries a real cover image. TikTok's oEmbed returns the episode thumbnail, but
the URL is **signed and expires** (`x-expires=…`), so it is downloaded and vendored into
`public/` rather than linked. Hotlinking would leave blank cards the moment the signature
lapses — the exact failure this project already rules out elsewhere.

| Card | Poster |
|---|---|
| AI Media Lab ToT | `ai-media-lab-tot-cover.jpg` (local photo, 16:9) |
| The Rest of Us | `tiktok-rest-of-us-cover.jpg` (episode frame, 540×960) |
| Switch Africa | `tiktok-switch-africa-cover.jpg` (episode cover, 720×960) |

Each facade also carries a bottom gradient with the provider and outlet, so a card is
always readable as a specific thing rather than an anonymous tile.

### Keep the facade pattern

Both TikTok and YouTube embeds load **only on click**. A TikTok iframe is heavy and
third-party; mounting two of them eagerly would undo the performance work from PR #2.
Facades keep first paint clean and preserve the Lighthouse budget.

---

## 3. Content corrections

| Field | From | To |
|---|---|---|
| Email | `bahindiemmanuel20@gmail.com` | **`ebahindi@gmail.com`** |
| GitHub | `github.com/MediaChallengeInitiative` | **`github.com/Bahindiemma?tab=repositories`** |
| Profile card line | "Multimedia Web Developer & Technical Lead, AI Media Lab at Media Challenge Initiative, and Founder & CEO of COTE TECH (U) LTD." | **"Software Engineer & AI Practitioner."** |
| Work → freelance | includes **NALAW Quizzes** | **removed entirely** |

Notes:

- The email reverses the original project brief, which specified
  `bahindiemmanuel20@gmail.com`. The later instruction wins. It must change in **every**
  place: contact block, both mailto CTAs, the prefilled speaking template, and the
  `Person` JSON-LD.
- The GitHub change also resolves the open question flagged in PR #1 — the footer no
  longer points at the MCI organisation, so that item leaves the "needs action" list.
- NALAW is **deleted**, not dimmed. PR #1 kept it as an unlinked card because the brief
  said to mark failures rather than remove them; this instruction supersedes that. The
  `unreachable` flag in the `Project` type stays — it is still the right mechanism if
  another domain lapses.

---

## 4. Mobile pass

Below `lg` the site is a single stack, so the work is in density and touch ergonomics.

- **Type scale.** The hero headline is tuned for a desktop column; step it down at the
  smallest sizes so it does not eat the first screen.
- **Touch targets.** Every control ≥ 44×44px, including social circles and the rail's
  mobile menu rows.
- **Spacing.** Section rhythm is desktop-weighted; reduce top padding below `sm`.
- **Cards.** Work and talk cards need tighter padding on narrow screens.
- **Embeds.** A 9:16 TikTok embed must not exceed the viewport height on a phone — cap it
  and centre it.
- **Header.** Already fixed in PR #2 (wordmark and CTA collapse below `sm`); verify it
  still holds with the longer résumé filename.
- Re-verify **no horizontal scroll** at 360 and 768 after every change above.

---

## 5. Deliverable

All content edits land in `content/site.ts` — component files change only where structure
or layout genuinely changes (the new media facade, the removed scale hack, mobile
spacing). Update `README.md` to drop the résumé and GitHub items from "needs action" and
to record that media posters are vendored rather than hotlinked.

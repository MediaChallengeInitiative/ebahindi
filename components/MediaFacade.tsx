"use client";

import { useState } from "react";
import Image from "next/image";
import type { Talk } from "@/content/site";

type Props = {
  kind: Extract<Talk["kind"], "youtube" | "tiktok">;
  videoId: string;
  title: string;
  outlet: string;
  /** Local poster image. Always supplied for real talks. */
  poster?: string;
  /** Overrides the default crop focal point. */
  posterPosition?: string;
  sizes?: string;
};

const EMBED: Record<Props["kind"], (id: string) => string> = {
  youtube: (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
  tiktok: (id) => `https://www.tiktok.com/embed/v2/${id}`,
};

const PROVIDER: Record<Props["kind"], string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
};

/**
 * Click-to-load embed for YouTube and TikTok.
 *
 * Nothing third-party loads until the visitor asks for it: a YouTube player is
 * ~1MB and a TikTok iframe is heavier still, and there are three on this page.
 * Mounting them eagerly would undo the performance work entirely.
 *
 * Posters are **vendored, never hotlinked**. TikTok's oEmbed thumbnail URLs are
 * signed and time-limited (`x-expires=…`), so linking them directly would leave
 * blank cards the moment they lapse. The real frames were downloaded and now
 * live in `public/`.
 */
export default function MediaFacade({
  kind,
  videoId,
  title,
  outlet,
  poster,
  posterPosition,
  sizes,
}: Props) {
  const [active, setActive] = useState(false);
  const vertical = kind === "tiktok";

  /**
   * One frame for both states, so pressing play causes **zero layout shift** —
   * the card occupies exactly the same box before and after.
   *
   * The vertical ratio is measured, not guessed: in TikTok's embed at a 420px
   * card width, the video area ends at y=575 and the caption/comments block
   * begins. 575/420 = 1.369, so 420/575 is the widest the card can be while
   * still showing the whole video — faces included — and nothing below it.
   * The cap keeps it sane on very wide columns.
   */
  const frameHeight = vertical ? "aspect-[420/575] max-h-[620px]" : "aspect-video";

  if (active) {
    return (
      <div className={`${frameHeight} w-full overflow-hidden rounded-[22px] bg-black`}>
        <iframe
          className="h-full w-full"
          src={EMBED[kind](videoId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className={`card-pop group relative block ${frameHeight} w-full overflow-hidden`}
      aria-label={`Play ${PROVIDER[kind]} video: ${title}`}
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          sizes={sizes ?? "(max-width: 1024px) 100vw, 760px"}
          style={{ objectPosition: posterPosition ?? "center 28%" }}
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        // Fallback only — every current talk ships a real poster.
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,174,0,0.22)_0%,rgba(255,174,0,0)_65%)]"
        />
      )}

      {/* Light scrim: enough to keep the play button and label legible without
          washing the frame out. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-teal-900/25 transition-colors group-hover:bg-teal-900/10"
      />

      {/* Bottom gradient + provider/outlet, so a card is always readable as a
          specific thing rather than an anonymous tile. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-900 via-teal-900/70 to-transparent p-4 pt-10 text-left"
      >
        <span className="block text-[10px] font-bold uppercase tracking-label text-amber">
          {PROVIDER[kind]}
        </span>
        <span className="mt-1 block text-[14px] font-bold leading-snug text-white">{outlet}</span>
      </span>

      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 sm:h-16 sm:w-16
                   items-center justify-center rounded-full bg-amber shadow-lg
                   transition duration-300 group-hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-ink">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

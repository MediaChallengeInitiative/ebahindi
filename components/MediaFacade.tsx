"use client";

import { useState } from "react";
import Image from "next/image";
import type { Talk } from "@/content/site";

type Props = {
  kind: Extract<Talk["kind"], "youtube" | "tiktok">;
  videoId: string;
  title: string;
  outlet: string;
  /** Local poster image. Omitted for TikTok, which gets a drawn poster. */
  poster?: string;
  /** Sizes hint for the poster image; ignored when there is no poster. */
  sizes?: string;
};

const EMBED: Record<Props["kind"], (id: string) => string> = {
  youtube: (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
  tiktok: (id) => `https://www.tiktok.com/embed/v2/${id}`,
};

/**
 * Click-to-load embed for YouTube and TikTok.
 *
 * Nothing third-party loads until the visitor asks for it: a YouTube player is
 * ~1MB and a TikTok iframe is heavier still, and there are three of them on this
 * page. Mounting them eagerly would undo the performance work entirely.
 *
 * TikTok posters are drawn rather than fetched. TikTok's oEmbed thumbnail URLs
 * are signed and time-limited (`x-expires=...`), so hotlinking them guarantees
 * broken tiles later — the same failure mode the project preview cards avoid.
 */
export default function MediaFacade({ kind, videoId, title, outlet, poster, sizes }: Props) {
  const [active, setActive] = useState(false);
  const vertical = kind === "tiktok";
  const frame = vertical ? "aspect-[9/16]" : "aspect-video";

  if (active) {
    return (
      <div className={`${frame} w-full overflow-hidden rounded-xl bg-black`}>
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
      className={`group relative block ${frame} w-full overflow-hidden rounded-xl
                  border border-line-soft bg-teal-900`}
      aria-label={`Play ${kind === "tiktok" ? "TikTok video" : "video"}: ${title}`}
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          sizes={sizes ?? "(max-width: 1024px) 100vw, 760px"}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        // Drawn poster: teal ground, amber wash, outlet name.
        <span aria-hidden="true" className="absolute inset-0">
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,174,0,0.20)_0%,rgba(255,174,0,0)_62%)]" />
          <span className="absolute inset-x-0 bottom-0 p-4 text-left">
            <span className="block text-[11px] font-bold uppercase tracking-label text-amber">
              TikTok
            </span>
            <span className="mt-1 block text-[15px] font-bold text-white">{outlet}</span>
          </span>
        </span>
      )}

      <span
        aria-hidden="true"
        className={`absolute inset-0 transition-colors ${
          poster ? "bg-teal-900/45 group-hover:bg-teal-900/25" : "bg-transparent"
        }`}
      />

      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2
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

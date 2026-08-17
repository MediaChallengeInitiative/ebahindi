"use client";

import { useState } from "react";

type Props = {
  id: string;
  title: string;
};

/**
 * Click-to-load YouTube embed.
 *
 * Renders only a thumbnail until activated, so the ~1MB YouTube player bundle
 * never loads on first paint. The thumbnail comes from YouTube's own CDN as a
 * plain <img> — deliberately not next/image, since remote-pattern config and an
 * optimisation round-trip buy nothing for a fixed-size preview.
 */
export default function YouTubeFacade({ id, title }: Props) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
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
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-navy-deep"
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        width={480}
        height={360}
        className="h-full w-full scale-[1.35] object-cover transition duration-500 group-hover:scale-[1.4]"
      />
      <span className="absolute inset-0 bg-navy/35 transition-colors group-hover:bg-navy/20" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2
                   items-center justify-center rounded-full bg-amber shadow-lg transition
                   duration-300 group-hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-navy">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

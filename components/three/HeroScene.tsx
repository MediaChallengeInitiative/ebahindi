"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { hero } from "@/content/site";
import { useCanvasGate } from "./useCanvasGate";

/**
 * `ssr: false` is required, not stylistic: React Three Fiber cannot be
 * server-rendered, and this keeps the three.js bundle out of the initial JS.
 */
const HeroBlob = dynamic(() => import("./HeroBlob"), { ssr: false });

/**
 * The portrait is the fallback, not a decoration — if WebGL is unavailable or
 * the section has not been reached, the hero is still complete.
 */
function PortraitFallback() {
  return (
    <div className="absolute inset-[8%] overflow-hidden rounded-full ring-1 ring-line">
      {/* Source is a circular crop on a white square; scaling pushes that
          white backing outside the circular mask. */}
      <Image
        src={hero.portrait.src}
        alt={hero.portrait.alt}
        fill
        priority
        sizes="(max-width: 1024px) 320px, 440px"
        className="scale-[1.32] object-cover"
      />
    </div>
  );
}

export default function HeroScene() {
  const { ref, inView, supported, reduced } = useCanvasGate<HTMLDivElement>();
  const showCanvas = supported && inView;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[320px] lg:max-w-[440px]">
      {/* Amber bloom behind the object */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full
                   bg-[radial-gradient(circle,rgba(255,174,0,0.20)_0%,rgba(255,174,0,0)_66%)]"
      />

      {/* Concentric rings, echoing Ovro's rotating badge motif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border border-line-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10%] rounded-full border border-amber/20"
      />

      {/* The portrait is what the server renders and what a no-JS or no-WebGL
          visitor keeps; the canvas replaces it only once it can actually run.
          The canvas itself is decorative — the identity content is in the text
          column beside it. */}
      {showCanvas ? (
        <div aria-hidden="true" className="absolute inset-0">
          <HeroBlob reduced={reduced} />
        </div>
      ) : (
        <PortraitFallback />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { hero } from "@/content/site";

const TYPE_MS = 95;
const ERASE_MS = 45;
const HOLD_MS = 1500;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Reads the reduced-motion preference without a setState-in-effect round trip.
 * The server snapshot assumes motion is allowed, so markup matches on hydration
 * and React re-renders once with the real client value.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

type Phase = "typing" | "holding" | "erasing";

/**
 * Types and erases a cycling word to visualise a model predicting the next
 * token. Purely decorative: the strip is aria-hidden in the hero, which renders
 * a static equivalent for assistive tech alongside it.
 *
 * Every state transition happens inside a timeout callback rather than in the
 * effect body, so the animation never triggers a cascading synchronous render.
 */
export default function NextWord() {
  const words = hero.prediction.tokens;
  const reduced = usePrefersReducedMotion();
  const [{ index, length, phase }, setState] = useState<{
    index: number;
    length: number;
    phase: Phase;
  }>({ index: 0, length: 0, phase: "typing" });

  useEffect(() => {
    if (reduced) return;

    const delay = phase === "holding" ? HOLD_MS : phase === "erasing" ? ERASE_MS : TYPE_MS;

    const timer = setTimeout(() => {
      setState((current) => {
        const currentWord = words[current.index];

        if (current.phase === "typing") {
          return current.length >= currentWord.length
            ? { ...current, phase: "holding" }
            : { ...current, length: current.length + 1 };
        }

        if (current.phase === "holding") {
          return { ...current, phase: "erasing" };
        }

        return current.length <= 0
          ? { index: (current.index + 1) % words.length, length: 0, phase: "typing" }
          : { ...current, length: current.length - 1 };
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [reduced, words, index, length, phase]);

  // Reduced motion: settle on the first word, no animation, no caret blink.
  const shown = reduced ? words[0] : words[index].slice(0, length);

  return (
    <span className="inline-flex items-baseline">
      <span className="font-display italic text-amber">{shown}</span>
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.13em] bg-amber ${
          reduced ? "" : "animate-caret"
        }`}
      />
    </span>
  );
}

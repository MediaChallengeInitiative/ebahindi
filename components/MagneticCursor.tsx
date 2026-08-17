"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary';

/** True only for fine-pointer devices that have not asked for reduced motion. */
function readEligibility() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function subscribe(onChange: () => void) {
  const queries = [
    window.matchMedia("(pointer: fine)"),
    window.matchMedia("(prefers-reduced-motion: reduce)"),
  ];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

/**
 * Eased custom cursor that grows over interactive elements.
 *
 * Deliberately restricted:
 *  - only on devices with a fine pointer (never touch),
 *  - disabled entirely under prefers-reduced-motion,
 *  - the `cursor: none` rule is applied from here, so if this component never
 *    mounts the native cursor is never hidden.
 */
export default function MagneticCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  // Server snapshot is `false`, so nothing about the cursor is server-rendered
  // and `cursor: none` can never be applied without this component running.
  const enabled = useSyncExternalStore(subscribe, readEligibility, () => false);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-magnetic-cursor");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...pointer };
    let frame = 0;
    let over = false;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const el = e.target as Element | null;
      over = Boolean(el?.closest?.(INTERACTIVE));
    };

    const tick = () => {
      // Dot tracks exactly; the ring lags for the magnetic feel.
      eased.x += (pointer.x - eased.x) * 0.18;
      eased.y += (pointer.y - eased.y) * 0.18;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform =
          `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%) scale(${over ? 1.9 : 1})`;
        ring.current.style.borderColor = over ? "#FFAE00" : "rgba(255,255,255,0.35)";
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-magnetic-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div ref={dot} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-amber" />
      <div
        ref={ring}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border transition-[border-color] duration-200"
        style={{ borderColor: "rgba(255,255,255,0.35)" }}
      />
    </div>
  );
}

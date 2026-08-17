"use client";

import { useEffect, useState } from "react";
import { rail } from "@/content/site";
import RailIcon from "./RailIcon";

/**
 * Ovro's icon rail, as a scrollspy.
 *
 * Uses IntersectionObserver over the section elements rather than comparing
 * scrollY against offsets — offsets go stale on resize, font swap and image
 * load, which is exactly when a spy looks broken.
 */
export default function Rail() {
  const [active, setActive] = useState(rail[0].id);

  useEffect(() => {
    const sections = rail
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });

        // Whichever tracked section occupies the most of the viewport wins.
        let best: string | null = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      {
        // Ignore the band under the sticky header when deciding what's "in view".
        rootMargin: "-88px 0px -45% 0px",
        threshold: [0.05, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <ul className="flex flex-col gap-2.5">
        {rail.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group relative flex h-[58px] w-[58px] items-center justify-center rounded-2xl
                            border transition-all duration-300 ${
                              isActive
                                ? "border-amber bg-amber text-ink"
                                : "border-line-soft bg-teal-700/70 text-white/70 hover:border-amber/50 hover:text-amber"
                            }`}
              >
                <RailIcon name={item.icon} />

                {/* Label expands on hover, mirroring Ovro's rail behaviour. */}
                <span
                  className="pointer-events-none absolute left-[68px] z-20 whitespace-nowrap rounded-lg
                             border border-line-soft bg-teal-800 px-3 py-1.5 text-[13px] font-semibold
                             text-white opacity-0 shadow-panel transition-all duration-200
                             group-hover:translate-x-0 group-hover:opacity-100
                             group-focus-visible:opacity-100 -translate-x-1"
                >
                  {item.label}
                </span>
                <span className="sr-only">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

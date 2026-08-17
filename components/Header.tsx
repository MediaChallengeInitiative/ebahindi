"use client";

import { useEffect, useState } from "react";
import { nav, site, hero } from "@/content/site";
import RailIcon from "./RailIcon";

/**
 * Ovro's sticky header: wordmark left, primary CTA and menu right.
 *
 * The hamburger is the mobile counterpart of the desktop rail — the rail is
 * hidden below lg, so this panel is the only way to reach the sections there.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line-soft bg-teal-900/95 backdrop-blur supports-[backdrop-filter]:bg-teal-900/80"
          : "bg-transparent"
      }`}
    >
      <div className="shell flex h-[76px] items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber
                       text-[15px] font-extrabold text-ink"
          >
            {site.monogram}
          </span>
          {/* Hidden on the narrowest screens so the header never wraps. */}
          <span className="hidden text-lg font-extrabold tracking-tight sm:inline">
            {site.name}
          </span>
        </a>

        <div className="flex items-center gap-3">
          {/* Below sm this lives at the bottom of the menu panel instead. */}
          <a
            href={hero.ctas.speak.href}
            className="btn-amber hidden !px-5 !py-2.5 !text-[13px] sm:inline-flex"
          >
            Invite me to speak
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-panel"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line
                       text-white transition-colors hover:border-amber hover:text-amber lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="menu-panel" aria-label="Sections" className="border-t border-line-soft lg:hidden">
          <ul className="shell grid grid-cols-2 gap-2 py-4">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl border border-line-soft bg-teal-700/60
                             px-4 py-3 text-[14px] font-semibold text-white/85
                             transition-colors hover:border-amber/50 hover:text-amber"
                >
                  <RailIcon name={item.icon} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="shell pb-4 sm:hidden">
            <a
              href={hero.ctas.speak.href}
              onClick={() => setOpen(false)}
              className="btn-amber w-full"
            >
              Invite me to speak
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

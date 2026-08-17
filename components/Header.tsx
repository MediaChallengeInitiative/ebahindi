"use client";

import { useEffect, useState } from "react";
import { nav, site, hero } from "@/content/site";

/**
 * Sticky header. Transparent over the dark hero, then solid navy once the user
 * scrolls past it. The mobile panel is a plain disclosure — no overlay library.
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

  // Close the mobile panel on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/80"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="shell flex h-[68px] items-center justify-between gap-6">
        {/* No aria-label here on purpose: the visible name is already the
            accessible name, and an aria-label that differs from visible text
            trips WCAG 2.5.3 (Label in Name). */}
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber font-serif
                       text-[15px] font-bold text-navy"
          >
            {site.monogram}
          </span>
          <span className="font-serif text-[17px]">{site.name}</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-slate-muted transition-colors hover:text-amber"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href={hero.ctas.speak.href} className="btn-primary !px-5 !py-2.5 !text-[13px]">
            {hero.ctas.speak.label}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20
                     text-white lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 lg:hidden">
          <ul className="shell flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3.5 text-[15px] text-slate-muted
                             transition-colors hover:text-amber"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href={hero.ctas.speak.href}
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                {hero.ctas.speak.label}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}

import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  heading: ReactNode;
  /** Dark sections invert the palette and enable `.on-dark` accent colours. */
  tone?: "light" | "dark";
  intro?: ReactNode;
  children: ReactNode;
};

/**
 * Shared section shell: anchor target, small-caps label, serif heading.
 * Alternating tone is what gives the page its editorial rhythm.
 */
export default function Section({ id, label, heading, tone = "light", intro, children }: Props) {
  const dark = tone === "dark";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={dark ? "on-dark bg-navy text-white" : "bg-white text-navy"}
    >
      <div className="shell section">
        <div className="reveal max-w-3xl">
          <p className={`label ${dark ? "text-amber" : "text-amber-ink"}`}>{label}</p>
          <h2
            id={`${id}-heading`}
            className="display mt-4 text-balance text-3xl sm:text-4xl lg:text-[2.75rem]"
          >
            {heading}
          </h2>
          {intro ? (
            <div
              className={`pretty mt-5 max-w-prose text-[17px] leading-relaxed ${
                dark ? "text-slate-muted" : "text-navy/70"
              }`}
            >
              {intro}
            </div>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

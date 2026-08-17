import type { ReactNode } from "react";
import type { Headline } from "@/content/site";

type Props = {
  id: string;
  label: string;
  heading: Headline;
  intro?: ReactNode;
  children: ReactNode;
};

/** Renders a headline with its accent clause in italic amber. */
export function Heading({ heading, className }: { heading: Headline; className?: string }) {
  return (
    <span className={className}>
      {heading.lead} <em className="accent">{heading.accent}</em>
      {heading.tail ?? ""}
    </span>
  );
}

/**
 * Section shell inside Ovro's right-hand scroll column. Every section shares
 * one dark ground now, so rhythm comes from spacing and panel edges rather than
 * from alternating background colours.
 */
export default function Section({ id, label, heading, intro, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 pt-16 sm:scroll-mt-28 sm:pt-24">
      <div className="reveal max-w-3xl">
        <p className="label">{label}</p>
        <h2
          id={`${id}-heading`}
          className="headline balance mt-4 text-[1.65rem] min-[420px]:text-[1.9rem] sm:text-4xl lg:text-[2.6rem]"
        >
          <Heading heading={heading} />
        </h2>
        {intro ? (
          <p className="pretty mt-5 max-w-prose text-[17px] leading-relaxed text-white/65">
            {intro}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

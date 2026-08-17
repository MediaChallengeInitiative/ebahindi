import Image from "next/image";
import { hero, about } from "@/content/site";
import NextWord from "./NextWord";

export default function Hero() {
  return (
    <section id="top" className="on-dark relative overflow-hidden bg-navy text-white">
      {/* Amber wash behind the portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-18%] top-[-24%] h-[720px] w-[720px] rounded-full
                   bg-[radial-gradient(circle,rgba(255,182,39,0.16)_0%,rgba(255,182,39,0)_65%)]"
      />
      {/* Hairline grid, very faint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]
                   bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                   bg-[size:72px_72px]"
      />

      <div className="shell relative grid items-center gap-14 pb-20 pt-32 sm:pb-24 sm:pt-36 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-32 lg:pt-40">
        <div className="animate-fade-up">
          <p className="label text-amber">{hero.identity}</p>

          <h1 className="display mt-6 text-balance text-[2.1rem] leading-[1.14] sm:text-5xl lg:text-[3.65rem]">
            {hero.headline.lead} <em className="accent-italic">{hero.headline.accent}</em>{" "}
            {hero.headline.tail}
          </h1>

          {/* Next-word prediction strip */}
          <p className="mt-8 flex flex-wrap items-baseline gap-x-2 font-sans text-[15px] text-slate-muted">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-amber"
            />
            <span>{hero.prediction.prefix}</span>
            <span aria-hidden="true">
              <NextWord />
            </span>
            {/* Static equivalent for assistive tech. */}
            <span className="sr-only">{hero.prediction.tokens.join(", ")}.</span>
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a href={hero.ctas.speak.href} className="btn-primary">
              {hero.ctas.speak.label}
            </a>
            <a href={hero.ctas.work.href} className="btn-secondary">
              {hero.ctas.work.label}
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-8">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block font-serif text-3xl text-amber">{fact.value}</span>
                  <span className="mt-1 block text-[13px] text-slate-muted">{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait with pulsing rings */}
        <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[420px]">
          <div className="relative aspect-square">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-amber/30 animate-ring"
                style={{ animationDelay: `${i * 1.2}s` }}
              />
            ))}
            <div className="absolute inset-[6%] overflow-hidden rounded-full ring-1 ring-white/15">
              {/* The source is a circular crop on a white square; scaling up pushes
                  that white backing outside the mask so no ring shows. */}
              <Image
                src={hero.portrait.src}
                alt={hero.portrait.alt}
                fill
                priority
                sizes="(max-width: 1024px) 340px, 420px"
                className="scale-[1.32] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

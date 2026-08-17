import { hero, about } from "@/content/site";
import NextWord from "./NextWord";
import HeroScene from "./three/HeroScene";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-24 sm:pt-28 lg:pt-10">
      <p className="label flex items-start gap-2">
        <span
          aria-hidden="true"
          className="mt-[5px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
        />
        <span>{hero.identity}</span>
      </p>

      {/* Ovro's headline move: heavy sans, one word in italic amber Playfair. */}
      <h1
        id="hero-heading"
        className="headline balance mt-5 text-[2rem] min-[420px]:text-[2.35rem] sm:text-[3.4rem] lg:text-[4.1rem]"
      >
        {hero.headline.lead} <em className="accent">{hero.headline.accent}</em>{" "}
        {hero.headline.tail}
      </h1>

      <div className="mt-8 grid items-center gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="pretty max-w-prose text-[17px] leading-relaxed text-white/70">
            {about.body[1]}
          </p>

          {/* Next-word prediction strip — the 3D object reacts to the same idea. */}
          <p className="mt-7 flex flex-wrap items-baseline gap-x-2 text-[15px] text-white/60">
            <span>{hero.prediction.prefix}</span>
            <span aria-hidden="true">
              <NextWord />
            </span>
            <span className="sr-only">{hero.prediction.tokens.join(", ")}.</span>
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a href={hero.ctas.speak.href} className="btn-amber">
              {hero.ctas.speak.label}
            </a>
            <a href={hero.ctas.work.href} className="btn-ghost">
              {hero.ctas.work.label}
            </a>
          </div>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5 border-t border-line-soft pt-6 sm:gap-x-12 sm:pt-7">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block text-3xl font-extrabold text-amber">{fact.value}</span>
                  <span className="mt-1 block text-[13px] text-white/55">{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroScene />
      </div>

      {/* Ovro's full-width "Lets Work Together" bar. */}
      <a
        href={hero.ctas.speak.href}
        className="panel group mt-10 flex items-center justify-between gap-4 px-6 py-7
                   transition-colors hover:border-amber/40 sm:mt-12 sm:gap-6 sm:px-10 sm:py-8"
      >
        <span className="headline text-[1.35rem] sm:text-3xl lg:text-4xl">
          Let&rsquo;s work <em className="accent">together</em>
        </span>
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border sm:h-14 sm:w-14
                     border-line text-white transition-all duration-300
                     group-hover:border-amber group-hover:bg-amber group-hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </span>
      </a>
    </section>
  );
}

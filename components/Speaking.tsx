import Section from "./Section";
import YouTubeFacade from "./YouTubeFacade";
import { speaking, hero, type Talk } from "@/content/site";

const KIND_LABEL: Record<Talk["kind"], string> = {
  youtube: "Video",
  podcast: "Podcast",
  talk: "Talk",
};

function TalkCard({ talk, delay }: { talk: Talk; delay: number }) {
  const body = (
    <>
      <div className="flex items-center gap-3">
        <span className="tag border-navy/12 bg-navy/[0.04] !py-1 !text-[11px] font-semibold uppercase tracking-label text-amber-ink">
          {KIND_LABEL[talk.kind]}
        </span>
        {talk.meta ? <span className="text-[13px] text-navy/50">{talk.meta}</span> : null}
      </div>

      <h3 className="pretty mt-4 font-serif text-[19px] leading-snug">{talk.title}</h3>
      <p className="mt-2 text-[15px] text-navy/60">{talk.outlet}</p>

      {talk.href ? (
        <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-amber-ink">
          {talk.kind === "podcast" ? "Listen" : "Watch"}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </span>
      ) : null}
    </>
  );

  const base = "reveal card border border-navy/[0.07] p-6";

  if (!talk.href) {
    return (
      <li className={base} style={{ transitionDelay: `${delay}ms` }}>
        {body}
      </li>
    );
  }

  return (
    <li className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <a
        href={talk.href}
        target="_blank"
        rel="noopener noreferrer"
        className="card block h-full border border-navy/[0.07] p-6 hover:-translate-y-0.5
                   hover:border-amber-ink/30 hover:shadow-card-hover"
      >
        {body}
      </a>
    </li>
  );
}

export default function Speaking() {
  const [featured, ...rest] = speaking.talks;

  return (
    <Section
      id="speaking"
      label={speaking.label}
      heading={
        <>
          On stage, on camera, <em className="accent-italic">on air.</em>
        </>
      }
    >
      {/* Featured video gets the embed; the rest are cards. */}
      {featured.youtubeId ? (
        <figure className="reveal mt-14">
          <YouTubeFacade id={featured.youtubeId} title={featured.title} />
          <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-serif text-[19px]">{featured.title}</span>
            <span className="text-[15px] text-navy/55">{featured.outlet}</span>
          </figcaption>
        </figure>
      ) : null}

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {rest.map((talk, i) => (
          <TalkCard key={talk.title} talk={talk} delay={i * 80} />
        ))}
      </ul>

      <div className="reveal mt-14 rounded-2xl border border-navy/[0.08] bg-navy/[0.025] p-8 sm:p-10">
        <p className="pretty max-w-3xl font-serif text-xl leading-snug sm:text-2xl">
          {speaking.availability}
        </p>
        <a href={hero.ctas.speak.href} className="btn-ink mt-7">
          {hero.ctas.speak.label}
        </a>
      </div>
    </Section>
  );
}

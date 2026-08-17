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
        <span className="tag !py-1 !text-[10px] font-bold uppercase tracking-label !text-amber">
          {KIND_LABEL[talk.kind]}
        </span>
        {talk.meta ? <span className="text-[13px] text-white/65">{talk.meta}</span> : null}
      </div>

      <h3 className="pretty mt-4 text-[17px] font-bold leading-snug">{talk.title}</h3>
      <p className="mt-2 text-[14px] text-white/60">{talk.outlet}</p>

      {talk.href ? (
        <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-amber">
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

  if (!talk.href) {
    return (
      <li className="reveal card p-6" style={{ transitionDelay: `${delay}ms` }}>
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
        className="card block h-full p-6 hover:-translate-y-1 hover:border-amber/40 hover:shadow-lift"
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
          On stage, on camera, <em className="accent">on air.</em>
        </>
      }
    >
      {featured.youtubeId ? (
        <figure className="reveal mt-10">
          <YouTubeFacade id={featured.youtubeId} title={featured.title} />
          <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[17px] font-bold">{featured.title}</span>
            <span className="text-[15px] text-white/55">{featured.outlet}</span>
          </figcaption>
        </figure>
      ) : null}

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {rest.map((talk, i) => (
          <TalkCard key={talk.title} talk={talk} delay={i * 80} />
        ))}
      </ul>

      <div className="reveal panel mt-10 p-8 sm:p-10">
        <p className="pretty max-w-3xl text-xl font-bold leading-snug sm:text-2xl">
          {speaking.availability}
        </p>
        <a href={hero.ctas.speak.href} className="btn-amber mt-7">
          {hero.ctas.speak.label}
        </a>
      </div>
    </Section>
  );
}

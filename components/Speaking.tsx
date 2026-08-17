import Section from "./Section";
import MediaFacade from "./MediaFacade";
import { speaking, hero, type Talk } from "@/content/site";

const KIND_LABEL: Record<Talk["kind"], string> = {
  youtube: "Video",
  tiktok: "Podcast",
  talk: "Talk",
};

/** A talk with no recording — rendered as a card, never a dead play button. */
function TalkCard({ talk }: { talk: Talk }) {
  return (
    <div className="reveal card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="tag !py-1 !text-[10px] font-bold uppercase tracking-label !text-amber">
          {KIND_LABEL[talk.kind]}
        </span>
        {talk.meta ? <span className="text-[13px] text-white/65">{talk.meta}</span> : null}
      </div>
      <h3 className="pretty mt-4 text-[17px] font-bold leading-snug">{talk.title}</h3>
      <p className="mt-2 text-[14px] text-white/60">{talk.outlet}</p>
    </div>
  );
}

function Caption({ talk }: { talk: Talk }) {
  return (
    <figcaption className="mt-4">
      <p className="pretty text-[16px] font-bold leading-snug sm:text-[17px]">{talk.title}</p>
      <p className="mt-1 flex flex-wrap items-center gap-x-3 text-[14px] text-white/60">
        <span>{talk.outlet}</span>
        {talk.href ? (
          <a
            href={talk.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber underline-offset-4 hover:underline"
          >
            Open original
          </a>
        ) : null}
      </p>
    </figcaption>
  );
}

export default function Speaking() {
  const featured = speaking.talks.find((t) => t.kind === "youtube");
  const clips = speaking.talks.filter((t) => t.kind === "tiktok");
  const talks = speaking.talks.filter((t) => t.kind === "talk");

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
      {featured?.videoId ? (
        <figure className="reveal mt-8 sm:mt-10">
          <MediaFacade
            kind="youtube"
            videoId={featured.videoId}
            title={featured.title}
            outlet={featured.outlet}
            poster={featured.poster}
            sizes="(max-width: 1024px) 100vw, 760px"
          />
          <Caption talk={featured} />
        </figure>
      ) : null}

      {/* TikTok clips are vertical, so they get their own narrow pair and are
          capped so a 9:16 frame never runs past a phone viewport. */}
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {clips.map((clip, i) => (
          <li
            key={clip.videoId}
            className="reveal mx-auto w-full max-w-[320px] sm:max-w-none"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <figure>
              <MediaFacade
                kind="tiktok"
                videoId={clip.videoId!}
                title={clip.title}
                outlet={clip.outlet}
                poster={clip.poster}
                sizes="(max-width: 640px) 320px, 400px"
              />
              <Caption talk={clip} />
            </figure>
          </li>
        ))}
      </ul>

      {talks.length > 0 ? (
        <div className="mt-8 grid gap-5">
          {talks.map((talk) => (
            <TalkCard key={talk.title} talk={talk} />
          ))}
        </div>
      ) : null}

      <div className="reveal panel mt-10 p-6 sm:p-8 lg:p-10">
        <p className="pretty max-w-3xl text-lg font-bold leading-snug sm:text-xl lg:text-2xl">
          {speaking.availability}
        </p>
        <a href={hero.ctas.speak.href} className="btn-amber mt-6 w-full sm:mt-7 sm:w-auto">
          {hero.ctas.speak.label}
        </a>
      </div>
    </Section>
  );
}

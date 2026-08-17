import Section from "./Section";
import { aiMediaLab } from "@/content/site";

/** The flagship case study — the strongest proof of the speaker positioning. */
export default function AIMediaLab() {
  return (
    <Section
      id="ai-media-lab"
      label={aiMediaLab.label}
      heading={
        <>
          The <em className="accent">AI Media Lab</em>
        </>
      }
      intro={aiMediaLab.intro}
    >
      <div className="reveal mt-10 rounded-3xl border border-amber/25 bg-amber/[0.06] p-6 sm:p-8">
        <p className="label">Programme</p>
        <p className="pretty mt-3 max-w-4xl text-xl font-bold leading-snug sm:text-2xl">
          {aiMediaLab.project}
        </p>
        <p className="mt-3 text-sm text-white/55">{aiMediaLab.partners}</p>
      </div>

      <ol className="mt-6 grid gap-5 md:grid-cols-3">
        {aiMediaLab.contributions.map((item, i) => (
          <li
            key={item.title}
            className="reveal card flex flex-col p-6 hover:border-amber/40"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <span aria-hidden="true" className="text-2xl font-extrabold text-amber/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-[18px] font-bold leading-snug">{item.title}</h3>
            <p className="pretty mt-3 flex-1 text-[15px] leading-relaxed text-white/65">
              {item.body}
            </p>
            <p className="mt-5 border-t border-line-soft pt-4 text-[13px] font-semibold text-amber">
              {item.meta}
            </p>
          </li>
        ))}
      </ol>

      <div className="reveal mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line-soft pt-7">
        <span className="text-4xl font-extrabold text-amber sm:text-5xl">
          {aiMediaLab.reach.value}
        </span>
        <span className="text-[15px] text-white/60">{aiMediaLab.reach.label}</span>
      </div>
    </Section>
  );
}

import Section from "./Section";
import { aiMediaLab } from "@/content/site";

/** The flagship case study — the strongest proof of the speaker positioning. */
export default function AIMediaLab() {
  return (
    <Section
      id="ai-media-lab"
      tone="dark"
      label={aiMediaLab.label}
      heading={
        <>
          The <em className="accent-italic">AI Media Lab</em>
        </>
      }
      intro={aiMediaLab.intro}
    >
      <div className="reveal mt-12 rounded-2xl border border-amber/20 bg-amber/[0.06] p-6 sm:p-8">
        <p className="label text-amber">Programme</p>
        <p className="pretty mt-3 max-w-4xl font-serif text-xl leading-snug sm:text-2xl">
          {aiMediaLab.project}
        </p>
        <p className="mt-3 text-sm text-slate-muted">{aiMediaLab.partners}</p>
      </div>

      <ol className="mt-8 grid gap-5 md:grid-cols-3">
        {aiMediaLab.contributions.map((item, i) => (
          <li
            key={item.title}
            className="reveal card-dark flex flex-col p-6 hover:border-amber/30"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <span aria-hidden="true" className="font-serif text-2xl text-amber/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-serif text-[19px] leading-snug">{item.title}</h3>
            <p className="pretty mt-3 flex-1 text-[15px] leading-relaxed text-slate-muted">
              {item.body}
            </p>
            <p className="mt-5 border-t border-white/10 pt-4 text-[13px] font-medium text-amber">
              {item.meta}
            </p>
          </li>
        ))}
      </ol>

      <div className="reveal mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-white/10 pt-8">
        <span className="font-serif text-4xl text-amber sm:text-5xl">{aiMediaLab.reach.value}</span>
        <span className="text-[15px] text-slate-muted">{aiMediaLab.reach.label}</span>
      </div>
    </Section>
  );
}

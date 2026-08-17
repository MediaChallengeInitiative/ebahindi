import Section from "./Section";
import { skills } from "@/content/site";

export default function Skills() {
  return (
    <Section
      id="skills"
      tone="dark"
      label={skills.label}
      heading={
        <>
          How I <em className="accent-italic">work.</em>
        </>
      }
    >
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {skills.groups.map((group, i) => (
          <div
            key={group.title}
            className="reveal card-dark p-7 sm:p-8"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <h3 className="font-serif text-2xl">{group.title}</h3>
            <p className="mt-2 text-[15px] text-slate-muted">{group.blurb}</p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="tag border-white/15 bg-white/[0.04] text-white/85
                             transition-colors hover:border-amber/40 hover:text-amber"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

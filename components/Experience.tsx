import Section from "./Section";
import { experience, type ExperienceLink } from "@/content/site";

/**
 * A resume bullet's site references, rendered as chips under the prose rather
 * than as raw URLs inside it. A domain that has lapsed stays on the record but
 * is not offered as a link — same rule the work cards follow.
 */
function LinkChip({ link }: { link: ExperienceLink }) {
  if (link.unreachable) {
    return (
      <span className="tag cursor-default text-white/45" title="Domain no longer resolves">
        {link.label}
      </span>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="tag">
      {link.label}
    </a>
  );
}

/**
 * Career history. Every institution carries exactly four points, so the blocks
 * read as equally weighted rather than making the newest role look like the
 * only substantial one.
 */
export default function Experience() {
  return (
    <Section id="experience" label={experience.label} heading={experience.heading}>
      <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
        {experience.roles.map((role, index) => (
          <article
            key={role.id}
            className="reveal card-quiet p-5 sm:p-7 hover:border-amber/40"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <p className="label">{role.period}</p>
            <h3 className="mt-2.5 text-[19px] font-bold leading-snug sm:text-xl">{role.role}</h3>
            <p className="mt-1.5 text-[15px] text-white/60">{role.org}</p>

            <ol className="mt-5 space-y-4 border-t border-line-soft pt-5">
              {role.points.map((point, i) => (
                <li key={point.text} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-[3px] shrink-0 text-[13px] font-extrabold tabular-nums text-amber/60"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="pretty text-[15px] leading-relaxed text-white/70">{point.text}</p>
                    {point.links ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {point.links.map((link) => (
                          <li key={link.href}>
                            <LinkChip link={link} />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </Section>
  );
}

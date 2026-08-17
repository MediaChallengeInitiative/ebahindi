import Section from "./Section";
import { about } from "@/content/site";

export default function About() {
  return (
    <Section
      id="about"
      label={about.label}
      heading={
        <>
          An engineer who ships with <em className="accent-italic">AI</em>, and teaches others to.
        </>
      }
    >
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="reveal space-y-5">
          {about.body.map((paragraph) => (
            <p key={paragraph} className="pretty max-w-prose text-[17px] leading-relaxed text-navy/75">
              {paragraph}
            </p>
          ))}

          <p className="pretty max-w-prose text-[17px] leading-relaxed text-navy/75">
            The AI Media Lab is based at {about.address}.
          </p>
        </div>

        <div className="reveal space-y-4" style={{ transitionDelay: "90ms" }}>
          {about.roles.map((role) => (
            <div key={role.org} className="card border border-navy/[0.07] p-6 hover:shadow-card-hover">
              <p className="label text-amber-ink">{role.org}</p>
              <p className="mt-2.5 font-serif text-[19px] leading-snug">{role.role}</p>
            </div>
          ))}

          <div className="card border border-navy/[0.07] p-6 hover:shadow-card-hover">
            <p className="label text-amber-ink">Education</p>
            <p className="mt-2.5 font-serif text-[19px] leading-snug">{about.education.degree}</p>
            <p className="mt-1.5 text-[15px] text-navy/60">
              {about.education.school} · {about.education.years}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

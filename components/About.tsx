import Section from "./Section";
import { about } from "@/content/site";

export default function About() {
  return (
    <Section
      id="about"
      label={about.label}
      heading={
        <>
          An engineer who ships with <em className="accent">AI</em>, and teaches others to.
        </>
      }
    >
      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="reveal space-y-5">
          {about.body.map((paragraph) => (
            <p key={paragraph} className="pretty text-[16px] leading-relaxed text-white/70">
              {paragraph}
            </p>
          ))}
          <p className="pretty text-[16px] leading-relaxed text-white/70">
            The AI Media Lab is based at {about.address}.
          </p>
        </div>

        <div className="reveal space-y-4" style={{ transitionDelay: "90ms" }}>
          {about.roles.map((role) => (
            <div key={role.org} className="card p-5 sm:p-6 hover:border-amber/40">
              <p className="label">{role.org}</p>
              <p className="mt-2.5 text-[18px] font-bold leading-snug">{role.role}</p>
            </div>
          ))}

          <div className="card p-5 sm:p-6 hover:border-amber/40">
            <p className="label">Education</p>
            <p className="mt-2.5 text-[18px] font-bold leading-snug">{about.education.degree}</p>
            <p className="mt-1.5 text-[14px] text-white/60">
              {about.education.school} · {about.education.years}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

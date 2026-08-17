"use client";

import { motion, useReducedMotion } from "framer-motion";
import Section from "./Section";
import { work, type Project } from "@/content/site";

/**
 * Preview cards are drawn, not fetched.
 *
 * A build-time screenshot pipeline would put a headless browser in the build and
 * leave broken tiles whenever a client site moves or expires — which is exactly
 * what happened to nalawquizzes.org. A stable hue derived from the domain means
 * every tile always renders.
 */
function hueFor(domain: string): number {
  let hash = 0;
  for (let i = 0; i < domain.length; i += 1) {
    hash = (hash * 31 + domain.charCodeAt(i)) % 360;
  }
  return hash;
}

/** Two-letter mark from the most specific domain label — three MCI sites would
 *  otherwise all read "MC". */
function markFor(domain: string): string {
  return (domain.split(".")[0] ?? domain).slice(0, 2).toUpperCase();
}

function Preview({ project }: { project: Project }) {
  const hue = hueFor(project.domain);
  return (
    <div
      aria-hidden="true"
      className="relative flex h-32 items-center justify-center overflow-hidden rounded-t-2xl
                 border-b border-line-soft"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 30% 16%) 0%, hsl(${(hue + 40) % 360} 26% 11%) 100%)`,
      }}
    >
      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 truncate text-[11px] font-medium text-white/65">
          {project.domain}
        </span>
      </div>
      <span className="mt-4 text-3xl font-extrabold text-white/25">{markFor(project.domain)}</span>
    </div>
  );
}

function Card({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();

  const inner = (
    <>
      <Preview project={project} />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h4 className="text-[16px] font-bold leading-snug">{project.name}</h4>
        <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-white/60">{project.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-amber">
          {project.unreachable ? (
            <span className="text-white/65">Domain no longer resolves</span>
          ) : (
            <>
              Visit site
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </>
          )}
        </span>
      </div>
    </>
  );

  // Scroll-triggered rise + subtle tilt that resolves as the card settles.
  const animation = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 34, rotateX: 8, scale: 0.97 },
        whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.li {...animation} style={{ perspective: 1000 }}>
      {project.unreachable || !project.href ? (
        <div className="card flex h-full flex-col overflow-hidden opacity-70">{inner}</div>
      ) : (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="card flex h-full flex-col overflow-hidden hover:-translate-y-1
                     hover:border-amber/40 hover:shadow-lift"
        >
          {inner}
        </a>
      )}
    </motion.li>
  );
}

export default function Work() {
  return (
    <Section
      id="work"
      label={work.label}
      heading={
        <>
          Things I have <em className="accent">built and shipped.</em>
        </>
      }
    >
      <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
        {work.groups.map((group) => (
          <div key={group.id}>
            <div className="reveal flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line-soft pb-4">
              <h3 className="text-xl font-extrabold">{group.title}</h3>
              <p className="text-[14px] text-white/55">{group.blurb}</p>
            </div>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {group.projects.map((project, i) => (
                <Card key={project.domain} project={project} index={i} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

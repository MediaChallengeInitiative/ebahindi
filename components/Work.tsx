import Section from "./Section";
import { work, type Project } from "@/content/site";

/**
 * Preview cards are drawn, not fetched.
 *
 * A build-time screenshot pipeline (or remote OG scraping) would put a
 * headless browser in the build and leave broken tiles whenever a client site
 * moves, expires or blocks the crawler — the exact failure the brief rules out.
 * These cards derive a stable hue from the domain string, so every tile always
 * renders and the grid reads as one system.
 */
function hueFor(domain: string): number {
  let hash = 0;
  for (let i = 0; i < domain.length; i += 1) {
    hash = (hash * 31 + domain.charCodeAt(i)) % 360;
  }
  return hash;
}

/**
 * Two-letter mark taken from the most specific part of the domain, not the
 * project name — three MCI sites would otherwise all read "MC".
 */
function markFor(domain: string): string {
  const label = domain.split(".")[0] ?? domain;
  return label.slice(0, 2).toUpperCase();
}

function Preview({ project }: { project: Project }) {
  const hue = hueFor(project.domain);

  return (
    <div
      aria-hidden="true"
      className="relative flex h-32 items-center justify-center overflow-hidden rounded-t-2xl
                 border-b border-navy/[0.07]"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 42% 96%) 0%, hsl(${(hue + 40) % 360} 46% 91%) 100%)`,
      }}
    >
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-navy/15" />
        <span className="h-2 w-2 rounded-full bg-navy/15" />
        <span className="h-2 w-2 rounded-full bg-navy/15" />
        <span className="ml-2 truncate text-[11px] font-medium text-navy/45">{project.domain}</span>
      </div>
      <span className="mt-4 font-serif text-3xl text-navy/35">{markFor(project.domain)}</span>
    </div>
  );
}

function Card({ project, delay }: { project: Project; delay: number }) {
  const inner = (
    <>
      <Preview project={project} />
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-serif text-[17px] leading-snug">{project.name}</h4>
        <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-navy/60">{project.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-amber-ink">
          {project.unreachable ? (
            <span className="text-navy/45">Domain no longer resolves</span>
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

  // A site that no longer resolves is shown, but never linked.
  if (project.unreachable || !project.href) {
    return (
      <li
        className="reveal card flex flex-col overflow-hidden border border-navy/[0.07] opacity-75"
        style={{ transitionDelay: `${delay}ms` }}
      >
        {inner}
      </li>
    );
  }

  return (
    <li className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="card flex h-full flex-col overflow-hidden border border-navy/[0.07]
                   hover:-translate-y-1 hover:border-amber-ink/25 hover:shadow-card-hover"
      >
        {inner}
      </a>
    </li>
  );
}

export default function Work() {
  return (
    <Section
      id="work"
      label={work.label}
      heading={
        <>
          Things I have <em className="accent-italic">built and shipped.</em>
        </>
      }
    >
      <div className="mt-14 space-y-16">
        {work.groups.map((group) => (
          <div key={group.id}>
            <div className="reveal flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-navy/10 pb-4">
              <h3 className="font-serif text-2xl">{group.title}</h3>
              <p className="text-[15px] text-navy/55">{group.blurb}</p>
            </div>

            <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.projects.map((project, i) => (
                <Card key={project.domain} project={project} delay={(i % 3) * 80} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

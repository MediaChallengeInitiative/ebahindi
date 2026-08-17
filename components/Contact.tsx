import { contact, site, hero, speakingMailto } from "@/content/site";

const socials = [
  { label: "LinkedIn", href: contact.linkedin },
  { label: "X", href: contact.x },
  { label: "GitHub", href: contact.github },
];

/**
 * Contact + footer.
 *
 * Deliberately no form: the old one silently discarded every enquiry. A mailto
 * always works, needs no third-party key, and opens the channel this audience
 * already uses. (A Formspree endpoint can be dropped in later — see README.)
 */
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 pt-16 sm:scroll-mt-28 sm:pt-24">
      <div className="reveal max-w-3xl">
        <p className="label">Contact</p>
        <h2
          id="contact-heading"
          className="headline balance mt-4 text-[1.65rem] min-[420px]:text-[1.9rem] sm:text-4xl lg:text-[2.6rem]"
        >
          Let&rsquo;s talk about your event, your team, or your{" "}
          <em className="accent">next build.</em>
        </h2>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="reveal panel p-6 sm:p-8">
          <dl className="space-y-6">
            <div>
              <dt className="label">Email</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all text-lg font-bold transition-colors hover:text-amber sm:text-xl"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Phone</dt>
              <dd className="mt-2">
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="text-lg font-bold transition-colors hover:text-amber sm:text-xl"
                >
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Based in</dt>
              <dd className="mt-2 text-lg font-bold sm:text-xl">{contact.location}</dd>
            </div>
          </dl>
        </div>

        <div className="reveal panel p-6 sm:p-8" style={{ transitionDelay: "90ms" }}>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={speakingMailto} className="btn-amber">
              {hero.ctas.speak.label}
            </a>
            <a href={contact.resume} className="btn-ghost" download={contact.resumeFilename}>
              Download Résumé
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[15px] text-white/60
                             transition-colors hover:text-amber"
                >
                  {social.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="mt-12 flex flex-col gap-3 border-t border-line-soft pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-white/65">
          © {new Date().getFullYear()} {site.formalName}. All rights reserved.
        </p>
        <p className="text-[13px] text-white/65">{hero.identity}</p>
      </footer>
    </section>
  );
}

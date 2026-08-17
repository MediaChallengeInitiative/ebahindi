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
    <footer id="contact" className="on-dark bg-navy-deep text-white">
      <div className="shell section">
        <div className="reveal max-w-3xl">
          <p className="label text-amber">Contact</p>
          <h2 className="display mt-4 text-balance text-3xl sm:text-4xl lg:text-[2.75rem]">
            Let&rsquo;s talk about your event, your team, or your{" "}
            <em className="accent-italic">next build.</em>
          </h2>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="reveal">
            <dl className="space-y-6">
              <div>
                <dt className="label text-slate-muted">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-serif text-xl transition-colors hover:text-amber sm:text-2xl"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-slate-muted">Phone</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="font-serif text-xl transition-colors hover:text-amber sm:text-2xl"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-slate-muted">Based in</dt>
                <dd className="mt-2 font-serif text-xl sm:text-2xl">{contact.location}</dd>
              </div>
            </dl>
          </div>

          <div className="reveal" style={{ transitionDelay: "90ms" }}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={speakingMailto} className="btn-primary">
                {hero.ctas.speak.label}
              </a>
              <a href={contact.resume} className="btn-secondary" download>
                Download Résumé
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[15px] text-slate-muted
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

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-slate-muted">
            © {new Date().getFullYear()} {site.formalName}. All rights reserved.
          </p>
          <p className="text-[13px] text-slate-muted">
            {hero.identity}
          </p>
        </div>
      </div>
    </footer>
  );
}

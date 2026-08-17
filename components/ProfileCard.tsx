import Image from "next/image";
import { site, contact, hero, about } from "@/content/site";

const socials = [
  {
    label: "LinkedIn",
    href: contact.linkedin,
    path: (
      <>
        <path d="M6.2 9.4v8.4M6.2 6.3v.1" />
        <path d="M10.4 17.8V9.4m0 3.1c0-1.7 1.1-3.1 2.9-3.1s3 1.2 3 3.3v5.1" />
      </>
    ),
  },
  {
    label: "X",
    href: contact.x,
    path: (
      <path
        d="M4 3.6h3.9l4.3 5.9 5-5.9h2.6l-6.4 7.5 6.8 9.3h-3.9l-4.7-6.4-5.4 6.4H3.6l7-8.2z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
  {
    label: "GitHub",
    href: contact.github,
    path: (
      <path d="M9.2 20.2v-2.6c-3 .6-3.7-1.4-3.7-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.4-.3-5-1.2-5-5.3 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10 10 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.1-2.6 5-5 5.3.4.4.8 1.1.8 2.2v3.3" />
    ),
  },
];

/**
 * Ovro's sticky identity card. Sticky only from lg up — on mobile it renders
 * inline under the hero, because a pinned card on a 360px screen eats the page.
 */
export default function ProfileCard() {
  return (
    <aside className="panel p-6">
      <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl">
        <Image
          src={hero.portrait.src}
          alt={hero.portrait.alt}
          fill
          sizes="240px"
          className="scale-[1.3] object-cover"
        />
      </div>

      <h2 className="mt-6 text-center text-2xl font-extrabold">{site.formalName}</h2>

      <p className="pretty mt-3 text-center text-[14px] leading-relaxed text-white/65">
        {about.roles[1].role} at {about.roles[1].org}, and Founder &amp; CEO of{" "}
        {about.roles[0].org}.
      </p>

      <ul className="mt-6 flex items-center justify-center gap-3">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line
                         text-white/80 transition-colors hover:border-amber hover:text-amber"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[18px] w-[18px]"
              >
                {social.path}
              </svg>
              <span className="sr-only">{social.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <a href={contact.resume} download className="btn-amber mt-6 w-full">
        Download Résumé
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" />
        </svg>
      </a>

      <p className="mt-5 text-center text-[12px] text-white/65">
        © {new Date().getFullYear()} {site.formalName}
      </p>
    </aside>
  );
}

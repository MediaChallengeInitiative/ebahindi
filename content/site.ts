/**
 * Single source of content for the whole site.
 * Every section renders from this file — future edits should be data-only.
 */

export const site = {
  url: "https://ebahindi.vercel.app",
  name: "Emmanuel Bahindi",
  formalName: "Eng. Emmanuel Bahindi",
  monogram: "EB",
  title: "Emmanuel Bahindi — Software Engineer & AI Speaker",
  description:
    "Software engineer, AI practitioner and speaker based in Kampala. I build software with AI every single day — and I teach a continent to do the same.",
  locale: "en_UG",
} as const;

/**
 * Section headline, split so the accent clause can be set in italic amber.
 * `tail` carries its own leading punctuation/space.
 */
export type Headline = { lead: string; accent: string; tail?: string };

export const contactSection = {
  label: "Contact",
  heading: {
    lead: "Let\u2019s talk about your event, your team, or your",
    accent: "next build.",
  } as Headline,
};

export const contact = {
  location: "Kampala, Uganda",
  email: "ebahindi@gmail.com",
  phone: "+256 773 165 989",
  phoneHref: "+256773165989",
  linkedin: "https://www.linkedin.com/in/bahindi-emmanuel-52a8181b3/",
  x: "https://x.com/Emmir256",
  github: "https://github.com/Bahindiemma?tab=repositories",
  resume: "/emmanuel-bahindi-resume-2026.pdf",
  /** Filename the browser saves it as, instead of the raw path. */
  resumeFilename: "Emmanuel-Bahindi-Software-Engineer-Resume-2026.pdf",
} as const;

/** Prefilled mailto used by every "invite me to speak" CTA. */
export const speakingMailto =
  `mailto:${contact.email}` +
  "?subject=" +
  encodeURIComponent("Speaking invitation") +
  "&body=" +
  encodeURIComponent(
    [
      "Hello Emmanuel,",
      "",
      "I would like to invite you to speak at our event.",
      "",
      "Event: ",
      "Date: ",
      "Location / format: ",
      "Audience: ",
      "Topic we have in mind: ",
      "",
      "Thank you,",
    ].join("\n"),
  );

export const hero = {
  identity: "Software Engineer • AI Practitioner • Speaker on AI & Technology in Africa",
  /** Headline is split so the middle clause can be set in italic amber. */
  headline: {
    lead: "I build software with",
    accent: "AI every single day",
    tail: "— and I teach a continent to do the same.",
  },
  portrait: {
    src: "/emmanuel-bahindi-portrait.jpg",
    alt: "Portrait of Emmanuel Bahindi, software engineer and AI speaker based in Kampala, Uganda.",
  },
  ctas: {
    speak: { label: "Invite me to speak", href: speakingMailto },
    work: { label: "See my work", href: "#work" },
  },
  /**
   * Words fed to the hero's next-word prediction animation — a literal
   * visualisation of how a language model extends a sentence.
   */
  prediction: {
    prefix: "AI predicts the next",
    tokens: ["word", "line", "function", "opportunity"],
  },
} as const;

export const about = {
  label: "About",
  heading: {
    lead: "An engineer who ships with",
    accent: "AI",
    tail: ", and teaches others to.",
  } as Headline,
  body: [
    "I am a software engineer based in Kampala, Uganda, and the Founder & CEO of COTE TECH (U) LTD. I work as Multimedia Web Developer and Technical Lead of the AI Media Lab at Media Challenge Initiative.",
    "AI is not a side interest in my practice — it is how I work. I use it in production every day, and I spend as much time teaching educators and journalists to use it well as I do writing code.",
  ],
  education: {
    degree: "BSc Software Engineering",
    school: "Makerere University",
    years: "2019 – 2024",
  },
  address: "4th Floor, Tirupati Mazima Mall, Kabalagala, Kampala",
  /** One-line identity for the sticky profile card. */
  shortRole: "Software Engineer & AI Practitioner.",
  facts: [
    { value: "5+", label: "Years building software" },
    { value: "30+", label: "Projects delivered" },
  ],
  roles: [
    { role: "Founder & CEO", org: "COTE TECH (U) LTD" },
    {
      role: "Multimedia Web Developer & Technical Lead, AI Media Lab",
      org: "Media Challenge Initiative",
    },
  ],
} as const;

/**
 * A bullet from the resume. URLs are carried in `links` rather than inlined in
 * `text` so the prose stays readable here and the anchors stay real in the DOM
 * — a bullet that spells out "https://…" mid-sentence reads badly on screen.
 */
export type ExperienceLink = {
  label: string;
  href: string;
  /** Set when the domain no longer resolves — rendered as plain text. */
  unreachable?: boolean;
};

export type ExperiencePoint = { text: string; links?: ExperienceLink[] };

export type Role = {
  id: string;
  role: string;
  org: string;
  period: string;
  /** Exactly four, for every institution — the sections are deliberately balanced. */
  points: [ExperiencePoint, ExperiencePoint, ExperiencePoint, ExperiencePoint];
};

export const experience = {
  label: "Experience",
  heading: { lead: "Where I have", accent: "done the work." } as Headline,
  roles: [
    {
      id: "mci",
      role: "Multimedia Web Developer & Technical Lead, AI Media Lab",
      org: "Media Challenge Initiative",
      period: "Aug 2023 – Present",
      points: [
        {
          text:
            "Lead development and deployment of MCI’s enterprise web estate with Next.js 14 and React, owning the full lifecycle:",
          links: [
            // The resume lists www.awards.mciug.org; that host has no matching
            // TLS certificate, so the working apex is used. See README.
            { label: "MCI website", href: "https://www.mciug.org" },
            { label: "Media Challenge Awards", href: "https://awards.mciug.org" },
            { label: "Media Challenge Expo", href: "https://expo.mciug.org" },
            { label: "Fellowship", href: "https://fellowship.mciug.org" },
            { label: "Love Facts Stickers", href: "https://stickers.lovefacts.africa" },
            { label: "Solutions Now Africa", href: "https://solutionsnow.africa" },
          ],
        },
        {
          text:
            "Technical Lead on “Integrating AI Competences for Fighting Disinformation into Journalism Education in Eastern Africa” (with CAMECO and BMZ): architected and shipped the programme’s phone-first, low-data AI e-learning platform (launched Aug 2026).",
        },
        {
          text:
            "Co-designed and lead-facilitated a 5-day AI Training of Trainers for 22 university journalism educators from Uganda and Kenya, who now deliver the curriculum to 400 students across both countries.",
        },
        {
          text:
            "Authored the 4-course, 18-video “AI for Journalists” curriculum (AI foundations, prompting, ethics, AI content creation), and serve as its on-camera instructor for the National Newsroom Contest 2026.",
        },
      ],
    },
    {
      id: "cote",
      role: "Founder & CEO",
      org: "COTE TECH (U) LTD",
      period: "2024 – Present",
      points: [
        {
          text:
            "Founded and lead a digital solutions company delivering web platforms and AI-enabled products for organizations in Uganda and abroad, with AI-assisted engineering as standard practice.",
        },
        {
          text:
            "Serve as Chief Technology Officer to INSPIRE AFRICA, a UK-registered labour-mobility organization: delivered its public website end to end, from design to deployment and handover.",
          links: [{ label: "inspireafricans.com", href: "https://www.inspireafricans.com" }],
        },
        {
          text:
            "Architected INSPIRE AFRICA’s Central Database platform: role-based access for 29 staff job titles, two-factor authentication, audit logging, and separate candidate (Readiness) and employer (Roster) portals built around data-protection-by-design.",
        },
        {
          text:
            "Authored the platform’s official user guide and staff training programme, turning a complex system into documentation any staff member can follow.",
        },
      ],
    },
    {
      id: "baylor",
      role: "IT Officer (Intern)",
      org: "Baylor Foundation Uganda",
      period: "Sep 2022 – Mar 2023",
      points: [
        {
          text:
            "Developed and maintained business-process automation solutions that improved operational efficiency by 30%.",
        },
        {
          text:
            "Designed and implemented web interfaces for internal systems using React and Tailwind CSS.",
        },
        {
          text:
            "Conducted system analysis and provided recommendations for process improvements adopted across departments.",
        },
        {
          text:
            "Provided organization-wide IT support and user training, managed LAN/WAN networks and hardware, and created technical documentation and user guides for all implemented systems.",
        },
      ],
    },
    {
      id: "freelance",
      role: "Full-Stack Software Developer",
      org: "Freelance",
      period: "2020 – 2022",
      points: [
        {
          text:
            "Delivered 30+ projects for NGOs and businesses, handling the full engagement solo: requirements, design, build, deployment, hosting and client training.",
        },
        {
          text:
            "Built client platforms across agriculture, health, education and logistics, including:",
          links: [
            { label: "TAPA", href: "https://www.tapagric.org" },
            { label: "Passionate Hearts Ministries", href: "https://passionateheartsministries.org" },
            { label: "Musawo Betty Care & Research Center", href: "https://mbcrc.org" },
            {
              label: "Maritime Shipping Company Ltd",
              href: "https://www.maritimeshipping-uganda.com",
            },
          ],
        },
        {
          text:
            "Specialized in affordable, low-maintenance stacks (React, PHP/Laravel, WordPress-free custom builds) suited to small-organization budgets and Ugandan hosting realities.",
        },
        {
          text:
            "Maintained long-term support relationships with clients, several of which remain live and under my care today.",
        },
      ],
    },
  ] as Role[],
} as const;

export const aiMediaLab = {
  label: "Flagship work",
  heading: { lead: "The", accent: "AI Media Lab" } as Headline,
  project:
    "Integrating AI Competences for Fighting Disinformation into Journalism Education in Eastern Africa",
  partners: "With CAMECO • German-funded",
  intro:
    "I led the technology for a programme that puts practical AI skills into journalism education across Eastern Africa.",
  contributions: [
    {
      title: "A phone-first AI e-learning platform",
      body: "Architected for low-data, low-bandwidth conditions so students can learn on the device they actually own.",
      meta: "Launched August 2026",
    },
    {
      title: "Training of Trainers",
      body: "Designed and lead-facilitated a five-day programme for 22 university educators from Uganda and Kenya.",
      meta: "22 educators • Uganda & Kenya",
    },
    {
      title: "The “AI for Journalists” curriculum",
      body: "Authored four courses and eighteen videos, and present the material on camera.",
      meta: "4 courses • 18 videos",
    },
  ],
  reach: { value: "400", label: "students reached by the curriculum" },
} as const;

export type Talk = {
  title: string;
  outlet: string;
  href?: string;
  kind: "youtube" | "tiktok" | "talk";
  /** Video id for the click-to-load facade embed. */
  videoId?: string;
  /** Local poster image. Vendored, never hotlinked — see MediaFacade. */
  poster?: string;
  /** CSS object-position for the poster crop, when the default cuts badly. */
  posterPosition?: string;
  meta?: string;
};

export const speaking = {
  label: "Speaking & media",
  heading: { lead: "On stage, on camera,", accent: "on air." } as Headline,
  talks: [
    {
      title: "Highlight Video for the AI Journalism | AI Media Lab ToT",
      outlet: "AI Media Lab",
      href: "https://youtu.be/Xh0BSaJlHWA",
      kind: "youtube",
      videoId: "Xh0BSaJlHWA",
      poster: "/ai-media-lab-tot-cover.jpg",
    },
    {
      // vt.tiktok.com shorteners are not embeddable; these are the resolved
      // canonical video ids.
      title: "AI vs Human Intelligence",
      outlet: "The Rest of Us podcast",
      href: "https://www.tiktok.com/@the_rest_of_us_256/video/7674706974071606536",
      kind: "tiktok",
      videoId: "7674706974071606536",
      poster: "/tiktok-rest-of-us-cover.jpg",
    },
    {
      title: "“Starlink Is a Meaningful Disruptor”: Satellite Internet vs Africa's Telecom Giants",
      outlet: "Switch Africa",
      href: "https://www.tiktok.com/@switch_africa/video/7663036221840608520",
      kind: "tiktok",
      videoId: "7663036221840608520",
      poster: "/tiktok-switch-africa-cover.jpg",
      // Cover is text-heavy; frame higher so the headline is not cut mid-word.
      posterPosition: "center 16%",
    },
    {
      title: "The Wise Man and the Clever Machine: Who Serves Whom?",
      outlet: "Rotary Club of Makindye",
      kind: "talk",
      meta: "August 2026",
    },
  ] as Talk[],
  availability:
    "Available for keynotes, panels and trainings on AI and the future of work in Africa, AI-driven disinformation, and practical AI adoption.",
} as const;

export type Project = {
  name: string;
  href?: string;
  /** Domain shown on the preview card. */
  domain: string;
  blurb: string;
  /** Set when a URL does not currently resolve — rendered unlinked. */
  unreachable?: boolean;
};

export type WorkGroup = {
  id: string;
  title: string;
  blurb: string;
  projects: Project[];
};

export const work = {
  label: "Selected work",
  heading: { lead: "Things I have", accent: "built and shipped." } as Headline,
  groups: [
    {
      id: "mci",
      title: "MCI digital estate",
      blurb: "The public web platform of Media Challenge Initiative and its programmes.",
      projects: [
        {
          name: "Media Challenge Initiative",
          href: "https://www.mciug.org",
          domain: "mciug.org",
          blurb: "The organisation's main site.",
        },
        {
          name: "Media Challenge Awards",
          href: "https://awards.mciug.org",
          domain: "awards.mciug.org",
          blurb: "Awards programme and public nominations.",
        },
        {
          name: "Media Challenge Expo",
          href: "https://expo.mciug.org",
          domain: "expo.mciug.org",
          blurb: "Africa Media and Creatives Career Expo.",
        },
        {
          name: "Media Challenge Fellowship",
          href: "https://fellowship.mciug.org",
          domain: "fellowship.mciug.org",
          blurb: "Fellowship intake and alumni.",
        },
        {
          name: "Love Facts Stickers",
          href: "https://stickers.lovefacts.africa",
          domain: "stickers.lovefacts.africa",
          blurb: "Media-literacy sticker campaign.",
        },
        {
          name: "Solutions Now Africa",
          href: "https://solutionsnow.africa",
          domain: "solutionsnow.africa",
          blurb: "Solutions journalism platform.",
        },
      ],
    },
    {
      id: "cote",
      title: "COTE TECH client work",
      blurb: "Delivered through my company, COTE TECH (U) LTD.",
      projects: [
        {
          name: "INSPIRE AFRICA",
          href: "https://www.inspireafricans.com",
          domain: "inspireafricans.com",
          blurb: "Labour-mobility platform.",
        },
        {
          name: "SAO Uganda",
          href: "https://saouganda.org",
          domain: "saouganda.org",
          blurb: "Share An Opportunity — education, health and development NGO.",
        },
        {
          name: "Tamkeen Uganda",
          href: "https://tamkeenug.com",
          domain: "tamkeenug.com",
          blurb: "Tamkeen Academy — Montessori and Cambridge school in Kampala.",
        },
      ],
    },
    {
      id: "freelance",
      title: "Freelance era",
      blurb: "Earlier independent client projects.",
      projects: [
        {
          name: "Toil And Promote Agriculture",
          href: "https://www.tapagric.org",
          domain: "tapagric.org",
          blurb: "Agricultural NGO.",
        },
        {
          name: "Musawo Betty Care & Research Centre",
          href: "https://mbcrc.org",
          domain: "mbcrc.org",
          blurb: "Health care and research NGO.",
        },
        {
          name: "Maritime Shipping Uganda",
          href: "https://www.maritimeshipping-uganda.com",
          domain: "maritimeshipping-uganda.com",
          blurb: "Logistics and freight forwarding.",
        },
        {
          name: "Passionate Hearts Ministries",
          href: "https://passionateheartsministries.org",
          domain: "passionateheartsministries.org",
          blurb: "Faith-based non-profit.",
        },
      ],
    },
  ] as WorkGroup[],
} as const;

export const skills = {
  label: "Skills",
  heading: { lead: "How I", accent: "work." } as Headline,
  groups: [
    {
      title: "AI-Native Engineering",
      blurb: "Daily practice, not a line on a CV.",
      items: [
        "Daily production LLM use",
        "Prompt engineering",
        "LLM API integration",
        "AI-assisted code, testing & documentation",
        "AI ethics & verification training",
      ],
    },
    {
      title: "Full-Stack",
      blurb: "The stack I build and ship on.",
      items: [
        "JavaScript",
        "PHP",
        "React",
        "Next.js 14",
        "Laravel",
        "Tailwind",
        "MongoDB",
        "MySQL",
        "Sanity",
        "Strapi",
        "Jest",
        "Docker",
        "Git",
      ],
    },
  ],
} as const;

/**
 * The left rail doubles as the mobile menu and as the scrollspy source, so the
 * ids here must match the section ids rendered on the page.
 *
 * Ovro ships Testimonial and Blog items too. Both are dropped: he has neither,
 * and a rail entry that scrolls to invented content is worse than no entry.
 */
export type RailItem = {
  id: string;
  label: string;
  icon: "home" | "user" | "case" | "lab" | "mic" | "grid" | "spark" | "mail";
};

export const rail: RailItem[] = [
  { id: "top", label: "Home", icon: "home" },
  { id: "about", label: "About", icon: "user" },
  { id: "experience", label: "Experience", icon: "case" },
  { id: "ai-media-lab", label: "AI Media Lab", icon: "lab" },
  { id: "speaking", label: "Speaking", icon: "mic" },
  { id: "work", label: "Work", icon: "grid" },
  { id: "skills", label: "Skills", icon: "spark" },
  { id: "contact", label: "Contact", icon: "mail" },
];

export const nav = rail.filter((item) => item.id !== "top");

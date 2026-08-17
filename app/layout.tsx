import type { Metadata, Viewport } from "next";
import { Figtree, Playfair_Display } from "next/font/google";
import { site, contact } from "@/content/site";
import Reveal from "@/components/Reveal";
import MagneticCursor from "@/components/MagneticCursor";
import "./globals.css";

/** Ovro's pairing: Figtree for everything, Playfair italic for accent words only. */
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
  weight: ["500", "600"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.formalName, url: site.url }],
  creator: site.formalName,
  keywords: [
    "Emmanuel Bahindi",
    "AI speaker Africa",
    "software engineer Uganda",
    "AI Media Lab",
    "Media Challenge Initiative",
    "COTE TECH",
    "AI for journalists",
    "Kampala software engineer",
    "keynote speaker artificial intelligence",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.formalName} — Software Engineer, AI Practitioner and Speaker`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@Emmir256",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#061D1E",
  width: "device-width",
  initialScale: 1,
};

/** Structured data so search engines read him as a person available to speak. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.formalName,
  url: site.url,
  jobTitle: "Software Engineer, AI Practitioner and Speaker",
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Makerere University",
  },
  worksFor: [
    { "@type": "Organization", name: "COTE TECH (U) LTD" },
    { "@type": "Organization", name: "Media Challenge Initiative" },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "AI-driven disinformation",
    "Software Engineering",
    "AI adoption in Africa",
  ],
  sameAs: [contact.linkedin, contact.x, contact.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${playfair.variable}`}>
      <head>
        {/* Marks the document as JS-capable before first paint, which is what
            arms the scroll-reveal styles. See the `.js .reveal` rules. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
                     focus:rounded-full focus:bg-amber focus:px-5 focus:py-3 focus:text-sm
                     focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <Reveal />
        <MagneticCursor />
        <script
          type="application/ld+json"
          // Static, author-controlled object — not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}

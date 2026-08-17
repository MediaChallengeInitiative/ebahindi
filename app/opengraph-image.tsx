import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site, hero } from "@/content/site";

export const alt = `${site.formalName} — Software Engineer, AI Practitioner and Speaker`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori ships no system fonts, so the faces must be handed over as real font
 * files or the card falls back to a generic sans and loses the identity. Static
 * instances are vendored under app/fonts (both are OFL-licensed) rather than
 * fetched, so builds are reproducible and need no network. Satori cannot parse
 * variable fonts — these must stay static instances.
 */
async function loadFonts() {
  const dir = path.join(process.cwd(), "app", "fonts");
  const [figtree, playfair] = await Promise.all([
    readFile(path.join(dir, "Figtree-ExtraBold.ttf")),
    readFile(path.join(dir, "PlayfairDisplay-SemiBoldItalic.ttf")),
  ]);

  return [
    { name: "Figtree", data: figtree, style: "normal" as const, weight: 800 as const },
    { name: "Playfair", data: playfair, style: "italic" as const, weight: 600 as const },
  ];
}

/**
 * Link preview card. This is what conference organisers see when the link is
 * pasted into WhatsApp or LinkedIn, so it leads with the brand statement.
 */
export default async function OpengraphImage() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#061D1E",
          padding: "72px 80px",
          fontFamily: "Figtree, Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* Amber glow, top right */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,174,0,0.22) 0%, rgba(255,174,0,0) 68%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#FFAE00",
              color: "#061D1E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {site.monogram}
          </div>
          <div
            style={{
              display: "flex",
              color: "#8AA6A4",
              fontSize: 21,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontFamily: "Figtree, Arial, sans-serif",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 63,
              lineHeight: 1.16,
              color: "#FFFFFF",
              maxWidth: 1000,
            }}
          >
            <span style={{ display: "flex" }}>{hero.headline.lead}&nbsp;</span>
            {/* The trailing space sits on the accent span so it collapses at a
                line break instead of indenting the next line. */}
            <span style={{ display: "flex", color: "#FFAE00", fontStyle: "italic", fontFamily: "Playfair, Georgia, serif" }}>
              {hero.headline.accent}&nbsp;
            </span>
            <span style={{ display: "flex" }}>{hero.headline.tail}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 23,
            color: "#8AA6A4",
            fontFamily: "Figtree, Arial, sans-serif",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 26,
          }}
        >
          <span style={{ display: "flex" }}>Software Engineer</span>
          <span style={{ display: "flex", color: "#FFAE00" }}>•</span>
          <span style={{ display: "flex" }}>AI Practitioner</span>
          <span style={{ display: "flex", color: "#FFAE00" }}>•</span>
          <span style={{ display: "flex" }}>Speaker on AI &amp; Technology in Africa</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}

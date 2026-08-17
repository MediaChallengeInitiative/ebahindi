import { ImageResponse } from "next/og";
import { site, hero } from "@/content/site";

export const alt = `${site.formalName} — Software Engineer, AI Practitioner and Speaker`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Link preview card. This is what conference organisers see when the link is
 * pasted into WhatsApp or LinkedIn, so it leads with the brand statement.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A1B2E",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
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
            background: "radial-gradient(circle, rgba(255,182,39,0.22) 0%, rgba(255,182,39,0) 68%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#FFB627",
              color: "#0A1B2E",
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
              color: "#94A3B8",
              fontSize: 21,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontFamily: "Arial, sans-serif",
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
            {hero.headline.lead}&nbsp;
            <span style={{ color: "#FFB627", fontStyle: "italic" }}>{hero.headline.accent}</span>
            &nbsp;{hero.headline.tail}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 23,
            color: "#94A3B8",
            fontFamily: "Arial, sans-serif",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 26,
          }}
        >
          <span style={{ display: "flex" }}>Software Engineer</span>
          <span style={{ display: "flex", color: "#FFB627" }}>•</span>
          <span style={{ display: "flex" }}>AI Practitioner</span>
          <span style={{ display: "flex", color: "#FFB627" }}>•</span>
          <span style={{ display: "flex" }}>Speaker on AI &amp; Technology in Africa</span>
        </div>
      </div>
    ),
    size,
  );
}

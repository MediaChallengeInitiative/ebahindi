import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon built from his monogram. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#061D1E",
          color: "#FFAE00",
          fontSize: 32,
          fontWeight: 700,
          fontFamily: "Figtree, Arial, sans-serif",
          letterSpacing: -1,
          borderRadius: 12,
        }}
      >
        {site.monogram}
      </div>
    ),
    size,
  );
}

import type { Config } from "tailwindcss";

/**
 * Design tokens ported from the Ovro template
 * (Ovro/public/assets/scss/utils/_colors.scss): deep teal ground, a single
 * amber accent, and white/alpha lines. No second accent colour by design.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          900: "#061D1E", // page ground
          800: "#0A2526", // raised panel
          700: "#1F3434", // card / hover ground
        },
        amber: {
          DEFAULT: "#FFAE00",
          2: "#FAB41D",
          deep: "#B87A00", // amber that still passes AA on light grounds
        },
        ink: "#0E161F", // text on amber
        line: {
          DEFAULT: "rgba(255,255,255,0.20)",
          soft: "rgba(255,255,255,0.10)",
        },
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "Times New Roman", "serif"],
      },
      letterSpacing: {
        label: "0.16em",
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(0,0,0,0.35), 0 18px 46px -22px rgba(0,0,0,0.75)",
        lift: "0 2px 6px rgba(0,0,0,0.4), 0 30px 60px -24px rgba(0,0,0,0.85)",
        amber: "0 10px 40px -12px rgba(255,174,0,0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        caret: {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spinSlow 18s linear infinite",
        caret: "caret 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

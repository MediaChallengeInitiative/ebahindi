import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1B2E",
          deep: "#06121F",
          soft: "#102942",
          line: "#1C3350",
        },
        amber: {
          DEFAULT: "#FFB627",
          ink: "#D9760A",
        },
        slate: {
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,27,46,0.06), 0 8px 24px -12px rgba(10,27,46,0.18)",
        "card-hover": "0 2px 4px rgba(10,27,46,0.08), 0 20px 44px -16px rgba(10,27,46,0.28)",
        "card-dark": "0 1px 2px rgba(0,0,0,0.4), 0 16px 40px -18px rgba(0,0,0,0.7)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        ring: {
          "0%": { transform: "scale(0.85)", opacity: "0.55" },
          "70%": { opacity: "0" },
          "100%": { transform: "scale(1.7)", opacity: "0" },
        },
        caret: {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        ring: "ring 3.6s cubic-bezier(0.22,1,0.36,1) infinite",
        caret: "caret 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

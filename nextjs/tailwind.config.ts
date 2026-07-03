import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./hooks/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx,mdx}",
    "./data/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        background: "hsl(220 32% 5%)",
        foreground: "hsl(210 30% 92%)",
        panel: "hsl(220 28% 8%)",
        "panel-border": "hsl(220 20% 16%)",
        muted: "hsl(215 16% 58%)",
        ice: {
          DEFAULT: "hsl(178 65% 70%)",
          dim: "hsl(178 40% 40%)",
        },
        amber: {
          DEFAULT: "hsl(38 92% 62%)",
          dim: "hsl(38 60% 35%)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        fall: {
          "0%": { transform: "translateY(-10vh) translateX(0)", opacity: "0" },
          "10%": { opacity: "var(--flake-opacity, 0.7)" },
          "100%": { transform: "translateY(110vh) translateX(var(--drift, 20px))", opacity: "0.1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
        twinkle: "twinkle 3.5s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      backgroundImage: {
        aurora:
          "radial-gradient(60% 60% at 20% 20%, hsl(178 65% 30% / 0.18), transparent 60%), radial-gradient(50% 50% at 80% 10%, hsl(38 92% 40% / 0.12), transparent 60%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
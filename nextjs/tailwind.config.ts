import type { Config } from "tailwindcss";

/**
 * Design tokens live in app/globals.css as CSS variables (light + dark).
 * Tailwind just exposes them as utilities, so a theme switch never needs
 * `dark:` variants sprinkled through components.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./hooks/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx,mdx}",
    "./data/**/*.{ts,tsx,mdx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        bg: token("bg"),
        ink: token("ink"),
        card: token("card"),
        soft: token("soft"),
        line: token("line"),
        onaccent: token("on-accent"),
        grape: { DEFAULT: token("grape"), tint: token("grape-tint") },
        tangerine: { DEFAULT: token("tangerine"), tint: token("tangerine-tint") },
        bubblegum: { DEFAULT: token("bubblegum"), tint: token("bubblegum-tint") },
        sun: { DEFAULT: token("sun"), tint: token("sun-tint") },
        mint: { DEFAULT: token("mint"), tint: token("mint-tint") },
        sky: { DEFAULT: token("sky"), tint: token("sky-tint") },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-rounded", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // Hard, offset "sticker" shadows. Color follows the theme.
        "pop-sm": "2px 2px 0 0 rgb(var(--shadow))",
        pop: "4px 4px 0 0 rgb(var(--shadow))",
        "pop-lg": "7px 7px 0 0 rgb(var(--shadow))",
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0) scale(1, 1)" },
          "50%": { transform: "translateY(-18px) scale(0.94, 1.06)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
      },
      animation: {
        bob: "bob 0.9s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

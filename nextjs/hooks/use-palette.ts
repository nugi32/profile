"use client";

import { useTheme } from "@/components/providers/theme-provider";

/**
 * Hex colors for the few places that cannot read CSS variables (recharts
 * takes plain color strings). Kept in step with the tokens in globals.css.
 */
const light = {
  ink: "#1B1633",
  soft: "#5B547A",
  card: "#FFFFFF",
  grape: "#6C4DFF",
  tangerine: "#FF7A3D",
  mint: "#2ED8A3",
  grid: "rgba(27,22,51,0.12)",
};

const dark = {
  ink: "#F2EEFF",
  soft: "#B2AAD6",
  card: "#221C44",
  grape: "#9A85FF",
  tangerine: "#FF9A66",
  mint: "#43E6B3",
  grid: "rgba(190,180,245,0.18)",
};

export function usePalette() {
  const { theme } = useTheme();
  return theme === "dark" ? dark : light;
}

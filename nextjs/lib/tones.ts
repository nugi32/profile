/**
 * The six accent colors, and the class names that go with each.
 *
 * Tailwind only generates classes it can see as complete strings in source,
 * so every class is spelled out here rather than built with template
 * literals.
 */
export type Tone = "grape" | "tangerine" | "bubblegum" | "sun" | "mint" | "sky";

export const TONES: Tone[] = ["grape", "tangerine", "mint", "bubblegum", "sky", "sun"];

/** Pick a tone by position, so neighbouring cards never share a color. */
export function toneAt(index: number): Tone {
  return TONES[((index % TONES.length) + TONES.length) % TONES.length];
}

/** Soft background, for cards. Text on top is always plain ink. */
export const tint: Record<Tone, string> = {
  grape: "bg-grape-tint",
  tangerine: "bg-tangerine-tint",
  bubblegum: "bg-bubblegum-tint",
  sun: "bg-sun-tint",
  mint: "bg-mint-tint",
  sky: "bg-sky-tint",
};

/** Saturated background, for small badges, icons, and bars. */
export const solid: Record<Tone, string> = {
  grape: "bg-grape text-white",
  tangerine: "bg-tangerine text-onaccent",
  bubblegum: "bg-bubblegum text-onaccent",
  sun: "bg-sun text-onaccent",
  mint: "bg-mint text-onaccent",
  sky: "bg-sky text-onaccent",
};

/** Bare fill color, for bars and dots where text color is set elsewhere. */
export const fill: Record<Tone, string> = {
  grape: "bg-grape",
  tangerine: "bg-tangerine",
  bubblegum: "bg-bubblegum",
  sun: "bg-sun",
  mint: "bg-mint",
  sky: "bg-sky",
};

/** Reading-list status → tone. */
export function statusTone(status: string): Tone {
  const value = status.toLowerCase();
  if (value === "reading") return "sun";
  if (value === "finished") return "mint";
  return "sky";
}

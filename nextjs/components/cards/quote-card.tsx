import { cn } from "@/lib/utils";
import { tint, type Tone } from "@/lib/tones";
import type { WeirdThought } from "@/types";

/** A sticky note. The tilt is fixed per note and flattens on hover. */
export function QuoteCard({
  thought,
  tone = "sun",
  tilt = 0,
}: {
  thought: WeirdThought;
  tone?: Tone;
  tilt?: number;
}) {
  return (
    <figure
      className={cn(
        "sticker h-full rotate-[var(--tilt)] p-7 transition-transform duration-200 hover:rotate-0 hover:scale-[1.02]",
        tint[tone]
      )}
      style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
    >
      <blockquote className="font-display text-2xl font-bold leading-snug">
        &ldquo;{thought.quote}&rdquo;
      </blockquote>
      {thought.context && (
        <figcaption className="mt-4 text-sm font-semibold text-soft">{thought.context}</figcaption>
      )}
    </figure>
  );
}

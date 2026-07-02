import type { WeirdThought } from "@/types";

export function QuoteCard({ thought }: { thought: WeirdThought }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-panel-border bg-panel/50 p-8">
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-ice/10 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
      <p className="font-display text-xl italic leading-relaxed text-foreground/90">
        "{thought.quote}"
      </p>
    </div>
  );
}

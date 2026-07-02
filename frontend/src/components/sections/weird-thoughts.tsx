import { SectionHeader } from "@/components/layout/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { QuoteCard } from "@/components/cards/quote-card";
import { weirdThoughts } from "@/data/weird-thoughts";

export function WeirdThoughts() {
  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Off To The Side"
        title="Weird Thoughts"
        description="Strange, abstract ideas that didn't fit anywhere else but were worth keeping."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {weirdThoughts.map((thought, i) => (
          <ScrollReveal key={thought.quote} delay={i * 0.05}>
            <QuoteCard thought={thought} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

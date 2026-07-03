import { JournalCard } from "../../components/cards/journal-card";
import { SectionHeader } from "../../components/layout/section-header";
import { ScrollReveal } from "../../components/ui/scroll-reveal";
import { journalEntries } from "../../data/journal";

export default function JournalPage() {
  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Journal"
        title="Public Notes"
        description="A chronological archive of research notes, ideas, and observations from the lab."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {journalEntries.map((entry, index) => (
          <ScrollReveal key={entry.slug} delay={index * 0.05}>
            <JournalCard entry={entry} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

import { JournalCard } from "../../components/cards/journal-card";
import { SectionHeader } from "../../components/layout/section-header";
import { ScrollReveal } from "../../components/ui/scroll-reveal";
import { getNotionJournalEntries } from "@/lib/notion";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const entries = await getNotionJournalEntries();

  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Journal"
        title="Public Notes"
        description="A chronological archive of research notes, ideas, and observations from the lab."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry, index) => (
          <ScrollReveal key={entry.slug} delay={index * 0.05}>
            <JournalCard entry={entry} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

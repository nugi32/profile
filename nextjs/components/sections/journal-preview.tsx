import Link from "next/link";
import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { JournalCard } from "../cards/journal-card";
import { Button } from "../ui/button";
import type { JournalEntry } from "@/types";

export function JournalPreview({ entries }: { entries: JournalEntry[] }) {
  return (
    <section id="journal" className="container py-24">
      <SectionHeader
        eyebrow="Notebook"
        title="Journal"
        description="Public notes, synced from a Notion workspace, on markets, systems, and strange questions."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.slice(0, 3).map((entry, i) => (
          <ScrollReveal key={entry.slug} delay={i * 0.05}>
            <JournalCard entry={entry} />
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link href="/journal">
          <Button variant="outline">Read the full journal</Button>
        </Link>
      </div>
    </section>
  );
}

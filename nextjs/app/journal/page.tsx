"use client";

import { JournalCard } from "../../components/cards/journal-card";
import { LuNotebookPen } from "react-icons/lu";
import { SectionHeader } from "../../components/layout/section-header";
import { toneAt } from "@/lib/tones";
import { useCms } from "@/components/providers/cms-provider";

export default function JournalPage() {
  // Notion-backed journal, loaded by <CmsProvider> via /api/journal-entries
  const { journal } = useCms();

  return (
    // min-h keeps short archives from leaving a gap above the footer.
    <section className="container flex min-h-[60vh] flex-col py-10">
      <SectionHeader
        icon={LuNotebookPen}
        title="Notes from my brain"
        description="Everything I've written down so far, newest first."
        tone="sun"
      />

      {journal.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-line/40 p-12 text-center">
          <p className="text-soft">
            No notes yet. The first one is probably being written right now!
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {journal.map((entry, index) => (
            <JournalCard key={entry.slug} entry={entry} tone={toneAt(index + 5)} />
          ))}
        </div>
      )}
    </section>
  );
}

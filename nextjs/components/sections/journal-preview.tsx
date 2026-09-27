"use client";

import Link from "next/link";
import { LuNotebookPen } from "react-icons/lu";
import { SectionHeader } from "../layout/section-header";
import { JournalCard } from "../cards/journal-card";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { buttonVariants } from "../ui/button";
import { toneAt } from "@/lib/tones";
import { useCms } from "../providers/cms-provider";

export function JournalPreview() {
  // Notion-backed journal (newest first) — not a CMS collection
  const { journal } = useCms();

  if (journal.length === 0) return null;

  return (
    <Reveal as="section" id="journal" className="container py-16 md:py-20">
      <SectionHeader
        icon={LuNotebookPen}
        title="Notes from my brain"
        description="Fresh thoughts on markets, systems, and strange questions. Written in Notion, published here."
        tone="sun"
      />
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {journal.slice(0, 3).map((entry, i) => (
          <StaggerItem key={entry.slug} className="h-full">
            <JournalCard entry={entry} tone={toneAt(i + 5)} />
          </StaggerItem>
        ))}
      </Stagger>
      <div className="mt-10 flex justify-center">
        <Link href="/journal" className={buttonVariants({ variant: "outline" })}>
          Read the whole journal
        </Link>
      </div>
    </Reveal>
  );
}

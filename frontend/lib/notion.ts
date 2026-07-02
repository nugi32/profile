import { journalEntries } from "@/data/journal";
import type { JournalEntry } from "@/types";

export async function getNotionJournalEntries(): Promise<JournalEntry[]> {
  await simulateNetworkDelay();
  return [...journalEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getNotionJournalEntryBySlug(
  slug: string
): Promise<JournalEntry | undefined> {
  await simulateNetworkDelay();
  return journalEntries.find((entry) => entry.slug === slug);
}

function simulateNetworkDelay() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

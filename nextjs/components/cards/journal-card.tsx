import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Tag } from "../ui/tag";
import type { JournalEntry } from "@/types";

export function JournalCard({ entry }: { entry: JournalEntry }) {
  return (
    <Link
      href={`/journal/${entry.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-panel-border bg-panel/50 p-6 transition-colors hover:border-ice/40"
    >
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>{formatDate(entry.date)}</span>
        <span>{entry.readingTime} min read</span>
      </div>
      <h3 className="font-display text-xl text-foreground/95 group-hover:text-ice">{entry.title}</h3>
      <p className="text-sm leading-relaxed text-muted">{entry.description}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}

import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { tint, type Tone } from "@/lib/tones";
import { Tag } from "../ui/tag";
import type { JournalEntry } from "@/types";

export function JournalCard({ entry, tone = "sun" }: { entry: JournalEntry; tone?: Tone }) {
  return (
    <Link
      href={`/journal/${entry.slug}`}
      className={cn("sticker pressable flex h-full flex-col gap-3 p-6", tint[tone])}
    >
      {entry.date && (
        <span className="text-sm font-bold text-soft">{formatDate(entry.date)}</span>
      )}
      <h3 className="font-display text-2xl font-extrabold leading-tight">{entry.title}</h3>
      {entry.description && <p className="leading-relaxed text-ink/80">{entry.description}</p>}
      {entry.tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {entry.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </Link>
  );
}

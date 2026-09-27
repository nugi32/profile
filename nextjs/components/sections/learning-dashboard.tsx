"use client";

import { LuGraduationCap, LuSprout, LuBookOpen, LuFlaskConical } from "react-icons/lu";
import type { IconType } from "react-icons";
import { SectionHeader } from "../layout/section-header";
import { ProgressBar } from "../ui/progress-bar";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { cn } from "@/lib/utils";
import { statusTone, tint, toneAt } from "@/lib/tones";
import { useCms } from "../providers/cms-provider";

function EmptyNote({ text }: { text: string }) {
  return <p className="mt-3 text-soft">{text}</p>;
}

function QueueList({
  title,
  icon: Icon,
  items,
  emptyText,
}: {
  title: string;
  icon: IconType;
  items: Array<{ title: string; author: string; status: string }>;
  emptyText: string;
}) {
  return (
    <div className="sticker h-full p-6">
      <h3 className="flex items-center gap-2.5 font-display text-2xl font-extrabold">
        <Icon size={22} className="shrink-0" aria-hidden="true" />
        {title}
      </h3>
      {items.length === 0 ? (
        <EmptyNote text={emptyText} />
      ) : (
        <ul className="mt-5 flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.title} className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold leading-snug">{item.title}</p>
                <p className="text-sm text-soft">{item.author}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full border-2 border-line px-3 py-0.5 text-xs font-bold text-ink",
                  tint[statusTone(item.status)]
                )}
              >
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function LearningDashboard() {
  // CMS collections: learning-items, books, papers
  const { learning, books, papers } = useCms();

  // If none of this section's collections have anything published, hide the
  // whole section rather than showing three empty panels.
  if (learning.length === 0 && books.length === 0 && papers.length === 0) {
    return null;
  }

  return (
    <Reveal as="section" id="learning" className="container py-16 md:py-20">
      <SectionHeader
        icon={LuGraduationCap}
        title="Learning corner"
        description="What I'm studying right now, and what's waiting in line."
        tone="bubblegum"
      />
      <Stagger className="grid gap-5 lg:grid-cols-3">
        <StaggerItem className="sticker h-full bg-tangerine-tint p-6">
          <h3 className="flex items-center gap-2.5 font-display text-2xl font-extrabold">
            <LuSprout size={22} className="shrink-0" aria-hidden="true" />
            Learning now
          </h3>
          {learning.length === 0 ? (
            <EmptyNote text="Nothing in progress yet." />
          ) : (
            <div className="mt-5 flex flex-col gap-5">
              {learning.map((item, i) => (
                <div key={item.topic}>
                  <div className="mb-1.5 flex justify-between gap-3 text-sm">
                    <span className="font-semibold">{item.topic}</span>
                    <span className="font-bold text-soft">{item.progress}%</span>
                  </div>
                  <ProgressBar value={item.progress} tone={toneAt(i + 1)} />
                </div>
              ))}
            </div>
          )}
        </StaggerItem>

        <StaggerItem className="h-full">
          <QueueList title="Reading queue" icon={LuBookOpen} items={books} emptyText="No books listed yet." />
        </StaggerItem>
        <StaggerItem className="h-full">
          <QueueList title="Research queue" icon={LuFlaskConical} items={papers} emptyText="No papers listed yet." />
        </StaggerItem>
      </Stagger>
    </Reveal>
  );
}

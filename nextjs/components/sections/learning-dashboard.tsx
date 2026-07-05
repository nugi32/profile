"use client";

import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { ProgressBar } from "../ui/progress-bar";
import type { Book, LearningItem, Paper } from "@/types";

interface LearningDashboardProps {
  learning: LearningItem[] | null;
  books: Book[] | null;
  papers: Paper[] | null;
  error?: string | null;
  loading?: boolean;
}

function QueueList({
  title,
  items,
}: {
  title: string;
  items: Array<{ title: string; author: string; status: string }>;
}) {
  return (
    <div className="rounded-2xl border border-panel-border bg-panel/50 p-6">
      <h3 className="font-mono text-xs uppercase tracking-wider text-ice">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.title} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-foreground/90">{item.title}</p>
              <p className="text-xs text-muted">{item.author}</p>
            </div>
            <span className="shrink-0 rounded-full border border-panel-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LearningDashboard({ 
  learning, 
  books, 
  papers, 
  error, 
  loading 
}: LearningDashboardProps) {
  const noData = !learning?.length || !books?.length || !papers?.length;

  if (error) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Queue"
          title="Learning Dashboard"
          description="What's currently being absorbed, and what's next in line."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-red-400">
          <p>Unable to load learning dashboard data.</p>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Queue"
          title="Learning Dashboard"
          description="What's currently being absorbed, and what's next in line."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-ice">
          Loading learning dashboard...
        </div>
      </section>
    );
  }

  if (noData) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Queue"
          title="Learning Dashboard"
          description="What's currently being absorbed, and what's next in line."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-muted">
          No learning dashboard data is available from the CMS.
        </div>
      </section>
    );
  }

  const learningItems = learning ?? [];
  const booksItems = books ?? [];
  const papersItems = papers ?? [];

  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Queue"
        title="Learning Dashboard"
        description="What's currently being absorbed, and what's next in line."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        <ScrollReveal className="lg:col-span-1">
          <div className="rounded-2xl border border-panel-border bg-panel/50 p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-ice">
              Currently Learning
            </h3>
            <div className="mt-4 flex flex-col gap-4">
              {learningItems.map((item) => (
                <div key={item.topic}>
                  <div className="mb-1.5 flex justify-between font-mono text-xs text-muted">
                    <span className="text-foreground/80">{item.topic}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <ProgressBar value={item.progress} accent="amber" />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="lg:col-span-1">
          <QueueList title="Reading Queue" items={booksItems} />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="lg:col-span-1">
          <QueueList title="Research Queue" items={papersItems} />
        </ScrollReveal>
      </div>
    </section>
  );
}

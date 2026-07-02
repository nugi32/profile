import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { ProgressBar } from "../ui/progress-bar";
import { currentlyLearning } from "../../data/learning";
import { books } from "../../data/books";
import { papers } from "../../data/papers";

function QueueList({
  title,
  items,
}: {
  title: string;
  items: { title: string; author: string; status: string }[];
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

export function LearningDashboard() {
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
              {currentlyLearning.map((item) => (
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
          <QueueList title="Reading Queue" items={books} />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="lg:col-span-1">
          <QueueList title="Research Queue" items={papers} />
        </ScrollReveal>
      </div>
    </section>
  );
}

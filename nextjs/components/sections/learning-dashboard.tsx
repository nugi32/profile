"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { ProgressBar } from "../ui/progress-bar";
import { fetchFromCms } from "@/lib/fetcher";
import type { Book, LearningItem, Paper } from "@/types";

type CmsCollectionResponse<T> = {
  docs: T[];
};

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

export function LearningDashboard() {
  const [learningData, setLearningData] = useState<LearningItem[] | null>(null);
  const [booksData, setBooksData] = useState<Book[] | null>(null);
  const [papersData, setPapersData] = useState<Paper[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchDashboardData = async () => {
      try {
        setError("");
        setNoData(false);
        setLoading(true);

        const [learningResponse, booksResponse, papersResponse] = await Promise.all([
          fetchFromCms<CmsCollectionResponse<LearningItem>>("api/learning-items"),
          fetchFromCms<CmsCollectionResponse<Book>>("api/books"),
          fetchFromCms<CmsCollectionResponse<Paper>>("api/papers"),
        ]);

        if (!mounted) return;

        const learningItems = learningResponse.docs ?? [];
        const books = booksResponse.docs ?? [];
        const papers = papersResponse.docs ?? [];

        setLearningData(learningItems);
        setBooksData(books);
        setPapersData(papers);

        if (!learningItems.length || !books.length || !papers.length) {
          setNoData(true);
        }
      } catch (err: any) {
        if (!mounted) return;
        console.error(err);
        setError(err.message || "Failed to load learning dashboard data");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      mounted = false;
    };
  }, []);

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
              {learningData!.map((item) => (
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
          <QueueList title="Reading Queue" items={booksData!} />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="lg:col-span-1">
          <QueueList title="Research Queue" items={papersData!} />
        </ScrollReveal>
      </div>
    </section>
  );
}

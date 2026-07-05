"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../layout/section-header";
import { useCmsData } from "@/hooks/useCmsData";
import { cn } from "@/lib/utils";
import type { TimelineYear } from "@/types";

export function Timeline() {
  const { data, loading, error, noData } = useCmsData<TimelineYear>("api/timeline");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (data?.length) {
      setActive(data.length - 1);
    }
  }, [data]);

  if (error) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Growth"
          title="Intellectual Development Timeline"
          description="A typed sequence — each year builds on the concepts of the one before it."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-red-400">
          <p>Unable to load timeline data.</p>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Growth"
          title="Intellectual Development Timeline"
          description="A typed sequence — each year builds on the concepts of the one before it."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-ice">
          Loading timeline...
        </div>
      </section>
    );
  }

  if (noData || !data?.length) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Growth"
          title="Intellectual Development Timeline"
          description="A typed sequence — each year builds on the concepts of the one before it."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-muted">
          No timeline entries are available from the CMS.
        </div>
      </section>
    );
  }

  const normalizedTimeline = (data ?? []).map((entry) => ({
    ...entry,
    items:
      entry.items?.map((item) => {
        if (typeof item === "string") {
          return item;
        }

        return (item as { item?: string } | null)?.item || "";
      }) ?? [],
  }));

  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Growth"
        title="Intellectual Development Timeline"
        description="A typed sequence — each year builds on the concepts of the one before it."
      />

      <div className="flex flex-wrap gap-2">
        {normalizedTimeline.map((entry, i) => (
          <button
            key={entry.year}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-xs transition-colors",
              active === i
                ? "border-ice bg-ice/10 text-ice"
                : "border-panel-border text-muted hover:text-foreground"
            )}
          >
            {entry.year}
          </button>
        ))}
      </div>

      <div className="relative mt-10 border-l border-panel-border pl-8">
        {normalizedTimeline.map((entry, i) => (
          <motion.div
            key={entry.year}
            className="relative mb-10 last:mb-0"
            initial={false}
            animate={{ opacity: active === i ? 1 : 0.4 }}
          >
            <span
              className={cn(
                "absolute -left-[41px] top-1 h-3 w-3 rounded-full border-2",
                active === i
                  ? "border-ice bg-ice"
                  : "border-panel-border bg-background"
              )}
            />
            <p className="font-mono text-xs uppercase tracking-wider text-ice">
              {entry.year} — {entry.theme}
            </p>
            <ul className="mt-2 flex flex-col gap-1">
              {entry.items.map((item) => (
                <li key={item} className="text-foreground/85">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

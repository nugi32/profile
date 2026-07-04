"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { getIcon } from "@/lib/icon-map";
import { fetchFromCms } from "@/lib/fetcher";
import type { CurrentFocusItem } from "@/types";

type CmsCollectionResponse<T> = {
  docs: T[];
};

export function CurrentFocus() {
  const [data, setData] = useState<CurrentFocusItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchCurrentFocus = async () => {
      try {
        setError("");
        setNoData(false);
        setLoading(true);

        const response = await fetchFromCms<CmsCollectionResponse<CurrentFocusItem>>("api/current-focus");
        if (!mounted) return;

        const items = response.docs ?? [];
        if (!items.length) {
          setNoData(true);
          return;
        }

        setData(items);
      } catch (err: any) {
        if (!mounted) return;
        console.error(err);
        setError(err.message || "Failed to load current focus items");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCurrentFocus();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Right Now"
          title="Current Focus"
          description="What's actively occupying the research queue."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-red-400">
          <p>Unable to load current focus items.</p>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Right Now"
          title="Current Focus"
          description="What's actively occupying the research queue."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-ice">
          Loading current focus items...
        </div>
      </section>
    );
  }

  if (noData || !data?.length) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Right Now"
          title="Current Focus"
          description="What's actively occupying the research queue."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-muted">
          No current focus data is available from the CMS.
        </div>
      </section>
    );
  }

  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Right Now"
        title="Current Focus"
        description="What's actively occupying the research queue."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, i) => {
          const Icon = getIcon(item.icon);
          return (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-panel-border bg-panel/50 p-6 transition-colors hover:border-ice/40">
                <Icon className="text-ice" size={20} />
                <h3 className="mt-4 font-display text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { QuoteCard } from "../cards/quote-card";
import { fetchFromCms } from "@/lib/fetcher";
import type { WeirdThought } from "@/types";

type CmsCollectionResponse<T> = {
  docs: T[];
};

export function WeirdThoughts() {
  const [data, setData] = useState<WeirdThought[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchWeirdThoughts = async () => {
      try {
        setError("");
        setNoData(false);
        setLoading(true);

        const response = await fetchFromCms<CmsCollectionResponse<WeirdThought>>("api/weird-thoughts");
        if (!mounted) return;

        const thoughts = response.docs ?? [];
        if (!thoughts.length) {
          setNoData(true);
          return;
        }

        setData(thoughts);
      } catch (err: any) {
        if (!mounted) return;
        console.error(err);
        setError(err.message || "Failed to load weird thoughts");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchWeirdThoughts();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Off To The Side"
          title="Weird Thoughts"
          description="Strange, abstract ideas that didn't fit anywhere else but were worth keeping."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-red-400">
          <p>Unable to load weird thoughts.</p>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Off To The Side"
          title="Weird Thoughts"
          description="Strange, abstract ideas that didn't fit anywhere else but were worth keeping."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-ice">
          Loading weird thoughts...
        </div>
      </section>
    );
  }

  if (noData || !data?.length) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Off To The Side"
          title="Weird Thoughts"
          description="Strange, abstract ideas that didn't fit anywhere else but were worth keeping."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-muted">
          No weird thoughts are available from the CMS.
        </div>
      </section>
    );
  }

  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Off To The Side"
        title="Weird Thoughts"
        description="Strange, abstract ideas that didn't fit anywhere else but were worth keeping."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((thought, i) => (
          <ScrollReveal key={thought.quote} delay={i * 0.05}>
            <QuoteCard thought={thought} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

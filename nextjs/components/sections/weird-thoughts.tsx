"use client";

import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { QuoteCard } from "../cards/quote-card";
import { useCmsData } from "@/hooks/useCmsData";
import type { WeirdThought } from "@/types";

export function WeirdThoughts() {
  const { data, loading, error, noData } = useCmsData<WeirdThought>("api/weird-thoughts");

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
        {(data ?? []).map((thought, i) => (
          <ScrollReveal key={thought.quote} delay={i * 0.05}>
            <QuoteCard thought={thought} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

"use client";

import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { SkillCard } from "../cards/skill-card";
import { useCmsData } from "@/hooks/useCmsData";
import type { SkillCategory } from "@/types";

export function Skills() {
  const { data, loading, error, noData } = useCmsData<SkillCategory>("api/skills");

  if (error) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Toolkit"
          title="Skills"
          description="The instruments used across the lab, grouped by discipline."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-red-400">
          <p>Unable to load skills from the CMS.</p>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Toolkit"
          title="Skills"
          description="The instruments used across the lab, grouped by discipline."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-ice">
          Loading skills...
        </div>
      </section>
    );
  }

  if (noData || !data?.length) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Toolkit"
          title="Skills"
          description="The instruments used across the lab, grouped by discipline."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-muted">
          No skill categories are available from the CMS.
        </div>
      </section>
    );
  }

  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Toolkit"
        title="Skills"
        description="The instruments used across the lab, grouped by discipline."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {(data ?? []).map((category, i) => (
          <ScrollReveal key={category.category} delay={i * 0.05}>
            <SkillCard category={category} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

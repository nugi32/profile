"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { SkillCard } from "../cards/skill-card";
import { fetchFromCms } from "@/lib/fetcher";
import type { SkillCategory } from "@/types";

type CmsCollectionResponse<T> = {
  docs: T[];
};

export function Skills() {
  const [data, setData] = useState<SkillCategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchSkills = async () => {
      try {
        setError("");
        setNoData(false);
        setLoading(true);

        const response = await fetchFromCms<CmsCollectionResponse<SkillCategory>>("api/skills");
        if (!mounted) return;

        const categories = response.docs ?? [];
        if (!categories.length) {
          setNoData(true);
          return;
        }

        setData(categories);
      } catch (err: any) {
        if (!mounted) return;
        console.error(err);
        setError(err.message || "Failed to load skills");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchSkills();

    return () => {
      mounted = false;
    };
  }, []);

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
        {data.map((category, i) => (
          <ScrollReveal key={category.category} delay={i * 0.05}>
            <SkillCard category={category} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

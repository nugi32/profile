"use client";

import { SectionHeader } from "../../components/layout/section-header";
import { ScrollReveal } from "../../components/ui/scroll-reveal";
import { ProjectCard } from "../../components/cards/project-card";
import { useCmsData } from "@/hooks/useCmsData";
import type { Project } from "@/types";

export default function ProjectsPage() {
  const { data, loading, error, noData } = useCmsData<Project>("api/projects?depth=1");

  if (error) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Projects"
          title="Project Portfolio"
          description="A catalog of systems, experiments, and infrastructure pieces that shape the lab."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-red-400">
          <p>Unable to load projects.</p>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Projects"
          title="Project Portfolio"
          description="A catalog of systems, experiments, and infrastructure pieces that shape the lab."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-ice">
          Loading projects...
        </div>
      </section>
    );
  }

  if (noData || !data?.length) {
    return (
      <section className="container py-24">
        <SectionHeader
          eyebrow="Projects"
          title="Project Portfolio"
          description="A catalog of systems, experiments, and infrastructure pieces that shape the lab."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-muted">
          No projects are available from the CMS.
        </div>
      </section>
    );
  }

  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Projects"
        title="Project Portfolio"
        description="A catalog of systems, experiments, and infrastructure pieces that shape the lab."
      />
      <div className="grid gap-8">
        {data.map((project, index) => (
          <ScrollReveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} reverse={index % 2 === 1} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

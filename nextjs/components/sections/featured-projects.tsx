"use client";

import Link from "next/link";
import { SectionHeader } from "../layout/section-header";
import { ScrollReveal } from "../ui/scroll-reveal";
import { ProjectCard } from "../cards/project-card";
import { Button } from "../ui/button";
import { useCmsData } from "@/hooks/useCmsData";
import type { Project } from "@/types";

export function FeaturedProjects() {
  const { data, loading, error, noData } = useCmsData<Project>("api/projects?depth=1");

  if (error) {
    return (
      <section id="projects" className="container py-24">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured Projects"
          description="A product showcase of the systems that make up the research lab."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-red-400">
          <p>Unable to load featured projects.</p>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="projects" className="container py-24">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured Projects"
          description="A product showcase of the systems that make up the research lab."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-ice">
          Loading featured projects...
        </div>
      </section>
    );
  }

  if (noData || !data?.length) {
    return (
      <section id="projects" className="container py-24">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured Projects"
          description="A product showcase of the systems that make up the research lab."
        />
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-muted">
          No featured projects are available from the CMS.
        </div>
      </section>
    );
  }

  const featured = (data ?? []).filter((project) => project.featured);

  return (
    <section id="projects" className="container py-24">
      <SectionHeader
        eyebrow="Selected Work"
        title="Featured Projects"
        description="A product showcase of the systems that make up the research lab."
      />
      <div className="flex flex-col gap-8">
        {featured.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i * 0.05}>
            <ProjectCard project={project} reverse={i % 2 === 1} />
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link href="/projects">
          <Button variant="outline">View all projects</Button>
        </Link>
      </div>
    </section>
  );
}

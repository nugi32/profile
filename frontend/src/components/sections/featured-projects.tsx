import Link from "next/link";
import { SectionHeader } from "@/components/layout/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ProjectCard } from "@/components/cards/project-card";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="container py-24">
      <SectionHeader
        eyebrow="Selected Work"
        title="Featured Projects"
        description="A product showcase of the systems that make up the research lab."
      />
      <div className="flex flex-col gap-8">
        {projects.map((project, i) => (
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

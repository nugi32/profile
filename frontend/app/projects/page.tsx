import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/layout/section-header";
import { ProjectCard } from "@/components/cards/project-card";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <section className="container py-24">
      <SectionHeader
        eyebrow="Projects"
        title="Project Portfolio"
        description="A catalog of systems, experiments, and infrastructure pieces that shape the lab."
      />
      <div className="grid gap-8">
        {projects.map((project, index) => (
          <ScrollReveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} reverse={index % 2 === 1} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

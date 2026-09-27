"use client";

import { LuWrench } from "react-icons/lu";
import { SectionHeader } from "../../components/layout/section-header";
import { ProjectCard } from "../../components/cards/project-card";
import { toneAt } from "@/lib/tones";
import { useCms } from "@/components/providers/cms-provider";

export default function ProjectsPage() {
  // CMS collection: projects
  const { projects } = useCms();

  return (
    <section className="container flex min-h-[60vh] flex-col py-10">
      <SectionHeader
        icon={LuWrench}
        title="Everything I've built"
        description="Experiments, tools and systems: the finished ones and the still-cooking ones."
        tone="grape"
      />

      {projects.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-line/40 p-12 text-center">
          <p className="text-soft">No projects here yet. The workshop is warming up!</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              reverse={index % 2 === 1}
              tone={toneAt(index * 2)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

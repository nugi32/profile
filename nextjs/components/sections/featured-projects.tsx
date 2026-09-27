"use client";

import Link from "next/link";
import { LuRocket } from "react-icons/lu";
import { SectionHeader } from "../layout/section-header";
import { ProjectCard } from "../cards/project-card";
import { Reveal, Stagger, StaggerItem } from "../motion/reveal";
import { buttonVariants } from "../ui/button";
import { toneAt } from "@/lib/tones";
import { useCms } from "../providers/cms-provider";

export function FeaturedProjects() {
  // CMS collection: projects (filtered on the `featured` boolean field)
  const { projects } = useCms();
  const featured = projects.filter((project) => project.featured);

  if (featured.length === 0) return null;

  return (
    <Reveal as="section" id="projects" className="container py-16 md:py-20">
      <SectionHeader
        icon={LuRocket}
        title="Things I've built"
        description="A few favorites. Each one taught me something I didn't plan to learn."
        tone="grape"
      />

      <Stagger className="flex flex-col gap-8">
        {featured.map((project, i) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} reverse={i % 2 === 1} tone={toneAt(i * 2)} />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-10 flex justify-center">
        <Link href="/projects" className={buttonVariants({ variant: "outline" })}>
          See every project
        </Link>
      </div>
    </Reveal>
  );
}

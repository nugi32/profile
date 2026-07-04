"use client";

import { useMemo } from "react";
import { LuArrowLeft, LuGithub, LuExternalLink } from "react-icons/lu";
import Link from "next/link";
import { Separator } from "../../../components/ui/separator";
import { Badge } from "../../../components/ui/badge";
import { useCmsData } from "@/hooks/useCmsData";
import type { Project } from "@/types";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { data, loading, error, noData } = useCmsData<Project>("api/projects");

  const project = useMemo(
    () => data?.find((project) => project.slug === params.slug),
    [data, params.slug]
  );

  if (error) {
    return (
      <article className="container max-w-3xl py-24">
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-red-400">
          <p>Unable to load project.</p>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      </article>
    );
  }

  if (loading) {
    return (
      <article className="container max-w-3xl py-24">
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-ice">
          Loading project...
        </div>
      </article>
    );
  }

  if (noData || !project) {
    return (
      <article className="container max-w-3xl py-24">
        <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-center text-muted">
          Project not found or no project data is available.
        </div>
      </article>
    );
  }

  return (
      <article className="container max-w-3xl py-24">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.32em] text-muted hover:text-ice"
        >
          <LuArrowLeft size={14} /> All projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge variant={project.accent}>{project.status}</Badge>
          {(project.technologies ?? []).map((tech, index) => {
            const label = typeof tech === "string" ? tech : tech.technology;
            return (
              <Badge key={`${label}-${index}`} variant="outline">
                {label}
              </Badge>
            );
          })}
        </div>

        <h1 className="mt-6 font-display text-4xl sm:text-5xl">{project.name}</h1>
        <p className="mt-3 text-lg text-muted">{project.tagline}</p>

        <div
          className={`mt-10 aspect-[16/9] rounded-3xl border border-panel-border ${
            project.accent === "ice"
              ? "bg-gradient-to-br from-ice/25 via-panel to-background"
              : "bg-gradient-to-br from-amber/25 via-panel to-background"
          }`}
        />

        <p className="mt-10 text-lg leading-relaxed text-foreground/85">
          {project.longDescription}
        </p>

        <Separator className="my-10" />

        <h2 className="font-display text-2xl">Key achievements</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {(project.achievements ?? []).map((achievement, index) => {
            const label = typeof achievement === "string" ? achievement : achievement.achievement;
            return (
              <li key={`${label}-${index}`} className="flex gap-3 text-foreground/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ice" />
                {label}
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-panel-border px-5 py-2.5 text-sm hover:border-ice/50 hover:text-ice"
          >
            <LuGithub size={16} /> View source
          </Link>
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-panel-border px-5 py-2.5 text-sm hover:border-ice/50 hover:text-ice"
            >
              <LuExternalLink size={16} /> Live demo
            </Link>
          )}
        </div>
      </article>
  );
}

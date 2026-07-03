import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuGithub, LuExternalLink } from "react-icons/lu";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { projects } from "../../../data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((project) => project.slug === params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((project) => project.slug === params.slug);
  if (!project) {
    notFound();
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
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
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
        {project.achievements.map((achievement) => (
          <li key={achievement} className="flex gap-3 text-foreground/85">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ice" />
            {achievement}
          </li>
        ))}
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

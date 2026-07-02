import Link from "next/link";
import { LuGithub, LuExternalLink } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectCard({ project, reverse }: { project: Project; reverse?: boolean }) {
  return (
    <div
      className={cn(
        "grid items-center gap-8 rounded-3xl border border-panel-border bg-panel/50 p-6 md:grid-cols-2 md:gap-12 md:p-10",
        reverse && "md:[&>*:first-child]:order-2"
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-2xl border border-panel-border",
          project.accent === "ice"
            ? "bg-gradient-to-br from-ice/25 via-panel to-background"
            : "bg-gradient-to-br from-amber/25 via-panel to-background"
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-4xl text-foreground/20">
            {project.name}
          </span>
        </div>
        <div className="absolute left-4 top-4">
          <Badge variant={project.accent}>{project.status}</Badge>
        </div>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {project.tagline}
        </p>
        <h3 className="mt-2 font-display text-2xl">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        <ul className="mt-5 flex flex-col gap-2">
          {project.achievements.slice(0, 2).map((achievement) => (
            <li key={achievement} className="flex gap-2 text-sm text-foreground/80">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ice" />
              {achievement}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="font-mono text-xs uppercase tracking-wider text-ice hover:underline"
          >
            View project →
          </Link>
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="text-muted hover:text-foreground"
          >
            <LuGithub size={16} />
          </Link>
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Live demo"
              className="text-muted hover:text-foreground"
            >
              <LuExternalLink size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

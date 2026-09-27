import Image from "next/image";
import Link from "next/link";
import { LuGithub, LuExternalLink, LuLock, LuStar, LuTerminal } from "react-icons/lu";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { resolveProjectImage } from "@/lib/project-image";
import { tint, type Tone } from "@/lib/tones";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  reverse,
  tone = "grape",
}: {
  project: Project;
  reverse?: boolean;
  tone?: Tone;
}) {
  const imageSrc = resolveProjectImage(project);
  const accentTone: Tone = project.accent === "amber" ? "sun" : "sky";

  return (
    <article
      className={cn(
        "sticker pressable grid items-center gap-8 p-5 md:grid-cols-2 md:gap-12 md:p-8",
        tint[tone],
        reverse && "md:[&>*:first-child]:order-2"
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-line shadow-pop",
          !imageSrc && tint[accentTone]
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            {/*
              No screenshot to show — common for non-UI projects (CLI tools,
              indexers, backend services, research notebooks). Rather than a
              blank tile, show a "no visual UI" icon plus the project name so
              the card still reads as intentional, not broken/missing.
            */}
            <LuTerminal
              size={40}
              strokeWidth={1.75}
              className="text-ink/25"
              aria-hidden="true"
            />
            <span className="font-display text-2xl font-extrabold text-ink/25 sm:text-3xl">
              {project.name}
            </span>
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge variant={project.accent}>{project.status}</Badge>
        </div>
      </div>

      <div>
        {project.tagline && <p className="font-semibold text-soft">{project.tagline}</p>}
        <h3 className="mt-1 font-display text-3xl font-extrabold leading-tight md:text-4xl">
          {project.name}
        </h3>
        <p className="mt-3 leading-relaxed text-ink/80">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {(project.technologies ?? []).map((tech, index) => {
            const label = typeof tech === "string" ? tech : tech.technology;
            return (
              <Badge key={`${label}-${index}`} variant="default">
                {label}
              </Badge>
            );
          })}
        </div>

        <ul className="mt-5 flex flex-col gap-2">
          {(project.achievements ?? []).slice(0, 2).map((achievement, index) => {
            const label = typeof achievement === "string" ? achievement : achievement.achievement;
            return (
              <li key={`${label}-${index}`} className="flex gap-3 text-ink/85">
                <LuStar size={16} className="mt-1 shrink-0 fill-current" aria-hidden="true" />
                {label}
              </li>
            );
          })}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href={`/projects/${project.slug}`} className={buttonVariants({ size: "sm" })}>
            Take a closer look
          </Link>
          {project.codeVisibility === "private" ? (
            <Link
              href={`/projects/${project.slug}/source`}
              aria-label={`Why ${project.name}'s source isn't public`}
              title="Source is private"
              className="chip flex h-9 w-9 items-center justify-center"
            >
              <LuLock size={15} />
            </Link>
          ) : (
            project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} on GitHub`}
                className="chip flex h-9 w-9 items-center justify-center"
              >
                <LuGithub size={16} />
              </Link>
            )
          )}
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} live demo`}
              className="chip flex h-9 w-9 items-center justify-center"
            >
              <LuExternalLink size={16} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

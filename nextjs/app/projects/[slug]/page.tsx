"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LuArrowLeft, LuGithub, LuExternalLink, LuLock, LuStar, LuSearchX, LuTerminal } from "react-icons/lu";
import { Badge } from "../../../components/ui/badge";
import { buttonVariants } from "../../../components/ui/button";
import { useCms } from "@/components/providers/cms-provider";
import { resolveProjectImage } from "@/lib/project-image";
import { cn } from "@/lib/utils";
import { tint } from "@/lib/tones";

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  // CMS collection: projects
  const { projects } = useCms();
  const project = projects.find((item) => item.slug === params?.slug);

  if (!project) {
    return (
      <article className="container max-w-3xl py-10">
        <div className="sticker bg-bubblegum-tint p-10 text-center">
          <p className="flex justify-center" aria-hidden="true">
            <LuSearchX size={48} strokeWidth={1.75} />
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold">Couldn&apos;t find that project</h1>
          <p className="mt-2 text-soft">It may have moved, or it hasn&apos;t been published yet.</p>
          <Link href="/projects" className={cn(buttonVariants(), "mt-6")}>
            See all projects
          </Link>
        </div>
      </article>
    );
  }

  const imageSrc = resolveProjectImage(project);
  const accentTint = project.accent === "amber" ? tint.sun : tint.sky;

  return (
    <article className="container max-w-3xl py-10">
      <Link
        href="/projects"
        className="chip inline-flex items-center gap-2 px-4 py-1.5 text-sm font-bold"
      >
        <LuArrowLeft size={16} aria-hidden="true" /> All projects
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <Badge variant={project.accent}>{project.status}</Badge>
        {(project.technologies ?? []).map((tech, index) => {
          const label = typeof tech === "string" ? tech : tech.technology;
          return (
            <Badge key={`${label}-${index}`} variant="default">
              {label}
            </Badge>
          );
        })}
      </div>

      <h1 className="mt-6 font-display text-5xl font-extrabold leading-tight sm:text-6xl">
        {project.name}
      </h1>
      {project.tagline && <p className="mt-3 text-xl text-soft">{project.tagline}</p>}

      <div
        className={cn(
          "sticker relative mt-10 aspect-[16/9] overflow-hidden",
          !imageSrc && accentTint
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.name}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            {/* No screenshot available — see the matching note in ProjectCard. */}
            <LuTerminal size={48} strokeWidth={1.75} className="text-ink/25" aria-hidden="true" />
            <span className="font-display text-3xl font-extrabold text-ink/25">{project.name}</span>
          </div>
        )}
      </div>

      {project.longDescription
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p
            key={index}
            className="mt-6 whitespace-pre-line text-xl leading-relaxed text-ink/85 first:mt-10"
          >
            {paragraph}
          </p>
        ))}

      {(project.achievements ?? []).length > 0 && (
        <div className="sticker mt-12 bg-sun-tint p-6 md:p-8">
          <h2 className="font-display text-3xl font-extrabold">Highlights</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {(project.achievements ?? []).map((achievement, index) => {
              const label = typeof achievement === "string" ? achievement : achievement.achievement;
              return (
                <li key={`${label}-${index}`} className="flex gap-3 text-lg text-ink/90">
                  <LuStar size={18} className="mt-1 shrink-0 fill-current" aria-hidden="true" />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-4">
        {project.codeVisibility === "private" ? (
          <Link
            href={`/projects/${project.slug}/source`}
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <LuLock size={18} aria-hidden="true" /> Why isn&apos;t this open source?
          </Link>
        ) : (
          project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg" })}
            >
              <LuGithub size={18} aria-hidden="true" /> Peek at the code
            </Link>
          )
        )}
        {project.demoUrl && (
          <Link
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <LuExternalLink size={18} aria-hidden="true" /> Try the live demo
          </Link>
        )}
      </div>
    </article>
  );
}

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { LuArrowLeft, LuLock, LuSparkles, LuSearchX } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { useCms } from "@/components/providers/cms-provider";

/**
 * Shown instead of a dead/missing GitHub link when a project's
 * `codeVisibility` is "private" — a friendly explanation rather than a
 * broken button or a silent redirect to nowhere.
 */
export default function ProjectSourcePage() {
  const params = useParams<{ slug: string }>();
  const { projects } = useCms();
  const project = projects.find((item) => item.slug === params?.slug);

  if (!project) {
    return (
      <section className="container flex min-h-[60vh] flex-col items-center justify-center gap-5 py-10 text-center">
        <p className="flex justify-center" aria-hidden="true">
          <LuSearchX size={48} strokeWidth={1.75} />
        </p>
        <h1 className="font-display text-3xl font-extrabold">Couldn&apos;t find that project</h1>
        <p className="max-w-md text-soft">It may have moved, or it hasn&apos;t been published yet.</p>
        <Link href="/projects" className={buttonVariants()}>
          See all projects
        </Link>
      </section>
    );
  }

  return (
    <section className="container max-w-2xl py-10 text-center">
      <Link
        href={`/projects/${project.slug}`}
        className="chip inline-flex items-center gap-2 px-4 py-1.5 text-sm font-bold"
      >
        <LuArrowLeft size={16} aria-hidden="true" /> Back to {project.name}
      </Link>

      <div className="sticker mt-8 bg-grape-tint p-8 sm:p-12">
        <div className="mx-auto flex h-20 w-20 -rotate-6 items-center justify-center rounded-full border-2 border-line bg-card shadow-pop-sm">
          <LuLock size={30} aria-hidden="true" />
        </div>

        <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          This vault stays locked
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink/85">
          {project.privateReason ||
            `The source for ${project.name} isn't public right now. Sometimes code stays behind closed doors — client work, an active competition, or research that isn't ready to share yet.`}
        </p>

        <p className="mx-auto mt-4 flex max-w-lg items-center justify-center gap-2 text-sm font-semibold text-soft">
          <LuSparkles size={14} aria-hidden="true" />
          The project itself is very real — just the repo that&apos;s private.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg" })}
            >
              Try the live demo instead
            </Link>
          )}
          <Link
            href="/projects"
            className={buttonVariants({ size: "lg", variant: project.demoUrl ? "outline" : "default" })}
          >
            Browse the open-source ones
          </Link>
        </div>
      </div>
    </section>
  );
}

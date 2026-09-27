"use client";

import Image from "next/image";
import { FaGithub, FaXTwitter, FaEnvelope, FaLinkedin, FaLocationDot, FaPhone } from "react-icons/fa6";
import { LuFileText } from "react-icons/lu";
import { Button } from "../ui/button";
import { useViewMode } from "../providers/view-mode-provider";
import { profile, resumeProjects, resumeSkills, resumeTimeline } from "@/data/profile";

/**
 * The Resume/CV view.
 *
 * Unlike every other page/section in this app, this view is fully
 * hardcoded — it reads only from data/profile.ts and never touches the
 * CMS (no useCms() here). That's deliberate: this view exists to be a
 * stable, always-identical formal snapshot (e.g. for printing to PDF or
 * handing to a reviewer), so it must never change shape or go blank just
 * because a CMS collection is slow, empty, or briefly misconfigured.
 *
 * If you want this view to reflect real content, edit data/profile.ts
 * directly rather than wiring it up to the CMS.
 */

function Avatar({
  photoUrl,
  alt,
  initials,
}: {
  photoUrl: string;
  alt: string;
  initials: string;
}) {
  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-line bg-sun sm:h-28 sm:w-28">
      {photoUrl ? (
        <Image src={photoUrl} alt={alt} fill sizes="112px" className="object-cover" priority unoptimized />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display text-4xl font-extrabold text-onaccent">
          {initials}
        </div>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-extrabold">{children}</h2>;
}

export function ResumeView() {
  const { setMode } = useViewMode();

  const fullName = profile.fullName;
  const summary = profile.summary;
  const photoUrl = profile.photoUrl;
  const initials = profile.initials;
  const role = profile.role;
  const location = profile.location;
  const email = profile.email;
  const phone = profile.phone;
  const linkedin = profile.links.linkedin;
  const github = profile.links.github;
  const twitter = profile.links.twitter;
  const education = profile.education;
  const achievements = profile.achievements;

  const featuredProjects = resumeProjects.filter((p) => p.featured).slice(0, 4);
  const chronologicalTimeline = [...resumeTimeline].reverse();
  const allSkills = resumeSkills.flatMap((c) => c.skills.map((s) => s.name));

  return (
    <section className="container max-w-3xl py-8 sm:py-12 print:py-0">
      {/* View switcher — hidden on print */}
      <div className="no-print sticker mb-10 flex flex-wrap items-center justify-between gap-4 bg-sun-tint p-4">
        <p className="flex items-center gap-2 font-semibold">
          <LuFileText size={16} aria-hidden="true" /> The short, formal version
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            Print / Save as PDF
          </Button>
          <Button size="sm" onClick={() => setMode("explore")}>
            Back to the fun stuff
          </Button>
        </div>
      </div>

      <div className="sticker p-6 sm:p-10 print:border-0 print:p-0">
        {/* Header */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Avatar photoUrl={photoUrl} alt={fullName} initials={initials} />
          <div className="flex-1">
            <h1 className="font-display text-4xl font-extrabold leading-tight">{fullName}</h1>
            <p className="mt-1 text-lg font-semibold text-grape">{role}</p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-soft">
              <span className="flex items-center gap-1.5">
                <FaLocationDot size={13} aria-hidden="true" /> {location}
              </span>
              <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-grape">
                <FaEnvelope size={13} aria-hidden="true" /> {email}
              </a>
              {phone && (
                <span className="flex items-center gap-1.5">
                  <FaPhone size={13} aria-hidden="true" /> {phone}
                </span>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-grape"
                >
                  <FaGithub size={13} aria-hidden="true" /> GitHub
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-grape"
                >
                  <FaLinkedin size={13} aria-hidden="true" /> LinkedIn
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-grape"
                >
                  <FaXTwitter size={13} aria-hidden="true" /> X / Twitter
                </a>
              )}
            </div>
          </div>
        </header>

        <p className="mt-8 text-lg leading-relaxed text-ink/85">{summary}</p>

        <div className="my-10 border-t-2 border-dashed border-line/25" />

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-10">
            <SectionTitle>Education</SectionTitle>
            <div className="mt-4 flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu.institution} className="flex flex-col gap-0.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="text-lg font-bold">{edu.institution}</p>
                    <p className="text-sm font-semibold text-soft">{edu.period}</p>
                  </div>
                  <p className="text-ink/85">{edu.degree}</p>
                  {edu.notes && <p className="text-sm text-soft">{edu.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        <div className="mb-10">
          <SectionTitle>Skills</SectionTitle>
          <div className="mt-4 flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border-2 border-line bg-grape-tint px-3 py-1 text-sm font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Key projects */}
        <div className="mb-10">
          <SectionTitle>Key projects</SectionTitle>
          <div className="mt-4 flex flex-col gap-6">
            {featuredProjects.map((project) => (
              <div key={project.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-lg font-bold">{project.name}</p>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-grape hover:underline"
                  >
                    Repository ↗
                  </a>
                </div>
                <p className="mt-1 text-ink/85">{project.tagline}</p>
                <p className="mt-1 text-sm font-medium text-soft">
                  {project.technologies
                    .map((t) => (typeof t === "string" ? t : t.technology))
                    .join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mb-10">
            <SectionTitle>Achievements</SectionTitle>
            <ul className="mt-4 flex flex-col gap-2">
              {achievements.map((a) => (
                <li key={a.title} className="flex items-baseline justify-between gap-4">
                  <span className="text-ink/90">
                    {a.title} <span className="text-soft">— {a.issuer}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-soft">{a.year}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Growth timeline */}
        <div>
          <SectionTitle>Timeline</SectionTitle>
          <div className="mt-4 flex flex-col gap-3">
            {chronologicalTimeline.map((entry) => (
              <div key={entry.year} className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-bold text-grape">{entry.year}</span>
                <span className="text-ink/90">
                  {entry.theme} — {entry.items.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="no-print mt-10 flex justify-center">
        <Button variant="outline" onClick={() => setMode("explore")}>
          Take me back to the fun stuff
        </Button>
      </div>
    </section>
  );
}

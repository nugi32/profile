"use client";

import { FaEnvelope, FaGithub, FaLocationDot } from "react-icons/fa6";
import { LuGraduationCap } from "react-icons/lu";
import { getSocialHref } from "@/lib/cms";
import { useCms } from "../providers/cms-provider";

/**
 * The identity card on /about.
 *
 * Every field is served by the CMS (`profile` and `social-links`
 * collections). An empty field renders empty (or that row is hidden)
 * rather than showing placeholder content.
 */
export function FormalIdentity() {
  const { profile: cmsProfile, socialLinks } = useCms();
  const fullName = cmsProfile?.name ?? "";
  const displayName = cmsProfile?.displayName ?? "";
  const role = cmsProfile?.role ?? "";
  const location = cmsProfile?.location ?? "";
  const email = cmsProfile?.email ?? "";
  const summary = cmsProfile?.bio ?? "";
  const education = cmsProfile?.education ?? [];
  const githubHref = getSocialHref(socialLinks, "github");

  const linkClass = "flex items-center gap-2 font-semibold underline-offset-4 hover:text-grape hover:underline";

  return (
    <div className="sticker mb-16 bg-sun-tint p-6 md:p-10">
      <p className="font-bold text-soft">The official version</p>
      <h2 className="mt-2 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
        {fullName}
      </h2>
      {(displayName || role) && (
        <p className="mt-2 text-lg font-semibold text-soft">
          {displayName && <>Friends call me &ldquo;{displayName}&rdquo;</>}
          {displayName && role && " · "}
          {role}
        </p>
      )}
      {summary && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">{summary}</p>}

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        {location && (
          <span className="flex items-center gap-2 font-semibold">
            <FaLocationDot size={15} aria-hidden="true" /> {location}
          </span>
        )}
        {email && (
          <a href={`mailto:${email}`} className={linkClass}>
            <FaEnvelope size={15} aria-hidden="true" /> {email}
          </a>
        )}
        {githubHref && (
          <a href={githubHref} target="_blank" rel="noreferrer" className={linkClass}>
            <FaGithub size={15} aria-hidden="true" /> GitHub
          </a>
        )}
      </div>

      {education.length > 0 && (
        <div className="mt-8 border-t-2 border-dashed border-line/30 pt-6">
          <h3 className="flex items-center gap-2 font-display text-2xl font-extrabold">
            <LuGraduationCap size={20} aria-hidden="true" /> Where I studied
          </h3>
          <ul className="mt-4 space-y-4">
            {education.map((item) => (
              <li key={item.institution}>
                <p className="font-bold">{item.degree}</p>
                <p className="text-soft">
                  {item.institution} · {item.period}
                </p>
                {item.notes && <p className="mt-1 text-ink/75">{item.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

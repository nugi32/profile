import type { Project } from "@/types";

/**
 * Resolves a project's cover image to something <Image> can load. Blob URLs
 * are absolute already; a root-relative path is served by the CMS, so it gets
 * the CMS origin prepended.
 */
export function resolveProjectImage(project: Project): string | undefined {
  const cmsBaseUrl = process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/+$/, "") ?? "";
  const raw = project.imageUrl;

  if (!raw) return undefined;
  return raw.startsWith("/") && cmsBaseUrl ? `${cmsBaseUrl}${raw}` : raw;
}

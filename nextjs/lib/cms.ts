/**
 * ============================================================================
 *  THE SINGLE DATA LAYER
 *
 *  Every piece of content on this site is read from the headless CMS that
 *  lives in ../cms — with ONE exception: the journal, which is authored in
 *  Notion and loaded through lib/notion.ts (see lib/journal.ts). Everything
 *  else is CMS-owned. This file does three things:
 *
 *    1. Knows the exact collection names and field names declared in
 *       `cms/lib/schemas.ts` (see the SCHEMA MAP comment on each normalizer).
 *    2. Normalizes the raw CMS documents into the shapes in `types/index.ts`
 *       — the CMS stores list-like fields as plain textareas, so they have to
 *       be parsed into arrays here.
 *    3. Fetches every collection in parallel via `fetchAllCmsData()`.
 *
 *  A collection that fails to load (network error, CORS, CMS down) is NOT
 *  allowed to take the rest of the site down with it. `fetchAllCmsData()`
 *  never rejects because one collection failed — it logs a console warning
 *  and treats that collection as empty. The provider in
 *  components/providers/cms-provider.tsx therefore always reaches "ready",
 *  and each section decides for itself how to render an empty collection
 *  (almost every section already shows a friendly "nothing published yet"
 *  message — see app/projects/page.tsx or components/sections/skills.tsx for
 *  examples). This is deliberate: an empty CMS or a slow/broken single
 *  collection should never block the whole page from being viewable.
 *
 *  DEV-ONLY DUMMY DATA FALLBACK: in development only (never in a
 *  production build), a collection that comes back empty is backfilled
 *  with placeholder content from data/dummy-cms-data.ts, purely so local
 *  UI work doesn't require hand-filling every collection in the CMS admin
 *  first. See the big comment at the top of that file for how it's kept
 *  out of production and how to disable it manually if you want to. This
 *  fallback never overrides real CMS content — it only fills in for a
 *  collection that returned nothing.
 * ============================================================================
 */

import type {
  Book,
  CurrentFocusItem,
  KnowledgeEdge,
  KnowledgeNode,
  LearningItem,
  Metric,
  MonthlyDeepWork,
  Paper,
  Project,
  QuarterlyReading,
  SkillCategory,
  SocialLink,
  TimelineYear,
  WeirdThought,
} from "@/types";
import {
  DUMMY_DATA_ENABLED,
  DUMMY_PROFILE,
  DUMMY_PROJECTS,
  DUMMY_TIMELINE,
  DUMMY_KNOWLEDGE_NODES,
  DUMMY_KNOWLEDGE_EDGES,
  DUMMY_SKILLS,
  DUMMY_CURRENT_FOCUS,
  DUMMY_WEIRD_THOUGHTS,
  DUMMY_METRICS,
  DUMMY_DEEP_WORK,
  DUMMY_READING,
  DUMMY_LEARNING,
  DUMMY_BOOKS,
  DUMMY_PAPERS,
  DUMMY_SOCIAL_LINKS,
} from "@/data/dummy-cms-data";

export const CMS_URL = (
  process.env.NEXT_PUBLIC_CMS_URL ??
  process.env.CMS_URL ??
  "http://localhost:3001"
).replace(/\/+$/, "");

/** The CMS collection slugs this site consumes, exactly as named in the schema. */
export const CMS_COLLECTIONS = {
  profile: "profile",
  projects: "projects",
  timeline: "timeline",
  knowledgeNodes: "knowledge-nodes",
  knowledgeEdges: "knowledge-edges",
  skills: "skills",
  currentFocus: "current-focus",
  weirdThoughts: "weird-thoughts",
  metrics: "metrics",
  deepWork: "monthly-deep-work",
  reading: "quarterly-reading",
  learning: "learning-items",
  books: "books",
  papers: "papers",
  socialLinks: "social-links",
} as const;

export type CmsDoc = Record<string, unknown>;

/** One entry of the profile's `education` list (see normalizeProfile). */
export interface CmsEducation {
  institution: string;
  degree: string;
  period: string;
  notes?: string;
}

/** One entry of the profile's `achievements` list (see normalizeProfile). */
export interface CmsAchievement {
  title: string;
  issuer: string;
  year: string;
}

/** Profile is a single-document collection in the CMS. */
export interface CmsProfile {
  name: string;
  displayName: string;
  initials: string;
  role: string;
  shortRole: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  bio: string;
  photoUrl: string;
  education: CmsEducation[];
  achievements: CmsAchievement[];
}

export interface CmsData {
  profile: CmsProfile | null;
  projects: Project[];
  timeline: TimelineYear[];
  knowledgeNodes: KnowledgeNode[];
  knowledgeEdges: KnowledgeEdge[];
  skills: SkillCategory[];
  currentFocus: CurrentFocusItem[];
  weirdThoughts: WeirdThought[];
  metrics: Metric[];
  deepWork: MonthlyDeepWork[];
  reading: QuarterlyReading[];
  learning: LearningItem[];
  books: Book[];
  papers: Paper[];
  socialLinks: SocialLink[];
  /**
   * Collection name → error message, for any collection that failed to
   * load. Not used to block rendering — it's here purely so a developer can
   * inspect what went wrong (e.g. via `console.warn`, or by reading this
   * object in devtools) while the site still renders every other section
   * normally, with the failed one shown as empty.
   */
  errors: Record<string, string>;
}

// ─── low-level fetch ────────────────────────────────────────────────────────

/**
 * GET /api/<collection> on the CMS.
 *
 * The CMS responds with `{ data: [...] }`. Older builds of this frontend
 * expected `{ docs: [...] }`, so both envelopes are accepted — that mismatch
 * was the reason nothing loaded before.
 */
export async function fetchCollection(
  collection: string,
  signal?: AbortSignal
): Promise<CmsDoc[]> {
  const response = await fetch(`${CMS_URL}/api/${collection}`, {
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `CMS request failed for "${collection}" (${response.status} ${response.statusText})`
    );
  }

  const payload = (await response.json()) as
    | { data?: unknown; docs?: unknown }
    | null;

  const items = payload?.data ?? payload?.docs;

  if (!Array.isArray(items)) {
    throw new Error(`Unexpected CMS response shape for "${collection}"`);
  }

  return items as CmsDoc[];
}

/**
 * Same as `fetchCollection`, but never throws for an ordinary failure (bad
 * status, CMS unreachable, unexpected shape). It logs a console warning and
 * resolves with an empty array instead, so one broken/misconfigured
 * collection can't take the rest of the site down with it.
 *
 * An `AbortError` (the request was cancelled — e.g. the component unmounted,
 * or the user hit "Try again") is deliberately re-thrown: that's not a "this
 * collection is broken" case, it's "this specific request no longer
 * matters", and the caller needs to know to ignore it rather than treat it
 * as an empty collection.
 */
async function safeFetchCollection(
  collection: string,
  signal?: AbortSignal
): Promise<{ items: CmsDoc[]; error?: string }> {
  try {
    const items = await fetchCollection(collection, signal);
    return { items };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn(
      `[cms] Collection "${collection}" failed to load — showing it as empty. ${message}`
    );
    return { items: [], error: message };
  }
}

// ─── development-only dummy data fallback ──────────────────────────────────

/**
 * DEV-ONLY FALLBACK. Returns `items` untouched whenever it has anything in
 * it, or whenever `DUMMY_DATA_ENABLED` is `false` (which it always is in a
 * production build — see data/dummy-cms-data.ts). Only when BOTH "we're in
 * development" AND "the CMS returned nothing for this collection" are true
 * does the dummy array take over, purely so local UI work doesn't require
 * hand-filling every collection in the CMS admin first.
 *
 * A collection that's genuinely empty in production renders its normal
 * "nothing published yet" empty state, exactly as before this fallback was
 * added — this function is a no-op outside development.
 */
function withDummyFallback<T>(items: T[], dummy: T[]): T[] {
  if (!DUMMY_DATA_ENABLED) return items;
  return items.length > 0 ? items : dummy;
}

/** Same idea as `withDummyFallback`, for the single-document `profile` collection. */
function withDummyProfileFallback(profile: CmsProfile | null): CmsProfile | null {
  if (!DUMMY_DATA_ENABLED) return profile;
  return profile ?? DUMMY_PROFILE;
}

// ─── field coercion helpers ─────────────────────────────────────────────────

function str(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function num(value: unknown, fallback = 0): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function bool(value: unknown): boolean {
  return value === true || value === "true" || value === "on";
}

function isoDate(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

/**
 * The CMS stores list fields (technologies, tags, achievements, timeline
 * items, skills) in a plain textarea. One entry per line is the documented
 * format; a single comma-separated line is also accepted so pasted content
 * still works.
 */
function toList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "string"
          ? item
          : str(
              (item as Record<string, unknown> | null)?.value ??
                Object.values((item ?? {}) as Record<string, unknown>).find(
                  (candidate) => typeof candidate === "string"
                )
            )
      )
      .map((item) => item.trim())
      .filter(Boolean);
  }

  const raw = str(value);
  if (!raw) return [];

  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length > 1) return lines;

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Image fields are stored as a Vercel Blob URL string. */
function imageUrl(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value && typeof value === "object") {
    const url = (value as { url?: unknown }).url;
    if (typeof url === "string") return url.trim();
  }
  return "";
}

/**
 * The `education` textarea uses one entry per line in the form
 * `Institution | Degree | Period | Notes` (Notes is optional). Extra `|`
 * inside a field is fine; the string is split on the first three pipes only.
 */
function toEducation(value: unknown): CmsEducation[] {
  return toList(value)
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter((parts) => parts[0])
    .map((parts) => ({
      institution: parts[0] ?? "",
      degree: parts[1] ?? "",
      period: parts[2] ?? "",
      notes: parts[3] || undefined,
    }));
}

/**
 * The `achievements` textarea uses one entry per line in the form
 * `Title | Issuer | Year`.
 */
function toAchievements(value: unknown): CmsAchievement[] {
  return toList(value)
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter((parts) => parts[0])
    .map((parts) => ({
      title: parts[0] ?? "",
      issuer: parts[1] ?? "",
      year: parts[2] ?? "",
    }));
}

// ─── normalizers (one per CMS collection) ───────────────────────────────────

/**
 * SCHEMA MAP — profile: name, displayName, initials, role, shortRole,
 * location, email, phone, linkedin (all text), bio (textarea), photo (image),
 * education (textarea list), achievements (textarea list)
 */
function normalizeProfile(docs: CmsDoc[]): CmsProfile | null {
  const doc = docs[0];
  if (!doc) return null;
  return {
    name: str(doc.name),
    displayName: str(doc.displayName),
    initials: str(doc.initials),
    role: str(doc.role),
    shortRole: str(doc.shortRole),
    location: str(doc.location),
    email: str(doc.email),
    phone: str(doc.phone),
    linkedin: str(doc.linkedin),
    bio: str(doc.bio),
    photoUrl: imageUrl(doc.photo),
    education: toEducation(doc.education),
    achievements: toAchievements(doc.achievements),
  };
}

/**
 * SCHEMA MAP — projects: slug, name, tagline, description, longDescription,
 * technologies (textarea list), status (select), achievements (textarea list),
 * githubUrl, demoUrl, codeVisibility (select: Public/Private), privateReason
 * (textarea), accent (select), featured (boolean), image, imageUrl
 */
function normalizeProjects(docs: CmsDoc[]): Project[] {
  return docs
    .filter((doc) => str(doc.slug))
    .map((doc) => ({
      slug: str(doc.slug),
      name: str(doc.name),
      tagline: str(doc.tagline),
      description: str(doc.description),
      longDescription: str(doc.longDescription) || str(doc.description),
      technologies: toList(doc.technologies),
      status: (str(doc.status) || "In Development") as Project["status"],
      achievements: toList(doc.achievements),
      githubUrl: str(doc.githubUrl),
      demoUrl: str(doc.demoUrl) || undefined,
      codeVisibility: (str(doc.codeVisibility).toLowerCase() === "private"
        ? "private"
        : "public") as NonNullable<Project["codeVisibility"]>,
      privateReason: str(doc.privateReason) || undefined,
      accent: (str(doc.accent) === "amber" ? "amber" : "ice") as Project["accent"],
      featured: bool(doc.featured),
      imageUrl: imageUrl(doc.image) || str(doc.imageUrl),
    }));
}

/** SCHEMA MAP — timeline: year, theme, items (textarea list) */
function normalizeTimeline(docs: CmsDoc[]): TimelineYear[] {
  return docs
    .filter((doc) => str(doc.year))
    .map((doc) => ({
      year: str(doc.year),
      theme: str(doc.theme),
      items: toList(doc.items),
    }))
    .sort((a, b) => Number(b.year) - Number(a.year));
}

/** SCHEMA MAP — knowledge-nodes: id, label, group, weight (number) */
function normalizeKnowledgeNodes(docs: CmsDoc[]): KnowledgeNode[] {
  return docs
    .filter((doc) => str(doc.id) && str(doc.label))
    .map((doc) => ({
      id: str(doc.id),
      label: str(doc.label),
      group: str(doc.group, "foundation"),
      weight: num(doc.weight, 5),
    }));
}

/** SCHEMA MAP — knowledge-edges: source, target, strength (number) */
function normalizeKnowledgeEdges(docs: CmsDoc[]): KnowledgeEdge[] {
  return docs
    .filter((doc) => str(doc.source) && str(doc.target))
    .map((doc) => ({
      source: str(doc.source),
      target: str(doc.target),
      strength: num(doc.strength, 0.5),
    }));
}

/**
 * SCHEMA MAP — skills: category, icon, skills (textarea list)
 *
 * Each line of the `skills` textarea is `Skill name: 85` (a percentage).
 * `Skill name | 85` and a bare `Skill name` are accepted too; a missing
 * number defaults to 70 so a typo never renders an empty bar.
 */
function normalizeSkills(docs: CmsDoc[]): SkillCategory[] {
  return docs
    .filter((doc) => str(doc.category))
    .map((doc) => ({
      category: str(doc.category),
      icon: str(doc.icon, "code"),
      skills: toList(doc.skills).map((line) => {
        const match = line.match(/^(.*?)[\s]*[:|]\s*(\d{1,3})\s*%?$/);
        if (match) {
          return {
            name: match[1].trim(),
            level: Math.min(100, Math.max(0, Number(match[2]))),
          };
        }
        return { name: line, level: 70 };
      }),
    }));
}

/** SCHEMA MAP — current-focus: title, description, icon */
function normalizeCurrentFocus(docs: CmsDoc[]): CurrentFocusItem[] {
  return docs
    .filter((doc) => str(doc.title))
    .map((doc) => ({
      title: str(doc.title),
      description: str(doc.description),
      icon: str(doc.icon, "brain"),
    }));
}

/** SCHEMA MAP — weird-thoughts: quote, context */
function normalizeWeirdThoughts(docs: CmsDoc[]): WeirdThought[] {
  return docs
    .filter((doc) => str(doc.quote))
    .map((doc) => ({
      quote: str(doc.quote),
      context: str(doc.context) || undefined,
    }));
}

/** SCHEMA MAP — metrics: label, value (number), suffix, icon */
function normalizeMetrics(docs: CmsDoc[]): Metric[] {
  return docs
    .filter((doc) => str(doc.label))
    .map((doc) => ({
      label: str(doc.label),
      value: num(doc.value),
      suffix: str(doc.suffix) || undefined,
      icon: str(doc.icon, "chart"),
    }));
}

/** SCHEMA MAP — monthly-deep-work: month, hours (number) */
function normalizeDeepWork(docs: CmsDoc[]): MonthlyDeepWork[] {
  return docs
    .filter((doc) => str(doc.month))
    .map((doc) => ({ month: str(doc.month), hours: num(doc.hours) }))
    .reverse(); // the CMS returns newest first; charts read left to right
}

/** SCHEMA MAP — quarterly-reading: quarter, books (number) */
function normalizeReading(docs: CmsDoc[]): QuarterlyReading[] {
  return docs
    .filter((doc) => str(doc.quarter))
    .map((doc) => ({ quarter: str(doc.quarter), books: num(doc.books) }))
    .reverse();
}

/** SCHEMA MAP — learning-items: topic, progress (number) */
function normalizeLearning(docs: CmsDoc[]): LearningItem[] {
  return docs
    .filter((doc) => str(doc.topic))
    .map((doc) => ({ topic: str(doc.topic), progress: num(doc.progress) }));
}

/** SCHEMA MAP — books / papers: title, author, status (select) */
function normalizeReadingList<T extends Book | Paper>(docs: CmsDoc[]): T[] {
  return docs
    .filter((doc) => str(doc.title))
    .map(
      (doc) =>
        ({
          title: str(doc.title),
          author: str(doc.author),
          status: (str(doc.status) || "Queued") as Book["status"],
        }) as T
    );
}

/** SCHEMA MAP — social-links: label, href, icon */
function normalizeSocialLinks(docs: CmsDoc[]): SocialLink[] {
  return docs
    .filter((doc) => str(doc.label) && str(doc.href))
    .map((doc) => ({
      label: str(doc.label),
      href: str(doc.href),
      icon: str(doc.icon, "link"),
    }));
}

/**
 * Looks up one entry of a normalized `SocialLink[]` list by its `icon`
 * field (e.g. "github", "twitter", "email", "rss", "notion"). Returns
 * `undefined` when the CMS has no such link — callers must treat that as
 * "don't render this", never fall back to a local hardcoded URL.
 */
export function getSocialHref(
  socialLinks: SocialLink[],
  icon: string
): string | undefined {
  return socialLinks.find((link) => link.icon === icon)?.href;
}

/**
 * Lightweight CMS fetch for places that only need identity + social data —
 * page `generateMetadata()` functions and other server-side code that runs
 * outside the client-side `<CmsProvider>` (see cms-provider.tsx). Built on
 * `safeFetchCollection`, so a down/misconfigured CMS never throws here: it
 * resolves with `profile: null` / `socialLinks: []` instead, exactly like
 * the client-side loader treats an empty collection.
 */
export async function fetchSiteMeta(
  signal?: AbortSignal
): Promise<{ profile: CmsProfile | null; socialLinks: SocialLink[] }> {
  const [profile, socialLinks] = await Promise.all([
    safeFetchCollection(CMS_COLLECTIONS.profile, signal),
    safeFetchCollection(CMS_COLLECTIONS.socialLinks, signal),
  ]);

  return {
    profile: withDummyProfileFallback(normalizeProfile(profile.items)),
    socialLinks: withDummyFallback(normalizeSocialLinks(socialLinks.items), DUMMY_SOCIAL_LINKS),
  };
}

// ─── the one call that loads the whole site ─────────────────────────────────

/**
 * Loads every collection in parallel.
 *
 * This never rejects because of an empty or broken collection — see
 * `safeFetchCollection` above. A collection that fails to load comes back as
 * an empty array (with its message recorded in the returned `errors` map),
 * exactly the same shape as a collection that legitimately has zero items
 * published yet. Either way, the section that renders it is responsible for
 * showing a short "nothing here yet" message instead of an empty layout —
 * that is a per-section concern, not something this data layer or the
 * top-level provider should be blocking the whole page over.
 *
 * The only thing that still propagates out of this function is an
 * `AbortError`, so a cancelled request (component unmount, retry) is not
 * mistaken for "every collection is empty".
 */
export async function fetchAllCmsData(signal?: AbortSignal): Promise<CmsData> {
  const get = (collection: string) => safeFetchCollection(collection, signal);

  const [
    profile,
    projects,
    timeline,
    knowledgeNodes,
    knowledgeEdges,
    skills,
    currentFocus,
    weirdThoughts,
    metrics,
    deepWork,
    reading,
    learning,
    books,
    papers,
    socialLinks,
  ] = await Promise.all([
    get(CMS_COLLECTIONS.profile),
    get(CMS_COLLECTIONS.projects),
    get(CMS_COLLECTIONS.timeline),
    get(CMS_COLLECTIONS.knowledgeNodes),
    get(CMS_COLLECTIONS.knowledgeEdges),
    get(CMS_COLLECTIONS.skills),
    get(CMS_COLLECTIONS.currentFocus),
    get(CMS_COLLECTIONS.weirdThoughts),
    get(CMS_COLLECTIONS.metrics),
    get(CMS_COLLECTIONS.deepWork),
    get(CMS_COLLECTIONS.reading),
    get(CMS_COLLECTIONS.learning),
    get(CMS_COLLECTIONS.books),
    get(CMS_COLLECTIONS.papers),
    get(CMS_COLLECTIONS.socialLinks),
  ]);

  const errors: Record<string, string> = {};
  const record = (collection: string, result: { error?: string }) => {
    if (result.error) errors[collection] = result.error;
  };
  record(CMS_COLLECTIONS.profile, profile);
  record(CMS_COLLECTIONS.projects, projects);
  record(CMS_COLLECTIONS.timeline, timeline);
  record(CMS_COLLECTIONS.knowledgeNodes, knowledgeNodes);
  record(CMS_COLLECTIONS.knowledgeEdges, knowledgeEdges);
  record(CMS_COLLECTIONS.skills, skills);
  record(CMS_COLLECTIONS.currentFocus, currentFocus);
  record(CMS_COLLECTIONS.weirdThoughts, weirdThoughts);
  record(CMS_COLLECTIONS.metrics, metrics);
  record(CMS_COLLECTIONS.deepWork, deepWork);
  record(CMS_COLLECTIONS.reading, reading);
  record(CMS_COLLECTIONS.learning, learning);
  record(CMS_COLLECTIONS.books, books);
  record(CMS_COLLECTIONS.papers, papers);
  record(CMS_COLLECTIONS.socialLinks, socialLinks);

  return {
    profile: withDummyProfileFallback(normalizeProfile(profile.items)),
    projects: withDummyFallback(normalizeProjects(projects.items), DUMMY_PROJECTS),
    timeline: withDummyFallback(normalizeTimeline(timeline.items), DUMMY_TIMELINE),
    knowledgeNodes: withDummyFallback(
      normalizeKnowledgeNodes(knowledgeNodes.items),
      DUMMY_KNOWLEDGE_NODES
    ),
    knowledgeEdges: withDummyFallback(
      normalizeKnowledgeEdges(knowledgeEdges.items),
      DUMMY_KNOWLEDGE_EDGES
    ),
    skills: withDummyFallback(normalizeSkills(skills.items), DUMMY_SKILLS),
    currentFocus: withDummyFallback(
      normalizeCurrentFocus(currentFocus.items),
      DUMMY_CURRENT_FOCUS
    ),
    weirdThoughts: withDummyFallback(
      normalizeWeirdThoughts(weirdThoughts.items),
      DUMMY_WEIRD_THOUGHTS
    ),
    metrics: withDummyFallback(normalizeMetrics(metrics.items), DUMMY_METRICS),
    deepWork: withDummyFallback(normalizeDeepWork(deepWork.items), DUMMY_DEEP_WORK),
    reading: withDummyFallback(normalizeReading(reading.items), DUMMY_READING),
    learning: withDummyFallback(normalizeLearning(learning.items), DUMMY_LEARNING),
    books: withDummyFallback(normalizeReadingList<Book>(books.items), DUMMY_BOOKS),
    papers: withDummyFallback(normalizeReadingList<Paper>(papers.items), DUMMY_PAPERS),
    socialLinks: withDummyFallback(normalizeSocialLinks(socialLinks.items), DUMMY_SOCIAL_LINKS),
    errors,
  };
}

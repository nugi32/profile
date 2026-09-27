import { siteConfig } from "@/lib/site-config";
import type { SiteData } from "@/components/providers/cms-provider";
import type {
  Book,
  JournalEntry,
  KnowledgeNode,
  Paper,
  Project,
  SkillCategory,
} from "@/types";

export type SearchGroup =
  | "Page"
  | "Project"
  | "Journal"
  | "Knowledge"
  | "Skill"
  | "Reading";

export interface SearchItem {
  /** Stable unique key. */
  id: string;
  /** Primary line shown in the result row. */
  title: string;
  /** Secondary line: a short description, date, or author. */
  subtitle?: string;
  /** Destination route (may include a hash anchor). */
  href: string;
  group: SearchGroup;
  /** Extra terms that should match but are not displayed. */
  keywords: string[];
}

/** Unwraps the `string | { technology: string }` shape used by the CMS. */
function flatten(values: readonly unknown[]): string[] {
  return values.map((value) => {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      const first = Object.values(value as Record<string, unknown>).find(
        (item) => typeof item === "string"
      );
      return typeof first === "string" ? first : "";
    }
    return "";
  });
}

function pageItems(): SearchItem[] {
  const pages: SearchItem[] = siteConfig.nav.map((item) => ({
    id: `page:${item.href}`,
    title: item.label,
    subtitle: item.href,
    href: item.href,
    group: "Page",
    keywords: [item.label, item.href],
  }));

  // Sections that live inside the home page but are worth finding directly.
  pages.push(
    {
      id: "page:/#skills",
      title: "My toolkit",
      subtitle: "Skills, on the home page",
      href: "/#skills",
      group: "Page",
      keywords: ["skills", "stack", "tools", "technologies"],
    },
    {
      id: "page:/#learning",
      title: "Learning corner",
      subtitle: "Books, papers and topics, on the home page",
      href: "/#learning",
      group: "Page",
      keywords: ["learning", "reading queue", "research queue", "books", "papers"],
    }
  );

  return pages;
}

function projectItems(projects: Project[]): SearchItem[] {
  return projects.map((project) => ({
    id: `project:${project.slug}`,
    title: project.name,
    subtitle: project.tagline,
    href: `/projects/${project.slug}`,
    group: "Project",
    keywords: [
      project.name,
      project.tagline,
      project.description,
      project.status,
      ...flatten(project.technologies),
    ],
  }));
}

export function journalItems(entries: JournalEntry[]): SearchItem[] {
  return entries.map((entry) => ({
    id: `journal:${entry.slug}`,
    title: entry.title,
    subtitle: entry.description || entry.date,
    href: `/journal/${entry.slug}`,
    group: "Journal",
    keywords: [entry.title, entry.description, entry.date, ...(entry.tags ?? [])],
  }));
}

function knowledgeItems(knowledgeNodes: KnowledgeNode[]): SearchItem[] {
  return knowledgeNodes.map((node) => ({
    id: `knowledge:${node.id}`,
    title: node.label,
    subtitle: `Idea map · ${node.group}`,
    href: "/knowledge",
    group: "Knowledge",
    keywords: [node.label, node.group, node.id],
  }));
}

function skillItems(skillCategories: SkillCategory[]): SearchItem[] {
  return skillCategories.flatMap((category) =>
    category.skills.map((skill) => ({
      id: `skill:${category.category}:${skill.name}`,
      title: skill.name,
      subtitle: category.category,
      href: "/#skills",
      group: "Skill" as const,
      keywords: [skill.name, category.category],
    }))
  );
}

function readingItems(books: Book[], papers: Paper[]): SearchItem[] {
  return [
    ...books.map((book) => ({
      id: `book:${book.title}`,
      title: book.title,
      subtitle: `${book.author} · ${book.status}`,
      href: "/#learning",
      group: "Reading" as const,
      keywords: [book.title, book.author, book.status, "book"],
    })),
    ...papers.map((paper) => ({
      id: `paper:${paper.title}`,
      title: paper.title,
      subtitle: `${paper.author} · ${paper.status}`,
      href: "/#learning",
      group: "Reading" as const,
      keywords: [paper.title, paper.author, paper.status, "paper", "research"],
    })),
  ];
}

/**
 * Builds the whole search index out of the loaded site data: projects,
 * knowledge nodes, skills, books and papers from the CMS, and journal entries
 * from Notion. Only the site's own routes are local, because routes are code,
 * not content.
 */
export function buildSearchIndex(cms: SiteData): SearchItem[] {
  return [
    ...pageItems(),
    ...projectItems(cms.projects),
    ...journalItems(cms.journal),
    ...knowledgeItems(cms.knowledgeNodes),
    ...skillItems(cms.skills),
    ...readingItems(cms.books, cms.papers),
  ];
}

/** Order the groups appear in the results list. */
export const GROUP_ORDER: SearchGroup[] = [
  "Page",
  "Project",
  "Journal",
  "Knowledge",
  "Skill",
  "Reading",
];

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Scores an item against a query. Higher is better; 0 means "no match".
 * Title matches outrank subtitle matches, which outrank keyword matches, so
 * typing "gold" surfaces the journal post before a tangentially related tag.
 */
export function scoreItem(item: SearchItem, rawQuery: string): number {
  const query = normalize(rawQuery.trim());
  if (!query) return 1;

  const terms = query.split(/\s+/).filter(Boolean);
  const title = normalize(item.title);
  const subtitle = normalize(item.subtitle ?? "");
  const keywords = normalize(item.keywords.join(" "));

  let score = 0;

  for (const term of terms) {
    if (title.startsWith(term)) score += 100;
    else if (title.includes(term)) score += 60;
    else if (subtitle.includes(term)) score += 30;
    else if (keywords.includes(term)) score += 15;
    else return 0; // every term must match somewhere
  }

  // Slight preference for shorter titles when scores are otherwise equal.
  return score + Math.max(0, 20 - item.title.length / 4);
}

export function searchItems(items: SearchItem[], query: string): SearchItem[] {
  return items
    .map((item) => ({ item, score: scoreItem(item, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (
        GROUP_ORDER.indexOf(a.item.group) - GROUP_ORDER.indexOf(b.item.group)
      );
    })
    .map((entry) => entry.item);
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: Array<string | { technology: string; id?: string | null }>;
  status: "Live" | "In Development" | "Research" | "Archived";
  achievements: Array<string | { achievement: string; id?: string | null }>;
  githubUrl: string;
  demoUrl?: string;
  /**
   * Whether the repo link should be shown. Optional (rather than required)
   * so hardcoded/legacy Project objects — e.g. data/profile.ts's resume
   * data — don't need updating; missing/unrecognized values behave as
   * "public", same as before this field existed.
   */
  codeVisibility?: "public" | "private";
  /** Shown on the "source is private" page when codeVisibility is "private". */
  privateReason?: string;
  accent: "ice" | "amber";
  featured: boolean;
  imageUrl?: string;
}

export interface NotionContentBlock {
  id: string;
  type: string;
  children?: NotionContentBlock[];
  [key: string]: unknown;
}

export interface JournalEntry {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  content: string;
  contentBlocks?: NotionContentBlock[];
}

export interface TimelineYear {
  year: string;
  theme: string;
  items: string[];
}

export interface KnowledgeNode {
  id: string;
  label: string;
  group: string;
  weight: number;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  strength: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export interface CurrentFocusItem {
  title: string;
  description: string;
  icon: string;
}

export interface WeirdThought {
  quote: string;
  context?: string;
}

export interface Metric {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface MonthlyDeepWork {
  month: string;
  hours: number;
}

export interface QuarterlyReading {
  quarter: string;
  books: number;
}

export interface Book {
  title: string;
  author: string;
  status: "Reading" | "Queued" | "Finished";
}

export interface Paper {
  title: string;
  author: string;
  status: "Reading" | "Queued" | "Finished";
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface LearningItem {
  topic: string;
  progress: number;
}
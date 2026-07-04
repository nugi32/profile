export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  status: "Live" | "In Development" | "Research" | "Archived";
  achievements: string[];
  githubUrl: string;
  demoUrl?: string;
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
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
import type { CmsProfile } from "@/lib/cms";

/**
 * ============================================================================
 *  DEVELOPMENT-ONLY DUMMY DATA — CMS FALLBACK
 * ============================================================================
 *
 *  WHAT THIS FILE IS FOR
 *  ----------------------------------------------------------------------
 *  While the CMS is empty (a fresh install, a collection you haven't
 *  filled in yet, a local CMS that isn't running) every section of the
 *  site would normally render its "nothing published yet" empty state.
 *  That's correct behaviour, but it makes local UI work tedious — you'd
 *  have to hand-fill every collection in the CMS admin just to see what a
 *  section looks like with real content.
 *
 *  `lib/cms.ts` imports the constants below and uses each one ONLY as a
 *  fallback for its matching collection, and ONLY when BOTH of these are
 *  true:
 *    1. `DUMMY_DATA_ENABLED` is `true` (see below), AND
 *    2. the CMS returned zero items for that collection (empty or failed
 *       to load) — if the CMS has even one real item, the real data wins
 *       and this file is never consulted for that collection.
 *
 *  HOW THIS STAYS OUT OF PRODUCTION
 *  ----------------------------------------------------------------------
 *  `DUMMY_DATA_ENABLED` below is wired to `process.env.NODE_ENV`, which
 *  Next.js sets to `"production"` for every production build
 *  (`next build` / `next start`, and on Vercel) automatically — nothing to
 *  configure. So even if you forget to touch this file at all, dummy data
 *  can never reach production; it only ever shows up in `next dev`.
 *
 *  If you want to be doubly sure, or you want production to keep working
 *  exactly like this even if that env check is ever changed, you can also
 *  strip the data out by hand: open the block for a collection below and
 *  delete/comment out everything between the `[` and `]`, leaving an
 *  empty array, e.g.:
 *
 *      export const DUMMY_PROJECTS: Project[] = [
 *        // ... comment out or delete every entry here ...
 *      ];
 *
 *  An empty array behaves exactly like "no dummy data for this
 *  collection" — the real CMS response (even if it's also empty) is what
 *  renders, so the section's normal "nothing published yet" empty state
 *  takes over.
 *
 *  Every value below is clearly fake placeholder content — swap it for
 *  your own if you want the dev preview to look like your real site, or
 *  leave it as-is, since it never ships.
 *
 *  PROFILE IMAGE: files inside `public/` are served from the site root, so
 *  `public/profile.jpg` is referenced as `/profile.jpg` (not `/public/profile.jpg`).
 *  Project placeholder images use https://picsum.photos and need an internet
 *  connection while developing.
 *
 *  Only ONE dummy project (`dummy-realtime-dashboard`) has an `imageUrl` —
 *  the other three are deliberately left with `imageUrl: ""` to preview
 *  ProjectCard's "no screenshot available" state (an icon + the project
 *  name, instead of a photo), which is the realistic case for a project
 *  with no visual UI to screenshot (a backend service, a CLI tool, an
 *  indexer, internal research tooling, etc). Swap any `picsum.photos` URL
 *  for your own image, or clear it to `""` either way you like.
 * ============================================================================
 */

export const DUMMY_DATA_ENABLED = process.env.NODE_ENV !== "production";

// ─── profile ────────────────────────────────────────────────────────────────

export const DUMMY_PROFILE: CmsProfile = {
  name: "Jordan Rivera",
  displayName: "Jordan",
  initials: "JR",
  role: "Full-Stack Developer & Research Engineer",
  shortRole: "Full-Stack Dev & Research Engineer",
  location: "Placeholder City, Placeholder Country",
  email: "jordan.rivera@example.com",
  phone: "",
  linkedin: "https://www.linkedin.com/in/example-profile",
  bio: "This is placeholder dev-only bio copy. It exists so the About / Home sections have something to render locally while the CMS is empty — replace it in the CMS admin, not here.",
  photoUrl: "/profile.jpg",
  education: [
    {
      institution: "Placeholder University",
      degree: "B.Sc. in Computer Science",
      period: "2021 — 2025",
      notes: "Dummy dev fallback entry — replace via the CMS admin.",
    },
    {
      institution: "Placeholder Online Academy",
      degree: "Certificate in Applied Data Science",
      period: "2024",
    },
  ],
  achievements: [
    {
      title: "Placeholder Hackathon — 1st Place",
      issuer: "Example Hack Org",
      year: "2025",
    },
    {
      title: "Placeholder Open Source Grant",
      issuer: "Example Foundation",
      year: "2024",
    },
  ],
};

// ─── projects ───────────────────────────────────────────────────────────────

export const DUMMY_PROJECTS: Project[] = [
  {
    slug: "dummy-realtime-dashboard",
    name: "Realtime Ops Dashboard (Dummy)",
    tagline: "A placeholder project used only for local development.",
    description:
      "Dummy description for a realtime analytics dashboard. Replace this entry in the CMS once you have a real project to feature.",
    longDescription:
      "This is a longer placeholder description. In development it lets you preview how the project detail page lays out a longer block of text, a technology list, and an achievements list before any real project exists in the CMS.",
    technologies: ["TypeScript", "Next.js", "PostgreSQL", "WebSockets"],
    status: "Live",
    achievements: [
      "Dummy achievement — reduced dummy latency by 40%",
      "Dummy achievement — adopted by 3 placeholder teams",
    ],
    githubUrl: "https://github.com/example/dummy-realtime-dashboard",
    demoUrl: "https://example.com/demo",
    codeVisibility: "public",
    accent: "ice",
    featured: true,
    imageUrl: "https://picsum.photos/seed/dummy-realtime-dashboard/800/500",
  },
  {
    slug: "dummy-onchain-indexer",
    name: "On-Chain Data Indexer (Dummy)",
    tagline: "Placeholder Web3 project for local UI testing.",
    description:
      "Dummy description of an indexing service that mirrors on-chain events into a queryable store.",
    longDescription:
      "Placeholder long-form copy for the project detail page. This entry is only used when the CMS's `projects` collection is empty in development.",
    technologies: ["Solidity", "Rust", "Redis", "GraphQL"],
    status: "In Development",
    achievements: ["Dummy achievement — indexed 1M+ placeholder events"],
    githubUrl: "https://github.com/example/dummy-onchain-indexer",
    codeVisibility: "private",
    privateReason:
      "Dummy placeholder reason: this repository is private in this fake example.",
    accent: "amber",
    featured: true,
    // Backend/indexing service — no UI screenshot to show, so `imageUrl` is
    // deliberately left empty. This previews ProjectCard's "no screenshot
    // available" state (an icon + the project name) instead of a photo.
    imageUrl: "",
  },
  {
    slug: "dummy-research-notebook",
    name: "Quant Research Notebook Suite (Dummy)",
    tagline: "Placeholder research tooling project.",
    description:
      "Dummy description for a set of internal research notebooks and backtesting utilities.",
    longDescription:
      "Placeholder long-form copy. Swap this whole array in the CMS admin once real projects are published — this text only renders locally.",
    technologies: ["Python", "pandas", "Jupyter"],
    status: "Research",
    achievements: [],
    githubUrl: "https://github.com/example/dummy-research-notebook",
    codeVisibility: "public",
    accent: "ice",
    featured: false,
    // Also intentionally imageless — internal research tooling with no
    // presentable UI, same "no screenshot" case as the indexer above.
    imageUrl: "",
  },
  {
    slug: "dummy-archived-cli",
    name: "Legacy CLI Tool (Dummy)",
    tagline: "Placeholder archived project, for status-badge testing.",
    description: "Dummy description for an old, no-longer-maintained CLI tool.",
    longDescription:
      "Placeholder long-form copy used to preview how the \"Archived\" status badge renders on the project list and detail pages.",
    technologies: ["Node.js", "Commander.js"],
    status: "Archived",
    achievements: [],
    githubUrl: "https://github.com/example/dummy-archived-cli",
    codeVisibility: "public",
    accent: "amber",
    featured: false,
    // A CLI tool has no visual UI either — third "no screenshot" example.
    imageUrl: "",
  },
];

// ─── timeline ───────────────────────────────────────────────────────────────

export const DUMMY_TIMELINE: TimelineYear[] = [
  {
    year: "2026",
    theme: "Dummy theme — placeholder year in progress",
    items: [
      "Placeholder milestone: started a new dummy initiative.",
      "Placeholder milestone: shipped a dummy v2 release.",
      "Placeholder milestone: mentored a dummy junior teammate.",
      "Placeholder milestone: migrated a dummy service to a new stack.",
    ],
  },
  {
    year: "2025",
    theme: "Dummy theme — placeholder growth year",
    items: [
      "Placeholder milestone: joined a dummy placeholder team.",
      "Placeholder milestone: published a dummy write-up.",
      "Placeholder milestone: spoke at a dummy meetup.",
      "Placeholder milestone: shipped a dummy internal tool used team-wide.",
      "Placeholder milestone: won a dummy hackathon with a small team.",
    ],
  },
  {
    year: "2024",
    theme: "Dummy theme — placeholder foundations year",
    items: [
      "Placeholder milestone: began learning a dummy new stack.",
      "Placeholder milestone: built first dummy side project.",
      "Placeholder milestone: launched a dummy personal blog.",
      "Placeholder milestone: contributed to a dummy open-source repo.",
    ],
  },
  {
    year: "2023",
    theme: "Dummy theme — placeholder exploration year",
    items: [
      "Placeholder milestone: switched focus to a dummy new domain.",
      "Placeholder milestone: completed a dummy certification course.",
      "Placeholder milestone: freelanced on a dummy small project.",
    ],
  },
  {
    year: "2022",
    theme: "Dummy theme — placeholder early-career year",
    items: [
      "Placeholder milestone: started a dummy first full-time role.",
      "Placeholder milestone: shipped a dummy first production feature.",
      "Placeholder milestone: learned a dummy new language.",
    ],
  },
  {
    year: "2021",
    theme: "Dummy theme — placeholder learning year",
    items: [
      "Placeholder milestone: graduated from a dummy program.",
      "Placeholder milestone: built a dummy capstone project.",
      "Placeholder milestone: landed a dummy first internship.",
    ],
  },
];

// ─── knowledge graph (nodes + edges) ───────────────────────────────────────
// Valid `group` values used by the graph's colour legend:
//   "technology" | "finance" | "foundation" | "abstract"

export const DUMMY_KNOWLEDGE_NODES: KnowledgeNode[] = [
  { id: "dummy-frontend", label: "Frontend Engineering", group: "technology", weight: 9 },
  { id: "dummy-backend", label: "Backend Systems", group: "technology", weight: 8 },
  { id: "dummy-distsys", label: "Distributed Systems", group: "foundation", weight: 6 },
  { id: "dummy-markets", label: "Market Microstructure", group: "finance", weight: 5 },
  { id: "dummy-ml", label: "Applied ML", group: "technology", weight: 6 },
  { id: "dummy-philosophy", label: "Systems Thinking", group: "abstract", weight: 4 },
  { id: "dummy-cloud", label: "Cloud Infrastructure", group: "technology", weight: 7 },
  { id: "dummy-devops", label: "DevOps & CI/CD", group: "technology", weight: 5 },
  { id: "dummy-security", label: "Application Security", group: "foundation", weight: 5 },
  { id: "dummy-data", label: "Data Engineering", group: "technology", weight: 6 },
  { id: "dummy-productdesign", label: "Product Design", group: "abstract", weight: 5 },
  { id: "dummy-economics", label: "Behavioral Economics", group: "finance", weight: 4 },
  { id: "dummy-opensource", label: "Open Source", group: "abstract", weight: 4 },
  { id: "dummy-algorithms", label: "Algorithms & Data Structures", group: "foundation", weight: 6 },
];

export const DUMMY_KNOWLEDGE_EDGES: KnowledgeEdge[] = [
  { source: "dummy-frontend", target: "dummy-backend", strength: 0.7 },
  { source: "dummy-backend", target: "dummy-distsys", strength: 0.8 },
  { source: "dummy-backend", target: "dummy-markets", strength: 0.4 },
  { source: "dummy-distsys", target: "dummy-ml", strength: 0.5 },
  { source: "dummy-philosophy", target: "dummy-distsys", strength: 0.3 },
  { source: "dummy-backend", target: "dummy-cloud", strength: 0.7 },
  { source: "dummy-cloud", target: "dummy-devops", strength: 0.8 },
  { source: "dummy-devops", target: "dummy-distsys", strength: 0.5 },
  { source: "dummy-backend", target: "dummy-security", strength: 0.5 },
  { source: "dummy-security", target: "dummy-cloud", strength: 0.4 },
  { source: "dummy-ml", target: "dummy-data", strength: 0.7 },
  { source: "dummy-data", target: "dummy-backend", strength: 0.5 },
  { source: "dummy-frontend", target: "dummy-productdesign", strength: 0.6 },
  { source: "dummy-productdesign", target: "dummy-philosophy", strength: 0.4 },
  { source: "dummy-markets", target: "dummy-economics", strength: 0.6 },
  { source: "dummy-economics", target: "dummy-philosophy", strength: 0.3 },
  { source: "dummy-frontend", target: "dummy-opensource", strength: 0.5 },
  { source: "dummy-opensource", target: "dummy-devops", strength: 0.3 },
  { source: "dummy-distsys", target: "dummy-algorithms", strength: 0.6 },
  { source: "dummy-algorithms", target: "dummy-ml", strength: 0.5 },
];

// ─── skills ─────────────────────────────────────────────────────────────────
// Valid `icon` keys: terminal, chain, chart, notebook, brain, book, paper,
// note, project, clock, code, pen, flame, web3, backend, quant, infra,
// telescope, compass, flask

export const DUMMY_SKILLS: SkillCategory[] = [
  {
    category: "Core",
    icon: "code",
    skills: [
      { name: "TypeScript (Dummy)", level: 85 },
      { name: "Next.js (Dummy)", level: 82 },
      { name: "Node.js (Dummy)", level: 78 },
    ],
  },
  {
    category: "Infrastructure",
    icon: "infra",
    skills: [
      { name: "PostgreSQL (Dummy)", level: 75 },
      { name: "Docker (Dummy)", level: 70 },
      { name: "Redis (Dummy)", level: 65 },
    ],
  },
  {
    category: "Domains",
    icon: "brain",
    skills: [
      { name: "Distributed Systems (Dummy)", level: 68 },
      { name: "Applied ML (Dummy)", level: 60 },
    ],
  },
];

// ─── current focus ──────────────────────────────────────────────────────────

export const DUMMY_CURRENT_FOCUS: CurrentFocusItem[] = [
  {
    title: "Dummy focus item #1",
    description:
      "Placeholder description of something being worked on right now, for local preview only.",
    icon: "flame",
  },
  {
    title: "Dummy focus item #2",
    description: "Another placeholder focus item to preview a multi-item layout.",
    icon: "compass",
  },
  {
    title: "Dummy focus item #3",
    description: "A third placeholder item, mainly to test wrapping/spacing.",
    icon: "telescope",
  },
];

// ─── weird thoughts ─────────────────────────────────────────────────────────

export const DUMMY_WEIRD_THOUGHTS: WeirdThought[] = [
  {
    quote: "Dummy placeholder quote used only to preview the layout in development.",
    context: "Placeholder context line",
  },
  {
    quote: "Another dummy quote, kept short to test single-line rendering.",
  },
  {
    quote:
      "A longer dummy quote, added so you can see how the card handles multi-line placeholder text during local development.",
    context: "Placeholder context line #2",
  },
];

// ─── metrics ────────────────────────────────────────────────────────────────
// Valid `icon` keys: same list as DUMMY_SKILLS above.

export const DUMMY_METRICS: Metric[] = [
  { label: "Dummy Projects Shipped", value: 12, icon: "project" },
  { label: "Dummy Commits This Year", value: 480, suffix: "+", icon: "code" },
  { label: "Dummy Articles Written", value: 8, icon: "pen" },
  { label: "Dummy Bugs Squashed", value: 214, suffix: "+", icon: "flame" },
];

// ─── monthly deep work ──────────────────────────────────────────────────────

export const DUMMY_DEEP_WORK: MonthlyDeepWork[] = [
  { month: "Jan", hours: 40 },
  { month: "Feb", hours: 52 },
  { month: "Mar", hours: 61 },
  { month: "Apr", hours: 48 },
  { month: "May", hours: 70 },
  { month: "Jun", hours: 66 },
];

// ─── quarterly reading ──────────────────────────────────────────────────────

export const DUMMY_READING: QuarterlyReading[] = [
  { quarter: "Q1 (Dummy)", books: 3 },
  { quarter: "Q2 (Dummy)", books: 5 },
  { quarter: "Q3 (Dummy)", books: 2 },
  { quarter: "Q4 (Dummy)", books: 4 },
];

// ─── learning items ─────────────────────────────────────────────────────────

export const DUMMY_LEARNING: LearningItem[] = [
  { topic: "Rust (Dummy)", progress: 55 },
  { topic: "System Design (Dummy)", progress: 70 },
  { topic: "Applied Statistics (Dummy)", progress: 40 },
];

// ─── books & papers ─────────────────────────────────────────────────────────

export const DUMMY_BOOKS: Book[] = [
  { title: "Placeholder Book One", author: "Dummy Author A", status: "Reading" },
  { title: "Placeholder Book Two", author: "Dummy Author B", status: "Finished" },
  { title: "Placeholder Book Three", author: "Dummy Author C", status: "Queued" },
];

export const DUMMY_PAPERS: Paper[] = [
  { title: "Placeholder Paper One", author: "Dummy Researcher A", status: "Finished" },
  { title: "Placeholder Paper Two", author: "Dummy Researcher B", status: "Reading" },
];

// ─── social links ───────────────────────────────────────────────────────────
// Icon keys the site actually looks up: "github", "rss", "email" (see
// lib/cms.ts's getSocialHref / app/layout.tsx / app/about/page.tsx). Any
// other icon key is fine too — it just needs a matching entry in
// components that call getSocialHref with that key.

export const DUMMY_SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/example", icon: "github" },
  { label: "Email", href: "mailto:jordan.rivera@example.com", icon: "email" },
  { label: "RSS", href: "/feed.xml", icon: "rss" },
];


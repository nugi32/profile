import type { Project, SkillCategory, TimelineYear } from "@/types";

// ─────────────────────────────────────────────────────────────────────────
// RESUME / CV VIEW DATA — hardcoded on purpose, everywhere else is CMS-only
//
// This file backs ONLY the Resume/CV view (components/sections/resume-view.tsx).
// It is the one deliberate exception in this codebase: every other page and
// component reads exclusively from the CMS (see lib/cms.ts, useCms()), with
// no local fallback at all.
//
// The Resume view is intentionally different: it's meant to be a stable,
// always-identical formal snapshot — e.g. for printing to PDF or handing to
// a reviewer — that never changes shape just because a CMS collection is
// slow, empty, or temporarily misconfigured. So instead of reading from the
// CMS, it reads only from this file.
//
// Do NOT import this file from any other component. If you need CMS-backed
// identity data elsewhere, use `useCms()` (client components) or
// `fetchSiteMeta()` from lib/cms.ts (server components) instead.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  // Full legal name, exactly as it should appear on a CV.
  fullName: "Nugroho Adhipratama Ancha Saputra",

  // Short name used as the Resume view's avatar initials fallback label.
  displayName: "Nugi",

  // Shown as initials in the avatar placeholder when no photo is set.
  initials: "NA",

  // Long form role, used on the Resume view.
  role: "Web3 Developer & Quantitative Research Builder",

  shortRole: "Web3 Developer & Quant Builder",

  location: "Surabaya, Indonesia",

  email: "nugrohoadhipratama135@gmail.com",

  // Add a phone number if you want it visible on the Resume view. Leave
  // empty to hide it.
  phone: "",

  // Path to a photo in /public, e.g. "/profile.jpg". Leave empty to use the
  // initials avatar instead.
  photoUrl: "",

  // One or two sentences a reviewer can read in under 10 seconds.
  summary:
    "Web3 developer and independent quantitative research builder, focused on decentralized systems and market microstructure. I document my process publicly and build the infrastructure I wish already existed for both fields.",

  education: [
    {
      institution: "Institut Teknologi Placeholder",
      degree: "B.Sc. in Informatics Engineering",
      period: "2023 — Present",
      notes: "Placeholder entry. Relevant coursework, GPA, or honors go here.",
    },
  ] as Array<{
    institution: string;
    degree: string;
    period: string;
    notes?: string;
  }>,

  achievements: [
    {
      title: "Placeholder Hackathon Finalist",
      issuer: "Example Organizer",
      year: "2025",
    },
  ] as Array<{ title: string; issuer: string; year: string }>,

  links: {
    linkedin: "",
    github: "https://github.com/nugi32",
    twitter: "https://x.com/Nug_320",
  },
};

// Convenience string used in the Resume view header:
//   Nugroho Adhi Pratama ("Nugi")
export const formalNameWithAlias = `${profile.fullName} ("${profile.displayName}")`;

// Flat skill list shown on the Resume view.
export const resumeSkills: SkillCategory[] = [
  {
    category: "Core",
    icon: "code",
    skills: [
      { name: "TypeScript", level: 85 },
      { name: "Solidity", level: 75 },
      { name: "Next.js", level: 85 },
      { name: "Python", level: 80 },
    ],
  },
  {
    category: "Domains",
    icon: "brain",
    skills: [
      { name: "Decentralized Systems", level: 75 },
      { name: "Quantitative Research", level: 70 },
      { name: "Market Microstructure", level: 65 },
    ],
  },
];

// Curated, always-featured projects for the Resume view.
export const resumeProjects: Project[] = [
  {
    slug: "placeholder-project",
    name: "Placeholder Project",
    tagline: "Replace with a real project summary.",
    description: "Replace with a real project summary.",
    longDescription: "Replace with a real project summary.",
    technologies: ["TypeScript", "Next.js"],
    status: "In Development",
    achievements: [],
    githubUrl: "https://github.com/nugi32",
    accent: "ice",
    featured: true,
    imageUrl: "",
  },
];

// Growth timeline for the Resume view.
export const resumeTimeline: TimelineYear[] = [
  {
    year: "2025",
    theme: "Placeholder theme",
    items: ["Placeholder milestone — replace with real history."],
  },
];

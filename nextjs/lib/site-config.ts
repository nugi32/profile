// ─────────────────────────────────────────────────────────────────────────
// STRUCTURAL SITE CONFIG (no personal/identity data on purpose)
//
// Everything here is app structure — routes and deployment settings — not
// content. Every identity fact (name, role, email, social links, the title
// and description used in <head>) is served by the CMS instead:
//
//   - Page/layout metadata → `generateMetadata()` + `fetchSiteMeta()`
//     (lib/cms.ts), e.g. app/layout.tsx and app/about/page.tsx.
//   - The name shown in the navbar/loading UI → `useCms().profile` at the
//     call site (components/layout/navbar.tsx, mobile-nav.tsx, etc.).
//   - GitHub/X/Notion/email links shown anywhere → `useCms().socialLinks`
//     (or `fetchSiteMeta()` server-side), via `getSocialHref()`.
//
// There is deliberately no hardcoded fallback name/email/links object left
// in this file — an empty CMS collection should render as empty, not as a
// stale placeholder identity.
//
// `nav[].icon` holds an actual icon component (react-icons/lu), not an
// emoji character — this keeps every nav item rendering as a crisp,
// consistent vector icon instead of relying on the visitor's OS/browser
// emoji font (which is where the "looks unprofessional" inconsistency
// comes from).
// ─────────────────────────────────────────────────────────────────────────

import {
  LuHouse,
  LuWrench,
  LuNotebookPen,
  LuNetwork,
  LuTrendingUp,
  LuUserRound,
} from "react-icons/lu";
import type { IconType } from "react-icons";

export const siteConfig = {
  // Deployment URL, not personal content — comes from the environment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nugiprofile.netlify.app",

  ogImage: "/og.png",

  nav: [
    { label: "Home", href: "/", icon: LuHouse },
    { label: "Projects", href: "/projects", icon: LuWrench },
    { label: "Journal", href: "/journal", icon: LuNotebookPen },
    { label: "Idea Map", href: "/knowledge", icon: LuNetwork },
    { label: "Progress", href: "/progress", icon: LuTrendingUp },
    { label: "About", href: "/about", icon: LuUserRound },
  ] as Array<{ label: string; href: string; icon: IconType }>,
};

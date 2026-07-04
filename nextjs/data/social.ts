import type { SocialLink } from "@/types";
import { siteConfig } from "@/lib/site-config";

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.links.github, icon: "github" },
  { label: "X / Twitter", href: siteConfig.links.twitter, icon: "twitter" },
  { label: "Email", href: siteConfig.links.email, icon: "email" },
  { label: "Notion", href: siteConfig.links.notion, icon: "notion" },
];

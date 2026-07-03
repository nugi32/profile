import Link from "next/link";
import { FaGithub, FaXTwitter, FaEnvelope, FaRss } from "react-icons/fa6";
import { SiNotion } from "react-icons/si";
import { siteConfig } from "@/lib/site-config";
import { socialLinks } from "@/data/social";

const iconFor: Record<string, React.ComponentType<{ size?: number }>> = {
  github: FaGithub,
  twitter: FaXTwitter,
  email: FaEnvelope,
  rss: FaRss,
  notion: SiNotion,
};

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-panel-border">
      <div className="container flex flex-col items-center gap-8 py-16 text-center">
        <p className="font-display text-2xl italic text-foreground/90">
          "Stay curious. Compound knowledge."
        </p>

        <div className="flex items-center gap-5">
          {socialLinks.map((link) => {
            const Icon = iconFor[link.icon];
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={link.label}
                className="rounded-full border border-panel-border p-3 text-muted transition-colors hover:border-ice/50 hover:text-ice"
              >
                <Icon size={16} />
              </Link>
            );
          })}
        </div>

        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Built as a public second brain.
        </p>
      </div>
    </footer>
  );
}

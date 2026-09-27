"use client";

import Link from "next/link";
import { FaGithub, FaXTwitter, FaEnvelope, FaRss, FaLink } from "react-icons/fa6";
import { LuArrowUp } from "react-icons/lu";
import { SiNotion } from "react-icons/si";
import { useCms } from "../providers/cms-provider";

const iconFor: Record<string, React.ComponentType<{ size?: number }>> = {
  github: FaGithub,
  twitter: FaXTwitter,
  email: FaEnvelope,
  rss: FaRss,
  notion: SiNotion,
};

export function Footer() {
  // CMS collections: social-links, profile. Nothing here is hardcoded except
  // the sign-off: an empty collection just means fewer icons.
  const { socialLinks, profile } = useCms();
  const shortRole = profile?.shortRole ?? "";
  const location = profile?.location ?? "";
  const fullName = profile?.name ?? "";
  const displayName = profile?.displayName ?? "";
  const formalNameWithAlias =
    fullName && displayName ? `${fullName} ("${displayName}")` : fullName || displayName;

  return (
    <footer className="relative z-10 mt-24 pb-10">
      <div className="container">
        <div className="sticker relative overflow-hidden bg-grape-tint px-6 py-12 text-center md:px-12">
          <p className="font-display text-3xl font-extrabold text-balance sm:text-4xl">
            Stay curious. Compound knowledge.
          </p>
          <p className="mx-auto mt-3 max-w-md text-soft">
            Thanks for stopping by. If something here sparked an idea, say hi!
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconFor[link.icon] ?? FaLink;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="chip flex h-12 w-12 items-center justify-center"
                >
                  <Icon size={18} />
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="chip flex h-12 items-center gap-2 !bg-sun px-5 text-sm font-semibold text-onaccent"
            >
              <LuArrowUp size={16} aria-hidden="true" />
              Back to top
            </button>
          </div>
        </div>

        {formalNameWithAlias && (
          <div className="mt-8 flex flex-col items-center gap-1 text-center text-sm text-soft">
            <p>
              © {new Date().getFullYear()} {formalNameWithAlias}. Built as a public second
              brain.
            </p>
            {(shortRole || location) && (
              <p className="text-xs">{[shortRole, location].filter(Boolean).join(" · ")}</p>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}

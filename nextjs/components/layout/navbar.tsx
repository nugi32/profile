"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LuFileText, LuMenu, LuSearch, LuSparkles } from "react-icons/lu";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { useViewMode } from "../providers/view-mode-provider";
import { useCms } from "../providers/cms-provider";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { mode, toggleMode } = useViewMode();
  const { profile } = useCms();
  const displayName = profile?.displayName ?? "";
  const isHome = pathname === "/";

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-40 px-3 sm:px-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <Link
            href="/"
            className="chip flex h-11 items-center gap-2 px-4 font-display text-lg font-extrabold"
          >
            <LuSparkles size={18} className="text-grape" aria-hidden="true" />
            {displayName || "Home"}
          </Link>

          <nav
            aria-label="Main"
            className="hidden rounded-full border-2 border-line bg-card p-1 shadow-pop-sm md:flex"
          >
            {siteConfig.nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active ? "text-white" : "text-ink hover:bg-ink/5"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-bubble"
                      className="absolute inset-0 -z-0 rounded-full bg-grape"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {isHome && (
              <button
                type="button"
                onClick={toggleMode}
                className={cn(
                  "chip hidden h-11 items-center gap-2 px-4 text-sm font-semibold lg:flex",
                  mode === "resume" && "!bg-sun text-onaccent"
                )}
              >
                <LuFileText size={16} aria-hidden="true" />
                {mode === "resume" ? "Back to the fun stuff" : "Just the CV"}
              </button>
            )}

            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search the site"
              className="chip flex h-11 items-center gap-2 px-3.5 text-sm font-semibold md:px-4"
            >
              <LuSearch size={18} aria-hidden="true" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden rounded-md border-2 border-line/40 px-1.5 text-[11px] font-bold text-soft xl:block">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="chip flex h-11 w-11 items-center justify-center md:hidden"
            >
              <LuMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

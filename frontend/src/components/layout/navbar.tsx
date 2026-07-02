"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMenu, LuCommand } from "react-icons/lu";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

export function Navbar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled
            ? "border-b border-panel-border bg-background/80 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-display text-lg tracking-tight">
            {siteConfig.name}
            <span className="text-ice">.</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ice",
                  pathname === item.href && "text-ice"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="hidden items-center gap-2 rounded-full border border-panel-border px-3 py-1.5 font-mono text-xs text-muted hover:text-foreground md:flex"
            >
              <LuCommand size={13} />
              <span>Search</span>
              <kbd className="rounded border border-panel-border px-1.5 text-[10px]">K</kbd>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-panel-border p-2 text-muted hover:text-foreground md:hidden"
            >
              <LuMenu size={18} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

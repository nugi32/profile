"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LuSearch } from "react-icons/lu";
import { siteConfig } from "@/lib/site-config";
import { projects } from "../../data/projects";
import { journalEntries } from "../../data/journal";

interface Entry {
  label: string;
  href: string;
  group: string;
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const entries: Entry[] = useMemo(
    () => [
      ...siteConfig.nav.map((n) => ({ label: n.label, href: n.href, group: "Navigate" })),
      ...projects.map((p) => ({ label: p.name, href: `/projects/${p.slug}`, group: "Projects" })),
      ...journalEntries.map((j) => ({ label: j.title, href: `/journal/${j.slug}`, group: "Journal" })),
    ],
    []
  );

  const filtered = entries.filter((e) =>
    e.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-panel-border bg-panel shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center gap-3 border-b border-panel-border px-4 py-3">
              <LuSearch className="text-muted" size={16} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, journal, pages..."
                className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="p-4 text-sm text-muted">No matches found.</p>
              )}
              {filtered.map((entry) => (
                <button
                  key={entry.href}
                  onClick={() => {
                    router.push(entry.href);
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm hover:bg-background"
                >
                  <span>{entry.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {entry.group}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

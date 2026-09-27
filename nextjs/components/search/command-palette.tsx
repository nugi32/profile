"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LuSearch, LuCornerDownLeft } from "react-icons/lu";
import {
  buildSearchIndex,
  searchItems,
  GROUP_ORDER,
  type SearchItem,
  type SearchGroup,
} from "@/lib/search-index";
import { useCms } from "../providers/cms-provider";

const MAX_RESULTS = 24;

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Everything searchable comes straight from the already-loaded CMS data,
  // so there is no second fetch and no stale local copy to drift out of sync.
  const cms = useCms();

  const index = useMemo(() => buildSearchIndex(cms), [cms]);

  const results = useMemo(
    () => searchItems(index, query).slice(0, MAX_RESULTS),
    [index, query]
  );

  // Group the flat, score-ordered result list for display.
  const grouped = useMemo(() => {
    const buckets = new Map<SearchGroup, SearchItem[]>();
    for (const item of results) {
      const bucket = buckets.get(item.group) ?? [];
      bucket.push(item);
      buckets.set(item.group, bucket);
    }
    return GROUP_ORDER.filter((group) => buckets.has(group)).map((group) => ({
      group,
      items: buckets.get(group)!,
    }));
  }, [results]);

  // Flat order matching what the user sees, so arrow keys move predictably.
  const flatResults = useMemo(
    () => grouped.flatMap((section) => section.items),
    [grouped]
  );

  const go = useCallback(
    (item: SearchItem) => {
      router.push(item.href);
      onClose();
    },
    [router, onClose]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) =>
          flatResults.length ? (prev + 1) % flatResults.length : 0
        );
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) =>
          flatResults.length
            ? (prev - 1 + flatResults.length) % flatResults.length
            : 0
        );
        return;
      }
      if (event.key === "Enter") {
        const item = flatResults[activeIndex];
        if (item) {
          event.preventDefault();
          go(item);
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, flatResults, activeIndex, go, onClose]);

  // Keep the highlighted row inside the scroll viewport.
  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]'
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  let rowIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="sticker w-full max-w-xl overflow-hidden !shadow-pop-lg"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
          >
            <div className="flex items-center gap-3 border-b-2 border-line px-4 py-3.5">
              <LuSearch className="text-grape" size={20} aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="What are you looking for?"
                aria-label="Search"
                className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-soft"
              />
              <kbd className="hidden rounded-md border-2 border-line/40 px-1.5 text-[11px] font-bold text-soft sm:block">
                esc
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[22rem] overflow-y-auto p-2">
              {flatResults.length === 0 && (
                <p className="p-8 text-center text-soft">
                  Nothing matches &ldquo;{query}&rdquo; yet. Try a project, a skill, or a topic.
                </p>
              )}

              {grouped.map((section) => (
                <div key={section.group} className="mb-2 last:mb-0">
                  <p className="px-3 py-1.5 text-xs font-bold text-soft">{section.group}</p>
                  {section.items.map((item) => {
                    rowIndex += 1;
                    const isActive = rowIndex === activeIndex;
                    const currentIndex = rowIndex;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-active={isActive}
                        onMouseEnter={() => setActiveIndex(currentIndex)}
                        onClick={() => go(item)}
                        className={[
                          "flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left transition-colors",
                          isActive ? "bg-grape-tint" : "hover:bg-ink/5",
                        ].join(" ")}
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-ink">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="mt-0.5 block truncate text-sm text-soft">
                              {item.subtitle}
                            </span>
                          )}
                        </span>
                        {isActive && (
                          <LuCornerDownLeft className="shrink-0 text-grape" size={16} aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t-2 border-line px-4 py-2 text-xs font-medium text-soft">
              <span>
                {flatResults.length} result{flatResults.length === 1 ? "" : "s"}
              </span>
              <span>↑ ↓ to move · Enter to open</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

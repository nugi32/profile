"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { fetchAllCmsData, type CmsData } from "@/lib/cms";
import { fetchJournal } from "@/lib/journal";
import { LoadingScreen } from "./loading-screen";
import type { JournalEntry } from "@/types";

type Status = "loading" | "ready";

/**
 * Everything the site renders: the CMS collections, plus the journal, which
 * is authored in Notion rather than the CMS and arrives through this site's
 * own /api/journal-entries route.
 */
export type SiteData = CmsData & { journal: JournalEntry[] };

const CmsContext = createContext<SiteData | null>(null);

/**
 * Loads every CMS collection AND the Notion-backed journal once, at the root
 * of the app.
 *
 * Until the first load settles, the whole page stays on the loading screen —
 * that part is unchanged. What changed is what happens next: this provider
 * no longer treats "a collection is empty" or "one source failed" as a
 * reason to block the page behind a full-screen error. Both `fetchAllCmsData`
 * and `fetchJournal` already turn a broken or unconfigured source into an
 * empty result (see the comments in lib/cms.ts and lib/journal.ts), and
 * every section is responsible for showing its own short "nothing published
 * yet" message when its slice of data is empty — that is what makes the
 * failure a per-section, quiet message instead of a page-wide error.
 *
 * Two sources, one gate:
 *   - CMS    → everything except the journal (see lib/cms.ts)
 *   - Notion → the journal only, via /api/journal-entries (see lib/journal.ts)
 *
 * Note: the CMS half runs in the browser, so the frontend's origin must be in
 * the CMS CORS whitelist (CMS admin → CORS) for it to succeed at all. If it
 * isn't, every CMS collection quietly comes back empty rather than blocking
 * the page — check the browser console for the `[cms]` warnings that name
 * which collection failed and why.
 */
export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    Promise.all([
      fetchAllCmsData(controller.signal),
      fetchJournal(controller.signal),
    ])
      .then(([cms, journal]) => {
        if (!active) return;
        setData({ ...cms, journal });
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (error instanceof DOMException && error.name === "AbortError") return;

        // At this point both fetchAllCmsData and fetchJournal have already
        // absorbed every ordinary failure into an empty result — reaching
        // this branch means something unexpected happened outside of that
        // (a bug, a browser API missing, etc). Fail open: render the site
        // with everything empty rather than showing a dead end, so a rare,
        // unanticipated error still leaves the page usable.
        console.error("Unexpected error while loading site data:", error);
        setData({
          profile: null,
          projects: [],
          timeline: [],
          knowledgeNodes: [],
          knowledgeEdges: [],
          skills: [],
          currentFocus: [],
          weirdThoughts: [],
          metrics: [],
          deepWork: [],
          reading: [],
          learning: [],
          books: [],
          papers: [],
          socialLinks: [],
          errors: { _unexpected: error instanceof Error ? error.message : "Unknown error" },
          journal: [],
        });
        setStatus("ready");
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {status === "loading" && <LoadingScreen key="cms-loading" />}
      </AnimatePresence>
      {status === "ready" && data ? (
        <CmsContext.Provider value={data}>{children}</CmsContext.Provider>
      ) : null}
    </>
  );
}

/**
 * Reads the loaded site data (CMS collections + the Notion journal). Safe to
 * call unconditionally inside any component rendered below the provider:
 * children only mount once the first load has settled, so this never returns
 * null in practice. Every collection is guaranteed to be an array (possibly
 * empty) and `profile` is either a full record or `null` — never undefined,
 * and never a thrown error.
 */
export function useCms(): SiteData {
  const data = useContext(CmsContext);
  if (!data) {
    throw new Error("useCms() must be used inside <CmsProvider>");
  }
  return data;
}

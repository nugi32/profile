/**
 * ============================================================================
 *  THE JOURNAL — served by Notion, not the CMS
 *
 *  Journal entries are authored in Notion and read by lib/notion.ts, which
 *  runs server-side only (the Notion token must never reach the browser).
 *
 *  The site itself is a client-rendered app gated behind <CmsProvider>, so it
 *  reads the journal through this site's own API route, /api/journal-entries,
 *  which is a thin server-side proxy in front of Notion.
 * ============================================================================
 */

import type { JournalEntry } from "@/types";

/**
 * Fetches the journal from the local Notion-backed API route.
 *
 * Called from the browser as part of the same load gate as the CMS
 * collections. This never throws for an ordinary failure (Notion
 * unreachable, misconfigured token, empty database) — it logs a console
 * warning and resolves with an empty array instead, so a broken or
 * unconfigured Notion connection shows up as "no entries published yet" on
 * /journal rather than blocking the entire site from rendering.
 *
 * An `AbortError` is re-thrown deliberately: that means the request was
 * cancelled (the component unmounted, or the user hit "Try again"), not that
 * the journal is broken, and the caller needs to tell the difference.
 */
export async function fetchJournal(signal?: AbortSignal): Promise<JournalEntry[]> {
  try {
    const response = await fetch("/api/journal-entries", {
      signal,
      cache: "no-store",
    });

    const payload = (await response.json().catch(() => null)) as {
      docs?: unknown;
      error?: string;
    } | null;

    if (payload?.error) {
      console.warn(`[journal] Notion journal unavailable: ${payload.error}`);
      return [];
    }

    if (!response.ok || !Array.isArray(payload?.docs)) {
      console.warn(
        `[journal] Unexpected journal response (${response.status} ${response.statusText})`
      );
      return [];
    }

    return payload.docs as JournalEntry[];
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    console.warn("[journal] Failed to load journal entries", error);
    return [];
  }
}

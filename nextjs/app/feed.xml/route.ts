import { NextResponse } from "next/server";
import { getNotionJournalEntries } from "@/lib/notion";
import { generateRssFeed } from "@/lib/rss";
import { fetchSiteMeta } from "@/lib/cms";

export const dynamic = "force-dynamic";

async function getChannelMeta() {
  const { profile } = await fetchSiteMeta();
  const name = profile?.displayName ?? "";
  return {
    title: name ? `${name} — Journal` : "Journal",
    description: profile?.bio ?? "",
  };
}

export async function GET() {
  const channel = await getChannelMeta();

  try {
    const entries = await getNotionJournalEntries();
    return new NextResponse(generateRssFeed(entries, channel), {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  } catch {
    // A Notion outage should not 500 the feed URL; return an empty feed.
    return new NextResponse(generateRssFeed([], channel), {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  }
}

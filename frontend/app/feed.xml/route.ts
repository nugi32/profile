import { NextResponse } from "next/server";
import { getNotionJournalEntries } from "@/lib/notion";
import { generateRssFeed } from "@/lib/rss";

export async function GET() {
  const entries = await getNotionJournalEntries();
  const rss = generateRssFeed(entries);

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

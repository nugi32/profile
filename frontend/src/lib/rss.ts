import { siteConfig } from "@/lib/site-config";
import type { JournalEntry } from "@/types";

export function generateRssFeed(entries: JournalEntry[]): string {
  const items = entries
    .map(
      (entry) => `
    <item>
      <title><![CDATA[${entry.title}]]></title>
      <description><![CDATA[${entry.description}]]></description>
      <link>${siteConfig.url}/journal/${entry.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/journal/${entry.slug}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name} — Journal</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;
}

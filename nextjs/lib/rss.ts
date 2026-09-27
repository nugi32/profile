import { siteConfig } from "@/lib/site-config";
import type { JournalEntry } from "@/types";

/**
 * The feed channel's `<title>`/`<description>` are CMS-driven (see
 * app/feed.xml/route.ts, which supplies them from `fetchSiteMeta()`). No
 * hardcoded name/description fallback lives here — an empty CMS profile
 * just means a generically-labelled feed, not a stale placeholder identity.
 */
export function generateRssFeed(
  entries: JournalEntry[],
  channel: { title: string; description: string } = {
    title: "Journal",
    description: "",
  }
): string {
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
    <title><![CDATA[${channel.title}]]></title>
    <link>${siteConfig.url}</link>
    <description><![CDATA[${channel.description}]]></description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;
}

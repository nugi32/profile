import { getNotionJournalEntries } from "@/lib/notion";

export const dynamic = "force-dynamic";

/**
 * Server-side proxy in front of Notion. The journal is the one part of this
 * site that is NOT CMS-backed; it is authored in Notion, and the Notion token
 * stays on the server, so the browser reads the entries through here.
 */
export async function GET() {
  try {
    const entries = await getNotionJournalEntries();
    return Response.json({ docs: entries });
  } catch (error) {
    return Response.json(
      {
        docs: [],
        error:
          error instanceof Error
            ? error.message
            : "Unable to reach Notion for journal entries",
      },
      { status: 502 }
    );
  }
}

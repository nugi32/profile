import { getNotionJournalEntries } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await getNotionJournalEntries();

  return new Response(JSON.stringify({ docs: entries }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

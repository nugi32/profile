import { getNotionJournalEntries } from "@/lib/notion";

export async function GET() {
  const entries = await getNotionJournalEntries();

  return new Response(JSON.stringify({ docs: entries }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

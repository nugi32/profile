import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, splitMarkdownLines } from "@/lib/utils";
import { getNotionJournalEntryBySlug } from "@/lib/notion";
import BlockRenderer from "../../notion/BlockRenderer";
import { SectionHeader } from "../../../components/layout/section-header";
import { Tag } from "../../../components/ui/tag";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

function renderMarkdown(content: string) {
  return splitMarkdownLines(content).map((line, index) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="mt-8 text-2xl font-semibold text-foreground">
          {line.slice(3)}
        </h2>
      );
    }

    if (line.startsWith("- ")) {
      return (
        <p key={index} className="mt-4 text-base leading-relaxed text-foreground/80">
          • {line.slice(2)}
        </p>
      );
    }

    if (/^\d+\.\s/.test(line)) {
      return (
        <p key={index} className="mt-4 text-base leading-relaxed text-foreground/80">
          {line}
        </p>
      );
    }

    return (
      <p key={index} className="mt-6 text-base leading-relaxed text-foreground/80">
        {line}
      </p>
    );
  });
}

function NotionBlockTree({ blocks, skipFirstHeading = false }: { blocks: any[]; skipFirstHeading?: boolean }) {
  let skipped = false;

  return (
    <>
      {blocks.map((block) => {
        // Skip the first heading_1 if it matches the title
        if (skipFirstHeading && !skipped && block.type === "heading_1") {
          skipped = true;
          return null;
        }

        return (
          <div key={block.id}>
            <BlockRenderer block={block} />
            {block.children && block.type !== "table" && block.children.length > 0 && (
              <div className="ml-6">
                <NotionBlockTree blocks={block.children} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default async function JournalEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await getNotionJournalEntryBySlug(params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <section className="container py-24">
      <SectionHeader eyebrow="Note" title={entry.title} />
      <div className="mb-6 text-sm text-muted">
        <span>{formatDate(entry.date)}</span>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      {entry.description ? (
        <p className="mb-8 max-w-3xl text-base leading-relaxed text-foreground/80">
          {entry.description}
        </p>
      ) : null}
      <div className="rounded-3xl border border-panel-border bg-panel/50 p-8 text-foreground">
        {entry.contentBlocks && entry.contentBlocks.length > 0 ? (
          <div className="space-y-2">
            <NotionBlockTree blocks={entry.contentBlocks} skipFirstHeading={true} />
          </div>
        ) : (
          renderMarkdown(entry.content)
        )}
      </div>
      <div className="mt-10">
        <Link href="/journal" className="text-sm font-mono uppercase tracking-[0.32em] text-ice transition-colors hover:text-foreground">
          ← Back to journal
        </Link>
      </div>
    </section>
  );
}

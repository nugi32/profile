"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { cn, formatDate, splitMarkdownLines } from "@/lib/utils";
import BlockRenderer from "../../notion/BlockRenderer";
import RichText from "../../notion/RichText";
import { LuArrowLeft, LuSearchX, LuCoffee } from "react-icons/lu";
import { buttonVariants } from "../../../components/ui/button";
import { Tag } from "../../../components/ui/tag";
import { useCms } from "@/components/providers/cms-provider";
import type { NotionContentBlock } from "@/types";

/**
 * Renders one bulleted/numbered list item's own content (text + any nested
 * blocks, e.g. a sub-list) — see the grouping note in BlockRenderer.tsx for
 * why list items are rendered here instead of in BlockRenderer.
 */
function ListItemContent({ block }: { block: NotionContentBlock }) {
  const richText =
    block.type === "numbered_list_item"
      ? (block as any).numbered_list_item.rich_text
      : (block as any).bulleted_list_item.rich_text;

  return (
    <li className="text-lg leading-relaxed text-ink/85">
      <RichText text={richText} />
      {block.children && block.children.length > 0 && (
        <div className="ml-6 mt-1 border-l-2 border-dashed border-line/25 pl-4">
          <NotionBlockTree blocks={block.children as NotionContentBlock[]} />
        </div>
      )}
    </li>
  );
}

/**
 * Groups a flat block array into runs so consecutive same-type list items
 * ("bulleted_list_item" / "numbered_list_item") land in a single <ul>/<ol>
 * instead of one list per item — Notion's API returns them as separate
 * sibling blocks, it doesn't group them itself.
 */
type BlockGroup =
  | { kind: "list"; listType: "bulleted_list_item" | "numbered_list_item"; items: NotionContentBlock[] }
  | { kind: "block"; block: NotionContentBlock };

function groupBlocks(blocks: NotionContentBlock[]): BlockGroup[] {
  const groups: BlockGroup[] = [];

  for (const block of blocks) {
    const isListItem = block.type === "bulleted_list_item" || block.type === "numbered_list_item";
    const last = groups[groups.length - 1];

    if (isListItem && last?.kind === "list" && last.listType === block.type) {
      last.items.push(block);
    } else if (isListItem) {
      groups.push({
        kind: "list",
        listType: block.type as "bulleted_list_item" | "numbered_list_item",
        items: [block],
      });
    } else {
      groups.push({ kind: "block", block });
    }
  }

  return groups;
}

/**
 * Renders the Notion block tree for an entry. Notion is the source of truth
 * for the journal, so this is the primary path; the Markdown renderer below
 * is only used for entries that arrived without block data.
 */
function NotionBlockTree({
  blocks,
  skipFirstHeading = false,
}: {
  blocks: NotionContentBlock[];
  skipFirstHeading?: boolean;
}) {
  let skipped = false;

  // Drop a leading heading_1 (it usually repeats the page title) before
  // grouping, so it can't split what would otherwise be one list run.
  const visibleBlocks = blocks.filter((block) => {
    if (skipFirstHeading && !skipped && block.type === "heading_1") {
      skipped = true;
      return false;
    }
    return true;
  });

  return (
    <>
      {groupBlocks(visibleBlocks).map((group) => {
        if (group.kind === "list") {
          const ListTag = group.listType === "numbered_list_item" ? "ol" : "ul";
          return (
            <ListTag
              key={group.items[0].id}
              className={cn(
                "mb-4 ml-6 space-y-2",
                group.listType === "numbered_list_item"
                  ? "list-decimal marker:font-bold marker:text-grape"
                  : "list-disc marker:text-grape"
              )}
            >
              {group.items.map((block) => (
                <ListItemContent key={block.id} block={block} />
              ))}
            </ListTag>
          );
        }

        const { block } = group;
        return (
          <div key={block.id}>
            <BlockRenderer block={block} />
            {block.children && block.type !== "table" && block.children.length > 0 && (
              <div className="ml-6 border-l-2 border-dashed border-line/25 pl-4">
                <NotionBlockTree blocks={block.children} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function renderMarkdown(content: string) {
  return splitMarkdownLines(content).map((line, index) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="mb-3 mt-10 font-display text-3xl font-extrabold">
          {line.slice(3)}
        </h2>
      );
    }

    if (line.startsWith("# ")) {
      return (
        <h2 key={index} className="mb-3 mt-10 font-display text-4xl font-extrabold">
          {line.slice(2)}
        </h2>
      );
    }

    if (line.startsWith("- ")) {
      return (
        <p key={index} className="mt-3 text-lg leading-relaxed text-ink/85">
          • {line.slice(2)}
        </p>
      );
    }

    return (
      <p key={index} className="mt-5 text-lg leading-relaxed text-ink/85">
        {line}
      </p>
    );
  });
}

export default function JournalEntryPage() {
  const params = useParams<{ slug: string }>();
  // Notion-backed journal, already loaded by <CmsProvider>.
  const { journal } = useCms();
  const entry = journal.find((item) => item.slug === params?.slug);

  if (!entry) {
    return (
      <section className="container flex min-h-[60vh] flex-col items-center justify-center gap-5 py-10 text-center">
        <p className="flex justify-center" aria-hidden="true">
          <LuSearchX size={48} strokeWidth={1.75} />
        </p>
        <h1 className="font-display text-3xl font-extrabold">Couldn&apos;t find that note</h1>
        <p className="max-w-md text-soft">
          It doesn&apos;t exist, or it hasn&apos;t been published yet.
        </p>
        <Link href="/journal" className={buttonVariants()}>
          Back to the journal
        </Link>
      </section>
    );
  }

  return (
    <article className="container max-w-3xl py-10">
      <Link
        href="/journal"
        className="chip inline-flex items-center gap-2 px-4 py-1.5 text-sm font-bold"
      >
        <LuArrowLeft size={16} aria-hidden="true" /> All notes
      </Link>

      <h1 className="mt-8 font-display text-5xl font-extrabold leading-tight text-balance sm:text-6xl">
        {entry.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-semibold text-soft">
        {entry.date && <span>{formatDate(entry.date)}</span>}
        {entry.readingTime ? (
          <span className="inline-flex items-center gap-1.5">
            <LuCoffee size={16} aria-hidden="true" /> {entry.readingTime} min read
          </span>
        ) : null}
      </div>

      {entry.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      {entry.description ? (
        <p className="mt-8 text-xl leading-relaxed text-ink/80">{entry.description}</p>
      ) : null}

      <div className="sticker mt-10 p-6 text-ink md:p-10">
        {entry.contentBlocks && entry.contentBlocks.length > 0 ? (
          <div className="space-y-2">
            <NotionBlockTree blocks={entry.contentBlocks} skipFirstHeading />
          </div>
        ) : (
          renderMarkdown(entry.content)
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/journal" className={buttonVariants({ variant: "outline" })}>
          Back to the journal
        </Link>
      </div>
    </article>
  );
}

import { Client, isFullBlock, isFullPage } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { journalEntries as fallbackJournalEntries } from "@/data/journal";
import type { JournalEntry, NotionContentBlock } from "@/types";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

type NotionPage = {
  id: string;
  properties: PageObjectResponse["properties"];
  content: BlockWithChildren[];
};

async function getBlockChildren(blockId: string): Promise<BlockWithChildren[]> {
  const { results } = await notion.blocks.children.list({
    block_id: blockId,
  });

  return Promise.all(
    results
      .filter(isFullBlock)
      .map(async (block): Promise<BlockWithChildren> => {
        if (block.has_children) {
          return {
            ...block,
            children: await getBlockChildren(block.id),
          };
        }

        return block;
      })
  );
}

function getTextValue(properties: Record<string, any>, names: string[]): string {
  for (const name of names) {
    const property = properties[name];

    if (!property) continue;

    if (property.type === "title") {
      return property.title.map((item: { plain_text?: string }) => item.plain_text ?? "").join("");
    }

    if (property.type === "rich_text") {
      return property.rich_text.map((item: { plain_text?: string }) => item.plain_text ?? "").join("");
    }
  }

  return "";
}

function getDateValue(properties: Record<string, any>, names: string[]): string {
  for (const name of names) {
    const property = properties[name];

    if (!property) continue;

    if (property.type === "date" && property.date?.start) {
      return property.date.start;
    }

    if (property.type === "created_time") {
      return property.created_time;
    }
  }

  return new Date().toISOString();
}

function getTags(properties: Record<string, any>, names: string[]): string[] {
  for (const name of names) {
    const property = properties[name];

    if (property?.type === "multi_select") {
      return property.multi_select.map((item: { name: string }) => item.name);
    }
  }

  return [];
}

function getReadingTime(properties: Record<string, any>, names: string[]): number {
  for (const name of names) {
    const property = properties[name];

    if (property?.type === "number" && typeof property.number === "number") {
      return property.number;
    }
  }

  return 5;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function serializeBlocksToMarkdown(blocks: BlockWithChildren[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph": {
          const text = block.paragraph.rich_text
            .map((item) => item.plain_text)
            .join("");
          return text;
        }
        case "heading_1": {
          const text = block.heading_1.rich_text
            .map((item) => item.plain_text)
            .join("");
          return `# ${text}`;
        }
        case "heading_2": {
          const text = block.heading_2.rich_text
            .map((item) => item.plain_text)
            .join("");
          return `## ${text}`;
        }
        case "heading_3": {
          const text = block.heading_3.rich_text
            .map((item) => item.plain_text)
            .join("");
          return `### ${text}`;
        }
        case "bulleted_list_item": {
          const text = block.bulleted_list_item.rich_text
            .map((item) => item.plain_text)
            .join("");
          return `- ${text}`;
        }
        case "numbered_list_item": {
          const text = block.numbered_list_item.rich_text
            .map((item) => item.plain_text)
            .join("");
          return `1. ${text}`;
        }
        case "quote": {
          const text = block.quote.rich_text
            .map((item) => item.plain_text)
            .join("");
          return `> ${text}`;
        }
        case "code": {
          const text = block.code.rich_text
            .map((item) => item.plain_text)
            .join("");
          return `\`\`\`${text}\n\`\`\``;
        }
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

function mapNotionPageToJournalEntry(page: NotionPage): JournalEntry {
  const properties = page.properties as Record<string, any>;
  const title = getTextValue(properties, ["Entry Title", "Title", "Name"]).trim() || "Untitled";
  const description = getTextValue(properties, ["Description", "Summary", "Abstract"]).trim();
  const date = getDateValue(properties, ["Date", "Published", "Published At", "Date Published"]);
  const tags = getTags(properties, ["Tags", "Categories", "Type"]);
  const readingTime = getReadingTime(properties, ["Reading Time", "Read Time"]);
  const slug = getTextValue(properties, ["Slug", "Path", "URL"]).trim() || slugify(title);
  const content = serializeBlocksToMarkdown(page.content);

  return {
    slug,
    title,
    description,
    date,
    tags,
    readingTime,
    content,
    contentBlocks: page.content as NotionContentBlock[],
  };
}

export async function getNotionData(): Promise<NotionPage[]> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    return [];
  }

  try {
    const pages = await notion.dataSources.query({
      data_source_id: process.env.NOTION_DATABASE_ID,
    });

    return Promise.all(
      pages.results
        .filter(isFullPage)
        .map(async (page): Promise<NotionPage> => {
          const content = await getBlockChildren(page.id);

          return {
            id: page.id,
            properties: page.properties,
            content,
          };
        })
    );
  } catch (error) {
    console.error("Failed to fetch Notion data", error);
    return [];
  }
}

export async function getNotionJournalEntries(): Promise<JournalEntry[]> {
  const pages = await getNotionData();

  if (pages.length > 0) {
    return [...pages.map(mapNotionPageToJournalEntry)].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  return [...fallbackJournalEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getNotionJournalEntryBySlug(
  slug: string
): Promise<JournalEntry | undefined> {
  const entries = await getNotionJournalEntries();

  return entries.find((entry) => entry.slug === slug);
}

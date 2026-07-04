import { Client, isFullBlock, isFullPage } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

async function getBlockChildren(
  blockId: string
): Promise<BlockWithChildren[]> {
  const { results } = await notion.blocks.children.list({
    block_id: blockId,
  });

  const blocks: BlockWithChildren[] = await Promise.all(
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

  return blocks;
}

type NotionPage = {
  id: string;
  properties: PageObjectResponse["properties"];
  content: BlockWithChildren[];
};

export async function getNotionData(): Promise<NotionPage[]> {
  const pages = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATABASE_ID!,
  });

  const data: NotionPage[] = await Promise.all(
    pages.results
      .filter(isFullPage)
      .map(async (page): Promise<NotionPage> => {
        const content = await getBlockChildren(page.id);

        console.log(JSON.stringify(content, null, 2));

        //console.log(page.properties);

        return {
          id: page.id,
          properties: page.properties,
          content,
        };
      })
  );

  return data;
}
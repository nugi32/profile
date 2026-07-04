import { getNotionData } from "@/lib/notionTest";
import BlockRenderer from "./BlockRenderer";

function BlockTree({
  blocks,
}: {
  blocks: any[];
}) {
  return (
    <>
      {blocks.map((block) => (
        <div key={block.id}>
          <BlockRenderer block={block} />

          {block.children &&
            block.type !== "table" &&
            block.children.length > 0 && (
              <div className="ml-6">
                <BlockTree blocks={block.children} />
              </div>
            )}
        </div>
      ))}
    </>
  );
}

export default async function Page() {
  const pages = await getNotionData();

  return (
    <main className="max-w-5xl mx-auto py-12">
      <h1 className="text-5xl font-bold mb-12">
        Journal
      </h1>

      {pages.map((page: any) => (
        <article
          key={page.id}
          className="mb-16 border rounded-xl p-8"
        >
          <h1 className="text-4xl font-bold mb-8">
            {
              page.properties["Entry Title"].title[0]
                ?.plain_text
            }
          </h1>

          <BlockTree blocks={page.content} />
        </article>
      ))}
    </main>
  );
}
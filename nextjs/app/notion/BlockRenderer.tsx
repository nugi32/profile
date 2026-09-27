import RichText from "./RichText";

/**
 * Renders one Notion block with the site's look. Long-form reading, so the
 * type is generous and the colors stay calm.
 *
 * NOTE: "bulleted_list_item" and "numbered_list_item" are deliberately NOT
 * handled here. Notion returns consecutive list items as separate sibling
 * blocks, and rendering each one independently (each wrapped in its own
 * <ul>/<ol>) would produce a separate one-item list per bullet instead of a
 * single grouped list. Grouping consecutive same-type list items into one
 * <ul>/<ol> requires looking across siblings, which only the caller
 * (NotionBlockTree in app/journal/[slug]/page.tsx) can do — see
 * `groupBlocks`/`ListItemContent` there.
 */
export default function BlockRenderer({
  block,
}: {
  block: any;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-4 text-lg leading-relaxed text-ink/85">
          <RichText text={block.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h1 className="mb-5 mt-12 font-display text-4xl font-extrabold leading-tight">
          <RichText text={block.heading_1.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="mb-4 mt-10 font-display text-3xl font-extrabold leading-tight">
          <RichText text={block.heading_2.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="mb-3 mt-8 font-display text-2xl font-bold leading-tight">
          <RichText text={block.heading_3.rich_text} />
        </h3>
      );

    case "heading_4":
      return (
        <h4 className="mb-2 mt-6 font-display text-xl font-bold">
          <RichText text={block.heading_4.rich_text} />
        </h4>
      );

    case "quote":
      return (
        <blockquote className="my-6 rounded-r-2xl border-l-4 border-grape bg-grape-tint px-5 py-3 text-lg italic text-ink/90">
          <RichText text={block.quote.rich_text} />
        </blockquote>
      );

    case "code":
      return (
        <pre className="my-6 overflow-auto rounded-2xl border-2 border-line bg-ink p-5 font-mono text-sm leading-relaxed text-bg">
          <code>
            <RichText text={block.code.rich_text} />
          </code>
        </pre>
      );

    case "divider":
      return <hr className="my-10 border-t-2 border-dashed border-line/30" />;

    case "table":
      return (
        <div className="my-6 overflow-x-auto rounded-2xl border-2 border-line">
          <table className="w-full border-collapse">
            <tbody>
              {block.children?.map((row: any) => (
                <BlockRenderer key={row.id} block={row} />
              ))}
            </tbody>
          </table>
        </div>
      );

    case "table_row":
      return (
        <tr className="border-b-2 border-line/20 last:border-b-0">
          {block.table_row.cells.map((cell: any[], i: number) => (
            <td key={i} className="p-3 align-top text-ink/85">
              <RichText text={cell} />
            </td>
          ))}
        </tr>
      );

    default:
      return null;
  }
}

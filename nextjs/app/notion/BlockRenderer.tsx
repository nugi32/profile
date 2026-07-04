import RichText from "./RichText";

export default function BlockRenderer({
  block,
}: {
  block: any;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-4">
          <RichText text={block.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h1 className="text-5xl font-bold mt-10 mb-6">
          <RichText text={block.heading_1.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-4xl font-bold mt-8 mb-4">
          <RichText text={block.heading_2.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-3xl font-semibold mt-6 mb-3">
          <RichText text={block.heading_3.rich_text} />
        </h3>
      );

    case "heading_4":
      return (
        <h4 className="text-2xl font-semibold mt-5 mb-2">
          <RichText text={block.heading_4.rich_text} />
        </h4>
      );

    case "bulleted_list_item":
      return (
        <ul className="list-disc ml-6 mb-2">
          <li>
            <RichText text={block.bulleted_list_item.rich_text} />
          </li>
        </ul>
      );

    case "numbered_list_item":
      return (
        <ol className="list-decimal ml-6 mb-2">
          <li>
            <RichText text={block.numbered_list_item.rich_text} />
          </li>
        </ol>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 pl-4 italic my-4">
          <RichText text={block.quote.rich_text} />
        </blockquote>
      );

    case "code":
      return (
        <pre className="bg-zinc-900 rounded p-4 overflow-auto">
          <code>
            <RichText text={block.code.rich_text} />
          </code>
        </pre>
      );

    case "divider":
      return <hr className="my-8" />;

    case "table":
      return (
        <table className="table-auto border-collapse border border-zinc-700 my-6 w-full">
          <tbody>
            {block.children?.map((row: any) => (
              <BlockRenderer
                key={row.id}
                block={row}
              />
            ))}
          </tbody>
        </table>
      );

    case "table_row":
      return (
        <tr>
          {block.table_row.cells.map((cell: any[], i: number) => (
            <td
              key={i}
              className="border border-zinc-700 p-2"
            >
              <RichText text={cell} />
            </td>
          ))}
        </tr>
      );

    default:
      return null;
  }
}
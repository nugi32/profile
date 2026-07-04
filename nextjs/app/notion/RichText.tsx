import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function RichText({
  text,
}: {
  text: RichTextItemResponse[];
}) {
  return (
    <>
      {text.map((item, i) => {
        if (item.type !== "text") return null;

        let node = <>{item.plain_text}</>;

        if (item.annotations.bold) node = <strong>{node}</strong>;
        if (item.annotations.italic) node = <em>{node}</em>;
        if (item.annotations.code)
          node = (
            <code className="bg-zinc-800 px-1 rounded">
              {node}
            </code>
          );

        if (item.text.link) {
          node = (
            <a
              href={item.text.link.url}
              target="_blank"
              className="text-blue-500 underline"
            >
              {node}
            </a>
          );
        }

        return <span key={i}>{node}</span>;
      })}
    </>
  );
}
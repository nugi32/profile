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
            <code className="rounded-md border border-line/30 bg-sun-tint px-1.5 py-0.5 font-mono text-[0.9em]">
              {node}
            </code>
          );

        if (item.text.link) {
          node = (
            <a
              href={item.text.link.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-grape underline underline-offset-4 hover:no-underline"
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
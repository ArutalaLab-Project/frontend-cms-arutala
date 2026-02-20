import type { OutputData } from "@editorjs/editorjs";
import Image from "next/image";

interface Props {
  title: string;
  data: OutputData;
}

export function ArticlePreview({ title, data }: Props) {
  if (!data?.blocks?.length) return null;

  return (
    <article className="prose max-w-2xl dark:prose-invert">
      {/* Title */}
      <h1>{title}</h1>

      {data.blocks.map((block, index) => {
        if (!block || !block.type) return null;

        switch (block.type) {
          case "header": {
            // Skip first H1 (karena sudah jadi title)
            if (index === 0) return null;

            const level = block.data?.level ?? 2;
            const text = block.data?.text;

            if (typeof text !== "string") return null;

            if (level === 2) return <h2 key={block.id}>{text}</h2>;
            if (level === 3) return <h3 key={block.id}>{text}</h3>;
            if (level === 4) return <h4 key={block.id}>{text}</h4>;

            return <h2 key={block.id}>{text}</h2>;
          }

          case "paragraph": {
            const text = block.data?.text;
            if (typeof text !== "string") return null;

            return <p key={block.id} dangerouslySetInnerHTML={{ __html: text }} />;
          }

          case "list": {
            const items = block.data?.items;
            const style = block.data?.style;

            if (!Array.isArray(items)) return null;

            if (style === "ordered") {
              return <ol key={block.id}>{items.map((item: unknown, i: number) => (typeof item === "string" ? <li key={i}>{item}</li> : null))}</ol>;
            }

            return <ul key={block.id}>{items.map((item: unknown, i: number) => (typeof item === "string" ? <li key={i}>{item}</li> : null))}</ul>;
          }

          case "quote": {
            const text = block.data?.text;
            const caption = block.data?.caption;

            if (typeof text !== "string") return null;

            return (
              <blockquote key={block.id}>
                {text}
                {caption && <footer className="text-sm opacity-70">{caption}</footer>}
              </blockquote>
            );
          }

          case "code": {
            const code = block.data?.code;
            if (typeof code !== "string") return null;

            return (
              <pre key={block.id}>
                <code>{code}</code>
              </pre>
            );
          }

          case "image": {
            const url = block.data?.file?.url;
            const caption = block.data?.caption;

            if (typeof url !== "string") return null;

            return (
              <figure key={block.id}>
                <Image src={url} alt={caption || "article image"} width={1200} height={700} className="rounded-md" />
                {caption && <figcaption className="text-center text-sm opacity-70">{caption}</figcaption>}
              </figure>
            );
          }

          default:
            return null;
        }
      })}
    </article>
  );
}

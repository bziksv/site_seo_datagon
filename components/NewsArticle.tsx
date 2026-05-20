import Image from "next/image";
import type { NewsBlock } from "@/lib/content/news";

function isLocalSrc(src: string) {
  return src.startsWith("/");
}

type Props = {
  blocks: NewsBlock[];
  fallback?: string[];
};

export function NewsArticle({ blocks, fallback = [] }: Props) {
  const content =
    blocks.length > 0
      ? blocks
      : fallback.map((text) => ({ type: "p" as const, text }));

  return (
    <article className="max-w-3xl space-y-6">
      {content.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={`p-${i}`} className="leading-relaxed text-slate-700">
              {block.text}
            </p>
          );
        }
        if (block.type === "img") {
          if (isLocalSrc(block.src)) {
            return (
              <div key={`img-${i}`} className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200">
                <Image src={block.src} alt={block.alt || ""} fill className="object-cover" sizes="768px" />
              </div>
            );
          }
          return (
            // eslint-disable-next-line @next/next/no-img-element -- fallback на внешний upload
            <img
              key={`img-${i}`}
              src={block.src}
              alt={block.alt || ""}
              className="w-full rounded-xl border border-slate-200"
              loading="lazy"
            />
          );
        }
        return (
          <div key={`embed-${i}`} className="aspect-video overflow-hidden rounded-xl bg-slate-100">
            <iframe
              src={block.src}
              title="Видео"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      })}
    </article>
  );
}

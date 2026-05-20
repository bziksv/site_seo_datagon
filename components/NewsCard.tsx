import Link from "next/link";
import type { NewsItem } from "@/lib/content/news";

type Props = { item: NewsItem };

export function NewsCard({ item }: Props) {
  const href = `/news/detail/${item.slug}/`;

  return (
    <li>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand-300 hover:shadow-md sm:flex-row">
        {item.imageUrl && (
          <Link href={href} className="block h-40 w-full shrink-0 overflow-hidden sm:h-36 sm:w-52">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt=""
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
              width={400}
              height={300}
            />
          </Link>
        )}
        <div className="flex flex-1 flex-col p-6">
          <Link href={href} className="flex-1">
            <time className="text-sm font-medium text-brand-600">{item.date}</time>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-brand-700">
              {item.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>
          </Link>
          <Link
            href={href}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-100"
          >
            Подробнее
            <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </article>
    </li>
  );
}

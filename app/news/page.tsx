import type { Metadata } from "next";
import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { PageShell } from "@/components/PageShell";
import { NEWS_ITEMS } from "@/lib/content/news";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости и обновления сервиса Датагон.",
};

export default function NewsListPage() {
  return (
    <PageShell title="Новости и обновления" lead="Актуальные события и изменения в модулях Датагон.">
      <ul className="space-y-4">
        {NEWS_ITEMS.map((item) => (
          <NewsCard key={item.slug} item={item} />
        ))}
      </ul>
      <Link href="/news/istoriya-kompanii/" className="mt-4 inline-block text-brand-600">
        История компании →
      </Link>
    </PageShell>
  );
}

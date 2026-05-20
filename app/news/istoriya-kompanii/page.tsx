import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { COMPANY_TIMELINE } from "@/lib/content/about";

export const metadata: Metadata = {
  title: "История компании",
  description: "История развития Датагон с 2015 года.",
};

export default function CompanyHistoryPage() {
  return (
    <PageShell title="История компании" lead="Ключевые этапы развития Датагон и команды.">
      <ol className="space-y-6">
        {COMPANY_TIMELINE.map((item) => (
          <li key={item.href} className="rounded-xl border border-slate-200 bg-white p-6">
            <time className="text-sm font-medium text-brand-600">{item.date}</time>
            <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-slate-600">{item.description}</p>
            <Link href={item.href} className="mt-3 inline-block text-sm text-brand-600">
              Новость →
            </Link>
          </li>
        ))}
      </ol>
      <Link href="/about/" className="mt-10 inline-block font-medium text-brand-600">
        ← О компании
      </Link>
    </PageShell>
  );
}

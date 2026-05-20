import Link from "next/link";
import { ModuleIcon } from "@/lib/module-icons";

type Props = {
  href: string;
  title: string;
  description: string;
};

export function ModuleCard({ href, title, description }: Props) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <ModuleIcon href={href} />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700">{title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
      </div>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        Подробнее
        <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
      </Link>
    </article>
  );
}

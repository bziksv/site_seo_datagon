import Link from "next/link";

const ITEMS = [
  {
    icon: "📊",
    title: "Глубина выдачи",
    text: "ТОП-30 (рекомендуемый), 20 или 10 — как в кабинете. В демо показываем ТОП-10.",
    tone: "brand" as const,
  },
  {
    icon: "🌐",
    title: "Яндекс и Google",
    text: "Одна или обе ПС, несколько городов — полный прогон в кабинете.",
    tone: "sky" as const,
  },
  {
    icon: "🗺️",
    title: "Геозависимость",
    text: "Сравнение Москва ↔ Воронеж: % совпадения URL, вывод по фразе.",
    tone: "emerald" as const,
  },
  {
    icon: "🎯",
    title: "Релевантность страницы",
    text: "После сбора конкурентов — анализ релевантности вашей страницы по тем же фразам.",
    tone: "amber" as const,
    href: "/analiz-relevantnosti/",
  },
  {
    icon: "🏷️",
    title: "Мета-теги и рекомендации",
    text: "Разбор title, description, H1 и подсказки по словам из выдачи.",
    tone: "violet" as const,
  },
  {
    icon: "📥",
    title: "Экспорт и 40 фраз",
    text: "Матрица по всем ключам, XLS и сравнение городов в SERP.",
    tone: "slate" as const,
  },
] as const;

const TONE_CLASS: Record<string, string> = {
  brand: "border-brand-200 bg-brand-50/80",
  sky: "border-sky-200 bg-sky-50/80",
  emerald: "border-emerald-200 bg-emerald-50/80",
  amber: "border-amber-200 bg-amber-50/80",
  violet: "border-violet-200 bg-violet-50/80",
  slate: "border-slate-200 bg-slate-50/80",
};

export function CompetitorAnalysisDemoCapabilities() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ITEMS.map((item) => {
        const card = (
          <div
            className={`h-full rounded-xl border p-4 transition hover:shadow-md ${TONE_CLASS[item.tone]}`}
          >
            <span className="text-2xl" aria-hidden>
              {item.icon}
            </span>
            <h4 className="mt-2 text-sm font-semibold text-slate-900">{item.title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.text}</p>
            {"href" in item && item.href ? (
              <span className="mt-2 inline-block text-xs font-semibold text-brand-700">Модуль →</span>
            ) : null}
          </div>
        );

        if ("href" in item && item.href) {
          return (
            <Link key={item.title} href={item.href} className="block no-underline">
              {card}
            </Link>
          );
        }

        return <div key={item.title}>{card}</div>;
      })}
    </div>
  );
}

import Link from "next/link";
import { ModuleCard } from "@/components/ModuleCard";
import { NewsCard } from "@/components/NewsCard";
import { getSitePage } from "@/lib/content/site-pages.generated";
import { NEWS_ITEMS } from "@/lib/content/news";
import { HOME_MODULES, LK_URL, SITE } from "@/lib/site";

const HERO_POINTS = [
  "Получайте важные уведомления об изменениях на сайте в мессенджеры",
  "Отслеживайте позиции и состояние вашего сайта",
  "Настраивайте сайт, чтобы достичь максимального результата",
] as const;

const STATS = [
  { value: "18", label: "Модулей уже доступны к работе" },
  { value: "3", label: "Новые решения в разработке" },
  { value: "210", label: "Правок делается в месяц" },
] as const;

export default function HomePage() {
  const home = getSitePage("home");
  const aboutBlock = home?.sections.find((s) => s.title.includes("Продуманное"));
  const ctaBlock = home?.sections.find((s) => s.title.includes("регистрации"));

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-brand-400/30 blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-brand-50">
            Платформа для анализа и отслеживания сайта
          </p>
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-[3.25rem]">
            {home?.h1 ??
              "Полезные инструменты для SEO-специалиста, маркетолога и проект-менеджера"}
          </h1>
          <ul className="mt-8 max-w-2xl space-y-3 text-brand-50">
            {HERO_POINTS.map((text) => (
              <li key={text} className="flex gap-3 text-base md:text-lg">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                  ✓
                </span>
                {text}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`${LK_URL}/register`}
              className="rounded-xl bg-white px-8 py-3.5 font-semibold text-brand-700 shadow-lg shadow-brand-900/20 hover:bg-brand-50"
            >
              Зарегистрироваться
            </a>
            <Link
              href="/tarify/"
              className="rounded-xl border-2 border-white/40 px-8 py-3.5 font-semibold hover:bg-white/10"
            >
              Тарифы
            </Link>
            <Link
              href="/services/"
              className="rounded-xl border border-white/30 px-8 py-3.5 font-semibold hover:bg-white/10"
            >
              Все сервисы
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Воспользуйтесь нашими сервисами</h2>
          <Link href="/services/" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            Смотреть все 18 →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_MODULES.map((mod) => (
            <ModuleCard key={mod.href} {...mod} />
          ))}
        </div>
      </section>

      {aboutBlock && (
        <section className="border-y border-slate-200 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{aboutBlock.title}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              {aboutBlock.paragraphs[0]}
            </p>
            {aboutBlock.paragraphs.slice(1).map((p) => (
              <p key={p.slice(0, 40)} className="mt-3 max-w-3xl text-slate-600">
                {p}
              </p>
            ))}
            <Link
              href="/about/"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
            >
              О компании <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-center text-white md:px-16 md:py-14">
          <h2 className="text-2xl font-bold md:text-3xl">
            {ctaBlock?.title ?? "Приступим к регистрации?"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-50">
            {ctaBlock?.paragraphs[0] ??
              `Анализ текста, релевантность, ROI и другие инструменты — в одном месте. Сервисы ${SITE.name}.`}
          </p>
          <a
            href={`${LK_URL}/register`}
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 font-semibold text-brand-700 hover:bg-brand-50"
          >
            Зарегистрироваться бесплатно
          </a>
        </div>
      </section>

      <section className="bg-slate-100 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">Наши модули в цифрах</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {STATS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm"
              >
                <p className="text-4xl font-bold text-brand-600 md:text-5xl">{item.value}</p>
                <p className="mt-3 text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Новости и обновления</h2>
          <Link href="/news/" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            Все новости →
          </Link>
        </div>
        <ul className="mt-8 space-y-4">
          {NEWS_ITEMS.slice(0, 5).map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </ul>
      </section>
    </>
  );
}

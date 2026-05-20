import Link from "next/link";
import { ContentSections } from "@/components/ContentSections";
import { ModuleIcon } from "@/lib/module-icons";
import { ModuleVideos } from "@/components/ModuleVideos";
import { getModuleContent } from "@/lib/content/modules.generated";
import { getModuleVideos } from "@/lib/content/module-videos";
import { LK_URL, SITE } from "@/lib/site";
import type { ModulePage } from "@/lib/content/modules";

type Props = {
  module: ModulePage;
};

export function ModuleLanding({ module }: Props) {
  const videos = module.videos?.length ? module.videos : getModuleVideos(module.slug);
  const scraped = getModuleContent(module.slug);
  const h1 = scraped?.h1 || module.h1;
  const lead = scraped?.lead || module.lead;
  const sections = scraped?.sections ?? [];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="flex flex-wrap items-start gap-5">
            <ModuleIcon href={module.path} className="h-14 w-14 bg-white/20 text-3xl" />
            <div>
              <p className="text-sm font-medium text-brand-100">Модуль {SITE.name}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{h1}</h1>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg text-brand-50">{lead}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`${LK_URL}/register`}
              className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50"
            >
              Начать работу
            </a>
            <Link
              href="/tarify/"
              className="rounded-lg border border-white/50 px-6 py-3 font-semibold hover:bg-white/10"
            >
              Тарифы
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {sections.length > 0 ? (
          <ContentSections sections={sections} />
        ) : (
          module.features &&
          module.features.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900">Возможности</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {module.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-700"
                  >
                    <span className="font-bold text-brand-600">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )
        )}

        {videos.length > 0 && <ModuleVideos videos={videos} />}

        <section className="mt-12 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-8 text-center shadow-sm md:p-10">
          <h2 className="text-lg font-semibold text-slate-900">Работа с модулем — в личном кабинете</h2>
          <p className="mt-2 text-sm text-slate-600">
            Зарегистрируйтесь в личном кабинете, чтобы использовать «{module.title}» и другие
            инструменты.
          </p>
          <a
            href={`${LK_URL}/login`}
            className="mt-6 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Войти в кабинет →
          </a>
        </section>

        <nav className="mt-10 border-t border-slate-200 pt-8">
          <Link href="/services/" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            ← Все сервисы
          </Link>
        </nav>
      </div>
    </>
  );
}

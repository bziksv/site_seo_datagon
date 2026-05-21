import Link from "next/link";
import { ModulePlainSection } from "@/components/module-landings/ModulePlainSection";
import { ModuleLeadCta } from "@/components/ModuleLeadCta";
import { ModuleVideoGallery } from "@/components/ModuleVideoGallery";
import { RevealOnScroll } from "@/components/module-landings/RevealOnScroll";
import { MonitoringV2SectionHeader } from "@/components/module-landings/monitoring-v2/MonitoringV2SectionHeader";
import type { ModulePlainContent } from "@/components/module-landings/ModulePlainSection";
import { SITE } from "@/lib/site";

type Video = { id: string; title: string; description: string };
type FaqItem = { q: string; a: string };
type OptionsSection = { eyebrow: string; title: string; lead: string };

type Props = {
  options: readonly string[];
  optionsSection: OptionsSection;
  plain: ModulePlainContent;
  videos: readonly Video[];
  faq: readonly FaqItem[];
};

export function MonitoringV2Footer({ options, optionsSection, plain, videos, faq }: Props) {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <RevealOnScroll>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-10">
            <MonitoringV2SectionHeader
              eyebrow={optionsSection.eyebrow}
              title={optionsSection.title}
              lead={optionsSection.lead}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {options.map((line, i) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm text-slate-700 transition hover:border-brand-200 hover:bg-white"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 font-mono text-xs font-bold text-brand-700"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </section>
        </RevealOnScroll>

        <ModulePlainSection data={plain} titleId="monitoring-v2-plain-title" />

        <RevealOnScroll>
          <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 md:p-10">
            <ModuleVideoGallery
              title="Разбор модуля в видео"
              lead="Четыре урока — от первого проекта до выгрузки отчёта."
              items={videos.map((v) => ({
                embedUrl: `https://www.youtube.com/embed/${v.id}`,
                title: v.title,
                description: v.description,
              }))}
            />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mt-16">
            <MonitoringV2SectionHeader eyebrow="FAQ" title="Вопросы по мониторингу" />
            <dl className="mt-8 space-y-3">
              {faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-slate-200 bg-white open:border-brand-200 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {item.q}
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-open:rotate-45 group-open:bg-brand-100 group-open:text-brand-700"
                        aria-hidden
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <dd className="border-t border-slate-100 px-5 pb-4 pt-0 text-sm leading-relaxed text-slate-600">
                    <p className="pt-3">{item.a}</p>
                  </dd>
                </details>
              ))}
            </dl>
          </section>
        </RevealOnScroll>
      </div>

      {/* Финальный CTA — контрастная полоса, без «серой карточки на белом» */}
      <RevealOnScroll>
        <section
          className="border-t border-brand-800 bg-brand-700 py-12 md:py-16"
          aria-labelledby="monitoring-v2-final-title"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-[1fr_minmax(300px,400px)] lg:items-center lg:gap-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">{SITE.name}</p>
                <h2 id="monitoring-v2-final-title" className="mt-2 text-2xl font-bold text-white md:text-3xl">
                  Запустите панель мониторинга
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-brand-100 md:text-base">
                  Классический лендинг —{" "}
                  <Link
                    href="/monitoring-pozicii-sayta/"
                    className="font-semibold text-white underline decoration-brand-300 underline-offset-2 hover:decoration-white"
                  >
                    /monitoring-pozicii-sayta/
                  </Link>
                  . Здесь — концепция «Центр управления выдачей».
                </p>
              </div>
              <ModuleLeadCta
                variant="card"
                idPrefix="monitoring-v2-final"
                title="Начать бесплатно"
                hint="Регистрация в личном кабинете."
              />
            </div>

            <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/20 pt-8">
              <Link
                href="/services/"
                className="text-sm font-semibold text-white hover:text-brand-100"
              >
                ← Все модули
              </Link>
              <Link
                href="/monitoring-pozicii-v3/"
                className="text-sm text-brand-200 hover:text-white"
              >
                Концепция v3 (LAB)
              </Link>
            </nav>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}

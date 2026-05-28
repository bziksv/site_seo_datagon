"use client";

const PLATFORMS = [
  { label: "Яндекс.Директ", tone: "bg-amber-50 text-amber-950 border-amber-200" },
  { label: "Google Ads", tone: "bg-sky-50 text-sky-950 border-sky-200" },
  { label: "VK", tone: "bg-indigo-50 text-indigo-950 border-indigo-200" },
  { label: "myTarget", tone: "bg-violet-50 text-violet-950 border-violet-200" },
  { label: "Вручную", tone: "bg-slate-50 text-slate-800 border-slate-200" },
] as const;

const STEPS = [
  { n: 1, title: "Целевая страница", hint: "URL лендинга" },
  { n: 2, title: "UTM-параметры", hint: "source, medium, campaign" },
  { n: 3, title: "Готовая ссылка", hint: "копирование и пакет URL" },
] as const;

const IFRAME_SRC = "/demo/utm-marks/index.html";

export function UtmMarksDemoEmbed() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-white to-brand-50 px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">Полный генератор</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-[0.9375rem]">
              Шаблоны под рекламные площадки, подсказки по полям, динамические параметры и Openstat — как в кабинете.
              <span className="font-semibold text-slate-900"> Без лимитов на этой странице.</span>
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,.7)]" aria-hidden />
            Демо без регистрации
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => (
          <span
            key={p.label}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${p.tone}`}
          >
            {p.label}
          </span>
        ))}
      </div>

      <ol className="grid gap-2 sm:grid-cols-3" aria-label="Шаги генератора">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-md shadow-brand-600/30"
              aria-hidden
            >
              {step.n}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-sm font-semibold text-slate-900">{step.title}</p>
              <p className="text-xs text-slate-500">{step.hint}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/5">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 px-3 py-2.5 sm:px-4">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          </div>
          <p className="min-w-0 flex-1 truncate rounded-md border border-slate-200/80 bg-white px-3 py-1 font-mono text-[11px] text-slate-500 sm:text-xs">
            datagon.ru · генератор UTM-меток
          </p>
          <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-800">
            Live
          </span>
        </div>
        <iframe
          title="Генератор UTM-меток"
          src={IFRAME_SRC}
          className="block w-full min-h-[1120px] border-0 bg-white"
          loading="lazy"
        />
      </div>
    </div>
  );
}

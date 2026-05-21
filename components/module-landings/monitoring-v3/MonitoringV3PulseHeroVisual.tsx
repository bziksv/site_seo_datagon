"use client";

const ROWS = [
  { query: "купить диван москва", pos: 3, delta: 2 },
  { query: "seo аудит", pos: 12, delta: 0 },
  { query: "мониторинг позиций", pos: 7, delta: -1 },
  { query: "топ 10 яндекс", pos: 24, delta: 5 },
] as const;

export function MonitoringV3PulseHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none lg:justify-self-end">
      <div
        className="pointer-events-none absolute -right-8 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-600/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/35 animate-v3-pulse-ring"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-400/15 animate-v3-pulse-ring"
        style={{ animationDelay: "1.2s" }}
        aria-hidden
      />

      <div className="monitoring-v3-highlight-panel relative rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-brand-300">
            live · срез
          </span>
          <span className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none" />
            обновлено
          </span>
        </div>

        <ul className="mt-5 space-y-3">
          {ROWS.map((row) => (
            <li
              key={row.query}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
            >
              <span className="min-w-0 truncate text-sm text-slate-300">{row.query}</span>
              <span className="flex shrink-0 items-baseline gap-2 font-mono tabular-nums">
                <span className="text-lg font-bold text-white">#{row.pos}</span>
                {row.delta !== 0 && (
                  <span
                    className={`text-xs font-semibold ${row.delta > 0 ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {row.delta > 0 ? `↑${row.delta}` : `↓${Math.abs(row.delta)}`}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <div className="flex justify-between text-xs text-slate-500">
            <span>глубина проверки</span>
            <span className="font-mono text-brand-300">ТОП‑100</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[67%] rounded-full bg-gradient-to-r from-brand-600 to-violet-500" />
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
          Десктоп · регион · глубина · отчёт XLS / PDF — в одном срезе кабинета
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        {[
          { label: "запросов", value: "1.2k" },
          { label: "в ТОП‑10", value: "84" },
          { label: "срезов", value: "12" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3"
          >
            <p className="font-mono text-lg font-bold text-brand-200">{m.value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

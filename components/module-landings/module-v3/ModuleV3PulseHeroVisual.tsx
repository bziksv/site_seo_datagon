"use client";

import type { ModuleV3HeroVisual } from "@/lib/content/module-v3/types";

export function ModuleV3PulseHeroVisual({ visual }: { visual: ModuleV3HeroVisual }) {
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

      <div className="module-v3-highlight-panel relative rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-brand-300">
            {visual.panelLabel}
          </span>
          <span className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none" />
            кабинет
          </span>
        </div>

        <ul className="mt-5 space-y-3">
          {visual.rows.map((row) => (
            <li
              key={row.left}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
            >
              <span className="min-w-0 text-sm text-slate-300">{row.left}</span>
              {row.right && (
                <span className="shrink-0 font-mono text-sm font-bold text-brand-200">{row.right}</span>
              )}
            </li>
          ))}
        </ul>

        {visual.progress && (
          <div className="mt-6">
            <div className="flex justify-between text-xs text-slate-500">
              <span>{visual.progress.label}</span>
              <span className="font-mono text-brand-300">{visual.progress.value}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-600 to-violet-500"
                style={{ width: `${visual.progress.percent}%` }}
              />
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">{visual.footer}</p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        {visual.miniStats.map((m) => (
          <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
            <p className="font-mono text-lg font-bold text-brand-200">{m.value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

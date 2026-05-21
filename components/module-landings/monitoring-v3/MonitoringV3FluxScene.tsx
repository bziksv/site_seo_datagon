"use client";

import { useEffect, useRef, useState } from "react";
import { MonitoringV3SceneGrid } from "@/components/module-landings/monitoring-v3/MonitoringV3SceneGrid";

type Flux = {
  eyebrow: string;
  title: string;
  lead: string;
  chaosLabel: string;
  chaosLines: readonly string[];
  orderLabel: string;
  orderLines: readonly string[];
};

export function MonitoringV3FluxScene({ flux }: { flux: Flux }) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      setPhase(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const chaosOpacity = 1 - phase;
  const orderOpacity = phase;

  return (
    <section ref={ref} className="monitoring-v3-tone-flux relative">
      <MonitoringV3SceneGrid />
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-20 text-center md:px-8 md:pt-24">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">{flux.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">{flux.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-500 leading-relaxed">{flux.lead}</p>
        <div className="mx-auto mt-8 flex max-w-md items-center gap-3">
          <span className={`shrink-0 font-mono text-xs ${chaosOpacity > 0.5 ? "text-red-300" : "text-slate-600"}`}>
            хаос
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500 via-violet-500 to-brand-500 transition-[width] duration-150"
              style={{ width: `${phase * 100}%` }}
            />
          </div>
          <span className={`shrink-0 font-mono text-xs ${orderOpacity > 0.5 ? "text-brand-300" : "text-slate-600"}`}>
            пульс
          </span>
        </div>
      </div>

      <div className="relative h-[160vh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center px-4 md:px-8">
          <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8">
            <div
              className="monitoring-v3-flux-card monitoring-v3-flux-card--chaos relative flex min-h-[280px] flex-col justify-center rounded-3xl p-8 transition-opacity duration-300 md:min-h-[360px] md:p-10"
              style={{ opacity: Math.max(0.15, chaosOpacity), pointerEvents: chaosOpacity < 0.5 ? "none" : "auto" }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-red-300">{flux.chaosLabel}</p>
              <ul className="mt-8 space-y-4">
                {flux.chaosLines.map((line) => (
                  <li key={line} className="flex gap-3 text-lg font-bold text-red-100/90 md:text-xl">
                    <span className="text-red-400">×</span>
                    <span className={chaosOpacity > 0.6 ? "animate-v3-glitch" : ""}>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="monitoring-v3-flux-card monitoring-v3-flux-card--order relative flex min-h-[280px] flex-col justify-center rounded-3xl p-8 transition-opacity duration-300 md:min-h-[360px] md:p-10"
              style={{ opacity: Math.max(0.15, orderOpacity), pointerEvents: orderOpacity < 0.5 ? "none" : "auto" }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-brand-300">{flux.orderLabel}</p>
              <ul className="mt-8 space-y-4">
                {flux.orderLines.map((line) => (
                  <li key={line} className="flex gap-3 text-lg font-bold text-white md:text-xl">
                    <span className="text-brand-400">→</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

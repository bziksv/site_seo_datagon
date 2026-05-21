"use client";

import { useEffect, useRef, useState } from "react";

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
      <div className="mx-auto max-w-3xl px-4 pb-10 pt-20 text-center md:pt-24">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">{flux.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">{flux.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-500">{flux.lead}</p>
      </div>

      <div className="relative h-[160vh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center px-4">
          <div className="relative h-[min(70vh,520px)] w-full max-w-2xl">
            <div
              className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-red-500/30 bg-red-950/40 p-8 transition-opacity duration-300 md:p-12"
              style={{ opacity: chaosOpacity, pointerEvents: chaosOpacity < 0.5 ? "none" : "auto" }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-red-300">{flux.chaosLabel}</p>
              <ul className="mt-8 space-y-4">
                {flux.chaosLines.map((line) => (
                  <li key={line} className="text-xl font-bold text-red-100/90 animate-v3-glitch md:text-2xl">
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-brand-500/40 bg-brand-950/50 p-8 transition-opacity duration-300 md:p-12"
              style={{ opacity: orderOpacity, pointerEvents: orderOpacity < 0.5 ? "none" : "auto" }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-brand-300">{flux.orderLabel}</p>
              <ul className="mt-8 space-y-4">
                {flux.orderLines.map((line, i) => (
                  <li
                    key={line}
                    className="text-xl font-bold text-white transition-transform duration-500 md:text-2xl"
                    style={{ transform: `translateX(${(1 - orderOpacity) * (i % 2 ? 24 : -24)}px)` }}
                  >
                    <span className="mr-3 text-brand-400">→</span>
                    {line}
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

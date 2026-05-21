"use client";

import { useEffect, useRef, useState } from "react";
import { MonitoringV3SceneGrid } from "@/components/module-landings/monitoring-v3/MonitoringV3SceneGrid";
import { MonitoringV3SectionHeader } from "@/components/module-landings/monitoring-v3/MonitoringV3SectionHeader";

type Depth = {
  eyebrow: string;
  title: string;
  lead: string;
  hint?: string;
  max: number;
  maxLabel: string;
  markers?: readonly { at: number; label: string }[];
};

export function MonitoringV3DepthPin({ depth }: { depth: Depth }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const value = Math.max(1, Math.round(progress * depth.max));

  return (
    <section ref={wrapRef} className="monitoring-v3-tone-depth relative h-[220vh]">
      <MonitoringV3SceneGrid />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[10%] top-1/4 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute right-[8%] bottom-1/4 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl" />
      </div>
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden px-4 py-16 md:px-8">
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <MonitoringV3SectionHeader
              eyebrow={depth.eyebrow}
              title={depth.title}
              lead={depth.lead}
              align="center"
              className="mx-auto lg:mx-0 lg:text-left"
            />
            {depth.hint && (
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-slate-500 lg:mx-0">{depth.hint}</p>
            )}
            {depth.markers && (
              <ul className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
                {depth.markers.map((m) => {
                  const active = value >= m.at;
                  return (
                    <li
                      key={m.label}
                      className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                        active
                          ? "border border-brand-500/50 bg-brand-600/25 text-brand-200"
                          : "border border-white/10 bg-white/5 text-slate-500"
                      }`}
                    >
                      {m.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="monitoring-v3-highlight-panel rounded-3xl p-6 md:p-8">
              <div className="flex items-end justify-center gap-1.5 md:gap-2">
                {Array.from({ length: 10 }, (_, i) => {
                  const threshold = (i + 1) / 10;
                  const active = progress >= threshold - 0.05;
                  return (
                    <div
                      key={i}
                      className={`w-3 rounded-t transition-all duration-300 md:w-5 ${
                        active ? "bg-gradient-to-t from-brand-700 to-brand-400" : "bg-white/10"
                      }`}
                      style={{ height: `${28 + i * 12}px` }}
                    />
                  );
                })}
              </div>
              <div className="monitoring-v3-highlight-metric mx-auto mt-10 block rounded-3xl px-8 py-6 text-center">
                <p className="font-mono text-[clamp(3.5rem,14vw,7rem)] font-black tabular-nums leading-none text-brand-100">
                  {value}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-brand-300">{depth.maxLabel}</p>
              </div>
              <div className="mt-8">
                <div className="mb-2 flex justify-between text-xs text-slate-500">
                  <span>глубина проверки</span>
                  <span className="font-mono text-brand-300">ТОП‑{value}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-violet-500 transition-[width] duration-150 ease-out"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

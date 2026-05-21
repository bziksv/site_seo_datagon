"use client";

import { useEffect, useRef, useState } from "react";
import { MonitoringV3SectionHeader } from "@/components/module-landings/monitoring-v3/MonitoringV3SectionHeader";

type Depth = {
  eyebrow: string;
  title: string;
  lead: string;
  hint?: string;
  max: number;
  maxLabel: string;
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
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl" />
      </div>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-4">
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <MonitoringV3SectionHeader eyebrow={depth.eyebrow} title={depth.title} lead={depth.lead} align="center" className="mx-auto" />

          <div className="relative mx-auto mt-16 max-w-md">
            <div className="flex items-end justify-center gap-1">
              {Array.from({ length: 10 }, (_, i) => {
                const threshold = (i + 1) / 10;
                const active = progress >= threshold - 0.05;
                return (
                  <div
                    key={i}
                    className={`w-3 rounded-t transition-all duration-300 md:w-4 ${
                      active ? "bg-brand-500" : "bg-white/10"
                    }`}
                    style={{ height: `${24 + i * 10}px` }}
                  />
                );
              })}
            </div>
            <div className="monitoring-v3-highlight-metric mx-auto mt-10 inline-block rounded-3xl px-8 py-6">
              <p className="font-mono text-[clamp(4rem,18vw,9rem)] font-black tabular-nums leading-none text-brand-100">
                {value}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-brand-300">{depth.maxLabel}</p>
            </div>
            {depth.hint && <p className="mx-auto mt-4 max-w-sm text-sm text-slate-600">{depth.hint}</p>}
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-500 transition-[width] duration-150 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

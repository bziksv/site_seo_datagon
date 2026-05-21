"use client";

import { useRef, useState } from "react";
import { MonitoringV3SceneGrid } from "@/components/module-landings/monitoring-v3/MonitoringV3SceneGrid";
import { MonitoringV3SectionHeader } from "@/components/module-landings/monitoring-v3/MonitoringV3SectionHeader";

const ACCENTS = ["brand", "violet", "emerald", "amber"] as const;

type Signal = { id: string; label: string; title: string; text: string; detail?: string };
type Section = { eyebrow: string; title: string; lead: string };

export function MonitoringV3SignalRail({
  section,
  signals,
}: {
  section: Section;
  signals: readonly Signal[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  return (
    <section className="monitoring-v3-tone-violet relative overflow-x-clip py-20 md:py-28">
      <MonitoringV3SceneGrid />
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[min(90%,720px)] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 text-center md:px-8">
        <MonitoringV3SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          lead={section.lead}
          tone="violet"
          align="center"
          className="mx-auto"
        />
        <div className="mt-8 flex justify-center gap-2">
          {signals.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActive(i);
                railRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-8 bg-brand-400" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Шаг ${s.label}`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 min-w-0 max-w-full px-0 md:px-8">
        <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-4 pb-10 [scrollbar-color:rgb(47,93,224)_transparent] [scrollbar-width:thin] md:justify-center"
        onScroll={() => {
          const el = railRef.current;
          if (!el) return;
          const cards = [...el.children] as HTMLElement[];
          const center = el.scrollLeft + el.clientWidth / 2;
          let best = 0;
          let bestDist = Infinity;
          cards.forEach((card, i) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const d = Math.abs(cardCenter - center);
            if (d < bestDist) {
              bestDist = d;
              best = i;
            }
          });
          setActive(best);
        }}
      >
        {signals.map((s, i) => (
          <article
            key={s.id}
            data-accent={ACCENTS[i % ACCENTS.length]}
            className={`monitoring-v3-signal-card w-[min(88vw,380px)] shrink-0 snap-center rounded-2xl p-6 transition-all duration-300 md:p-8 ${
              active === i ? "scale-[1.02] shadow-lg shadow-brand-900/30" : "opacity-90"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-4xl font-black text-white/20">{s.label}</span>
              {i < signals.length - 1 && (
                <span className="hidden font-mono text-brand-400/50 md:inline" aria-hidden>
                  →
                </span>
              )}
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{s.text}</p>
            {s.detail && (
              <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">{s.detail}</p>
            )}
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}

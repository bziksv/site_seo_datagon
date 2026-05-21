"use client";

import { useRef } from "react";
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

  return (
    <section className="monitoring-v3-tone-violet py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
        <MonitoringV3SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          lead={section.lead}
          tone="violet"
          align="center"
          className="mx-auto"
        />
      </div>

      <div
        ref={railRef}
        className="mt-12 flex snap-x snap-mandatory justify-center gap-6 overflow-x-auto px-4 pb-8 md:px-8 [scrollbar-color:rgb(47,93,224)_transparent] [scrollbar-width:thin]"
      >
        {signals.map((s, i) => (
          <article
            key={s.id}
            data-accent={ACCENTS[i % ACCENTS.length]}
            className="monitoring-v3-signal-card w-[min(88vw,360px)] shrink-0 snap-center rounded-2xl p-6 transition hover:scale-[1.02] md:p-8"
            style={{ transform: `rotate(${i % 2 === 0 ? -1.2 : 1.2}deg)` }}
          >
            <span className="font-mono text-4xl font-black text-white/25">{s.label}</span>
            <h3 className="mt-4 text-xl font-bold text-white">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{s.text}</p>
            {s.detail && <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">{s.detail}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

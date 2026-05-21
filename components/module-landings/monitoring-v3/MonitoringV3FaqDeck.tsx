"use client";

import { useState } from "react";
import { MonitoringV3SceneGrid } from "@/components/module-landings/monitoring-v3/MonitoringV3SceneGrid";
import { MonitoringV3SectionHeader } from "@/components/module-landings/monitoring-v3/MonitoringV3SectionHeader";

type FaqItem = { q: string; a: string };
type Section = { eyebrow: string; title: string; lead: string };

export function MonitoringV3FaqDeck({
  faq,
  section,
}: {
  faq: readonly FaqItem[];
  section: Section;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="monitoring-v3-tone-faq relative overflow-hidden px-4 py-20 md:px-8 md:py-28">
      <MonitoringV3SceneGrid />
      <div className="relative mx-auto max-w-3xl">
        <MonitoringV3SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          lead={section.lead}
          align="center"
          className="mx-auto"
        />
        <ul className="mt-12 space-y-3">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition ${
                    isOpen
                      ? "border-brand-500/50 bg-brand-950/50 shadow-lg shadow-brand-900/20"
                      : "border-white/10 bg-white/5 hover:border-brand-500/40"
                  }`}
                >
                  <span className="font-semibold text-white">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg text-white transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden px-5 pb-4 text-sm leading-relaxed text-slate-400">{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

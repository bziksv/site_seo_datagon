"use client";

import Image from "next/image";
import { MonitoringV3SectionHeader } from "@/components/module-landings/monitoring-v3/MonitoringV3SectionHeader";

type Shot = { src: string; caption: string };
type Section = { eyebrow: string; title: string; lead: string };

export function MonitoringV3ScreenshotStage({
  shots,
  section,
}: {
  shots: readonly Shot[];
  section: Section;
}) {
  const [a, b] = shots;

  return (
    <section className="monitoring-v3-tone-slate relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[min(100%,640px)] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4">
        <MonitoringV3SectionHeader eyebrow={section.eyebrow} title={section.title} lead={section.lead} align="center" className="mx-auto" />

        <div className="relative mx-auto mt-14 aspect-[16/10] max-h-[480px] w-full perspective-[1400px]">
          {a && (
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-brand-900/50 animate-v3-carousel-a">
              <Image src={a.src} alt={a.caption} fill className="object-cover object-left-top" sizes="(max-width: 1024px) 100vw, 960px" />
              <div className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3 text-sm text-slate-300">{a.caption}</div>
            </div>
          )}
          {b && (
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-brand-500/30 shadow-2xl animate-v3-carousel-b">
              <Image src={b.src} alt={b.caption} fill className="object-cover object-left-top" sizes="(max-width: 1024px) 100vw, 960px" />
              <div className="absolute inset-x-0 bottom-0 bg-brand-900/80 px-4 py-3 text-sm text-white">{b.caption}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

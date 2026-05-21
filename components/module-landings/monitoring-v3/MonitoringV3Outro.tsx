"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ModuleLeadCta } from "@/components/ModuleLeadCta";
import { MonitoringV3SceneGrid } from "@/components/module-landings/monitoring-v3/MonitoringV3SceneGrid";

type Step = { n: string; title: string; text: string };
type Outro = {
  title: string;
  lead: string;
  stepsTitle: string;
  steps: readonly Step[];
  freeNote: string;
  links: readonly { href: string; label: string }[];
};

export function MonitoringV3Outro({ outro }: { outro: Outro }) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const el = btnRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) * 0.06,
        y: (e.clientY - cy) * 0.06,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="monitoring-v3-tone-outro relative overflow-hidden px-4 py-24 md:px-8 md:py-32">
      <MonitoringV3SceneGrid />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{outro.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400 leading-relaxed lg:mx-0">{outro.lead}</p>

          <div
            ref={btnRef}
            className="monitoring-v3-highlight-panel mx-auto mt-10 max-w-md rounded-2xl p-6 transition-transform duration-200 ease-out lg:mx-0"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          >
            <ModuleLeadCta variant="hero" idPrefix="monitoring-v3-outro" title="Начать бесплатно" hint="Регистрация в личном кабинете." />
          </div>

          <nav className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
            {outro.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-400 transition hover:border-brand-500 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/services/"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-400 transition hover:border-brand-500 hover:text-white"
            >
              ← Все модули
            </Link>
          </nav>
        </div>

        <div className="monitoring-v3-highlight-panel mx-auto w-full max-w-md rounded-3xl p-6 lg:max-w-lg">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-300">{outro.stepsTitle}</p>
          <ol className="mt-5 space-y-4">
            {outro.steps.map((step) => (
              <li key={step.n} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-500/40 bg-brand-600/20 font-mono text-sm font-bold text-brand-200">
                  {step.n}
                </span>
                <div>
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            {outro.freeNote}{" "}
            <Link href="/tarify/" className="text-brand-300 hover:text-white">
              Смотреть тарифы
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

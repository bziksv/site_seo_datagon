"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ModuleLeadCta } from "@/components/ModuleLeadCta";

type Outro = {
  title: string;
  lead: string;
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
        x: (e.clientX - cx) * 0.08,
        y: (e.clientY - cy) * 0.08,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="monitoring-v3-tone-outro px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">{outro.title}</h2>
        <p className="mx-auto mt-4 max-w-lg text-slate-400">{outro.lead}</p>

        <div
          ref={btnRef}
          className="monitoring-v3-highlight-panel mx-auto mt-10 max-w-md rounded-2xl p-6 transition-transform duration-200 ease-out"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          <ModuleLeadCta variant="hero" idPrefix="monitoring-v3-outro" title="Начать бесплатно" hint="Регистрация в личном кабинете." />
        </div>

        <nav className="mt-10 flex flex-wrap justify-center gap-4">
          {outro.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-400 transition hover:border-brand-500 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/services/" className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-400 transition hover:border-brand-500 hover:text-white">
            ← Все модули
          </Link>
        </nav>
      </div>
    </section>
  );
}

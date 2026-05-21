"use client";

import { useEffect, useRef, useState } from "react";
import { MonitoringV3SectionHeader } from "@/components/module-landings/monitoring-v3/MonitoringV3SectionHeader";

type Stat = {
  value: string;
  suffix: string;
  label: string;
  note?: string;
  /** Не анимировать (ПК, текст) */
  static?: boolean;
};

function parseNum(value: string) {
  const m = /^(\d+)\s*(.*)$/.exec(value.trim());
  return m ? { num: Number(m[1]), extra: m[2] ?? "" } : null;
}

function BurstValue({
  value,
  suffix,
  active,
  static: isStatic,
}: {
  value: string;
  suffix: string;
  active: boolean;
  static?: boolean;
}) {
  const parsed = parseNum(value);
  const finalText = parsed ? `${parsed.num}${parsed.extra}${suffix}` : `${value}${suffix}`;
  const [display, setDisplay] = useState(finalText);

  useEffect(() => {
    if (isStatic || !parsed) {
      setDisplay(finalText);
      return;
    }
    if (!active) {
      setDisplay(finalText);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(finalText);
      return;
    }

    const target = parsed.num;
    const t0 = performance.now();
    const duration = 1000;
    let frame = 0;
    let cancelled = false;

    setDisplay(`0${parsed.extra}${suffix}`);

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(`${Math.round(target * eased)}${parsed.extra}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
      else setDisplay(finalText);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [active, parsed, finalText, isStatic, suffix]);

  return <span className="tabular-nums">{display}</span>;
}

type Section = { eyebrow: string; title: string; lead: string };

export function MonitoringV3StatsBurst({
  stats,
  section,
}: {
  stats: readonly Stat[];
  section: Section;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="monitoring-v3-tone-stats py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <MonitoringV3SectionHeader eyebrow={section.eyebrow} title={section.title} lead={section.lead} align="center" className="mx-auto" />
      </div>
      <ul className="mx-auto mt-14 grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <li
            key={s.label}
            className={`monitoring-v3-stat-cell text-center transition-all duration-700 ${
              active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-100"
            } ${i === 0 ? "ring-1 ring-brand-400/40" : ""}`}
            style={{ transitionDelay: active ? `${i * 100}ms` : "0ms" }}
          >
            <p className="font-mono text-4xl font-black text-brand-50 md:text-5xl">
              <BurstValue value={s.value} suffix={s.suffix} active={active} static={s.static} />
            </p>
            <p className="mt-3 text-sm font-medium text-brand-100">{s.label}</p>
            {s.note && <p className="mt-2 text-xs leading-relaxed text-slate-500">{s.note}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ParallaxMonoScene } from "@/components/module-landings/ParallaxMonoScene";
import { ModuleLeadCta } from "@/components/ModuleLeadCta";
import { SearchEngineLogos } from "@/components/SearchEngineLogos";
import { LK_URL } from "@/lib/site";
import type { ModulePage } from "@/lib/content/modules";

type Concept = {
  eyebrow: string;
  headline: string;
  lead: string;
  cta: string;
};

type ActPreview = { act: string; title: string };
type Shots = readonly { src: string; caption: string }[];

const PANEL_CHIPS = [
  { label: "ТОП‑100", tone: "emerald" },
  { label: "2 ПС", tone: "sky" },
  { label: "Desktop", tone: "amber" },
] as const;

type Props = {
  module: ModulePage;
  concept: Concept;
  shots: Shots;
  acts: readonly ActPreview[];
};

function HeroActStrip({ acts }: { acts: readonly ActPreview[] }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        {acts.map((a) => (
          <a
            key={a.act}
            href="#monitoring-v2-story"
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm backdrop-blur-md transition hover:border-brand-400/40 hover:bg-brand-500/20"
          >
            <span className="font-mono text-xs font-bold text-brand-300">{a.act}</span>
            <span className="max-w-[12rem] truncate text-slate-300 group-hover:text-white sm:max-w-none">
              {a.title}
            </span>
          </a>
        ))}
      </div>
      <p className="text-xs text-slate-500">скролл — три акта сценария</p>
      <span className="block h-7 w-px animate-bounce bg-brand-400/80 motion-reduce:animate-none" aria-hidden />
    </div>
  );
}

/** Hero: панель управления — слои скринов + декор и превью актов. */
export function MonitoringV2CommandHero({ module, concept, shots, acts }: Props) {
  const [keys, dynamics] = shots;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setTilt({
        x: ((e.clientY - cy) / cy) * 3,
        y: ((e.clientX - cx) / cx) * -4,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  const panelTransform = reduceMotion ? undefined : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

  return (
    <section className="relative min-h-[min(92vh,900px)] overflow-hidden bg-[#070d1a] text-white">
      <ParallaxMonoScene align="right" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse 58% 50% at 72% 40%, rgba(47, 93, 224, 0.2), transparent 68%),
            radial-gradient(ellipse 42% 38% at 12% 75%, rgba(30, 63, 158, 0.14), transparent 62%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[#070d1a]" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[min(92vh,900px)] max-w-6xl flex-col px-4 pb-16 pt-8 md:pt-12">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-400" aria-label="Хлебные крошки">
          <Link href="/" className="hover:text-white">
            Главная
          </Link>
          <span aria-hidden>/</span>
          <Link href="/services/" className="hover:text-white">
            Модули
          </Link>
          <span aria-hidden>/</span>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300">NEW</span>
          <span className="hidden text-slate-600 sm:inline" aria-hidden>
            ·
          </span>
          <Link href="/monitoring-pozicii-sayta/" className="text-slate-500 hover:text-slate-300">
            классическая версия
          </Link>
        </nav>

        <div className="mt-10 grid flex-1 items-center gap-12 lg:grid-cols-[1fr_1.12fr] lg:gap-10">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">{concept.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem]">
              {concept.headline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">{concept.lead}</p>

            {module.features && module.features.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {module.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-sm text-slate-200 backdrop-blur-sm"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <SearchEngineLogos className="mt-8" variant="hero" />

            <div className="mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-sm">
              <ModuleLeadCta
                variant="hero"
                idPrefix="monitoring-v2-command"
                title={concept.cta}
                hint="Email → регистрация в личном кабинете с модулем мониторинга."
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/tarify/" className="text-brand-200 hover:text-white">
                Тарифы
              </Link>
              <a href={`${LK_URL}/login`} className="text-slate-400 hover:text-white">
                Вход в кабинет →
              </a>
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-xl perspective-[1200px] lg:mx-0 lg:max-w-none"
            style={{
              transform: panelTransform,
              transition: reduceMotion ? undefined : "transform 0.15s ease-out",
            }}
          >
            <div className="pointer-events-none absolute -left-2 top-8 z-30 flex flex-col gap-2 sm:left-0">
              {PANEL_CHIPS.map((c) => (
                <span
                  key={c.label}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-semibold shadow-lg backdrop-blur-md ${
                    c.tone === "emerald"
                      ? "border-emerald-400/30 bg-emerald-500/25 text-emerald-100"
                      : c.tone === "sky"
                        ? "border-sky-400/30 bg-sky-500/25 text-sky-100"
                        : "border-amber-400/30 bg-amber-500/25 text-amber-100"
                  }`}
                >
                  {c.label}
                </span>
              ))}
            </div>

            {keys && (
              <div className="relative z-10 overflow-hidden rounded-xl border border-white/20 bg-white shadow-2xl shadow-black/60 ring-1 ring-white/15">
                <div className="relative aspect-[739/385] w-full min-h-[180px] bg-slate-100 sm:min-h-[200px]">
                  <Image
                    src={keys.src}
                    alt={keys.caption}
                    fill
                    className="object-cover object-left-top"
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  <span>Проект · ключи</span>
                  <span className="font-mono font-semibold text-brand-600">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 align-middle motion-reduce:animate-none" />{" "}
                    LIVE
                  </span>
                </div>
              </div>
            )}
            {dynamics && (
              <div className="relative z-20 -mt-12 ml-6 overflow-hidden rounded-xl border border-brand-400/50 bg-white shadow-2xl shadow-brand-900/50 sm:-mt-16 md:-mt-20 md:ml-12">
                <div className="relative aspect-[1024/260] w-full min-h-[100px] bg-slate-50 sm:min-h-[120px]">
                  <Image
                    src={dynamics.src}
                    alt={dynamics.caption}
                    fill
                    className="object-cover object-left-top"
                    sizes="(max-width: 1024px) 90vw, 520px"
                  />
                </div>
                <div className="bg-brand-600 px-3 py-2 text-xs font-medium text-white">Динамика · отчёт</div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 md:mt-6">
          <HeroActStrip acts={acts} />
        </div>
      </div>
    </section>
  );
}

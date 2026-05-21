"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ModuleIcon } from "@/lib/module-icons";
import { NewsCard } from "@/components/NewsCard";
import type { NewsItem } from "@/lib/content/news";
import { HOME_MODULES, LK_URL, SITE } from "@/lib/site";

const ROTATOR = [
  "SEO-специалиста",
  "маркетолога",
  "агентства",
  "владельца сайта",
  "копирайтера",
] as const;

const MARQUEE = [
  "релевантность",
  "позиции",
  "кластеры",
  "конкуренты",
  "мета-теги",
  "HTTP",
  "ROI",
  "UTM",
  "uptime",
  "индексация",
  "семантика",
  "отчёты",
] as const;

const STATS = [
  { value: 18, suffix: "", label: "модулей в платформе" },
  { value: 24, suffix: "/7", label: "мониторинг и алерты" },
  { value: 100, suffix: "+", label: "параметров в отчётах" },
  { value: 0, suffix: "₽", label: "старт после регистрации" },
] as const;

const BENTO = [
  { href: "/analiz-relevantnosti/", title: "Анализ релевантности", span: "lg:col-span-2 lg:row-span-2" },
  { href: "/monitoring-pozicii-sayta/", title: "Мониторинг позиций", span: "" },
  { href: "/klasterizator-klyuchevykh-slov/", title: "Кластеризатор", span: "" },
  { href: "/analiz-konkurentov/", title: "Анализ конкурентов", span: "lg:col-span-2" },
  { href: "/monitoring-saytov/", title: "Мониторинг сайтов", span: "" },
  { href: "/analiz-teksta/", title: "Анализ текста", span: "" },
] as const;

type Props = {
  heroTitle: string;
  aboutTitle?: string;
  aboutLead?: string;
  ctaTitle?: string;
  ctaLead?: string;
  news: readonly NewsItem[];
};

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const fn = () => setReduce(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduce;
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const t0 = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - (1 - p) ** 3;
          setN(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function DatagonHome({ heroTitle, aboutTitle, aboutLead, ctaTitle, ctaLead, news }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const [rotIdx, setRotIdx] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setRotIdx((i) => (i + 1) % ROTATOR.length), 2800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({
        x: ((e.clientX - cx) / cx) * 8,
        y: ((e.clientY - cy) / cy) * 6,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  return (
    <div className="home-showcase overflow-x-clip">
      {/* Hero — иммерсив без привязки к v2/v3 */}
      <section className="home-hero relative min-h-[min(100vh,920px)] overflow-hidden bg-[#05070f] text-white">
        <div
          className="home-hero-grid pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="home-orb home-orb-a absolute -left-32 top-20 h-96 w-96 rounded-full bg-brand-500/25 blur-[100px]" />
          <div className="home-orb home-orb-b absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-violet-500/20 blur-[90px]" />
          <div className="home-orb home-orb-c absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-emerald-500/15 blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[min(100vh,920px)] max-w-6xl flex-col justify-center px-4 pb-24 pt-16 md:pt-20">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200 backdrop-blur-md">
            <span className="home-pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
            Платформа {SITE.name}
          </p>

          <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-[4.25rem]">
            {heroTitle}
            <span className="mt-2 block text-brand-300">
              для{" "}
              <span key={rotIdx} className="home-rotator-word inline-block text-white">
                {ROTATOR[rotIdx]}
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Анализ, мониторинг и семантика в одном кабинете — с отчётами, которые хочется показать клиенту.
            Без десятка вкладок и ночной сборки в Excel.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href={`${LK_URL}/register`}
              className="home-cta-primary rounded-2xl bg-white px-8 py-4 text-base font-bold text-brand-800 shadow-xl shadow-brand-900/40 transition hover:scale-[1.02] hover:bg-brand-50"
            >
              Начать бесплатно
            </a>
            <Link
              href="/services/"
              className="rounded-2xl border border-white/25 bg-white/[0.06] px-8 py-4 font-semibold backdrop-blur-md transition hover:border-brand-400/50 hover:bg-white/10"
            >
              Все модули
            </Link>
          </div>

          {/* Плавающая панель — лучшее от v2 hero + v3 визуал */}
          <div
            className="pointer-events-none absolute right-4 top-1/2 hidden w-[min(420px,42vw)] -translate-y-1/2 lg:block"
            style={
              reduceMotion
                ? undefined
                : { transform: `translateY(-50%) rotateX(${mouse.y * 0.4}deg) rotateY(${mouse.x * 0.5}deg)` }
            }
          >
            <div className="home-panel-float overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] shadow-2xl backdrop-blur-xl">
              <div className="border-b border-white/10 px-4 py-3 font-mono text-xs text-slate-400">
                datagon · live
              </div>
              <div className="space-y-3 p-4">
                <div className="flex gap-2">
                  {["ТОП‑10", "2 ПС", "отчёт"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-lg border border-emerald-400/30 bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-100"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="home-sparkline h-24 rounded-xl bg-gradient-to-t from-brand-600/40 to-transparent p-3">
                  <svg viewBox="0 0 200 60" className="h-full w-full" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="rgba(96,165,250,0.9)"
                      strokeWidth="2"
                      points="0,50 25,42 50,38 75,28 100,32 125,18 150,22 175,8 200,12"
                      className="home-line-draw"
                    />
                  </svg>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-white/10 py-2">
                    <span className="block font-bold text-white">+12</span>
                    <span className="text-slate-400">ТОП‑3</span>
                  </div>
                  <div className="rounded-lg bg-white/10 py-2">
                    <span className="block font-bold text-white">847</span>
                    <span className="text-slate-400">ключей</span>
                  </div>
                  <div className="rounded-lg bg-white/10 py-2">
                    <span className="block font-bold text-emerald-300">OK</span>
                    <span className="text-slate-400">uptime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center gap-2 text-slate-500">
            <span className="text-xs uppercase tracking-widest">листайте</span>
            <span className="home-scroll-hint block h-10 w-px bg-gradient-to-b from-brand-400 to-transparent" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="home-marquee-wrap border-y border-slate-800/80 bg-[#0a0f1c] py-4">
        <div className="home-marquee-track flex gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={`${word}-${i}`} className="text-slate-600">
              {word}
              <span className="mx-4 text-brand-500">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bento modules */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Экосистема</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Модули, которые работают вместе</h2>
          </div>
          <Link href="/services/" className="font-semibold text-brand-600 hover:text-brand-700">
            Все 18 →
          </Link>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(140px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENTO.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`home-bento-card group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition ${item.span}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="home-bento-glow pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" />
              <ModuleIcon href={item.href} className="relative z-10 h-12 w-12 text-2xl" />
              <h3 className="relative z-10 mt-4 text-lg font-bold text-slate-900 group-hover:text-brand-700">
                {item.title}
              </h3>
              <span className="relative z-10 mt-3 inline-flex text-sm font-semibold text-brand-600">
                Открыть →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_MODULES.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="group rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-brand-200 hover:bg-white hover:shadow-md"
            >
              <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-700">{mod.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {aboutTitle && (
        <section className="border-y border-slate-200 bg-gradient-to-br from-slate-50 to-white py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{aboutTitle}</h2>
            {aboutLead && (
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{aboutLead}</p>
            )}
            <Link href="/about/" className="mt-8 inline-flex font-semibold text-brand-600 hover:text-brand-700">
              О компании →
            </Link>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="bg-brand-800 py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Платформа в цифрах</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-brand-100">
            Реальные лимиты и возможности — без маркетингового тумана.
          </p>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l border-white/20 pl-6">
                <p className="text-4xl font-bold md:text-5xl">
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-brand-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="home-cta-glow relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-violet-900 px-8 py-16 text-center text-white md:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <h2 className="relative text-3xl font-bold md:text-4xl">{ctaTitle ?? "Приступим?"}</h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg text-brand-50">
            {ctaLead ?? `Инструменты ${SITE.name} — в одном кабинете.`}
          </p>
          <a
            href={`${LK_URL}/register`}
            className="relative mt-10 inline-block rounded-2xl bg-white px-10 py-4 font-bold text-brand-800 shadow-xl transition hover:scale-[1.02]"
          >
            Зарегистрироваться бесплатно
          </a>
        </div>
      </section>

      {/* News */}
      <section className="bg-slate-100 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Новости</h2>
            <Link href="/news/" className="font-semibold text-brand-600">
              Все →
            </Link>
          </div>
          <ul className="mt-8 space-y-4">
            {news.slice(0, 5).map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

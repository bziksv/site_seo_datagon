import { MonitoringV3SceneGrid } from "@/components/module-landings/monitoring-v3/MonitoringV3SceneGrid";

type Props = {
  streamA: readonly string[];
  streamB: readonly string[];
};

function Row({ items, reverse }: { items: readonly string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#04050a] to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#04050a] to-transparent" aria-hidden />
      <div
        className={`flex w-max gap-4 whitespace-nowrap px-6 md:gap-6 ${reverse ? "animate-v3-marquee-right" : "animate-v3-marquee-left"}`}
      >
        {doubled.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-sm text-slate-400 transition hover:border-brand-500/40 hover:text-brand-200 md:text-base"
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MonitoringV3KeywordStreams({ streamA, streamB }: Props) {
  return (
    <section className="monitoring-v3-tone-stream relative py-4" aria-label="Потоки ключевых фраз">
      <MonitoringV3SceneGrid />
      <p className="pointer-events-none relative z-10 mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.4em] text-brand-400/70">
        ключевые запросы
      </p>
      <Row items={streamA} />
      <Row items={streamB} reverse />
    </section>
  );
}

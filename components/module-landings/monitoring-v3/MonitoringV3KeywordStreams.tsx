type Props = {
  streamA: readonly string[];
  streamB: readonly string[];
};

function Row({ items, reverse }: { items: readonly string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/5 py-3">
      <div
        className={`flex w-max gap-6 whitespace-nowrap px-4 ${reverse ? "animate-v3-marquee-right" : "animate-v3-marquee-left"}`}
      >
        {doubled.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="font-mono text-sm text-slate-500 transition hover:text-brand-300 md:text-base"
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
    <section className="monitoring-v3-tone-stream relative py-2" aria-label="Потоки ключевых фраз">
      <p className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center text-[10px] font-semibold uppercase tracking-[0.4em] text-brand-400/60">
        поток запросов
      </p>
      <Row items={streamA} />
      <Row items={streamB} reverse />
    </section>
  );
}

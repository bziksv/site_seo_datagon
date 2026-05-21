import Link from "next/link";
import { RevealOnScroll } from "@/components/module-landings/RevealOnScroll";
import { MonitoringV3SceneGrid } from "@/components/module-landings/monitoring-v3/MonitoringV3SceneGrid";
import { MonitoringV3SectionHeader } from "@/components/module-landings/monitoring-v3/MonitoringV3SectionHeader";

type PlainItem = { title: string; text: string };
type TechLayer = { id: string; title: string; short: string; text: string };
type Essentials = {
  eyebrow: string;
  title: string;
  lead: string;
  optionsTitle: string;
  options: readonly string[];
  techLayers: readonly TechLayer[];
  plain: readonly PlainItem[];
};

export function MonitoringV3Essentials({ data }: { data: Essentials }) {
  return (
    <section className="monitoring-v3-tone-ink relative overflow-hidden py-20 md:py-28">
      <MonitoringV3SceneGrid />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <RevealOnScroll>
          <MonitoringV3SectionHeader eyebrow={data.eyebrow} title={data.title} lead={data.lead} align="center" className="mx-auto" />
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <RevealOnScroll>
            <div className="monitoring-v3-highlight-panel h-full rounded-3xl p-6 md:p-10">
              <h3 className="text-lg font-bold text-white">{data.optionsTitle}</h3>
              <ul className="mt-6 space-y-4">
                {data.options.map((line, i) => (
                  <li key={line} className="flex gap-4 text-sm text-slate-300">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-500/40 bg-brand-600/20 font-mono text-xs font-bold text-brand-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed pt-1">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          <div className="grid gap-4 sm:grid-cols-2">
            {data.techLayers.map((layer, i) => (
              <RevealOnScroll key={layer.id} delayMs={i * 60}>
                <article className="monitoring-v3-insight-card h-full rounded-2xl p-5">
                  <span className="font-mono text-xs font-bold text-violet-400">{layer.id}</span>
                  <h3 className="mt-2 font-bold text-white">{layer.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-brand-400/80">{layer.short}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{layer.text}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {data.plain.map((item, i) => (
            <RevealOnScroll key={item.title} delayMs={i * 80}>
              <article className="rounded-2xl border border-violet-500/25 bg-violet-950/30 p-6 transition hover:border-violet-400/40">
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delayMs={120}>
          <p className="mt-10 text-center text-sm text-slate-500">
            Связанные модули:{" "}
            <Link href="/analiz-konkurentov/" className="text-brand-300 hover:text-white">
              конкуренты
            </Link>
            {" · "}
            <Link href="/analiz-relevantnosti/" className="text-brand-300 hover:text-white">
              релевантность
            </Link>
            {" · "}
            <Link href="/otslezhivanie-ssylok/" className="text-brand-300 hover:text-white">
              ссылки
            </Link>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

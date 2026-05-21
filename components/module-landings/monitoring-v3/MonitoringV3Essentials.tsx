import { RevealOnScroll } from "@/components/module-landings/RevealOnScroll";
import { MonitoringV3SectionHeader } from "@/components/module-landings/monitoring-v3/MonitoringV3SectionHeader";

type PlainItem = { title: string; text: string };
type Essentials = {
  eyebrow: string;
  title: string;
  lead: string;
  optionsTitle: string;
  options: readonly string[];
  plain: readonly PlainItem[];
};

export function MonitoringV3Essentials({ data }: { data: Essentials }) {
  return (
    <section className="monitoring-v3-tone-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <RevealOnScroll>
          <MonitoringV3SectionHeader eyebrow={data.eyebrow} title={data.title} lead={data.lead} />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="monitoring-v3-highlight-panel mt-12 rounded-2xl p-6 md:p-10">
            <h3 className="text-lg font-bold text-white">{data.optionsTitle}</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {data.options.map((line, i) => (
                <li key={line} className="flex gap-3 text-sm text-slate-300">
                  <span className="font-mono text-xs font-bold text-brand-400">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {data.plain.map((item, i) => (
            <RevealOnScroll key={item.title} delayMs={i * 80}>
              <article className="rounded-2xl border border-violet-500/25 bg-violet-950/30 p-6">
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

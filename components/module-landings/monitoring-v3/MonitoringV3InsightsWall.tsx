import { RevealOnScroll } from "@/components/module-landings/RevealOnScroll";
import { MonitoringV3SceneGrid } from "@/components/module-landings/monitoring-v3/MonitoringV3SceneGrid";
import { MonitoringV3SectionHeader } from "@/components/module-landings/monitoring-v3/MonitoringV3SectionHeader";

type GridItem = { title: string; text: string; icon: string };
type Highlight = { title: string; lead: string; bullets: readonly string[] };
type Section = { eyebrow: string; title: string; lead: string };

export function MonitoringV3InsightsWall({
  section,
  grid,
  highlight,
}: {
  section: Section;
  grid: readonly GridItem[];
  highlight: Highlight;
}) {
  return (
    <section className="monitoring-v3-tone-ink relative overflow-hidden py-20 md:py-28">
      <MonitoringV3SceneGrid />
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <RevealOnScroll>
          <MonitoringV3SectionHeader
            eyebrow={section.eyebrow}
            title={section.title}
            lead={section.lead}
            tone="emerald"
            align="center"
            className="mx-auto"
          />
        </RevealOnScroll>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {grid.map((item, i) => (
            <RevealOnScroll key={item.title} delayMs={i * 60}>
              <article className="monitoring-v3-insight-card h-full rounded-2xl p-5 md:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/40 bg-brand-600/20 font-mono text-sm font-bold text-brand-200">
                  {item.icon}
                </span>
                <h3 className="mt-4 font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delayMs={200}>
          <div className="monitoring-v3-highlight-panel mt-10 grid gap-8 rounded-3xl p-6 md:grid-cols-[1fr_1.1fr] md:p-10">
            <div>
              <h3 className="text-xl font-bold text-white md:text-2xl">{highlight.title}</h3>
              <p className="mt-3 text-slate-400 leading-relaxed">{highlight.lead}</p>
            </div>
            <ul className="space-y-3">
              {highlight.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 text-brand-400">→</span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

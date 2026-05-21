import { RevealOnScroll } from "@/components/module-landings/RevealOnScroll";
import { MonitoringV2CountUp } from "@/components/module-landings/monitoring-v2/MonitoringV2CountUp";
import { MonitoringV2SectionHeader } from "@/components/module-landings/monitoring-v2/MonitoringV2SectionHeader";

type Metric = { value: string; unit: string; note: string };

const BENTO_SPAN = [true, false, false, true] as const;

type MetricSection = { eyebrow: string; title: string; lead?: string };

export function MonitoringV2MetricWall({
  metrics,
  section = {
    eyebrow: "Цифры без маркетингового шума",
    title: "Параметры съёма в одном взгляде",
  },
}: {
  metrics: readonly Metric[];
  section?: MetricSection;
}) {
  return (
    <section className="overflow-x-clip border-y border-brand-900/30 bg-brand-800 py-16 text-white md:py-24">
      <div className="mx-auto min-w-0 max-w-6xl px-4">
        <RevealOnScroll>
          <MonitoringV2SectionHeader
            align="center"
            dark
            eyebrow={section.eyebrow}
            title={section.title}
            lead={section.lead}
          />
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {metrics.map((m, i) => (
            <RevealOnScroll
              key={m.note}
              delayMs={i * 100}
              className={`${BENTO_SPAN[i] ? "lg:col-span-6" : "lg:col-span-3"} ${
                BENTO_SPAN[i] ? "sm:col-span-2" : ""
              }`}
            >
              <div
                className={`h-full border-l border-white/25 pl-6 ${
                  BENTO_SPAN[i] ? "lg:pl-8" : ""
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <MonitoringV2CountUp
                    value={m.value}
                    className={`font-bold text-white ${BENTO_SPAN[i] ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"}`}
                  />
                  <span className={`font-medium text-brand-200 ${BENTO_SPAN[i] ? "text-xl" : "text-lg"}`}>
                    {m.unit}
                  </span>
                </div>
                <p className={`mt-3 leading-relaxed text-brand-100/90 ${BENTO_SPAN[i] ? "text-base max-w-md" : "text-sm"}`}>
                  {m.note}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

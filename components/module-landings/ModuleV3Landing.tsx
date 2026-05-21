import { MonitoringV3ScrollProgress } from "@/components/module-landings/monitoring-v3/MonitoringV3ScrollProgress";
import { MonitoringV3KeywordStreams } from "@/components/module-landings/monitoring-v3/MonitoringV3KeywordStreams";
import { MonitoringV3DepthPin } from "@/components/module-landings/monitoring-v3/MonitoringV3DepthPin";
import { MonitoringV3FluxScene } from "@/components/module-landings/monitoring-v3/MonitoringV3FluxScene";
import { MonitoringV3InsightsWall } from "@/components/module-landings/monitoring-v3/MonitoringV3InsightsWall";
import { MonitoringV3SignalRail } from "@/components/module-landings/monitoring-v3/MonitoringV3SignalRail";
import { MonitoringV3ScreenshotStage } from "@/components/module-landings/monitoring-v3/MonitoringV3ScreenshotStage";
import { MonitoringV3StatsBurst } from "@/components/module-landings/monitoring-v3/MonitoringV3StatsBurst";
import { MonitoringV3Essentials } from "@/components/module-landings/monitoring-v3/MonitoringV3Essentials";
import { MonitoringV3FaqDeck } from "@/components/module-landings/monitoring-v3/MonitoringV3FaqDeck";
import { MonitoringV3Outro } from "@/components/module-landings/monitoring-v3/MonitoringV3Outro";
import { ModuleV3PulseIntro } from "@/components/module-landings/module-v3/ModuleV3PulseIntro";
import type { ModuleV3PageConfig } from "@/lib/content/module-v3/types";
import type { ModulePage } from "@/lib/content/modules";

type Props = { module: ModulePage; config: ModuleV3PageConfig };

/**
 * Универсальный иммерсивный лендинг v3 (тёмная сцена, как monitoring-pozicii-v3).
 */
export function ModuleV3Landing({ module, config }: Props) {
  const c = config;
  return (
    <div className="module-v3 monitoring-v3 -mx-[max(0px,calc((100vw-100%)/2))] w-screen max-w-[100vw] overflow-x-clip bg-[#05070f] text-white">
      <MonitoringV3ScrollProgress />
      <ModuleV3PulseIntro
        module={module}
        intro={c.intro}
        heroVisual={c.heroVisual}
        showEngineLogos={c.baseSlug.includes("monitoring") || c.baseSlug.includes("relevantnosti")}
      />
      <MonitoringV3KeywordStreams streamA={c.streamA} streamB={c.streamB} />
      {c.depth && <MonitoringV3DepthPin depth={c.depth} />}
      <MonitoringV3FluxScene flux={c.flux} />
      <MonitoringV3SignalRail section={c.signalsSection} signals={c.signals} />
      <MonitoringV3InsightsWall section={c.insightsSection} grid={c.insightsGrid} highlight={c.insightsHighlight} />
      <MonitoringV3ScreenshotStage shots={c.screenshots} section={c.screenshotSection} />
      <MonitoringV3StatsBurst stats={c.stats} section={c.statsSection} />
      <MonitoringV3Essentials data={c.essentials} />
      <MonitoringV3FaqDeck faq={c.faq} section={c.faqSection} />
      <MonitoringV3Outro outro={c.outro} />
    </div>
  );
}

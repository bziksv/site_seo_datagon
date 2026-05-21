import { MonitoringV3ScrollProgress } from "@/components/module-landings/monitoring-v3/MonitoringV3ScrollProgress";
import { MonitoringV3PulseIntro } from "@/components/module-landings/monitoring-v3/MonitoringV3PulseIntro";
import { MonitoringV3KeywordStreams } from "@/components/module-landings/monitoring-v3/MonitoringV3KeywordStreams";
import { MonitoringV3DepthPin } from "@/components/module-landings/monitoring-v3/MonitoringV3DepthPin";
import { MonitoringV3FluxScene } from "@/components/module-landings/monitoring-v3/MonitoringV3FluxScene";
import { MonitoringV3SignalRail } from "@/components/module-landings/monitoring-v3/MonitoringV3SignalRail";
import { MonitoringV3ScreenshotStage } from "@/components/module-landings/monitoring-v3/MonitoringV3ScreenshotStage";
import { MonitoringV3StatsBurst } from "@/components/module-landings/monitoring-v3/MonitoringV3StatsBurst";
import { MonitoringV3Essentials } from "@/components/module-landings/monitoring-v3/MonitoringV3Essentials";
import { MonitoringV3FaqDeck } from "@/components/module-landings/monitoring-v3/MonitoringV3FaqDeck";
import { MonitoringV3Outro } from "@/components/module-landings/monitoring-v3/MonitoringV3Outro";
import {
  MONITORING_V3_DEPTH,
  MONITORING_V3_ESSENTIALS,
  MONITORING_V3_FAQ,
  MONITORING_V3_FLUX,
  MONITORING_V3_INTRO,
  MONITORING_V3_OUTRO,
  MONITORING_V3_SCREENSHOTS,
  MONITORING_V3_SCREENSHOT_SECTION,
  MONITORING_V3_SIGNALS,
  MONITORING_V3_SIGNALS_SECTION,
  MONITORING_V3_STATS,
  MONITORING_V3_STATS_SECTION,
  MONITORING_V3_STREAM_A,
  MONITORING_V3_STREAM_B,
} from "@/lib/content/monitoring-pozicii-v3-page";
import type { ModulePage } from "@/lib/content/modules";

type Props = { module: ModulePage };

/**
 * v3 — «Пульс позиций»: иммерсив, scroll-pin, потоки, без структуры v2/классики.
 */
export function MonitoringPoziciiV3Landing({ module }: Props) {
  return (
    <div className="monitoring-v3 -mx-[max(0px,calc((100vw-100%)/2))] w-screen max-w-[100vw] overflow-x-clip bg-[#05070f] text-white">
      <MonitoringV3ScrollProgress />
      <MonitoringV3PulseIntro module={module} intro={MONITORING_V3_INTRO} />
      <MonitoringV3KeywordStreams streamA={MONITORING_V3_STREAM_A} streamB={MONITORING_V3_STREAM_B} />
      <MonitoringV3DepthPin depth={MONITORING_V3_DEPTH} />
      <MonitoringV3FluxScene flux={MONITORING_V3_FLUX} />
      <MonitoringV3SignalRail section={MONITORING_V3_SIGNALS_SECTION} signals={MONITORING_V3_SIGNALS} />
      <MonitoringV3ScreenshotStage shots={MONITORING_V3_SCREENSHOTS} section={MONITORING_V3_SCREENSHOT_SECTION} />
      <MonitoringV3StatsBurst stats={MONITORING_V3_STATS} section={MONITORING_V3_STATS_SECTION} />
      <MonitoringV3Essentials data={MONITORING_V3_ESSENTIALS} />
      <MonitoringV3FaqDeck faq={MONITORING_V3_FAQ} />
      <MonitoringV3Outro outro={MONITORING_V3_OUTRO} />
    </div>
  );
}

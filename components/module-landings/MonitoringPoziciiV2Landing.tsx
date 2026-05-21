import { MonitoringV2CommandHero } from "@/components/module-landings/monitoring-v2/MonitoringV2CommandHero";
import { MonitoringV2PainGain } from "@/components/module-landings/monitoring-v2/MonitoringV2PainGain";
import { MonitoringV2StoryActs } from "@/components/module-landings/monitoring-v2/MonitoringV2StoryActs";
import { MonitoringV2MetricWall } from "@/components/module-landings/monitoring-v2/MonitoringV2MetricWall";
import { MonitoringV2Orbit } from "@/components/module-landings/monitoring-v2/MonitoringV2Orbit";
import { MonitoringV2Footer } from "@/components/module-landings/monitoring-v2/MonitoringV2Footer";
import {
  MONITORING_V2_ACTS,
  MONITORING_V2_CONCEPT,
  MONITORING_V2_FAQ,
  MONITORING_V2_METRIC_WALL,
  MONITORING_V2_OPTIONS,
  MONITORING_V2_OPTIONS_SECTION,
  MONITORING_V2_ORBIT,
  MONITORING_V2_PAIN_GAIN,
  MONITORING_V2_PLAIN,
  MONITORING_V2_SCREENSHOTS,
  MONITORING_V2_VIDEOS,
} from "@/lib/content/monitoring-pozicii-v2-page";
import type { ModulePage } from "@/lib/content/modules";

type Props = { module: ModulePage; isLabRoute?: boolean };

/**
 * v2 — концепция «Центр управления выдачей».
 * Публичный URL: /monitoring-pozicii-sayta/; LAB: /monitoring-pozicii-v2/.
 */
export function MonitoringPoziciiV2Landing({ module, isLabRoute = false }: Props) {
  return (
    <div className="module-v2-landing min-w-0 max-w-full overflow-x-clip">
      <MonitoringV2CommandHero
        module={module}
        concept={MONITORING_V2_CONCEPT}
        shots={MONITORING_V2_SCREENSHOTS}
        acts={MONITORING_V2_ACTS.map((a) => ({ act: a.act, title: a.title }))}
        heroUi={{
          classicHref: "/monitoring-pozicii-sayta/",
          labBadge: isLabRoute ? "LAB v2" : undefined,
        }}
      />
      <MonitoringV2PainGain data={MONITORING_V2_PAIN_GAIN} />
      <MonitoringV2StoryActs acts={MONITORING_V2_ACTS} />
      <MonitoringV2MetricWall metrics={MONITORING_V2_METRIC_WALL} />
      <MonitoringV2Orbit nodes={MONITORING_V2_ORBIT} />
      <MonitoringV2Footer
        options={MONITORING_V2_OPTIONS}
        optionsSection={MONITORING_V2_OPTIONS_SECTION}
        plain={MONITORING_V2_PLAIN}
        videos={MONITORING_V2_VIDEOS}
        faq={MONITORING_V2_FAQ}
        footerUi={{
          idPrefix: "monitoring-v2",
          finalTitle: "Запустите панель мониторинга",
          finalLead: "",
          classicHref: "/monitoring-pozicii-sayta/",
          faqTitle: "Вопросы по мониторингу",
          videoTitle: "Разбор модуля в видео",
          videoLead: "Четыре урока — от первого проекта до выгрузки отчёта.",
          isLabRoute,
        }}
      />
    </div>
  );
}

/** YouTube-ролики модулей для футера v2 (из *-page.ts). */
import { RELEVANCE_VIDEOS } from "@/lib/content/analiz-relevantnosti-page";
import { TEXT_ANAL_VIDEOS } from "@/lib/content/analiz-teksta-page";
import { CLUSTER_VIDEOS } from "@/lib/content/klasterizator-klyuchevykh-slov-page";
import { SITE_MON_VIDEOS } from "@/lib/content/monitoring-saytov-page";
import { META_MON_VIDEOS } from "@/lib/content/proverka-meta-tegov-page";
import { LINK_TRACK_VIDEOS } from "@/lib/content/otslezhivanie-ssylok-page";
import { DOMAIN_REG_VIDEOS } from "@/lib/content/otslezhivanie-sroka-registratsii-domenov-page";
import { UNIQUE_WORDS_VIDEOS } from "@/lib/content/vydelenie-unikalnykh-slov-page";
import { LIST_COMPARE_VIDEOS } from "@/lib/content/sravnenie-spiskov-page";
import { TEXT_LENGTH_VIDEOS } from "@/lib/content/podschet-dliny-teksta-page";
import { UTM_VIDEOS } from "@/lib/content/utm-metki-page";
import { ROI_CALC_VIDEOS } from "@/lib/content/kalkulyator-roi-page";
import { HTML_EDITOR_VIDEOS } from "@/lib/content/html-redaktor-page";

export type ModuleV2Video = { id: string; title: string; description: string };

export const MODULE_V2_VIDEOS: Partial<Record<string, readonly ModuleV2Video[]>> = {
  "analiz-relevantnosti": RELEVANCE_VIDEOS,
  "monitoring-saytov": SITE_MON_VIDEOS,
  "proverka-meta-tegov-online": META_MON_VIDEOS,
  "podschet-dliny-teksta": TEXT_LENGTH_VIDEOS,
  "sravnenie-spiskov-klyuchevykh-fraz": LIST_COMPARE_VIDEOS,
  "utm-metki": UTM_VIDEOS,
  "kalkulyator-roi": ROI_CALC_VIDEOS,
  "html-redaktor": HTML_EDITOR_VIDEOS,
  "vydelenie-unikalnykh-slov-v-tekste": UNIQUE_WORDS_VIDEOS,
  "otslezhivanie-ssylok": LINK_TRACK_VIDEOS,
  "otslezhivanie-sroka-registratsii-domenov": DOMAIN_REG_VIDEOS,
  "analiz-teksta": TEXT_ANAL_VIDEOS,
  "klasterizator-klyuchevykh-slov": CLUSTER_VIDEOS,
};

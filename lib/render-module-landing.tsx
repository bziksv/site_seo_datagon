import type { ModulePage } from "@/lib/content/modules";
import { ModuleLanding } from "@/components/ModuleLanding";
import { AnalizRelevantnostiLanding } from "@/components/module-landings/AnalizRelevantnostiLanding";
import { AnalizKonkurentovLanding } from "@/components/module-landings/AnalizKonkurentovLanding";
import { HttpHeadersLanding } from "@/components/module-landings/HttpHeadersLanding";
import { KalkulyatorRoiLanding } from "@/components/module-landings/KalkulyatorRoiLanding";
import { UtmMetkiLanding } from "@/components/module-landings/UtmMetkiLanding";
import { SravnenieSpiskovLanding } from "@/components/module-landings/SravnenieSpiskovLanding";
import { GeneratorParoleyLanding } from "@/components/module-landings/GeneratorParoleyLanding";
import { PodschetDlinyTekstaLanding } from "@/components/module-landings/PodschetDlinyTekstaLanding";
import { GeneratorSlovLanding } from "@/components/module-landings/GeneratorSlovLanding";
import { ProverkaMetaTegovLanding } from "@/components/module-landings/ProverkaMetaTegovLanding";
import { UdalenieDublikatovLanding } from "@/components/module-landings/UdalenieDublikatovLanding";
import { VydelenieUnikalnykhSlovLanding } from "@/components/module-landings/VydelenieUnikalnykhSlovLanding";
import { OtslezhivanieSsylokLanding } from "@/components/module-landings/OtslezhivanieSsylokLanding";
import { OtslezhivanieSrokaRegistratsiiDomenovLanding } from "@/components/module-landings/OtslezhivanieSrokaRegistratsiiDomenovLanding";
import { AnalizTekstaLanding } from "@/components/module-landings/AnalizTekstaLanding";
import { KlasterizatorKlyuchevykhSlovLanding } from "@/components/module-landings/KlasterizatorKlyuchevykhSlovLanding";
import { HtmlRedaktorLanding } from "@/components/module-landings/HtmlRedaktorLanding";
import { MonitoringPoziciiLanding } from "@/components/module-landings/MonitoringPoziciiLanding";
import { MonitoringSaytovLanding } from "@/components/module-landings/MonitoringSaytovLanding";

/** Рендер эталонного лендинга по базовому slug (классика / LAB v1). */
export function renderModuleLanding(baseSlug: string, module: ModulePage) {
  switch (baseSlug) {
    case "analiz-relevantnosti":
      return <AnalizRelevantnostiLanding module={module} />;
    case "monitoring-pozicii-sayta":
      return <MonitoringPoziciiLanding module={module} />;
    case "monitoring-saytov":
      return <MonitoringSaytovLanding module={module} />;
    case "analiz-konkurentov":
      return <AnalizKonkurentovLanding module={module} />;
    case "html-redaktor":
      return <HtmlRedaktorLanding module={module} />;
    case "http-headers":
      return <HttpHeadersLanding module={module} />;
    case "kalkulyator-roi":
      return <KalkulyatorRoiLanding module={module} />;
    case "utm-metki":
      return <UtmMetkiLanding module={module} />;
    case "sravnenie-spiskov-klyuchevykh-fraz":
      return <SravnenieSpiskovLanding module={module} />;
    case "generator-paroley":
      return <GeneratorParoleyLanding module={module} />;
    case "podschet-dliny-teksta":
      return <PodschetDlinyTekstaLanding module={module} />;
    case "generator_slov":
      return <GeneratorSlovLanding module={module} />;
    case "proverka-meta-tegov-online":
      return <ProverkaMetaTegovLanding module={module} />;
    case "udalenie-dublikatov":
      return <UdalenieDublikatovLanding module={module} />;
    case "vydelenie-unikalnykh-slov-v-tekste":
      return <VydelenieUnikalnykhSlovLanding module={module} />;
    case "otslezhivanie-ssylok":
      return <OtslezhivanieSsylokLanding module={module} />;
    case "otslezhivanie-sroka-registratsii-domenov":
      return <OtslezhivanieSrokaRegistratsiiDomenovLanding module={module} />;
    case "analiz-teksta":
      return <AnalizTekstaLanding module={module} />;
    case "klasterizator-klyuchevykh-slov":
      return <KlasterizatorKlyuchevykhSlovLanding module={module} />;
    default:
      return <ModuleLanding module={module} />;
  }
}

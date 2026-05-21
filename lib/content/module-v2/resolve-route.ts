import { MODULE_NAV_BASE } from "@/lib/nav-modules";
import { getBaseModuleBySlug } from "@/lib/content/modules";
import { getModuleV2Config } from "@/lib/content/module-v2/registry";

/** Базовые slug с универсальным v2 (все пункты меню, кроме отдельного эталона мониторинга). */
export const MODULE_V2_PUBLIC_BASE_SLUGS = MODULE_NAV_BASE.map((m) => m.slug);

export function moduleV2LabSlug(baseSlug: string): string {
  if (baseSlug === "monitoring-pozicii-sayta") return "monitoring-pozicii-v2";
  return `${baseSlug}-v2`;
}

/** Публичный URL модуля отдаёт v2, если есть конфиг в реестре. */
export function getModuleV2LabSlugForPage(pageSlug: string): string | undefined {
  if (pageSlug.endsWith("-v2")) return pageSlug;
  if (!getBaseModuleBySlug(pageSlug)) return undefined;
  const labSlug = moduleV2LabSlug(pageSlug);
  return getModuleV2Config(labSlug) ? labSlug : undefined;
}

export function isMonitoringV2Page(pageSlug: string): boolean {
  return pageSlug === "monitoring-pozicii-sayta" || pageSlug === "monitoring-pozicii-v2";
}

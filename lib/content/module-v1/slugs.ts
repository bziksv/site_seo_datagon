import { MODULE_NAV_BASE } from "@/lib/nav-modules";

/** LAB v1 slug (как monitoring-pozicii-v2 — особый slug у мониторинга). */
export function moduleV1Slug(baseSlug: string): string {
  if (baseSlug === "monitoring-pozicii-sayta") return "monitoring-pozicii-v1";
  return `${baseSlug}-v1`;
}

export function baseSlugFromV1(slug: string): string | undefined {
  if (slug === "monitoring-pozicii-v1") return "monitoring-pozicii-sayta";
  if (slug.endsWith("-v1")) return slug.slice(0, -3);
  return undefined;
}

export function isLabV1Slug(slug: string): boolean {
  return baseSlugFromV1(slug) !== undefined;
}

/** Базовые slug из каталога сервисов (без -v2/-v3 в меню). */
export const MODULE_V1_BASE_SLUGS = MODULE_NAV_BASE.map((m) => m.slug);

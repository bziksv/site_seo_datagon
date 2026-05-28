import { LK_URL } from "@/lib/site";

export const ROI_CALC_DEMO_MODULE = "kalkulyator-roi" as const;

export function buildRoiCalcRegisterUrl(): string {
  const u = new URL(`${LK_URL}/register`);
  u.searchParams.set("module", ROI_CALC_DEMO_MODULE);
  u.searchParams.set("from", "demo");
  return u.toString();
}

export function buildRoiCalcCabinetUrl(): string {
  return `${LK_URL}/roi-calculator`;
}

export function buildRoiCalcIdeasUrl(): string {
  return `${LK_URL}/ideas`;
}

export const ROI_CALC_CABINET_FEATURES = [
  "Тот же калькулятор ROI и прогноз трафика — в личном кабинете",
  "Генератор ключевых слов, UTM-метки, анализ конкурентов и текста",
  "Мониторинг позиций, мета-тегов, HTTP-заголовков и ссылок",
  "Доска идей — предложите модуль или улучшение, мы берём в работу",
] as const;

export const ROI_CALC_UPGRADE_HINT =
  "Зарегистрируйтесь бесплатно — в кабинете десятки SEO- и маркетинговых инструментов в одном доступе, без зоопарка подписок.";

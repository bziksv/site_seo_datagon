import { LK_URL } from "@/lib/site";

export const UTM_MARKS_DEMO_MODULE = "utm-metki" as const;

export function buildUtmMarksRegisterUrl(): string {
  const u = new URL(`${LK_URL}/register`);
  u.searchParams.set("module", UTM_MARKS_DEMO_MODULE);
  u.searchParams.set("from", "demo");
  return u.toString();
}

export const UTM_MARKS_CABINET_FEATURES = [
  "Тот же генератор UTM в личном кабинете — всегда под рукой",
  "Мониторинг мета-тегов и HTTP-заголовков по расписанию",
  "Анализ текста, конкурентов и позиций в одном проекте",
  "Отслеживание ссылок и доступности сайтов",
  "Telegram-оповещения и отчёты — без разрозненных сервисов",
] as const;

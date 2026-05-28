import { LK_URL } from "@/lib/site";

export const HTTP_HEADERS_DEMO_MODULE = "http-headers" as const;

export const HTTP_HEADERS_DEMO_MAX_RUNS = 5;

export const HTTP_HEADERS_SAMPLE_URL = "https://datagon.ru/";

export function buildHttpHeadersRegisterUrl(): string {
  const u = new URL(`${LK_URL}/register`);
  u.searchParams.set("module", HTTP_HEADERS_DEMO_MODULE);
  u.searchParams.set("from", "demo");
  return u.toString();
}

export const HTTP_HEADERS_CABINET_FEATURES = [
  "Пакет до 500 URL — коды, кэш и безопасность в одной таблице",
  "Свои заголовки запроса, User-Agent и версия HTTP",
  "Задержка между запросами — без перегрузки сервера",
  "Выгрузка CSV для техаудита и отчёта заказчику",
  "История проверок в проекте — не теряете снимки ответа",
] as const;

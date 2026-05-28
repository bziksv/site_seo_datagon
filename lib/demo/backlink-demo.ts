import { LK_URL } from "@/lib/site";

export const BACKLINK_DEMO_MODULE = "otslezhivanie-ssylok" as const;

export const BACKLINK_DEMO_MAX_RUNS = 5;

export const BACKLINK_DEMO_SAMPLE = {
  donor: "https://ru.wikipedia.org/wiki/Сайт",
  link: "/wiki/%D0%91%D1%80%D1%83%D0%B7%D0%B5%D1%80",
  anchor: "браузеров",
} as const;

export function buildBacklinkRegisterUrl(): string {
  const u = new URL(`${LK_URL}/register`);
  u.searchParams.set("module", BACKLINK_DEMO_MODULE);
  u.searchParams.set("from", "demo");
  return u.toString();
}

export const BACKLINK_CABINET_FEATURES = [
  "Проекты с десятками и сотнями ссылок — без ручного обхода доноров",
  "Проверка раз в сутки: ссылка на месте, анкор, nofollow и noindex",
  "Повторная проверка через час при расхождении — меньше ложных тревог",
  "Email и Telegram, если ссылку сняли или изменили атрибуты",
  "Списоком или таблицей — два формата загрузки, как в кабинете",
  "Сводка по проектам: сколько ссылок и сколько проблемных",
] as const;

export const BACKLINK_DEMO_VS_CABINET = [
  {
    title: "На сайте (демо)",
    items: [
      "Одна проверка за запуск",
      "До 5 запусков в сутки",
      "Результат сразу на экране",
      "Без сохранения истории",
    ],
  },
  {
    title: "В личном кабинете",
    items: [
      "Проекты и неограниченный мониторинг по тарифу",
      "Автоматическая проверка каждые 24 часа",
      "Уведомления на почту и в Telegram",
      "История статусов и счётчик проблемных ссылок",
      "Привязка к проекту мониторинга позиций",
    ],
  },
] as const;

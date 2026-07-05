/**
 * Проверка иммерсивного лендинга /monitoring-pozicii-v3/ (не v2 и не классика).
 */
const BASE = (process.env.BASE_URL ?? "http://127.0.0.1:3001").replace(/\/$/, "");
const PATH = "/monitoring-pozicii-v3/";

const MUST_HAVE = [
  "Пульс",
  "позиций",
  "LAB · v3",
  "До 100 позиций",
  "Без системы",
  "С мониторингом Титло",
  "позиций в выдаче",
  "Параметры модуля",
  "От ядра до отчёта",
  "Что в отчёте",
  "Динамика и конкуренты",
  "Суть модуля",
  "Что умеет мониторинг",
  "Список ключей и динамика",
  "Проверка выдачи",
];

const MUST_NOT = [
  "Центр управления выдачей",
  "Три акта",
  "Без единой картины",
  "Режимы в одной платформе",
  "Как устроен мониторинг",
];

async function main() {
  const url = `${BASE}${PATH}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${url} → HTTP ${res.status}`);
    process.exit(1);
  }
  const html = await res.text();
  const missing = MUST_HAVE.filter((s) => !html.includes(s));
  const stale = MUST_NOT.filter((s) => html.includes(s));

  if (missing.length === 0 && stale.length === 0) {
    console.log(`OK ${url} — концепция «Пульс позиций» (LAB v3)`);
    process.exit(0);
  }
  console.error(`FAIL ${url}`);
  if (missing.length) console.error("  нет:", missing.join(", "));
  if (stale.length) console.error("  чужая структура:", stale.join(", "));
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

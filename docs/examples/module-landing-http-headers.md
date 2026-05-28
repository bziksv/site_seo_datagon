# Эталон: лендинг «HTTP headers»

| Среда | URL |
|-------|-----|
| Локально | http://localhost:3001/http-headers/ |
| Прод | https://datagon.ru/http-headers/ |

`HttpHeadersLanding` · `lib/content/http-headers-page.ts` · демо `HttpHeadersDemoWidget` · API `POST /api/demo/http-headers/run/` → кабинет `api/demo/http-headers/run`.

Акцент: **коды ответа, кэш, сжатие, безопасность, пакет до 500 URL, CSV**. На лендинге — **демо 1 URL / 5 запусков в сутки** и блок **«Зачем регистрироваться»**.

Проверка: `npm run verify:http-headers` (порт **3001**, кабинет **:3002** для демо-запроса)

Скрины: `http-headers-shot-*.png` (`node scripts/capture-http-headers-screenshots.mjs` — границы по пикселям из `fca23ef04bd3b647.png`, без сайдбара; пакет — коллаж иконок). Не `276b48fc…` / `72df8fd…` (A/文), resize 470×470.

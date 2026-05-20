# Деплой marketing-сайта (Next.js)

Продукт остаётся на **lk.redbox.su** (Laravel). Этот репозиторий — статический/SSR фронт без БД.

## Сборка

```bash
npm ci
npm run build
npm run start   # standalone, http://localhost:3001 (после build)
```

Переменные окружения — см. `.env.example` (`NEXT_PUBLIC_LK_URL`, `LK_API_BASE_URL` для BFF, `NEXT_PUBLIC_YM_ID` для Метрики; по умолчанию в коде `54591493` с live Kraken).

В `next.config.ts` включён **`output: "standalone"`** — один `server.js` для Docker/VPS.

## Docker (рекомендуется для VPS)

```bash
# Сборка и запуск
npm run docker:up

# Или вручную
docker compose build
docker compose up -d
```

Проверка:

```bash
curl http://localhost:3001/api/health/
npm run smoke
```

Остановка: `docker compose down`.

Перед `npm run build` остановите `npm run dev` (иначе возможны ошибки сборки).

## Smoke-тест URL

После `npm run build && npm run start` или деплоя:

```bash
npm run smoke
# другой хост:
BASE_URL=https://staging.example.com npm run smoke
```

Проверяются **все** модули (18), новости (30), юр. страницы, sitemap/robots и редиректы Битрикса.

### Сверка с sitemap Битрикса

Пока live ещё на Битриксе — проверить, что новый билд покрывает все URL из их sitemap:

```bash
BASE_URL=http://localhost:3001 npm run compare:sitemap
```

### Nginx

Пример прокси на порт 3001: [nginx-redbox.example.conf](./nginx-redbox.example.conf)

## Vercel / аналог

- Build: `npm run build`
- Env: `NEXT_PUBLIC_LK_URL=https://lk.redbox.su`, `LK_API_BASE_URL=https://lk.redbox.su`
- Standalone не обязателен на Vercel (платформа собирает сама).

## CI

GitHub Actions: `.github/workflows/ci.yml` — `lint` + `build` на push/PR.

## Переключение домена redbox.su

1. Поднять staging (`docker compose` или preview), выполнить `BASE_URL=… npm run smoke`.
2. DNS `redbox.su` → новый хост (A/CNAME), SSL на edge.
3. Повторить smoke на production URL.
4. Отключить Битрикс (или read-only для отката).

Редиректы наследия — `next.config.ts`.

## Обновление контента

| Что | Команда |
|-----|---------|
| Новости (+ картинки в `public/news/assets/`) | `npm run scrape:news` |
| Только зеркало картинок новостей | `npm run mirror:news-images` |
| Юр. тексты | `npm run scrape:legal` |
| YouTube на лендингах | `npm run scrape:module-videos` |

После скрапа — commit `*.generated.ts`, `public/news/assets/*` и redeploy.

## Staging перед cutover

```bash
# 1. Сборка
npm ci && npm run build && npm run start

# 2. Smoke на staging-хосте
BASE_URL=https://staging.redbox.su npm run smoke
BASE_URL=https://staging.redbox.su npm run compare:sitemap

# 3. Форма (нужен SMTP — см. .env.example, или lk / CONTACT_WEBHOOK_URL)
curl -sS -X POST "$BASE_URL/api/contact/" \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@example.com","message":"Smoke test contact","agree":true}'
```

Форма на production: см. [lk-contact-api.md](./lk-contact-api.md).

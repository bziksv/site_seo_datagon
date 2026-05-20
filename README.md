# redbox.su → Датагон (маркетинг)

Маркетинговый сайт **Датагон** на **Next.js**. Продукт и кабинет — **lk.redbox.su** (Laravel).

Бренд: логотип и favicon — `public/favicon.svg` (из [p.datagon.ru](../p.datagon.ru/public/favicon.svg)).

## Документация

| Раздел | Файл |
|--------|------|
| Оглавление | [docs/README.md](docs/README.md) |
| Архитектура | [docs/architecture.md](docs/architecture.md) |
| Страницы и URL | [docs/pages.md](docs/pages.md) |
| API к lk | [docs/api-lk.md](docs/api-lk.md) |
| Деплой | [docs/deploy.md](docs/deploy.md) |
| Эталоны UI | [docs/examples/README.md](docs/examples/README.md) |

## Быстрый старт

```bash
npm install
npm run dev          # http://localhost:3001
npm run build && npm run start
npm run smoke        # после start — все ~57 URL
npm run compare:sitemap  # сверка с sitemap Битрикса
npm run check        # lint + build
npm run docker:up    # production в Docker
```

## Миграция

Чеклист: [docs/migration-checklist.md](docs/migration-checklist.md)

Импорт с live-сайта: `npm run scrape:news`, `npm run scrape:legal`.

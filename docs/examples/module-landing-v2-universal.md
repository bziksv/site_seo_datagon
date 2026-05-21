# Универсальный лендинг модуля v2 (LAB)

Концепция «Центр управления» по образцу [module-landing-monitoring-v2.md](./module-landing-monitoring-v2.md).

| Среда | Пример |
|-------|--------|
| Публичный URL | http://localhost:3001/analiz-relevantnosti/ |
| LAB v2 (архив) | http://localhost:3001/analiz-relevantnosti-v2/ |
| Мониторинг (кастом) | http://localhost:3001/monitoring-pozicii-sayta/ · LAB: `/monitoring-pozicii-v2/` |

## Код

| Часть | Путь |
|-------|------|
| Оболочка | `components/module-landings/ModuleV2Landing.tsx` |
| Секции | `components/module-landings/monitoring-v2/*` |
| Сборка | `lib/content/module-v2/build-config.ts` |
| Редакторские тексты v2 | `lib/content/module-v2/overrides.ts` — акты, pain/gain, метрики, орбита |
| Доработка копирайта | `enrichment.ts` — lead, chips, CTA; `sections-enrichment.ts` — metric/options/footer |
| Видео | `lib/content/module-v2/videos-by-slug.ts` |
| Реестр | `lib/content/module-v2/registry.ts` |

## Меню

Меню: один пункт на модуль → публичный URL = v2 (`lib/nav-modules.ts`). LAB `*-v1`, `*-v2`, `*-v3` — noindex, `robots.txt` disallow; v1 = старая классика.

## Доработка модуля

Правки текстов — `overrides.ts`, `enrichment.ts`, `sections-enrichment.ts`. Роутинг: `lib/content/module-v2/resolve-route.ts`, `app/[slug]/page.tsx`.

## Проверка

```bash
npm run build
# http://localhost:3001/<slug>/
# http://localhost:3001/<slug>-v1/  # архив классики, robots disallow
```

# Универсальный лендинг модуля v3 (LAB)

Иммерсивная тёмная сцена по образцу [module-landing-monitoring-v3.md](./module-landing-monitoring-v3.md), без отдельного TSX на каждый модуль.

| Среда | Пример |
|-------|--------|
| Локально | http://localhost:3001/analiz-relevantnosti-v3/ |
| Эталон (кастом) | http://localhost:3001/monitoring-pozicii-v3/ → `MonitoringPoziciiV3Landing` |

## Код

| Часть | Путь |
|-------|------|
| Оболочка | `components/module-landings/ModuleV3Landing.tsx` |
| Hero (параметризован) | `components/module-landings/module-v3/ModuleV3PulseIntro.tsx`, `ModuleV3PulseHeroVisual.tsx` |
| Секции (общие) | `components/module-landings/monitoring-v3/*` |
| Сборка контента | `lib/content/module-v3/build-config.ts` |
| Реестр модулей | `lib/content/module-v3/registry.ts` |
| Роут | `app/[slug]/page.tsx` — `getModuleV3Config(slug)` → `ModuleV3Landing` |

Стили: `app/globals.css` — классы `.module-v3` дублируют `.monitoring-v3`.

## Меню и SEO

- В меню: один пункт на модуль → публичный `/<slug>/` (`lib/nav-modules.ts`). LAB `*-v1/v2/v3` — не в меню.
- LAB: `noindex`, не в `sitemap.xml`, `robots.txt` disallow (`isLabModuleSlug`).

## Добавить / улучшить модуль

1. Контент классики уже в `lib/content/<module>-page.ts`.
2. Запись в `registry.ts`: `cfg(getBase, "<base-slug>", { hero, stats, … }, { title?, panelLabel?, flux? })`.
3. Для уровня monitoring v3 — править `opts` (заголовок hero, `flux`, `panelLabel`) и при необходимости `FLUX_OVERRIDES` в `build-config.ts`.
4. Depth-pin только у `monitoring-pozicii-v3` (кастомный лендинг).

## Проверка

```bash
npm run build
# открыть http://localhost:3001/<slug>-v3/
npm run verify:monitoring-v3   # только эталон monitoring-pozicii-v3
```

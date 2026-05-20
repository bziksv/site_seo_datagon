# Эталон: демо-виджет на /demo

## Назначение

Интерактив на маркетинговом сайте без БД; полный продукт — в lk.

## Файлы

| Часть | Путь |
|-------|------|
| UI | `components/demo/TextLengthTool.tsx` |
| Логика | `lib/demo/text-stats.ts` |
| Страница | `app/demo/page.tsx` |
| BFF к lk | `app/api/lk/[...path]/route.ts`, `lib/lk-api.ts` |

## BFF

Браузер → `/api/lk/...` → Laravel. Разрешённые префиксы — в `lib/lk-api.ts` (`ALLOWED_PREFIXES`).

## Расширение

Новый демо-модуль: компонент в `components/demo/`, при необходимости эндпоинт в allowlist.

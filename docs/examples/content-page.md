# Эталон: контентная страница

## Назначение

Статические страницы компании (about, contact, tarify, services, faq).

## Паттерн

1. Тексты — `lib/content/<раздел>.ts`
2. Страница — `app/<slug>/page.tsx` с `metadata` + `PageShell`
3. Специфичный UI — компонент (`TariffCard`, `FaqAccordion`)

## Примеры

| Страница | Контент | Страница |
|----------|---------|----------|
| Тарифы | `lib/content/tariffs.ts` | `app/tarify/page.tsx` |
| FAQ | `lib/content/faq.ts` | `app/faq/page.tsx` |

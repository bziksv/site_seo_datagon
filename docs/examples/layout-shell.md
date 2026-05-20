# Эталон: оболочка сайта

## Назначение

Шапка, подвал, cookie-баннер, карточка модуля на главной.

## Код

| Элемент | Файл |
|---------|------|
| Header + меню | `components/Header.tsx` |
| Footer | `components/Footer.tsx` |
| Cookie banner | `components/CookieBanner.tsx` |
| Карточка модуля | `components/ModuleCard.tsx` |
| Навигация / константы | `lib/site.ts` |
| Layout | `app/layout.tsx` |

## Использование

Новые страницы — только контент в `<main>`, без дублирования header/footer.

# Заметки по `npm run audit:pages`

Сверка **объёма текста в `<body>`** live vs Next. Низкий % у нас часто нормален: на Bitrix в body попадают меню, cookie, дубли Kraken.

## Интерпретация статусов

| Статус | Значение |
|--------|----------|
| **OK** | Объём текста ≥ 70% от live, нет hotlink-картинок |
| **TEXT_WARN** | 40–69% — проверить вручную |
| **TEXT_LOW** | &lt; 40% — часто из-за меньшего «шума» в вёрстке, не обязательно потеря контента |
| **EXT_IMG** | В HTML есть `redbox.su/upload` — нужно зеркало в `public/` |

## Май 2026 (после фазы 13)

- **EXT_IMG:** 0 на всех страницах ✅
- **Ядро** (`/`, about, contact): TEXT_LOW/WARN — у live длинный footer/nav в body
- **Тарифы:** после `scrape:tariffs` — полные списки с live (18 пунктов × 4 плана)
- **FAQ:** переписан под Датагон в `lib/content/faq.ts` (не Kraken)
- **Новости detail:** TEXT_LOW ожидаемо — у нас только статья, у live вся оболочка сайта
- **Модули:** большинство OK/TEXT_WARN; `html-redaktor`, `vydelenie-unikalnykh-slov` — мало текста и на live

Повтор:
```bash
npm run dev
BASE_URL=http://localhost:3001 npm run audit:pages
```

Отчёт: `docs/page-audit-report.json`

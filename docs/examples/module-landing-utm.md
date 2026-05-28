# Эталон: лендинг «Генератор UTM меток»

| Среда | URL |
|-------|-----|
| Локально | http://localhost:3001/utm-metki/ |
| Прод | https://datagon.ru/utm-metki/ |

`UtmMetkiLanding` · `lib/content/utm-metki-page.ts` · демо `UtmMarksDemoWidget` + `UtmMarksDemoEmbed` (плашки площадок, шаги, chrome iframe) · `/demo/utm-marks/index.html` + `demo-embed.css` (синк: `node scripts/sync-utm-demo-from-cabinet.mjs`).

Акцент: **utm_source/medium/campaign, content/term, подсказки под площадки, Openstat**. Демо **без лимитов** — регистрация для доступа к остальным модулям кабинета.

Проверка: `npm run verify:utm` (порт **3001**)

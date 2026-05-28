# Эталон: лендинг «Отслеживание ссылок»

| Среда | URL |
|-------|-----|
| Локально | http://localhost:3001/otslezhivanie-ssylok/ |
| Прод | https://datagon.ru/otslezhivanie-ssylok/ |

Публично: **Module V2** (`ModuleV2Landing`, `lib/content/module-v2/overrides.ts` → `otslezhivanie-ssylok`, `build-config.ts` → `demoWidget: backlink`, `postReg: LINK_TRACK_POST_REG`). Контент и демо: `lib/content/otslezhivanie-ssylok-page.ts` · `BacklinkDemoWidget` в `ModuleV2DemoSection`. Классика `OtslezhivanieSsylokLanding` — запасной вариант, на `/otslezhivanie-ssylok/` не рендерится.

Акцент: **контроль ссылок на донорах, nofollow/noindex, анкор, Telegram/email, два формата ввода**.

**Демо:** `POST /api/demo/otslezhivanie-ssylok/run` → кабинет `api/demo/otslezhivanie-ssylok/run` · виджет `components/demo/BacklinkDemoWidget.tsx`.

На лендинге: блок «Попробовать» + секция «Зачем регистрироваться в личном кабинете» (демо vs кабинет).

Скрины LK 1200px (не иконки 50×50): hero — `e099cc385364f9d0.png`; сетка — `ee5cfc308bb02b11.png`, `ca6718536335a6ad.png`, `3fdad8e62fbf444b.png`.

Проверка: `npm run verify:link-track` (порт **3001**)

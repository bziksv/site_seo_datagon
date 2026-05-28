# HTTP-заголовки — журнал версий

Config: `cabinet.datagon.ru/config/cabinet-http-headers.php`  
Проверка: http://localhost:3002/http-headers

## 1.0.0s — 2026-05-26 (демо на datagon.ru)

- **API:** `POST api/demo/http-headers/run` — разовая проверка одного URL для лендинга http://localhost:3001/http-headers/ (лимит 5/сутки, без сохранения в БД).
- **Маркетинг:** `HttpHeadersDemoWidget`, блок «Зачем регистрироваться в личном кабинете».

## 1.0.0s — 2026-05-26

- **UI:** layout `cabinet-hh-page`, навигация, lead, KPI и таблица в Vue (`ResponseHttpCode`), карточки ответа и HTML, BS5-иконки.
- **Проверка:** http://localhost:3002/http-headers — badge **v1.0.0s**, пакетная проверка и одиночный URL.

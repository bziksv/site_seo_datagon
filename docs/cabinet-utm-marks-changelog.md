# UTM-метки — журнал версий

Config: `cabinet.datagon.ru/config/cabinet-utm-marks.php`  
Проверка: http://localhost:3002/utm-marks

## 1.0.2s — 2026-05-26

- **RU:** «Arbitrary» → **«Вручную»**; заголовок блока шаблонов «Шаблон:» вместо «Пример:».

## 1.0.1s — 2026-05-26

- **Fix:** порядок CSS (cabinet поверх legacy) — сетка и чипы не ломаются.
- **Fix:** вкладка myTarget `data-tab="targetmailru"` — совпадает с JS шаблона.
- **Fix:** Google Ads `{param2}` вместо опечатки `{param2e}`; шаг 3 на всю ширину.

## 1.0.0s — 2026-05-26

- **UI:** `cabinet-utm-marks.css`, обёртка `cabinet-utm-page`, шаги с номерами, чипы шаблонов и подсказок, карточки полей, кнопка «Создать URL», модальное окно результата.
- **Badge** в шапке модуля.
- **Проверка:** http://localhost:3002/utm-marks — шаблоны, подсказки, сборка ссылки.

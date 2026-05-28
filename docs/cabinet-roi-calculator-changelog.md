# Changelog: Калькулятор ROI

Модуль: `/roi-calculator` · config `cabinet-roi-calculator.php` · badge **v1.1**

## 1.1 — 2026-05-27

- Подпись **CTB** исправлена: «конверсия из действий в покупки» (формула `продажи / действия`).
- **Очистить** сбрасывает поля формы и метрики; снимается подсветка ROI/выручки.
- Защита от деления на ноль: пустая ячейка вместо `Infinity` / `NaN`.
- `calc.js` переписан читаемо; убран мёртвый вызов `$grid.isotope`.
- **Проверка:** http://localhost:3002/roi-calculator , badge **v1.1**.

## 1.0 — 2026-05-27

- **UI AdminLTE 4 / BS5:** вкладки «Калькулятор ROI» / «Прогноз трафика», карточка ввода слева, сетка метрик справа, `cabinet-roi-calculator.css`; legacy AdminLTE ROI CSS отключён.
- Сохранены ID полей и `calc.js` (расчёт и подсветка ROI).
- **Проверка:** http://localhost:3002/roi-calculator , badge **v1.0**.

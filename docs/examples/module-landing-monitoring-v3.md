# Эталон: лендинг «Мониторинг позиций» v3 — LAB «Пульс позиций»

| Среда | URL |
|-------|-----|
| Локально | http://localhost:3001/monitoring-pozicii-v3/ |
| v2 | http://localhost:3001/monitoring-pozicii-v2/ |
| Классика | http://localhost:3001/monitoring-pozicii-sayta/ |

`MonitoringPoziciiV3Landing` · `lib/content/monitoring-pozicii-v3-page.ts`.

## Концепция: иммерсив, не лендинг-блоки

**Не** v2 («Центр управления») и **не** классика. Тёмная сцена; тексты — **продуктовые** (без инструкций «прокрутите / листайте вбок»). Контент: `lib/content/monitoring-pozicii-v3-page.ts`.

| Блок | Эффект |
|------|--------|
| `MonitoringV3ScrollProgress` | Прогресс-бар скролла сверху |
| `MonitoringV3PulseIntro` | Full-viewport: **2 колонки** (копия + `MonitoringV3PulseHeroVisual`), сетка, hero CTA |
| `MonitoringV3KeywordStreams` | Двойной marquee фраз |
| `MonitoringV3DepthPin` | 2 колонки: текст + панель глубины, маркеры ТОП‑3…100 |
| `MonitoringV3FluxScene` | 2 карточки хаос/порядок + прогресс-бар скролла |
| `MonitoringV3SignalRail` | Горизонтальный snap-scroll карточек + точки-навигация |
| `MonitoringV3InsightsWall` | Сетка «что в отчёте» + панель динамики (текст из классики) |
| `MonitoringV3ScreenshotStage` | Скрины в рамке «браузер», 2 колонки на desktop |
| `MonitoringV3StatsBurst` | Count-up (видны до скролла; «ПК» static) + подписи |
| `MonitoringV3Essentials` | Параметры + 4 слоя «как устроен» + plain-карточки + ссылки на модули |
| `MonitoringV3FaqDeck` | Аккордеон на тёмном фоне |
| `MonitoringV3Outro` | CTA с лёгким magnetic-offset |

Анимации: `app/globals.css` (классы `.monitoring-v3 .animate-v3-*`), `prefers-reduced-motion` отключает циклы.

## Палитра и акценты (не «сплошной чёрный»)

Секции чередуют тона через классы в `app/globals.css`:

| Класс | Секция |
|-------|--------|
| `.monitoring-v3-tone-hero` | Intro — navy + brand/violet glow |
| `.monitoring-v3-tone-stream` | Marquee фраз |
| `.monitoring-v3-tone-depth` | Pin глубины 1→100 |
| `.monitoring-v3-tone-flux` | Хаос → порядок |
| `.monitoring-v3-tone-violet` | Signal rail |
| `.monitoring-v3-tone-slate` | Скриншоты |
| `.monitoring-v3-tone-stats` | Цифры (brand panel) |
| `.monitoring-v3-tone-ink` / `.monitoring-v3-tone-faq` / `.monitoring-v3-tone-outro` | Essentials, FAQ, финальный CTA |

Важные объекты: `.monitoring-v3-highlight-panel` (CTA), `.monitoring-v3-highlight-metric` (число глубины), `.monitoring-v3-stat-cell`, `.monitoring-v3-signal-card[data-accent]`. Заголовки секций — `MonitoringV3SectionHeader.tsx`.

## Проверка

```bash
npm run verify:monitoring-v3
```

Порт **3001**. В HTML **не** должно быть текстов v2/классики из `MUST_NOT` в скрипе.

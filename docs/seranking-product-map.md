# SE Ranking — карта страниц продукта (online.seranking.com)

**Дата:** 2026-05-27  
**Источник:** обход демо-аккаунта + извлечение ссылок из DOM (страницы `research.*`, `admin.*`).  
**Демо-вход:** https://online.seranking.com/login.demo.html?lang=ru → редирект на дашборд.  
**Не путать:** https://seranking.com/ — маркетинг; кнопка «Request a demo» — лид-форма, не UI продукта.

**Связанные документы Datagon:**

- **[seranking-pages-visited.md](./seranking-pages-visited.md)** — журнал: **каждый URL открыт в демо** (Playwright, 2026-05-27); сырьё: [seranking-pages-visited.json](./seranking-pages-visited.json), [seranking-demo-projects-visits.json](./seranking-demo-projects-visits.json) (8 проектов × overview + rankings)
- [cabinet-monitoring-benchmark-seranking.md](./cabinet-monitoring-benchmark-seranking.md) — разбор Rank Tracker / списка проектов (бенчмарк для `/monitoring-v2`)
- [cabinet-monitoring-changelog.md](./cabinet-monitoring-changelog.md) — наш модуль мониторинга

**Плейсхолдеры в URL:** `{id}` — `site_id` проекта (в демо: `4150951` = **Agrus.kiev.ua**); `{loc}` — id локации в Local Marketing; `?lang=ru` — язык интерфейса.

---

## 1. Архитектура навигации

Три уровня контекста:

| Уровень | Где в UI | Паттерн URL |
|---------|----------|-------------|
| **Аккаунт** | Верхняя полоса, левая узкая панель (иконки), инструменты без проекта | `admin.dashboard.html`, `research.*.html`, `admin.clustering.html` |
| **Проект (сайт)** | Переключатель домена + боковое меню проекта | `admin.*.site_id-{id}.html` |
| **Вкладка / hash** | SPA внутри модуля | `#/overview`, `#/detailed`, `#/traffic/channels` |

**Боковая панель (иконки, слева):** Проекты · Инструменты анализа · Бэклинки · Аудит · AI-поиск · Контент-маркетинг · Локальный маркетинг · Отчёты · Пакет для агентств · API (футер).

**Верхняя полоса:** Позиции · Аудит сайта (Проекты) · Анализ конкурентов · Анализ ключевых слов · Отчёты · SMM · меню аккаунта (настройки, пользователи, WL, биллинг).

---

## 2. Аккаунт — список проектов и настройки

### 2.1. Rank Tracker (хаб)

| Страница | URL | Назначение |
|----------|-----|------------|
| Список проектов | `admin.dashboard.html?lang=ru` | График метрик по проектам/группам; таблица проектов (ТОП, видимость, дельты); вкладка «Группы»; «Создать проект», экспорт, колонки |
| Мастер проекта | `admin.site.wizard.html` | Создание / настройки проекта (ключи, регионы, ПС) |
| Legacy-редирект позиций | `admin.site.positions.site_id-{id}.html` | Старый путь; в меню дублируется с `rankings` |

**Метрики графика на дашборде:** средняя позиция, прогноз трафика, видимость, % в ТОП-10, AI-присутствие (упоминание/ссылка). Период: неделя … «Все».

### 2.2. Аккаунт — пользователи и биллинг

| Страница | URL |
|----------|-----|
| Настройки аккаунта | `admin.user.settings.html` |
| Пользователи / роли | `admin.users.html` |
| White Label | `admin.user.whitelabel.html#/` |
| Баланс / подписка (шапка) | `admin.user.subscription.html` |
| Биллинг | `admin.subscription.html#/` |
| Выход | `admin.logout.html` |

### 2.3. Отчёты и SMM (аккаунт)

| Страница | URL | Назначение |
|----------|-----|------------|
| Список отчётов | `admin.reports.list.html#/reports` | Report Builder, расписание, WL-отчёты |
| SMM-модуль | `admin.smm.html#/` | Отдельный продукт (календарь, бренды); в демо — заглушка «Add first brand» / внешний planning |

### 2.4. Инструменты анализа (аккаунт, без `site_id`)

Доступны с левой панели «Инструменты анализа» и из перекрёстных ссылок.

| Страница | URL | Назначение |
|----------|-----|------------|
| Анализ ключевых слов — старт | `research.keywords.html/start` | Ввод seed-ключей, регион, язык |
| KW — органика | `research.keywords.html/organic` | Органические идеи |
| KW — реклама | `research.keywords.html/advertising` | PPC-идеи |
| KW — расширение | `research.keywords.html/expand` | Расширение списка |
| KW — подсказки | `research.keywords.html/suggest` | Autocomplete / suggest |
| KW — история SERP | `research.keywords.html/serp-history` | История выдачи |
| KW — корень | `research.keywords.html/` | Общий вход модуля |
| Анализ конкурентов — старт | `research.competitor.html/google-search/start/` | Домен конкурента, регион |
| CR — Google Search | `research.competitor.html/google-search/` | Обзор домена в organic |
| CR — AI Search | `research.competitor.html/ai-search/` | AI-видимость конкурента |
| CR — expand | `research.competitor.html/expand/` | Расширение семантики |
| CR — корень | `research.competitor.html/` | Общий вход (в т.ч. с контекстом домена из виджетов) |
| Кластеризация | `admin.clustering.html` | Загрузка ключей, регион, Soft/Hard, частотность |
| История кластеризаций | `admin.clustering.do-history.html` | Прошлые отчёты кластеризации |
| Проверка индексации | `admin.checkindex.html` | Index Checker |
| Результаты индексации | `admin.checkindex.do-results.html` | Отчёт проверки URL |
| Проверка частотности | `admin.keyvolume.html/` | Search Volume Checker |
| История частотности | `admin.keyvolume.html/history` | Прошлые проверки |
| Autocomplete tool | `admin.search_engine_autocomplete.html#` | Подсказки ПС |

### 2.5. Аудит — список проектов (аккаунт)

| Страница | URL |
|----------|-----|
| Аудит (все проекты / вход) | `admin.audit.site_id-{id}.html#/` при переходе из шапки «Аудит сайта (Проекты)» — контекст последнего или выбранного проекта |

На уровне аккаунта шапка ведёт в модуль аудита; полный список crawl-проектов привязан к `site_id`.

### 2.6. Локальный маркетинг (аккаунт)

| Страница | URL | Назначение |
|----------|-----|------------|
| Все локации | `admin.local_marketing.html?lang=ru#/` | Таблица GBP-локаций: health score, каталоги, рейтинг |
| Обзор локации | `admin.local_marketing.html#/overview?id={loc}&ref=…` | Дашборд одной точки |
| Локальный аудит | `…#/audit?id={loc}` | Health / чеклист |
| Business listings | `…#/business-listings?id={loc}` | Каталоги (NAP) |
| Reputation | `…#/reputation-management?id={loc}` | Отзывы |
| Reputation analytics | `…#/reputation-management/analytics?id={loc}` | Аналитика отзывов |

В демо: локации **Folk Osteria**, **Hotel Der wilde Hirsch** (`id` 18542, 18545).

### 2.7. Контент-маркетинг и бэклинки (аккаунт)

| Модуль | URL (известные) | Примечание |
|--------|-----------------|------------|
| Контент-маркетинг | `admin.content-management.html` | В демо редирект на `admin.dashboard.html` — модуль может быть отключён в demo plan |
| Бэклинки (аккаунт) | `admin.backlinks.html` | Без сессии → login; в demo — вход через проектный «Анализ бэклинков» |
| Agency Pack | Настройки / биллинг / WL | Отдельный add-on; отдельного `admin.agency*.html` в DOM не найдено |

### 2.8. Прочее

| Страница | URL |
|----------|-----|
| Заметки (глобально по проекту) | `admin.site.note.site_id-{id}.html` |
| Отчёт BL (аккаунт) | `admin.backlink.reports.html#/domains/{reportId}` |

---

## 3. Проект — боковое меню (полное дерево)

Меню одинаково на всех project-scoped страницах. Ниже — пункт → URL.

### 3.1. Обзор и позиции

| Пункт меню | URL |
|------------|-----|
| Обзор проекта | `admin.site.overview.site_id-{id}.html` |
| Позиции → Обзор | `admin.site.rankings.site_id-{id}.html#/overview` |
| Позиции → Подробный вид | `…#/detailed` |
| Позиции → Исторические данные | `…#/history` |
| Позиции (legacy) | `admin.site.positions.site_id-{id}.html` |

**Обзор проекта:** виджеты (настраиваемые) — позиции, аудит, GSC, Matomo, AI Search, конкуренты, бэклинки, план продвижения; заметки; период «Последние 2 недели».

**Позиции → Обзор:** KPI (ср. позиция, видимость, TOP), распределение TOP, «улучшились/ухудшились», конкуренты, заметки.

**Подробный вид:** таблица ключей, URL, дельты, колонки по датам съёмов, фильтры, группы ключей.

**История:** матрица ключ × дата (длинный горизонт).

### 3.2. Аналитика и трафик

| Пункт | URL |
|-------|-----|
| Обзор | `admin.analytics.site_id-{id}.html#/` |
| Трафик | `…#/traffic/channels` |
| Сниппеты | `…#/snippets` |
| Google Search Console | `…#/gsc` |
| SEO-потенциал | `…#/seo-potential` |

Требует подключения GSC / Matomo (кнопки на обзоре проекта).

### 3.3. Мои конкуренты

| Пункт | URL |
|-------|-----|
| Добавленные | `admin.site.competitors.site_id-{id}.html` |
| Мониторинг ТОП-100 | `admin.site.competitors.top100.site_id-{id}.html` |
| Доля голоса | `admin.site.competitors.all.site_id-{id}.html#/share-of-voice` |
| Рейтинг видимости | `admin.site.competitors.all.site_id-{id}.html#/` |

### 3.4. Трекер AI-результатов

| Пункт | URL |
|-------|-----|
| Rankings | `admin.llm_rankings.site_id-{id}.html#/rankings` |
| Competitors | `…#/competitors` |
| Источники | `…#/sources` |

### 3.5. Инсайты, бэклинки, план

| Пункт | URL |
|-------|-----|
| Инсайты | `admin.insights.site_id-{id}.html` (подраздел SERP: `…#/serp`) |
| Анализ бэклинков | `admin.backlink_checker_project.site_id-{id}.html#/overview/` |
| BL → список ссылок | `…#/backlinks/` |
| BL → домены | `…#/domains/` |
| План продвижения | `admin.marketing_plan.site_id-{id}.html` |

### 3.6. Аудит сайта (в контексте проекта)

| Пункт | URL |
|-------|-----|
| Обзор | `admin.audit.site_id-{id}.html#/` |
| Отчёт об ошибках | `…#/report` |
| Просканированные страницы | `…#/pages` |
| Найденные ресурсы | `…#/resources` |
| Найденные ссылки | `…#/links` |
| Сравнение отчётов | `…#/compare-crawls` |

### 3.7. Отслеживание изменений

| Пункт | URL |
|-------|-----|
| Web monitoring | `admin.web_monitoring.site_id-{id}.html` |

Отслеживание изменений на страницах сайта (uptime/content).

### 3.8. Мониторинг бэклинков (проект)

| Пункт | URL |
|-------|-----|
| Бэклинки | `admin.backlink.site_id-{id}.html/` |
| Домены | `…/domains` |
| Анкоры | `…/anchors` |
| Страницы | `…/pages` |
| IP / подсети | `…/ips` |
| Disavow | `…/disavow` |

Отдельно от **Анализ бэклинков** (разовый/проектный checker) — это **мониторинг** ссылок во времени.

### 3.9. Настройки проекта

| Пункт | URL |
|-------|-----|
| Настройки проекта | `admin.site.wizard.html` (с контекстом проекта) |

---

## 4. Сводная таблица URL (алфавитный индекс)

Паттерн `site_id-{id}`; для локального маркетинга — hash с `id={loc}`.

```
admin.analytics.site_id-{id}.html#/
admin.analytics.site_id-{id}.html#/gsc
admin.analytics.site_id-{id}.html#/seo-potential
admin.analytics.site_id-{id}.html#/snippets
admin.analytics.site_id-{id}.html#/traffic/channels
admin.audit.site_id-{id}.html#/
admin.audit.site_id-{id}.html#/compare-crawls
admin.audit.site_id-{id}.html#/links
admin.audit.site_id-{id}.html#/pages
admin.audit.site_id-{id}.html#/report
admin.audit.site_id-{id}.html#/resources
admin.backlink.site_id-{id}.html/
admin.backlink.site_id-{id}.html/anchors
admin.backlink.site_id-{id}.html/disavow
admin.backlink.site_id-{id}.html/domains
admin.backlink.site_id-{id}.html/ips
admin.backlink.site_id-{id}.html/pages
admin.backlink_checker_project.site_id-{id}.html#/
admin.backlink_checker_project.site_id-{id}.html#/backlinks/
admin.backlink_checker_project.site_id-{id}.html#/domains/
admin.backlink_checker_project.site_id-{id}.html#/overview/
admin.checkindex.do-results.html
admin.checkindex.html
admin.clustering.do-history.html
admin.clustering.html
admin.dashboard.html
admin.insights.site_id-{id}.html
admin.insights.site_id-{id}.html#/serp
admin.keyvolume.html/
admin.keyvolume.html/history
admin.llm_rankings.site_id-{id}.html#/competitors
admin.llm_rankings.site_id-{id}.html#/rankings
admin.llm_rankings.site_id-{id}.html#/sources
admin.local_marketing.html#/
admin.local_marketing.html#/audit?id={loc}
admin.local_marketing.html#/business-listings?id={loc}
admin.local_marketing.html#/overview?id={loc}
admin.local_marketing.html#/reputation-management/analytics?id={loc}
admin.local_marketing.html#/reputation-management?id={loc}
admin.marketing_plan.site_id-{id}.html
admin.reports.list.html#/reports
admin.search_engine_autocomplete.html#
admin.site.competitors.all.site_id-{id}.html#/
admin.site.competitors.all.site_id-{id}.html#/share-of-voice
admin.site.competitors.site_id-{id}.html
admin.site.competitors.top100.site_id-{id}.html
admin.site.note.site_id-{id}.html
admin.site.overview.site_id-{id}.html
admin.site.positions.site_id-{id}.html
admin.site.rankings.site_id-{id}.html#/detailed
admin.site.rankings.site_id-{id}.html#/history
admin.site.rankings.site_id-{id}.html#/overview
admin.site.wizard.html
admin.smm.html#/
admin.subscription.html#/
admin.user.settings.html
admin.user.subscription.html
admin.user.whitelabel.html#/
admin.users.html
admin.web_monitoring.site_id-{id}.html
research.competitor.html/
research.competitor.html/ai-search/
research.competitor.html/expand/
research.competitor.html/google-search/
research.competitor.html/google-search/start/
research.keywords.html/
research.keywords.html/advertising
research.keywords.html/expand
research.keywords.html/organic
research.keywords.html/serp-history
research.keywords.html/start
research.keywords.html/suggest
```

**Базовый URL:** `https://online.seranking.com/` + путь + `?lang=ru` при необходимости.

---

## 5. Описание модулей (кратко)

Сжатый смысл экранов по результатам обхода демо; детали URL — в §2–4.

| Модуль | Суть для UX / Datagon |
|--------|------------------------|
| **Rank Tracker (дашборд)** | Список всех проектов: мультипроектный график (ср. позиция, видимость, TOP-10, AI), таблица с дельтами и раскрытием регионов; массовые действия и экспорт. Аналог «хаба» `/monitoring-v2`. |
| **Обзор проекта** | Настраиваемые виджеты (позиции, GSC, аудит, конкуренты, AI Search, бэклинки) на одном экране; период и заметки. Не заменяет глубокие таблицы — ведёт в модули. |
| **Позиции (rankings)** | Три уровня: KPI-обзор (`#/overview`), таблица ключей по датам (`#/detailed`), матрица истории (`#/history`). Legacy `positions` редиректит сюда. |
| **Анализ ключевых слов** | Seed → идеи organic/PPC, expand, suggest, SERP history; в демо часть вкладок сбрасывает на `/start` без ввода. |
| **Анализ конкурентов (research)** | Обзор домена в Google Search и AI Search, expand семантики; отдельно от «Мои конкуренты» внутри проекта. |
| **Мои конкуренты (проект)** | Список добавленных доменов, мониторинг TOP-100, рейтинг видимости, share of voice — привязано к `site_id`. |
| **Аналитика / GSC** | Трафик, сниппеты, GSC, SEO-потенциал; без подключения сервисов — экран «подключить Matomo/GSC». |
| **Аудит сайта** | Crawl-отчёт: обзор, ошибки, страницы, ресурсы, ссылки, сравнение краулов. В демо Agrus hash-подразделы часто пустые («Данные отсутствуют»). |
| **Анализ бэклинков (checker)** | Разовый срез профиля ссылок проекта (`backlink_checker_project`). |
| **Мониторинг бэклинков** | Динамика ссылок: домены, анкоры, страницы, IP, disavow; URL path в демо не меняется — табы SPA. |
| **Трекер AI (LLM)** | Позиции/упоминания в AI-выдаче: rankings, competitors, sources; hash-роуты работают стабильно. |
| **Инсайты** | SERP-фичи и возможности по ключам проекта (`#/serp` и др.). |
| **Локальный маркетинг** | GBP-локации: health, каталоги, отзывы, аналитика репутации; отдельные `id` локации в hash. |
| **Web monitoring** | Отслеживание изменений контента/доступности страниц сайта. |
| **План продвижения** | Kanban/задачи SEO по проекту (отдельный модуль в меню). |
| **Отчёты** | Report Builder, расписание, white-label PDF; аккаунтный уровень. |
| **Кластеризация / индекс / частотность** | Загрузка ключей → кластеры; index checker; search volume — без `site_id`. |
| **Контент-маркетинг** | В демо редирект на дашборд (модуль выключен в demo plan). |
| **SMM** | Календарь и бренды; в демо заглушка «Add first brand». |

---

## 6. Демо-проекты (контекст обхода)

Реестр: [seranking-demo-projects.json](./seranking-demo-projects.json). Обход overview + rankings: [seranking-demo-projects-visits.json](./seranking-demo-projects-visits.json) (`scripts/seranking-crawl-all-projects.mjs`).

| Проект | site_id | Группа в демо |
|--------|---------|----------------|
| Agrus.kiev.ua | 4150951 | — (основной для скриншотов) |
| Будинок Іграшок | 6262046 | Магазины |
| MOYO | 6262085 | Магазины |
| Notino | 6262154 | Магазины |
| Vogue | 6262700 | СМИ |
| BCC | 6262727 | СМИ |
| Добробут | 6262802 | Медицина |
| Oxford Medical | 6262826 | Медицина |

**Проход 4 (2026-05-27):** у всех 8 проектов overview открывается с виджетом «AI Search» (кроме Notino — 2 таблицы, без заголовка в снимке). Rankings `#/overview` — 8 таблиц у большинства; Notino overview «пустее» в демо.

Переключатель проекта в шапке — дерево папок; боковое меню повторяется для каждого `site_id`. Имена ↔ id сопоставлены по порядку в сайдбаре дашборда; при сомнении кликнуть строку и сверить домен в URL.

---

## 7. Результаты обхода (2026-05-27) — 5 проходов

| # | Скрипт | Записей |
|---|--------|---------|
| 1 | `scripts/seranking-crawl-pages.mjs` | 77 URL |
| 2 | `scripts/seranking-crawl-ui-pass.mjs` | 26 кликов по меню |
| 3 | `scripts/seranking-crawl-hash-pass.mjs` | 22 hash/path |
| 4 | `scripts/seranking-crawl-all-projects.mjs` | 16 (8× overview + rankings) |
| 5 | Браузер (ручная) | аудит Agrus: обзор с кнопками; подвиджеты «Данные отсутствуют» |

| Итог | Примеры |
|------|---------|
| **ok** | дашборд, позиции, local, research, insights, competitors, LLM `#/competitors` / `#/sources` |
| **redirect** | `positions` → `rankings#/detailed`; KW organic → `/start`; content → dashboard |
| **403** | биллинг в демо |
| **SPA без смены URL** | аудит (hash сбрасывается на `#/`); BL monitor (path `/domains` → `/`) |
| **404** | `admin.backlinks.html` |

Журналы: [seranking-pages-visited.md](./seranking-pages-visited.md), JSON: `seranking-pages-visited.json`, `-ui.json`, `-hash.json`, `seranking-demo-projects-visits.json`.

---

## 8. Как обновлять этот документ

1. Войти: https://online.seranking.com/login.demo.html?lang=ru  
2. На любой странице продукта в консоли собрать ссылки:
   ```javascript
   [...new Set([...document.querySelectorAll('a[href*="online.seranking"]')]
     .map(a => a.href.replace(/site_id-\d+/, 'site_id-{id}')))]
     .sort()
   ```
3. Для нового модуля: открыть иконку в левой панели, зафиксировать финальный URL и пункты hash-роутинга.
4. Сверить с [help.seranking.com](https://help.seranking.com/) при расхождении имён.

---

## 9. Соответствие модулям Datagon (ориентир)

| SE Ranking | Ближайший аналог Datagon (кабинет) |
|------------|-------------------------------------|
| `admin.dashboard` + rankings | `/monitoring`, `/monitoring-v2` |
| `admin.audit` | Аудит / тех. SEO (если есть) |
| `admin.backlink` | Отслеживание ссылок / бэклинки |
| `research.keywords` / competitor | Генератор слов, анализ конкурентов (частично) |
| `admin.reports` | PDF/отчёты (см. cabinet-pdf-report-template) |
| Local / Content / SMM | Отдельные продукты; в Datagon не 1:1 |

Детальный UX-разбор только мониторинга — в [cabinet-monitoring-benchmark-seranking.md](./cabinet-monitoring-benchmark-seranking.md).

# Topvisor — карта страниц продукта (topvisor.com)

**Дата:** 2026-05-27  
**Источник:** обход аккаунта + DOM (Playwright).  
**Вход:** https://topvisor.com/ru/#vpn=1&view-dialog_auth=auth — учётные данные **только локально** (`TOPVISOR_EMAIL` / `TOPVISOR_PASSWORD`, см. `scripts/topvisor-crawl.local.env.example`).  
**Не путать:** лендинги `/ru/rank-tracker/` и т.п. — маркетинг; рабочий UI — `/projects/`, `/project/…`, `/ru/toolbox/…`.

**Связанные документы Datagon:**

- [topvisor-pages-visited.md](./topvisor-pages-visited.md) — журнал обхода · [topvisor-pages-visited.json](./topvisor-pages-visited.json)
- [topvisor-account-projects.json](./topvisor-account-projects.json) — проекты аккаунта (авто при крауле)
- [cabinet-monitoring-benchmark-topvisor.md](./cabinet-monitoring-benchmark-topvisor.md) — бенчмарк «Проекты / позиции» → `/monitoring-v2`
- [cabinet-monitoring-benchmark-seranking.md](./cabinet-monitoring-benchmark-seranking.md) — первый бенчмарк (SE Ranking)

**Плейсхолдер:** `{id}` — числовой id проекта (в обходе: `5374998` = **mail.ru**).

---

## 1. Архитектура навигации

| Уровень | Где в UI | Паттерн URL |
|---------|----------|-------------|
| **Аккаунт** | Шапка: «Проекты», баланс ₽, настройки | `/projects/`, `/account/`, `/account/bank/` |
| **Тулбокс** | Отдельные SEO-инструменты без проекта | `/ru/toolbox/…`, `/ru/clustering/`, `/tpvsr/` |
| **Проект** | Боковое меню после выбора сайта | `/project/{module}/{id}/` |
| **Hash / query** | Фильтры (даты, регионы) на «Проверке позиций» | `#templateDateRange=…` на `project/dynamics/{id}/` |

**Боковое меню проекта (типовое):**

1. Поисковые запросы — `project/keywords/{id}/`
2. Проверка позиций — `project/dynamics/{id}/`
3. Снимки выдачи — `project/snapshots/{id}/`
4. Мои конкуренты — `project/competitors/{id}/`
5. AI-трекер — `project/ai-tracker/{id}/`
6. Аналитика — `project/analytics/{id}/`
7. Яндекс.Директ — `project/broker/{id}/direct/`
8. Анализ сайта — `project/audit/{id}/audit/`
9. Индексация — `project/audit/{id}/indexing/`
10. Радар — `project/audit/{id}/watcher/`
11. Карта сайта — `project/audit/{id}/sitemap/`
12. Настройки — `project/settings/{id}/`

---

## 2. Аккаунт — список проектов

| Страница | URL | Назначение |
|----------|-----|------------|
| Список проектов | `/projects/` | Таблица: домен, «Проверить позиции», запросы, ср. позиция, динамика, TOP 10 / 11–30 / 30+; папки; «Создать проект» |
| Архив | `/support/projects/archive` | Архивные проекты |
| Настройки аккаунта | `/account/` | Профиль, уведомления, интеграции |
| Баланс | `/account/bank/` | Денежные средства, тарифы |
| Групповые действия | `/account/multi_action/` | Массовые операции |
| Статистика аккаунта | `/account/stats_account/` | Расход / использование |

**Метрики на `/projects/` (колонки):** запросы, средняя позиция, динамика, разбивка TOP. Клик по проекту → модули с `{id}`.

---

## 3. Проект — модули

| Пункт меню | URL | Назначение |
|------------|-----|------------|
| Поисковые запросы | `project/keywords/{id}/` | Семантическое ядро: список ключей, частота, группы, теги |
| Проверка позиций | `project/dynamics/{id}/` | Таблица позиций по датам; фильтр периода; регионы (Яндекс/Google); видимость / TOP |
| Снимки выдачи | `project/snapshots/{id}/` | Сбор и анализ ТОП выдачи |
| Мои конкуренты | `project/competitors/{id}/` | Конкуренты в контексте проекта |
| AI-трекер | `project/ai-tracker/{id}/` | Упоминания в нейросетях |
| Аналитика | `project/analytics/{id}/` | Сводная аналитика проекта |
| Яндекс.Директ | `project/broker/{id}/direct/` | Бид-менеджер / кампании |
| Аудит | `project/audit/{id}/audit/` | Технический анализ (80+ сигналов) |
| Индексация | `project/audit/{id}/indexing/` | Проверка индексации страниц |
| Радар | `project/audit/{id}/watcher/` | Мониторинг изменений на страницах |
| Карта сайта | `project/audit/{id}/sitemap/` | Генерация / карта сайта |
| Настройки | `project/settings/{id}/` | Регионы, расписание проверок, интеграции; якорь `#to_project_interval_positions` — интервал позиций |

**Проверка позиций:** основной экран для бенчмарка мониторинга — hash с датами (`date1`, `date2`, `typeRange`), переключатели «Видимость / Средняя / Топ100», выбор региона.

---

## 4. Тулбокс и инструменты без проекта

| Инструмент | URL (рабочий) | Примечание |
|------------|---------------|------------|
| Хаб тулбокса | `/ru/toolbox/` | Ссылки на под-инструменты |
| Частотность | `/ru/toolbox/volume/` | Проверка частоты |
| Подбор слов | `/ru/toolbox/keyword-research/` | Keyword research (тулбокс) |
| Дубликаты | `/ru/toolbox/duplicates/` | Поиск дублей |
| Релевантность | `/ru/toolbox/relevance/` | Анализ релевантности |
| Задачи | `/ru/toolbox/tasks/` | Список задач |
| Кластеризация | `/ru/clustering/` | Кластеризация по ТОП-10 |
| Подбор слов (лендинг) | `/ru/keyword-research/` | Маркетинг + тот же продукт |
| Анализ конкурентов | `/ru/competitor-research/` | Домен конкурента |
| Подсказки | `/ru/keyword-suggestions/` | Autocomplete |
| Семантическое ядро | `/ru/semantic-core/` | Сбор СЯ (ссылается на toolbox volume) |
| Сокращатель ссылок | `/tpvsr/` | Короткие ссылки + QR |
| Апометр | `/ru/updates/` | Апдейты ПС |
| Бид-менеджер | `/ru/bid-manager/` | Я.Директ |

**404 без `/ru/toolbox/`:** `/volume/`, `/indexed/`, `/magnet/`, `/sitemap/` (корень) — использовать тулбокс или справку `/ru/support/…`.

---

## 5. Описание модулей (кратко)

| Модуль | Суть для UX / Datagon |
|--------|------------------------|
| **Список проектов** | Один экран = все сайты + KPI по позициям; аналог хаба мониторинга. |
| **Поисковые запросы** | Управление ядром (не путать с таблицей позиций). |
| **Проверка позиций** | Главная таблица rank tracker: ключ × даты, регионы, TOP/видимость. |
| **Снимки** | SERP snapshot / анализ ТОПа. |
| **Мои конкуренты** | Конкуренты в привязке к проекту. |
| **AI-трекер** | LLM-упоминания (параллель SE Ranking LLM). |
| **Аудит / Индексация / Радар / Карта** | ТехSEO-пакет внутри проекта. |
| **Тулбокс** | Разовые инструменты без привязки к проекту. |

---

## 6. Проекты аккаунта (обход)

См. [topvisor-account-projects.json](./topvisor-account-projects.json).

| Проект | id | Примечание |
|--------|-----|------------|
| mail.ru (Ваши проекты) | `5374998` | Единственный проект в аккаунте на 2026-05-27; 1 ключ в «Проверке позиций» |

---

## 7. Результаты обхода (2026-05-27)

| Итог | Кол-во | Примеры |
|------|--------|---------|
| **ok** | 38 | `/projects/`, все `project/*/{id}/`, тулбокс, лендинги инструментов |
| **404** | 4 | `/volume/`, `/indexed/`, `/magnet/`, `/sitemap/` (корень — использовать `/ru/toolbox/…`) |

Журнал: [topvisor-pages-visited.md](./topvisor-pages-visited.md) · JSON: [topvisor-pages-visited.json](./topvisor-pages-visited.json).

Запуск:

```bash
export PLAYWRIGHT_BROWSERS_PATH="$PWD/.playwright-browsers"
export TOPVISOR_EMAIL='…' TOPVISOR_PASSWORD='…'
node scripts/topvisor-crawl-pages.mjs
```

---

## 8. Соответствие модулям Datagon

| Topvisor | Ближайший аналог Datagon |
|----------|---------------------------|
| `/projects/` + `project/dynamics/{id}/` | `/monitoring`, `/monitoring-v2` |
| `project/keywords/{id}/` | Семантика / ключи проекта |
| `project/snapshots/{id}/` | Снимки / SERP (если будет) |
| `project/competitors/{id}/` | Анализ конкурентов (частично) |
| `project/audit/…` | Тех. аудит, индексация |
| `ru/toolbox/*` | Отдельные утилиты (генератор слов, частотность) |

Детальный UX мониторинга — [cabinet-monitoring-benchmark-topvisor.md](./cabinet-monitoring-benchmark-topvisor.md).

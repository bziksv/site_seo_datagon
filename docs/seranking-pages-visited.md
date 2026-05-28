# SE Ranking — журнал посещения страниц (демо)

**Дата:** 2026-05-27  
**Вход:** https://online.seranking.com/login.demo.html?lang=ru  
**Проект:** site_id-4150951 (Agrus.kiev.ua), локация local id=18545  

## Сводка проходов

| Проход | Скрипт | Записей | Что проверял |
|--------|--------|---------|--------------|
| 1 | `seranking-crawl-pages.mjs` | **77** | Прямой заход на каждый URL из чек-листа |
| 2 | `seranking-crawl-ui-pass.mjs` | **26** | Клики по меню проекта (аудит, BL, analytics, rankings) |
| 3 | `seranking-crawl-hash-pass.mjs` | **22** | Hash/path + 3.5 с ожидания SPA |
| 4 | `seranking-crawl-all-projects.mjs` | **16** | 8 демо-проектов: `overview` + `rankings#/overview` на каждый `site_id` |
| 5 | Браузер (ручная) | — | Аудит Agrus: обзор с кнопками «Посмотреть все проблемы»; часть виджетов «Данные отсутствуют» |

**Итого уникальных URL в чек-листе:** 77. Доп. JSON: [seranking-pages-visited-ui.json](./seranking-pages-visited-ui.json), [seranking-pages-visited-hash.json](./seranking-pages-visited-hash.json), [seranking-demo-projects-visits.json](./seranking-demo-projects-visits.json) (проекты: [seranking-demo-projects.json](./seranking-demo-projects.json)).

### Важные выводы

- **Аудит** (`#/report`, `#/pages`…): при прямом hash и клике по меню URL остаётся `#/` — в демо для Agrus на подразделах часто **«Данные отсутствуют»** (нет свежего crawl).
- **Мониторинг BL** (`/domains`, `/anchors`…): path в адресе **не меняется** — одна SPA-страница, табы клиентские (bodyLen одинаковый).
- **Работают hash-переходы:** LLM `#/competitors`, `#/sources`; insights `#/serp`; analytics `#/snippets`, `#/seo-potential`; competitors `#/share-of-voice`; rankings `#/detailed`, `#/history`.
- **Биллинг:** 403 Forbidden в демо.
- **Контент-маркетинг:** редирект на дашборд.

---

## Проход 1 — прямой URL (77)

| # | Модуль | Запрошенный URL | Статус | Финальный URL | Заголовок / экран |
|---|--------|-----------------|--------|---------------|-------------------|
| 1 | account | `admin.dashboard.html?lang=ru` | ok | `admin.dashboard.html?lang=ru` | Проекты |
| 2 | account | `admin.user.settings.html?lang=ru` | ok | `admin.user.settings.html?lang=ru` | SE Ranking |
| 3 | account | `admin.users.html?lang=ru` | ok | `admin.users.html?lang=ru` | SE Ranking |
| 4 | account | `admin.user.whitelabel.html?lang=ru#/` | ok | `admin.user.whitelabel.html?lang=ru#/` | SE Ranking |
| 5 | account | `admin.user.subscription.html?lang=ru` | redirect | `admin.subscription.html` | SE Ranking |
| 6 | account | `admin.subscription.html?lang=ru#/` | ok | `admin.subscription.html?lang=ru#/` | SE Ranking |
| 7 | account | `admin.reports.list.html?lang=ru#/reports` | ok | `admin.reports.list.html?lang=ru#/reports` | SE Ranking |
| 8 | account | `admin.smm.html?lang=ru#/` | ok | `admin.smm.html?lang=ru#/` | SE Ranking |
| 9 | tools | `admin.clustering.html?lang=ru` | ok | `admin.clustering.html?lang=ru` | SE Ranking |
| 10 | tools | `admin.clustering.do-history.html?lang=ru` | ok | `admin.clustering.do-history.html?lang=ru` | SE Ranking |
| 11 | tools | `admin.checkindex.html?lang=ru` | ok | `admin.checkindex.html?lang=ru` | SE Ranking |
| 12 | tools | `admin.checkindex.do-results.html?lang=ru` | ok | `admin.checkindex.do-results.html?lang=ru` | История (последние 100): |
| 13 | tools | `admin.keyvolume.html/?lang=ru` | ok | `admin.keyvolume.html/?lang=ru` | SE Ranking |
| 14 | tools | `admin.keyvolume.html/history?lang=ru` | ok | `admin.keyvolume.html/history?lang=ru` | SE Ranking |
| 15 | tools | `admin.search_engine_autocomplete.html?lang=ru` | ok | `admin.search_engine_autocomplete.html?lang=ru#/start` | Сбор поисковых подсказок |
| 16 | tools | `research.keywords.html/start?lang=ru` | ok | `research.keywords.html/start?lang=ru` | Анализ ключевых слов |
| 17 | tools | `research.keywords.html/?lang=ru` | ok | `research.keywords.html/start` | Анализ ключевых слов |
| 18 | tools | `research.keywords.html/organic?lang=ru` | redirect | `research.keywords.html/start` | Анализ ключевых слов |
| 19 | tools | `research.keywords.html/advertising?lang=ru` | redirect | `research.keywords.html/start` | Анализ ключевых слов |
| 20 | tools | `research.keywords.html/expand?lang=ru` | ok | `research.keywords.html/expand?lang=ru` | Анализ ключевых слов |
| 21 | tools | `research.keywords.html/suggest?lang=ru` | redirect | `research.keywords.html/start` | Анализ ключевых слов |
| 22 | tools | `research.keywords.html/serp-history?lang=ru` | redirect | `research.keywords.html/start` | Анализ ключевых слов |
| 23 | tools | `research.competitor.html/google-search/start/?lang=ru` | ok | `research.competitor.html/google-search/start/?lang=ru&month=2026-5` | Анализ конкурентов |
| 24 | tools | `research.competitor.html/google-search/?lang=ru` | ok | `research.competitor.html/google-search/start/?month=2026-5` | Анализ конкурентов |
| 25 | tools | `research.competitor.html/ai-search/?lang=ru` | ok | `research.competitor.html/ai-search/start/` | Анализ конкурентов |
| 26 | tools | `research.competitor.html/expand/?lang=ru` | ok | `research.competitor.html/expand/?lang=ru&month=2026-5` | Расширение базы |
| 27 | tools | `research.competitor.html/?lang=ru` | ok | `research.competitor.html/google-search/start/?month=2026-5` | Анализ конкурентов |
| 28 | account | `admin.content-management.html?lang=ru` | redirect | `admin.dashboard.html` | Проекты |
| 29 | local | `admin.local_marketing.html?lang=ru#/` | ok | `admin.local_marketing.html?lang=ru#/?id=18545&ref=` | Все локации |
| 30 | local | `admin.local_marketing.html?lang=ru#/overview?id=18545` | ok | `admin.local_marketing.html?lang=ru#/overview?id=18545` | Обзор |
| 31 | local | `admin.local_marketing.html?lang=ru#/audit?id=18545` | ok | `admin.local_marketing.html?lang=ru#/audit?id=18545` | Аудит локального продвижения |
| 32 | local | `admin.local_marketing.html?lang=ru#/business-listings?id=18545` | ok | `admin.local_marketing.html?lang=ru#/business-listings?id=18545` | Бизнес-каталоги |
| 33 | local | `admin.local_marketing.html?lang=ru#/reputation-management?id=18545` | ok | `admin.local_marketing.html?lang=ru#/reputation-management?id=18545` | Список отзывов |
| 34 | local | `admin.local_marketing.html?lang=ru#/reputation-management/analytics?id=18545` | ok | `admin.local_marketing.html?lang=ru#/reputation-management/analytics?id` | Аналитика |
| 35 | project | `admin.site.overview.site_id-4150951.html?lang=ru` | ok | `admin.site.overview.site_id-4150951.html?lang=ru#/` | SE Ranking |
| 36 | project | `admin.site.note.site_id-4150951.html?lang=ru` | ok | `admin.site.note.site_id-4150951.html?lang=ru&params[page]=1&params[pag` | SE Ranking |
| 37 | project | `admin.site.positions.site_id-4150951.html?lang=ru` | redirect | `admin.site.rankings.site_id-4150951.html#/detailed` | SE Ranking |
| 38 | project | `admin.site.rankings.site_id-4150951.html?lang=ru#/overview` | ok | `admin.site.rankings.site_id-4150951.html?lang=ru#/overview?lang=ru` | SE Ranking |
| 39 | project | `admin.site.rankings.site_id-4150951.html?lang=ru#/detailed` | ok | `admin.site.rankings.site_id-4150951.html?lang=ru#/detailed?lang=ru` | SE Ranking |
| 40 | project | `admin.site.rankings.site_id-4150951.html?lang=ru#/history` | ok | `admin.site.rankings.site_id-4150951.html?lang=ru#/history?lang=ru` | Варианты отображения данных |
| 41 | project | `admin.analytics.site_id-4150951.html?lang=ru#/` | ok | `admin.analytics.site_id-4150951.html#/start` | Сервисы статистики и аналитики |
| 42 | project | `admin.analytics.site_id-4150951.html?lang=ru#/traffic/channels` | ok | `admin.analytics.site_id-4150951.html#/start` | Сервисы статистики и аналитики |
| 43 | project | `admin.analytics.site_id-4150951.html?lang=ru#/snippets` | ok | `admin.analytics.site_id-4150951.html#/snippets?engine=1900819&keyword_` | Сниппеты |
| 44 | project | `admin.analytics.site_id-4150951.html?lang=ru#/gsc` | ok | `admin.analytics.site_id-4150951.html?lang=ru#/gsc` | SE Ranking |
| 45 | project | `admin.analytics.site_id-4150951.html?lang=ru#/seo-potential` | ok | `admin.analytics.site_id-4150951.html#/seo-potential` | SEO-потенциал |
| 46 | project | `admin.site.competitors.site_id-4150951.html?lang=ru` | ok | `admin.site.competitors.site_id-4150951.html?lang=ru` | SE Ranking |
| 47 | project | `admin.site.competitors.top100.site_id-4150951.html?lang=ru` | ok | `admin.site.competitors.top100.site_id-4150951.html?lang=ru&url_mode=0&` | SE Ranking |
| 48 | project | `admin.site.competitors.all.site_id-4150951.html?lang=ru#/` | ok | `admin.site.competitors.all.site_id-4150951.html?lang=ru#/?date=2026-05` | SE Ranking |
| 49 | project | `admin.site.competitors.all.site_id-4150951.html?lang=ru#/share-of-voice` | ok | `admin.site.competitors.all.site_id-4150951.html?lang=ru#/share-of-voic` | SE Ranking |
| 50 | project | `admin.llm_rankings.site_id-4150951.html?lang=ru#/rankings` | ok | `admin.llm_rankings.site_id-4150951.html?lang=ru#/rankings` | SE Ranking |
| 51 | project | `admin.llm_rankings.site_id-4150951.html?lang=ru#/competitors` | ok | `admin.llm_rankings.site_id-4150951.html?lang=ru#/competitors` | SE Ranking |
| 52 | project | `admin.llm_rankings.site_id-4150951.html?lang=ru#/sources` | ok | `admin.llm_rankings.site_id-4150951.html?lang=ru#/sources` | SE Ranking |
| 53 | project | `admin.insights.site_id-4150951.html?lang=ru` | ok | `admin.insights.site_id-4150951.html#/` | SE Ranking |
| 54 | project | `admin.insights.site_id-4150951.html?lang=ru#/serp` | ok | `admin.insights.site_id-4150951.html#/serp` | SE Ranking |
| 55 | project | `admin.backlink_checker_project.site_id-4150951.html?lang=ru#/overview/` | ok | `admin.backlink_checker_project.site_id-4150951.html?lang=ru#/overview/` | SE Ranking |
| 56 | project | `admin.backlink_checker_project.site_id-4150951.html?lang=ru#/backlinks/` | ok | `admin.backlink_checker_project.site_id-4150951.html?lang=ru#/backlinks` | SE Ranking |
| 57 | project | `admin.backlink_checker_project.site_id-4150951.html?lang=ru#/domains/` | ok | `admin.backlink_checker_project.site_id-4150951.html?lang=ru#/domains/` | SE Ranking |
| 58 | project | `admin.marketing_plan.site_id-4150951.html?lang=ru` | ok | `admin.marketing_plan.site_id-4150951.html?lang=ru#/` | План продвижения сайта |
| 59 | project | `admin.audit.site_id-4150951.html?lang=ru#/` | ok | `admin.audit.site_id-4150951.html?lang=ru#/` | SE Ranking |
| 60 | project | `admin.audit.site_id-4150951.html?lang=ru#/report` | ok | `admin.audit.site_id-4150951.html?lang=ru#/` | SE Ranking |
| 61 | project | `admin.audit.site_id-4150951.html?lang=ru#/pages` | ok | `admin.audit.site_id-4150951.html?lang=ru#/` | SE Ranking |
| 62 | project | `admin.audit.site_id-4150951.html?lang=ru#/resources` | ok | `admin.audit.site_id-4150951.html?lang=ru#/` | SE Ranking |
| 63 | project | `admin.audit.site_id-4150951.html?lang=ru#/links` | ok | `admin.audit.site_id-4150951.html?lang=ru#/` | SE Ranking |
| 64 | project | `admin.audit.site_id-4150951.html?lang=ru#/compare-crawls` | ok | `admin.audit.site_id-4150951.html?lang=ru#/` | SE Ranking |
| 65 | project | `admin.web_monitoring.site_id-4150951.html?lang=ru` | redirect | `admin.web_monitoring.settings.do-preview.site_id-4150951.html` | SE Ranking |
| 66 | project | `admin.backlink.site_id-4150951.html/?lang=ru` | ok | `admin.backlink.site_id-4150951.html/` | SE Ranking |
| 67 | project | `admin.backlink.site_id-4150951.html/domains?lang=ru` | redirect | `admin.backlink.site_id-4150951.html/` | SE Ranking |
| 68 | project | `admin.backlink.site_id-4150951.html/anchors?lang=ru` | redirect | `admin.backlink.site_id-4150951.html/` | SE Ranking |
| 69 | project | `admin.backlink.site_id-4150951.html/pages?lang=ru` | redirect | `admin.backlink.site_id-4150951.html/` | SE Ranking |
| 70 | project | `admin.backlink.site_id-4150951.html/ips?lang=ru` | redirect | `admin.backlink.site_id-4150951.html/` | SE Ranking |
| 71 | project | `admin.backlink.site_id-4150951.html/disavow?lang=ru` | redirect | `admin.backlink.site_id-4150951.html/` | SE Ranking |
| 72 | project | `admin.site.wizard.html?lang=ru` | ok | `admin.site.wizard.html?lang=ru` | SE Ranking |
| 73 | project | `admin.web_monitoring.settings.do-preview.site_id-4150951.html?lang=ru` | ok | `admin.web_monitoring.settings.do-preview.site_id-4150951.html?lang=ru` | SE Ranking |
| 74 | tools | `research.competitor.html/ai-search/start/?lang=ru` | ok | `research.competitor.html/ai-search/start/?lang=ru` | Анализ конкурентов |
| 75 | tools | `research.competitor.html/organic/keywords/?lang=ru` | redirect | `research.competitor.html/google-search/start/?month=2026-5` | Анализ конкурентов |
| 76 | account | `admin.backlinks.html?lang=ru` | 404 | `admin.backlink.site_id-0.html` | SE Ranking |
| 77 | project | `admin.analytics.site_id-4150951.html?lang=ru#/start` | ok | `admin.analytics.site_id-4150951.html?lang=ru#/start` | Сервисы статистики и аналитики |

---

Сгенерировано: `node scripts/seranking-crawl-pages.mjs`

## UI-pass (клики по меню и вкладкам SPA)

**Дата:** 2026-05-27 · **Записей:** 26 · Скрипт: `node scripts/seranking-crawl-ui-pass.mjs`

| Pass | Действие | Запрошено | Hash | Экран (h1–h3) |
|---|---|---|---|---|
| audit-menu | menu: Обзор | `admin.audit.site_id-4150951.html#/` | `#/` | SE Ranking |
| audit-menu | menu: Отчет об ошибках | `admin.audit.site_id-4150951.html#/report` | `#/` | SE Ranking |
| audit-menu | menu: Просканированные страницы | `admin.audit.site_id-4150951.html#/pages` | `#/` | SE Ranking |
| audit-menu | menu: Найденные ресурсы | `admin.audit.site_id-4150951.html#/resources` | `#/` | SE Ranking |
| audit-menu | menu: Найденные ссылки | `admin.audit.site_id-4150951.html#/links` | `#/` | SE Ranking |
| audit-menu | menu: Сравнение отчетов | `admin.audit.site_id-4150951.html#/compare-crawls` | `#/` | SE Ranking |
| backlink-tabs | tab: Бэклинки | `admin.backlink.site_id-4150951.html/` | `` | SE Ranking |
| backlink-tabs | tab: Домены | `admin.backlink.site_id-4150951.html/domains` | `` | SE Ranking |
| backlink-tabs | tab: Анкоры | `admin.backlink.site_id-4150951.html/anchors` | `` | SE Ranking |
| backlink-tabs | tab: Страницы | `admin.backlink.site_id-4150951.html/pages` | `` | SE Ranking |
| backlink-tabs | tab: IP-адреса | `admin.backlink.site_id-4150951.html/ips` | `` | SE Ranking |
| backlink-tabs | tab: Disavow | `admin.backlink.site_id-4150951.html/disavow` | `` | SE Ranking |
| analytics-menu | menu: Трафик | `admin.analytics.site_id-4150951.html#/traffic/channels` | `#/start` | Сервисы статистики и аналитики |
| analytics-menu | menu: Сниппеты | `admin.analytics.site_id-4150951.html#/snippets` | `#/snippets?engine=1900819&keyword_se_id=291042817` | Сниппеты |
| analytics-menu | menu: Данные Google Search Console | `admin.analytics.site_id-4150951.html#/gsc` | `#/gsc?engine=1900819` | SE Ranking |
| analytics-menu | menu: SEO-потенциал | `admin.analytics.site_id-4150951.html#/seo-potential` | `#/seo-potential` | SEO-потенциал |
| rankings-menu | menu: Обзор | `admin.site.rankings.site_id-4150951.html#/overview` | `#/overview` | SE Ranking |
| rankings-menu | menu: Подробный вид | `admin.site.rankings.site_id-4150951.html#/detailed` | `#/detailed?` | Google Ukraine Киев, город Киев, Украина |
| rankings-menu | menu: Исторические данные | `admin.site.rankings.site_id-4150951.html#/history` | `#/history?columns_group_mode=day&page=1` | Google Ukraine Киев, город Киев, Украина / Варианты отображения данных |
| llm-menu | menu: Rankings | `admin.llm_rankings.site_id-4150951.html#/rankings` | `#/rankings` | SE Ranking |
| llm-menu | menu: Competitors | `admin.llm_rankings.site_id-4150951.html#/competitors` | `#/rankings` | SE Ranking |
| llm-menu | menu: Источники | `admin.llm_rankings.site_id-4150951.html#/sources` | `#/rankings` | SE Ranking |
| insights-menu | menu: SERP | `admin.insights.site_id-4150951.html#/serp` | `#/` | SE Ranking |
| bl-checker | tab: overview | `admin.backlink_checker_project.site_id-4150951.html#/overview/` | `#/overview/` | SE Ranking |
| bl-checker | tab: backlinks | `admin.backlink_checker_project.site_id-4150951.html#/backlinks/` | `#/overview/` | SE Ranking |
| bl-checker | tab: domains | `admin.backlink_checker_project.site_id-4150951.html#/domains/` | `#/overview/` | SE Ranking |

## Hash-pass (прямой URL + 5 с ожидания)

**Записей:** 22 · `node scripts/seranking-crawl-hash-pass.mjs`

| Pass | URL | Статус | Hash | Заголовки | Таблиц |
|---|---|---|---|---|---|
| audit-hash | `admin.audit.site_id-4150951.html?lang=ru#/` | ok | `#/` | — | 0 |
| audit-hash | `admin.audit.site_id-4150951.html?lang=ru#/report` | hash-stuck | `#/` (запрос `#/report`) | — | 0 |
| audit-hash | `admin.audit.site_id-4150951.html?lang=ru#/pages` | ok | `#/` | — | 0 |
| audit-hash | `admin.audit.site_id-4150951.html?lang=ru#/resources` | ok | `#/` | — | 0 |
| audit-hash | `admin.audit.site_id-4150951.html?lang=ru#/links` | ok | `#/` | — | 0 |
| audit-hash | `admin.audit.site_id-4150951.html?lang=ru#/compare-crawls` | ok | `#/` | — | 0 |
| backlink-path | `admin.backlink.site_id-4150951.html/?lang=ru` | ok | `—` | — | 0 |
| backlink-path | `admin.backlink.site_id-4150951.html/domains?lang=ru` | ok | `—` | — | 0 |
| backlink-path | `admin.backlink.site_id-4150951.html/anchors?lang=ru` | ok | `—` | — | 0 |
| backlink-path | `admin.backlink.site_id-4150951.html/pages?lang=ru` | ok | `—` | — | 0 |
| backlink-path | `admin.backlink.site_id-4150951.html/ips?lang=ru` | ok | `—` | — | 0 |
| backlink-path | `admin.backlink.site_id-4150951.html/disavow?lang=ru` | ok | `—` | — | 0 |
| llm-hash | `admin.llm_rankings.site_id-4150951.html?lang=ru#/competitors` | ok | `#/competitors` | — | 0 |
| llm-hash | `admin.llm_rankings.site_id-4150951.html?lang=ru#/sources` | ok | `#/sources` | — | 0 |
| insights-hash | `admin.insights.site_id-4150951.html?lang=ru#/serp` | ok | `#/serp` | — | 2 |
| insights-hash | `admin.insights.site_id-4150951.html?lang=ru#/` | ok | `#/` | — | 8 |
| competitors | `admin.site.competitors.site_id-4150951.html?lang=ru` | ok | `—` | — | 4 |
| competitors | `admin.site.competitors.top100.site_id-4150951.html?lang=ru` | ok | `—` | — | 2 |
| competitors | `admin.site.competitors.all.site_id-4150951.html?lang=ru#/share-of-voice` | ok | `#/share-of-voice` | — | 5 |
| web-mon | `admin.web_monitoring.settings.do-preview.site_id-4150951.html?lang=ru` | ok | `—` | — | 0 |
| notes | `admin.site.note.site_id-4150951.html?lang=ru` | ok | `—` | — | 1 |
| overview | `admin.site.overview.site_id-4150951.html?lang=ru#/` | ok | `#/` | AI Search | 6 |

---

## Проход 4 — все 8 демо-проектов (overview + rankings)

**Записей:** 16 · `node scripts/seranking-crawl-all-projects.mjs` · JSON: [seranking-demo-projects-visits.json](./seranking-demo-projects-visits.json)

| site_id | Проект | overview (таблиц) | rankings `#/overview` (таблиц) |
|---------|--------|-------------------|--------------------------------|
| 4150951 | Agrus.kiev.ua | 6, AI Search | 8 |
| 6262046 | Будинок Іграшок | 9, AI Search | 8 |
| 6262085 | MOYO | 8, AI Search | 8 |
| 6262154 | Notino | 2, без h1 | 8 |
| 6262700 | Vogue | 4, AI Search | 8 |
| 6262727 | BCC | 7, AI Search | 8 |
| 6262802 | Добробут | 7, AI Search | 8 |
| 6262826 | Oxford Medical | 8, AI Search | 8 |

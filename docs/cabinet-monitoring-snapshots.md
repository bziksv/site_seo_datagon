# Мониторинг позиций — снимки метрик для списка проектов

## Проблема

Классический список `/monitoring` грузил проекты **по одному HTTP-запросу** (`length=1`, `start=0…N`), в каждом — тяжёлый `ProjectData` (все позиции по ключам). На 80+ проектах и удалённой БД это десятки секунд и сотни запросов.

Это не «архитектура», а обход ограничения PHP/таймаута: UI казался живым, пока строки подтягивались по одной.

## Правильная модель (уже частично в БД)

Таблица **`monitoring_data_table_columns_projects`** — снимок колонок списка:

| Поле | Смысл |
|------|--------|
| `words`, `middle`, `top3`…`top100` | агрегаты по позициям |
| `mastered`, `mastered_percent` | освоение бюджета |
| `updated_at` | когда снимок пересчитан |

**Список (v1 и v2)** должен:

1. **Читать** снимок одним (или парой) SQL — join к `monitoring_projects`, без `ProjectData` в HTTP.
2. **Пересчитывать** снимок только когда данные реально изменились:
   - после снятия/импорта позиций по проекту;
   - при смене ключей/бюджета/структуры проекта;
   - догоняющий cron для устаревших (`updated_at` старше N часов).

HTML колонок «Пользователи» и меню действий — лёгкий рендер по проекту (или кэш позже); тяжёлое — только агрегаты позиций.

## Код

| Компонент | Назначение |
|-----------|------------|
| `App\Classes\Monitoring\ProjectData` | расчёт метрик + `save()` в снимок |
| `App\Classes\Monitoring\MonitoringProjectSnapshotService` | `refreshProject`, `refreshMany`, `refreshStale` |
| `MonitoringController::enrichProjectsForList` | подмешивает снимок в ответ API |
| `POST /monitoring-v2/projects/list` | один JSON для карточек v2 (`MonitoringProjectListSerializer`, без Blade в цикле) |
| Cron `data_projects` (Kernel) | ночной пересчёт пачками по 25 проектов |

## План доработок

1. **Слушатель** после записи позиций (`MonitoringPositionInsert` / очередь) → `refreshProjectId($id)` (с debounce по project_id).
2. **Команда** `php artisan monitoring:snapshot-refresh --stale-hours=24` для ручного прогона.
3. **Индикатор в UI** «данные от DD.MM HH:MM» из `monitoring_data_table_columns_projects.updated_at`.
4. Опционально: Redis-кэш готового JSON списка на пользователя с инвалидацией по `user_id` + max(snapshot.updated_at).

## Проверка

```bash
# локально после деплоя сервиса
cd cabinet.datagon.ru
php artisan tinker
>>> app(\App\Classes\Monitoring\MonitoringProjectSnapshotService::class)->refreshStale(48, 10);
```

Открыть http://127.0.0.1:3002/monitoring-v2 — карточки с цифрами ТОП без долгой загрузки.

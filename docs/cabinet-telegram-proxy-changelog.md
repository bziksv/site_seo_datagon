# Changelog: Управление прокси Telegram (админка)

Модуль: `/admin/telegram-proxy` · config `cabinet-telegram-proxy.php` · badge **v1.1.2s**

## 1.1.2s — 2026-05-27

- Колонка **Поставщик** в таблице «Прокси для Telegram» (поле `supplier` в `telegram_proxies`), формы добавления и редактирования.
- **Проверка:** `php7.4 artisan migrate` → http://localhost:3002/admin/telegram-proxy — badge **v1.1.2s**, колонка «Поставщик».

## 1.1.1s — 2026-05-26

- Чек-лист модулей: подсказки при наведении на название (что уходит в Telegram).
- Уточнён реестр в `config/cabinet-telegram.php` (все исходящие sendMessage в коде).
- **Проверка:** http://localhost:3002/admin/telegram-proxy — tooltip на «Модуль».

## 1.1.0s — 2026-05-26

- Прокси в **БД** (`telegram_proxies`), не в `storage/app/telegram-proxies.json` — один список на всех серверах после `migrate`.
- Миграции импортируют старый JSON (если был) и удаляют `storage/app/telegram-proxies.json`.
- **Проверка:** `php7.4 artisan migrate` → http://localhost:3002/admin/telegram-proxy (**v1.1.0s**).

## 1.0.1s — 2026-05-26

- Автозаполнение списка из `config('app.telegram_proxy')` (не `env()` — на prod с `config:cache` иначе пусто).
- Seed при **пустом** `storage/app/telegram-proxies.json`, не только при отсутствии файла.
- **Проверка:** prod → обновить страницу или «Импорт из .env»; badge **v1.0.1s**, строка «Из .env».

## 1.0.0s — 2026-05-26

- Страница **Управление прокси**: проверка `api.telegram.org`, тесты sendMessage, журнал для поддержки, чек-лист модулей с Telegram.
- Список прокси в `storage/app/telegram-proxies.json`: добавление, **редактирование**, удаление, приоритет, импорт из `TELEGRAM_PROXY`.
- Отправка через `TelegramBotService` (Guzzle): direct → прокси по приоритету, failover при сетевых ошибках.
- **Проверка:** http://localhost:3002/admin/telegram-proxy — badge **v1.0.0s**, блок «Прокси для Telegram», «Проверить снова», тестовое сообщение.

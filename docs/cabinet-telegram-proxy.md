# Кабинет — Telegram и прокси

**Админ-страница:** https://cabinet.datagon.ru/admin/telegram-proxy (шестерёнка → «Управление прокси»), badge **v1.0.0s** — [cabinet-telegram-proxy-changelog.md](./cabinet-telegram-proxy-changelog.md).  
**Код:** `TelegramProxyAdminController`, `TelegramBotService`, `config/cabinet-telegram.php`, версия UI: `config/cabinet-telegram-proxy.php`.

## .env на prod (s3)

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_PROXY=socks5h://USER:PASS@HOST:PORT
```

Один и тот же файл `.env` для local и prod (не переключать `http` / пустой — только **socks5h**).

После правки: `php7.4 artisan config:clear && php7.4 artisan config:cache`.

## Несколько прокси (админка)

**Страница:** `/admin/telegram-proxy` → блок «Прокси для Telegram».

- Список в БД: таблица **`telegram_proxies`** (модель `App\TelegramProxy`). После деплоя: `php7.4 artisan migrate`.
- Миграция при наличии старого `storage/app/telegram-proxies.json` импортирует в БД и **удаляет** файл.
- Если таблица пуста — seed из **`config('app.telegram_proxy')`** (`TELEGRAM_PROXY` + `config:cache`).
- Кнопка **«Импорт из .env»** — добавить ещё одну копию URL из `.env`, если её ещё нет в списке.
- **Приоритет** (0–999): выше — раньше в очереди.
- **Проверить снова** — GET `api.telegram.org` по каждому прокси и кэш порядка `sendMessage` на 5 минут.
- Отправка: `direct` (если доступен), затем каждый **включённый** прокси с успешным GET, по приоритету.

Добавить резервный прокси: форма внизу (label + `socks5h://…` + приоритет). **Редактирование** — иконка карандаша в строке (раскрывается форма). Удаление — корзина.

Проверка **только с s3** (с Mac может работать, с VPS — нет, если прокси режет DC-IP):

```bash
nc -vz -w 5 HOST PORT                    # TCP до прокси
curl -sS --max-time 8 -v http://HOST:PORT  # быстрый 407 = прокси отвечает
curl -sS --max-time 15 -x "socks5://USER:PASS@HOST:PORT" -o /dev/null -w "%{http_code}\n" https://api.telegram.org/
```

`000` + 15 s на последней команде при «мёртвом» шаге 1 — см. [cabinet-deploy.md](./cabinet-deploy.md) § Telegram (диагностика по шагам).

Подробнее блокировки 443: [cabinet-deploy.md](./cabinet-deploy.md) § «Telegram: исходящий 443 с VPS».

## Как связаны модули и эта страница

Модули **не «подключаются»** к `/admin/telegram-proxy`. Все исходящие `sendMessage` идут через **`TelegramBotService`** → прокси из БД (`telegram_proxies`). Админка только настраивает список прокси и показывает чек-лист.

## Чек-лист модулей (все через TelegramBotService + прокси)

| Модуль | Страница | Cron / триггер | Класс |
|--------|----------|----------------|-------|
| Профиль | `/profile#telegram` | кнопка теста | `TelegramBot::sendTestNotify` |
| Отслеживание ссылок | `/backlink` | `GET /api/backlink/scan-broken-links` | `User::sendBrokenLinkProjectTelegram` |
| Мониторинг сайтов | `/site-monitoring` | cron доменов | `DomainMonitoring` → `TelegramBot::*Domain*` |
| Срок доменов | `/domain-information` | cron | `DomainInformation` → DNS / регистрация |
| Мета-теги | `/meta-tags` | `MetaTags` cron | `Classes/Cron/MetaTags` |
| Кластеризатор | `/cluster` | по завершению задачи | `Cluster::sendNotification` |
| Лимиты мониторинга | `/monitoring/...` | при исчерпании лимита | `Classes/Monitoring/Limits` |
| Webhook | — | `POST /api/bot` | `TelegramBotController` |

**Не использует Telegram:** мониторинг позиций (Яндекс/Google), HTTP-заголовки, анализ текста и др.

## Тесты на админ-странице

1. **Проверить снова** — ping `api.telegram.org` напрямую и через каждый прокси из списка.
2. **Тестовое сообщение** — в Telegram текущего админа.
3. **Тест: отслеживание ссылок** — сводки по проектам с `broken=1` (бывшая кнопка на `/backlink`).

Под кнопками — **журнал теста (admin)** с копированием (как в анализе конкурентов): `TelegramProxyDebugLog`, после редиректа скопировать текст в багрепорт.

Старый роут `POST /backlink/test-telegram-alerts` перенаправлен на тот же handler.

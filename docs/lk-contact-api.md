# API формы «Задать вопрос» (lk.redbox.su)

Marketing-сайт шлёт заявки через BFF: `POST /api/contact/`.

**По умолчанию (если задан SMTP):** письмо на `info@datagon.ru` и `sv6@list.ru` через nodemailer.

**Запасные каналы:** `POST {LK_API_BASE_URL}/api/public/contact`, затем `CONTACT_WEBHOOK_URL`.

## Endpoint (Laravel)

```
POST /api/public/contact
Content-Type: application/json
```

### Тело запроса

| Поле | Тип | Обязательно | Описание |
|------|-----|-------------|----------|
| `name` | string | да | Имя (≥ 2 символов на фронте) |
| `email` | string | да | E-mail |
| `phone` | string | нет | Телефон |
| `message` | string | да | Текст вопроса (≥ 10 символов на фронте) |
| `source` | string | нет | Источник, сейчас `redbox.su/contact` |

### Ответ

- **200** `{ "ok": true }` — принято
- **422** — ошибки валидации
- **429** — rate limit (рекомендуется по IP)

### Безопасность

- CORS не нужен (запрос только с сервера Next через `proxyToLk`).
- Rate limit + honeypot на lk.
- Письмо на `info@redbox.su` или тикет в CRM — на стороне lk.

## SMTP (основной способ)

В `.env.local` на сервере и локально:

```bash
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=noreply@datagon.ru
# CONTACT_TO=info@datagon.ru,sv6@list.ru  # по умолчанию уже эти два адреса
```

Перезапустите `npm run dev` после сохранения `.env.local`.

## Если SMTP не настроен

1. **`CONTACT_WEBHOOK_URL`** — JSON POST с теми же полями + `form`, `site` (см. `app/api/contact/route.ts`).
2. **Development** — лог в консоль, ответ `{ ok: true, dev: true }` (письмо не уходит).
3. **Production без SMTP/lk/webhook** — **503** и подсказка написать на `info@datagon.ru`.

## Проверка после реализации

```bash
curl -sS -X POST http://localhost:3001/api/contact/ \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"t@example.com","message":"Проверка формы с сайта","agree":true}'
```

Ожидается `{ "ok": true }` без поля `dev`.

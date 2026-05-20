# Интеграция с lk.redbox.su

## Роль Next

Браузер обращается к **`/api/...` на redbox.su**; Next проксирует на Laravel.

## Env (пример)

```env
LK_API_BASE_URL=https://lk.redbox.su
# Секреты только на сервере Next, не NEXT_PUBLIC_
```

## Демо

### Сейчас (без guest API в lk)

- `/demo` — виджет **«Подсчёт длины текста»** (`components/demo/TextLengthTool.tsx`), расчёт в браузере.
- CTA → `lk.redbox.su/register`.

### BFF-прокси (готово к подключению lk)

- Маршрут: `GET|POST /api/lk/{path}` → `LK_API_BASE_URL/{path}`.
- Allowlist: `lib/lk-api.ts` → `ALLOWED_PREFIXES`.
- Env: см. `.env.example`.

### Форма контактов

`POST /api/contact/` (Next) пробует `POST {LK_API_BASE_URL}/api/public/contact` с телом:

```json
{ "name": "", "email": "", "phone": "", "message": "", "source": "redbox.su/contact" }
```

Если lk недоступен — опционально `CONTACT_WEBHOOK_URL` в env. Иначе в dev лог в консоль; в production — 503 и подсказка написать на `info@redbox.su`.

### Когда появится guest API в Laravel

1. Добавить префикс в `ALLOWED_PREFIXES` (например `api/demo/`).
2. Виджет на `/demo` вызывает `fetch('/api/lk/api/demo/...')` вместо локальной логики.
3. Документировать контракт ниже.

| Метод | Путь lk | Назначение |
|-------|---------|------------|
| POST | `api/public/contact` | Форма «Задать вопрос» (ожидается в lk) |
| *(добавить)* | | guest-сессия, лимиты |

## Документировать при изменениях

- путь Laravel-эндпоинта;
- тело запроса / ответ;
- коды ошибок и лимиты демо.

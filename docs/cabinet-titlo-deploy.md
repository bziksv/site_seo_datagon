# Деплой cabinet.titlo.ru (Laravel)

**VPS:** `155.212.171.103` (тот же, что titlo.ru / cabinet.datagon.ru).  
**Путь:** `/var/www/cabinet_titl_usr/data/www/cabinet.titlo.ru`  
**Порт приложения:** **3004** (cabinet.datagon.ru — 3002, titlo.ru — 3003, datagon.ru — 3001).  
**БД:** пока на **`178.250.157.140`** — [cabinet-servers.md](./cabinet-servers.md).

**Git:** [github.com/bziksv/cabinet.titlo](https://github.com/bziksv/cabinet.titlo).  
Legacy: [cabinet.datagon.ru](https://github.com/bziksv/cabinet.datagon.ru).

Маркетинг **titlo.ru** → `LK_API_BASE_URL=https://cabinet.titlo.ru` — [titlo-deploy.md](./titlo-deploy.md).

## Порты на s3

| Домен | PM2 / процесс | Порт |
|-------|---------------|------|
| datagon.ru | `datagon-site` | 3001 |
| cabinet.datagon.ru | `cabinet-datagon` | 3002 |
| titlo.ru | `titlo-site` | 3003 |
| **cabinet.titlo.ru** | **`cabinet-titlo`** | **3004** |

## Первый push (Mac)

```bash
cd /Users/stanislav/Documents/projects/cabinet.datagon.ru
git remote add titlo https://github.com/bziksv/cabinet.titlo.git   # если ещё нет
git push -u titlo main
```

## Первый деплой на сервере

```bash
ssh root@155.212.171.103
cd /var/www/cabinet_titl_usr/data/www/cabinet.titlo.ru

git clone https://github.com/bziksv/cabinet.titlo.git .
cp /var/www/cabinet_data_usr/data/www/cabinet.datagon.ru/.env .env
nano .env
```

Минимум в `.env`:

```env
APP_NAME=Титло
APP_URL=https://cabinet.titlo.ru
DB_HOST=178.250.157.140
HTTP_HEADERS_CLEANUP_ON_REQUEST=false
SKIP_HEAVY_WEB_MIDDLEWARE=false
```

Сборка:

```bash
composer install --no-dev --optimize-autoloader
npm ci && npm run production   # при смене CSS/JS

php artisan config:cache
php artisan route:cache
php artisan view:cache

chown -R cabinet_titl_usr:cabinet_titl_usr storage bootstrap/cache
chmod -R ug+rwx storage bootstrap/cache
```

PM2 (порт **3004**):

```bash
sudo -u cabinet_titl_usr bash -lc '
  cd /var/www/cabinet_titl_usr/data/www/cabinet.titlo.ru
  pm2 delete cabinet-titlo 2>/dev/null || true
  pm2 start php --name cabinet-titlo -- artisan serve --host=127.0.0.1 --port=3004
  pm2 save
'

curl -sI http://127.0.0.1:3004/login | head -5
```

Nginx: [nginx-cabinet-titlo.example.conf](./nginx-cabinet-titlo.example.conf) → upstream **3004**, SSL для `cabinet.titlo.ru`.

Cron (как на cabinet.datagon):

```cron
* * * * * cd /var/www/cabinet_titl_usr/data/www/cabinet.titlo.ru && /opt/php74/bin/php artisan schedule:run >> /dev/null 2>&1
```

## Обновление после `git push`

```bash
cd /var/www/cabinet_titl_usr/data/www/cabinet.titlo.ru
git fetch origin && git checkout main && git reset --hard origin/main
composer install --no-dev --optimize-autoloader
npm ci && npm run production   # если менялся фронт
php artisan config:cache && php artisan route:cache && php artisan view:cache
pm2 restart cabinet-titlo
curl -sI http://127.0.0.1:3004/login | head -3
```

## Локально (Mac)

Кабинет по-прежнему на **:3002** (`./scripts/dev-serve.sh`). В `.env`:

```env
APP_URL=http://localhost:3002
DB_HOST=178.250.157.140
```

Маркетинг titlo (:3003) → `NEXT_PUBLIC_LK_URL=http://localhost:3002`.

## FastPanel

Если сайт отдаётся через **PHP-FPM** панели (без PM2) — см. [cabinet-deploy.md](./cabinet-deploy.md) § FastPanel: PHP **7.4**, document root `public/`, `.env` как выше.

## Cutover (позже)

1. DNS `cabinet.titlo.ru` → `155.212.171.103`, SSL.
2. Проверить login/register с titlo.ru.
3. Остановить `cabinet-datagon`, когда datagon.ru снимут.

Подробнее: [cabinet-deploy.md](./cabinet-deploy.md), [cabinet-servers.md](./cabinet-servers.md).

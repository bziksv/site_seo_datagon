# Кабинет — реестр версий модулей

Правило для агентов: `.cursor/rules/redbox-cabinet-module-version.mdc`.

При изменении UI/JS/поведения страницы модуля — **bump `version`**, строка в **changelog**, **badge** в шапке.

## Реестр

| Модуль | URI | Config | Changelog | Badge |
|--------|-----|--------|-----------|-------|
| Анализ текста | `/text-analyzer` | `cabinet.datagon.ru/config/cabinet-text-analyzer.php` | [cabinet-text-analyzer-changelog.md](./cabinet-text-analyzer-changelog.md) | шапка карточки |
| Анализ конкурентов | `/competitor-analysis` | `config/cabinet-competitor-analysis.php` | [cabinet-competitor-analysis-changelog.md](./cabinet-competitor-analysis-changelog.md) | `competitors/partials/module-nav` |
| Доска идей | `/ideas` | `config/cabinet-ideas.php` | [cabinet-ideas-changelog.md](./cabinet-ideas-changelog.md) | hero / заголовок |
| Служба поддержки | `/support` | `config/cabinet-support.php` | [cabinet-support-changelog.md](./cabinet-support-changelog.md) | `support/layout` |

## Шаблон нового модуля

1. `cabinet.datagon.ru/config/cabinet-<slug>.php`:

```php
<?php
return [
    'version' => '1.0',
];
```

2. `datagon.ru/docs/cabinet-<slug>-changelog.md` — первая запись с датой и URL проверки.

3. Blade (рядом с заголовком модуля):

```blade
<span class="badge text-bg-secondary ms-1 align-middle">v{{ config('cabinet-<slug>.version', '1.0') }}</span>
```

4. Строка в таблице выше.

## Формат changelog

```markdown
## 1.1 — 2026-05-24

- Что изменено (1–3 пункта).
- **Проверка:** http://localhost:3002/…
```

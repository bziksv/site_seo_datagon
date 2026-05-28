#!/usr/bin/env node
/**
 * SE Ranking demo — 2nd pass: UI clicks (SPA tabs, sidebar icons, project menu).
 * Output: docs/seranking-pages-visited-ui.json + appendix in visited md
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://online.seranking.com/';
const LOGIN = `${BASE}login.demo.html?lang=ru`;
const SITE = '4150951';
const WAIT = 2200;

async function dismissCookies(page) {
  for (const label of ['Accept all cookies', 'Принять все', 'Accept']) {
    const btn = page.getByRole('button', { name: label });
    if (await btn.count()) {
      try {
        await btn.first().click({ timeout: 2000 });
        await page.waitForTimeout(500);
      } catch {
        /* ignore */
      }
    }
  }
}

async function snapshot(page, meta) {
  await page.waitForTimeout(WAIT);
  return page.evaluate((m) => {
    const headings = [];
    for (const el of document.querySelectorAll(
      'h1, h2, h3, h4, .card-title, [class*="page-title"], [class*="PageTitle"]'
    )) {
      const t = el.innerText?.trim().replace(/\s+/g, ' ');
      if (t && t.length > 1 && t.length < 100 && !headings.includes(t)) headings.push(t);
      if (headings.length >= 6) break;
    }
    const hash = location.hash || '';
    const tabs = [...document.querySelectorAll('.nav-tabs .active, .tabs .active, [role="tab"][aria-selected="true"]')]
      .map((e) => e.innerText?.trim().replace(/\s+/g, ' '))
      .filter(Boolean)
      .slice(0, 3);
    return {
      ...m,
      title: document.title,
      finalUrl: location.href,
      hash,
      headings,
      activeTabs: tabs,
      is404: /not found/i.test(document.title),
    };
  }, meta);
}

async function clickIfVisible(page, locator, timeout = 4000) {
  try {
    const el = locator.first();
    await el.waitFor({ state: 'visible', timeout });
    await el.click({ timeout });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: 'ru-RU', viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const results = [];

  console.log('Login…');
  await page.goto(LOGIN, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3500);
  await dismissCookies(page);

  // --- Global left sidebar icons (by href fragment) ---
  const sidebarHrefs = [
    ['sidebar-projects', 'admin.dashboard.html'],
    ['sidebar-clustering', 'admin.clustering.html'],
    ['sidebar-backlink', 'admin.backlink'],
    ['sidebar-audit', 'admin.audit'],
    ['sidebar-ai', 'llm_rankings'],
    ['sidebar-content', 'content'],
    ['sidebar-local', 'local_marketing'],
    ['sidebar-reports', 'reports.list'],
  ];
  await page.goto(`${BASE}admin.dashboard.html?lang=ru`, { waitUntil: 'domcontentloaded' });
  await dismissCookies(page);
  await page.waitForTimeout(2000);

  const sidebarLinks = await page.locator('a[href*="online.seranking.com"]').all();
  const seenSidebar = new Set();
  for (const link of sidebarLinks) {
    const href = await link.getAttribute('href');
    const box = await link.boundingBox().catch(() => null);
    if (!href || !box || box.x > 120) continue; // narrow left strip only
    const key = href.split('?')[0];
    if (seenSidebar.has(key)) continue;
    seenSidebar.add(key);
    const text = ((await link.getAttribute('title')) || (await link.innerText()) || '').trim().slice(0, 60);
    if (!/admin\.|research\./.test(href)) continue;
    try {
      await link.click({ timeout: 3000 });
      await page.waitForTimeout(WAIT);
      results.push(
        await snapshot(page, {
          pass: 'sidebar',
          action: `click: ${text || key}`,
          requested: href,
        })
      );
      console.log('sidebar', text || key, page.url().replace(BASE, '').slice(0, 50));
    } catch {
      /* skip */
    }
  }

  // --- Audit: project menu clicks ---
  await page.goto(`${BASE}admin.audit.site_id-${SITE}.html?lang=ru#/`, { waitUntil: 'domcontentloaded' });
  await dismissCookies(page);
  const auditItems = [
    ['Обзор', '#/'],
    ['Отчет об ошибках', '#/report'],
    ['Просканированные страницы', '#/pages'],
    ['Найденные ресурсы', '#/resources'],
    ['Найденные ссылки', '#/links'],
    ['Сравнение отчетов', '#/compare-crawls'],
  ];
  for (const [label, hash] of auditItems) {
    const link = page.locator(`a[href*="admin.audit.site_id-${SITE}"][href*="${hash.replace('#', '#')}"]`).first();
    if (!(await clickIfVisible(page, link))) {
      await clickIfVisible(page, page.getByRole('link', { name: label, exact: false }));
    }
    results.push(
      await snapshot(page, {
        pass: 'audit-menu',
        action: `menu: ${label}`,
        requested: `admin.audit.site_id-${SITE}.html${hash}`,
      })
    );
    console.log('audit', label, page.url().slice(-40));
  }

  // --- Backlink monitor: path tabs ---
  await page.goto(`${BASE}admin.backlink.site_id-${SITE}.html/?lang=ru`, { waitUntil: 'domcontentloaded' });
  await dismissCookies(page);
  const blTabs = [
    ['Бэклинки', '/'],
    ['Домены', '/domains'],
    ['Анкоры', '/anchors'],
    ['Страницы', '/pages'],
    ['IP-адреса', '/ips'],
    ['Disavow', '/disavow'],
  ];
  for (const [label, pathSuffix] of blTabs) {
    const hrefPart = pathSuffix === '/' ? `admin.backlink.site_id-${SITE}.html` : `admin.backlink.site_id-${SITE}.html${pathSuffix}`;
    const link = page.locator(`a[href*="${hrefPart}"]`).first();
    if (!(await clickIfVisible(page, link))) {
      await clickIfVisible(page, page.getByRole('link', { name: label, exact: false }));
    }
    results.push(
      await snapshot(page, {
        pass: 'backlink-tabs',
        action: `tab: ${label}`,
        requested: `admin.backlink.site_id-${SITE}.html${pathSuffix}`,
      })
    );
    console.log('backlink', label, page.url().replace(BASE, ''));
  }

  // --- Analytics: submenu ---
  await page.goto(`${BASE}admin.analytics.site_id-${SITE}.html?lang=ru#/start`, { waitUntil: 'domcontentloaded' });
  await dismissCookies(page);
  const analyticsItems = [
    ['Трафик', '#/traffic/channels'],
    ['Сниппеты', '#/snippets'],
    ['Данные Google Search Console', '#/gsc'],
    ['SEO-потенциал', '#/seo-potential'],
  ];
  for (const [label, hash] of analyticsItems) {
    const link = page.locator(`a[href*="admin.analytics.site_id-${SITE}"][href*="${hash}"]`).first();
    if (!(await clickIfVisible(page, link))) {
      await clickIfVisible(page, page.getByRole('link', { name: label, exact: false }));
    }
    results.push(
      await snapshot(page, {
        pass: 'analytics-menu',
        action: `menu: ${label}`,
        requested: `admin.analytics.site_id-${SITE}.html${hash}`,
      })
    );
    console.log('analytics', label, page.url().slice(-50));
  }

  // --- Rankings hash via menu ---
  await page.goto(`${BASE}admin.site.rankings.site_id-${SITE}.html?lang=ru#/overview`, {
    waitUntil: 'domcontentloaded',
  });
  await dismissCookies(page);
  for (const [label, hash] of [
    ['Обзор', '#/overview'],
    ['Подробный вид', '#/detailed'],
    ['Исторические данные', '#/history'],
  ]) {
    await clickIfVisible(page, page.getByRole('link', { name: label, exact: true }));
    results.push(
      await snapshot(page, {
        pass: 'rankings-menu',
        action: `menu: ${label}`,
        requested: `admin.site.rankings.site_id-${SITE}.html${hash}`,
      })
    );
    console.log('rankings', label, page.url().slice(-45));
  }

  // --- LLM rankings tabs ---
  await page.goto(`${BASE}admin.llm_rankings.site_id-${SITE}.html?lang=ru#/rankings`, {
    waitUntil: 'domcontentloaded',
  });
  for (const [label, hash] of [
    ['Rankings', '#/rankings'],
    ['Competitors', '#/competitors'],
    ['Источники', '#/sources'],
  ]) {
    await clickIfVisible(page, page.locator(`a[href*="llm_rankings"][href*="${hash}"]`));
    results.push(
      await snapshot(page, {
        pass: 'llm-menu',
        action: `menu: ${label}`,
        requested: `admin.llm_rankings.site_id-${SITE}.html${hash}`,
      })
    );
    console.log('llm', label);
  }

  // --- Insights serp tab ---
  await page.goto(`${BASE}admin.insights.site_id-${SITE}.html?lang=ru`, { waitUntil: 'domcontentloaded' });
  await clickIfVisible(page, page.locator('a[href*="#/serp"]'));
  results.push(
    await snapshot(page, {
      pass: 'insights-menu',
      action: 'menu: SERP',
      requested: `admin.insights.site_id-${SITE}.html#/serp`,
    })
  );

  // --- Backlink checker project tabs ---
  await page.goto(`${BASE}admin.backlink_checker_project.site_id-${SITE}.html?lang=ru#/overview/`, {
    waitUntil: 'domcontentloaded',
  });
  for (const [label, hash] of [
    ['overview', '#/overview/'],
    ['backlinks', '#/backlinks/'],
    ['domains', '#/domains/'],
  ]) {
    await clickIfVisible(page, page.locator(`a[href*="backlink_checker_project"][href*="${hash}"]`));
    results.push(
      await snapshot(page, {
        pass: 'bl-checker',
        action: `tab: ${label}`,
        requested: `admin.backlink_checker_project.site_id-${SITE}.html${hash}`,
      })
    );
  }

  await browser.close();

  const outJson = join(__dirname, '../docs/seranking-pages-visited-ui.json');
  writeFileSync(
    outJson,
    JSON.stringify({ crawledAt: new Date().toISOString(), count: results.length, results }, null, 2)
  );

  const lines = [
    '',
    '## UI-pass (клики по меню и вкладкам SPA)',
    '',
    `**Дата:** ${new Date().toISOString().slice(0, 10)} · **Записей:** ${results.length} · Скрипт: \`node scripts/seranking-crawl-ui-pass.mjs\``,
    '',
    '| Pass | Действие | Запрошено | Hash | Экран (h1–h3) |',
    '|---|---|---|---|---|',
  ];
  for (const r of results) {
    const screen = (r.headings?.slice(0, 2).join(' / ') || r.title || '—').replace(/\|/g, '/').slice(0, 90);
    lines.push(
      `| ${r.pass} | ${r.action} | \`${(r.requested || '').replace(/\|/g, '/')}\` | \`${r.hash || ''}\` | ${screen} |`
    );
  }

  const mdPath = join(__dirname, '../docs/seranking-pages-visited.md');
  let md = readFileSync(mdPath, 'utf8');
  if (!md.includes('## UI-pass')) {
    md = md.trimEnd() + '\n' + lines.join('\n') + '\n';
    writeFileSync(mdPath, md);
  } else {
    const uiJson = outJson;
    console.log('UI section exists; updated', uiJson);
  }

  console.log('\nWrote', outJson);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

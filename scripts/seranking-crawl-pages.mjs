#!/usr/bin/env node
/**
 * Crawl SE Ranking demo pages — login + visit each URL from seranking-crawl-urls.json
 * Output: docs/seranking-pages-visited.json + docs/seranking-pages-visited.md
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://online.seranking.com/';
const LOGIN = `${BASE}login.demo.html?lang=ru`;
const WAIT_MS = 2800;

const urls = JSON.parse(
  readFileSync(join(__dirname, 'seranking-crawl-urls.json'), 'utf8')
);

function pageInfo(page) {
  return page.evaluate(() => {
    const is404 = /not found|Site not found/i.test(document.title + document.body?.innerText?.slice(0, 500));
    const isLogin = location.href.includes('login.html') && !location.href.includes('login.demo');
    const headings = [];
    for (const el of document.querySelectorAll('h1, h2, h3, [class*="page-title"], .card-title')) {
      const t = el.innerText?.trim().replace(/\s+/g, ' ');
      if (t && t.length > 1 && t.length < 120 && !headings.includes(t)) headings.push(t);
      if (headings.length >= 5) break;
    }
    const activeNav = document.querySelector('.sidebar .active, nav .active, [aria-current="page"]');
    const mainText = document.querySelector('main, .content-wrapper, #content, .app-content')?.innerText?.slice(0, 400) || document.body?.innerText?.slice(0, 400) || '';
    return {
      title: document.title,
      finalUrl: location.href,
      headings,
      activeNav: activeNav?.innerText?.trim().replace(/\s+/g, ' ').slice(0, 80) || '',
      preview: mainText.replace(/\s+/g, ' ').trim().slice(0, 200),
      is404,
      isLogin,
    };
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: 'ru-RU',
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('Login demo…');
  await page.goto(LOGIN, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);
  const afterLogin = page.url();
  console.log('After login:', afterLogin);

  const results = [];
  for (const item of urls) {
    const target = BASE + item.path;
    process.stdout.write(`#${item.id} ${item.path} … `);
    try {
      await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(WAIT_MS);
      const info = await pageInfo(page);
      const redirected = !page.url().includes(item.path.split('?')[0].split('#')[0]);
      const status = info.is404 ? '404' : info.isLogin ? 'login' : redirected ? 'redirect' : 'ok';
      console.log(status, info.title?.slice(0, 40) || '—');
      results.push({
        id: item.id,
        module: item.module,
        requested: item.path,
        ...info,
        status,
      });
    } catch (err) {
      console.log('error', String(err).slice(0, 60));
      results.push({
        id: item.id,
        module: item.module,
        requested: item.path,
        status: 'error',
        error: String(err),
      });
    }
  }

  await browser.close();

  const outJson = join(__dirname, '../docs/seranking-pages-visited.json');
  writeFileSync(outJson, JSON.stringify({ crawledAt: new Date().toISOString(), count: results.length, results }, null, 2));

  const lines = [
    '# SE Ranking — журнал посещения страниц (демо)',
    '',
    `**Дата:** ${new Date().toISOString().slice(0, 10)}  `,
    `**Вход:** ${LOGIN}  `,
    `**Проект:** site_id-4150951 (Agrus.kiev.ua), локация local id=18545  `,
    `**Всего URL:** ${results.length}  `,
    '',
    '| # | Модуль | Запрошенный URL | Статус | Финальный URL | Заголовок / экран |',
    '|---|--------|-----------------|--------|---------------|-------------------|',
  ];
  for (const r of results) {
    const screen = (r.headings?.[0] || r.title || r.preview || '—').replace(/\|/g, '/').slice(0, 80);
    const final = (r.finalUrl || '—').replace(BASE, '').replace(/\|/g, '%7C').slice(0, 70);
    lines.push(
      `| ${r.id} | ${r.module} | \`${r.requested}\` | ${r.status} | \`${final}\` | ${screen} |`
    );
  }
  lines.push('', '---', '', 'Сгенерировано: `node scripts/seranking-crawl-pages.mjs`', '');

  const outMd = join(__dirname, '../docs/seranking-pages-visited.md');
  writeFileSync(outMd, lines.join('\n'));
  console.log('\nWrote', outJson, outMd);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

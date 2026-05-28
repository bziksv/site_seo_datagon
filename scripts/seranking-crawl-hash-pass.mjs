#!/usr/bin/env node
/**
 * SE Ranking — 3rd pass: direct hash/path navigation + long wait (SPA render).
 */
import { writeFileSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://online.seranking.com/';
const LOGIN = `${BASE}login.demo.html?lang=ru`;
const SITE = '4150951';

const TARGETS = [
  { pass: 'audit-hash', path: `admin.audit.site_id-${SITE}.html?lang=ru#/` },
  { pass: 'audit-hash', path: `admin.audit.site_id-${SITE}.html?lang=ru#/report` },
  { pass: 'audit-hash', path: `admin.audit.site_id-${SITE}.html?lang=ru#/pages` },
  { pass: 'audit-hash', path: `admin.audit.site_id-${SITE}.html?lang=ru#/resources` },
  { pass: 'audit-hash', path: `admin.audit.site_id-${SITE}.html?lang=ru#/links` },
  { pass: 'audit-hash', path: `admin.audit.site_id-${SITE}.html?lang=ru#/compare-crawls` },
  { pass: 'backlink-path', path: `admin.backlink.site_id-${SITE}.html/?lang=ru` },
  { pass: 'backlink-path', path: `admin.backlink.site_id-${SITE}.html/domains?lang=ru` },
  { pass: 'backlink-path', path: `admin.backlink.site_id-${SITE}.html/anchors?lang=ru` },
  { pass: 'backlink-path', path: `admin.backlink.site_id-${SITE}.html/pages?lang=ru` },
  { pass: 'backlink-path', path: `admin.backlink.site_id-${SITE}.html/ips?lang=ru` },
  { pass: 'backlink-path', path: `admin.backlink.site_id-${SITE}.html/disavow?lang=ru` },
  { pass: 'llm-hash', path: `admin.llm_rankings.site_id-${SITE}.html?lang=ru#/competitors` },
  { pass: 'llm-hash', path: `admin.llm_rankings.site_id-${SITE}.html?lang=ru#/sources` },
  { pass: 'insights-hash', path: `admin.insights.site_id-${SITE}.html?lang=ru#/serp` },
  { pass: 'insights-hash', path: `admin.insights.site_id-${SITE}.html?lang=ru#/` },
  { pass: 'competitors', path: `admin.site.competitors.site_id-${SITE}.html?lang=ru` },
  { pass: 'competitors', path: `admin.site.competitors.top100.site_id-${SITE}.html?lang=ru` },
  { pass: 'competitors', path: `admin.site.competitors.all.site_id-${SITE}.html?lang=ru#/share-of-voice` },
  { pass: 'web-mon', path: `admin.web_monitoring.settings.do-preview.site_id-${SITE}.html?lang=ru` },
  { pass: 'notes', path: `admin.site.note.site_id-${SITE}.html?lang=ru` },
  { pass: 'overview', path: `admin.site.overview.site_id-${SITE}.html?lang=ru#/` },
];

async function extract(page) {
  return page.evaluate(() => {
    const headings = [];
    for (const el of document.querySelectorAll('h1,h2,h3,h4,.card-title')) {
      const t = el.innerText?.trim().replace(/\s+/g, ' ');
      if (t && t.length > 1 && t.length < 100 && !headings.includes(t)) headings.push(t);
      if (headings.length >= 8) break;
    }
    const activeLinks = [...document.querySelectorAll('a.active, .active > a, li.active a')]
      .map((a) => a.innerText?.trim().replace(/\s+/g, ' '))
      .filter((t) => t && t.length < 60)
      .slice(0, 5);
    const tables = document.querySelectorAll('table').length;
    const charts = document.querySelectorAll('canvas, svg.recharts-surface, .chart').length;
    return {
      title: document.title,
      finalUrl: location.href,
      hash: location.hash,
      pathname: location.pathname,
      headings,
      activeLinks,
      tables,
      charts,
      bodyLen: document.body?.innerText?.length || 0,
    };
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await (await browser.newContext({ locale: 'ru-RU', viewport: { width: 1440, height: 900 } })).newPage();

  await page.goto(LOGIN, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3500);

  const results = [];
  for (const t of TARGETS) {
    const url = BASE + t.path;
    process.stdout.write(`${t.pass} ${t.path.slice(0, 55)} … `);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(3500);
    const info = await extract(page);
    const hashOk = t.path.includes('#') ? info.finalUrl.includes(t.path.split('#')[1]?.split('?')[0] || '___') : true;
    const pathOk = !t.path.includes('#') ? info.pathname.includes(t.path.split('?')[0].split('/').pop() || '___') : true;
    const status = hashOk || pathOk ? 'ok' : 'no-route-change';
    console.log(status, info.headings[0] || info.hash || '—');
    results.push({ ...t, ...info, status });
  }

  await browser.close();

  const out = join(__dirname, '../docs/seranking-pages-visited-hash.json');
  writeFileSync(out, JSON.stringify({ crawledAt: new Date().toISOString(), count: results.length, results }, null, 2));

  const mdPath = join(__dirname, '../docs/seranking-pages-visited.md');
  let md = readFileSync(mdPath, 'utf8');
  if (!md.includes('## Hash-pass')) {
    const lines = [
      '',
      '## Hash-pass (прямой URL + 5 с ожидания)',
      '',
      `**Записей:** ${results.length} · \`node scripts/seranking-crawl-hash-pass.mjs\``,
      '',
      '| Pass | URL | Статус | Hash | Заголовки | Таблиц |',
      '|---|---|---|---|---|---|',
    ];
    for (const r of results) {
      const h = (r.headings?.slice(0, 2).join(' / ') || '—').replace(/\|/g, '/');
      lines.push(
        `| ${r.pass} | \`${r.path.replace(/\|/g, '/')}\` | ${r.status} | \`${r.hash || '—'}\` | ${h.slice(0, 70)} | ${r.tables} |`
      );
    }
    md = md.trimEnd() + '\n' + lines.join('\n') + '\n';
    writeFileSync(mdPath, md);
  }
  console.log('Wrote', out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

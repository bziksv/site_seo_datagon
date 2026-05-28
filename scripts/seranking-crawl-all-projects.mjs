#!/usr/bin/env node
/** Quick visit: overview + rankings overview per demo project */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://online.seranking.com/';
const LOGIN = `${BASE}login.demo.html?lang=ru`;

const projects = JSON.parse(
  readFileSync(join(__dirname, '../docs/seranking-demo-projects.json'), 'utf8')
).projects;

const PAGES = [
  { key: 'overview', path: (id) => `admin.site.overview.site_id-${id}.html?lang=ru#/` },
  { key: 'rankings', path: (id) => `admin.site.rankings.site_id-${id}.html?lang=ru#/overview` },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await (await browser.newContext({ locale: 'ru-RU' })).newPage();
  await page.goto(LOGIN, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  const visits = [];
  for (const p of projects) {
    for (const pg of PAGES) {
      const url = BASE + pg.path(p.siteId);
      process.stdout.write(`${p.name} ${pg.key} … `);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(2500);
      const info = await page.evaluate(() => {
        const h = [];
        for (const el of document.querySelectorAll('h1,h2,h3,h4,.card-title')) {
          const t = el.innerText?.trim().replace(/\s+/g, ' ');
          if (t && t.length < 80 && !h.includes(t)) h.push(t);
          if (h.length >= 4) break;
        }
        return {
          finalUrl: location.href,
          hash: location.hash,
          headings: h,
          tables: document.querySelectorAll('table').length,
        };
      });
      console.log(info.headings[0] || info.hash || 'ok');
      visits.push({ siteId: p.siteId, name: p.name, group: p.group, page: pg.key, url: pg.path(p.siteId), ...info });
    }
  }
  await browser.close();

  const out = join(__dirname, '../docs/seranking-demo-projects-visits.json');
  writeFileSync(out, JSON.stringify({ crawledAt: new Date().toISOString(), visits }, null, 2));
  console.log('Wrote', out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

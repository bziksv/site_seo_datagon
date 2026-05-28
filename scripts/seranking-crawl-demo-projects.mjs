#!/usr/bin/env node
/**
 * List all demo projects (site_id) from dashboard + quick overview visit per project.
 */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://online.seranking.com/';
const LOGIN = `${BASE}login.demo.html?lang=ru`;

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await (await browser.newContext({ locale: 'ru-RU', viewport: { width: 1440, height: 900 } })).newPage();

  await page.goto(LOGIN, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3500);
  await page.goto(`${BASE}admin.dashboard.html?lang=ru`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const expand = page.getByRole('button', { name: /Развернуть группы/i });
  if (await expand.count()) {
    try {
      await expand.first().click({ timeout: 3000 });
      await page.waitForTimeout(2000);
    } catch {
      /* ignore */
    }
  }

  const projects = await page.evaluate(() => {
    const out = [];
    const seen = new Set();
    const add = (siteId, name, href = '') => {
      if (!siteId || siteId === '0' || siteId === 'null' || seen.has(siteId)) return;
      const n = (name || '').replace(/\s+/g, ' ').trim();
      if (!n || n.length > 100 || /keyboard|folder|Позиции|Обзор проекта/i.test(n)) return;
      seen.add(siteId);
      out.push({ siteId, name: n, href });
    };
    for (const a of document.querySelectorAll('a[href*="site_id-"]')) {
      const m = a.href.match(/site_id-(\d+)/);
      if (!m) continue;
      add(m[1], a.textContent || a.getAttribute('title') || '', a.href);
    }
    // data attributes / onclick handlers in rows
    const html = document.body.innerHTML;
    const re = /site_id-(\d+)/g;
    let match;
    const ids = new Set();
    while ((match = re.exec(html)) !== null) ids.add(match[1]);
    for (const row of document.querySelectorAll('tr, [class*="project"], [data-site-id]')) {
      const id =
        row.getAttribute('data-site-id') ||
        row.innerHTML.match(/site_id-(\d+)/)?.[1];
      if (!id) continue;
      const link = row.querySelector('a');
      const name = link?.textContent?.trim() || row.querySelector('td')?.textContent?.trim();
      add(id, name);
    }
  for (const id of ids) {
      if (!seen.has(id)) add(id, `project-${id}`);
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  });

  const visits = [];
  for (const p of projects) {
    const url = `${BASE}admin.site.overview.site_id-${p.siteId}.html?lang=ru#/`;
    process.stdout.write(`overview ${p.name} (${p.siteId}) … `);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(2500);
    const info = await page.evaluate(() => {
      const headings = [];
      for (const el of document.querySelectorAll('h1,h2,h3,h4,.card-title')) {
        const t = el.innerText?.trim().replace(/\s+/g, ' ');
        if (t && t.length > 1 && t.length < 80 && !headings.includes(t)) headings.push(t);
        if (headings.length >= 6) break;
      }
      return {
        finalUrl: location.href,
        headings,
        tables: document.querySelectorAll('table').length,
        widgets: document.querySelectorAll('[class*="widget"]').length,
      };
    });
    console.log(info.headings[0] || '—');
    visits.push({ ...p, ...info });
  }

  await browser.close();

  const out = join(__dirname, '../docs/seranking-demo-projects.json');
  writeFileSync(out, JSON.stringify({ crawledAt: new Date().toISOString(), projects, visits }, null, 2));
  console.log('\nWrote', out, `(${projects.length} projects)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

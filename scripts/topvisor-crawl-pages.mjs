#!/usr/bin/env node
/**
 * Crawl Topvisor app pages (login via TOPVISOR_EMAIL / TOPVISOR_PASSWORD).
 * Optional: scripts/topvisor-crawl.local.env
 * Output: docs/topvisor-pages-visited.json + docs/topvisor-pages-visited.md
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://topvisor.com/';
const LOGIN = `${BASE}ru/#vpn=1&view-dialog_auth=auth`;
const WAIT_MS = 2800;

const envFile = join(__dirname, 'topvisor-crawl.local.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const email = process.env.TOPVISOR_EMAIL;
const password = process.env.TOPVISOR_PASSWORD;
if (!email || !password) {
  console.error('Set TOPVISOR_EMAIL and TOPVISOR_PASSWORD (or scripts/topvisor-crawl.local.env)');
  process.exit(1);
}

const projectsPath = join(__dirname, '../docs/topvisor-account-projects.json');
let projectId = process.env.TOPVISOR_PROJECT_ID || '5374998';
if (existsSync(projectsPath)) {
  try {
    const p = JSON.parse(readFileSync(projectsPath, 'utf8'));
    if (p.projects?.[0]?.id) projectId = String(p.projects[0].id);
  } catch {
    /* keep default */
  }
}

const urls = JSON.parse(readFileSync(join(__dirname, 'topvisor-crawl-urls.json'), 'utf8'));

function resolvePath(path) {
  return path.replace(/\{id\}/g, projectId);
}

function pageInfo(page) {
  return page.evaluate(() => {
    const is404 = /не найдена|not found/i.test(document.title + (document.body?.innerText?.slice(0, 400) || ''));
    const isLogin = /view-dialog_auth=auth/i.test(location.href) || !!document.querySelector('input[type=password][placeholder*="парол"]');
    const headings = [];
    for (const el of document.querySelectorAll('h1, h2, h3, .page-title, .top-title')) {
      const t = el.innerText?.trim().replace(/\s+/g, ' ');
      if (t && t.length > 1 && t.length < 120 && !headings.includes(t)) headings.push(t);
      if (headings.length >= 5) break;
    }
    const tables = document.querySelectorAll('table').length;
    return {
      title: document.title,
      finalUrl: location.href,
      hash: location.hash,
      headings,
      tables,
      is404,
      isLogin,
    };
  });
}

async function dismissOverlays(page) {
  const cookie = page.getByRole('button', { name: /согласен/i }).first();
  if (await cookie.isVisible().catch(() => false)) {
    await cookie.click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(500);
  }
  await page.keyboard.press('Escape').catch(() => {});
  await page.locator('.ui-widget-overlay').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
}

async function login(page) {
  await page.goto(LOGIN, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);
  const emailInput = page.locator('input[type=email]').first();
  if (!(await emailInput.isVisible().catch(() => false))) {
    await page.evaluate(() => {
      location.hash = 'vpn=1&view-dialog_auth=auth';
    });
    await page.waitForTimeout(4000);
  }
  await emailInput.waitFor({ state: 'visible', timeout: 30000 });
  await emailInput.fill(email);
  await page.locator('input[type=password]').first().fill(password);
  const submit = page.locator('button.top-color_blue').filter({ hasText: /войти|вход/i }).last();
  if (await submit.count()) {
    await submit.click({ force: true, timeout: 15000 });
  } else {
    await page.locator('button.top-color_blue').last().click({ force: true, timeout: 15000 });
  }
  await page.waitForTimeout(6000);
  await dismissOverlays(page);
  if (page.url().includes('view-dialog_auth')) {
    throw new Error('Login failed — auth dialog still open');
  }
  await page.goto(`${BASE}projects/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  await dismissOverlays(page);
  let title = await page.title();
  if (!/проект/i.test(title)) {
    await page.goto(LOGIN, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(5000);
    if (await page.locator('input[type=email]').first().isVisible().catch(() => false)) {
      await page.locator('input[type=email]').first().fill(email);
      await page.locator('input[type=password]').first().fill(password);
      await page.locator('button.top-color_blue').last().click({ force: true });
      await page.waitForTimeout(6000);
    }
    await page.goto(`${BASE}projects/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);
    await dismissOverlays(page);
    title = await page.title();
  }
  if (!/проект/i.test(title)) {
    throw new Error(`Login failed — expected projects list, got: ${title}`);
  }
}

async function discoverProjects(page) {
  await page.goto(`${BASE}projects/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  return page.evaluate(() => {
    const projects = [];
    for (const a of document.querySelectorAll('a[href*="/project/keywords/"]')) {
      const m = a.href.match(/keywords\/(\d+)/);
      if (!m || m[1] === '0') continue;
      const id = m[1];
      if (projects.some((p) => p.id === id)) continue;
      const row = a.closest('tr, [class*="project"], li') || a.parentElement;
      let name = '';
      if (row) {
        const lines = (row.innerText || '').split('\n').map((s) => s.trim()).filter(Boolean);
        name = lines.find((l) => !/проверить|позиц|запрос|топ/i.test(l)) || lines[0] || '';
      }
      if (!name || /ваши проекты/i.test(name)) {
        const t = document.title.match(/^([^(#]+)/);
        name = t?.[1]?.trim() || `project-${id}`;
      }
      projects.push({ id, name: name.slice(0, 80), href: a.href });
    }
    return projects;
  });
}

function buildMd(results, projectId, projects) {
  const lines = [
    '# Topvisor — журнал посещения страниц',
    '',
    `**Дата:** ${new Date().toISOString().slice(0, 10)}`,
    `**Вход:** ${LOGIN}`,
    `**Проект:** \`{id}\` → **${projectId}** (${projects.map((p) => p.name).join(', ') || '—'})`,
    '',
    'Учётные данные не хранятся в репозитории — только `TOPVISOR_EMAIL` / `TOPVISOR_PASSWORD` локально.',
    '',
    `**Скрипт:** \`node scripts/topvisor-crawl-pages.mjs\` · **URL в чек-листе:** ${results.length}`,
    '',
    '| # | Модуль | URL | Статус | Заголовок | Таблиц |',
    '|---|--------|-----|--------|-----------|--------|',
  ];
  for (const r of results) {
    const title = (r.title || r.headings?.[0] || '—').replace(/\|/g, '/').slice(0, 50);
    lines.push(
      `| ${r.id} | ${r.module} | \`${r.requested}\` | ${r.status} | ${title} | ${r.tables ?? '—'} |`
    );
  }
  return lines.join('\n') + '\n';
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: 'ru-RU',
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('Login…');
  await login(page);
  console.log('After login:', page.url());

  const projects = await discoverProjects(page);
  writeFileSync(
    join(__dirname, '../docs/topvisor-account-projects.json'),
    JSON.stringify({ crawledAt: new Date().toISOString(), projects }, null, 2)
  );
  if (projects[0]?.id) projectId = projects[0].id;
  console.log('Projects:', projects.map((p) => `${p.name} (${p.id})`).join(', ') || projectId);

  const results = [];
  for (const item of urls) {
    const path = resolvePath(item.path);
    const target = BASE + path;
    process.stdout.write(`#${item.id} ${path} … `);
    try {
      await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(WAIT_MS);
      await dismissOverlays(page);
      const info = await pageInfo(page);
      const norm = (u) => u.replace(/\/$/, '').split('#')[0];
      const pathBase = path.split('#')[0].replace(/\/$/, '');
      const onPath = page.url().includes(pathBase);
      const guestLanding = /all SEO tools on one platform|Топвизор — все инструменты/i.test(info.title || '');
      const redirected =
        !onPath && norm(page.url()) !== norm(target) && !page.url().includes(pathBase);
      const status = info.is404
        ? '404'
        : info.isLogin || guestLanding
          ? 'login'
          : redirected
            ? 'redirect'
            : 'ok';
      console.log(status, (info.title || '—').slice(0, 45));
      results.push({
        id: item.id,
        module: item.module,
        requested: item.path,
        resolved: path,
        projectId,
        ...info,
        status,
      });
    } catch (err) {
      console.log('error', String(err).slice(0, 60));
      results.push({
        id: item.id,
        module: item.module,
        requested: item.path,
        resolved: path,
        status: 'error',
        error: String(err),
      });
    }
  }

  await browser.close();

  const outJson = join(__dirname, '../docs/topvisor-pages-visited.json');
  const payload = {
    crawledAt: new Date().toISOString(),
    projectId,
    projects,
    visits: results,
  };
  writeFileSync(outJson, JSON.stringify(payload, null, 2));
  writeFileSync(join(__dirname, '../docs/topvisor-pages-visited.md'), buildMd(results, projectId, projects));
  console.log('Wrote', outJson);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

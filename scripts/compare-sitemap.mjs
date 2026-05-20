/**
 * Сравнение URL из sitemap redbox.su с ответами нового сайта (BASE_URL).
 * BASE_URL=http://localhost:3001 node scripts/compare-sitemap.mjs
 */
const BASE = (process.env.BASE_URL ?? "http://localhost:3001").replace(/\/$/, "");
const SITEMAP_INDEX = process.env.SITEMAP_INDEX ?? "https://redbox.su/sitemap.xml";

const LEGACY_REDIRECT = new Map([
  ["/404.php", "/"],
  ["/cart/", "/"],
  ["/catalog/", "/services/"],
  ["/search/", "/"],
  ["/main/", "/"],
  ["/blog/", "/news/"],
  ["/action/", "/news/"],
]);

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

function parseLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function pathnameFromLoc(loc) {
  const u = new URL(loc);
  return u.pathname.endsWith("/") || u.pathname.includes(".")
    ? u.pathname
    : `${u.pathname}/`;
}

async function collectBitrixUrls() {
  const index = await fetchText(SITEMAP_INDEX);
  const subs = parseLocs(index).filter((u) => u.includes("redbox.su/sitemap-"));
  const all = new Set();
  for (const sub of subs) {
    const xml = await fetchText(sub);
    for (const loc of parseLocs(xml)) all.add(pathnameFromLoc(loc));
  }
  return [...all].sort();
}

async function checkPath(pathname) {
  const expected = LEGACY_REDIRECT.get(pathname);
  const url = `${BASE}${pathname}`;
  const res = await fetch(url, { redirect: "manual" });

  if (expected) {
    const loc = res.headers.get("location") ?? "";
    if (
      (res.status === 301 || res.status === 308 || res.status === 307) &&
      loc.includes(expected)
    ) {
      return { pathname, status: "redirect", detail: `${res.status} → ${expected}` };
    }
    return { pathname, status: "fail", detail: `expected redirect to ${expected}, got ${res.status} ${loc}` };
  }

  if (res.status === 200) {
    return { pathname, status: "ok", detail: "200" };
  }
  return { pathname, status: "fail", detail: String(res.status) };
}

async function main() {
  console.log(`Bitrix sitemap → ${BASE}\n`);
  const paths = await collectBitrixUrls();
  console.log(`URLs in Bitrix sitemaps: ${paths.length}\n`);

  const fails = [];
  for (const pathname of paths) {
    const r = await checkPath(pathname);
    if (r.status === "fail") {
      fails.push(r);
      console.error(`  FAIL ${pathname} — ${r.detail}`);
    }
  }

  const ok = paths.length - fails.length;
  console.log(`\nOK: ${ok}/${paths.length}`);
  if (fails.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

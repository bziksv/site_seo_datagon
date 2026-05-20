/**
 * Сверка live redbox.su vs локальный BASE_URL по тексту и внешним картинкам.
 * npm run audit:pages
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIVE = "https://redbox.su";
const LOCAL = process.env.BASE_URL ?? "http://localhost:3001";

const URLS = [
  "/",
  "/about/",
  "/contact/",
  "/tarify/",
  "/services/",
  "/faq/",
  "/news/",
  "/news/istoriya-kompanii/",
  "/legal/personal-data/",
  "/legal/privacy/",
  "/legal/offer/",
  ...[...fs.readFileSync(path.join(__dirname, "../lib/content/modules.ts"), "utf8").matchAll(/path: "(\/[^"]+\/)"/g)].map(
    (m) => m[1],
  ),
  ...[...fs.readFileSync(path.join(__dirname, "../lib/content/news.generated.ts"), "utf8").matchAll(/slug: "([^"]+)"/g)].map(
    (m) => `/news/detail/${m[1]}/`,
  ),
];

function textLen(html) {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();
  return $("body").text().replace(/\s+/g, " ").trim().length;
}

function externalImages(html) {
  const $ = cheerio.load(html);
  const urls = new Set();
  $("img[src], [data-src]").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src") || "";
    if (/redbox\.su\/upload|https?:\/\/redbox\.su/i.test(src)) urls.add(src);
  });
  return [...urls];
}

const rows = [];

for (const p of URLS) {
  try {
    const [liveRes, localRes] = await Promise.all([
      fetch(`${LIVE}${p}`),
      fetch(`${LOCAL}${p}`),
    ]);
    const liveHtml = await liveRes.text();
    const localHtml = localRes.ok ? await localRes.text() : "";
    const liveLen = textLen(liveHtml);
    const localLen = localRes.ok ? textLen(localHtml) : 0;
    const ratio = liveLen ? Math.round((localLen / liveLen) * 100) : 0;
    const extImg = localRes.ok ? externalImages(localHtml) : [];
    const status =
      !localRes.ok
        ? "FAIL"
        : ratio < 40
          ? "TEXT_LOW"
          : extImg.length
            ? "EXT_IMG"
            : ratio < 70
              ? "TEXT_WARN"
              : "OK";
    rows.push({ path: p, status, ratio, liveLen, localLen, extImg: extImg.length, http: localRes.status });
    process.stdout.write(`${status.padEnd(10)} ${String(ratio).padStart(3)}% ${p}\n`);
  } catch (e) {
    rows.push({ path: p, status: "ERROR", error: e.message });
    process.stdout.write(`ERROR      --- ${p}\n`);
  }
  await new Promise((r) => setTimeout(r, 80));
}

const out = path.join(__dirname, "../docs/page-audit-report.json");
fs.writeFileSync(out, JSON.stringify(rows, null, 2));
const bad = rows.filter((r) => r.status !== "OK");
console.log("\n---");
console.log("Total:", rows.length, "| Issues:", bad.length);
console.log("Report:", out);

/**
 * Карточки сервисов с /services/ → lib/content/services.generated.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import { parseKrakenLead } from "./lib/kraken-parse.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../lib/content/services.generated.ts");
const SITE = "https://redbox.su";

const html = await (await fetch(`${SITE}/services/`)).text();
const $ = cheerio.load(html);
const intro = parseKrakenLead($) || "Для вашего удобства мы собрали все значимые сервисы в одном месте.";

const items = [];
const seen = new Set();

$("a[href]").each((_, a) => {
  const href = $(a).attr("href") || "";
  if (!href.startsWith("/") || href.includes("news") || href.includes("legal")) return;
  const pathNorm = href.endsWith("/") ? href : `${href}/`;
  if (seen.has(pathNorm) || pathNorm === "/services/") return;

  const card = $(a).closest(".item, .service, [class*='col-'], li").length
    ? $(a).closest(".item, .service, [class*='col-'], li")
    : $(a);
  const title =
    card.find("h2, h3, .title").first().text().replace(/\s+/g, " ").trim() ||
    $(a).text().replace(/\s+/g, " ").trim().slice(0, 80);
  const description = card
    .find("p, .description, .text-wrap")
    .first()
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 280);

  if (!title || title.length < 5) return;
  seen.add(pathNorm);
  items.push({ href: pathNorm, title, description: description || title });
});

// Fallback: все модули из modules.ts
const modulesTs = fs.readFileSync(path.join(__dirname, "../lib/content/modules.ts"), "utf8");
for (const m of modulesTs.matchAll(/path: "(\/[^"]+\/)"[\s\S]*?title: "([^"]+)"/g)) {
  const href = m[1];
  if (!seen.has(href)) {
    seen.add(href);
    items.push({ href, title: m[2], description: "" });
  }
}

const lines = [
  "/** AUTO-GENERATED: node scripts/scrape-services.mjs */",
  "export type ServiceItem = { href: string; title: string; description: string };",
  `export const SERVICES_INTRO = ${JSON.stringify(intro)};`,
  "export const SERVICE_ITEMS: ServiceItem[] = [",
  ...items.map(
    (i) =>
      `  { href: ${JSON.stringify(i.href)}, title: ${JSON.stringify(i.title)}, description: ${JSON.stringify(i.description)} },`,
  ),
  "];",
  "",
];

fs.writeFileSync(OUT, lines.join("\n"));
console.log("written", OUT, items.length, "items");

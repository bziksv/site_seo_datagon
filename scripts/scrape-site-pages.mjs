/**
 * Тексты страниц компании с redbox.su
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import { parseH1, parseKrakenLead, parseKrakenSections } from "./lib/kraken-parse.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../lib/content/site-pages.generated.ts");
const SITE = "https://redbox.su";

const PAGES = [
  { id: "about", path: "/about/" },
  { id: "contact", path: "/contact/" },
  { id: "services", path: "/services/" },
  { id: "tarify", path: "/tarify/" },
  { id: "faq", path: "/faq/" },
  { id: "home", path: "/" },
];

const items = [];

for (const page of PAGES) {
  const html = await (await fetch(`${SITE}${page.path}`)).text();
  const $ = cheerio.load(html);
  const h1 = parseH1($) || page.id;
  const lead = parseKrakenLead($);
  let sections = parseKrakenSections($);

  if (page.id === "faq") {
    sections = [];
    $(".faq-element").each((_, el) => {
      const $el = $(el);
      const q = $el.find(".question span").text().replace(/\s+/g, " ").trim();
      const a = $el.find(".quest-text").text().replace(/\s+/g, " ").trim();
      if (q && a) sections.push({ title: q, paragraphs: [a] });
    });
  }

  if (page.id === "about") {
    const timeline = [];
    $("a[href*='/news/detail/']").each((_, a) => {
      const $a = $(a);
      const block = $a.closest("div");
      const date = block.text().match(/(\d{1,2}\s+\S+\s+\d{4})/i)?.[1] || "";
      const title = $a.text().replace(/\s+/g, " ").trim();
      const description = block.find("p").first().text().replace(/\s+/g, " ").trim();
      const href = ($a.attr("href") || "").replace(/^\/?/, "/");
      if (date && description) timeline.push({ date, title, description, href });
    });
    items.push({ ...page, h1, lead, sections, extra: { timeline } });
    console.log(page.id, "sections", sections.length, "timeline", timeline.length);
    await new Promise((r) => setTimeout(r, 150));
    continue;
  }

  if (page.id === "tarify") {
    const plans = [];
    $("[class*='tarif'], .price-block, .tariff").each((_, el) => {
      const name = $(el).find("h2, h3, .title").first().text().trim();
      const price = $(el).text().match(/[\d\s]+₽|руб/i)?.[0]?.trim();
      if (name) plans.push({ name, price: price || "" });
    });
    items.push({ ...page, h1, lead, sections, extra: { plans } });
  } else if (page.id !== "about") {
    items.push({ ...page, h1, lead, sections, extra: {} });
  }

  if (page.id !== "about") console.log(page.id, "sections", sections.length);
  if (page.id !== "about") await new Promise((r) => setTimeout(r, 150));
}

function emitSections(sections, indent = "    ") {
  return sections
    .map(
      (s) =>
        `${indent}{ title: ${JSON.stringify(s.title)}, paragraphs: [\n${s.paragraphs.map((p) => `${indent}  ${JSON.stringify(p)},`).join("\n")}\n${indent}] },`,
    )
    .join("\n");
}

const lines = [
  "/** AUTO-GENERATED: node scripts/scrape-site-pages.mjs */",
  "export type PageSection = { title: string; paragraphs: string[] };",
  "export type SitePageContent = {",
  "  id: string;",
  "  path: string;",
  "  h1: string;",
  "  lead: string;",
  "  sections: PageSection[];",
  "  extra?: Record<string, unknown>;",
  "};",
  "",
  "export const SITE_PAGES: SitePageContent[] = [",
];

for (const p of items) {
  lines.push(`  {
    id: ${JSON.stringify(p.id)},
    path: ${JSON.stringify(p.path)},
    h1: ${JSON.stringify(p.h1)},
    lead: ${JSON.stringify(p.lead)},
    sections: [
${emitSections(p.sections)}
    ],
    extra: ${JSON.stringify(p.extra)},
  },`);
}

lines.push("];", "", "export function getSitePage(id: string): SitePageContent | undefined {", "  return SITE_PAGES.find((p) => p.id === id);", "}", "");

fs.writeFileSync(OUT, lines.join("\n"));
console.log("written", OUT);

// FAQ — вручную в lib/content/faq.ts (про Датагон, не Kraken)

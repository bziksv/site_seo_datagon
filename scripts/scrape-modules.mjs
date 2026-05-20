/**
 * Полный текст лендингов модулей с redbox.su → lib/content/modules.generated.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import { parseH1, parseKrakenLead, parseKrakenSections } from "./lib/kraken-parse.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODULES_TS = path.join(__dirname, "../lib/content/modules.ts");
const OUT = path.join(__dirname, "../lib/content/modules.generated.ts");
const SITE = "https://redbox.su";

const paths = [...fs.readFileSync(MODULES_TS, "utf8").matchAll(/path: "(\/[^"]+\/)"/g)].map((m) => m[1]);

const items = [];

for (const p of paths) {
  const slug = p.replace(/^\/|\/$/g, "");
  const url = `${SITE}${p}`;
  const html = await (await fetch(url)).text();
  const $ = cheerio.load(html);
  const h1 = parseH1($);
  const lead = parseKrakenLead($);
  const sections = parseKrakenSections($);
  const metaDesc = $("meta[name='description']").attr("content")?.trim() || "";

  items.push({ slug, path: p, h1, lead, description: metaDesc, sections });
  console.log(slug, "sections:", sections.length, "paras:", sections.reduce((n, s) => n + s.paragraphs.length, 0));
  await new Promise((r) => setTimeout(r, 150));
}

const lines = [
  "/** AUTO-GENERATED: node scripts/scrape-modules.mjs */",
  "export type ModuleSection = { title: string; paragraphs: string[] };",
  "export type ModuleContent = {",
  "  slug: string;",
  "  path: string;",
  "  h1: string;",
  "  description: string;",
  "  lead: string;",
  "  sections: ModuleSection[];",
  "};",
  "",
  "export const MODULE_CONTENT: ModuleContent[] = [",
];

for (const m of items) {
  const secLines = m.sections
    .map(
      (s) =>
        `      { title: ${JSON.stringify(s.title)}, paragraphs: [\n${s.paragraphs.map((p) => `        ${JSON.stringify(p)},`).join("\n")}\n      ] },`,
    )
    .join("\n");
  lines.push(`  {
    slug: ${JSON.stringify(m.slug)},
    path: ${JSON.stringify(m.path)},
    h1: ${JSON.stringify(m.h1)},
    description: ${JSON.stringify(m.description)},
    lead: ${JSON.stringify(m.lead)},
    sections: [
${secLines}
    ],
  },`);
}

lines.push("];", "", "export function getModuleContent(slug: string): ModuleContent | undefined {", "  return MODULE_CONTENT.find((m) => m.slug === slug);", "}", "");

fs.writeFileSync(OUT, lines.join("\n"));
console.log("written", OUT);

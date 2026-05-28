#!/usr/bin/env node
/**
 * Синхронизация демо UTM с кабинета → public/demo/utm-marks/
 * Запуск: node scripts/sync-utm-demo-from-cabinet.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CABINET = path.resolve(ROOT, "../cabinet.datagon.ru");
const OUT = path.join(ROOT, "public/demo/utm-marks");

const bladePath = path.join(CABINET, "resources/views/pages/utm.blade.php");
const ruPath = path.join(CABINET, "resources/lang/ru.json");

function loadRu() {
  return JSON.parse(fs.readFileSync(ruPath, "utf8"));
}

function translate(html, ru) {
  let out = html;
  out = out.replace(/@{{/g, "{{");
  out = out.replace(/\{\{\s*__\('((?:\\'|[^'])*)'\)\s*\}\}/g, (_, key) => {
    const k = key.replace(/\\'/g, "'");
    return ru[k] ?? k;
  });
  out = out.replace(/\{\{\s*__\("((?:\\"|[^"])*)"\)\s*\}\}/g, (_, key) => ru[key] ?? key);
  out = out.replace(/\{\{\s*__\('Example'\)\s*\}\}/g, "Пример");
  return out;
}

function extractBuilderHtml(blade) {
  const start = blade.indexOf('<div class="cabinet-utm-page">');
  const end = blade.indexOf("@slot('js')");
  if (start === -1 || end === -1) {
    throw new Error("Не найден блок cabinet-utm-page в utm.blade.php");
  }
  let chunk = blade.slice(start, end);
  chunk = chunk.replace(/<p class="cabinet-utm-lead[^>]*>[\s\S]*?<\/p>\s*/i, "");
  return chunk.trim();
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function main() {
  if (!fs.existsSync(bladePath)) {
    console.error("Нет кабинета:", bladePath);
    process.exit(1);
  }

  const ru = loadRu();
  const blade = fs.readFileSync(bladePath, "utf8");
  const body = translate(extractBuilderHtml(blade), ru);

  fs.mkdirSync(OUT, { recursive: true });

  copyFile(
    path.join(CABINET, "public/plugins/utm-marks/js/url-builder.min.js"),
    path.join(OUT, "url-builder.min.js")
  );
  copyFile(
    path.join(CABINET, "public/plugins/utm-marks/css/style.css"),
    path.join(OUT, "style.css")
  );
  copyFile(
    path.join(CABINET, "public/css/cabinet-utm-marks.css"),
    path.join(OUT, "cabinet-utm-marks.css")
  );
  copyFile(
    path.join(CABINET, "public/plugins/jquery/jquery.min.js"),
    path.join(OUT, "jquery.min.js")
  );

  const indexHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Генератор UTM — демо</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="/demo/utm-marks/style.css">
  <link rel="stylesheet" href="/demo/utm-marks/cabinet-utm-marks.css">
  <link rel="stylesheet" href="/demo/utm-marks/demo-embed.css">
  <style>
    html, body { margin: 0; padding: 0; background: #fff; }
    body { padding: 0.75rem 1rem 1.25rem; box-sizing: border-box; }
    .cabinet-utm-page .urlBuilder_form { max-width: 100%; }
  </style>
</head>
<body>
${body}
<script src="/demo/utm-marks/jquery.min.js"></script>
<script src="/demo/utm-marks/url-builder.min.js"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(OUT, "index.html"), indexHtml, "utf8");
  console.log("OK → public/demo/utm-marks/index.html");
}

main();

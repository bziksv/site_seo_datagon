/**
 * Локальные копии картинок из news.generated.ts (без полного скрапа).
 * Запуск: node scripts/mirror-news-images.mjs
 */
import path from "path";
import { fileURLToPath } from "url";
import { mirrorFileUploadUrls } from "./lib/mirror-images.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NEWS_TS = path.join(__dirname, "../lib/content/news.generated.ts");
const PUBLIC = path.join(__dirname, "../public");

await mirrorFileUploadUrls(NEWS_TS, PUBLIC);

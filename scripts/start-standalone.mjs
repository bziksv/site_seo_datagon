/**
 * Production-запуск после `npm run build` (output: standalone).
 * Копирует public и static, слушает PORT (по умолчанию 3001).
 */
import { cpSync, existsSync, mkdirSync } from "fs";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const STANDALONE = path.join(ROOT, ".next/standalone");
const PORT = process.env.PORT ?? "3001";

if (!existsSync(path.join(STANDALONE, "server.js"))) {
  console.error("Сначала выполните: npm run build");
  process.exit(1);
}

cpSync(path.join(ROOT, "public"), path.join(STANDALONE, "public"), { recursive: true });
mkdirSync(path.join(STANDALONE, ".next"), { recursive: true });
cpSync(path.join(ROOT, ".next/static"), path.join(STANDALONE, ".next/static"), {
  recursive: true,
});

console.log(`Starting standalone on http://localhost:${PORT}`);

const child = spawn("node", ["server.js"], {
  cwd: STANDALONE,
  stdio: "inherit",
  env: { ...process.env, PORT, HOSTNAME: process.env.HOSTNAME ?? "0.0.0.0" },
});

child.on("exit", (code) => process.exit(code ?? 0));

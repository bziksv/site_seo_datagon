"use client";

import { useCallback, useId, useState } from "react";
import { DemoModuleLinks } from "@/components/demo/DemoModuleLinks";
import { DemoUpgradePanel } from "@/components/demo/DemoUpgradePanel";
import { DemoWidgetShell } from "@/components/demo/DemoWidgetShell";
import {
  BACKLINK_CABINET_FEATURES,
  BACKLINK_DEMO_MAX_RUNS,
  BACKLINK_DEMO_SAMPLE,
  buildBacklinkRegisterUrl,
} from "@/lib/demo/backlink-demo";
import { runBacklinkDemo } from "@/lib/demo/run-backlink-demo-client";
import type { BacklinkDemoResult } from "@/lib/demo/types";

const DEMO_FEATURES = [
  "Разовая проверка как в кабинете",
  "Страница донора, целевая ссылка и анкор",
  "Контроль nofollow и noindex",
  "5 проверок в демо за сутки",
] as const;

const CABINET_NOTE =
  "В демо — одна ручная проверка. В личном кабинете сервис сам обходит страницы раз в сутки, ведёт проекты и шлёт письмо или сообщение в Telegram, если ссылку сняли, поменяли анкор или добавили nofollow / noindex.";

function statusTone(status: string): string {
  return status === "issue"
    ? "text-red-800 bg-red-50 border-red-200"
    : "text-emerald-800 bg-emerald-50 border-emerald-200";
}

function statusLabel(status: string): string {
  return status === "issue" ? "Проблема" : "OK";
}

function BacklinkDemoReport({ result }: { result: BacklinkDemoResult }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:px-5">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Страница донора</p>
        <p className="mt-1 break-all font-medium text-slate-900">{result.donor_url}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">Искомая ссылка</p>
        <p className="mt-1 break-all text-slate-800">{result.target_link}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">Анкор</p>
        <p className="mt-1 text-slate-800">{result.anchor}</p>
      </div>

      <p
        className={`rounded-xl border px-4 py-2.5 text-sm font-medium ${
          result.ok
            ? "border-emerald-200 bg-emerald-50 text-emerald-900"
            : "border-amber-200 bg-amber-50 text-amber-950"
        }`}
      >
        {result.summary}
      </p>

      <ul className="space-y-2">
        {result.checks.map((check) => (
          <li
            key={check.key}
            className="flex flex-wrap items-start justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          >
            <span className="text-slate-800">{check.label}</span>
            <span
              className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusTone(check.status)}`}
            >
              {statusLabel(check.status)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BacklinkDemoWidget() {
  const donorId = useId();
  const linkId = useId();
  const anchorId = useId();

  const [donor, setDonor] = useState("");
  const [link, setLink] = useState("");
  const [anchor, setAnchor] = useState("");
  const [checkNofollow, setCheckNofollow] = useState(true);
  const [checkNoindex, setCheckNoindex] = useState(true);
  const [result, setResult] = useState<BacklinkDemoResult | null>(null);
  const [remaining, setRemaining] = useState(BACKLINK_DEMO_MAX_RUNS);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const applySample = useCallback(() => {
    setDonor(BACKLINK_DEMO_SAMPLE.donor);
    setLink(BACKLINK_DEMO_SAMPLE.link);
    setAnchor(BACKLINK_DEMO_SAMPLE.anchor);
    setCheckNofollow(true);
    setCheckNoindex(true);
  }, []);

  const runCheck = useCallback(async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await runBacklinkDemo({
        donor: donor.trim(),
        link: link.trim(),
        anchor: anchor.trim(),
        check_nofollow: checkNofollow,
        check_noindex: checkNoindex,
      });
      if (!res.ok) {
        setError(res.message ?? "Не удалось выполнить проверку");
        if (typeof res.remaining === "number") {
          setRemaining(res.remaining);
        }
        return;
      }
      setResult(res.data.result);
      setRemaining(res.data.remaining);
    } catch {
      setError("Сервис временно недоступен. Убедитесь, что кабинет запущен на :3002.");
    } finally {
      setLoading(false);
    }
  }, [anchor, checkNoindex, checkNofollow, donor, link]);

  return (
    <DemoWidgetShell
      title="Проверьте ссылку на странице донора"
      lead="Разовая проверка — те же правила, что в модуле «Отслеживание ссылок». Мониторинг по расписанию, проекты и оповещения — после регистрации в кабинете."
      features={DEMO_FEATURES}
    >
      <p className="mb-6 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-relaxed text-brand-950">
        {CABINET_NOTE}
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor={donorId}>
              Страница сайта-донора
            </label>
            <input
              id={donorId}
              type="url"
              value={donor}
              onChange={(e) => setDonor(e.target.value)}
              placeholder="https://sait-donor.ru/stranica/"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor={linkId}>
              Ссылка на ваш сайт (как в HTML)
            </label>
            <input
              id={linkId}
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="/landing/ или https://vash-sait.ru/page/"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-mono"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor={anchorId}>
              Текст анкора
            </label>
            <input
              id={anchorId}
              type="text"
              value={anchor}
              onChange={(e) => setAnchor(e.target.value)}
              placeholder="текст ссылки"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-700">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={checkNofollow}
                onChange={(e) => setCheckNofollow(e.target.checked)}
                className="rounded border-slate-300"
              />
              Контроль nofollow
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={checkNoindex}
                onChange={(e) => setCheckNoindex(e.target.checked)}
                className="rounded border-slate-300"
              />
              Контроль noindex
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
              onClick={applySample}
            >
              Пример: Википедия
            </button>
          </div>

          <button
            type="button"
            onClick={() => void runCheck()}
            disabled={loading || !donor.trim() || !link.trim() || !anchor.trim() || remaining <= 0}
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? "Проверяем…" : "Проверить ссылку"}
          </button>
          <p className="text-xs text-slate-500">
            Демо: {remaining} из {BACKLINK_DEMO_MAX_RUNS} проверок сегодня · 1 ссылка за запуск
          </p>
        </div>

        <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-800">Результат</p>
          {!result && !error && (
            <p className="mt-2 text-sm text-slate-500">
              Заполните поля и нажмите «Проверить ссылку» — или подставьте пример.
            </p>
          )}
          {error && (
            <p
              className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
              role="alert"
            >
              {error}
            </p>
          )}
          {result && (
            <div className="mt-4">
              <BacklinkDemoReport result={result} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <DemoUpgradePanel
          registerUrl={buildBacklinkRegisterUrl()}
          remaining={remaining}
          maxRuns={BACKLINK_DEMO_MAX_RUNS}
          fullMaxChars={0}
          moduleTitle="отслеживания ссылок"
          showRemaining={false}
          upgradeHint="Зарегистрируйтесь — создайте проект, включите ежедневный мониторинг и получайте оповещения, если ссылку сняли или изменили."
          details={BACKLINK_CABINET_FEATURES}
        />
      </div>

      <div className="mt-4">
        <DemoModuleLinks
          links={[
            { href: "/proverka-meta-tegov-online/", label: "Мониторинг мета-тегов" },
            { href: "/monitoring-saytov/", label: "Мониторинг сайтов" },
            { href: "/http-headers/", label: "HTTP-заголовки" },
            { href: "/tarify/", label: "Тарифы" },
          ]}
        />
      </div>
    </DemoWidgetShell>
  );
}

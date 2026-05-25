"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { CompetitorAnalysisDemoCapabilities } from "@/components/demo/CompetitorAnalysisDemoCapabilities";
import { CompetitorAnalysisDemoReport } from "@/components/demo/CompetitorAnalysisDemoReport";
import { DemoUpgradePanel } from "@/components/demo/DemoUpgradePanel";
import { DemoWidgetShell } from "@/components/demo/DemoWidgetShell";
import {
  DEMO_DEFAULT_GOOGLE_REGION_ID,
  DEMO_DEFAULT_REGION_ID,
  DEMO_MAX_PHRASE_LENGTH,
  DEMO_MIN_PHRASE_LENGTH,
  DEMO_TOP_DEPTHS,
} from "@/lib/demo/competitor-analysis-demo";
import { runCompetitorAnalysisDemo } from "@/lib/demo/run-competitor-analysis-client";
import type { CompetitorAnalysisDemoResult, CompetitorDemoRegion } from "@/lib/demo/types";

const DEMO_FEATURES = [
  "Яндекс и Google — как в кабинете",
  "Сравнение двух городов → геозависимость",
  "Живой ТОП-10 (в ЛК — 30/20/10)",
  "До 40 фраз, мета, релевантность",
] as const;

const FALLBACK_YANDEX: CompetitorDemoRegion[] = [
  { id: "213", label: "Москва" },
  { id: "2", label: "Санкт-Петербург" },
  { id: "193", label: "Воронеж" },
];

const FALLBACK_GOOGLE: CompetitorDemoRegion[] = [
  { id: DEMO_DEFAULT_GOOGLE_REGION_ID, label: "Москва" },
  { id: "1012040", label: "Санкт-Петербург" },
  { id: "1012077", label: "Воронеж" },
];

export function CompetitorAnalysisDemoWidget() {
  const phraseId = useId();
  const regionId = useId();
  const compareId = useId();
  const [phrase, setPhrase] = useState("");
  const [engine, setEngine] = useState<"yandex" | "google">("yandex");
  const [region, setRegion] = useState(DEMO_DEFAULT_REGION_ID);
  const [compareRegion, setCompareRegion] = useState("");
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [topDepth, setTopDepth] = useState(10);
  const [result, setResult] = useState<CompetitorAnalysisDemoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const yandexRegions = result?.limits.yandex_regions?.length
    ? result.limits.yandex_regions
    : FALLBACK_YANDEX;
  const googleRegions = result?.limits.google_regions?.length
    ? result.limits.google_regions
    : FALLBACK_GOOGLE;

  const regions = engine === "google" ? googleRegions : yandexRegions;

  const topDepths = result?.limits.top_depths?.length ? result.limits.top_depths : DEMO_TOP_DEPTHS;

  const compareOptions = useMemo(
    () => regions.filter((r) => r.id !== region),
    [regions, region]
  );

  const len = phrase.length;
  const overLimit = len > DEMO_MAX_PHRASE_LENGTH;
  const underMin = len > 0 && len < DEMO_MIN_PHRASE_LENGTH;
  const compareMissing = compareEnabled && !compareRegion;

  const onEngineChange = (next: "yandex" | "google") => {
    setEngine(next);
    setRegion(next === "google" ? DEMO_DEFAULT_GOOGLE_REGION_ID : DEMO_DEFAULT_REGION_ID);
    setCompareRegion("");
    setResult(null);
    setError(null);
  };

  const runDemo = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await runCompetitorAnalysisDemo({
        phrase: phrase.trim(),
        region_id: region,
        search_engine: engine,
        compare_region_id: compareEnabled && compareRegion ? compareRegion : undefined,
      });
      if (!res.ok) {
        setError(res.error.message ?? "Не удалось получить выдачу");
        if (res.status === 429 && result) {
          setResult({ ...result, remaining: 0 });
        }
        return;
      }
      setResult(res.data);
    } finally {
      setLoading(false);
    }
  }, [phrase, region, engine, compareEnabled, compareRegion, result]);

  const canRun =
    !loading && phrase.trim() !== "" && !overLimit && !underMin && !compareMissing;

  const loadingHint = compareEnabled
    ? "До 30 секунд — два запроса выдачи и расчёт геозависимости."
    : "Обычно 5–15 секунд — живой запрос к API.";

  return (
    <DemoWidgetShell
      title="Как в кабинете: ПС, города, гео, глубина топа"
      lead="Выберите Яндекс или Google, при желании второй город — увидите % геозависимости. В демо снимаем ТОП-10; в кабинете — до 30 URL (рекомендуемый)."
      features={DEMO_FEATURES}
      badge={
        result ? (
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
            Демо · ТОП-10
          </span>
        ) : undefined
      }
    >
      <CompetitorAnalysisDemoCapabilities />

      <div className="mt-8 space-y-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Поисковая система
          </span>
          <div className="mt-2 inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => onEngineChange("yandex")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                engine === "yandex"
                  ? "bg-white text-brand-800 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Яндекс
            </button>
            <button
              type="button"
              onClick={() => onEngineChange("google")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                engine === "google"
                  ? "bg-white text-brand-800 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Google
            </button>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Глубина выдачи (в кабинете)
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {topDepths.map((d) => {
              const active = topDepth === d.value;
              const disabled = !d.demo;
              return (
                <button
                  key={d.value}
                  type="button"
                  disabled={disabled}
                  title={disabled ? "В демо доступен только ТОП-10" : undefined}
                  onClick={() => !disabled && setTopDepth(d.value)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    disabled
                      ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                      : active
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-brand-400"
                  }`}
                >
                  {d.label}
                  {disabled ? " · в ЛК" : ""}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-700" htmlFor={phraseId}>
              Ключевая фраза
            </label>
            <input
              id={phraseId}
              type="text"
              className={`mt-2 w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-800 shadow-inner focus:bg-white focus:outline-none focus:ring-2 ${
                overLimit
                  ? "border-amber-400 focus:border-amber-500 focus:ring-amber-200"
                  : "border-slate-300 focus:border-brand-600 focus:ring-brand-200"
              }`}
              placeholder="Например: отоскоп купить"
              value={phrase}
              onChange={(e) => {
                setPhrase(e.target.value);
                setResult(null);
                setError(null);
              }}
            />
            <p className={`mt-1 text-xs ${overLimit ? "font-medium text-amber-700" : "text-slate-500"}`}>
              {len} / {DEMO_MAX_PHRASE_LENGTH} символов · в кабинете до 40 фраз
            </p>
          </div>

          <div className="lg:col-span-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                checked={compareEnabled}
                onChange={(e) => {
                  setCompareEnabled(e.target.checked);
                  if (!e.target.checked) setCompareRegion("");
                  setResult(null);
                  setError(null);
                }}
              />
              Сравнить с другим городом (геозависимость)
            </label>
            {!compareEnabled ? (
              <p className="mt-1 text-xs text-slate-500">
                Как вкладки «Москва ↔ Воронеж» в кабинете — % общих URL в топе.
              </p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor={regionId}>
              {compareEnabled ? "Основной город" : `Город (${engine === "google" ? "Google" : "Яндекс"})`}
            </label>
            <select
              id={regionId}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200"
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setCompareRegion("");
                setResult(null);
                setError(null);
              }}
            >
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {compareEnabled ? (
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor={compareId}>
                Второй город
              </label>
              <select
                id={compareId}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200 disabled:opacity-50"
                value={compareRegion}
                disabled={compareOptions.length === 0}
                onChange={(e) => {
                  setCompareRegion(e.target.value);
                  setResult(null);
                  setError(null);
                }}
              >
                <option value="">Выберите город…</option>
                {compareOptions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!canRun}
          onClick={() => void runDemo()}
          className="inline-flex rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Анализируем…" : "Показать выдачу"}
        </button>
        {loading ? <p className="text-xs text-slate-500">{loadingHint}</p> : null}
      </div>

      {error ? (
        <p
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-8 space-y-6">
          <CompetitorAnalysisDemoReport data={result} />
          <DemoUpgradePanel
            registerUrl={result.upgrade.register_url}
            remaining={result.remaining}
            maxRuns={result.limits.max_runs_per_day}
            fullMaxChars={40}
            moduleTitle="анализ конкурентов"
            upgradeHint="В кабинете: ТОП-30, 40 фраз, мета-теги, рекомендации, сравнение городов в SERP, экспорт и связка с анализом релевантности."
          />
        </div>
      ) : null}
    </DemoWidgetShell>
  );
}

"use client";

import { useCallback, useId, useState } from "react";
import { DemoModuleLinks } from "@/components/demo/DemoModuleLinks";
import { DemoUpgradePanel } from "@/components/demo/DemoUpgradePanel";
import { DemoWidgetShell } from "@/components/demo/DemoWidgetShell";
import {
  buildRoiCalcCabinetUrl,
  buildRoiCalcIdeasUrl,
  buildRoiCalcRegisterUrl,
  ROI_CALC_CABINET_FEATURES,
  ROI_CALC_UPGRADE_HINT,
} from "@/lib/demo/roi-calculator-demo";
import {
  calculateForecastMetrics,
  calculateRoiMetrics,
  ROI_CALC_EXAMPLE,
  ROI_FORECAST_EXAMPLE,
  type RoiCalcInputs,
  type RoiForecastInputs,
  type RoiMetricResult,
  type RoiMetricTheme,
} from "@/lib/demo/roi-calculator-process";

const DEMO_FEATURES = [
  "ROI, CTR, CPC, CPA и ещё 6 метрик",
  "Прогноз кликов и продаж по бюджету",
  "Подсветка окупаемости и выручки",
  "Без лимитов на этой странице",
] as const;

type Tab = "calc" | "forecast";

const THEME_BORDER: Record<RoiMetricTheme, string> = {
  danger: "border-t-red-500",
  warning: "border-t-amber-500",
  success: "border-t-emerald-500",
};

const HIGHLIGHT_TEXT: Record<NonNullable<RoiMetricResult["highlight"]>, string> = {
  green: "text-emerald-600",
  yellow: "text-amber-600",
  red: "text-red-600",
};

type Props = { nested?: boolean };

function MetricGrid({ metrics }: { metrics: RoiMetricResult[] }) {
  if (!metrics.some((m) => m.value !== "")) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
        Заполните поля и нажмите «Рассчитать».
      </p>
    );
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {metrics.map((m) => (
        <div
          key={m.code}
          className={`rounded-xl border border-slate-200 bg-white shadow-sm border-t-[3px] ${THEME_BORDER[m.theme]}`}
        >
          <div className="border-b border-slate-100 bg-slate-50/80 px-3 py-2">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span
                className={`text-lg font-bold tabular-nums ${m.highlight ? HIGHLIGHT_TEXT[m.highlight] : "text-slate-900"}`}
              >
                {m.code}
              </span>
              <span className="text-xs text-slate-500">{m.label}</span>
            </div>
          </div>
          <p className="px-3 py-3 text-center text-xl font-bold tabular-nums text-slate-900">
            {m.value || "—"}
            {m.unit ? (
              <span className="ml-0.5 text-sm font-semibold text-slate-500">{m.unit}</span>
            ) : null}
          </p>
        </div>
      ))}
    </div>
  );
}

function Field({
  id,
  label,
  labelTone,
  value,
  onChange,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  labelTone?: "cost" | "traffic" | "conv" | "check";
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const toneClass =
    labelTone === "cost"
      ? "text-red-600"
      : labelTone === "traffic"
        ? "text-amber-700"
        : labelTone === "conv"
          ? "text-emerald-700"
          : labelTone === "check"
            ? "text-sky-700"
            : "text-slate-700";

  return (
    <div>
      <label htmlFor={id} className={`mb-1 block text-sm font-medium ${toneClass}`}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}

export function RoiCalculatorDemoWidget({ nested }: Props) {
  const baseId = useId();
  const [tab, setTab] = useState<Tab>("calc");
  const [calcInputs, setCalcInputs] = useState<RoiCalcInputs>(ROI_CALC_EXAMPLE);
  const [forecastInputs, setForecastInputs] = useState<RoiForecastInputs>(ROI_FORECAST_EXAMPLE);
  const [calcMetrics, setCalcMetrics] = useState<RoiMetricResult[]>([]);
  const [forecastMetrics, setForecastMetrics] = useState<RoiMetricResult[]>([]);

  const patchCalc = (key: keyof RoiCalcInputs, value: string) => {
    setCalcInputs((prev) => ({ ...prev, [key]: value }));
  };

  const patchForecast = (key: keyof RoiForecastInputs, value: string) => {
    setForecastInputs((prev) => ({ ...prev, [key]: value }));
  };

  const runCalc = useCallback(() => {
    setCalcMetrics(calculateRoiMetrics(calcInputs));
  }, [calcInputs]);

  const runForecast = useCallback(() => {
    setForecastMetrics(calculateForecastMetrics(forecastInputs));
  }, [forecastInputs]);

  const resetCalc = () => {
    setCalcInputs({
      cost: "",
      income: "",
      views: "",
      clicks: "",
      actions: "",
      sales: "",
    });
    setCalcMetrics([]);
  };

  const resetForecast = () => {
    setForecastInputs({
      budget: "",
      clickCost: "",
      convAction: "",
      convSales: "",
      avgCheck: "",
    });
    setForecastMetrics([]);
  };

  const loadExample = () => {
    if (tab === "calc") {
      setCalcInputs(ROI_CALC_EXAMPLE);
      setCalcMetrics(calculateRoiMetrics(ROI_CALC_EXAMPLE));
    } else {
      setForecastInputs(ROI_FORECAST_EXAMPLE);
      setForecastMetrics(calculateForecastMetrics(ROI_FORECAST_EXAMPLE));
    }
  };

  const demoBody = (
    <>
      <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-white to-brand-50 px-4 py-3.5 sm:px-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">Без регистрации</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">
          Считайте ROI и прогноз трафика сколько угодно —{" "}
          <span className="font-semibold text-slate-900">без лимитов</span>. В кабинете — тот же калькулятор плюс
          мониторинг, семантика, UTM и другие модули платформы.
        </p>
      </div>

      <div
        className="mt-6 inline-flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1"
        role="tablist"
        aria-label="Режим калькулятора"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "calc"}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            tab === "calc"
              ? "bg-brand-600 text-white shadow-sm"
              : "text-brand-700 hover:bg-white"
          }`}
          onClick={() => setTab("calc")}
        >
          Калькулятор ROI
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "forecast"}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            tab === "forecast"
              ? "bg-brand-600 text-white shadow-sm"
              : "text-brand-700 hover:bg-white"
          }`}
          onClick={() => setTab("forecast")}
        >
          Прогноз трафика
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900">
            {tab === "calc" ? "Исходные данные" : "Параметры прогноза"}
          </h4>
          {tab === "calc" ? (
            <div className="mt-3 space-y-3">
              <Field
                id={`${baseId}-cost`}
                label="Стоимость РК"
                labelTone="cost"
                value={calcInputs.cost}
                onChange={(v) => patchCalc("cost", v)}
                placeholder="₽"
                required
              />
              <Field
                id={`${baseId}-income`}
                label="Доход от РК"
                labelTone="cost"
                value={calcInputs.income}
                onChange={(v) => patchCalc("income", v)}
                placeholder="₽"
                required
              />
              <Field
                id={`${baseId}-views`}
                label="Просмотры"
                labelTone="traffic"
                value={calcInputs.views}
                onChange={(v) => patchCalc("views", v)}
              />
              <Field
                id={`${baseId}-clicks`}
                label="Клики"
                labelTone="traffic"
                value={calcInputs.clicks}
                onChange={(v) => patchCalc("clicks", v)}
              />
              <Field
                id={`${baseId}-actions`}
                label="Заявки, звонки"
                labelTone="conv"
                value={calcInputs.actions}
                onChange={(v) => patchCalc("actions", v)}
              />
              <Field
                id={`${baseId}-sales`}
                label="Продажи"
                labelTone="conv"
                value={calcInputs.sales}
                onChange={(v) => patchCalc("sales", v)}
              />
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              <Field
                id={`${baseId}-budget`}
                label="Бюджет РК"
                labelTone="cost"
                value={forecastInputs.budget}
                onChange={(v) => patchForecast("budget", v)}
                required
              />
              <Field
                id={`${baseId}-cpc`}
                label="Средняя цена клика"
                labelTone="traffic"
                value={forecastInputs.clickCost}
                onChange={(v) => patchForecast("clickCost", v)}
                required
              />
              <Field
                id={`${baseId}-conv-a`}
                label="Конверсия в действие, %"
                labelTone="conv"
                value={forecastInputs.convAction}
                onChange={(v) => patchForecast("convAction", v)}
              />
              <Field
                id={`${baseId}-conv-s`}
                label="Конверсия в продажу, %"
                labelTone="conv"
                value={forecastInputs.convSales}
                onChange={(v) => patchForecast("convSales", v)}
              />
              <Field
                id={`${baseId}-check`}
                label="Средний чек"
                labelTone="check"
                value={forecastInputs.avgCheck}
                onChange={(v) => patchForecast("avgCheck", v)}
              />
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
              onClick={tab === "calc" ? runCalc : runForecast}
            >
              Рассчитать
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              onClick={tab === "calc" ? resetCalc : resetForecast}
            >
              Очистить
            </button>
            <button
              type="button"
              className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-100"
              onClick={loadExample}
            >
              Пример
            </button>
          </div>
        </div>

        <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {tab === "calc" ? "Показатели эффективности" : "Прогноз по бюджету"}
          </h4>
          <div className="mt-3">
            <MetricGrid metrics={tab === "calc" ? calcMetrics : forecastMetrics} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <DemoUpgradePanel
          registerUrl={buildRoiCalcRegisterUrl()}
          remaining={1}
          maxRuns={1}
          fullMaxChars={0}
          moduleTitle="платформы Датагон"
          showRemaining={false}
          upgradeHint={ROI_CALC_UPGRADE_HINT}
          details={ROI_CALC_CABINET_FEATURES}
        />
      </div>

      <div className="mt-4">
        <DemoModuleLinks
          links={[
            { href: "/services/", label: "Все модули" },
            { href: buildRoiCalcCabinetUrl(), label: "Открыть в кабинете" },
            { href: buildRoiCalcIdeasUrl(), label: "Доска идей" },
            { href: "/utm-metki/", label: "UTM-метки" },
            { href: "/generator_slov/", label: "Генератор слов" },
          ]}
        />
      </div>
    </>
  );

  if (nested) {
    return (
      <div className="p-6 md:p-8 lg:p-10">
        <ul className="mb-6 flex flex-wrap gap-2 lg:hidden">
          {DEMO_FEATURES.map((f) => (
            <li
              key={f}
              className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800"
            >
              {f}
            </li>
          ))}
        </ul>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">{demoBody}</div>
          <aside className="sticky top-20 hidden self-start lg:block">
            <div className="rounded-xl border border-brand-100 bg-gradient-to-b from-brand-50 to-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">В демо</p>
              <ul className="mt-4 space-y-3">
                {DEMO_FEATURES.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-slate-700">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <DemoWidgetShell
      title="Посчитайте ROI рекламной кампании"
      lead="Два режима — факт по завершённой РК и прогноз по бюджету. Как в кабинете, без лимитов."
      features={DEMO_FEATURES}
    >
      {demoBody}
    </DemoWidgetShell>
  );
}

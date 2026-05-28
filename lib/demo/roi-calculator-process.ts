/** Калькулятор ROI — порт логики кабинета (`public/plugins/roi/js/calc.js`, v1.1). */

export type RoiMetricTheme = "danger" | "warning" | "success";

export type RoiMetricResult = {
  code: string;
  label: string;
  value: string;
  unit: string;
  theme: RoiMetricTheme;
  highlight?: "green" | "yellow" | "red";
};

export type RoiCalcInputs = {
  cost: string;
  income: string;
  views: string;
  clicks: string;
  actions: string;
  sales: string;
};

export type RoiForecastInputs = {
  budget: string;
  clickCost: string;
  convAction: string;
  convSales: string;
  avgCheck: string;
};

export const ROI_CALC_EXAMPLE: RoiCalcInputs = {
  cost: "10000",
  income: "15000",
  views: "100000",
  clicks: "5000",
  actions: "500",
  sales: "100",
};

export const ROI_FORECAST_EXAMPLE: RoiForecastInputs = {
  budget: "10000",
  clickCost: "50",
  convAction: "10",
  convSales: "20",
  avgCheck: "5000",
};

function num(val: string): number {
  const n = parseFloat(val);
  return Number.isFinite(n) ? n : 0;
}

function safeRatio(numerator: number, denominator: number): number | null {
  if (!denominator) return null;
  return numerator / denominator;
}

function formatPercent(ratio: number | null, decimals = 2): string {
  if (ratio === null || !Number.isFinite(ratio)) return "";
  return (ratio * 100).toFixed(decimals);
}

function formatNumber(value: number | null, decimals = 0): string {
  if (value === null || !Number.isFinite(value)) return "";
  return value.toFixed(decimals);
}

function roiHighlight(roiPct: number | null): RoiMetricResult["highlight"] | undefined {
  if (roiPct === null) return undefined;
  const v = roiPct * 100;
  if (v > 100) return "green";
  if (v > 0) return "yellow";
  return "red";
}

export function calculateRoiMetrics(raw: RoiCalcInputs): RoiMetricResult[] {
  const cost = num(raw.cost);
  const income = num(raw.income);
  const views = num(raw.views);
  const clicks = num(raw.clicks);
  const actions = num(raw.actions);
  const sales = num(raw.sales);

  const roiPct = safeRatio(income - cost, cost);
  const ctr = safeRatio(clicks, views);
  const ctc = safeRatio(actions, clicks);
  const ctb = safeRatio(sales, actions);
  const cpm = safeRatio(cost, views);
  const cpc = safeRatio(cost, clicks);
  const cpa = safeRatio(cost, actions);
  const cps = safeRatio(cost, sales);
  const apv = safeRatio(income, sales);
  const apc = safeRatio(income, clicks);

  return [
    {
      code: "ROI",
      label: "Окупаемость вложений",
      value: formatPercent(roiPct, 0),
      unit: "%",
      theme: "danger",
      highlight: roiHighlight(roiPct),
    },
    {
      code: "CTR",
      label: "Из показов в клики",
      value: formatPercent(ctr, 2),
      unit: "%",
      theme: "danger",
    },
    {
      code: "CTC",
      label: "Из кликов в действия",
      value: formatPercent(ctc, 2),
      unit: "%",
      theme: "danger",
    },
    {
      code: "CTB",
      label: "Конверсия из действий в покупки",
      value: formatPercent(ctb, 2),
      unit: "%",
      theme: "danger",
    },
    {
      code: "CPM",
      label: "Цена за 1000 показов",
      value: cpm === null ? "" : formatNumber(cpm * 1000, 1),
      unit: "₽",
      theme: "warning",
    },
    {
      code: "CPC",
      label: "Цена за клик",
      value: formatNumber(cpc, 1),
      unit: "₽",
      theme: "warning",
    },
    {
      code: "CPA",
      label: "Цена за действие",
      value: formatNumber(cpa, 1),
      unit: "₽",
      theme: "warning",
    },
    {
      code: "CPS",
      label: "Цена за продажу",
      value: formatNumber(cps, 1),
      unit: "₽",
      theme: "warning",
    },
    {
      code: "APV",
      label: "Средний чек за покупку",
      value: formatNumber(apv, 1),
      unit: "₽",
      theme: "success",
    },
    {
      code: "APC",
      label: "Средний чек за визит",
      value: formatNumber(apc, 1),
      unit: "₽",
      theme: "success",
    },
  ];
}

export function calculateForecastMetrics(raw: RoiForecastInputs): RoiMetricResult[] {
  const budget = num(raw.budget);
  const clickCost = num(raw.clickCost);
  const convAction = num(raw.convAction);
  const convSales = num(raw.convSales);
  const avgCheck = num(raw.avgCheck);

  const clicks = safeRatio(budget, clickCost);
  const actions = clicks === null ? null : clicks * (convAction / 100);
  const sales = actions === null ? null : actions * (convSales / 100);
  const revenue = sales === null ? null : sales * avgCheck;
  const roiPct = revenue === null ? null : safeRatio(revenue - budget, budget);

  const revenueHighlight: RoiMetricResult["highlight"] | undefined =
    revenue === null ? undefined : revenue < budget ? "red" : "green";

  return [
    {
      code: "CLI",
      label: "Клики",
      value: formatNumber(clicks, 0),
      unit: "",
      theme: "danger",
    },
    {
      code: "ACT",
      label: "Целевые действия",
      value: formatNumber(actions, 0),
      unit: "",
      theme: "danger",
    },
    {
      code: "SAL",
      label: "Продажи",
      value: formatNumber(sales, 0),
      unit: "",
      theme: "danger",
    },
    {
      code: "REV",
      label: "Доход",
      value: formatNumber(revenue, 0),
      unit: "₽",
      theme: "danger",
      highlight: revenueHighlight,
    },
    {
      code: "ROI",
      label: "Окупаемость вложений",
      value: formatPercent(roiPct, 0),
      unit: "%",
      theme: "warning",
      highlight: roiHighlight(roiPct),
    },
  ];
}

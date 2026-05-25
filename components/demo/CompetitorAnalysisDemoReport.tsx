"use client";

import type { CompetitorAnalysisDemoResult, CompetitorDemoGeo } from "@/lib/demo/types";

const LOCKED_LABELS: Record<string, string> = {
  meta_tags: "Мета-теги конкурентов (title, description, H1…)",
  recommendations: "Рекомендации по мета-тегам из выдачи",
  multi_phrase: "До 40 фраз за один запуск",
  site_parsing: "Полный разбор HTML страниц конкурентов",
  export_xls: "Экспорт матрицы в Excel",
  top_20_30: "Съём выдачи ТОП-20 и ТОП-30",
  relevance_module: "Анализ релевантности вашей страницы",
  geo_dependency_full: "Гео по всем фразам и парам городов",
  serp_city_compare_ui: "Две выдачи в колонке + подсветка URL",
};

const MARKETPLACE_HOSTS = new Set([
  "ozon.ru",
  "wildberries.ru",
  "market.yandex.ru",
  "aliexpress.ru",
  "megamarket.ru",
  "avito.ru",
]);

function normalizeHost(host: string): string {
  return host.replace(/^www\./i, "").toLowerCase();
}

function excludedDomainLabel(host: string): string {
  const h = normalizeHost(host);
  for (const entry of MARKETPLACE_HOSTS) {
    if (h === entry || h.endsWith(`.${entry}`)) {
      return "Маркетплейс";
    }
  }
  return "Агрегатор";
}

function ExcludedDomainsHint({
  sample,
  total,
  foundHosts,
}: {
  sample?: string[];
  total?: number;
  foundHosts: string[];
}) {
  if (!sample?.length && foundHosts.length === 0) {
    return null;
  }

  return (
    <details className="mt-3 rounded-lg border border-white/60 bg-white/50 p-3">
      <summary className="cursor-pointer text-xs font-semibold text-slate-700">
        Исключённые домены
        {total != null ? (
          <span className="ml-1 rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
            {total}
          </span>
        ) : null}
      </summary>
      {foundHosts.length > 0 ? (
        <p className="mt-2 text-xs text-slate-600">
          В этой выдаче:{" "}
          {foundHosts.map((host) => (
            <span
              key={host}
              className="mr-1 mt-1 inline-block rounded-md border border-amber-300 bg-amber-100 px-1.5 py-0.5 font-mono text-[11px] text-amber-900"
            >
              {host}
            </span>
          ))}
        </p>
      ) : null}
      {sample?.length ? (
        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
          Базовый список: {sample.join(", ")}
          {total != null && total > sample.length ? ` и ещё ${total - sample.length}` : ""}
        </p>
      ) : null}
    </details>
  );
}

function geoAlertClass(status: string): string {
  if (status === "geo_independent") return "border-emerald-200 bg-emerald-50 text-emerald-900";
  if (status === "geo_dependent") return "border-amber-200 bg-amber-50 text-amber-900";
  return "border-sky-200 bg-sky-50 text-sky-900";
}

function GeoVerdictCard({
  geo,
  excludedHosts,
}: {
  geo: CompetitorDemoGeo;
  excludedHosts: string[];
}) {
  return (
    <div className={`rounded-xl border-2 p-4 md:p-5 ${geoAlertClass(geo.status)}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Геозависимость (демо)</p>
          <h3 className="mt-1 text-lg font-bold">{geo.status_label}</h3>
          <p className="mt-2 text-sm opacity-90">
            {geo.region_a.label} ↔ {geo.region_b.label}: совпадение топ-URL{" "}
            <strong>{geo.overlap_pct ?? "—"}%</strong>
            {geo.overlap_pct_a != null && geo.overlap_pct_b != null ? (
              <span className="text-xs opacity-80">
                {" "}
                (доля в топе: {geo.overlap_pct_a}% / {geo.overlap_pct_b}%)
              </span>
            ) : null}
          </p>
        </div>
        <div className="rounded-lg bg-white/70 px-3 py-2 text-center shadow-sm">
          <div className="text-2xl font-bold tabular-nums">{geo.overlap_pct ?? "—"}%</div>
          <div className="text-[10px] uppercase tracking-wide opacity-70">совпадение</div>
        </div>
      </div>
      {geo.shared_count > 0 ? (
        <div className="mt-4 rounded-lg bg-white/60 p-3">
          <p className="text-xs font-semibold text-slate-700">
            Общие страницы в топе ({geo.shared_count})
          </p>
          <ul className="mt-2 space-y-1">
            {geo.shared_urls.map((url) => (
              <li key={url} className="truncate text-xs font-mono text-slate-600" title={url}>
                {url}
              </li>
            ))}
          </ul>
          {geo.shared_count > geo.shared_urls.length ? (
            <p className="mt-1 text-[10px] text-slate-500">
              +{geo.shared_count - geo.shared_urls.length} в кабинете
            </p>
          ) : null}
        </div>
      ) : null}
      <p className="mt-3 text-xs opacity-75">
        Расчёт % — только по прямым конкурентам: маркетплейсы и агрегаторы исключены, как в кабинете.
      </p>
      <ExcludedDomainsHint
        sample={geo.excluded_domains_sample}
        total={geo.excluded_domains_total}
        foundHosts={excludedHosts}
      />
    </div>
  );
}

type Props = {
  data: CompetitorAnalysisDemoResult;
};

export function CompetitorAnalysisDemoReport({ data }: Props) {
  const { result } = data;
  const { serp, region, compare_region: compareRegion, geo } = result;
  const excludedRows = serp.excluded_rows ?? [];
  const excludedCount = serp.excluded_count ?? 0;
  const excludedHosts = excludedRows.map((row) => row.host);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-brand-50/50 px-4 py-3 text-sm">
        <span className="font-semibold text-slate-900">{result.phrase}</span>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-brand-800 shadow-sm">
          {result.engine_label}
        </span>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700 shadow-sm">
          {region.label}
        </span>
        <span className="text-xs text-slate-500">ТОП-{result.top_count} (демо)</span>
        {compareRegion ? (
          <span className="text-xs text-slate-500">+ сравнение с {compareRegion.label}</span>
        ) : null}
      </div>

      {geo ? <GeoVerdictCard geo={geo} excludedHosts={excludedHosts} /> : null}

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">
            Прямые конкуренты — {result.engine_label} · {region.label}
          </h3>
          {serp.excludes_aggregators ? (
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
              без маркетплейсов и агрегаторов
            </span>
          ) : null}
        </div>
        {serp.rows.length === 0 ? (
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            В ТОП-{result.top_count} только маркетплейсы и агрегаторы — геозависимость в таком случае не
            оценивается (как в кабинете).
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100/80 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="w-12 px-3 py-2.5 font-semibold">#</th>
                  <th className="px-3 py-2.5 font-semibold">Домен</th>
                  <th className="px-3 py-2.5 font-semibold">URL</th>
                </tr>
              </thead>
              <tbody>
                {serp.rows.map((row) => (
                  <tr
                    key={`${row.serp_position}-${row.url}`}
                    className="border-t border-slate-100 hover:bg-slate-50/80"
                  >
                    <td className="px-3 py-2.5 font-mono text-slate-500">{row.position}</td>
                    <td className="px-3 py-2.5 font-medium text-slate-800">{row.host}</td>
                    <td className="max-w-[280px] truncate px-3 py-2.5">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-700 hover:underline"
                        title={row.url}
                      >
                        {row.path}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {serp.shown > 0 || excludedCount > 0 ? (
          <p className="mt-2 text-xs text-slate-500">
            {serp.shown} прямых конкурентов из {serp.total} URL в ТОП-{result.top_count}.
            {excludedCount > 0
              ? ` Исключено ${excludedCount} маркетплейсов/агрегаторов — см. ниже.`
              : ""}
          </p>
        ) : null}
      </div>

      {excludedCount > 0 ? (
        <div className="rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/70 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-amber-950">
                Исключено из таблицы и расчёта гео
              </h3>
              <p className="mt-1 text-xs text-amber-900/80">
                Позиции в исходной выдаче — домены не участвуют в сравнении городов.
              </p>
            </div>
            <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-950">
              {excludedCount}
            </span>
          </div>
          <div className="mt-3 overflow-x-auto rounded-lg border border-amber-200/80 bg-white/80">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-amber-100/60 text-xs uppercase tracking-wide text-amber-900/70">
                <tr>
                  <th className="w-14 px-3 py-2 font-semibold">В SERP</th>
                  <th className="px-3 py-2 font-semibold">Домен</th>
                  <th className="px-3 py-2 font-semibold">Тип</th>
                  <th className="px-3 py-2 font-semibold">URL</th>
                </tr>
              </thead>
              <tbody>
                {excludedRows.map((row) => (
                  <tr
                    key={`ex-${row.serp_position}-${row.url}`}
                    className="border-t border-amber-100 text-slate-600"
                  >
                    <td className="px-3 py-2 font-mono text-amber-800/70">#{row.serp_position}</td>
                    <td className="px-3 py-2 font-medium line-through decoration-amber-400/80">
                      {row.host}
                    </td>
                    <td className="px-3 py-2">
                      <span className="rounded-md bg-amber-200/80 px-2 py-0.5 text-[11px] font-semibold text-amber-950">
                        {excludedDomainLabel(row.host)}
                      </span>
                    </td>
                    <td className="max-w-[220px] truncate px-3 py-2 opacity-70">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-900/80 hover:underline"
                        title={row.url}
                      >
                        {row.path}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ExcludedDomainsHint
            sample={serp.excluded_domains_sample}
            total={serp.excluded_domains_total}
            foundHosts={excludedHosts}
          />
        </div>
      ) : null}

      {compareRegion && !geo ? (
        <p className="text-sm text-amber-800 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
          Сравнение с {compareRegion.label} не удалось рассчитать. Повторите запрос.
        </p>
      ) : null}

      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/90 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Полный модуль в кабинете
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {result.locked.map((key) => (
            <li key={key} className="flex gap-2 text-sm text-slate-600">
              <span className="text-brand-600" aria-hidden>
                →
              </span>
              {LOCKED_LABELS[key] ?? key}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

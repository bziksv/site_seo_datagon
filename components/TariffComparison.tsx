import { TARIFF_COMPARE, TARIFF_COMPARE_ROWS, TARIFF_PLANS } from "@/lib/content/tariffs";

export function TariffComparison() {
  const columns = TARIFF_PLANS.map((p) => ({ id: p.id, name: p.name, highlighted: p.highlighted }));

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-4 font-semibold text-slate-700">Модуль / лимит</th>
            {TARIFF_PLANS.map((plan) => (
              <th
                key={plan.name}
                className={`px-4 py-4 text-center font-bold ${
                  plan.highlighted ? "bg-brand-50 text-brand-700" : "text-slate-900"
                }`}
              >
                {plan.name}
                {plan.badge && (
                  <span className="mt-1 block text-xs font-medium text-brand-600">{plan.badge}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TARIFF_COMPARE_ROWS.map((row, i) => (
            <tr
              key={row.key}
              className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
            >
              <td className="border-t border-slate-100 px-4 py-3 font-medium text-slate-700">
                {row.label}
              </td>
              {columns.map((col) => (
                <td
                  key={col.id}
                  className={`border-t border-slate-100 px-4 py-3 text-center tabular-nums text-slate-800 ${
                    col.highlighted ? "bg-brand-50/50 font-semibold" : "font-medium"
                  }`}
                >
                  {TARIFF_COMPARE[row.key][col.id]}
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-brand-50/30">
            <td className="border-t border-slate-200 px-4 py-3 font-medium text-slate-700">
              Утилиты (генераторы, UTM, ROI…)
            </td>
            <td colSpan={4} className="border-t border-slate-200 px-4 py-3 text-center font-medium text-emerald-700">
              Без ограничений на всех тарифах
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

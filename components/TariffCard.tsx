import { LK_URL } from "@/lib/site";
import type { TariffPlan } from "@/lib/content/tariffs";
import {
  TARIFF_CARD_MODULE_ROWS,
  TARIFF_CARD_UTILS,
  tariffCardModuleValue,
} from "@/lib/content/tariff-card-layout";

type Props = {
  plan: TariffPlan;
  highlighted?: boolean;
};

export function TariffCard({ plan, highlighted }: Props) {
  const isPopular = highlighted || plan.badge;

  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg ${
        isPopular ? "z-10 border-brand-500 shadow-md ring-2 ring-brand-200" : "border-slate-200 hover:border-brand-200"
      }`}
    >
      {plan.badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
          {plan.badge}
        </span>
      ) : (
        <span className="pointer-events-none absolute -top-3 left-1/2 h-6 w-px opacity-0" aria-hidden />
      )}

      <div className="min-h-[7.5rem]">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{plan.tagline}</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">{plan.name}</h3>
        <div className="mt-3 min-h-[3.25rem] border-b border-slate-100 pb-4">
          {plan.pricePerDay === 0 ? (
            <p className="text-3xl font-bold text-brand-600">
              0 <span className="text-lg font-normal text-slate-500">₽</span>
            </p>
          ) : (
            <p className="text-3xl font-bold text-brand-600">
              {plan.pricePerDay.toLocaleString("ru-RU")}{" "}
              <span className="text-lg font-normal text-slate-500">₽ / день</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex-1">
        <p className="mb-2 text-xs font-bold uppercase text-brand-600">Платные модули</p>
        <ul className="space-y-0 text-sm text-slate-600">
          {TARIFF_CARD_MODULE_ROWS.map((row) => {
            const value = tariffCardModuleValue(plan.id, row.key);
            return (
              <li key={row.key} className="flex min-h-[3rem] gap-2 border-b border-slate-50 py-2 leading-snug last:border-b-0">
                <span className="mt-0.5 shrink-0 font-bold text-emerald-600" aria-hidden>
                  ✓
                </span>
                <span>
                  <span className="block text-slate-700">{row.label}</span>
                  <span className="block font-semibold text-slate-900">{value ?? "—"}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mb-2 mt-5 text-xs font-bold uppercase text-emerald-700">Утилиты</p>
        <ul className="space-y-0 text-sm text-slate-600">
          {TARIFF_CARD_UTILS.map((label) => (
            <li key={label} className="flex min-h-[2rem] items-start gap-2 py-1 leading-snug">
              <span className="mt-0.5 shrink-0 font-bold text-emerald-600" aria-hidden>
                ✓
              </span>
              <span>
                {label}: <span className="font-medium text-slate-800">без ограничений</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={`${LK_URL}/register`}
        className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold transition ${
          isPopular
            ? "bg-brand-600 text-white shadow hover:bg-brand-700"
            : "border-2 border-brand-200 bg-brand-50 text-brand-700 hover:border-brand-400 hover:bg-brand-100"
        }`}
      >
        {plan.id === "Free" ? "Начать бесплатно" : "Выбрать тариф"}
      </a>
    </article>
  );
}

import { OFFICE_MAP_EMBED } from "@/lib/content/contact";

/** Карта офиса (тот же конструктор, что на redbox.su/contact) */
export function OfficeYandexMap() {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
      <iframe
        title="Офис на карте — Воронеж, Московский проспект 19"
        src={OFFICE_MAP_EMBED}
        className="h-[400px] w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

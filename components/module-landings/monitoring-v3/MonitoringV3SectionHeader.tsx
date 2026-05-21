type Tone = "brand" | "violet" | "emerald" | "neutral";

const EYEBROW: Record<Tone, string> = {
  brand: "text-brand-400",
  violet: "text-violet-400",
  emerald: "text-emerald-400",
  neutral: "text-slate-500",
};

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
};

export function MonitoringV3SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "brand",
  align = "left",
  className = "",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <header className={`max-w-3xl ${alignClass} ${className}`}>
      <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${EYEBROW[tone]}`}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {lead && <p className={`mt-4 text-slate-400 leading-relaxed ${align === "center" ? "max-w-2xl" : ""}`}>{lead}</p>}
    </header>
  );
}

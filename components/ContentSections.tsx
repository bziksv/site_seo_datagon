export type Section = {
  title: string;
  paragraphs: string[];
};

type Props = {
  sections: Section[];
  className?: string;
};

/** Секции как на Kraken: заголовок + абзацы, типографика prose */
export function ContentSections({ sections, className = "" }: Props) {
  if (!sections.length) return null;

  return (
    <div className={`prose-sections space-y-14 ${className}`}>
      {sections.map((section, idx) => (
        <section
          key={`${section.title}-${idx}`}
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="border-l-4 border-brand-500 pl-4 text-xl font-bold text-slate-900 md:text-2xl">
            {section.title}
          </h2>
          <div className="mt-5 space-y-4">
            {section.paragraphs.map((p, i) => (
              <p key={`${section.title}-p-${i}`} className="leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

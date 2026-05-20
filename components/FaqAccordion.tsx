"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/content/faq";

type Props = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl border bg-white transition ${
              isOpen ? "border-brand-200 shadow-md" : "border-slate-200 shadow-sm"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-900 hover:bg-slate-50/80"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="pr-4">{item.question}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg ${
                  isOpen ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-5 text-[1.05rem] leading-relaxed text-slate-700">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

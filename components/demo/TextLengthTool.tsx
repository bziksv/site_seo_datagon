"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { analyzeText } from "@/lib/demo/text-stats";
import { LK_URL } from "@/lib/site";

const PLACEHOLDER = `Вставьте текст для анализа — как в модуле «Подсчёт длины текста» в кабинете Датагон.`;

export function TextLengthTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => analyzeText(text), [text]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Демо: подсчёт длины текста</h2>
      <p className="mt-2 text-sm text-slate-600">
        Попробуйте инструмент прямо на сайте. Полная версия с сохранением и дополнительными опциями — в
        личном кабинете.
      </p>

      <textarea
        className="mt-6 min-h-[160px] w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200"
        placeholder={PLACEHOLDER}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-slate-50 px-4 py-3">
          <dt className="text-xs text-slate-500">Символов с пробелами</dt>
          <dd className="mt-1 text-2xl font-semibold text-brand-600">{stats.charsWithSpaces}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 px-4 py-3">
          <dt className="text-xs text-slate-500">Символов без пробелов</dt>
          <dd className="mt-1 text-2xl font-semibold text-brand-600">{stats.charsNoSpaces}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 px-4 py-3">
          <dt className="text-xs text-slate-500">Слов</dt>
          <dd className="mt-1 text-2xl font-semibold text-brand-600">{stats.words}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 px-4 py-3">
          <dt className="text-xs text-slate-500">Строк</dt>
          <dd className="mt-1 text-2xl font-semibold text-brand-600">{stats.lines}</dd>
        </div>
      </dl>

      <p className="mt-6 text-center text-sm text-slate-500">
        <a href={`${LK_URL}/register`} className="font-medium text-brand-600 hover:text-brand-700">
          Зарегистрироваться →
        </a>
        {" · "}
        <Link href="/podschet-dliny-teksta/" className="text-brand-600 hover:text-brand-700">
          О модуле
        </Link>
      </p>
    </div>
  );
}

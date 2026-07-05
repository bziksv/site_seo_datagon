"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { DemoModuleLinks } from "@/components/demo/DemoModuleLinks";
import { DemoUpgradePanel } from "@/components/demo/DemoUpgradePanel";
import { DemoWidgetShell } from "@/components/demo/DemoWidgetShell";
import {
  buildKeywordGenCabinetUrl,
  buildKeywordGenIdeasUrl,
  buildKeywordGenRegisterUrl,
  KEYWORD_GEN_CABINET_FEATURES,
  KEYWORD_GEN_UPGRADE_HINT,
} from "@/lib/demo/keyword-generator-demo";
import {
  countCombinations,
  DEFAULT_KW_GLOBAL_OPTIONS,
  filterPhrases,
  generateKeywordCombinations,
  KW_GEN_EXAMPLE_LISTS,
  KW_GEN_MAX_LISTS,
  parseWordListText,
  type KwGlobalOptions,
} from "@/lib/demo/keyword-generator-process";

const DEMO_FEATURES = [
  "До 5 списков слов",
  "Операторы «» и [], стоп-слова «+»",
  "Разбивка фраз по длине",
  "Фильтр и копирование результата",
  "Без лимитов на этой странице",
] as const;

type WordListState = { id: string; wordsText: string };

function newListId(): string {
  return `list-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function defaultLists(): WordListState[] {
  return [
    { id: newListId(), wordsText: KW_GEN_EXAMPLE_LISTS[0].join("\n") },
    { id: newListId(), wordsText: KW_GEN_EXAMPLE_LISTS[1].join("\n") },
  ];
}

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

type Props = { nested?: boolean };

export function KeywordGeneratorDemoWidget({ nested }: Props) {
  const filterId = useId();
  const [lists, setLists] = useState<WordListState[]>(defaultLists);
  const [global, setGlobal] = useState<KwGlobalOptions>(DEFAULT_KW_GLOBAL_OPTIONS);
  const [result, setResult] = useState<string[]>([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const parsedLists = useMemo(
    () => lists.map((l) => parseWordListText(l.wordsText)),
    [lists]
  );

  const previewCount = useMemo(() => countCombinations(parsedLists, global), [parsedLists, global]);

  const visibleResult = useMemo(() => filterPhrases(result, filter), [result, filter]);

  const loadExample = () => {
    setLists(
      KW_GEN_EXAMPLE_LISTS.map((words) => ({
        id: newListId(),
        wordsText: words.join("\n"),
      }))
    );
    setError(null);
    setResult([]);
  };

  const addList = () => {
    if (lists.length >= KW_GEN_MAX_LISTS) return;
    setLists((prev) => [...prev, { id: newListId(), wordsText: "" }]);
  };

  const removeList = (id: string) => {
    if (lists.length <= 1) return;
    setLists((prev) => prev.filter((l) => l.id !== id));
  };

  const updateList = (id: string, wordsText: string) => {
    setLists((prev) => prev.map((l) => (l.id === id ? { ...l, wordsText } : l)));
    setError(null);
  };

  const toggleGlobal = (key: keyof KwGlobalOptions) => {
    setGlobal((prev) => {
      if (typeof prev[key] === "boolean") {
        return { ...prev, [key]: !prev[key] };
      }
      return prev;
    });
    setError(null);
  };

  const generate = useCallback(() => {
    const hasWords = parsedLists.some((w) => w.length > 0);
    if (!hasWords) {
      setError("Добавьте хотя бы одно слово в любой список.");
      setResult([]);
      return;
    }
    if (global.getAllPhrasesByLength && global.getAllPhrasesFrom > global.getAllPhrasesTo) {
      setError("«От» не может быть больше «до» в разбивке по длине.");
      setResult([]);
      return;
    }
    setError(null);
    setResult(generateKeywordCombinations(parsedLists, global));
  }, [parsedLists, global]);

  const handleCopy = async () => {
    if (!visibleResult.length) return;
    await copyText(visibleResult.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const demoBody = (
    <>
      <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-white to-brand-50 px-4 py-3.5 sm:px-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">Без регистрации</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">
          Собирайте комбинации сколько угодно — <span className="font-semibold text-slate-900">без лимитов</span>.
          В кабинете — тот же комбинатор плюс мониторинг, кластеризация, анализ конкурентов и другие модули.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={loadExample}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-300 hover:bg-brand-50"
        >
          Пример: аренда самокатов
        </button>
        <button
          type="button"
          onClick={addList}
          disabled={lists.length >= KW_GEN_MAX_LISTS}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-300 hover:bg-brand-50 disabled:opacity-50"
        >
          + Список слов ({lists.length}/{KW_GEN_MAX_LISTS})
        </button>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:items-start">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {lists.map((list, index) => (
              <div key={list.id} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Список {index + 1}
                  </span>
                  {lists.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeList(list.id)}
                      className="text-xs text-slate-500 hover:text-red-600"
                    >
                      Удалить
                    </button>
                  )}
                </div>
                <textarea
                  value={list.wordsText}
                  onChange={(e) => updateList(list.id, e.target.value)}
                  rows={6}
                  className="w-full resize-y rounded-lg border border-slate-200 px-2.5 py-2 font-mono text-sm leading-relaxed text-slate-800"
                  placeholder="По одному слову или фразе на строку"
                  spellCheck={false}
                />
                <p className="mt-1 text-xs text-slate-500">
                  Слов: {parseWordListText(list.wordsText).length}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-sm font-semibold text-slate-800">Дополнительные настройки</p>
            <fieldset className="mt-3 space-y-2">
              {(
                [
                  ["surroundWithQuotes", 'Заключить в " "'],
                  ["surroundWithBrackets", "Заключить в [ ]"],
                  ["addToResult", "Добавить комбинации без операторов"],
                  ["addPlus", 'Добавить «+» к стоп-словам'],
                  ["getAllPhrasesByLength", "Разбить на фразы по длине"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600"
                    checked={!!global[key]}
                    onChange={() => toggleGlobal(key)}
                  />
                  {label}
                </label>
              ))}
            </fieldset>

            {global.getAllPhrasesByLength && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-700">
                <span>от</span>
                <select
                  className="form-select form-select-sm w-auto rounded-lg border-slate-300"
                  value={global.getAllPhrasesFrom}
                  onChange={(e) =>
                    setGlobal((p) => ({ ...p, getAllPhrasesFrom: Number(e.target.value) }))
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <span>до</span>
                <select
                  className="form-select form-select-sm w-auto rounded-lg border-slate-300"
                  value={global.getAllPhrasesTo}
                  onChange={(e) =>
                    setGlobal((p) => ({ ...p, getAllPhrasesTo: Number(e.target.value) }))
                  }
                >
                  {[2, 3, 4, 5, 6, 7].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <span>обрезать</span>
                <select
                  className="form-select form-select-sm w-auto rounded-lg border-slate-300"
                  value={global.leftRight}
                  onChange={(e) =>
                    setGlobal((p) => ({
                      ...p,
                      leftRight: e.target.value as KwGlobalOptions["leftRight"],
                    }))
                  }
                >
                  <option value="right">справа</option>
                  <option value="left">слева</option>
                  <option value="both">с обеих сторон</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={generate}
              className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Получить комбинации
            </button>
            <p className="text-sm text-slate-600">
              Получится комбинаций:{" "}
              <strong className="tabular-nums text-brand-700">
                {previewCount.toLocaleString("ru-RU")}
              </strong>
            </p>
          </div>
          {error && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-800">Результат</p>
            {result.length > 0 && (
              <button
                type="button"
                onClick={() => void handleCopy()}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                {copied ? "Скопировано" : "Копировать всё"}
              </button>
            )}
          </div>

          {result.length > 0 && (
            <div className="mt-3">
              <label className="sr-only" htmlFor={filterId}>
                Оставить фразы, содержащие
              </label>
              <input
                id={filterId}
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Оставить фразы, содержащие…"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <p className="mt-2 text-xs text-slate-500">
                Показано: {visibleResult.length.toLocaleString("ru-RU")} из{" "}
                {result.length.toLocaleString("ru-RU")}
              </p>
            </div>
          )}

          {result.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              Заполните списки и нажмите «Получить комбинации».
            </p>
          ) : (
            <textarea
              readOnly
              value={visibleResult.join("\n")}
              rows={18}
              className="mt-3 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs leading-relaxed text-slate-800"
            />
          )}
        </div>
      </div>

      <div className="mt-8">
        <DemoUpgradePanel
          registerUrl={buildKeywordGenRegisterUrl()}
          remaining={1}
          maxRuns={1}
          fullMaxChars={0}
          moduleTitle="платформы Титло"
          showRemaining={false}
          upgradeHint={KEYWORD_GEN_UPGRADE_HINT}
          details={KEYWORD_GEN_CABINET_FEATURES}
        />
      </div>

      <div className="mt-4">
        <DemoModuleLinks
          links={[
            { href: "/services/", label: "Все модули" },
            { href: buildKeywordGenCabinetUrl(), label: "Открыть в кабинете" },
            { href: buildKeywordGenIdeasUrl(), label: "Доска идей" },
            { href: "/klasterizator-klyuchevykh-slov/", label: "Кластеризатор" },
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
      title="Соберите ключевые фразы прямо здесь"
      lead="Несколько списков слов, операторы Директа и разбивка по длине — как в кабинете, без лимитов."
      features={DEMO_FEATURES}
    >
      {demoBody}
    </DemoWidgetShell>
  );
}

/** Комбинатор фраз — упрощённый порт логики кабинета (keyword-generator / List.js) */

export type KwGlobalOptions = {
  surroundWithQuotes: boolean;
  surroundWithBrackets: boolean;
  addToResult: boolean;
  addPlus: boolean;
  getAllPhrasesByLength: boolean;
  getAllPhrasesFrom: number;
  getAllPhrasesTo: number;
  leftRight: "left" | "right" | "both";
};

const STOP_WORDS = new Set(
  [
    "в", "во", "без", "до", "из", "к", "ко", "на", "по", "о", "об", "от", "перед", "при", "через",
    "для", "про", "у", "за", "над", "под", "с", "со", "и", "а", "но", "не", "что", "как", "the",
    "in", "on", "at", "to", "for", "of", "and", "or",
  ].map((w) => w.toLowerCase())
);

export const KW_GEN_MAX_LISTS = 5;

export const KW_GEN_EXAMPLE_LISTS = [
  ["аренда", "прокат"],
  ["самокат", "электросамокат"],
  ["Москва", "Санкт-Петербург"],
] as const;

export function parseWordListText(text: string): string[] {
  const rows = text
    .split("\n")
    .map((row) => row.trim().replace(/\s+/g, " "))
    .filter(Boolean);
  return [...new Set(rows)];
}

function combineTwoLists(first: string[], second: string[]): string[] {
  if (!second.length) return first;
  if (!first.length) return second;
  const out: string[] = [];
  for (const a of first) {
    for (const b of second) {
      out.push(`${a} ${b}`.trim());
    }
  }
  return out;
}

function combineLists(lists: string[][]): string[] {
  if (!lists.length) return [];
  return lists.reduce((acc, cur) => combineTwoLists(acc, cur));
}

function unique(arr: string[]): string[] {
  return [...new Set(arr)];
}

function surround(array: string[], first: string, second: string): string[] {
  return array.filter((s) => s.trim()).map((s) => `${first}${s}${second}`);
}

function addPlusesToStopWordsInString(s: string): string {
  return s
    .split(" ")
    .map((word) => (STOP_WORDS.has(word.toLowerCase()) ? `+${word}` : word))
    .join(" ");
}

function addPlusesToLists(lists: string[][]): string[][] {
  return lists.map((list) => list.map(addPlusesToStopWordsInString));
}

function getCombinationsFromTo(
  wordArray: string[],
  from: number,
  to: number,
  direction: KwGlobalOptions["leftRight"]
): string[] {
  if (direction === "both") {
    return unique([
      ...getCombinationsFromTo(wordArray, from, to, "right"),
      ...getCombinationsFromTo(wordArray, from, to, "left"),
    ]);
  }

  const newWords: string[] = [];
  for (const phrase of wordArray) {
    let innerWords = phrase.split(" ");
    if (innerWords.length < from) continue;

    if (direction === "left") {
      innerWords = [...innerWords].reverse();
    }

    for (let j = from; j <= to; j++) {
      let slice = innerWords.slice(0, j);
      if (direction === "left") {
        slice = [...slice].reverse();
      }
      newWords.push(slice.join(" "));
    }
  }
  return newWords;
}

export function countCombinations(lists: string[][], global: KwGlobalOptions): number {
  let quantity = 0;
  let multiplierBase = 1;
  for (const words of lists) {
    if (words.length === 0) continue;
    multiplierBase = multiplierBase === 0 ? 1 : multiplierBase;
    quantity = quantity === 0 ? words.length : quantity * words.length;
  }
  if (quantity === 0) return 0;

  const globalMult = [
    global.surroundWithQuotes,
    global.surroundWithBrackets,
    global.addToResult,
  ].filter(Boolean).length;
  const multiplier = globalMult === 0 ? 1 : globalMult;

  return quantity * multiplier;
}

export function generateKeywordCombinations(
  lists: string[][],
  global: KwGlobalOptions
): string[] {
  const nonEmpty = lists.filter((w) => w.length > 0);
  if (!nonEmpty.length) return [];

  let working = nonEmpty;
  if (global.addPlus) {
    working = addPlusesToLists(working);
  }

  let result = combineLists(working);

  if (global.getAllPhrasesByLength) {
    const from = Math.max(1, global.getAllPhrasesFrom);
    const to = Math.max(from, global.getAllPhrasesTo);
    result = unique(getCombinationsFromTo(result, from, to, global.leftRight));
  } else {
    result = unique(result);
  }

  const wrapped: string[] = [];
  if (global.surroundWithQuotes) {
    wrapped.push(...surround(result, '"', '"'));
  }
  if (global.surroundWithBrackets) {
    wrapped.push(...surround(result, "[", "]"));
  }

  if (global.addToResult && (global.surroundWithBrackets || global.surroundWithQuotes)) {
    result = unique([...wrapped, ...result]);
  } else if (global.surroundWithBrackets || global.surroundWithQuotes) {
    result = unique(wrapped);
  }

  return result;
}

export function filterPhrases(phrases: string[], needle: string): string[] {
  const q = needle.trim().toLowerCase();
  if (!q) return phrases;
  return phrases.filter((p) => p.toLowerCase().includes(q));
}

export const DEFAULT_KW_GLOBAL_OPTIONS: KwGlobalOptions = {
  surroundWithQuotes: false,
  surroundWithBrackets: false,
  addToResult: false,
  addPlus: false,
  getAllPhrasesByLength: false,
  getAllPhrasesFrom: 2,
  getAllPhrasesTo: 7,
  leftRight: "right",
};

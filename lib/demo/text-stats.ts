export type TextStats = {
  charsWithSpaces: number;
  charsNoSpaces: number;
  words: number;
  lines: number;
};

export function analyzeText(text: string): TextStats {
  const trimmed = text.trim();
  if (!trimmed) {
    return { charsWithSpaces: 0, charsNoSpaces: 0, words: 0, lines: 0 };
  }
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = trimmed.split(/\s+/).filter(Boolean).length;
  const lines = text.split(/\n/).length;
  return { charsWithSpaces, charsNoSpaces, words, lines };
}

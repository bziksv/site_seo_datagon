export type { NewsBlock, NewsItem } from "./news.generated";
export { getNewsBySlug } from "./news.generated";
import { NEWS_ITEMS as RAW } from "./news.generated";
import type { NewsItem } from "./news.generated";

const MONTHS: Record<string, number> = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

function parseRuDate(date: string): number {
  const m = date.match(/(\d{1,2})\s+(\S+)\s+(\d{4})/);
  if (!m) return 0;
  const month = MONTHS[m[2].toLowerCase()];
  if (month === undefined) return 0;
  return new Date(Number(m[3]), month, Number(m[1])).getTime();
}

/** Новости, новые сверху */
export const NEWS_ITEMS: NewsItem[] = [...RAW].sort(
  (a, b) => parseRuDate(b.date) - parseRuDate(a.date)
);

/**
 * Парсер контента Kraken: .descriptive + h2.main1 + .text-wrap
 */

function collectParagraphs($, $root) {
  const out = [];
  $root.find("script, iframe, noscript").remove();
  $root.find(".text-wrap").each((_, wrap) => {
    const $wrap = $(wrap);
    const items = $wrap.find("p, li");
    if (items.length) {
      items.each((__, node) => {
        const t = $(node).text().replace(/\s+/g, " ").trim();
        if (t.length > 4) out.push(t);
      });
    } else {
      const t = $wrap.text().replace(/\s+/g, " ").trim();
      if (t.length > 15) out.push(t);
    }
  });
  if (!out.length) {
    const t = $root.text().replace(/\s+/g, " ").trim();
    if (t.length > 20 && !/cookie|BITRIX|Модули сервиса/i.test(t)) out.push(t);
  }
  return [...new Set(out)];
}

export function parseKrakenSections($) {
  const sections = [];
  const seen = new Set();

  $("h2.main1").each((_, el) => {
    const $h2 = $(el);
    const title = $h2.text().replace(/\s+/g, " ").trim();
    if (!title || title.length < 3) return;

    const paragraphs = [];
    let $sib = $h2.next();
    while ($sib.length && !$sib.is("h2.main1")) {
      if ($sib.hasClass("descriptive") || $sib.find(".descriptive").length) {
        const targets = $sib.hasClass("descriptive") ? $sib : $sib.find(".descriptive");
        targets.each((__, d) => paragraphs.push(...collectParagraphs($, $(d))));
      } else {
        paragraphs.push(...collectParagraphs($, $sib));
      }
      $sib = $sib.next();
    }

    const key = `${title}::${paragraphs.join("|").slice(0, 80)}`;
    if (paragraphs.length && !seen.has(key)) {
      seen.add(key);
      sections.push({ title, paragraphs });
    }
  });

  // Секции без h2: отдельные .descriptive в main
  $("main .descriptive, .page-content .descriptive, body .descriptive").each((_, el) => {
    const $el = $(el);
    const paragraphs = collectParagraphs($, $el);
    if (!paragraphs.length) return;

    const prevH2 = $el.prevAll("h2.main1").first().text().replace(/\s+/g, " ").trim();
    const title =
      prevH2 ||
      $el.find("h2, h3").first().text().replace(/\s+/g, " ").trim() ||
      paragraphs[0].slice(0, 80);

    const key = `${title}::${paragraphs.join("|").slice(0, 80)}`;
    if (seen.has(key)) return;
    seen.add(key);
    sections.push({ title, paragraphs });
  });

  return sections;
}

export function parseKrakenLead($) {
  const firstDesc = $("main .descriptive, .descriptive").first();
  const paras = collectParagraphs($, firstDesc);
  if (paras[0]) return paras[0].slice(0, 600);

  const meta = $("meta[name='description']").attr("content")?.trim();
  return meta || "";
}

export function parseH1($) {
  return $("h1").first().text().replace(/\s+/g, " ").trim();
}

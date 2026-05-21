import type { ModulePage } from "@/lib/content/modules";
import type {
  ModuleV3Flux,
  ModuleV3HeroVisual,
  ModuleV3Intro,
  ModuleV3PageConfig,
  ModuleV3Stat,
} from "@/lib/content/module-v3/types";

export type ClassicV3Source = {
  hero: { badge?: string; title: string; lead: string; sub?: string };
  stats: readonly { value: string; label: string }[];
  steps: readonly { step: string; title: string; text: string }[];
  techLayers: readonly { id: string; title: string; short: string; text: string; detail?: string }[];
  grid?: readonly { title: string; text: string }[];
  highlight?: { title: string; lead: string; bullets: readonly string[] };
  insightsMeta?: { eyebrow: string; title: string; lead: string };
  screenshots?: readonly { src: string; caption: string }[];
  plain: {
    title: string;
    lead: string;
    items: readonly { title: string; text?: string; bullets?: readonly string[] }[];
  };
  faq: readonly { q: string; a: string }[];
  options?: readonly string[];
};

const GRID_ICONS = ["#", "W", "↗", "◎", "01", "02", "03", "04"] as const;

const DEFAULT_FLUX: ModuleV3Flux = {
  eyebrow: "До и после",
  title: "От ручного хаоса к одному кабинету",
  lead: "Разрозненные таблицы и вкладки заменяются одним проектом в Датагоне — с историей и отчётом.",
  chaosLabel: "Без системы",
  chaosLines: [
    "Данные в Excel и заметках",
    "Ручной обход задач по очереди",
    "Сложно показать результат клиенту",
    "Нет единой истории изменений",
  ],
  orderLabel: "В Датагоне",
  orderLines: [
    "Один проект — все данные модуля",
    "Повторные проверки с датами",
    "Выгрузка для отчёта или команды",
    "Связка с другими SEO-модулями",
  ],
};

const FLUX_OVERRIDES: Partial<Record<string, Partial<ModuleV3Flux>>> = {
  "analiz-relevantnosti": {
    chaosLines: [
      "Десятки вкладок с выдачей по фразе",
      "Сравнение с ТОПом вручную в Excel",
      "Переспам замечают после публикации",
      "TLP собирают копирайтеру наугад",
    ],
    orderLines: [
      "URL, регион и ТОП‑10/20 в одной форме",
      "Облака слов и TLP из отчёта",
      "Рекомендации: добавить, убрать, усилить мета",
      "Повторный анализ после правок",
    ],
  },
  "analiz-konkurentov": {
    orderLines: [
      "Список конкурентов по вашим фразам",
      "Метатеги и вложенность в одном отчёте",
      "Динамика чужих доменов по датам",
      "Экспорт для стратегии и ТЗ",
    ],
  },
  "monitoring-pozicii-sayta": {
    title: "От ручного хаоса к одному пульсу",
    orderLabel: "С мониторингом Датагон",
    orderLines: [
      "Один проект — все ключи, Яндекс и Google",
      "История проверок по датам",
      "Отчёт XLS или PDF без ручной сборки",
      "Регион, язык и глубина до 100 позиций",
    ],
  },
};

function splitTitle(h1: string): { title: string; titleAccent: string } {
  const words = h1.trim().split(/\s+/);
  if (words.length <= 2) {
    return { title: words[0] ?? h1, titleAccent: words.slice(1).join(" ") || "модуля" };
  }
  const mid = Math.max(1, Math.ceil(words.length / 2));
  return {
    title: words.slice(0, mid).join(" "),
    titleAccent: words.slice(mid).join(" "),
  };
}

function parseStatValue(raw: string): { value: string; suffix: string; static?: boolean } {
  const t = raw.trim();
  if (/^[а-яА-Яa-zA-Z]/.test(t) && !/^\d/.test(t)) {
    return { value: t, suffix: "", static: true };
  }
  const m = /^(\d+)\s*(.*)$/.exec(t);
  if (m) return { value: m[1], suffix: m[2] ? ` ${m[2]}` : "" };
  return { value: t, suffix: "" };
}

function buildStats(stats: ClassicV3Source["stats"]): ModuleV3Stat[] {
  return stats.map((s) => {
    const p = parseStatValue(s.value);
    return {
      value: p.value,
      suffix: p.suffix,
      label: s.label.toLowerCase(),
      note: undefined,
      static: p.static,
    };
  });
}

function buildHeroVisual(
  source: ClassicV3Source,
  panelLabel: string
): ModuleV3HeroVisual {
  const rows = source.steps.slice(0, 4).map((s) => ({
    left: s.title,
    right: s.step,
  }));
  const mini = source.stats.slice(0, 3).map((s) => ({
    label: s.label.length > 18 ? `${s.label.slice(0, 16)}…` : s.label,
    value: s.value.replace(/\s+/g, " ").slice(0, 8),
  }));
  const firstNum = parseStatValue(source.stats[0]?.value ?? "1");
  const max = Number(firstNum.value) || 100;
  const percent = Math.min(100, Math.max(12, max > 50 ? 67 : max * 2));

  return {
    panelLabel,
    rows: rows.length ? rows : [{ left: source.hero.title, right: "01" }],
    progress: {
      label: source.stats[0]?.label ?? "параметр",
      value: source.stats[0]?.value ?? "—",
      percent,
    },
    footer: source.hero.sub ?? "Результат сохраняется в личном кабинете",
    miniStats: mini.length
      ? mini
      : [
          { label: "шагов", value: String(source.steps.length) },
          { label: "в кабинете", value: "1" },
          { label: "отчёт", value: "PDF" },
        ],
  };
}

function buildTypeCycle(source: ClassicV3Source): readonly string[] {
  const fromSteps = source.steps.map((s) => s.title.split(" ")[0].toLowerCase()).filter(Boolean);
  if (fromSteps.length >= 3) return fromSteps.slice(0, 5) as readonly string[];
  return ["запуск", "данные", "отчёт", "экспорт", "динамика"] as const;
}

function buildStreams(source: ClassicV3Source, features: string[] | undefined) {
  const a = [
    ...(features ?? []),
    ...source.steps.map((s) => s.title),
    ...source.options?.slice(0, 4) ?? [],
  ].filter(Boolean);
  const b = [
    ...source.stats.map((s) => s.value),
    ...source.stats.map((s) => s.label),
    "кабинет",
    "отчёт",
    "экспорт",
  ].filter(Boolean);
  return {
    streamA: [...new Set(a)].slice(0, 12) as readonly string[],
    streamB: [...new Set(b)].slice(0, 12) as readonly string[],
  };
}

export function buildModuleV3Config(
  baseSlug: string,
  module: ModulePage,
  source: ClassicV3Source,
  opts?: {
    title?: { title: string; titleAccent: string };
    panelLabel?: string;
    flux?: Partial<ModuleV3Flux>;
    skipDepth?: boolean;
  }
): ModuleV3PageConfig {
  const slug = `${baseSlug}-v3`;
  const titles = opts?.title ?? splitTitle(module.h1);
  const { streamA, streamB } = buildStreams(source, module.features);

  const intro: ModuleV3Intro = {
    badge: "LAB · v3",
    title: titles.title,
    titleAccent: titles.titleAccent,
    lead: source.hero.lead,
    sub: source.hero.sub,
    cta: "Войти в кабинет",
    typeCycle: buildTypeCycle(source),
  };

  const grid = source.grid ?? [];
  const insightsMeta = source.insightsMeta ?? {
    eyebrow: "Что в отчёте",
    title: "Результат в кабинете",
    lead: "Ключевые блоки отчёта — без лишней теории.",
  };

  const highlight = source.highlight ?? {
    title: "Динамика и контроль",
    lead: "Сравнивайте результаты во времени и передавайте выводы команде или клиенту.",
    bullets: source.steps.map((s) => s.text).slice(0, 3),
  };

  const flux = { ...DEFAULT_FLUX, ...FLUX_OVERRIDES[baseSlug], ...opts?.flux };

  const plainItems = source.plain.items.map((item) => ({
    title: item.title,
    text: item.text ?? item.bullets?.join(" ") ?? "",
  }));

  return {
    slug,
    baseSlug,
    menuLabel: module.title.replace(/\s*\(LAB.*\)$/i, "").trim(),
    intro,
    heroVisual: buildHeroVisual(source, opts?.panelLabel ?? "кабинет · модуль"),
    streamA,
    streamB,
    flux,
    signalsSection: {
      eyebrow: "Как это работает",
      title: "От ввода до отчёта",
      lead: "Четыре шага в одном кабинете.",
    },
    signals: source.steps.map((s, i) => ({
      id: `step-${i}`,
      label: s.step,
      title: s.title,
      text: s.text,
      detail: source.techLayers[i]?.short,
    })),
    insightsSection: insightsMeta,
    insightsGrid: grid.map((g, i) => ({
      title: g.title,
      text: g.text,
      icon: GRID_ICONS[i % GRID_ICONS.length],
    })),
    insightsHighlight: highlight,
    screenshotSection: {
      eyebrow: "Кабинет",
      title: "Интерфейс модуля",
      lead: "Скриншоты реального интерфейса — список задач и результат.",
    },
    screenshots: source.screenshots?.length
      ? source.screenshots
      : [{ src: "/modules/assets/3d7d72c85b4af88c.jpg", caption: module.title }],
    statsSection: {
      eyebrow: "Цифры",
      title: "Параметры модуля",
      lead: "Лимиты и возможности — без лишних обещаний.",
    },
    stats: buildStats(source.stats),
    essentials: {
      eyebrow: "Суть модуля",
      title: source.plain.title,
      lead: source.plain.lead,
      optionsTitle: "Что учитывается",
      options: source.options ?? module.features ?? [],
      techLayers: source.techLayers.map((l) => ({
        id: l.id,
        title: l.title,
        short: l.short,
        text: l.detail ?? l.text,
      })),
      plain: plainItems,
    },
    faqSection: {
      eyebrow: "FAQ",
      title: "Вопросы по модулю",
      lead: "Краткие ответы по проверкам и кабинету.",
    },
    faq: [...source.faq],
    outro: {
      title: "Начните в кабинете",
      lead: "Зарегистрируйтесь и запустите модуль на своих данных — бесплатно после регистрации.",
      stepsTitle: "Три шага",
      steps: source.steps.slice(0, 3).map((s, i) => ({
        n: String(i + 1),
        title: s.title,
        text: s.text,
      })),
      freeNote: "На бесплатном тарифе — лимиты по модулю.",
      links: [{ href: `/${baseSlug}/`, label: "Классический лендинг" }],
    },
  };
}

/** Конфиг иммерсивного лендинга v3 (общий для всех модулей). */

export type ModuleV3Intro = {
  badge: string;
  title: string;
  titleAccent: string;
  lead: string;
  sub?: string;
  cta: string;
  typeCycle: readonly string[];
};

export type ModuleV3HeroVisual = {
  panelLabel: string;
  rows: readonly { left: string; right?: string }[];
  progress?: { label: string; value: string; percent: number };
  footer: string;
  miniStats: readonly { label: string; value: string }[];
};

export type ModuleV3Depth = {
  eyebrow: string;
  title: string;
  lead: string;
  hint?: string;
  max: number;
  maxLabel: string;
  markers?: readonly { at: number; label: string }[];
};

export type ModuleV3Flux = {
  eyebrow: string;
  title: string;
  lead: string;
  chaosLabel: string;
  chaosLines: readonly string[];
  orderLabel: string;
  orderLines: readonly string[];
};

export type ModuleV3Signal = {
  id: string;
  label: string;
  title: string;
  text: string;
  detail?: string;
};

export type ModuleV3Stat = {
  value: string;
  suffix: string;
  label: string;
  note?: string;
  static?: boolean;
};

export type ModuleV3Essentials = {
  eyebrow: string;
  title: string;
  lead: string;
  optionsTitle: string;
  options: readonly string[];
  techLayers: readonly { id: string; title: string; short: string; text: string }[];
  plain: readonly { title: string; text: string }[];
};

export type ModuleV3Outro = {
  title: string;
  lead: string;
  stepsTitle: string;
  steps: readonly { n: string; title: string; text: string }[];
  freeNote: string;
  links: readonly { href: string; label: string }[];
};

export type ModuleV3PageConfig = {
  slug: string;
  baseSlug: string;
  menuLabel: string;
  intro: ModuleV3Intro;
  heroVisual: ModuleV3HeroVisual;
  streamA: readonly string[];
  streamB: readonly string[];
  depth?: ModuleV3Depth;
  flux: ModuleV3Flux;
  signalsSection: { eyebrow: string; title: string; lead: string };
  signals: readonly ModuleV3Signal[];
  insightsSection: { eyebrow: string; title: string; lead: string };
  insightsGrid: readonly { title: string; text: string; icon: string }[];
  insightsHighlight: { title: string; lead: string; bullets: readonly string[] };
  screenshotSection: { eyebrow: string; title: string; lead: string };
  screenshots: readonly { src: string; caption: string }[];
  statsSection: { eyebrow: string; title: string; lead: string };
  stats: readonly ModuleV3Stat[];
  essentials: ModuleV3Essentials;
  faqSection: { eyebrow: string; title: string; lead: string };
  faq: readonly { q: string; a: string }[];
  outro: ModuleV3Outro;
};

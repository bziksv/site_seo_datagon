export const COMPETITOR_ANALYSIS_DEMO_MODULE = "analiz-konkurentov" as const;

export const DEMO_MAX_PHRASE_LENGTH = 120;
export const DEMO_MIN_PHRASE_LENGTH = 2;
export const DEMO_DEFAULT_REGION_ID = "213";
export const DEMO_DEFAULT_GOOGLE_REGION_ID = "1011969";

export const DEMO_TOP_DEPTHS = [
  { value: 30, label: "30 (рекомендуемый)", demo: false },
  { value: 20, label: "20", demo: false },
  { value: 10, label: "10", demo: true },
] as const;

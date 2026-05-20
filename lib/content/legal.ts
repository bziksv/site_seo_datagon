import { LEGAL_DOCS, type LegalDoc } from "@/lib/content/legal.generated";

export type { LegalDoc };

export function getAllLegalSlugs(): string[] {
  return LEGAL_DOCS.map((d) => d.slug);
}

export function getLegalBySlug(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}

export const LEGAL_NAV = LEGAL_DOCS.map((d) => ({
  href: `/legal/${d.slug}/`,
  label: d.title,
}));

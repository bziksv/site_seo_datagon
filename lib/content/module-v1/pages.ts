import type { ModulePage } from "@/lib/content/modules";
import { moduleV1Slug, MODULE_V1_BASE_SLUGS } from "@/lib/content/module-v1/slugs";

export function getModuleV1ModulePages(
  getBase: (slug: string) => ModulePage | undefined
): ModulePage[] {
  return MODULE_V1_BASE_SLUGS.map((baseSlug) => {
    const base = getBase(baseSlug);
    if (!base) throw new Error(`module-v1: нет базового модуля ${baseSlug}`);
    const slug = moduleV1Slug(baseSlug);
    return {
      slug,
      path: `/${slug}/`,
      title: `${base.title} (LAB v1)`,
      h1: base.h1,
      description: base.description,
      lead: base.lead,
      features: base.features,
      videos: base.videos,
    };
  });
}

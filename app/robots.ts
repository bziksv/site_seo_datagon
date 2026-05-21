import type { MetadataRoute } from "next";
import { getAllModuleSlugs, isLabModuleSlug } from "@/lib/content/modules";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const disallow = getAllModuleSlugs().filter(isLabModuleSlug).map((slug) => `/${slug}/`);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${SITE.siteUrl}/sitemap.xml`,
  };
}

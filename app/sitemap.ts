import type { MetadataRoute } from "next";
import { getAllLegalSlugs } from "@/lib/content/legal";
import { getAllModuleSlugs } from "@/lib/content/modules";
import { NEWS_ITEMS } from "@/lib/content/news";

const BASE = "https://redbox.su";

const STATIC = [
  "",
  "about/",
  "contact/",
  "tarify/",
  "services/",
  "faq/",
  "news/",
  "news/istoriya-kompanii/",
  "demo/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = STATIC.map((path) => ({
    url: `${BASE}/${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const modules = getAllModuleSlugs().map((slug) => ({
    url: `${BASE}/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const legal = getAllLegalSlugs().map((slug) => ({
    url: `${BASE}/legal/${slug}/`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const news = NEWS_ITEMS.map((n) => ({
    url: `${BASE}/news/detail/${n.slug}/`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...modules, ...legal, ...news];
}

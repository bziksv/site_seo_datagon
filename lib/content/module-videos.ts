import { MODULE_VIDEOS } from "@/lib/content/module-videos.generated";

export function getModuleVideos(slug: string): string[] {
  return MODULE_VIDEOS[slug] ?? [];
}

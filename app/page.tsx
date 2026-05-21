import { DatagonHome } from "@/components/home/DatagonHome";
import { getSitePage } from "@/lib/content/site-pages.generated";
import { NEWS_ITEMS } from "@/lib/content/news";

export default function HomePage() {
  const home = getSitePage("home");
  const aboutBlock = home?.sections.find((s) => s.title.includes("Продуманное"));
  const ctaBlock = home?.sections.find((s) => s.title.includes("регистрации"));

  return (
    <DatagonHome
      heroTitle={
        home?.h1 ?? "Инструменты для SEO, маркетинга и роста сайта"
      }
      aboutTitle={aboutBlock?.title}
      aboutLead={aboutBlock?.paragraphs[0]}
      ctaTitle={ctaBlock?.title}
      ctaLead={ctaBlock?.paragraphs[0]}
      news={NEWS_ITEMS}
    />
  );
}

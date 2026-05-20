import type { Metadata } from "next";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageShell } from "@/components/PageShell";
import { FAQ_ITEMS } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "Вопрос-ответ",
  description: "Частые вопросы о сервисе Датагон и личном кабинете.",
};

export default function FaqPage() {
  return (
    <PageShell title="Вопрос-ответ" lead="Ответы на частые вопросы о платформе Датагон.">
      <FaqAccordion items={FAQ_ITEMS} />
    </PageShell>
  );
}

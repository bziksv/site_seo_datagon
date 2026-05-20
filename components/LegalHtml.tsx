type Props = {
  html: string;
};

/** Импортированный HTML с Битрикса; стилизуем через .legal-content в globals.css */
export function LegalHtml({ html }: Props) {
  return <div className="legal-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

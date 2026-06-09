type SectionHeaderProps = {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
}: SectionHeaderProps) {
  const titleHtml =
    title && highlight
      ? title.replace(highlight, `<em>${highlight}</em>`)
      : title;

  return (
    <header className="section__head">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}

      {titleHtml && (
        <h2
          className="section__title"
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
      )}

      {description && (
        <p className="section__lede">{description}</p>
      )}
    </header>
  );
}
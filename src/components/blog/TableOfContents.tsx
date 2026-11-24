export type TocItem = { id: string; label: string };

// TODO: desktop = sticky sidebar (lg:sticky lg:top-24).
// Mobile = collapsible <details> "On this page" above the article.
export function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="On this page">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export type TocItem = { id: string; label: string };

// Desktop: a sticky sidebar list. Mobile: a collapsed "On this page" disclosure above
// the article, so the title and intro stay first and the list is one tap away.
// Same links in both; only one is ever visible.
export function TableOfContents({ items }: { items: TocItem[] }) {
  // The list of links, built once and shown in both places below.
  // Each link jumps to the section heading with that id.
  const list = (
    <ol className="border-line mt-3 space-y-1 border-l-2">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="hover:border-teal-strong hover:text-teal-strong -ml-0.5 block border-l-2 border-transparent py-2 pl-4 text-base font-medium"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {/* Mobile and tablet: a collapsed box above the article (lg:hidden) */}
      <details className="group rounded-card border-line bg-surface border px-5 lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-base font-semibold [&::-webkit-details-marker]:hidden">
          On this page
          {/* "Show" while closed, "Hide" while open. aria-hidden because screen readers
              already announce whether the box is expanded. */}
          <span
            aria-hidden="true"
            className="text-teal-strong text-sm group-open:hidden"
          >
            Show
          </span>
          <span
            aria-hidden="true"
            className="text-teal-strong hidden text-sm group-open:inline"
          >
            Hide
          </span>
        </summary>
        <nav aria-label="On this page" className="pb-4">
          {list}
        </nav>
      </details>

      {/* Desktop: a plain list in the sidebar (hidden below lg) */}
      <nav aria-labelledby="toc-heading" className="hidden lg:block">
        <h2 id="toc-heading" className="text-ink-muted text-sm font-semibold">
          On this page
        </h2>
        {list}
      </nav>
    </>
  );
}

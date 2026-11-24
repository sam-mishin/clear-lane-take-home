export type TocItem = { id: string; label: string };

// Desktop: a sticky sidebar list. Mobile: a collapsed "On this page" disclosure above
// the article, so the title and intro stay first and the list is one tap away.
// Same links in both; only one is ever visible.
export function TableOfContents({ items }: { items: TocItem[] }) {
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
      <details className="group rounded-card border-line bg-surface border px-5 lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-base font-semibold [&::-webkit-details-marker]:hidden">
          On this page
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

      <nav aria-labelledby="toc-heading" className="hidden lg:block">
        <h2 id="toc-heading" className="text-ink-muted text-sm font-semibold">
          On this page
        </h2>
        {list}
      </nav>
    </>
  );
}

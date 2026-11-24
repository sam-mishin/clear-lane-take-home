import clsx from "clsx";

// The start of a page section: an optional eyebrow (small teal label), the H2,
// and an optional one-line lead. Keeps every section on every page consistent.
// Pass the same id that the <section aria-labelledby="..."> points at.
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    // "reveal": fades up as it scrolls into view (globals.css, CSS only).
    <div className={clsx("reveal max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-teal-strong mb-3 text-sm font-semibold">{eyebrow}</p>
      )}
      <h2 id={id} className="text-2xl md:text-4xl">
        {title}
      </h2>
      {lead && <p className="text-ink-muted mt-4 text-lg md:text-xl">{lead}</p>}
    </div>
  );
}

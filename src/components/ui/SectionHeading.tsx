import clsx from "clsx";

// Eyebrow + H2 + lead, so every section on every page starts the same way.
// Pass the id the <section aria-labelledby> points at.
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-teal-strong mb-3 text-sm font-semibold">{eyebrow}</p>
      )}
      <h2 id={id} className="text-2xl font-bold md:text-4xl">
        {title}
      </h2>
      {lead && <p className="text-ink-muted mt-4 text-lg md:text-xl">{lead}</p>}
    </div>
  );
}

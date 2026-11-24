import clsx from "clsx";

// Small label for "Preview", "Illustrative example", "Educational example, not a policy".
export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "bg-teal-soft text-teal-strong inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        className,
      )}
    >
      {children}
    </span>
  );
}

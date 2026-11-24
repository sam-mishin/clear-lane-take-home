import { InfoIcon } from "@/components/ui/Icons";

// One explanatory callout per article.
export function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside
      aria-label={title}
      className="rounded-card bg-teal-soft flex gap-4 p-6"
    >
      <InfoIcon className="text-teal-strong mt-1 size-6 shrink-0" />
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <div className="mt-2 space-y-3 text-lg">{children}</div>
      </div>
    </aside>
  );
}

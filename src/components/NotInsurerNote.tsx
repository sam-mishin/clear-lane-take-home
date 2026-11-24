import clsx from "clsx";
import { ShieldCheckIcon } from "@/components/ui/Icons";
import { NOT_AN_INSURER } from "@/lib/site";

// Shown right under every funnel button: say what ClearLane isn't, where people decide.
export function NotInsurerNote({ className }: { className?: string }) {
  return (
    <p className={clsx("text-ink-muted mt-3 flex gap-2 text-sm", className)}>
      <ShieldCheckIcon className="text-teal-strong size-5 shrink-0" />
      <span>{NOT_AN_INSURER}</span>
    </p>
  );
}

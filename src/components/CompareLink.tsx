import clsx from "clsx";
import { AttributedLink } from "@/components/AttributedLink";
import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { CTA_LABEL, ROUTES } from "@/lib/site";

// EVERY link to the comparison page uses this component, so campaign params
// in the current URL (utm_source, utm_campaign, click_id) carry through.
// Looks like a primary button by default; the label is always "Compare my options".
export function CompareLink({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  onClick,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <AttributedLink
      href={ROUTES.compare}
      onClick={onClick}
      className={buttonStyles({
        variant,
        size,
        fullWidth,
        className: clsx("group", className),
      })}
    >
      {/* Always "Compare my options", from lib/site.ts */}
      {CTA_LABEL}
      {/* The arrow nudges forward on hover: "this goes somewhere". */}
      <ArrowRightIcon className="size-5 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:transition-none" />
    </AttributedLink>
  );
}

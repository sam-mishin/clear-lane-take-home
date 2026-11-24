"use client";

import { buttonStyles, type ButtonVariant } from "@/components/ui/Button";
import { CTA_LABEL } from "@/lib/site";
import { FUNNEL_ID, goToFunnel } from "@/components/funnel/goToFunnel";

// "Compare my options" on /compare, below the form. It's a real #funnel link, so it
// still works before JavaScript loads; with JS it also moves focus into the form.
export function JumpToFormButton({
  variant = "primary",
  fullWidth,
}: {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}) {
  return (
    <a
      href={`#${FUNNEL_ID}`}
      onClick={(event) => {
        event.preventDefault();
        goToFunnel();
      }}
      className={buttonStyles({ variant, fullWidth })}
    >
      {CTA_LABEL}
    </a>
  );
}

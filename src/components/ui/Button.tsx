import clsx from "clsx";
import { SpinnerIcon } from "@/components/ui/Icons";

// The one button style for the whole site.
// - <Button> is for actions: submit, try again, change an answer.
// - buttonStyles() returns the same classes for links that should look like buttons
//   (CompareLink, JumpToFormButton).
// Class names are written out in full so Tailwind can find them when it builds the CSS.

export type ButtonVariant = "primary" | "secondary" | "onDark" | "text";
export type ButtonSize = "md" | "sm";

// Shared by every variant: pill shape, bold label, smooth color change, dimmed when disabled.
const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

// Colors for each variant, including its hover color.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Teal with white text (5.5:1). The main call to action.
  primary: "bg-teal-strong text-white hover:bg-ink",
  // Navy outline. For the second choice next to a primary button.
  secondary:
    "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
  // Cream button for the dark navy band. Its focus ring uses the lighter teal so it shows up.
  onDark: "bg-cream text-ink hover:bg-teal-soft focus-visible:outline-teal",
  // Looks like an underlined link (the funnel's "Change").
  text: "rounded-none text-teal-strong underline underline-offset-4 hover:text-ink",
};

// Height and padding. 44px+ tall so they're easy to tap.
const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "min-h-12 px-6 text-base", // 48px: the default
  sm: "min-h-11 px-5 text-sm", // 44px: the header button
};

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean; // full width on phones, normal width from 768px up
  className?: string; // extra classes, e.g. spacing like "mt-5"
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}) {
  return clsx(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    // Text buttons look like links, so they skip the height and padding.
    variant !== "text" && SIZE_CLASSES[size],
    fullWidth && "w-full md:w-auto",
    className,
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyleOptions & {
    // While loading, the button is disabled, shows a spinner and swaps its label,
    // so it can't be clicked twice.
    loading?: boolean;
    loadingLabel?: string;
    ref?: React.Ref<HTMLButtonElement>;
  };

export function Button({
  variant,
  size,
  fullWidth,
  className,
  loading = false,
  loadingLabel,
  disabled,
  type = "button", // so a button inside a form doesn't submit it by accident
  children,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...otherProps}
    >
      {loading && <SpinnerIcon />}
      {loading && loadingLabel ? loadingLabel : children}
    </button>
  );
}

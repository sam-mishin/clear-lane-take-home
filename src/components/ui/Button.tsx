import clsx from "clsx";
import { SpinnerIcon } from "@/components/ui/Icons";

// One button system, reused everywhere: <Button> for actions, buttonStyles() for links
// that should look like buttons (CompareLink, "See how it works", the /compare final CTA).
// Full class names only, so Tailwind can see every one of them.

export type ButtonVariant = "primary" | "secondary" | "onDark" | "text";
export type ButtonSize = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-teal-strong text-white hover:bg-ink",
  secondary:
    "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
  // Sits on the dark ink band, so its focus ring switches to the lighter teal.
  onDark: "bg-cream text-ink hover:bg-teal-soft focus-visible:outline-teal",
  text: "rounded-none text-teal-strong underline underline-offset-4 hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-12 px-6 text-base",
  sm: "min-h-11 px-5 text-sm",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  return clsx(
    base,
    variants[variant],
    variant !== "text" && sizes[size],
    fullWidth && "w-full md:w-auto",
    className,
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  // While loading the button keeps its size, swaps its label and can't be clicked again.
  loading?: boolean;
  loadingLabel?: string;
  ref?: React.Ref<HTMLButtonElement>;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  loading = false,
  loadingLabel,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    >
      {loading ? (
        <>
          <SpinnerIcon />
          {loadingLabel ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}

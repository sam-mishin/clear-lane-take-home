// One button system, reused everywhere (primary CTA, secondary, retry, etc.).
// TODO: map each variant to its Tailwind classes, including hover:, focus-visible:
// and disabled: states. Write full class names (no `bg-${x}` string building).

export type ButtonVariant = "primary" | "secondary";

export function Button({
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  return <button data-variant={variant} {...props} />;
}

import clsx from "clsx";
import { AlertIcon } from "@/components/ui/Icons";

// Labeled text input with helper text and an error message.
// The label is always visible; the helper and error are tied to the input with
// aria-describedby, and aria-invalid turns the border red.

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id"
> & {
  id: string;
  label: string;
  helper?: string;
  error?: string | null;
  ref?: React.Ref<HTMLInputElement>;
};

export function TextField({
  id,
  label,
  helper,
  error,
  className,
  ...props
}: TextFieldProps) {
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-base font-semibold">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="border-ink-muted bg-surface hover:border-ink focus-visible:border-teal-strong aria-invalid:border-error read-only:bg-cream min-h-12 w-full rounded-xl border-2 px-4 text-lg tracking-widest"
        {...props}
      />
      {error && (
        <p
          id={errorId}
          className="text-error mt-2 flex items-start gap-2 text-sm font-medium"
        >
          <AlertIcon className="mt-px size-4 shrink-0" />
          {error}
        </p>
      )}
      {helper && (
        <p
          id={helperId}
          className={clsx("text-ink-muted text-sm", error ? "mt-1" : "mt-2")}
        >
          {helper}
        </p>
      )}
    </div>
  );
}

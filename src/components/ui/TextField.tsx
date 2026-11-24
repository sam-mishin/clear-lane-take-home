import { AlertIcon } from "@/components/ui/Icons";

// A text input with a label that's always visible, optional helper text, and an error
// message. Used for the ZIP code.
// Accessibility: aria-describedby points at the error and helper text so screen readers
// read them out with the field, and aria-invalid turns the border red when there's an error.

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string; // also used to build the ids of the helper and error text
  label: string;
  helper?: string; // e.g. "5 digits, like 02134"
  error?: string | null; // shown in red under the field when set
  ref?: React.Ref<HTMLInputElement>;
};

export function TextField({
  id,
  label,
  helper,
  error,
  className,
  ...inputProps
}: TextFieldProps) {
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  // Which text belongs to this field: the error first (if any), then the helper.
  const describedByIds: string[] = [];
  if (error) describedByIds.push(errorId);
  if (helper) describedByIds.push(helperId);
  const describedBy =
    describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

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
        {...inputProps}
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
        <p id={helperId} className="text-ink-muted mt-2 text-sm">
          {helper}
        </p>
      )}
    </div>
  );
}

import clsx from "clsx";
import { CheckIcon } from "@/components/ui/Icons";

// Two selectable cards that look identical:
// - RadioCard: a native radio for "pick one and read about it" (coverage explorer).
//   Arrow keys move the selection, which is what you want there.
// - ChoiceButton: a button for "pick one and move on" (funnel age step).
//   A radio would advance the funnel on the first arrow key press, so the funnel uses buttons.
// Selected = teal border + soft fill + check icon, never color alone.

const card =
  "flex w-full cursor-pointer items-center justify-between gap-3 rounded-card border-2 bg-surface px-5 text-left font-semibold transition-colors duration-150 motion-reduce:transition-none";

const idle = "border-line hover:border-ink-muted";
const selected = "border-teal-strong bg-teal-soft";

function Check({ visible }: { visible: boolean }) {
  return (
    <span
      className={clsx(
        "bg-teal-strong flex size-6 shrink-0 items-center justify-center rounded-full text-white",
        !visible && "invisible",
      )}
    >
      <CheckIcon className="size-4" />
    </span>
  );
}

type RadioCardProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  description?: string;
};

export function RadioCard({
  name,
  value,
  checked,
  onChange,
  label,
  description,
}: RadioCardProps) {
  return (
    <label className="block">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span
        className={clsx(
          card,
          "peer-focus-visible:outline-teal-strong min-h-14 py-4 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
          checked ? selected : idle,
        )}
      >
        <span>
          <span className="block">{label}</span>
          {description && (
            <span className="text-ink-muted mt-1 block text-base font-normal">
              {description}
            </span>
          )}
        </span>
        <Check visible={checked} />
      </span>
    </label>
  );
}

type ChoiceButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  label: string;
  selected: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

export function ChoiceButton({
  label,
  selected: isSelected,
  className,
  ...props
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={clsx(
        card,
        "min-h-14 gap-2 px-4 py-3 text-lg whitespace-nowrap",
        isSelected ? selected : idle,
        className,
      )}
      {...props}
    >
      {label}
      <Check visible={isSelected} />
    </button>
  );
}

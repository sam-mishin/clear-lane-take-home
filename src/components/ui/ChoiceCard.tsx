import clsx from "clsx";
import { CheckIcon } from "@/components/ui/Icons";

// Two selectable cards that look the same but behave differently:
//
// - RadioCard: a real radio button, for "pick one and read about it" (coverage explorer).
//   Arrow keys move between options, which is what you want there.
//
// - ChoiceButton: a plain button, for "pick one and move on" (age step in the funnel).
//   With radios, the first arrow key press would select an age and jump to the next step.
//
// The selected card has a teal border, a light teal fill and a check mark, so the
// selection doesn't depend on color alone.

// selectedFill: light teal by default. Cards that sit on a light teal section
// (the coverage explorer) stay white when selected and get a soft teal ring instead.
function cardClasses(isSelected: boolean, onTint = false) {
  return clsx(
    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-card border-2 text-left font-semibold transition-colors duration-150 motion-reduce:transition-none",
    !isSelected && "bg-surface border-line hover:border-ink-muted",
    isSelected && !onTint && "border-teal-strong bg-teal-soft",
    isSelected &&
      onTint &&
      "border-teal-strong bg-surface ring-teal-strong/15 ring-4",
  );
}

// The round check mark on the right. It keeps its space when hidden, so the
// label doesn't shift when a card is selected.
function CheckMark({ visible }: { visible: boolean }) {
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
  name: string; // radios with the same name form one group
  checked: boolean;
  onSelect: () => void;
  label: string;
  description?: string; // optional second line in lighter text
  illustration?: React.ReactNode; // optional small picture on the left
  onTint?: boolean; // true when the cards sit on a light teal section
};

export function RadioCard({
  name,
  checked,
  onSelect,
  label,
  description,
  illustration,
  onTint = false,
}: RadioCardProps) {
  return (
    // The whole card is the <label>, so clicking anywhere on it selects the radio.
    <label className="block">
      {/* The real radio is visually hidden ("sr-only") but still works with the
          keyboard and screen readers. "peer" lets the card below show its focus ring. */}
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span
        className={clsx(
          cardClasses(checked, onTint),
          illustration ? "min-h-14 py-3 pr-5 pl-3" : "min-h-14 px-5 py-4",
          "peer-focus-visible:outline-teal-strong peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
        )}
      >
        {illustration}
        <span className="flex-1">
          <span className="block">{label}</span>
          {description && (
            <span className="text-ink-muted mt-1 block text-base font-normal">
              {description}
            </span>
          )}
        </span>
        <CheckMark visible={checked} />
      </span>
    </label>
  );
}

type ChoiceButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  ref?: React.Ref<HTMLButtonElement>; // lets the funnel move focus back to this button
};

export function ChoiceButton({
  label,
  selected,
  onClick,
  ref,
}: ChoiceButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      // aria-pressed tells screen readers which age is currently chosen.
      aria-pressed={selected}
      onClick={onClick}
      className={clsx(
        cardClasses(selected),
        "min-h-14 gap-2 px-4 py-3 text-lg whitespace-nowrap",
      )}
    >
      {label}
      <CheckMark visible={selected} />
    </button>
  );
}

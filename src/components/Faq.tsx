import type { FaqItem } from "@/lib/content/faq";
import { ChevronDownIcon } from "@/components/ui/Icons";

// FAQ accordion. Reused on / and /compare.
// Native <details>/<summary>: keyboard and screen reader support come for free,
// and it works before JavaScript loads.
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    // A white card with a soft shadow, so the questions stand out from the section.
    <div className="divide-line rounded-card bg-surface shadow-card divide-y px-5 md:px-8">
      {items.map((item) => (
        // "group" lets the chevron below react when this <details> is open.
        <details key={item.question} className="group">
          {/* The question. list-none and the webkit rule hide the browser's own triangle. */}
          <summary className="hover:text-teal-strong flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold transition-colors duration-150 motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
            {item.question}
            {/* Round chevron button: turns teal and flips upside down while open */}
            <span className="border-line group-open:border-teal-strong group-open:bg-teal-soft group-open:text-teal-strong flex size-9 shrink-0 items-center justify-center rounded-full border-2">
              <ChevronDownIcon className="size-5 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
            </span>
          </summary>
          {/* The answer, shown only while open */}
          <p className="text-ink-muted max-w-prose pr-12 pb-6 text-lg">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

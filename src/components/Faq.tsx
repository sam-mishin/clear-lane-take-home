import type { FaqItem } from "@/lib/content/faq";

// FAQ accordion. Reused on / and /compare.
// Native <details>/<summary> is keyboard-accessible out of the box.
// TODO: style the summary, the open: state and a chevron (group-open:rotate-180).
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

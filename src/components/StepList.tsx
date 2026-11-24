import type { Step } from "@/lib/content/steps";

// Numbered 3-step list. Reused on / ("How it works") and /compare ("What happens next").
// Stacked on mobile, three across from md up. A real <ol>, so the numbers are announced.
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="rounded-card border-line bg-surface border p-6 md:p-8"
        >
          <span
            aria-hidden="true"
            className="bg-teal-soft text-teal-strong flex size-10 items-center justify-center rounded-full font-bold"
          >
            {index + 1}
          </span>
          <h3 className="mt-5 text-lg font-semibold md:text-xl">
            {step.title}
          </h3>
          <p className="text-ink-muted mt-2 text-lg">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

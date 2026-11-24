import { Spot } from "@/components/illustrations/Spot";
import type { Step } from "@/lib/content/steps";

// Three steps joined by a dashed teal "lane" line, like the road in the hero.
// Reused on / ("How it works") and /compare ("What happens next").
// - Phones: stacked, illustration on the left, the lane runs down between them.
// - md and up: three across, the lane runs behind the illustrations.
// A real <ol>, so screen readers announce "1 of 3"; the "Step 1" label repeats
// that visually.
// circle: "white" when the section is cream or teal, "soft" when it's white.
export function StepList({
  steps,
  circle = "white",
}: {
  steps: Step[];
  circle?: "soft" | "white";
}) {
  return (
    <ol className="relative mt-10 grid gap-8 md:mt-14 md:grid-cols-3">
      {/* The lane line, md and up: one dashed line behind all three drawings. */}
      <span
        aria-hidden="true"
        className="border-teal absolute inset-x-1/6 top-16 hidden border-t-4 border-dashed md:block"
      />

      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative flex gap-4 md:flex-col md:items-center md:px-3 md:text-center"
        >
          {/* Phones: a lane segment from this drawing down to the next one */}
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="border-teal absolute top-22 -bottom-8 left-10.5 border-l-4 border-dashed md:hidden"
            />
          )}
          <Spot
            name={step.illustration}
            circle={circle}
            className="size-22 md:size-33"
          />
          <div className="pt-2 md:pt-0">
            <p className="text-teal-strong text-sm font-bold md:mt-5">
              Step {index + 1}
            </p>
            <h3 className="mt-1 text-lg font-semibold md:text-xl">
              {step.title}
            </h3>
            <p className="text-ink-muted mt-2 text-lg md:max-w-xs">
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

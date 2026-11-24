import type { Step } from "@/lib/content/steps";

// Numbered 3-step list. Reused on / ("How it works") and /compare ("What happens next").
// TODO: style (number disc, H3, one sentence).
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol>
      {steps.map((step) => (
        <li key={step.title}>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

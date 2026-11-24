"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { RadioCard } from "@/components/ui/ChoiceCard";
import { CheckIcon, XIcon } from "@/components/ui/Icons";
import { coverageExamples } from "@/lib/content/coverage";

// Three coverage examples on the left; picking one updates the explanation on the right.
// - The options are real radio buttons: Tab into the group, arrow keys switch examples.
// - The explanation panel is aria-live="polite", so screen readers read the new
//   explanation when the selection changes.
// - Each explanation leads with everyday situations, then the coverage terms.
export function CoverageExplorer() {
  // Which example is shown: 0, 1 or 2. Starts on the middle one ("Liability + collision").
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selected = coverageExamples[selectedIndex];

  return (
    <div className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8">
      {/* Left: the three options */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold">
          Choose an example to compare
        </legend>
        <div className="space-y-3">
          {coverageExamples.map((example, index) => (
            <RadioCard
              key={example.id}
              name="coverage-example"
              checked={index === selectedIndex}
              onSelect={() => setSelectedIndex(index)}
              label={example.name}
              description={example.summary}
            />
          ))}
        </div>
      </fieldset>

      {/* Right: the explanation for the selected option */}
      <div
        aria-live="polite"
        className="rounded-card border-line bg-surface border p-6 shadow-sm md:p-8"
      >
        <Badge>Educational example, not a policy</Badge>
        <h3 className="mt-4 text-xl font-semibold md:text-2xl">
          {selected.name}
        </h3>
        <p className="text-ink-muted mt-2 text-lg">{selected.summary}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-base font-semibold">
              Helps in situations like
            </h4>
            <ul className="mt-3 space-y-3">
              {selected.helpsWith.map((situation) => (
                <li key={situation} className="flex gap-3 text-lg">
                  <CheckIcon className="text-teal-strong mt-1 size-5 shrink-0" />
                  {situation}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold">Doesn&apos;t help if</h4>
            <ul className="mt-3 space-y-3">
              {selected.doesNotHelpWith.map((situation) => (
                <li key={situation} className="flex gap-3 text-lg">
                  <XIcon className="text-ink-muted mt-1 size-5 shrink-0" />
                  {situation}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Short definitions of the coverage terms */}
        <div className="border-line mt-6 border-t pt-6">
          <h4 className="text-base font-semibold">What the terms mean</h4>
          <dl className="mt-3 space-y-3">
            {selected.terms.map((item) => (
              <div key={item.term}>
                <dt className="text-lg font-semibold">{item.term}</dt>
                <dd className="text-ink-muted text-lg">{item.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

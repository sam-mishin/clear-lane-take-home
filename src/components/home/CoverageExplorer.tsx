"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { RadioCard } from "@/components/ui/ChoiceCard";
import { CheckIcon, XIcon } from "@/components/ui/Icons";
import { coverageExamples } from "@/lib/content/coverage";

// Three selectable coverage examples with an adjacent explanation panel.
// Native radios: Tab into the group, arrow keys switch examples, the panel follows.
// The panel is aria-live="polite", so screen readers hear the new explanation.
// Every option leads with situations, then the term (style guide, Coverage explorer).
export function CoverageExplorer() {
  const [selectedId, setSelectedId] = useState(coverageExamples[1].id);
  const selected =
    coverageExamples.find((example) => example.id === selectedId) ??
    coverageExamples[0];

  return (
    <div className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8">
      <fieldset>
        <legend className="mb-4 text-lg font-semibold">
          Choose an example to compare
        </legend>
        <div className="space-y-3">
          {coverageExamples.map((example) => (
            <RadioCard
              key={example.id}
              name="coverage-example"
              value={example.id}
              checked={example.id === selectedId}
              onChange={setSelectedId}
              label={example.name}
              description={example.summary}
            />
          ))}
        </div>
      </fieldset>

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
              {selected.helpsWith.map((item) => (
                <li key={item} className="flex gap-3 text-lg">
                  <CheckIcon className="text-teal-strong mt-1 size-5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold">Doesn&apos;t help if</h4>
            <ul className="mt-3 space-y-3">
              {selected.doesNotHelpWith.map((item) => (
                <li key={item} className="flex gap-3 text-lg">
                  <XIcon className="text-ink-muted mt-1 size-5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-line mt-6 border-t pt-6">
          <h4 className="text-base font-semibold">What the terms mean</h4>
          <dl className="mt-3 space-y-3">
            {selected.terms.map(({ term, definition }) => (
              <div key={term}>
                <dt className="text-lg font-semibold">{term}</dt>
                <dd className="text-ink-muted text-lg">{definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

"use client";

import { AttributedLink } from "@/components/AttributedLink";
import { AGE_RANGES } from "@/lib/ageRanges";
import { track } from "@/lib/analytics";
import { currentAttribution } from "@/lib/attribution";
import { ROUTES } from "@/lib/site";

// Homepage hero quick start: each age range links to /compare?age=<id>, which opens the
// funnel on the ZIP step with that age already chosen (one fewer step), and keeps the
// campaign params. age_selected fires here, where the choice is made; the event never
// includes the age itself.
export function AgeQuickStart() {
  return (
    <div className="mt-8">
      <p id="quick-start-label" className="text-base font-semibold">
        Start with your age range
      </p>
      <ul
        aria-labelledby="quick-start-label"
        className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6"
      >
        {AGE_RANGES.map((range) => (
          <li key={range.id}>
            {/* e.g. /compare?age=45-54, plus any campaign params */}
            <AttributedLink
              href={`${ROUTES.compare}?age=${range.id}`}
              // Log the event before the browser moves to /compare.
              onClick={() =>
                track("age_selected", {
                  attribution: currentAttribution(),
                  page: ROUTES.home,
                })
              }
              className="rounded-card border-line bg-surface hover:border-teal-strong hover:bg-teal-soft flex min-h-12 items-center justify-center border-2 px-2 text-lg font-semibold whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none"
            >
              {range.label}
            </AttributedLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

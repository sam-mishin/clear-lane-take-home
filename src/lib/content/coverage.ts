// Educational coverage examples for the homepage explorer. Not actual policies.
// Situations first, then the term (see docs/style-guide.md, Coverage explorer).

import type { SpotName } from "@/components/illustrations/Spot";

export type CoverageExample = {
  id: string;
  illustration: SpotName; // one everyday scene for this example (see Spot.tsx)
  name: string;
  summary: string;
  helpsWith: string[];
  doesNotHelpWith: string[];
  terms: { term: string; definition: string }[];
};

export const coverageExamples: CoverageExample[] = [
  {
    id: "liability",
    illustration: "liability",
    name: "Liability only",
    summary: "Covers damage you cause to other people and their property.",
    helpsWith: [
      "You rear-end someone at a stoplight and their bumper needs replacing",
      "You back into a neighbor's fence",
      "Another driver is hurt in a crash you caused",
    ],
    doesNotHelpWith: [
      "Repairs to your own car after a crash",
      "Your car is stolen or damaged by hail",
    ],
    terms: [
      {
        term: "Bodily injury liability",
        definition: "Pays for other people's injuries when you're at fault.",
      },
      {
        term: "Property damage liability",
        definition:
          "Pays for damage you cause to someone else's car or property.",
      },
    ],
  },
  {
    id: "collision",
    illustration: "collision",
    name: "Liability + collision",
    summary: "Adds repairs to your own car after a crash, whoever caused it.",
    helpsWith: [
      "Everything liability covers",
      "You slide on ice into a guardrail",
      "You hit a pole in a parking garage",
    ],
    doesNotHelpWith: [
      "A tree branch falls on your parked car",
      "Your car is stolen",
    ],
    terms: [
      {
        term: "Collision coverage",
        definition:
          "Pays to repair your car after it hits another car or an object.",
      },
      {
        term: "Deductible",
        definition: "What you pay toward a repair before coverage kicks in.",
      },
    ],
  },
  {
    id: "comprehensive",
    illustration: "comprehensive",
    name: "Liability + collision + comprehensive",
    summary:
      'Often called "full coverage." Adds damage that isn\'t from a crash.',
    helpsWith: [
      "Everything liability and collision cover",
      "A tree branch falls on your parked car",
      "Your car is stolen, or a hailstorm dents the roof",
      "You hit a deer on a country road",
    ],
    doesNotHelpWith: [
      "Normal wear and tear, like worn tires or brakes",
      "Items stolen from inside the car (usually a home or renters policy)",
    ],
    terms: [
      {
        term: "Comprehensive coverage",
        definition:
          "Pays for theft and damage from things like weather, fire, falling objects and animals.",
      },
      {
        term: "Full coverage",
        definition:
          "An everyday name, not an official one. What it includes varies by insurer.",
      },
    ],
  },
];

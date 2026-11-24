import type { SpotName } from "@/components/illustrations/Spot";

// illustration: which spot drawing sits above the step (see Spot.tsx).
export type Step = { title: string; body: string; illustration: SpotName };

// Homepage "How it works". Titles come straight from the brief.
export const howItWorks: Step[] = [
  {
    title: "Share a few details",
    illustration: "details",
    body: "Start with your age range and ZIP code. No name, phone number or email to begin.",
  },
  {
    title: "Explore options",
    illustration: "explore",
    body: "See which kinds of coverage and insurers are available where you live, explained in plain language.",
  },
  {
    title: "Choose what fits",
    illustration: "choose",
    body: "Decide whether to contact an insurer. You buy directly from them, never through ClearLane.",
  },
];

// Landing page "What happens next".
export const whatHappensNext: Step[] = [
  {
    title: "Answer two questions",
    illustration: "details",
    body: "Pick your age range and enter your ZIP code. You can change either answer before you continue.",
  },
  {
    title: "See what's available",
    illustration: "explore",
    body: "We show options from insurers that serve your area, with the coverage terms explained.",
  },
  {
    title: "Decide in your own time",
    illustration: "choose",
    body: "Contact an insurer only if something fits. There's no obligation and nothing to cancel.",
  },
];

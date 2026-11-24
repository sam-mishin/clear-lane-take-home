import type { SpotName } from "@/components/illustrations/Spot";

// Homepage "Why compare?". Reasons that need no proof: no ratings, savings or counts.
// `illustration` picks the spot drawing beside each reason (see Spot.tsx).
export type Reason = {
  title: string;
  body: string;
  illustration: SpotName;
};

export const whyCompare: Reason[] = [
  {
    title: "Insurers see the same driver differently",
    body: "Each insurer weighs things like age, location and driving history in its own way, so prices for the same coverage can differ.",
    illustration: "scale",
  },
  {
    title: "Your life changes, your policy may not",
    body: "Moving, a new car or a paid-off loan can change what you need. Renewal is a natural time to check.",
    illustration: "renew",
  },
  {
    title: "You see what you're paying for",
    body: "Looking at options side by side makes it easier to spot gaps, extras and deductibles before you commit.",
    illustration: "inspect",
  },
];

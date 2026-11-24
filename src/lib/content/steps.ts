export type Step = { title: string; body: string };

// Homepage "How it works". Titles come straight from the brief.
// TODO: one-sentence body for each.
export const howItWorks: Step[] = [
  { title: "Share a few details", body: "TODO" },
  { title: "Explore options", body: "TODO" },
  { title: "Choose what fits", body: "TODO" },
];

// Landing page "What happens next".
export const whatHappensNext: Step[] = [
  {
    title: "Answer two questions",
    body: "Pick your age range and enter your ZIP code. You can change either answer before you continue.",
  },
  {
    title: "See what's available",
    body: "We show options from insurers that serve your area, with the coverage terms explained.",
  },
  {
    title: "Decide in your own time",
    body: "Contact an insurer only if something fits. There's no obligation and nothing to cancel.",
  },
];

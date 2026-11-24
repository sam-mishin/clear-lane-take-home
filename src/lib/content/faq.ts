export type FaqItem = { question: string; answer: string };

// TODO: write original FAQ copy.
export const homeFaq: FaqItem[] = [];

// Landing page: the questions people have right before they start.
export const compareFaq: FaqItem[] = [
  {
    question: "Why do you ask for my age range?",
    answer:
      "Age is one of the factors many insurers use when pricing coverage, so it helps narrow down options that fit you. We ask for a range, not your birth date.",
  },
  {
    question: "Why do you need my ZIP code?",
    answer:
      "Insurers and coverage rules vary by state and area. Your ZIP code tells us which options are available where you live.",
  },
  {
    question: "Is ClearLane an insurance company?",
    answer:
      "No. ClearLane is a comparison and referral service. Insurers set the prices, issue the policies and handle claims.",
  },
  {
    question: "Does it cost anything?",
    answer:
      "No. Comparing is free, and there's no obligation to contact an insurer or buy anything.",
  },
  {
    question: "Will you ask for my phone number or email?",
    answer:
      "Not to start. You'll only share contact details if you choose to hear from a specific insurer.",
  },
];

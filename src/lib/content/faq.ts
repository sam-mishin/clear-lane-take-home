export type FaqItem = { question: string; answer: string };

// Homepage: what ClearLane is, what it isn't, and what to expect.
export const homeFaq: FaqItem[] = [
  {
    question: "Is ClearLane an insurance company?",
    answer:
      "No. ClearLane is a comparison and referral service. We help you explore options, and insurers set the prices, issue policies and handle claims.",
  },
  {
    question: "Does it cost anything to compare?",
    answer:
      "No. Comparing on ClearLane is free, and you're never obligated to contact an insurer or buy a policy.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "Just your age range and ZIP code. Insurers may ask for more, like your vehicle and driving history, if you decide to get a quote from them.",
  },
  {
    question: "Will comparing change my current policy?",
    answer:
      "No. Your current coverage stays exactly as it is unless you choose to switch and cancel it with your insurer yourself.",
  },
  {
    question: "How often should I compare?",
    answer:
      "A good time is before your policy renews, or after a change like moving, buying a car or adding a driver.",
  },
];

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

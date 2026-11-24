import { ROUTES } from "@/lib/site";

// Article content as plain data. The article page and the article cards read from here,
// so copy changes never mean touching layout code.

// Which illustration an article card shows (public/illustrations/card-<motif>.svg).
export type ArticleMotif = "road" | "shield" | "calendar";

// One card in the homepage Resources section or the article's Related articles.
// - href: the card is a link to a full article.
// - No href: the card is a labeled preview of an article that isn't written yet.
//   sectionId points to the section of the rate guide that covers the same topic,
//   so the preview still has a next step instead of a dead end.
export type ArticleSummary = {
  title: string;
  excerpt: string;
  motif: ArticleMotif;
  href?: string;
  sectionId?: string; // previews only: a section id in whatAffectsYourRate
};

export const articles: ArticleSummary[] = [
  {
    title: "What affects your car insurance rate?",
    excerpt:
      "The main things insurers look at, which ones you can change, and what to check before you compare.",
    motif: "road",
    href: ROUTES.article,
  },
  {
    title: "Deductibles, explained in plain language",
    excerpt:
      "How choosing a higher or lower deductible changes what you pay now and after a claim.",
    motif: "shield",
    sectionId: "your-coverage", // "The coverage you choose" covers deductibles
  },
  {
    title: "When to shop around for car insurance",
    excerpt:
      "Life changes and renewal dates that make it worth taking a fresh look at your coverage.",
    motif: "calendar",
    sectionId: "comparing", // "How to compare with confidence"
  },
];

// One section of the article: its heading (also its table of contents entry) and
// its paragraphs. The id is used for the TOC link, e.g. #where-you-live.
export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

// The one full article: about 620 words with the intro, callout and table.
// Facts are kept general on purpose: no numbers, prices or invented sources.
export const whatAffectsYourRate = {
  title: "What affects your car insurance rate?",
  description:
    "A plain-language guide to the factors insurers weigh when pricing car insurance, which ones you can change, and how to compare with confidence.",
  byline: "ClearLane Editorial Team",
  updated: "2026-11-24", // shown as "Updated November 24, 2026" (ISO date for <time>)
  intro:
    "Two drivers with the same car can pay very different amounts for car insurance. That's because insurers price risk, and each one measures it a little differently. Knowing what goes into your rate makes it easier to understand a quote, ask better questions and spot when it's worth comparing.",
  sections: [
    {
      id: "about-you",
      heading: "Who you are as a driver",
      paragraphs: [
        "Age and driving experience are among the first things insurers consider. Newer drivers have less history to go on, so they often pay more. Rates tend to settle as drivers gain experience, and they can change again later in life.",
        "Some insurers also consider marital status or, where state rules allow, credit-based insurance scores. What's permitted varies by state, so the same factor might matter in one place and not at all in another.",
      ],
    },
    {
      id: "where-you-live",
      heading: "Where you live and park",
      paragraphs: [
        "Your ZIP code tells an insurer a lot about the road conditions around you: traffic, weather, theft and how often claims happen nearby. A busy city street and a quiet rural road carry different risks, even for the same driver.",
        "Where you park overnight can matter too. A garage or private driveway may be treated differently from street parking.",
      ],
    },
    {
      id: "your-record",
      heading: "Your driving record",
      paragraphs: [
        "Recent at-fault accidents, speeding tickets and more serious violations usually raise rates, because they suggest a higher chance of future claims. The good news is that most of these count for a limited number of years, so a clean record works in your favor over time.",
        "Your claims history matters as well. Several claims in a short period can affect pricing, even when you weren't at fault.",
      ],
    },
    {
      id: "your-car",
      heading: "The car you drive and how you use it",
      paragraphs: [
        "Insurers look at what your car costs to repair or replace, how well it protects the people inside and how often that model is stolen. Newer safety features can help, while expensive parts can add cost.",
        "How much you drive counts, too. A long daily commute means more time on the road than occasional weekend trips. If your mileage has dropped, it's worth telling your insurer.",
      ],
    },
    {
      id: "your-coverage",
      heading: "The coverage you choose",
      paragraphs: [
        "This is the part you control most directly. Higher liability limits and added coverage, like collision and comprehensive, cost more because they protect you in more situations. A higher deductible usually lowers your premium, but it means you pay more out of pocket if you file a claim.",
        "The right balance depends on your car's value, your savings and how much risk you're comfortable carrying. Cutting coverage only to lower the price can leave you exposed when you need it most.",
      ],
    },
    {
      id: "comparing",
      heading: "How to compare with confidence",
      paragraphs: [
        "Because every insurer weighs these factors in its own way, comparing is the most reliable way to see what's available to you. Before you start, have your current policy handy so you can match coverage limits and deductibles, not just the price.",
        "Then look at what each option includes, ask about anything that isn't clear, and choose the coverage that fits how you actually drive.",
      ],
    },
  ] satisfies ArticleSection[],
};

// The comparison table at the end of the article. One object per row.
export type RateFactorRow = {
  factor: string;
  canChange: string; // "Can you change it?"
  whatToDo: string; // "What you can do"
};

export const rateFactorTable: {
  caption: string;
  rows: RateFactorRow[];
} = {
  caption: "Which rate factors you can change, and what to do about them",
  rows: [
    {
      factor: "Age and experience",
      canChange: "Not directly",
      whatToDo: "Keep a clean record as you build experience",
    },
    {
      factor: "Where you live",
      canChange: "Rarely",
      whatToDo:
        "Update your insurer when you move or start parking in a garage",
    },
    {
      factor: "Driving record",
      canChange: "Over time",
      whatToDo: "Drive safely; violations usually count for a limited time",
    },
    {
      factor: "Car and mileage",
      canChange: "Sometimes",
      whatToDo: "Check costs before you buy, and report lower mileage",
    },
    {
      factor: "Coverage and deductible",
      canChange: "Yes",
      whatToDo: "Compare limits and deductibles side by side",
    },
  ],
};

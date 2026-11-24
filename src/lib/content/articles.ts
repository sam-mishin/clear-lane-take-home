import { ROUTES } from "@/lib/site";

// Article cards for homepage Resources and the article's Related articles.
// A card with no href is a labeled preview (not a link).
export type ArticleMotif = "road" | "shield" | "calendar";

export type ArticleSummary = {
  title: string;
  excerpt: string;
  motif: ArticleMotif; // which CardArt illustration the card shows
  href?: string;
};

// TODO: excerpts and the two preview titles.
export const articles: ArticleSummary[] = [
  {
    title: "What affects your car insurance rate?",
    excerpt: "TODO",
    motif: "road",
    href: ROUTES.article,
  },
  { title: "TODO: preview article", excerpt: "TODO", motif: "shield" },
  { title: "TODO: preview article", excerpt: "TODO", motif: "calendar" },
];

// The one full article. Sections drive both the body and the table of contents,
// so adding a section updates the TOC automatically.
export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export const whatAffectsYourRate = {
  title: "What affects your car insurance rate?",
  description: "TODO: unique meta description.",
  byline: "ClearLane Editorial Team",
  intro: "TODO: intro paragraph.",
  // TODO: 4+ sections, 500–700 words total with the intro.
  sections: [
    { id: "TODO-section-1", heading: "TODO section 1", paragraphs: [] },
    { id: "TODO-section-2", heading: "TODO section 2", paragraphs: [] },
    { id: "TODO-section-3", heading: "TODO section 3", paragraphs: [] },
    { id: "TODO-section-4", heading: "TODO section 4", paragraphs: [] },
  ] satisfies ArticleSection[],
};

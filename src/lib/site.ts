// Site-wide settings in one place. Change a route, label or the disclosure here
// and every page picks it up.

export const ROUTES = {
  home: "/",
  compare: "/compare",
  article: "/blog/what-affects-your-car-insurance-rate",
} as const;

export const NAV_LINKS = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.compare, label: "Compare" },
  { href: ROUTES.article, label: "What affects your rate" },
] as const;

// The brief's primary action. Use this constant, never a hand-typed label.
export const CTA_LABEL = "Compare my options";

// TODO: final wording of the disclosure (comparison and referral service, not an insurer;
// the brand is fictional).
export const DISCLOSURE = "TODO: disclosure";

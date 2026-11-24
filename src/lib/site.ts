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

// Footer disclosure on every page. (The "fictional brand" line is FICTIONAL_NOTE below.)
export const DISCLOSURE =
  "ClearLane Auto is a comparison and referral service, not an insurance company. We don't issue policies, set rates or handle claims. Coverage, prices and eligibility are decided by each insurer.";

// Short version, shown under every funnel button (NotInsurerNote).
export const NOT_AN_INSURER =
  "Free to use. ClearLane is a comparison and referral service, not an insurer.";

// Shown in the footer on every page.
export const FICTIONAL_NOTE =
  "ClearLane Auto is a fictional brand created for a frontend take-home exercise.";

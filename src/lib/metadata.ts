import type { Metadata } from "next";

// Shared metadata helpers. Next.js replaces (not merges) a parent's openGraph
// object when a page sets its own, so every page builds its tags through here.

export const SITE_NAME = "ClearLane Auto";

// The site's full address, used to turn "/compare" into an absolute URL in the
// canonical link and the link-preview image tags.
// - NEXT_PUBLIC_SITE_URL: set this when the site has its real domain.
// - On Vercel, the production URL Vercel provides.
// - Otherwise (running locally): localhost.
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

export const SITE_DESCRIPTION =
  "ClearLane Auto is a free comparison and referral service that helps drivers explore car insurance options. We're not an insurer.";

// Open Graph tags for link previews (texts, Facebook, Slack, X).
// The title is shown without the " | ClearLane Auto" suffix because
// og:site_name already carries the brand.
export function openGraph(
  title: string,
  description: string,
  type: "website" | "article" = "website",
): Metadata["openGraph"] {
  return {
    title,
    description,
    siteName: SITE_NAME,
    locale: "en_US",
    type,
    // The link-preview picture (public/og-image.png, 1200 x 630): the wordmark,
    // the hero headline and the road landscape. Same picture on every page.
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClearLane Auto: a clearer road to your next policy",
      },
    ],
  };
}

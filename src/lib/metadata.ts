import type { Metadata } from "next";

// Shared metadata helpers. Next.js replaces (not merges) a parent's openGraph
// object when a page sets its own, so every page builds its tags through here.

export const SITE_NAME = "ClearLane Auto";

export const SITE_DESCRIPTION =
  "ClearLane Auto is a free comparison and referral service that helps drivers explore car insurance options. We're not an insurer.";

// Open Graph tags for link previews (texts, Facebook, Slack).
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
  };
}

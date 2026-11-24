// Campaign attribution: utm_source, utm_campaign, click_id.
// URL-based only: the params ride along in links, so nothing is stored in the browser.
// To track another key later, add it to ATTRIBUTION_KEYS. Nothing else changes.

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_campaign",
  "click_id",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

// Pull only the whitelisted keys out of a URL's search params.
// "?utm_source=fb&click_id=abc&mock=fail" -> { utm_source: "fb", click_id: "abc" }
export function pickAttribution(params: URLSearchParams): Attribution {
  const attribution: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) attribution[key] = value;
  }
  return attribution;
}

// Read attribution from the address bar at the moment it's needed (event handlers only).
export function currentAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return pickAttribution(new URLSearchParams(window.location.search));
}

// Add the attribution params to a link, keeping any params already on it.
// withAttribution("/compare", { utm_source: "fb" }) -> "/compare?utm_source=fb"
export function withAttribution(
  href: string,
  attribution: Attribution,
): string {
  // A placeholder base lets URL parse relative paths like "/compare".
  const url = new URL(href, "http://placeholder.local");
  for (const key of ATTRIBUTION_KEYS) {
    const value = attribution[key];
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.pathname + url.search + url.hash;
}

// Campaign attribution: utm_source, utm_campaign, click_id.
// - The URL first: the params ride along in every internal link (AttributedLink).
// - Then a cookie: src/proxy.ts saves the params in ATTRIBUTION_COOKIE when someone
//   arrives with them, so a later visit without params is still credited to the ad.
// To track another key later, add it to ATTRIBUTION_KEYS. Nothing else changes.

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_campaign",
  "click_id",
] as const;

// The cookie src/proxy.ts sets, and how long it lasts. 30 days roughly matches the
// attribution windows ad platforms use for clicks.
export const ATTRIBUTION_COOKIE = "cl_attribution";
export const ATTRIBUTION_COOKIE_DAYS = 30;

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

// The attribution to use right now (event handlers only, so it runs in the browser):
// - the params in the address bar, if there are any (this visit's ad click), or
// - the saved cookie, if they came from an ad earlier and are back without params, or
// - nothing ({}), for a visitor who never came from a campaign.
export function currentAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const fromUrl = pickAttribution(new URLSearchParams(window.location.search));
  if (Object.keys(fromUrl).length > 0) return fromUrl;
  return attributionFromCookie();
}

// Read ATTRIBUTION_COOKIE. document.cookie is one string, "a=1; cl_attribution=...",
// so find our entry, undo the URL-encoding the cookie was saved with, and read it like
// a query string. pickAttribution keeps only the three known keys.
function attributionFromCookie(): Attribution {
  const prefix = `${ATTRIBUTION_COOKIE}=`;
  const entry = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix));
  if (!entry) return {};
  const value = decodeURIComponent(entry.slice(prefix.length));
  return pickAttribution(new URLSearchParams(value));
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

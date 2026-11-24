// Campaign attribution: utm_source, utm_campaign, click_id.
// Only these three keys are kept (whitelist).

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_campaign",
  "click_id",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

export const ATTRIBUTION_STORAGE_KEY = "clearlane_attribution";

// TODO: pull only the whitelisted keys out of a URLSearchParams.
export function pickAttribution(_params: URLSearchParams): Attribution {
  return {};
}

// TODO: save to sessionStorage so params survive / -> /blog/... -> /compare.
// Browser only. Call from useEffect or an event handler.
export function saveAttribution(_attribution: Attribution): void {}

// TODO: read from sessionStorage. Return {} on the server or if nothing is stored.
export function readStoredAttribution(): Attribution {
  return {};
}

// TODO: return href with attribution params appended.
// Current URL params win over stored ones; keep any params already on href.
export function withAttribution(
  href: string,
  _attribution?: Attribution,
): string {
  return href;
}

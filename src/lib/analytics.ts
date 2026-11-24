import { ATTRIBUTION_KEYS, type Attribution } from "@/lib/attribution";

// Mock analytics. Events are logged to the browser console instead of being sent anywhere.
// Events only ever carry the page and the campaign params, never the person's answers.

// The only two events the funnel sends.
export type EventName = "age_selected" | "comparison_started";

// What a caller passes in.
export type EventProps = {
  attribution: Attribution;
  page: string;
};

// What gets logged.
export type AnalyticsEvent = {
  name: EventName;
  page: string;
  attribution: Attribution;
  timestamp: string; // ISO
};

// Build the event, keep only the campaign keys, log it, and return it.
export function track(name: EventName, props: EventProps): AnalyticsEvent {
  const event: AnalyticsEvent = {
    name,
    page: props.page,
    attribution: onlyCampaignKeys(props.attribution),
    timestamp: new Date().toISOString(),
  };
  send(event);
  return event;
}

// Keep only utm_source, utm_campaign and click_id, even if a caller passes more.
function onlyCampaignKeys(attribution: Attribution): Attribution {
  const clean: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = attribution[key];
    if (value) clean[key] = value;
  }
  return clean;
}

// The one place that knows where events go.
function send(event: AnalyticsEvent): void {
  console.log(`[analytics] ${event.name}`, event);
}

import { ATTRIBUTION_KEYS, type Attribution } from "@/lib/attribution";

// Mock analytics. Events are logged to the browser console instead of being sent anywhere.
// Events only ever carry the page and the campaign params, never the person's answers.

// Every event the funnel sends, in funnel order. The brief asks for age_selected and
// comparison_started; the other three show where people drop off between them.
// - age_selected: an age range was picked (homepage quick start or /compare step 1)
// - zip_step_viewed: the ZIP step appeared
// - zip_invalid: "Compare my options" pressed with an empty or malformed ZIP
// - submit_failed: the comparison request failed (the error state appeared)
// - comparison_started: the request succeeded
export type EventName =
  | "age_selected"
  | "zip_step_viewed"
  | "zip_invalid"
  | "submit_failed"
  | "comparison_started";

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

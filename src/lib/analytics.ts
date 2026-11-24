import { ATTRIBUTION_KEYS, type Attribution } from "@/lib/attribution";

export type EventName = "age_selected" | "comparison_started";

export type EventProps = {
  attribution: Attribution;
  page: string;
};

export type AnalyticsEvent = {
  name: EventName;
  page: string;
  attribution: Attribution;
  timestamp: string; // ISO
};

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

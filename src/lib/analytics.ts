// Mock analytics. Logs to the console and feeds the debug panel.
// Rules from the brief:
// - No personal answers (age, ZIP) in event props.
// - comparison_started fires ONLY after a successful mock submission.
// - Call track() from event handlers / after await, never in useEffect
//   (Strict Mode runs effects twice in dev).

import type { Attribution } from "@/lib/attribution";

export type EventName = "age_selected" | "comparison_started";

export type AnalyticsEvent = {
  name: EventName;
  attribution: Attribution;
  page: string;
  timestamp: string;
};

// TODO: console.info the event and push it to a store the DebugPanel can subscribe to.
export function track(_name: EventName): void {
  throw new Error("track() not implemented yet");
}

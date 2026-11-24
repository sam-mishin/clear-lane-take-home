// Mock comparison request. No real API. The funnel only knows about
// submitComparison(), so a real endpoint can replace the mock later without
// touching the UI.

import type { AgeRangeId } from "@/lib/ageRanges";
import type { Attribution } from "@/lib/attribution";

export type SubmissionPayload = {
  ageRange: AgeRangeId;
  zip: string; // keep as a string so "02134" keeps its leading 0
  attribution: Attribution;
  submittedAt: string; // ISO timestamp
};

export type SubmissionResult = { ok: true; id: string };

const MOCK_DELAY_MS = 1200;

// Waits ~1.2s, then resolves, or throws when options.fail is true.
// The funnel sets fail from ?mock=fail in the URL (documented in the README).
export async function submitComparison(
  payload: SubmissionPayload,
  options: { fail: boolean },
): Promise<SubmissionResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  if (options.fail) {
    throw new Error("Mock comparison service unavailable");
  }

  // Shown so reviewers can confirm the answers and campaign params reached the request.
  // This is the mock request, not analytics, so the answers belong here.
  console.info("[mock request] comparison submitted", payload);

  return { ok: true, id: crypto.randomUUID() };
}

// Fake async submission. No real API.

import type { AgeRangeId } from "@/lib/ageRanges";
import type { Attribution } from "@/lib/attribution";

export type SubmissionPayload = {
  ageRange: AgeRangeId;
  zip: string; // keep as a string so "02134" keeps its leading 0
  attribution: Attribution;
  submittedAt: string; // ISO timestamp
};

export type SubmissionResult = { ok: true; id: string };

// TODO: wait ~1.2s, then resolve, or throw when a forced error is on
// (?mock=fail in the URL or the DebugPanel toggle). Document both in the README.
export async function mockSubmit(
  _payload: SubmissionPayload,
): Promise<SubmissionResult> {
  throw new Error("mockSubmit() not implemented yet");
}

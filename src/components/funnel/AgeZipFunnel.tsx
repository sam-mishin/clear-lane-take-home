"use client";

// The Task 1 funnel: age -> ZIP -> submit.
// Keep ANSWERS (ageRange, zip) separate from STATUS so an error never wipes answers.
//
// TODO (see the build guide, section 4):
// - useReducer with SELECT_AGE, CHANGE_AGE, SET_ZIP, SUBMIT, SUBMIT_OK, SUBMIT_FAIL, RETRY
// - age step: fieldset/legend + radio cards; fire age_selected
// - ZIP step: type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5},
//   /^\d{5}$/ validation, aria-invalid + aria-describedby error
// - focus management between steps
// - double-submit guard (disabled + useRef)
// - loading / success / error + retry; comparison_started only on success
// - payload includes attribution; ?mock=fail in the URL makes submitComparison() fail

import type { AgeRangeId } from "@/lib/ageRanges";

export type FunnelStatus = "age" | "zip" | "submitting" | "success" | "error";

export type FunnelState = {
  status: FunnelStatus;
  ageRange: AgeRangeId | null;
  zip: string;
  zipError: string | null;
};

export function AgeZipFunnel() {
  return <div>{/* TODO */}</div>;
}

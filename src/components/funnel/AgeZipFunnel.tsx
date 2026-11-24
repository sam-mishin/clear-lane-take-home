"use client";

// The Task 1 funnel: age -> ZIP -> submit.
//
// How it's built:
// - useReducer holds ANSWERS (ageRange, zip) separately from STATUS (which screen),
//   so a failed request never wipes what the person entered.
// - useRef is used for things the screen doesn't show: the double-submit lock,
//   the last status (for focus moves) and the elements we move focus to.
// - Events: age_selected when the age step is done; comparison_started only after
//   the request succeeds. Neither event includes age or ZIP.
// - Add ?mock=fail to the URL to make submitComparison() fail.

import { useEffect, useId, useReducer, useRef, type FormEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AGE_RANGES, type AgeRangeId } from "@/lib/ageRanges";
import { pickAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { submitComparison } from "@/lib/submitComparison";
import { CTA_LABEL } from "@/lib/site";
import { Button } from "@/components/ui/Button";

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export type FunnelStatus = "age" | "zip" | "submitting" | "success" | "error";

export type FunnelState = {
  status: FunnelStatus; // which screen to show
  ageRange: AgeRangeId | null; // answer
  zip: string; // answer, always a string so "02134" keeps its leading zero
  zipError: string | null; // validation message under the ZIP field
};

type FunnelAction =
  | { type: "PICK_AGE"; ageRange: AgeRangeId } // radio changed (stays on step 1)
  | { type: "GO_TO_ZIP"; ageRange: AgeRangeId } // age step done
  | { type: "CHANGE_AGE" } // "Change" link on step 2
  | { type: "SET_ZIP"; zip: string }
  | { type: "ZIP_INVALID"; error: string }
  | { type: "SUBMIT" }
  | { type: "SUBMIT_OK" }
  | { type: "SUBMIT_FAIL" };

const initialState: FunnelState = {
  status: "age",
  ageRange: null,
  zip: "",
  zipError: null,
};

// Pure function: (current state, what happened) -> next state.
// All the funnel's rules live here. No fetching, logging or DOM work.
function funnelReducer(state: FunnelState, action: FunnelAction): FunnelState {
  switch (action.type) {
    case "PICK_AGE":
      return { ...state, ageRange: action.ageRange };

    case "GO_TO_ZIP":
      return { ...state, ageRange: action.ageRange, status: "zip" };

    case "CHANGE_AGE":
      // Back to step 1. The age stays selected and the ZIP is kept.
      return state.status === "zip" || state.status === "error"
        ? { ...state, status: "age" }
        : state;

    case "SET_ZIP":
      // Typing clears the old error message.
      return { ...state, zip: action.zip.trim(), zipError: null };

    case "ZIP_INVALID":
      return { ...state, zipError: action.error };

    case "SUBMIT":
      return { ...state, status: "submitting", zipError: null };

    // Only accept a result while a request is actually in flight.
    case "SUBMIT_OK":
      return state.status === "submitting"
        ? { ...state, status: "success" }
        : state;

    case "SUBMIT_FAIL":
      return state.status === "submitting"
        ? { ...state, status: "error" }
        : state;
  }
}

function validateZip(zip: string): string | null {
  if (zip === "") return "Enter your ZIP code.";
  if (!/^\d{5}$/.test(zip)) return "Enter a 5-digit ZIP code, like 02134.";
  return null;
}

function ageLabel(id: AgeRangeId | null): string {
  return AGE_RANGES.find((range) => range.id === id)?.label ?? "";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AgeZipFunnel() {
  const [state, dispatch] = useReducer(funnelReducer, initialState);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Unique ids so labels, hints and errors are linked for screen readers.
  const zipId = useId();
  const zipHintId = `${zipId}-hint`;
  const zipErrorId = `${zipId}-error`;

  // Double-submit lock. A ref changes instantly (no re-render), so a second
  // click a few milliseconds later already sees `true` and stops.
  const inFlight = useRef(false);

  // Elements we move focus to, plus the last status we handled.
  const ageGroupRef = useRef<HTMLFieldSetElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousStatus = useRef(state.status);

  // Focus management: when the screen changes, put keyboard and screen reader
  // users where the new content is. Skips the first render, so the page
  // doesn't jump on load.
  useEffect(() => {
    if (previousStatus.current === state.status) return;
    previousStatus.current = state.status;

    if (state.status === "zip") zipInputRef.current?.focus();
    if (state.status === "age") {
      ageGroupRef.current
        ?.querySelector<HTMLInputElement>("input:checked")
        ?.focus();
    }
    if (state.status === "error") errorRef.current?.focus();
    if (state.status === "success") successHeadingRef.current?.focus();
  }, [state.status]);

  const isSubmitting = state.status === "submitting";

  // -- Step 1: age ----------------------------------------------------------

  function goToZip(ageRange: AgeRangeId) {
    dispatch({ type: "GO_TO_ZIP", ageRange });
    track("age_selected", {
      attribution: pickAttribution(searchParams),
      page: pathname,
    });
  }

  // Enter on a radio, or the Continue button.
  function handleAgeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.ageRange) goToZip(state.ageRange);
  }

  // -- Step 2: ZIP + submit -------------------------------------------------

  async function handleZipSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !state.ageRange) return; // already sending: ignore

    const error = validateZip(state.zip);
    if (error) {
      dispatch({ type: "ZIP_INVALID", error });
      zipInputRef.current?.focus(); // screen readers then read the error
      return;
    }

    inFlight.current = true; // locked right now, before any re-render
    dispatch({ type: "SUBMIT" });
    const attribution = pickAttribution(searchParams);

    try {
      await submitComparison(
        {
          ageRange: state.ageRange,
          zip: state.zip,
          attribution,
          submittedAt: new Date().toISOString(),
        },
        { fail: searchParams.get("mock") === "fail" },
      );
      dispatch({ type: "SUBMIT_OK" });
      track("comparison_started", { attribution, page: pathname }); // success only
    } catch {
      dispatch({ type: "SUBMIT_FAIL" }); // answers stay; "Try again" resubmits
    } finally {
      inFlight.current = false; // unlock so "Try again" works
    }
  }

  // -- Render ---------------------------------------------------------------

  if (state.status === "success") {
    return (
      <div className="rounded-card border-line bg-surface border p-6 shadow-sm md:p-8">
        <h3 ref={successHeadingRef} tabIndex={-1}>
          You&apos;re all set
        </h3>
        <p className="text-ink-muted mt-2">
          We&apos;ll look for options for drivers aged{" "}
          {ageLabel(state.ageRange)} near {state.zip}.
        </p>
      </div>
    );
  }

  if (state.status === "age") {
    return (
      <form
        onSubmit={handleAgeSubmit}
        className="rounded-card border-line bg-surface border p-6 shadow-sm md:p-8"
      >
        <p className="text-ink-muted text-sm font-semibold">Step 1 of 2</p>

        <fieldset ref={ageGroupRef} className="mt-2">
          <legend className="text-xl font-semibold">How old are you?</legend>

          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {AGE_RANGES.map((range) => (
              <label
                key={range.id}
                className="group rounded-card border-line bg-surface hover:border-ink-muted has-checked:border-teal-strong has-checked:bg-teal-soft has-focus-visible:outline-teal-strong flex min-h-14 cursor-pointer items-center justify-between border-2 px-5 font-semibold has-focus-visible:outline-2 has-focus-visible:outline-offset-2"
              >
                <input
                  type="radio"
                  name="ageRange"
                  value={range.id}
                  required
                  checked={state.ageRange === range.id}
                  onChange={() =>
                    dispatch({ type: "PICK_AGE", ageRange: range.id })
                  }
                  // A tap or mouse click moves straight on (event.detail > 0).
                  // Arrow keys and Space only select (event.detail is 0), so
                  // keyboard users can look through the options, then press
                  // Enter or Continue.
                  onClick={(event) => {
                    if (event.detail > 0) goToZip(range.id);
                  }}
                  className="sr-only"
                />
                {range.label}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="text-teal-strong hidden size-5 group-has-checked:block"
                >
                  <path
                    d="M4 10.5l4 4 8-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            ))}
          </div>
        </fieldset>

        <Button type="submit" className="mt-6">
          Continue
        </Button>
      </form>
    );
  }

  // status: "zip" | "submitting" | "error"
  return (
    <form
      onSubmit={handleZipSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="rounded-card border-line bg-surface border p-6 shadow-sm md:p-8"
    >
      <p className="text-ink-muted text-sm font-semibold">Step 2 of 2</p>

      <p className="mt-2">
        Age: <span className="font-semibold">{ageLabel(state.ageRange)}</span>{" "}
        <button
          type="button"
          onClick={() => dispatch({ type: "CHANGE_AGE" })}
          disabled={isSubmitting}
          className="text-teal-strong hover:text-ink font-semibold underline underline-offset-4 disabled:opacity-60"
        >
          Change<span className="sr-only"> age range</span>
        </button>
      </p>

      <label
        htmlFor={zipId}
        className="mt-6 mb-2 block text-base font-semibold"
      >
        What&apos;s your ZIP code?
      </label>
      <input
        ref={zipInputRef}
        id={zipId}
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={5}
        value={state.zip}
        onChange={(event) =>
          dispatch({ type: "SET_ZIP", zip: event.target.value })
        }
        readOnly={isSubmitting}
        aria-invalid={state.zipError ? true : undefined}
        aria-describedby={
          state.zipError ? `${zipHintId} ${zipErrorId}` : zipHintId
        }
        className="border-ink-muted bg-surface hover:border-ink focus-visible:border-teal-strong aria-invalid:border-error min-h-12 w-full rounded-xl border-2 px-4 text-lg tracking-widest"
      />
      <p id={zipHintId} className="text-ink-muted mt-2 text-sm">
        5 digits, like 02134
      </p>
      {state.zipError && (
        <p id={zipErrorId} className="text-error mt-2 text-sm font-medium">
          {state.zipError}
        </p>
      )}

      {state.status === "error" && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="border-error bg-surface mt-6 rounded-xl border-2 p-4"
        >
          <p className="font-semibold">
            We couldn&apos;t reach our comparison service.
          </p>
          <p className="text-ink-muted">
            Your answers are saved. Please try again.
          </p>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="mt-6">
        {isSubmitting
          ? "Finding options…"
          : state.status === "error"
            ? "Try again"
            : CTA_LABEL}
      </Button>

      <p className="text-ink-muted mt-3 text-sm">
        Free to use. ClearLane is a comparison and referral service, not an
        insurer.
      </p>
    </form>
  );
}

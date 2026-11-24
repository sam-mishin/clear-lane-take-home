"use client";

// The Task 1 funnel: age -> ZIP -> submit.
//
// How it's built:
// - useReducer holds the ANSWERS (ageRange, zip) separately from the STATUS (which
//   screen is showing), so a failed request never wipes what the person entered.
// - useRef holds things the screen doesn't show: the double-submit lock, the number of
//   attempts (for the mock error) and the elements we move focus to.
// - Events: age_selected when an age is picked, zip_step_viewed when the ZIP step
//   appears, zip_invalid for a bad ZIP, submit_failed when the request fails, and
//   comparison_started only after the request succeeds. No event includes the age or
//   the ZIP code.
// - Browser Back: picking an age adds a history entry, so the phone's Back button
//   returns to the age step instead of leaving the page.
// - Campaign params are read from the address bar when they're needed, so the funnel
//   doesn't need useSearchParams (and shows up in the page's first HTML).
//
// Testing the error state (also in the README):
//   ?mock=fail         the first attempt fails, "Try again" then succeeds
//   ?mock=fail-always  every attempt fails
// Homepage quick start: /compare?age=45-54 opens straight on the ZIP step.

import { useEffect, useReducer, useRef, useState } from "react";
import { FUNNEL_ID } from "@/components/funnel/goToFunnel";
import { NotInsurerNote } from "@/components/NotInsurerNote";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChoiceButton } from "@/components/ui/ChoiceCard";
import { AlertIcon, ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { TextField } from "@/components/ui/TextField";
import { AGE_RANGES, type AgeRangeId } from "@/lib/ageRanges";
import { track } from "@/lib/analytics";
import { currentAttribution } from "@/lib/attribution";
import { CTA_LABEL, ROUTES } from "@/lib/site";
import { submitComparison } from "@/lib/submitComparison";

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
  | { type: "SELECT_AGE"; ageRange: AgeRangeId } // age picked: go to the ZIP step
  | { type: "CHANGE_AGE" } // "Change" on the ZIP step: back to step 1
  | { type: "SET_ZIP"; zip: string } // typing in the ZIP field
  | { type: "ZIP_INVALID"; error: string } // submit pressed with a bad ZIP
  | { type: "SUBMIT" } // request started
  | { type: "SUBMIT_OK" } // request worked
  | { type: "SUBMIT_FAIL" } // request failed
  | { type: "EDIT_ANSWERS" }; // "Change my answers" on the success screen, or browser Forward

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
    case "SELECT_AGE":
      return { ...state, ageRange: action.ageRange, status: "zip" };

    case "CHANGE_AGE":
      // Back to step 1. The age stays highlighted and the ZIP is kept.
      return { ...state, status: "age", zipError: null };

    case "SET_ZIP":
      // Digits only, at most 5: letters and spaces never appear, and a pasted
      // "02134-1234" becomes "02134". Typing clears the old error message.
      return {
        ...state,
        zip: action.zip.replace(/\D/g, "").slice(0, 5),
        zipError: null,
      };

    case "ZIP_INVALID":
      return { ...state, zipError: action.error };

    case "SUBMIT":
      return { ...state, status: "submitting", zipError: null };

    case "SUBMIT_OK":
      return { ...state, status: "success" };

    case "SUBMIT_FAIL":
      // The answers are untouched, so the form comes back filled in.
      return { ...state, status: "error" };

    case "EDIT_ANSWERS":
      // Back to the ZIP step, answers kept. Without an age there's no ZIP step yet.
      return { ...state, status: state.ageRange ? "zip" : "age" };
  }
}

// Returns an error message, or null when the ZIP code is fine.
function validateZip(zip: string): string | null {
  if (zip === "") return "Enter your ZIP code.";
  if (!/^\d{5}$/.test(zip)) return "Enter a 5-digit ZIP code, like 02134.";
  return null;
}

// "45-54" -> "45–54" for display.
function ageLabel(id: AgeRangeId | null): string {
  const range = AGE_RANGES.find((item) => item.id === id);
  return range ? range.label : "";
}

// Should this attempt fail on purpose? Only when ?mock=fail is in the URL.
function shouldMockFail(attemptNumber: number): boolean {
  const mock = new URLSearchParams(window.location.search).get("mock");
  if (mock === "fail-always") return true;
  if (mock === "fail") return attemptNumber === 1; // so "Try again" can succeed
  return false;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AgeZipFunnel() {
  const [state, dispatch] = useReducer(funnelReducer, initialState);

  // Success screen: has "See my options" been pressed? (demo note only)
  const [showNextStep, setShowNextStep] = useState(false);

  // Double-submit lock. A ref changes instantly (no re-render), so a second
  // click a few milliseconds later already sees `true` and stops.
  const inFlight = useRef(false);
  const attempts = useRef(0);

  // Elements we move focus to.
  const selectedAgeRef = useRef<HTMLButtonElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Has the ?age= prefill run? (React runs effects twice in development; this stops
  // zip_step_viewed from being logged twice.)
  const prefillDone = useRef(false);

  // The status we last moved focus for. Starts as the first status, so nothing
  // gets focused when the page loads.
  const previousStatus = useRef(state.status);

  // Focus management: when the screen changes, put keyboard and screen reader
  // users where the new content is.
  useEffect(() => {
    if (previousStatus.current === state.status) return;
    previousStatus.current = state.status;

    if (state.status === "age") selectedAgeRef.current?.focus();
    if (state.status === "zip") zipInputRef.current?.focus();
    // Error: focus "Try again". That also scrolls it into view on phones, where the
    // error message would otherwise push it below the screen. The message itself is
    // role="alert", so screen readers still read it out.
    if (state.status === "error") submitButtonRef.current?.focus();
    if (state.status === "success") successHeadingRef.current?.focus();
  }, [state.status]);

  // Homepage quick start: /compare?age=45-54 skips step 1. The age was picked (and
  // age_selected sent) on the homepage, so no event here. previousStatus is set to
  // "zip" first, so the ZIP field is NOT focused: that would pop open the phone
  // keyboard as soon as the page loads.
  // zip_step_viewed is logged here, since the ZIP step is the first thing they see.
  useEffect(() => {
    if (prefillDone.current) return;
    prefillDone.current = true;
    const ageFromUrl = new URLSearchParams(window.location.search).get("age");
    const range = AGE_RANGES.find((item) => item.id === ageFromUrl);
    if (range) {
      previousStatus.current = "zip";
      dispatch({ type: "SELECT_AGE", ageRange: range.id });
      track("zip_step_viewed", {
        attribution: currentAttribution(),
        page: ROUTES.compare,
      });
    }
  }, []);

  // Browser Back and Forward. Picking an age adds a history entry marked
  // { funnelStep: "zip" } (see selectAge), so:
  // - Back from the ZIP step lands on the entry before it: show the age step.
  // - Forward lands on the "zip" entry again: show the ZIP step.
  // Answers are kept either way. Ignored while a request is in flight.
  useEffect(() => {
    function onPopState(event: PopStateEvent) {
      if (inFlight.current) return;
      if (event.state?.funnelStep === "zip") {
        dispatch({ type: "EDIT_ANSWERS" });
      } else {
        dispatch({ type: "CHANGE_AGE" });
      }
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const isSubmitting = state.status === "submitting";

  // -- Step 1: age ----------------------------------------------------------

  function selectAge(ageRange: AgeRangeId) {
    dispatch({ type: "SELECT_AGE", ageRange });
    // A history entry for the ZIP step (same URL), so Back returns to step 1.
    // Next.js supports calling pushState directly and keeps its own data in the entry.
    window.history.pushState({ funnelStep: "zip" }, "");
    const attribution = currentAttribution();
    track("age_selected", { attribution, page: ROUTES.compare });
    track("zip_step_viewed", { attribution, page: ROUTES.compare });
  }

  // "Change" next to the chosen age. If the ZIP step has its own history entry, go
  // back through history (onPopState then shows step 1), so Back and "Change" stay
  // in step. Otherwise (opened from the homepage with ?age=) just show step 1.
  function changeAge() {
    if (window.history.state?.funnelStep === "zip") {
      window.history.back();
    } else {
      dispatch({ type: "CHANGE_AGE" });
    }
  }

  // -- Step 2: ZIP + submit -------------------------------------------------

  async function handleZipSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !state.ageRange) return; // already sending: ignore

    const error = validateZip(state.zip);
    if (error) {
      dispatch({ type: "ZIP_INVALID", error });
      zipInputRef.current?.focus(); // screen readers then read the error
      track("zip_invalid", {
        attribution: currentAttribution(),
        page: ROUTES.compare,
      });
      return; // no request, and no comparison_started
    }

    inFlight.current = true; // locked right now, before any re-render
    attempts.current += 1;
    dispatch({ type: "SUBMIT" });
    const attribution = currentAttribution();

    try {
      await submitComparison(
        {
          ageRange: state.ageRange,
          zip: state.zip,
          attribution,
          submittedAt: new Date().toISOString(),
        },
        { fail: shouldMockFail(attempts.current) },
      );
      setShowNextStep(false);
      dispatch({ type: "SUBMIT_OK" });
      track("comparison_started", { attribution, page: ROUTES.compare }); // success only
    } catch {
      dispatch({ type: "SUBMIT_FAIL" }); // answers stay; "Try again" resubmits
      track("submit_failed", { attribution, page: ROUTES.compare });
    } finally {
      inFlight.current = false; // unlock so "Try again" works
    }
  }

  // -- Render ---------------------------------------------------------------
  // One card for every screen. id={FUNNEL_ID} lets the sticky bar and the final
  // "Compare my options" button scroll back to it.

  return (
    <div
      id={FUNNEL_ID}
      // The phone sticky bar stays hidden while the form is on screen.
      data-sticky-cta-hide=""
      className="rounded-card bg-surface shadow-card p-6 md:p-8"
    >
      {state.status === "success" && (
        <SuccessScreen
          headingRef={successHeadingRef}
          ageText={ageLabel(state.ageRange)}
          zip={state.zip}
          showNextStep={showNextStep}
          onSeeOptions={() => setShowNextStep(true)}
          onEditAnswers={() => dispatch({ type: "EDIT_ANSWERS" })}
        />
      )}

      {state.status === "age" && (
        <>
          <StepIndicator step={1} />
          <fieldset className="mt-5 md:mt-6">
            <legend className="text-xl font-semibold md:text-2xl">
              How old are you?
            </legend>
            {/* Hidden on phones so all six ages fit on the first screen. */}
            <p className="text-ink-muted mt-2 hidden text-lg md:block">
              Choose your age range to see options for drivers like you.
            </p>

            {/* Buttons, not radios: one tap (or Enter) picks an age and moves on. */}
            <div className="mt-4 grid grid-cols-2 gap-3 md:mt-5 md:grid-cols-3">
              {AGE_RANGES.map((range) => {
                const isSelected = range.id === state.ageRange;
                return (
                  <ChoiceButton
                    key={range.id}
                    // Only the selected age gets the ref, so "Change" can focus it.
                    ref={isSelected ? selectedAgeRef : undefined}
                    label={range.label}
                    selected={isSelected}
                    onClick={() => selectAge(range.id)}
                  />
                );
              })}
            </div>

            {/* Say what comes next, and what we don't ask for, before they commit. */}
            <p className="text-ink-muted mt-4 flex gap-2 text-base">
              <ArrowRightIcon className="text-teal-strong mt-0.5 size-5 shrink-0" />
              <span>
                Next: your ZIP code. No name, phone number or email needed.
              </span>
            </p>
          </fieldset>
        </>
      )}

      {/* ZIP step. Also shown while submitting and after a failed request. */}
      {(state.status === "zip" ||
        state.status === "submitting" ||
        state.status === "error") && (
        <>
          <StepIndicator step={2} />
          <form noValidate onSubmit={handleZipSubmit} className="mt-6">
            {/* The chosen age, with a way back to change it */}
            <div className="bg-cream flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl px-4 py-3">
              <p className="text-lg">
                <span className="text-ink-muted">Age range: </span>
                <span className="font-semibold">
                  {ageLabel(state.ageRange)}
                </span>
              </p>
              <Button
                variant="text"
                onClick={changeAge}
                disabled={isSubmitting}
                className="min-h-11"
              >
                Change<span className="sr-only"> age range</span>
              </Button>
            </div>

            <TextField
              ref={zipInputRef}
              id="zip"
              label="What's your ZIP code?"
              helper="5 digits, like 02134. We use it to find options in your area."
              error={state.zipError}
              value={state.zip}
              onChange={(event) =>
                dispatch({ type: "SET_ZIP", zip: event.target.value })
              }
              readOnly={isSubmitting}
              type="text"
              inputMode="numeric"
              // The phone keyboard's Enter key says "Go" and submits the form, so
              // nobody has to close the keyboard to reach the button underneath it.
              enterKeyHint="go"
              autoComplete="postal-code"
              // No maxLength: SET_ZIP keeps the first 5 digits, which also handles
              // pastes like " 02134" that maxLength would cut short.
              className="mt-5"
            />

            {state.status === "error" && (
              // role="alert" makes screen readers announce it right away.
              <div
                role="alert"
                className="border-error bg-surface mt-5 flex gap-3 rounded-xl border-2 p-4"
              >
                <AlertIcon className="text-error mt-0.5 size-5 shrink-0" />
                <div>
                  <p className="text-base font-semibold">
                    We couldn&apos;t reach our comparison service.
                  </p>
                  <p className="text-ink-muted mt-1 text-base">
                    Your answers are saved. Try again in a moment.
                  </p>
                </div>
              </div>
            )}

            <Button
              ref={submitButtonRef}
              type="submit"
              fullWidth
              loading={isSubmitting}
              loadingLabel="Finding options…"
              className="mt-5"
            >
              {state.status === "error" ? "Try again" : CTA_LABEL}
            </Button>
            <NotInsurerNote />
          </form>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------

// "Step 1 of 2" with a two-part progress bar. The bar is decoration (aria-hidden);
// the text says the same thing.
function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div>
      <p className="text-ink-muted text-sm font-semibold">Step {step} of 2</p>
      <div aria-hidden="true" className="mt-2 grid grid-cols-2 gap-1.5">
        <span className="bg-teal-strong h-1.5 rounded-full" />
        <span
          className={
            step === 2
              ? "bg-teal-strong h-1.5 rounded-full"
              : "bg-line h-1.5 rounded-full"
          }
        />
      </div>
    </div>
  );
}

// Shown after a successful request. Replaces the form inside the same card.
function SuccessScreen({
  headingRef,
  ageText,
  zip,
  showNextStep,
  onSeeOptions,
  onEditAnswers,
}: {
  headingRef: React.Ref<HTMLHeadingElement>;
  ageText: string;
  zip: string;
  showNextStep: boolean;
  onSeeOptions: () => void;
  onEditAnswers: () => void;
}) {
  return (
    <div>
      <span className="bg-teal-soft text-teal-strong flex size-14 items-center justify-center rounded-full">
        <CheckIcon className="size-7" />
      </span>

      {/* tabIndex -1 so focus can be moved here when this screen appears */}
      <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl md:text-3xl">
        You&apos;re all set
      </h2>
      <p className="mt-3 text-lg">
        Your comparison has started for drivers aged {ageText} in ZIP code {zip}
        . Next, choose which insurers you&apos;d like to hear from, if any.
      </p>

      <Button fullWidth className="mt-6" onClick={onSeeOptions}>
        See my options
        <ArrowRightIcon />
      </Button>

      {/* This is a demo, so there are no real options to open. */}
      {showNextStep && (
        <p role="status" className="bg-cream mt-4 rounded-xl p-4 text-base">
          <Badge className="mr-2">Demo</Badge>
          In the live service, options from insurers that serve your area would
          open here. Nothing was sent to an insurer.
        </p>
      )}

      <Button variant="text" className="mt-5 min-h-11" onClick={onEditAnswers}>
        Change my answers
      </Button>
    </div>
  );
}

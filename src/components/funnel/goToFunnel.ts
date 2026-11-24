// Scrolls to the funnel card and puts focus on its first control, so "Compare my options"
// buttons further down /compare land people back in the form, ready to answer.
// The funnel card's id. The card needs id={FUNNEL_ID} for this to find it.
export const FUNNEL_ID = "funnel";

export function goToFunnel(): void {
  const funnel = document.getElementById(FUNNEL_ID);
  if (!funnel) return;

  // Smooth scroll, unless the visitor's device asks for reduced motion.
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  funnel.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
  // Focus the first thing to act on in whichever step is showing: an age button,
  // the ZIP field, or the success heading (which has tabIndex -1).
  // preventScroll stops focus() from jumping the page before the smooth scroll ends.
  const target = funnel.querySelector<HTMLElement>(
    "button:not([disabled]), input:not([readonly]), [tabindex='-1']",
  );
  target?.focus({ preventScroll: true });
}

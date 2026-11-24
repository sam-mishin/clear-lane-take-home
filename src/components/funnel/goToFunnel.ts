// Scrolls to the funnel card and puts focus on its first control, so "Compare my options"
// buttons further down /compare land people back in the form, ready to answer.
export const FUNNEL_ID = "funnel";

export function goToFunnel(): void {
  const funnel = document.getElementById(FUNNEL_ID);
  if (!funnel) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  funnel.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
  // First thing to act on in whatever step is showing: an age button, the ZIP field,
  // or the success heading.
  const target = funnel.querySelector<HTMLElement>(
    "button:not([disabled]), input:not([readonly]), [tabindex='-1']",
  );
  target?.focus({ preventScroll: true });
}

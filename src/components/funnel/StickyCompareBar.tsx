"use client";

import { useEffect, useState } from "react";
import { JumpToFormButton } from "@/components/funnel/JumpToFormButton";
import { FUNNEL_ID } from "@/components/funnel/goToFunnel";

// Mobile only: a slim bar with one "Compare my options" button that appears once the
// form has scrolled out of view, and hides again while the form or the final CTA band
// is on screen (so there's never two of the same button in view). Calm on purpose:
// no animation, no countdown, no extra copy.
export function StickyCompareBar() {
  // Is the form on screen? Is the dark "Ready to see your options?" band on screen?
  // The form starts on screen (it's at the top of the page).
  const [funnelInView, setFunnelInView] = useState(true);
  const [finalBandInView, setFinalBandInView] = useState(false);

  useEffect(() => {
    const funnel = document.getElementById(FUNNEL_ID);
    const finalBand = document.getElementById("final-cta-heading");

    // IntersectionObserver calls this whenever one of the watched elements scrolls
    // into or out of view. isIntersecting is true while it's at least partly visible.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === funnel) setFunnelInView(entry.isIntersecting);
        if (entry.target === finalBand)
          setFinalBandInView(entry.isIntersecting);
      }
    });

    if (funnel) observer.observe(funnel);
    if (finalBand) observer.observe(finalBand);

    // Stop watching when the page is left.
    return () => observer.disconnect();
  }, []);

  // Hide the bar while either one is visible, so there's never two of the same button.
  if (funnelInView || finalBandInView) return null;

  return (
    // md:hidden = phones only. Fixed to the bottom of the screen.
    <div className="border-line bg-cream/95 fixed inset-x-0 bottom-0 z-30 border-t px-5 py-3 backdrop-blur md:hidden">
      <JumpToFormButton fullWidth />
    </div>
  );
}

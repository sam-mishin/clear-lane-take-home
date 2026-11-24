"use client";

import { useEffect, useState } from "react";
import { JumpToFormButton } from "@/components/funnel/JumpToFormButton";
import { FUNNEL_ID } from "@/components/funnel/goToFunnel";

// Mobile only: a slim bar with one "Compare my options" button that appears once the
// form has scrolled out of view, and hides again while the form or the final CTA band
// is on screen (so there's never two of the same button in view). Calm on purpose:
// no animation, no countdown, no extra copy.
export function StickyCompareBar() {
  const [funnelInView, setFunnelInView] = useState(true);
  const [finalInView, setFinalInView] = useState(false);

  useEffect(() => {
    const funnel = document.getElementById(FUNNEL_ID);
    const finalCta = document.getElementById("final-cta-heading");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === funnel) setFunnelInView(entry.isIntersecting);
        if (entry.target === finalCta) setFinalInView(entry.isIntersecting);
      }
    });
    if (funnel) observer.observe(funnel);
    if (finalCta) observer.observe(finalCta);
    return () => observer.disconnect();
  }, []);

  if (funnelInView || finalInView) return null;

  return (
    <div className="border-line bg-cream/95 fixed inset-x-0 bottom-0 z-30 border-t px-5 py-3 backdrop-blur md:hidden">
      <JumpToFormButton fullWidth />
    </div>
  );
}

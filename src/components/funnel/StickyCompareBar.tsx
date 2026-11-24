"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CompareLink } from "@/components/CompareLink";
import { JumpToFormButton } from "@/components/funnel/JumpToFormButton";

// Phones only: a slim bar pinned to the bottom of the screen with one
// "Compare my options" button, so the next step is always one tap away.
//
// It only shows while NO other "Compare my options" button, the form or the footer
// is on screen, so there are never two of the same button in view. Pages mark those
// elements with the data-sticky-cta-hide attribute; this watches all of them.
//
// target="link": goes to /compare, keeping campaign params (homepage, article).
// target="form": scrolls back to the form on /compare and focuses it.
export function StickyCompareBar({ target }: { target: "link" | "form" }) {
  const [shown, setShown] = useState(false);
  // The bar lives in the layout, which stays mounted when you move between pages
  // (homepage -> article). So the list of buttons to watch is rebuilt whenever the
  // page changes; otherwise it would keep watching the previous page's buttons.
  const pathname = usePathname();

  useEffect(() => {
    const blockers = document.querySelectorAll("[data-sticky-cta-hide]");
    const onScreen = new Set<Element>();

    // IntersectionObserver reports when a watched element scrolls into or out of
    // view. The bar shows only while none of them are visible.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setShown(onScreen.size === 0);
    });
    blockers.forEach((element) => observer.observe(element));

    // Stop watching when the page changes or the layout goes away.
    return () => observer.disconnect();
  }, [pathname]);

  return (
    // md:hidden = phones only. While hidden it slides down out of view and is
    // inert, so it can't be tabbed to or read out. Slides back up over 200ms
    // (instant with reduced motion).
    <div
      inert={!shown}
      className={clsx(
        "border-line bg-cream/95 fixed inset-x-0 bottom-0 z-30 border-t px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(18_35_63/0.08)] backdrop-blur transition duration-200 motion-reduce:transition-none md:hidden",
        shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      {target === "link" ? (
        <CompareLink fullWidth />
      ) : (
        <JumpToFormButton fullWidth />
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { AttributedLink } from "@/components/AttributedLink";
import { CompareLink } from "@/components/CompareLink";
import { Container } from "@/components/ui/Container";
import { MenuIcon, XIcon } from "@/components/ui/Icons";
import { Wordmark } from "@/components/ui/Wordmark";
import { NAV_LINKS, ROUTES } from "@/lib/site";

// Header for (site) pages: homepage + article.
// - Desktop: text links + a small "Compare my options" button (that button IS the
//   link to the campaign page, so it isn't repeated as a text link).
// - Below lg (phones and tablets): wordmark + Menu button (tablets also get the
//   compare button). The panel opens below the bar; Escape closes it and returns
//   focus to the button; choosing a link closes it.
// - aria-current="page" marks where you are.
// Every link carries campaign params through (AttributedLink / CompareLink).

// Home and the article show as text links. The Compare page gets the button instead.
const textLinks = NAV_LINKS.filter((link) => link.href !== ROUTES.compare);

export function SiteHeader() {
  const pathname = usePathname(); // the current page, for aria-current
  const [open, setOpen] = useState(false); // is the mobile menu open?
  const buttonRef = useRef<HTMLButtonElement>(null); // the Menu button, to return focus to

  // While the menu is open, listen for Escape: close the menu and put focus back
  // on the Menu button so keyboard users aren't lost.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    // Stop listening once the menu closes.
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 border-b backdrop-blur",
        // Homepage: same teal as the hero below it, so the two read as one block.
        pathname === ROUTES.home
          ? "bg-teal-soft/95 border-transparent"
          : "border-line bg-cream/95",
      )}
    >
      <Container className="flex min-h-18 items-center justify-between gap-3">
        <Wordmark />

        {/* Desktop (lg, 1024px+): the full nav. Below lg the links don't fit on one
            line, so tablets get the Menu button too. */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {textLinks.map((link) => (
              <li key={link.href}>
                <AttributedLink
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="text-ink hover:text-teal-strong aria-[current=page]:text-teal-strong inline-flex min-h-11 items-center font-medium underline-offset-8 aria-[current=page]:underline"
                >
                  {link.label}
                </AttributedLink>
              </li>
            ))}
            <li>
              <CompareLink size="sm" />
            </li>
          </ul>
        </nav>

        {/* Phones and tablets (below lg): Menu button.
            - Tablets (md to lg) also get "Compare my options" here, since there's room.
            - Phones don't: the sticky bar at the bottom of the screen (StickyCompareBar)
              is their compare button, so there are never two on screen at once. */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* max-md:hidden, not "hidden md:inline-flex": the button's own inline-flex
              class would win over "hidden" */}
          <CompareLink size="sm" className="max-md:hidden" />
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="border-ink text-ink hover:bg-ink inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-2 px-4 text-base font-semibold hover:text-white"
          >
            {open ? <XIcon /> : <MenuIcon />}
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="border-line bg-cream border-t lg:hidden"
      >
        <Container className="py-4">
          <ul className="divide-line divide-y">
            {textLinks.map((link) => (
              <li key={link.href}>
                <AttributedLink
                  href={link.href}
                  onClick={close}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="aria-[current=page]:text-teal-strong flex min-h-12 items-center py-3 text-lg font-medium underline-offset-8 aria-[current=page]:underline"
                >
                  {link.label}
                </AttributedLink>
              </li>
            ))}
          </ul>
          <CompareLink className="mt-4 w-full" onClick={close} />
        </Container>
      </nav>
    </header>
  );
}

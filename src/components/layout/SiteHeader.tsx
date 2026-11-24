"use client";

import { useEffect, useRef, useState } from "react";
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
// - Mobile: wordmark + Menu button. The panel opens below the bar; Escape closes it and
//   returns focus to the button; choosing a link closes it.
// - aria-current="page" marks where you are.
// Every link carries campaign params through (AttributedLink / CompareLink).

const textLinks = NAV_LINKS.filter((link) => link.href !== ROUTES.compare);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="border-line bg-cream/95 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex min-h-18 items-center justify-between gap-6">
        <Wordmark />

        {/* Desktop */}
        <nav aria-label="Main" className="hidden md:block">
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

        {/* Mobile */}
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="border-ink text-ink hover:bg-ink inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 text-base font-semibold hover:text-white md:hidden"
        >
          {open ? <XIcon /> : <MenuIcon />}
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="border-line bg-cream border-t md:hidden"
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

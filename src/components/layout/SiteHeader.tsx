"use client";

import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/site";

// Header for (site) pages.
// TODO:
// - Mobile menu: <button aria-expanded aria-controls="mobile-nav">, Escape closes and
//   returns focus to the button, closes on link click / route change.
// - aria-current="page" on the active link (usePathname).
// - The Compare link and the header CTA use CompareLink so campaign params carry through.
export function SiteHeader() {
  return (
    <header className="border-line border-b">
      <Container className="flex items-center justify-between py-4">
        <Wordmark />
        <nav aria-label="Main">
          <ul className="flex gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

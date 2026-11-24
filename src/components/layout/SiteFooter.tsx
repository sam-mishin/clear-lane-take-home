import { AttributedLink } from "@/components/AttributedLink";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { DISCLOSURE, FICTIONAL_NOTE, NAV_LINKS } from "@/lib/site";

// Shared footer with the not-an-insurer disclosure.
// Disclosure text stays at 14px+ and 10:1 contrast: easy to find, not fine print.
// variant="campaign" (on /compare, set in the (campaign) layout) keeps the disclosure
// but drops the page links, so paid visitors have no exits away from the form.
export function SiteFooter({
  variant = "site",
}: {
  variant?: "site" | "campaign";
}) {
  const campaign = variant === "campaign";
  return (
    // data-sticky-cta-hide: the phone sticky bar slides away when the footer appears.
    <footer data-sticky-cta-hide="" className="bg-ink text-cream">
      {/* No extra space for the sticky phone bar: it slides away once the footer shows. */}
      <Container className="py-12 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Wordmark tone="dark" />
            <p className="text-on-ink-muted mt-3 text-base">
              A clearer road to your next policy.
            </p>
          </div>
          {/* Page links: on every page except /compare */}
          {!campaign && (
            <nav aria-label="Footer">
              <ul className="flex flex-col gap-1 md:flex-row md:gap-8">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <AttributedLink
                      href={link.href}
                      className="hover:text-teal focus-visible:outline-teal inline-flex min-h-11 items-center text-base font-medium underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </AttributedLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* The disclosure: what ClearLane is and isn't, and that the brand is fictional */}
        <div className="mt-10 border-t border-white/15 pt-8">
          <h2 className="text-base font-semibold">About ClearLane</h2>
          <p className="text-on-ink-muted mt-2 max-w-3xl text-sm">
            {DISCLOSURE}
          </p>
          <p className="text-on-ink-muted mt-3 text-sm">{FICTIONAL_NOTE}</p>
        </div>
      </Container>
    </footer>
  );
}

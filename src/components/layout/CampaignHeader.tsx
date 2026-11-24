import { Wordmark } from "@/components/ui/Wordmark";
import { Container } from "@/components/ui/Container";
import { ShieldCheckIcon } from "@/components/ui/Icons";

// Minimal header for paid landing pages: wordmark only, no nav to pull people away
// from the form. The short reassurance on the right is text, not a link.
export function CampaignHeader() {
  return (
    <header className="border-line border-b">
      <Container className="flex min-h-18 items-center justify-between gap-4">
        <Wordmark />
        <p className="text-ink-muted hidden items-center gap-2 text-sm font-medium sm:flex">
          <ShieldCheckIcon className="text-teal-strong size-5" />
          Free to use. No obligation.
        </p>
      </Container>
    </header>
  );
}

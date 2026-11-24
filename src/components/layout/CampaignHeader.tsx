import { Wordmark } from "@/components/ui/Wordmark";
import { Container } from "@/components/ui/Container";

// Minimal header for paid landing pages: wordmark only, no nav.
export function CampaignHeader() {
  return (
    <header className="border-line border-b">
      <Container className="py-4">
        <Wordmark />
      </Container>
    </header>
  );
}

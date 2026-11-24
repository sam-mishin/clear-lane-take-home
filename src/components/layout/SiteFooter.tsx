import { Container } from "@/components/ui/Container";
import { DISCLOSURE } from "@/lib/site";

// Shared footer on every page, with the not-an-insurer disclosure from site config.
// TODO: style (bg-ink), footer links, reversed wordmark.
export function SiteFooter() {
  return (
    <footer className="border-line border-t py-10">
      <Container>
        <p>{DISCLOSURE}</p>
      </Container>
    </footer>
  );
}

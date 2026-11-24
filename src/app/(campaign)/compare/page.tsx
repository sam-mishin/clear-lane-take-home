import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AgeZipFunnel } from "@/components/funnel/AgeZipFunnel";
import { StepList } from "@/components/StepList";
import { Faq } from "@/components/Faq";
import { compareFaq } from "@/lib/content/faq";
import { whatHappensNext } from "@/lib/content/steps";

export const metadata: Metadata = {
  title: "TODO: landing page title",
  description: "TODO: landing page meta description.",
};

// Route: /compare
// Task 1 (priority). Visitor arrives from the ad "Compare auto insurance options for your age."
// Test URLs: /compare?utm_source=fb&utm_campaign=age_test&click_id=abc123
//            add &mock=fail to force the request error
export default function ComparePage() {
  return (
    <>
      {/* Hero: ad-matched headline + the age picker itself (above the fold at 375px) */}
      <section id="start" aria-labelledby="hero-heading" className="py-12">
        <Container>
          <h1 id="hero-heading">TODO: ad-matched headline</h1>

          <AgeZipFunnel />
        </Container>
      </section>

      {/* What happens next */}
      <section aria-labelledby="next-heading" className="py-16">
        <Container>
          <h2 id="next-heading">What happens next</h2>
          <StepList steps={whatHappensNext} />
        </Container>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="py-16">
        <Container>
          <h2 id="faq-heading">Frequently asked questions</h2>
          <Faq items={compareFaq} />
        </Container>
      </section>

      {/* Final CTA: sends people back to #start, doesn't duplicate the form */}
      <section aria-labelledby="final-cta-heading" className="py-16">
        <Container>
          <h2 id="final-cta-heading">TODO: final CTA heading</h2>
          <a href="#start">TODO: final CTA button</a>
        </Container>
      </section>
    </>
  );
}

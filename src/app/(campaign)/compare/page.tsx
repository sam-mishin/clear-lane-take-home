import type { Metadata } from "next";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";
import { AgeZipFunnel } from "@/components/funnel/AgeZipFunnel";
import { JumpToFormButton } from "@/components/funnel/JumpToFormButton";
import { StepList } from "@/components/StepList";
import { Faq } from "@/components/Faq";
import { FinalCtaBand } from "@/components/FinalCtaBand";
import { compareFaq } from "@/lib/content/faq";
import { whatHappensNext } from "@/lib/content/steps";
import { openGraph } from "@/lib/metadata";

// Title repeats the ad's wording ("Compare auto insurance options for your age") for message match.
const title = "Compare auto insurance options for your age";
const description =
  "Pick your age range and enter your ZIP code to see auto insurance options where you live. Free to use, with no obligation.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: openGraph(title, description),
  // Paid landing page: keep it out of search so organic visits don't dilute
  // the campaign's conversion rate (starts / landing-page visits).
  // follow: true still lets crawlers reach the rest of the site through its links.
  robots: { index: false, follow: true },
};

// The three reassurances next to the form.
const REASSURANCES = [
  "Two questions to start: age range and ZIP code",
  "No name, phone number or email needed",
  "Free to use, with no obligation to buy",
];

// Route: /compare
// Task 1. Visitor arrives from the ad "Compare auto insurance options for your age."
// Test URLs: /compare?utm_source=fb&utm_campaign=age_test&click_id=abc123
//            add &mock=fail (first attempt fails) or &mock=fail-always
export default function ComparePage() {
  return (
    <>
      {/* Hero: the headline repeats the ad, and the age picker is above the fold at 375px */}
      <section aria-labelledby="hero-heading" className="pt-6 pb-10 md:py-16">
        <Container className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="lg:pt-6">
            <h1
              id="hero-heading"
              className="text-3xl font-extrabold md:text-6xl"
            >
              Compare auto insurance options for your age
            </h1>
            <p className="text-ink-muted mt-3 max-w-2xl text-lg md:mt-4 md:text-xl">
              Two quick questions, then see what&apos;s available where you
              live.
            </p>
            {/* Desktop: reassurances sit under the headline, beside the form */}
            <ReassuranceList className="mt-8 hidden lg:block" />
          </div>

          <AgeZipFunnel />

          {/* Mobile: the form comes first, reassurances after it */}
          <ReassuranceList className="lg:hidden" />
        </Container>
      </section>

      {/* What happens next */}
      <section
        aria-labelledby="next-heading"
        className="bg-surface border-line border-y py-16 md:py-24"
      >
        <Container>
          <SectionHeading
            id="next-heading"
            title="What happens next"
            lead="No surprises. Here's exactly what to expect after you start."
          />
          <StepList steps={whatHappensNext} />
        </Container>
      </section>

      {/* FAQ: heading on the left, questions on the right from lg up */}
      <section aria-labelledby="faq-heading" className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <SectionHeading
            id="faq-heading"
            title="Questions before you start"
            lead="Short answers to what drivers ask most."
          />
          <Faq items={compareFaq} />
        </Container>
      </section>

      {/* Final CTA: takes people back to the form instead of adding a second one */}
      <FinalCtaBand
        title="Ready to see your options?"
        body="It starts with your age range and ZIP code. You can change either before you continue."
        action={<JumpToFormButton variant="onDark" />}
      />
    </>
  );
}

function ReassuranceList({ className }: { className?: string }) {
  return (
    <ul className={clsx("space-y-3", className)}>
      {REASSURANCES.map((item) => (
        <li key={item} className="flex items-start gap-3 text-lg">
          <span className="bg-teal-soft text-teal-strong mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full">
            <CheckIcon className="size-4" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

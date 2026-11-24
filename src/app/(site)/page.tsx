import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/Button";
import { HillDivider } from "@/components/ui/HillDivider";
import { HeroLandscape } from "@/components/illustrations/Illustrations";
import { CompareLink } from "@/components/CompareLink";
import { NotInsurerNote } from "@/components/NotInsurerNote";
import { Spot } from "@/components/illustrations/Spot";
import { StepList } from "@/components/StepList";
import { CoverageExplorer } from "@/components/home/CoverageExplorer";
import { AgeQuickStart } from "@/components/home/AgeQuickStart";
import { ArticleCard } from "@/components/ArticleCard";
import { Faq } from "@/components/Faq";
import { FinalCtaBand } from "@/components/FinalCtaBand";
import { homeFaq } from "@/lib/content/faq";
import { howItWorks } from "@/lib/content/steps";
import { articles } from "@/lib/content/articles";
import { whyCompare } from "@/lib/content/whyCompare";
import { openGraph } from "@/lib/metadata";
import { ROUTES } from "@/lib/site";

const title = "ClearLane Auto | A clearer road to your next policy";
const description =
  "See how car insurance coverage types differ, learn what affects your rate, and start a free comparison. Plain language, no obligation.";

export const metadata: Metadata = {
  // absolute: skip the layout's "%s | ClearLane Auto" template so the brand isn't doubled.
  title: { absolute: title },
  description,
  openGraph: openGraph(title, description),
  // The one official URL for this page, so search engines ignore copies with
  // campaign params (?utm_source=...) and count them as this page.
  alternates: { canonical: ROUTES.home },
};

// Route: /
// Task 2. Visitor doesn't know ClearLane yet: explain, let them explore, offer the CTA.
export default function HomePage() {
  return (
    <>
      {/* Hero: positioning, supporting copy, age quick start, "Compare my options", visual.
          The landscape runs the full width of the screen. Phones and tablets: text
          first, then the picture below it. Large screens (xl): the picture fills the
          whole hero and the text sits on its open sky on the left. */}
      <section
        aria-labelledby="hero-heading"
        className="bg-teal-soft relative overflow-hidden xl:min-h-200"
      >
        <Container className="relative z-10 pt-8 md:pt-16 xl:pt-22">
          <div className="max-w-150">
            <h1 id="hero-heading" className="text-4xl md:text-6xl">
              A clearer road to your next policy
            </h1>
            <p className="mt-5 text-lg md:text-xl">
              ClearLane helps you explore car insurance options in plain
              language, so you can compare coverage with confidence and choose
              what fits.
            </p>
            {/* data-sticky-cta-hide: the phone sticky bar waits until the age buttons
                and the hero buttons scroll away */}
            <div data-sticky-cta-hide="">
              {/* Age quick start: one tap opens /compare on the ZIP step
                  (/compare?age=45-54), skipping step 1 of the funnel. */}
              <AgeQuickStart />
              {/* For people who aren't ready to pick an age yet. "See how it works" is a
                  text link so the page keeps one primary button in view. */}
              <div className="mt-6 flex flex-col items-start gap-x-6 gap-y-3 sm:flex-row sm:items-center">
                <CompareLink className="w-full sm:w-auto" />
                <a
                  href="#how-heading"
                  className={buttonStyles({
                    variant: "text",
                    className: "min-h-11 self-center sm:self-auto",
                  })}
                >
                  See how it works
                </a>
              </div>
            </div>
            <NotInsurerNote className="mt-4" />
          </div>
        </Container>

        {/* The picture.
            - Up to xl: a block under the text.
            - xl to 2xl: fills the whole hero behind the text, scaled to fit.
            - 2xl and up: the wider drawing at its real size, centered, so it never
              grows past its drawn size however wide the screen is.
            Only one of the two drawings is downloaded (see HeroLandscape). */}
        <div className="relative h-105 md:h-96 xl:absolute xl:inset-0 xl:h-auto">
          <HeroLandscape className="object-right-bottom xl:object-bottom" />
        </div>
      </section>

      {/* How it works: the hero's cream ground carries on, and a dashed lane joins
          the three steps. */}
      <section
        aria-labelledby="how-heading"
        className="bg-cream py-16 md:py-24"
      >
        <Container>
          <SectionHeading
            id="how-heading"
            eyebrow="How it works"
            title="Three steps, at your own pace"
            lead="No account and no sales calls to get started."
          />
          <StepList steps={howItWorks} />
        </Container>
      </section>

      {/* Coverage explorer: the homepage's centerpiece, on a light teal band */}
      <HillDivider from="cream" to="teal-soft" />
      <section
        aria-labelledby="coverage-heading"
        className="bg-teal-soft pt-10 pb-16 md:pt-12 md:pb-24"
      >
        <Container>
          <SectionHeading
            id="coverage-heading"
            eyebrow="Coverage explorer"
            title="See what different coverage actually covers"
            lead="Pick an example to see the everyday situations it helps with, and the ones it doesn't."
          />
          <CoverageExplorer />

          {/* Next step right after the explorer, while the visitor is thinking
              about coverage. A white panel on the explorer's light teal band.
              data-sticky-cta-hide: the phone sticky bar hides while this is on screen. */}
          <div
            data-sticky-cta-hide=""
            className="rounded-card border-line bg-surface mt-8 flex flex-col gap-5 border p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div>
              <p className="text-xl font-semibold">
                Know roughly what you&apos;re after?
              </p>
              <p className="text-ink-muted mt-1 text-lg">
                See which options are available for your age and ZIP code.
              </p>
            </div>
            <CompareLink className="w-full shrink-0 md:w-auto" />
          </div>
        </Container>
      </section>

      {/* Why compare? Heading on the left, reasons on the right (lg). No invented
          proof, ratings or guarantees. */}
      <HillDivider from="teal-soft" to="surface" flip />
      <section
        aria-labelledby="why-heading"
        className="bg-surface pt-10 pb-16 md:pt-12 md:pb-24"
      >
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading
            id="why-heading"
            eyebrow="Why compare?"
            title="Good reasons to look around"
            lead="Shopping around is the simplest way to understand what's available to you."
          />
          <ul className="divide-line divide-y">
            {whyCompare.map((reason) => (
              <li
                key={reason.title}
                className="flex items-start gap-4 py-6 first:pt-0 last:pb-0 md:gap-6 md:py-7"
              >
                <Spot
                  name={reason.illustration}
                  className="size-20 md:size-26"
                />
                <div className="pt-1 md:pt-2">
                  <h3 className="text-lg font-semibold md:text-xl">
                    {reason.title}
                  </h3>
                  <p className="text-ink-muted mt-2 text-lg">{reason.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <HillDivider from="surface" to="cream" />
      {/* Resources: 3 cards. One links to the real article, two are labeled previews */}
      <section
        aria-labelledby="resources-heading"
        className="bg-cream pt-10 pb-16 md:pt-12 md:pb-24"
      >
        <Container>
          <SectionHeading
            id="resources-heading"
            eyebrow="Resources"
            title="Learn before you compare"
            lead="Short, plain-language guides to the parts of car insurance that trip people up."
          />
          <ul className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
            {/* One card per article in lib/content/articles.ts */}
            {articles.map((article) => (
              <li key={article.title}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ: heading on the left, questions on the right from lg up */}
      <section
        aria-labelledby="faq-heading"
        className="bg-cream pt-0 pb-16 md:pb-24"
      >
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <SectionHeading
            id="faq-heading"
            title="Frequently asked questions"
            lead="What ClearLane is, what it isn't, and what to expect."
          />
          <Faq items={homeFaq} />
        </Container>
      </section>

      {/* Final CTA */}
      <FinalCtaBand
        title="Ready to compare your options?"
        body="Start with your age range and ZIP code. It's free, and there's no obligation."
        action={<CompareLink variant="onDark" />}
      />
    </>
  );
}

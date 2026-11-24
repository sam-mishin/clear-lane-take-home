import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/Button";
import { EyeIcon, RefreshIcon, ScaleIcon } from "@/components/ui/Icons";
import {
  HeroLandscape,
  HeroLandscapeWide,
} from "@/components/illustrations/Illustrations";
import { CompareLink } from "@/components/CompareLink";
import { NotInsurerNote } from "@/components/NotInsurerNote";
import { StepList } from "@/components/StepList";
import { CoverageExplorer } from "@/components/home/CoverageExplorer";
import { ArticleCard } from "@/components/ArticleCard";
import { Faq } from "@/components/Faq";
import { FinalCtaBand } from "@/components/FinalCtaBand";
import { homeFaq } from "@/lib/content/faq";
import { howItWorks } from "@/lib/content/steps";
import { articles } from "@/lib/content/articles";
import { whyCompare, type Reason } from "@/lib/content/whyCompare";
import { openGraph } from "@/lib/metadata";

const title = "ClearLane Auto | A clearer road to your next policy";
const description =
  "See how car insurance coverage types differ, learn what affects your rate, and start a free comparison. Plain language, no obligation.";

export const metadata: Metadata = {
  // absolute: skip the layout's "%s | ClearLane Auto" template so the brand isn't doubled.
  title: { absolute: title },
  description,
  openGraph: openGraph(title, description),
};

// Route: /
// Task 2. Visitor doesn't know ClearLane yet: explain, let them explore, offer the CTA.
export default function HomePage() {
  return (
    <>
      {/* Hero: positioning, supporting copy, visual, "Compare my options".
          The landscape runs the full width of the screen. Phones and tablets: text
          first, then the picture below it. Large screens (xl): the picture fills the
          whole hero and the text sits on its open sky on the left. */}
      <section
        aria-labelledby="hero-heading"
        className="bg-teal-soft relative overflow-hidden xl:min-h-172"
      >
        <Container className="relative z-10 pt-8 md:pt-16 xl:pt-22">
          <div className="max-w-150">
            <h1
              id="hero-heading"
              className="text-4xl font-extrabold md:text-6xl"
            >
              A clearer road to your next policy
            </h1>
            <p className="mt-5 text-lg md:text-xl">
              ClearLane helps you explore car insurance options in plain
              language, so you can compare coverage with confidence and choose
              what fits.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CompareLink className="w-full sm:w-auto" />
              <a
                href="#how-heading"
                className={buttonStyles({
                  variant: "secondary",
                  className: "w-full sm:w-auto",
                })}
              >
                See how it works
              </a>
            </div>
            <NotInsurerNote className="mt-4" />
          </div>
        </Container>

        {/* The picture.
            - Up to xl: a block under the text.
            - xl to 2xl: fills the whole hero behind the text, scaled to fit.
            - 2xl and up: the wider version at its real size, centered, so it never
              grows past its drawn size however wide the screen is. */}
        <div className="relative h-105 md:h-96 xl:absolute xl:inset-0 xl:h-auto 2xl:hidden">
          <HeroLandscape className="object-right-bottom xl:object-bottom" />
        </div>
        <HeroLandscapeWide className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 2xl:block" />
      </section>

      {/* How it works: Share a few details / Explore options / Choose what fits */}
      <section
        aria-labelledby="how-heading"
        className="bg-surface border-line border-y py-16 md:py-24"
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

      {/* Coverage explorer: 3 selectable educational examples + adjacent explanation */}
      <section aria-labelledby="coverage-heading" className="py-16 md:py-24">
        <Container>
          <SectionHeading
            id="coverage-heading"
            eyebrow="Coverage explorer"
            title="See what different coverage actually covers"
            lead="Pick an example to see the everyday situations it helps with, and the ones it doesn't."
          />
          <CoverageExplorer />
        </Container>
      </section>

      {/* Why compare? Reasons that need no invented proof, ratings or guarantees */}
      <section
        aria-labelledby="why-heading"
        className="bg-surface border-line border-y py-16 md:py-24"
      >
        <Container>
          <SectionHeading
            id="why-heading"
            eyebrow="Why compare?"
            title="Good reasons to look around"
            lead="Shopping around is the simplest way to understand what's available to you."
          />
          <ul className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
            {whyCompare.map((reason) => (
              <li
                key={reason.title}
                className="rounded-card border-line bg-cream border p-6 md:p-8"
              >
                <span className="bg-teal-soft text-teal-strong flex size-12 items-center justify-center rounded-full">
                  <ReasonIcon icon={reason.icon} />
                </span>
                <h3 className="mt-5 text-lg font-semibold md:text-xl">
                  {reason.title}
                </h3>
                <p className="text-ink-muted mt-2 text-lg">{reason.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Resources: 3 cards. One links to the real article, two are labeled previews */}
      <section aria-labelledby="resources-heading" className="py-16 md:py-24">
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
        className="bg-surface border-line border-y py-16 md:py-24"
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

// The icon for each "Why compare?" card. Decorative: the heading carries the meaning.
function ReasonIcon({ icon }: { icon: Reason["icon"] }) {
  if (icon === "scale") return <ScaleIcon className="size-6" />;
  if (icon === "refresh") return <RefreshIcon className="size-6" />;
  return <EyeIcon className="size-6" />;
}

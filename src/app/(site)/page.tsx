import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CompareLink } from "@/components/CompareLink";
import { StepList } from "@/components/StepList";
import { CoverageExplorer } from "@/components/home/CoverageExplorer";
import { ArticleCard } from "@/components/ArticleCard";
import { Faq } from "@/components/Faq";
import { homeFaq } from "@/lib/content/faq";
import { howItWorks } from "@/lib/content/steps";
import { articles } from "@/lib/content/articles";

export const metadata: Metadata = {
  // Root layout's title.default ("ClearLane Auto") is used unless you set one here.
  description: "TODO: homepage meta description.",
};

// Route: /
// Task 2. Visitor doesn't know ClearLane yet: explain, let them explore, offer the CTA.
export default function HomePage() {
  return (
    <>
      {/* Hero: positioning, supporting copy, visual, "Compare my options" */}
      <section aria-labelledby="hero-heading" className="py-16">
        <Container>
          <h1 id="hero-heading">TODO: hero headline</h1>
          <CompareLink />
        </Container>
      </section>

      {/* How it works: Share a few details / Explore options / Choose what fits */}
      <section aria-labelledby="how-heading" className="py-16">
        <Container>
          <h2 id="how-heading">How it works</h2>
          <StepList steps={howItWorks} />
        </Container>
      </section>

      {/* Coverage explorer: 3 selectable educational examples + adjacent explanation */}
      <section aria-labelledby="coverage-heading" className="py-16">
        <Container>
          <h2 id="coverage-heading">TODO: coverage explorer heading</h2>
          <CoverageExplorer />
        </Container>
      </section>

      {/* Why compare? No invented proof, ratings or guarantees */}
      <section aria-labelledby="why-heading" className="py-16">
        <Container>
          <h2 id="why-heading">Why compare?</h2>
        </Container>
      </section>

      {/* Resources: 3 cards. One links to the real article, two are labeled previews */}
      <section aria-labelledby="resources-heading" className="py-16">
        <Container>
          <h2 id="resources-heading">TODO: resources heading</h2>
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </Container>
      </section>

      {/* FAQ accordion */}
      <section aria-labelledby="faq-heading" className="py-16">
        <Container>
          <h2 id="faq-heading">Frequently asked questions</h2>
          <Faq items={homeFaq} />
        </Container>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="final-cta-heading" className="py-16">
        <Container>
          <h2 id="final-cta-heading">TODO: final CTA heading</h2>
          <CompareLink />
        </Container>
      </section>
    </>
  );
}

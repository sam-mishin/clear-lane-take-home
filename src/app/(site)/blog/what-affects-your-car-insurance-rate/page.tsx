import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import {
  TableOfContents,
  type TocItem,
} from "@/components/blog/TableOfContents";
import { CompareLink } from "@/components/CompareLink";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "What Affects Your Car Insurance Rate?",
  description: "TODO: unique meta description for the article.",
};

// Section ids double as TOC anchors. Add scroll-mt-* to each <h2> so
// anchors don't land under a sticky header.
const sections: TocItem[] = [
  { id: "TODO-section-1", label: "TODO section 1" },
  { id: "TODO-section-2", label: "TODO section 2" },
  { id: "TODO-section-3", label: "TODO section 3" },
  { id: "TODO-section-4", label: "TODO section 4" },
];

// Route: /blog/what-affects-your-car-insurance-rate
// Task 3. 500-700 words, 4+ sections, TOC sidebar, table or callout, inline CTA, related cards.
export default function ArticlePage() {
  return (
    <Container className="py-12">
      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12">
        {/* Desktop: sticky sidebar. Mobile: collapsible "On this page". */}
        <aside>
          <TableOfContents items={sections} />
        </aside>

        <article>
          <header>
            <h1>What affects your car insurance rate?</h1>
            {/* TODO: byline ("ClearLane Editorial Team" + date), intro paragraph, hero visual */}
          </header>

          {sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} className="scroll-mt-24">
                {section.label}
              </h2>
              {/* TODO: section copy */}
            </section>
          ))}

          {/* TODO: comparison table or callout */}

          {/* TODO: move the inline CTA to where it fits best in the article */}
          <aside aria-label="Compare your options">
            <CompareLink>Compare my options</CompareLink>
          </aside>
        </article>
      </div>

      {/* Related articles */}
      <section aria-labelledby="related-heading" className="py-16">
        <h2 id="related-heading">Related articles</h2>
        <ArticleCard />
      </section>
    </Container>
  );
}

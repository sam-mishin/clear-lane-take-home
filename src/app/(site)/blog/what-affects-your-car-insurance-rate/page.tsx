import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { CompareLink } from "@/components/CompareLink";
import { ArticleCard } from "@/components/ArticleCard";
import {
  articles,
  whatAffectsYourRate as article,
} from "@/lib/content/articles";
import { CTA_LABEL, ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "What Affects Your Car Insurance Rate?",
  description: article.description,
};

// Route: /blog/what-affects-your-car-insurance-rate
// Task 3. Content lives in lib/content/articles.ts; the TOC is built from the same sections.
export default function ArticlePage() {
  const toc = article.sections.map(({ id, heading }) => ({
    id,
    label: heading,
  }));
  const related = articles.filter((a) => a.href !== ROUTES.article);

  return (
    <Container className="py-12">
      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12">
        {/* Desktop: sticky sidebar. Mobile: collapsible "On this page". */}
        <aside>
          <TableOfContents items={toc} />
        </aside>

        <article>
          <header>
            <h1>{article.title}</h1>
            <p>{article.byline}</p>
            <p>{article.intro}</p>
            {/* TODO: hero visual */}
          </header>

          {article.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} className="scroll-mt-24">
                {section.heading}
              </h2>
              {section.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </section>
          ))}

          {/* TODO: one comparison table OR one explanatory callout */}

          {/* TODO: move the inline CTA to where it fits best in the article */}
          <aside aria-label="Compare your options">
            <CompareLink>{CTA_LABEL}</CompareLink>
          </aside>
        </article>
      </div>

      <section aria-labelledby="related-heading" className="py-16">
        <h2 id="related-heading">Related articles</h2>
        {related.map((a) => (
          <ArticleCard key={a.title} article={a} />
        ))}
      </section>
    </Container>
  );
}

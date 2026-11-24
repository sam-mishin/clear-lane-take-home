import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Callout } from "@/components/Callout";
import { CompareLink } from "@/components/CompareLink";
import { FinalCtaBand } from "@/components/FinalCtaBand";
import { ArticleHero } from "@/components/illustrations/Illustrations";
import { Container } from "@/components/ui/Container";
import {
  articles,
  rateFactorTable,
  whatAffectsYourRate as article,
} from "@/lib/content/articles";
import { openGraph } from "@/lib/metadata";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  openGraph: openGraph(article.title, article.description, "article"),
};

// The inline "compare" box goes right after this section. The reader has just read
// that age and location shape a rate, and those are the two things the form asks for.
const INLINE_CTA_AFTER = "where-you-live";

// Route: /blog/what-affects-your-car-insurance-rate
// Task 3. All the words live in lib/content/articles.ts; this file is only layout.
export default function ArticlePage() {
  // Table of contents: one link per section, plus the table at the end.
  const toc = article.sections.map((section) => ({
    id: section.id,
    label: section.heading,
  }));
  toc.push({ id: "at-a-glance", label: "At a glance" });

  // Related articles: every card except this article's own.
  const related = articles.filter((item) => item.href !== ROUTES.article);

  return (
    <>
      <Container className="py-10 md:py-16">
        <article>
          {/* Title, byline and intro */}
          <header className="max-w-3xl">
            <p className="text-teal-strong text-sm font-semibold">
              Car insurance basics
            </p>
            <h1 className="mt-3 text-3xl font-bold md:text-5xl">
              {article.title}
            </h1>
            <p className="text-ink-muted mt-4 text-base">By {article.byline}</p>
            <p className="mt-6 text-lg md:text-xl">{article.intro}</p>
          </header>

          <ArticleHero className="rounded-card mt-8 md:mt-10" />

          {/* Desktop (lg): sidebar on the left, article on the right.
              Smaller screens: everything stacks, with the TOC collapsed on top. */}
          <div className="mt-10 lg:mt-12 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
            <aside aria-label="Article tools" className="mb-10 lg:mb-0">
              {/* Sticks to the top of the screen while you scroll (desktop only) */}
              <div className="lg:sticky lg:top-24">
                <TableOfContents items={toc} />

                {/* A quiet secondary button in the sidebar (desktop only) */}
                <div className="rounded-card border-line bg-surface mt-8 hidden border p-5 lg:block">
                  <p className="text-base font-semibold">
                    See options for your age and ZIP code
                  </p>
                  <CompareLink
                    variant="secondary"
                    size="sm"
                    className="mt-4 w-full"
                  />
                </div>
              </div>
            </aside>

            {/* The article body, kept to a comfortable reading width */}
            <div className="max-w-prose">
              <Callout title="Every insurer weighs these differently">
                <p>
                  The factors below are common, but each insurer decides how
                  much each one matters, and some are limited by state rules.
                  That&apos;s why the same driver can see different prices.
                </p>
              </Callout>

              {/* One <section> per entry in article.sections */}
              {article.sections.map((section) => (
                <div key={section.id}>
                  <section aria-labelledby={section.id} className="mt-12">
                    {/* scroll-mt-24: when a TOC link jumps here, the heading
                        stops below the sticky header instead of under it */}
                    <h2
                      id={section.id}
                      className="scroll-mt-24 text-2xl font-bold md:text-3xl"
                    >
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-5">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>

                  {section.id === INLINE_CTA_AFTER && <InlineCta />}
                </div>
              ))}

              <RateFactorTable />
            </div>
          </div>
        </article>
      </Container>

      <section
        aria-labelledby="related-heading"
        className="bg-surface border-line border-t py-16 md:py-24"
      >
        <Container>
          <h2 id="related-heading" className="text-2xl font-bold md:text-4xl">
            Related articles
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8 lg:max-w-4xl">
            {related.map((item) => (
              <li key={item.title}>
                <ArticleCard article={item} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCtaBand
        title="Ready to see your options?"
        body="Start with your age range and ZIP code. It's free, and there's no obligation."
        action={<CompareLink variant="onDark" />}
      />
    </>
  );
}

// The "compare" box in the middle of the article.
function InlineCta() {
  return (
    <aside
      aria-label="Compare your options"
      className="rounded-card border-teal-strong bg-surface mt-12 border-2 p-6 md:p-8"
    >
      <p className="text-xl font-semibold md:text-2xl">
        See what&apos;s available for your age and ZIP code
      </p>
      <p className="text-ink-muted mt-2 text-lg">
        Those are the two things we ask to start. It&apos;s free, and
        there&apos;s no obligation.
      </p>
      <CompareLink fullWidth className="mt-5" />
    </aside>
  );
}

// "At a glance": which rate factors you can change.
function RateFactorTable() {
  return (
    <section aria-labelledby="at-a-glance" className="mt-12">
      <h2
        id="at-a-glance"
        className="scroll-mt-24 text-2xl font-bold md:text-3xl"
      >
        At a glance
      </h2>

      {/* On phones the table is wider than the screen, so this box scrolls sideways.
          tabIndex + role + aria-label let keyboard users reach and scroll it too. */}
      <div
        role="region"
        aria-label="Rate factors table"
        tabIndex={0}
        className="rounded-card border-line bg-surface mt-6 overflow-x-auto border"
      >
        <table className="w-full min-w-xl border-collapse text-left">
          <caption className="text-ink-muted px-4 pt-4 pb-2 text-left text-sm">
            {rateFactorTable.caption}
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="bg-teal-soft px-4 py-3 text-sm font-semibold"
              >
                Factor
              </th>
              <th
                scope="col"
                className="bg-teal-soft px-4 py-3 text-sm font-semibold"
              >
                Can you change it?
              </th>
              <th
                scope="col"
                className="bg-teal-soft px-4 py-3 text-sm font-semibold"
              >
                What you can do
              </th>
            </tr>
          </thead>
          <tbody>
            {rateFactorTable.rows.map((row) => (
              <tr key={row.factor}>
                {/* The factor names its row, so screen readers can say
                    "Where you live, Can you change it?, Rarely" */}
                <th
                  scope="row"
                  className="border-line border-t px-4 py-3 align-top text-base font-semibold"
                >
                  {row.factor}
                </th>
                <td className="border-line border-t px-4 py-3 align-top text-base">
                  {row.canChange}
                </td>
                <td className="border-line text-ink-muted border-t px-4 py-3 align-top text-base">
                  {row.whatToDo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

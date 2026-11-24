import clsx from "clsx";
import { AttributedLink } from "@/components/AttributedLink";
import { CardArt } from "@/components/illustrations/Illustrations";
import { Badge } from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/ui/Icons";
import {
  whatAffectsYourRate,
  type ArticleSummary,
} from "@/lib/content/articles";
import { ROUTES } from "@/lib/site";

// Editorial card, used in the homepage Resources section and the article's
// Related articles.
// - An article with an href is a real page: the whole card is one link, with a hover lift.
// - An article without an href is a labeled preview (the brief allows previews). The card
//   itself isn't a link, but it ends with a link to the rate guide section that covers
//   the same topic, so it's never a dead end.
// - onArticlePage: the card sits on the rate guide itself, so the section link jumps
//   within the page ("#your-coverage") instead of going to another page.

// White card with a soft shadow, no border: it sits on a cream section, so the
// change of tone plus the shadow separates it.
const CARD_CLASSES =
  "rounded-card bg-surface shadow-card flex h-full flex-col overflow-hidden";

export function ArticleCard({
  article,
  onArticlePage = false,
}: {
  article: ArticleSummary;
  onArticlePage?: boolean;
}) {
  const isLive = Boolean(article.href);

  const content = (
    <>
      {/* Illustration strip at the top */}
      <div className="border-line overflow-hidden border-b">
        <CardArt motif={article.motif} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Badge className="self-start">{isLive ? "Article" : "Preview"}</Badge>
        <h3 className="mt-4 text-lg font-semibold md:text-xl">
          {article.title}
        </h3>
        <p className="text-ink-muted mt-2 text-lg">{article.excerpt}</p>

        {/* mt-auto pushes this line to the bottom so cards in a row line up */}
        {isLive ? (
          <p className="text-teal-strong mt-auto flex items-center gap-2 pt-5 text-base font-semibold">
            Read the article
            <ArrowRightIcon className="size-5" />
          </p>
        ) : (
          <div className="mt-auto pt-5">
            <p className="text-ink-muted text-sm">Full article coming soon.</p>
            {article.sectionId && (
              <SectionLink
                sectionId={article.sectionId}
                onArticlePage={onArticlePage}
              />
            )}
          </div>
        )}
      </div>
    </>
  );

  if (article.href) {
    return (
      <AttributedLink
        href={article.href}
        className={clsx(
          CARD_CLASSES,
          // Lifts 4px with a deeper shadow on hover (no lift with reduced motion).
          "hover:shadow-card-hover transition duration-150 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        )}
      >
        {content}
      </AttributedLink>
    );
  }

  return <div className={CARD_CLASSES}>{content}</div>;
}

// The preview's next step: the rate guide section on the same topic.
// The link text names the section, so it makes sense on its own to screen reader users.
function SectionLink({
  sectionId,
  onArticlePage,
}: {
  sectionId: string;
  onArticlePage: boolean;
}) {
  const section = whatAffectsYourRate.sections.find(
    (item) => item.id === sectionId,
  );
  if (!section) return null; // a typo in articles.ts hides the link instead of breaking it

  const className =
    "text-teal-strong hover:text-ink mt-1 inline-flex min-h-11 items-center gap-2 text-base font-semibold underline underline-offset-4";

  // Same page: a plain anchor (AttributedLink would turn "#id" into "/#id").
  if (onArticlePage) {
    return (
      <a href={`#${section.id}`} className={className}>
        Jump to “{section.heading}” above
      </a>
    );
  }

  // Another page: AttributedLink keeps the campaign params.
  return (
    <AttributedLink
      href={`${ROUTES.article}#${section.id}`}
      className={className}
    >
      Read “{section.heading}” in our rate guide
      <ArrowRightIcon className="size-5 shrink-0" />
    </AttributedLink>
  );
}

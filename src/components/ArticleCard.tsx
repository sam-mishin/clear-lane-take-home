import clsx from "clsx";
import { AttributedLink } from "@/components/AttributedLink";
import { CardArt } from "@/components/illustrations/Illustrations";
import { Badge } from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type { ArticleSummary } from "@/lib/content/articles";

// Editorial card, used in the homepage Resources section and the article's
// Related articles.
// - An article with an href is a real page: the whole card is one link, with a hover lift.
// - An article without an href is a labeled preview: no link and no hover, so it's
//   never a dead end.

const CARD_CLASSES =
  "rounded-card border-line bg-surface flex h-full flex-col overflow-hidden border";

export function ArticleCard({ article }: { article: ArticleSummary }) {
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
          <p className="text-ink-muted mt-auto pt-5 text-base font-semibold">
            Coming soon
          </p>
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
          "hover:border-ink-muted shadow-sm transition duration-150 hover:shadow-md motion-reduce:transition-none",
        )}
      >
        {content}
      </AttributedLink>
    );
  }

  return <div className={CARD_CLASSES}>{content}</div>;
}

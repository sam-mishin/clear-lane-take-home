import clsx from "clsx";
import { AttributedLink } from "@/components/AttributedLink";
import { CardArt } from "@/components/illustrations/Illustrations";
import { Badge } from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type { ArticleSummary } from "@/lib/content/articles";

// Editorial card. Reused in homepage Resources and the article's Related articles.
// With an href the whole card is one link (hover lift + focus ring).
// Without one it's a labeled preview: no link, no hover, never a dead end.
export function ArticleCard({
  article,
  headingLevel = "h3",
}: {
  article: ArticleSummary;
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  const isLink = Boolean(article.href);

  const body = (
    <>
      <div className="border-line overflow-hidden border-b">
        <CardArt motif={article.motif} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Badge className="self-start">{isLink ? "Article" : "Preview"}</Badge>
        <Heading className="mt-4 text-lg font-semibold md:text-xl">
          {article.title}
        </Heading>
        <p className="text-ink-muted mt-2 text-lg">{article.excerpt}</p>
        <p
          className={clsx(
            "mt-auto flex items-center gap-2 pt-5 text-base font-semibold",
            isLink ? "text-teal-strong" : "text-ink-muted",
          )}
        >
          {isLink ? (
            <>
              Read the article
              <ArrowRightIcon className="size-5" />
            </>
          ) : (
            "Coming soon"
          )}
        </p>
      </div>
    </>
  );

  const card =
    "rounded-card border-line bg-surface flex h-full flex-col overflow-hidden border";

  return article.href ? (
    <AttributedLink
      href={article.href}
      className={clsx(
        card,
        "hover:border-ink-muted shadow-sm transition duration-150 hover:shadow-md motion-reduce:transition-none",
      )}
    >
      {body}
    </AttributedLink>
  ) : (
    <div className={card}>{body}</div>
  );
}

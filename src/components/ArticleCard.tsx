import Link from "next/link";
import type { ArticleSummary } from "@/lib/content/articles";

// Editorial card. Reused in homepage Resources and the article's Related articles.
// A card with an href is a link; one without is a labeled preview (never a dead link).
// TODO: style, illustration, "Preview" badge.
export function ArticleCard({ article }: { article: ArticleSummary }) {
  const body = (
    <>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
    </>
  );
  return article.href ? (
    <Link href={article.href}>{body}</Link>
  ) : (
    <div>{body}</div>
  );
}

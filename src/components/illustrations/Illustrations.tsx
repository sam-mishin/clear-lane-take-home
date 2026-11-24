import Image from "next/image";
import type { ArticleMotif } from "@/lib/content/articles";

// The site's illustrations. The drawings themselves are SVG files in
// public/illustrations/; these components just show them at the right size.
//
// - Every illustration is decorative, so alt="" (screen readers skip it).
// - width and height are the drawing's own size. They reserve the space before the
//   file loads, so nothing on the page jumps. className="h-auto w-full" then lets the
//   picture shrink or grow with its container.
// - Next.js serves SVG files as they are (no resizing needed for vector images).

// Homepage hero: a road to the horizon, a car in its lane and a signpost.
// It's near the top of the homepage, so it loads right away with high priority.
export function HeroRoad({ className }: { className?: string }) {
  return (
    <Image
      src="/illustrations/hero-road.svg"
      alt=""
      width={560}
      height={440}
      loading="eager"
      fetchPriority="high"
      className={`h-auto w-full ${className ?? ""}`}
    />
  );
}

// Article hero: four road signs (you, where you live, your car, how you drive)
// along a winding road. Near the top of the article, so it loads right away.
export function ArticleHero({ className }: { className?: string }) {
  return (
    <Image
      src="/illustrations/article-hero.svg"
      alt=""
      width={800}
      height={340}
      loading="eager"
      className={`h-auto w-full ${className ?? ""}`}
    />
  );
}

// Small picture at the top of each article card, one per motif:
// "road" -> card-road.svg, "shield" -> card-shield.svg, "calendar" -> card-calendar.svg.
// Cards are further down the page, so these load lazily (the default).
export function CardArt({ motif }: { motif: ArticleMotif }) {
  return (
    <Image
      src={`/illustrations/card-${motif}.svg`}
      alt=""
      width={320}
      height={140}
      className="h-auto w-full"
    />
  );
}

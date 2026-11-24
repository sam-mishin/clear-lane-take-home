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

// Homepage hero: a full-width landscape (hills, a road with a car in its lane and a
// signpost) behind the hero text. It's at the top of the homepage, so it loads right
// away with high priority.
// - fill: the picture covers its parent, which must be position: relative or absolute.
// - object-cover crops it to fit instead of stretching it; the page decides which
//   corner to keep with an object-position class (e.g. object-right-bottom).
export function HeroLandscape({ className }: { className?: string }) {
  return (
    <Image
      src="/illustrations/hero-landscape.svg"
      alt=""
      fill
      sizes="100vw"
      loading="eager"
      fetchPriority="high"
      className={`object-cover ${className ?? ""}`}
    />
  );
}

// The same landscape drawn wider (3840px, with more hills and trees on both sides)
// for very wide screens. It's shown at its real size and centered, never scaled up,
// so the road and signpost stay the same size and the hills reach the screen edges
// on any monitor up to 3840px wide.
export function HeroLandscapeWide({ className }: { className?: string }) {
  return (
    <Image
      src="/illustrations/hero-landscape-wide.svg"
      alt=""
      width={3840}
      height={760}
      loading="eager"
      fetchPriority="high"
      className={`h-190 w-960 max-w-none ${className ?? ""}`}
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

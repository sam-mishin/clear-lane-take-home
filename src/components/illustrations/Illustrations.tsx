import Image, { getImageProps } from "next/image";
import clsx from "clsx";
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
// signpost) behind the hero text, in two drawings:
// - hero-landscape.svg (1440 x 760): up to 1535px wide. It covers its box (object-cover)
//   and the page picks which corner to keep (object-right-bottom, xl:object-bottom).
// - hero-landscape-wide.svg (3840 x 760, more hills and trees on both sides): 1536px
//   and up (2xl). Shown at its real size and centered, never scaled up, so the road and
//   signpost keep their size and the hills reach the edges of any screen up to 3840px.
// A <picture> element lets the browser download only the one it shows. (Two <Image>s
// with one hidden by CSS would download both.) getImageProps is Next.js's way to build
// a <picture>: it gives the same attributes <Image> would put on its <img>.
// The box it sits in must be position: relative or absolute.
export function HeroLandscape({ className }: { className?: string }) {
  const shared = {
    alt: "",
    loading: "eager", // top of the homepage: load right away...
    fetchPriority: "high", // ...and ahead of other images
  } as const;
  const wide = getImageProps({
    ...shared,
    src: "/illustrations/hero-landscape-wide.svg",
    width: 3840,
    height: 760,
  }).props;
  const standard = getImageProps({
    ...shared,
    src: "/illustrations/hero-landscape.svg",
    width: 1440,
    height: 760,
  }).props;

  return (
    <picture>
      <source
        media="(min-width: 1536px)"
        srcSet={wide.srcSet ?? wide.src}
        width={3840}
        height={760}
      />
      {/* The <img> inside a <picture>, built from getImageProps as the Next.js docs show */}
      <img
        {...standard}
        alt="" // decorative (also set by getImageProps; repeated so the linter sees it)
        className={clsx(
          // Up to 2xl: fill the box, cropped to fit.
          "absolute inset-0 size-full object-cover",
          // 2xl and up: the wide drawing at its real size, centered at the bottom.
          "2xl:inset-auto 2xl:bottom-0 2xl:left-1/2 2xl:h-190 2xl:w-960 2xl:max-w-none 2xl:-translate-x-1/2",
          className,
        )}
      />
    </picture>
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

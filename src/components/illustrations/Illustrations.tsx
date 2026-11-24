import clsx from "clsx";
import type { ArticleMotif } from "@/lib/content/articles";

// One illustration style for the whole site: 2px ink lines, teal accents, teal-soft fills,
// rounded caps. Motif: lanes and roads. All decorative, so all aria-hidden.
// Inline SVG with a fixed viewBox: scales with its container and never shifts the layout.

const svgProps = {
  "aria-hidden": true,
  focusable: false,
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Homepage hero: a road running to the horizon, a car in its lane, and a signpost
// pointing three ways (three options to explore).
export function HeroRoad({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 440"
      className={clsx("h-auto w-full", className)}
      {...svgProps}
    >
      <defs>
        <clipPath id="hero-road-clip">
          <rect width="560" height="440" rx="28" />
        </clipPath>
      </defs>
      <g clipPath="url(#hero-road-clip)">
        <rect width="560" height="440" className="fill-teal-soft" />
        {/* sun + clouds */}
        <circle
          cx="440"
          cy="92"
          r="34"
          className="fill-surface stroke-ink"
          strokeWidth="2"
        />
        <path
          d="M92 104h70a18 18 0 0 0-30-18 24 24 0 0 0-40 18"
          className="fill-surface stroke-ink"
          strokeWidth="2"
        />
        <path
          d="M300 70h52a14 14 0 0 0-22-14 18 18 0 0 0-30 14"
          className="fill-surface stroke-ink"
          strokeWidth="2"
        />
        {/* hills */}
        <path
          d="M0 214c70-40 150-52 230-30s170 8 210-12 90-20 120-8v276H0z"
          className="fill-surface"
        />
        <path
          d="M0 214c70-40 150-52 230-30s170 8 210-12 90-20 120-8"
          className="stroke-ink"
          strokeWidth="2"
        />
        {/* road */}
        <path
          d="M262 190 120 440h320L298 190z"
          className="fill-cream stroke-ink"
          strokeWidth="2"
        />
        <path
          d="M280 200v22m0 26v30m0 34v40m0 46v42"
          className="stroke-teal"
          strokeWidth="4"
        />
        {/* car (rear view): taller cabin and body so it reads as a car, not a bar */}
        <g transform="translate(210 296)">
          <rect
            x="10"
            y="84"
            width="22"
            height="26"
            rx="6"
            className="fill-ink"
          />
          <rect
            x="108"
            y="84"
            width="22"
            height="26"
            rx="6"
            className="fill-ink"
          />
          <path
            d="M20 46 33 10a10 10 0 0 1 9.4-6.6h55.2A10 10 0 0 1 107 10l13 36"
            className="fill-surface stroke-ink"
            strokeWidth="2"
          />
          <path
            d="M42 14h56l9 28H33z"
            className="fill-teal-soft stroke-ink"
            strokeWidth="2"
          />
          <rect
            x="0"
            y="44"
            width="140"
            height="48"
            rx="16"
            className="fill-teal stroke-ink"
            strokeWidth="2"
          />
          <rect
            x="12"
            y="58"
            width="26"
            height="12"
            rx="6"
            className="fill-surface stroke-ink"
            strokeWidth="2"
          />
          <rect
            x="102"
            y="58"
            width="26"
            height="12"
            rx="6"
            className="fill-surface stroke-ink"
            strokeWidth="2"
          />
          <rect
            x="50"
            y="72"
            width="40"
            height="12"
            rx="4"
            className="fill-surface stroke-ink"
            strokeWidth="2"
          />
        </g>
        {/* signpost with three options */}
        <g transform="translate(410 196)">
          <path d="M24 0v164" className="stroke-ink" strokeWidth="4" />
          <path
            d="M24 10h70l14 14-14 14H24z"
            className="fill-surface stroke-ink"
            strokeWidth="2"
          />
          <path
            d="M24 50h-62l-14 14 14 14h62z"
            className="fill-surface stroke-ink"
            strokeWidth="2"
          />
          <path
            d="M24 90h70l14 14-14 14H24z"
            className="fill-teal-strong stroke-ink"
            strokeWidth="2"
          />
          <path
            d="M40 24h36M-22 64h30M40 104h18"
            className="stroke-ink"
            strokeWidth="2"
          />
          <path
            d="m64 98 6 6 12-12"
            className="stroke-surface"
            strokeWidth="3"
          />
        </g>
        {/* trees */}
        <g className="stroke-ink" strokeWidth="2">
          <path d="M70 300v-40" />
          <circle cx="70" cy="244" r="24" className="fill-teal" />
          <path d="M130 268v-30" />
          <circle cx="130" cy="226" r="17" className="fill-teal-soft" />
        </g>
      </g>
    </svg>
  );
}

// Article hero: a dashboard of the things that shape a rate, laid out along a road.
export function ArticleHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 340"
      className={clsx("h-auto w-full", className)}
      {...svgProps}
    >
      <rect width="800" height="340" rx="24" className="fill-teal-soft" />
      {/* winding road */}
      <path
        d="M-10 300c160-10 230-90 380-90s240 80 440 50"
        className="stroke-ink"
        strokeWidth="56"
      />
      <path
        d="M-10 300c160-10 230-90 380-90s240 80 440 50"
        className="stroke-cream"
        strokeWidth="52"
      />
      <path
        d="M-10 300c160-10 230-90 380-90s240 80 440 50"
        className="stroke-teal"
        strokeWidth="4"
        strokeDasharray="22 18"
      />
      {/* factor signs: person, pin, car, gauge. Each post runs down to the road's
          upper edge at its x (post = sign bottom to edge), so they stand on the shoulder. */}
      {[
        { x: 110, label: "person", post: 115 },
        { x: 290, label: "pin", post: 39 },
        { x: 470, label: "car", post: 58 },
        { x: 650, label: "gauge", post: 83 },
      ].map(({ x, label, post }, i) => (
        <g key={label} transform={`translate(${x} ${i % 2 ? 56 : 40})`}>
          <path d={`M0 96v${post}`} className="stroke-ink" strokeWidth="4" />
          <rect
            x="-48"
            y="0"
            width="96"
            height="96"
            rx="20"
            className={
              i === 3
                ? "fill-teal-strong stroke-ink"
                : "fill-surface stroke-ink"
            }
            strokeWidth="2"
          />
          <g
            className={i === 3 ? "stroke-surface" : "stroke-ink"}
            strokeWidth="3"
          >
            {label === "person" && (
              <>
                <circle cx="0" cy="34" r="12" />
                <path d="M-22 76c4-16 12-22 22-22s18 6 22 22" />
              </>
            )}
            {label === "pin" && (
              <>
                <path d="M0 78s-22-20-22-38a22 22 0 0 1 44 0c0 18-22 38-22 38" />
                <circle cx="0" cy="40" r="7" />
              </>
            )}
            {label === "car" && (
              <>
                <path d="M-28 56h56v-12l-10-18h-36l-10 18z" />
                <circle cx="-16" cy="62" r="7" className="fill-surface" />
                <circle cx="16" cy="62" r="7" className="fill-surface" />
              </>
            )}
            {label === "gauge" && (
              <>
                <path d="M-26 66a26 26 0 1 1 52 0" />
                <path d="m0 66 14-18" />
              </>
            )}
          </g>
        </g>
      ))}
    </svg>
  );
}

// Small header art for article cards, one per motif.
export function CardArt({ motif }: { motif: ArticleMotif }) {
  return (
    <svg viewBox="0 0 320 140" className="h-auto w-full" {...svgProps}>
      <rect width="320" height="140" className="fill-teal-soft" />
      <path
        d="M0 112c80-18 140-18 200-6s90 8 120-2"
        className="stroke-ink"
        strokeWidth="2"
      />
      {motif === "road" && (
        <g strokeWidth="2">
          <path
            d="M150 40 100 140h120L170 40z"
            className="fill-cream stroke-ink"
          />
          <path
            d="M160 50v14m0 14v18m0 18v20"
            className="stroke-teal"
            strokeWidth="4"
          />
          <circle cx="250" cy="48" r="16" className="fill-surface stroke-ink" />
        </g>
      )}
      {motif === "shield" && (
        <g strokeWidth="2">
          <path
            d="M160 26 128 38v24c0 20 13 36 32 44 19-8 32-24 32-44V38z"
            className="fill-surface stroke-ink"
          />
          <path
            d="m146 66 10 10 18-18"
            className="stroke-teal-strong"
            strokeWidth="4"
          />
          <circle cx="66" cy="56" r="12" className="fill-teal stroke-ink" />
        </g>
      )}
      {motif === "calendar" && (
        <g strokeWidth="2">
          <rect
            x="122"
            y="30"
            width="76"
            height="72"
            rx="12"
            className="fill-surface stroke-ink"
          />
          <path d="M122 52h76M142 22v16m36-16v16" className="stroke-ink" />
          <path
            d="m148 76 8 8 16-16"
            className="stroke-teal-strong"
            strokeWidth="4"
          />
          <circle cx="252" cy="54" r="12" className="fill-teal stroke-ink" />
        </g>
      )}
    </svg>
  );
}

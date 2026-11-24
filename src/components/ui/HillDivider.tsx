import clsx from "clsx";

// The edge between two sections, drawn as a gentle hill with the hero's navy outline,
// so each section reads as one more layer of the hero landscape.
// `from` is the color of the section above, `to` the color of the section below.
// Decorative: hidden from screen readers.

type Tone = "cream" | "surface" | "teal-soft";

// Full class names (no string building) so Tailwind finds them.
const BACKGROUND: Record<Tone, string> = {
  cream: "bg-cream",
  surface: "bg-surface",
  "teal-soft": "bg-teal-soft",
};
const FILL: Record<Tone, string> = {
  cream: "fill-cream",
  surface: "fill-surface",
  "teal-soft": "fill-teal-soft",
};

// One hill shape, with a mirrored version so neighbouring edges don't repeat.
const HILL = "M0 44C300 8 720 4 1040 26S1340 52 1440 40";
const HILL_FLIPPED = "M0 40C100 52 400 26 720 8S1140 8 1440 44";

export function HillDivider({
  from,
  to,
  flip = false,
}: {
  from: Tone;
  to: Tone;
  flip?: boolean;
}) {
  const line = flip ? HILL_FLIPPED : HILL;
  return (
    <div aria-hidden="true" className={clsx(BACKGROUND[from], "leading-none")}>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        focusable="false"
        className="block h-10 w-full md:h-14"
      >
        <path d={`${line}V56H0Z`} className={FILL[to]} />
        {/* non-scaling-stroke keeps the line 2px however wide the screen is */}
        <path
          d={line}
          fill="none"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className="stroke-ink"
        />
      </svg>
    </div>
  );
}

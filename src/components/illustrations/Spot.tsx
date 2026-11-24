import clsx from "clsx";

// Small spot illustrations, drawn in the same style as the hero landscape:
// navy 2px outline with round caps, teal fill for the subject, white for secondary
// shapes, light teal for highlights, all inside a soft circle.
// Colors are the brand tokens from globals.css (ink #12233F, teal #1A9E95,
// teal-strong #0E766F, teal-soft #E3F4F2), written as hex because SVG attributes
// can't read Tailwind classes.
// Every illustration is decorative (aria-hidden): the heading next to it carries
// the meaning.

const DRAWINGS = {
  // How it works 1: a clipboard with a ZIP field and a check
  details: (
    <>
      <rect
        x="36"
        y="28"
        width="48"
        height="64"
        rx="6"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="48"
        y="22"
        width="24"
        height="12"
        rx="4"
        fill="#1A9E95"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46 48h28M46 58h20"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="46"
        y="68"
        width="28"
        height="12"
        rx="4"
        fill="#E3F4F2"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51 74h2M58 74h2M65 74h2"
        stroke="#0E766F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="84"
        cy="86"
        r="11"
        fill="#0E766F"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m79 86 3.5 3.5 6.5-7"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  // How it works 2: a magnifying glass over the road
  explore: (
    <>
      <path
        d="M26 98 50 38h20l24 60Z"
        fill="#FBF8F3"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 44v8M60 60v10M60 78v14"
        stroke="#1A9E95"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        cx="78"
        cy="44"
        r="16"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70 40a9 9 0 0 1 8-6"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m89.5 55.5 10 10"
        stroke="#12233F"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </>
  ),
  // How it works 3: a signpost, the chosen way checked
  choose: (
    <>
      <path
        d="M58 28v68"
        stroke="#12233F"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M58 32h28l8 8-8 8H58Z"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64 40h14"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58 54H32l-8 8 8 8h26Z"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 62h14"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58 76h28l8 8-8 8H58Z"
        fill="#0E766F"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m68 84 4 4 8-8"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 98h40"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  // Why compare 1: a tilted scale (insurers weigh you differently)
  scale: (
    <>
      <path
        d="M60 30v60M44 92h32"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 46 90 36"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="60"
        cy="40"
        r="5"
        fill="#1A9E95"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 46 20 70M30 46l10 24M90 36 80 60M90 36l10 24"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 70h24a12 12 0 0 1-24 0Z"
        fill="#1A9E95"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M78 60h24a12 12 0 0 1-24 0Z"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  // Why compare 2: a calendar with a renewal arrow
  renew: (
    <>
      <rect
        x="28"
        y="34"
        width="60"
        height="54"
        rx="8"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 42a8 8 0 0 1 8-8h44a8 8 0 0 1 8 8v8H28Z"
        fill="#1A9E95"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 28v12M74 28v12"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="62" r="2.5" fill="#12233F" />
      <circle cx="52" cy="62" r="2.5" fill="#12233F" />
      <circle cx="64" cy="62" r="2.5" fill="#12233F" />
      <circle cx="76" cy="62" r="2.5" fill="#12233F" />
      <circle cx="40" cy="76" r="2.5" fill="#12233F" />
      <circle cx="52" cy="76" r="2.5" fill="#12233F" />
      <circle
        cx="64"
        cy="76"
        r="7"
        fill="#E3F4F2"
        stroke="#0E766F"
        strokeWidth="2"
      />
      <circle
        cx="88"
        cy="86"
        r="13"
        fill="#0E766F"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M82 87a6 6 0 1 0 2.2-4.8"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M83.5 78.5v4h4"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  // Why compare 3: a magnifying glass over a policy
  inspect: (
    <>
      <path
        d="M34 24h32l16 16v54a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4Z"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M66 24v16h16"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="37" y="56" width="30" height="10" rx="3" fill="#E3F4F2" />
      <path
        d="M40 48h26M40 61h22M40 74h18"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="76"
        cy="76"
        r="14"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M69 72a8 8 0 0 1 7-6"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m86 86 10 10"
        stroke="#12233F"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </>
  ),
  // Coverage: you hit another car
  liability: (
    <>
      <path
        d="M10 84h100"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="10"
        y="60"
        width="44"
        height="16"
        rx="6"
        fill="#1A9E95"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 60l6-10h16l6 10"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21" cy="78" r="6" fill="#12233F" />
      <circle cx="44" cy="78" r="6" fill="#12233F" />
      <rect
        x="66"
        y="60"
        width="44"
        height="16"
        rx="6"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M74 60l6-10h16l6 10"
        fill="#E3F4F2"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="77" cy="78" r="6" fill="#12233F" />
      <circle cx="100" cy="78" r="6" fill="#12233F" />
      <path
        d="M60 40v8M52 44l4 5M68 44l-4 5"
        stroke="#0E766F"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  ),
  // Coverage: you slide on ice into a guardrail
  collision: (
    <>
      <rect
        x="8"
        y="84"
        width="74"
        height="5"
        rx="2.5"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="1.5"
      />
      <path
        d="M8 84h104"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M84 64h26M84 72h26"
        stroke="#12233F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M90 60v24M104 60v24"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="24"
        y="60"
        width="44"
        height="16"
        rx="6"
        fill="#1A9E95"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 60l6-10h16l6 10"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="35" cy="78" r="6" fill="#12233F" />
      <circle cx="58" cy="78" r="6" fill="#12233F" />
      <path
        d="M36 22v18M28 26l16 10M28 36l16-10"
        stroke="#0E766F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M72 54l6-2M73 62h7"
        stroke="#0E766F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </>
  ),
  // Coverage: a branch falls on your parked car
  comprehensive: (
    <>
      <path
        d="M8 86h104"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M94 86V44"
        stroke="#12233F"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        cx="94"
        cy="34"
        r="18"
        fill="#1A9E95"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 46 62 38"
        stroke="#12233F"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        cx="40"
        cy="41"
        r="5"
        fill="#1A9E95"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="54"
        cy="37"
        r="5"
        fill="#1A9E95"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 32l-2-6M44 28v-6M56 26l2-6"
        stroke="#0E766F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="18"
        y="62"
        width="48"
        height="16"
        rx="6"
        fill="#fff"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 62l6-10h18l6 10"
        fill="#E3F4F2"
        stroke="#12233F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="29" cy="80" r="6" fill="#12233F" />
      <circle cx="55" cy="80" r="6" fill="#12233F" />
    </>
  ),
} satisfies Record<string, React.ReactNode>;

export type SpotName = keyof typeof DRAWINGS;

// circle: the color behind the drawing. Use "white" on cream or teal sections and
// "soft" (light teal) on white sections, so the circle always shows.
export function Spot({
  name,
  circle = "soft",
  className,
}: {
  name: SpotName;
  circle?: "soft" | "white";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={clsx("shrink-0", className)}
    >
      <circle
        cx="60"
        cy="60"
        r="56"
        className={circle === "white" ? "fill-surface" : "fill-teal-soft"}
      />
      {DRAWINGS[name]}
    </svg>
  );
}

import { AttributedLink } from "@/components/AttributedLink";
import clsx from "clsx";

// Text wordmark with a small "two lanes" mark, per the design system's logo rules:
// "Clear" in ink, "Lane" in teal-strong, "Auto" in ink-muted at 500.
// tone="dark" is the reversed version for the ink footer.
export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    // The wordmark is also the link back to the homepage. AttributedLink keeps the
    // campaign params (utm_source, utm_campaign, click_id), like every other link.
    <AttributedLink
      href="/"
      className={clsx(
        "inline-flex min-h-11 shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight whitespace-nowrap",
        dark ? "text-cream focus-visible:outline-teal" : "text-ink",
      )}
    >
      <LaneMark />
      <span>
        Clear
        <span className={dark ? "text-teal" : "text-teal-strong"}>
          Lane
        </span>{" "}
        <span
          className={clsx(
            "font-medium",
            dark ? "text-on-ink-muted" : "text-ink-muted",
          )}
        >
          Auto
        </span>
      </span>
    </AttributedLink>
  );
}

// Rounded teal square with two straight lane lines that narrow toward the horizon but never meet,
// plus center dashes. Decorative: the text names the link.
function LaneMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-8 shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="9" className="fill-teal-strong" />
      <path
        d="M9 26 13.5 7M23 26 18.5 7"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 23v-2m0-5v-2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

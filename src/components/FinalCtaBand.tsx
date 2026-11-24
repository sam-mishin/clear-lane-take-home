import { Container } from "@/components/ui/Container";

// The one dark band per page. A rounded panel on cream, so it never merges with the footer.
// The action is passed in: CompareLink on / and the article, a "back to the form" link on /compare.
export function FinalCtaBand({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="final-cta-heading"
      data-sticky-cta-hide=""
      className="py-16 md:py-24"
    >
      <Container>
        <div className="rounded-card bg-ink text-cream reveal relative overflow-hidden px-6 py-12 text-center md:px-12 md:py-16">
          {/* Lane lines sit behind the text; "relative" on the text keeps it on top. */}
          <RoadLines />
          <div className="relative">
            <h2
              id="final-cta-heading"
              className="mx-auto max-w-2xl text-2xl md:text-4xl"
            >
              {title}
            </h2>
            <p className="text-on-ink-muted mx-auto mt-4 max-w-xl text-lg md:text-xl">
              {body}
            </p>
            {/* The button passed in by the page */}
            <div className="mt-8 flex justify-center">{action}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Faint lane lines in the corners of the band. Decorative.
function RoadLines() {
  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="stroke-teal absolute inset-0 size-full opacity-25"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M-20 200C60 140 70 60 40 -10" />
      <path d="M420 200C340 140 330 60 360 -10" />
      <path d="M10 200C75 150 90 80 70 -10" strokeDasharray="6 10" />
      <path d="M390 200C325 150 310 80 330 -10" strokeDasharray="6 10" />
    </svg>
  );
}

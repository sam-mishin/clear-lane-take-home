"use client";

import Link from "next/link";
import { withAttribution } from "@/lib/attribution";

// EVERY "Compare my options" link in the project uses this component.
// It points at /compare and carries utm_source, utm_campaign and click_id along.
// TODO: style as the primary CTA. Make sure the href updates after the stored
// attribution is read in the browser (sessionStorage isn't available on the server).
export function CompareLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={withAttribution("/compare")} className={className}>
      {children}
    </Link>
  );
}

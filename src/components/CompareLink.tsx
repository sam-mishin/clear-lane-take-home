"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { pickAttribution, withAttribution } from "@/lib/attribution";
import { ROUTES } from "@/lib/site";

type Props = { className?: string; children: React.ReactNode };

// EVERY link to the comparison page uses this component, so campaign params
// in the current URL (utm_source, utm_campaign, click_id) carry through.
// It wraps itself in Suspense because it reads the URL, so pages can use it anywhere.
// TODO: style as the primary CTA.
export function CompareLink(props: Props) {
  return (
    <Suspense
      fallback={
        <Link href={ROUTES.compare} className={props.className}>
          {props.children}
        </Link>
      }
    >
      <CompareLinkWithParams {...props} />
    </Suspense>
  );
}

function CompareLinkWithParams({ className, children }: Props) {
  const params = useSearchParams();
  const href = withAttribution(ROUTES.compare, pickAttribution(params));
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

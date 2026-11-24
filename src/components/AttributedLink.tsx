"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { pickAttribution, withAttribution } from "@/lib/attribution";

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
};

// An internal link that carries utm_source, utm_campaign and click_id from the
// current URL. Used by CompareLink, the header nav and article cards, so a visitor who
// lands on / or the article with campaign params still has them when they reach /compare.
// It reads the URL, so it wraps itself in Suspense: the prerendered HTML has the plain
// href and the params are added as soon as the page hydrates.
export function AttributedLink(props: Props) {
  return (
    <Suspense fallback={<Link {...props} />}>
      <LinkWithParams {...props} />
    </Suspense>
  );
}

function LinkWithParams({ href, ...props }: Props) {
  const params = useSearchParams();
  return (
    <Link href={withAttribution(href, pickAttribution(params))} {...props} />
  );
}

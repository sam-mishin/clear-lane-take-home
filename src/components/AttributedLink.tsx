"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { pickAttribution, withAttribution } from "@/lib/attribution";

// An internal link that keeps the campaign params (utm_source, utm_campaign, click_id)
// from the current URL. Used by CompareLink, the header and footer links and article
// cards, so someone who lands on / or the article from an ad still has those params
// when they reach /compare.

type AttributedLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  "aria-current"?: "page"; // set on the link to the page you're on
};

export function AttributedLink(props: AttributedLinkProps) {
  // useSearchParams() (below) needs a Suspense boundary. Until the page loads in the
  // browser, the fallback shows the same link without the params.
  return (
    <Suspense fallback={<Link {...props} />}>
      <LinkWithCampaignParams {...props} />
    </Suspense>
  );
}

function LinkWithCampaignParams({ href, ...otherProps }: AttributedLinkProps) {
  const params = useSearchParams();
  // e.g. "/compare" -> "/compare?utm_source=fb&click_id=abc"
  const hrefWithParams = withAttribution(href, pickAttribution(params));
  return <Link href={hrefWithParams} {...otherProps} />;
}

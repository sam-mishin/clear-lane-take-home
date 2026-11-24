import { CampaignHeader } from "@/components/layout/CampaignHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCompareBar } from "@/components/funnel/StickyCompareBar";

// Layout for paid-traffic landing pages.
// Minimal header on purpose: no nav links leaking visitors away from the funnel.
export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CampaignHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      {/* Disclosure only: no page links leading away from the form */}
      <SiteFooter variant="campaign" />
      {/* Phones: pinned "Compare my options" that scrolls back to the form */}
      <StickyCompareBar target="form" />
    </>
  );
}

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCompareBar } from "@/components/funnel/StickyCompareBar";

// Layout for the "explore" pages: homepage + blog article.
// Full navigation lives here. The (campaign) group does NOT get this header.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      {/* Page links + disclosure */}
      <SiteFooter />
      {/* Phones: pinned "Compare my options" that links to /compare */}
      <StickyCompareBar target="link" />
    </>
  );
}

import { SiteHeader } from "@/components/layout/SiteHeader";

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
      <main id="main">{children}</main>
    </>
  );
}

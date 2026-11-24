import { CampaignHeader } from "@/components/layout/CampaignHeader";

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
      <main id="main">{children}</main>
    </>
  );
}

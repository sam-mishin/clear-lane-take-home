import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AttributionCapture } from "@/components/AttributionCapture";
import { DebugPanel } from "@/components/debug/DebugPanel";

const brandFont = Plus_Jakarta_Sans({
  variable: "--font-brand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ClearLane Auto",
    template: "%s | ClearLane Auto",
  },
  description: "TODO: site-wide fallback description.",
};

// Root layout: wraps every route. Route groups (site) and (campaign)
// add their own header on top of this.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={brandFont.variable}>
      <body className="flex min-h-screen flex-col">
        {/* Saves utm_source / utm_campaign / click_id on any entry page.
            Suspense is required because it reads the URL (useSearchParams). */}
        <Suspense fallback={null}>
          <AttributionCapture />
        </Suspense>

        <div className="flex-1">{children}</div>

        <SiteFooter />

        <Suspense fallback={null}>
          <DebugPanel />
        </Suspense>
      </body>
    </html>
  );
}

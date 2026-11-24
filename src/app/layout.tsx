import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { openGraph, SITE_DESCRIPTION, SITE_NAME } from "@/lib/metadata";

const brandFont = Plus_Jakarta_Sans({
  variable: "--font-brand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  // Fallback for any route that doesn't set its own.
  description: SITE_DESCRIPTION,
  openGraph: openGraph(SITE_NAME, SITE_DESCRIPTION),
  // Favicon, icon.svg and apple-icon.png live in src/app/ and are added by Next.js.
};

// Root layout: wraps every route. Route groups (site) and (campaign)
// add their own header on top of this.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={brandFont.variable}>
      <body className="flex min-h-screen flex-col">
        {/* First Tab stop on every page: jumps keyboard users past the header. */}
        <a
          href="#main"
          className="bg-teal-strong sr-only rounded-full font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3"
        >
          Skip to main content
        </a>
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

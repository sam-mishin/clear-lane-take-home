import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {
  openGraph,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/metadata";

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
  // Relative URLs below (canonical, preview image) are resolved against this.
  metadataBase: SITE_URL,
  openGraph: openGraph(SITE_NAME, SITE_DESCRIPTION),
  // Large image card on X/Twitter; it uses the og:image.
  twitter: { card: "summary_large_image" },
  // Favicon, icon.svg and apple-icon.png live in src/app/ and are added by Next.js.
  // The link-preview picture is set in openGraph() (lib/metadata.ts).
};

// Root layout: wraps every route. Route groups (site) and (campaign) add their own
// header and footer inside it. <body> is a column at least the screen's height, and
// each group's <main> grows to fill it, so the footer stays at the bottom.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior="smooth": globals.css turns on smooth scrolling for in-page
    // links (TOC, "See how it works"). This tells Next.js to switch it off while
    // changing pages, so a new page starts at the top instead of gliding there and
    // stopping partway (Next.js 16 no longer does this by default).
    <html
      lang="en"
      className={brandFont.variable}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col">
        {/* First Tab stop on every page: jumps keyboard users past the header. */}
        <a
          href="#main"
          className="bg-teal-strong sr-only rounded-full font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3"
        >
          Skip to main content
        </a>
        {/* Header, main, footer: added by the (site) and (campaign) layouts, so
            /compare can use the campaign footer (no page links). */}
        {children}
      </body>
    </html>
  );
}

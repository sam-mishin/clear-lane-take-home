import { NextResponse, type NextRequest } from "next/server";
import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_COOKIE_DAYS,
  pickAttribution,
} from "@/lib/attribution";

// Proxy (Next.js 16's name for middleware) runs on the server before each page
// request. Its one job here: when someone arrives with campaign params in the URL
// (utm_source, utm_campaign, click_id), save them in a first-party cookie, so the
// comparison is still credited to that ad if they come back later without the params.
//
// - Last click wins: a new visit with params replaces the whole cookie.
// - A visit without params leaves the cookie alone.
// - The value is stored like a query string ("utm_source=fb&click_id=abc"), so the
//   browser side can read it back with the same pickAttribution() used for URLs.
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const attribution = pickAttribution(request.nextUrl.searchParams);

  if (Object.keys(attribution).length > 0) {
    response.cookies.set(
      ATTRIBUTION_COOKIE,
      new URLSearchParams(attribution).toString(),
      {
        maxAge: ATTRIBUTION_COOKIE_DAYS * 24 * 60 * 60, // in seconds
        path: "/", // readable on every page
        sameSite: "lax", // sent when following a link from an ad, not on cross-site requests
        // HTTPS only on the live site; plain http://localhost still works for testing.
        secure: request.nextUrl.protocol === "https:",
        // Not httpOnly: the funnel reads it in the browser, because the (mock)
        // comparison request is sent from the browser. With a real API, make it
        // httpOnly and read it on the server instead.
        httpOnly: false,
      },
    );
  }

  return response;
}

// Run on pages only. Skip Next.js's own files, the illustrations and the icons,
// which never carry campaign params.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|illustrations/|favicon.ico|icon.svg|apple-icon.png|og-image.png).*)",
  ],
};

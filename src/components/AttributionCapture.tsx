"use client";

// Rendered once in the root layout. Renders nothing.
// TODO: on load, read utm_source / utm_campaign / click_id from the URL
// (useSearchParams) and save any that are present with saveAttribution().
// Do the sessionStorage write in useEffect, not during render.
export function AttributionCapture() {
  return null;
}

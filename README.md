# ClearLane Auto: Frontend take-home

Three connected pages for ClearLane Auto, a fictional auto insurance comparison and referral service.

Live preview: TODO

Design file: [ClearLane Auto: components](https://claude.ai/artifact/EiQHuKCV1dWSzBp4C2z9m8). Every component and state, plus all three pages at 375px and 1440px, rendered from this code.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

Node version used: TODO

## Routes

| Page                  | Route                                        |
| --------------------- | -------------------------------------------- |
| Homepage              | `/`                                          |
| Campaign landing page | `/compare`                                   |
| Blog article          | `/blog/what-affects-your-car-insurance-rate` |

## Testing the funnel

- Attribution: `/compare?utm_source=fb&utm_campaign=age_test&click_id=abc123`
- Trigger the mock error: add `&mock=fail` to the URL (first attempt fails, "Try again" succeeds) or `&mock=fail-always`
- Skip step 1 from the homepage: `/compare?age=45-54` opens on the ZIP step (the homepage hero's age buttons link here)
- Events: open the browser console. The brief's two events are `age_selected` and `comparison_started` (success only). Three more show where people drop off: `zip_step_viewed`, `zip_invalid` and `submit_failed`. No event includes the age or ZIP; the submission payload does.
- Browser Back: on the ZIP step, Back returns to the age step with the age still selected
- Attribution cookie: arriving with any campaign param saves them for 30 days in a first-party cookie, `cl_attribution` (set in `src/proxy.ts`). If a later visit has no params in the URL, events and the payload use the cookie instead. The URL always wins, and a new ad click replaces the cookie. To test: open `/?utm_source=fb&utm_campaign=age_test&click_id=abc123`, then open `/compare` with no params and pick an age. To reset: delete the cookie in DevTools (Application → Cookies).

## Project structure

```
src/app/(site)/        Homepage + article, full site header
src/app/(campaign)/    Paid landing page, minimal header
src/components/        Shared UI (CompareLink, Faq, StepList, ArticleCard, ...)
src/lib/site.ts        Routes, nav links, CTA label, disclosure (one place)
src/lib/content/       Page copy as typed data (FAQ, steps, coverage, articles)
src/lib/               Attribution, analytics, mock submission
src/proxy.ts           Saves campaign params in the cl_attribution cookie
```

## Task 1: Conversion hypothesis

TODO

## Task 2: Reference choices

TODO

## Design decisions

TODO

## Verification notes

TODO

## AI usage and verification

TODO

## Time spent

TODO

## Known limitations and next steps

TODO

## Screenshots

TODO

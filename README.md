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
- Trigger the mock error: add `&mock=fail` to the URL
- Events: open the browser console to see `age_selected` and `comparison_started`. They never include age or ZIP; the submission payload does.

## Project structure

```
src/app/(site)/        Homepage + article, full site header
src/app/(campaign)/    Paid landing page, minimal header
src/components/        Shared UI (CompareLink, Faq, StepList, ArticleCard, ...)
src/lib/site.ts        Routes, nav links, CTA label, disclosure (one place)
src/lib/content/       Page copy as typed data (FAQ, steps, coverage, articles)
src/lib/               Attribution, analytics, mock submission
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

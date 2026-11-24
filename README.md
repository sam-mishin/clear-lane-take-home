# ClearLane Auto: Frontend take-home

Three connected pages for ClearLane Auto, a fictional auto insurance comparison and referral service.

Live preview: TODO

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
- Debug panel: add `?debug=1`
- Trigger the mock error: TODO
- Analytics events: TODO

## Project structure

```
src/app/(site)/        Homepage + article, full site header
src/app/(campaign)/    Paid landing page, minimal header
src/components/        Shared UI (CompareLink, Faq, StepList, ArticleCard, ...)
src/lib/               Attribution, analytics, mock submit, content
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

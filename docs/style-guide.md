# ClearLane Auto style guide

How ClearLane looks, reads and behaves. The visual version, with live component previews, logos and icons, is the ClearLane Auto design system. Every value maps to a token in `src/app/globals.css` or a default Tailwind class, so the guide and the code can't drift apart. A 4-page visual version sits beside this file as `docs/style-guide.pdf`.

**Brand in one line:** a clearer road to your next policy.
**Personality:** approachable, straightforward, reassuring, modern.
**Audience:** drivers aged 35–65 who want a better rate and find insurance shopping confusing.

### What the personality means in the UI

| Trait | Design rule |
|---|---|
| Approachable | Warm cream background, rounded corners, pill buttons, friendly line illustrations. No stock photos of people shaking hands |
| Straightforward | One primary action per screen. Plain-language headings. No jargon without an inline explanation |
| Reassuring | Say what happens next before people commit. Disclosures are easy to find, not hidden in fine print |
| Modern | Generous whitespace, one typeface, a restrained palette where teal marks the things you can act on |

### Designing for drivers 35–65

They want a better rate, find insurance confusing, and have seen plenty of ads that overpromise. Every rule in this guide answers one of those three facts.

| What they need | How ClearLane answers it |
|---|---|
| Text they can read without zooming | Body is 18px (`text-lg`) at every width, phones included. Body text is `ink` on cream (14.8:1). Muted gray never carries anything they need to act on. |
| Controls they can hit the first time | Buttons and inputs 48px tall, radio cards 56px, whole cards clickable |
| No jargon | Coverage is explained as situations first ("If someone hits you and drives off"), then the term, then a one-line definition |
| To know what happens next | "Step 2 of 2," the next step stated before they commit, answers kept on screen |
| Reasons to trust, not hype | No ratings, testimonials, customer counts or savings. Instead: what ClearLane is, what it isn't (an insurer), and what it asks for (age and ZIP) |
| Calm, not pushy | Sentence case everywhere, no all-caps buttons, no countdowns, one primary button per view |
| Interfaces they already know | Stacked layouts and native controls. No swipe-only carousels, no hover-only content |

### Brand guideline check

| Brief says | Where it lives |
|---|---|
| Promise: "A clearer road to your next policy" | Homepage hero headline |
| Personality: approachable, straightforward, reassuring, modern | The table above; color (1), type (2), voice (8) |
| Primary action: "Compare my options" | The only label for starting a comparison: `CTA_LABEL` in `src/lib/site.ts` |
| Warm white, dark navy, teal accents | `cream`, `ink`, `teal-strong` / `teal` |
| Simple wordmark | Text wordmark with a small lane mark |
| Original copy; no invented counts, partners, testimonials or guaranteed savings | Voice and copy (8), "What we leave behind" (7) |
| Label example rates as illustrative | No rates are shown. If one is ever added, it gets the "Illustrative example" badge |
| ClearLane is a comparison and referral service, not an insurer | Note under the funnel button and in the footer |
| Adapt Corgi and Lemonade without copying | Section 7 |

---

## 0. Root styles (already in the code)

`src/app/globals.css` and `src/app/layout.tsx` set these once for the whole site, so components don't repeat them:

- All color tokens below, the `rounded-card` radius, and Plus Jakarta Sans as `font-sans`
- Body: `bg-cream text-ink font-sans text-lg antialiased` (18px body everywhere)
- Headings: `h1`, `h2` and `h3` get their default size, weight and tracking from the Typography table (hero H1, H2, H3 rows), so they need no classes. Add classes only to override, e.g. the article H1
- One focus ring for everything: `outline-2 outline-offset-2 outline-teal-strong`
- Text selection in `teal-soft`
- Anchor links land 6rem below the top (room for a sticky header); smooth scrolling only when the visitor hasn't asked for reduced motion
- A "Skip to main content" link, visible when focused

---

## 1. Color

### Tokens

| Token | Class examples | Hex | Use for |
|---|---|---|---|
| `cream` | `bg-cream` | `#FBF8F3` | Page background |
| `surface` | `bg-surface` | `#FFFFFF` | Cards, panels, inputs, the form card |
| `ink` | `text-ink` `bg-ink` | `#12233F` | Body and heading text. Dark CTA bands. Primary button hover |
| `ink-muted` | `text-ink-muted` `border-ink-muted` | `#4A5872` | Secondary text, captions, input borders |
| `teal` | `bg-teal` `border-teal` | `#1A9E95` | Icons, illustration accents, decorative lines. **Not for text, and not for buttons with white text** |
| `teal-strong` | `bg-teal-strong` `text-teal-strong` | `#0E766F` | Primary buttons, links, eyebrows, focus rings, selected borders |
| `teal-soft` | `bg-teal-soft` | `#E3F4F2` | Selected card fill, callouts, step number badges |
| `error` | `text-error` `border-error` | `#B42318` | Validation errors, the failed-submission state |
| `line` | `border-line` | `#E4DED3` | Dividers and card outlines only (decorative) |
| `on-ink-muted` | `text-on-ink-muted` | `#C9D0DC` | Secondary text on `ink` (footer disclosure), 10.1:1 |

### Checked contrast (WCAG 2.2)

| Pair | Ratio | Passes for |
|---|---|---|
| `ink` on `cream` | 14.8 | All text |
| `ink-muted` on `cream` | 6.8 | All text |
| `teal-strong` on `cream` | 5.2 | All text (links, eyebrows) |
| `teal-strong` on `teal-soft` | 4.8 | All text (selected card labels) |
| white on `teal-strong` | 5.5 | Button text |
| `teal` on `ink` | 4.8 | Text on dark bands |
| `error` on `cream` | 6.2 | Error messages |
| white on `teal` | 3.3 | ❌ Text. Icons and UI shapes only (3:1) |
| `line` on `cream` | 1.3 | ❌ Anything functional. Decoration only |

**Rules**

- Teal is for **things you can act on** (buttons, links, selected states, focus). Don't use it for decoration-heavy blocks, or it stops signaling "clickable."
- Input borders use `border-ink-muted` (form fields need 3:1 against the background). `border-line` is only for dividers and card edges.
- Never show state with color alone. Selected = border + fill + check icon. Error = red border + icon + message text.
- One dark band per page at most (the final CTA). Everything else sits on cream or white.

---

## 2. Typography

**Typeface:** Plus Jakarta Sans (`font-sans`, loaded with `next/font` in `layout.tsx`). One family only.
**Weights:** 400 body · 600 labels, buttons, H3 · 700 H2 · 800 hero H1.

### Scale

Mobile first, then `md:` from 768px.

| Role | Classes | Notes |
|---|---|---|
| Hero H1 (landing, home) | `text-4xl md:text-6xl font-extrabold tracking-tight` | Max about 8 words. `max-w-3xl` |
| Article H1 | `text-3xl md:text-5xl font-bold tracking-tight` | |
| H2 (section) | `text-2xl md:text-4xl font-bold tracking-tight` | One per section |
| H3 (card, step, FAQ question) | `text-lg md:text-xl font-semibold` | |
| Lead (under H1/H2) | `text-lg md:text-xl text-ink-muted` | One or two sentences. `max-w-2xl` |
| Body | `text-lg` | 18px at every width, phones included, for a 35–65 audience |
| Article body | `text-lg` | `max-w-prose` (about 65 characters per line) |
| Small / caption | `text-sm text-ink-muted` | Disclosures, "illustrative" labels, helper text |
| Eyebrow | `text-sm font-semibold text-teal-strong` | Optional short label above an H2, sentence case. Use sparingly |
| Button / label | `text-base font-semibold` | |

**Rules**

- Sentence case everywhere, buttons and eyebrows included ("Compare my options," not "COMPARE MY OPTIONS"). No all caps anywhere.
- Never make supporting text both smaller *and* lighter. If people need it to act, it's body size in `ink`.
- Keep heading levels in order: one H1 per page, H2 per section, H3 inside sections. Never pick a heading level for its size.
- Left-align body text. Center only short hero or CTA blocks (three lines or fewer).

---

## 3. Layout and spacing

Use Tailwind's default spacing scale (4px steps). Don't use arbitrary values like `p-[13px]`.

| Thing | Classes |
|---|---|
| Page width | `<Container>` = `mx-auto max-w-6xl px-5 md:px-8` |
| Section padding | `py-16 md:py-24` |
| Heading → content | `mt-4` after a lead, `mt-10 md:mt-12` before a grid or component |
| Card padding | `p-6 md:p-8` |
| Grid gaps | `gap-6 md:gap-8` |
| Stacked form fields | `space-y-4` |
| Paragraph rhythm (article) | `space-y-5` inside each section, `mt-12` between sections |

**Breakpoints:** design at **375px** and **1440px** (the brief's check sizes). Only use `md:` (768) and `lg:` (1024). Anything more is complexity you won't have time to test.

**Common patterns**

- Hero: one column on mobile. On `lg:` it becomes `grid lg:grid-cols-2 lg:items-center gap-12`, with copy on the left and the visual or form on the right. On `/compare` the **age picker comes before the illustration** on mobile.
- Three-up (steps, resources, why compare): `grid gap-6 md:grid-cols-3`.
- Explorer: `grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]`, with options on the left and the explanation on the right. Stacked on mobile.
- Article: `lg:grid lg:grid-cols-[16rem_1fr] lg:gap-12`, sidebar first.
- Cards stack or wrap on mobile. No horizontal swipe-only carousels.

---

## 4. Shape and depth

| Thing | Class |
|---|---|
| Cards, panels, form card, callouts | `rounded-card` (1rem) |
| Inputs | `rounded-xl` |
| Buttons, badges, chips | `rounded-full` (pill shapes read as friendly and tappable) |
| Card edge | `border border-line` |
| Resting elevation | `shadow-sm`, only on the funnel card and interactive cards |
| Hover elevation | `hover:shadow-md`, only on clickable cards |

Flat by default. Shadows mean "this floats or is interactive," so don't add them to static content.

---

## 5. Components

Every interactive component needs these states: **default · hover · focus-visible · active/selected or expanded · disabled** (where relevant). The brief reviews hover, focus, selected and expanded explicitly.

**Global focus:** `outline-2 outline-offset-2 outline-teal-strong` on `:focus-visible` (already in `globals.css`). Don't remove it on any component. If a component sits on the dark `ink` band, override with `focus-visible:outline-teal`.

### Button (`ui/Button.tsx`)

| Variant | Classes |
|---|---|
| Base (all) | `inline-flex items-center justify-center gap-2 rounded-full px-6 min-h-12 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60` |
| Primary | `bg-teal-strong text-white hover:bg-ink` |
| Secondary | `border-2 border-ink text-ink bg-transparent hover:bg-ink hover:text-white` |
| On dark band | `bg-cream text-ink hover:bg-teal-soft` |
| Text link button ("Change") | `font-semibold text-teal-strong underline underline-offset-4 hover:text-ink` |

- `min-h-12` (48px) keeps tap targets comfortably above the 44px minimum.
- Full width on mobile inside the funnel: `w-full md:w-auto`.
- Loading: keep the button the same size, swap the label ("Finding options…"), set `disabled` and `aria-busy="true"`. An optional spinner goes in `aria-hidden`.
- Only **one primary button per view**. The CTA label is always **"Compare my options"**, in sentence case.
- White on `teal-strong` is 5.5:1. Never white text on `teal` or anything lighter.

### Links

Inline links: `font-medium text-teal-strong underline underline-offset-4 hover:text-ink`. Always underlined in body text. Color alone isn't enough.

### Radio card (age picker, coverage explorer)

Pattern: a hidden native radio (`sr-only peer`) inside a `<label>`, so the whole card is clickable and arrow keys work.

| State | Classes on the card |
|---|---|
| Default | `flex min-h-14 items-center justify-between rounded-card border-2 border-line bg-surface px-5 font-semibold cursor-pointer` |
| Hover | `hover:border-ink-muted` |
| Focus | `peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal-strong` |
| Selected | `peer-checked:border-teal-strong peer-checked:bg-teal-soft`, plus a check icon that appears (`peer-checked:block`, hidden by default) |

- Age grid: `grid grid-cols-2 gap-3 md:grid-cols-3`. Six bands fit as 3×2 on mobile with comfortable targets.
- Wrap the group in `<fieldset>` with a visible `<legend>` ("How old are you?").

### Text input (ZIP)

| Part | Classes |
|---|---|
| Label | `block text-base font-semibold mb-2` (always visible, never placeholder-only) |
| Input | `w-full min-h-12 rounded-xl border-2 border-ink-muted bg-surface px-4 text-lg tracking-widest` |
| Hover | `hover:border-ink` |
| Focus | Global ring + `focus-visible:border-teal-strong` |
| Error | `aria-invalid:border-error` |
| Helper text | `text-sm text-ink-muted mt-2` (e.g., "5 digits, like 02134") |
| Error message | `text-sm font-medium text-error mt-2` with a small icon, linked by `aria-describedby` |

### Step indicator (funnel)

`text-sm font-semibold text-ink-muted` → "Step 2 of 2". Optional two-segment bar: `h-1.5 rounded-full bg-line` with the filled part `bg-teal-strong`.

### Funnel states

| State | Treatment |
|---|---|
| Submitting | Button loading state. Inputs stay visible but read-only |
| Success | Replace the form inside the same card: check icon in a `bg-teal-soft` circle, H3 "You're all set," then the next steps. No confetti |
| Not-an-insurer note | Under the submit and Try again buttons, always: shield icon + "Free to use. ClearLane is a comparison and referral service, not an insurer." (`mt-3 flex gap-2 text-sm text-ink-muted`, icon `text-teal-strong`) |
| Error | Keep the form and answers. Above the button: `rounded-xl border-2 border-error bg-surface p-4` with an icon, a plain message ("We couldn't reach our comparison service. Your answers are saved.") and a "Try again" primary button. `role="alert"` |

### Coverage explorer

Each of the three options is explained by situations first, then the term.

- Layout: `grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]`, options left (taller radio cards with a one-line description), explanation panel right in `aria-live="polite"`. Stacked on mobile.
- Panel order, always: Badge "Educational example, not a policy" → H3 → **"Helps in situations like"** (check icon, `text-teal-strong`) → **"Doesn't help if"** (x icon, `text-ink-muted`) → **"What the terms mean"** (a short `<dl>`).
- Situations are everyday and specific, one line each: "You slide on ice into a guardrail," "A tree branch falls on your parked car."
- Options: Liability only · Liability + collision · Liability + collision + comprehensive (often called "full coverage"). No prices or "best for most people."

### Card / ArticleCard

- Base: `rounded-card border border-line bg-surface p-6`
- Linked card: make the whole card the link (`<a>` wrapping content, or a stretched link). Add `hover:shadow-md hover:border-ink-muted transition` and the focus ring.
- Preview card: no link, no hover lift, plus a **Preview** badge.

### Badge

`inline-flex rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal-strong`

Used for: "Preview," "Illustrative example," "Educational example."

### FAQ (`<details>`)

| Part | Classes |
|---|---|
| Wrapper | `divide-y divide-line border-y border-line` |
| `details` | `group` |
| `summary` | `flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold hover:text-teal-strong [&::-webkit-details-marker]:hidden` |
| Chevron | `shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none` |
| Answer | `pb-5 text-lg text-ink-muted max-w-prose` |

### Navigation (SiteHeader)

- Bar: `border-b border-line bg-cream/95 backdrop-blur`, optionally `sticky top-0 z-40`.
- Desktop links: `font-medium text-ink hover:text-teal-strong`. Current page: `aria-current="page"` styled with `aria-[current=page]:text-teal-strong aria-[current=page]:underline underline-offset-8`.
- Header CTA: Primary button, a smaller size (`min-h-10 px-5 text-sm`) is fine here.
- Mobile menu: full-width panel under the bar, links stacked at `text-lg py-3`, CTA full width at the bottom. The menu button is a 44px square with a visible label or `aria-label`.

### Step list

Number badge `flex size-10 items-center justify-center rounded-full bg-teal-soft font-bold text-teal-strong` + H3 + one sentence in `text-lg text-ink-muted`. Three steps, never more.

### Callout (article)

`flex gap-4 rounded-card bg-teal-soft p-6` with an info icon in `text-teal-strong`. A heading, then two or three sentences. One per article.

### Table (article)

- `<table>` with `<caption class="text-left text-sm text-ink-muted mb-2">`
- `th`: `text-left text-sm font-semibold bg-teal-soft px-4 py-3`
- `td`: `px-4 py-3 align-top border-t border-line`
- Mobile: wrap in `overflow-x-auto` with `tabindex="0"`, `role="region"` and `aria-label`, so it scrolls instead of squishing.

### Footer

`bg-ink text-cream`, `text-sm`. Disclosure text uses `text-on-ink-muted` (already in `@theme`). The disclosure is always present and readable (not under 14px, not low contrast).

---

## 6. Illustration and icons

- **Style:** simple flat or line illustrations with a 2px stroke in `ink`, `teal` accents and `teal-soft` fills. Rounded line caps.
- **One style only.** No mixing painted people, photo collage, 3D objects and photos on one page.
- **Motif:** lanes and roads. Two parallel lines, a gentle curve, a car seen from above, a signpost. It ties visuals to the "ClearLane" name without a mascot.
- **Icons:** one set, used consistently (e.g., Lucide, ISC license). `size-5` inline, `size-6` in cards, `aria-hidden="true"` when decorative.
- **No:** stock photos of smiling families, fake app screenshots, carrier logos, star ratings, badges that imply endorsements.
- **Images:** always set `width`/`height` (or `next/image`) so nothing shifts. Decorative SVGs use `alt=""` or `aria-hidden`.

---

## 7. What we took from Lemonade and Corgi

Both sites were audited on November 23, 2026 (see the "Corgi and Lemonade audit for ClearLane" doc). One idea from each, and none of their colors, mascots or phrasing. Both ideas live inside features the brief already asks for; neither adds a new feature.

**Idea 1, from Lemonade: explain coverage as everyday situations.** Lemonade lists coverage as "If you're in a car crash," "If your car is stolen." ClearLane's coverage explorer leads every option with the situations it does and doesn't help with, then names and defines the term. Drivers 35–65 can picture a hailstorm; they can't picture "comprehensive."

**Idea 2, from Corgi: a warm ground, one accent for action, and plain "not the insurer" language.** Corgi uses a warm off-white page, saves orange for its main button, and says it acts "not as the insurer." ClearLane uses `cream`, reserves `teal-strong` for actions, and puts "ClearLane is a comparison and referral service, not an insurer" directly under the funnel button. Saying what you *aren't*, where people decide, earns trust faster than big claims.

### What we leave behind

| Seen on | Pattern | Why not |
|---|---|---|
| Both | White text on a bright button (Lemonade 3.8:1, Corgi 3.1:1) | Fails 4.5:1 |
| Lemonade | All-caps button labels | Harder to read, feels like shouting |
| Lemonade | "If you're a bad driver, our car insurance isn't for you" | Makes a cautious shopper judge themselves |
| Corgi | "Financial and Risk Infrastructure for Business." | Describes the company, not what the visitor can do |
| Both | Ratings, tweets, customer counts, funding, press logos | Proof ClearLane can't honestly claim |
| Lemonade | "As low as $30/mo" with no context | Unexplained number |
| Corgi | Name, company, phone and email before any coverage question | Contact-first friction; ClearLane asks for age and ZIP only |
| Corgi | Painted people, collage, 3D objects and photos together | Fragmented identity |
| Lemonade | Swipe-only cards, a very long page of side offers | Hidden content and detours |
| Corgi | Cookie banner covering about a third of the phone screen | Covers the hero; if ever needed, use a slim bar |

---

## 8. Voice and copy

**Sound like:** a knowledgeable friend explaining something over coffee. Calm, short, specific.

| Do | Don't |
|---|---|
| "Compare my options" | "Get my FREE quote now!!" |
| "See what's available for your age and ZIP" | "Save up to $950" (or any number you can't back up) |
| "Free to use. No obligation." | "Trusted by 500K+ drivers" |
| "ClearLane is a comparison and referral service, not an insurer." | Implying ClearLane sells or issues policies |
| "Insurers weigh these factors differently." | "Guaranteed lowest rate" |
| "Deductible: what you pay before coverage kicks in" | Unexplained jargon |
| "Illustrative example, not a quote" next to any rate | Unlabeled example prices |
| "If someone hits you and drives off" → then "Uninsured motorist coverage" | Leading with the policy term |
| "Compare auto insurance options for your age" (matches the ad) | Headlines that judge the reader |
| "We only ask for your age range and ZIP code to start." | Asking for name, phone or email up front |

**Rules**

- Second person ("you," "your"). Active voice. Sentences under about 20 words.
- Headlines say what the person gets or does, not what ClearLane is proud of, and never make the reader judge themselves.
- Respectful, not cute: no slang, emoji, exclamation marks in UI, or jokes at the reader's expense.
- Every section answers one question the visitor actually has.
- Error messages say what happened, that answers are safe, and what to do next. Never blame the user ("Invalid input"). Say "Enter a 5-digit ZIP code, like 02134."
- No invented customer counts, partners, testimonials, ratings, savings or author credentials. Byline: "ClearLane Editorial Team."
- The brand is fictional. Say so once, in the footer.

---

## 9. Accessibility baseline

- All text meets 4.5:1 and UI boundaries meet 3:1 (see section 1).
- Tap targets are at least 44×44px (`min-h-11` minimum; buttons use `min-h-12`).
- Body text 18px at every width.
- A visible focus ring on everything focusable. Tab order follows reading order.
- State is never communicated by color alone.
- Respect reduced motion: add `motion-reduce:transition-none` to anything that animates. Keep transitions short (`duration-150` to `duration-200`) and only on color, shadow and transform.
- Every input has a visible `<label>`. Errors are linked with `aria-describedby` and announced.
- Use landmarks: `header`, `nav`, `main`, `footer`, and `article`/`aside` on the blog.
- A "Skip to main content" link is the first Tab stop on every page (root layout).

---

## 10. Quick checklist before committing a component

- [ ] Only uses tokens and default Tailwind scale values
- [ ] Hover, focus-visible and selected/expanded states visible
- [ ] Works at 375px with no horizontal scroll
- [ ] Keyboard operable, focus ring visible
- [ ] Copy follows section 8 (no unbacked numbers, sentence case, situations before terms)
- [ ] Nothing from "What we leave behind" (section 7)
- [ ] Reused an existing component instead of copying classes

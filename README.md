# Small Joys Calendar

An Astro-powered, fully static website for GitHub Pages that presents a 12-week "small joys" calendar as a calm, mobile-first set of weekly and category pages.

## Stack

- Astro
- Static HTML output
- GitHub Pages via GitHub Actions
- Editable content in JSON
- Local licensed photography with placeholder SVG fallbacks

## Local run

1. Install Node.js 20 or newer.
2. Install dependencies:

```bash
npm install
```

3. Start the local dev server:

```bash
npm run dev
```

4. Build a production version:

```bash
npm run build
```

## Content editing

The main content file is:

- `src/data/calendar.json`

Image assignments are kept in:

- `src/data/activity-images.json`

This file contains:

- site copy
- profile summary
- design logic
- 12 weeks
- all activity cards
- all category groupings
- water-based rankings
- paired outing ideas

The site layout does not need to be edited for normal content updates.

### Replace an activity

1. Open `src/data/calendar.json`
2. Find the activity inside the `activities` array
3. Update fields such as:
   - `activityName`
   - `venueName`
   - `bookingLink`
4. If the activity is used by a week or category, it will update everywhere automatically

### Add a 13th week

1. Add a new activity or reuse an existing activity ID in the `activities` array
2. Add a new week object at the end of the `weeks` array with:
   - a unique `id`
   - a unique `slug`
   - `anchorActivityId`
   - `secondActivityId`
3. The new week page will be generated automatically at `/weeks/your-slug/`
4. The home page jump links and week arc will update automatically

Example pattern:

```json
{
  "id": "week-13",
  "slug": "jun-01-jun-07",
  "label": "Week 13",
  "dateRange": "Jun 1 to Jun 7",
  "shortDateRange": "1 to 7 Jun",
  "emotionalTheme": "A gentler final stretch.",
  "anchorLabel": "Midweek anchor",
  "anchorActivityId": "your-anchor-id",
  "secondLabel": "Weekend option",
  "secondActivityId": "your-second-id",
  "summary": "A short note for the week preview."
}
```

### Replace an image

Placeholder files are mapped in:

- `src/data/image-manifest.json`

Current image assignments live in:

- `src/data/activity-images.json`

Downloaded image source records live in:

- `src/data/image-credits.json`

To swap a placeholder for a real image:

1. Add the new image into:
   - `public/images/venues/`
2. Update the activity image path in `src/data/activity-images.json`

Example:

```json
"blickling-estate": {
  "src": "/images/venues/blickling-estate-morning.jpg",
  "alt": "Morning light across the parkland at Blickling Estate."
}
```

3. Keep the alt text factual and scene-based
4. If a real image is missing, the placeholder will continue to work

### Replace a source link

Each activity has:

- `bookingLink`
- `sourceName`

Update those two fields in `src/data/calendar.json` and the new link will appear on all relevant pages.

## GitHub Pages publishing

This repo is configured as a **project site** for:

- `https://goodtransformer.github.io/SmallJoysCalendar/`

The base path is set in:

- `astro.config.mjs`

Current defaults:

- `site`: `https://goodtransformer.github.io`
- `base`: `/SmallJoysCalendar`

If the repo name changes, update `repoName` in `astro.config.mjs`.

## Deploy workflow

The GitHub Pages workflow lives at:

- `.github/workflows/deploy.yml`

It will:

1. install dependencies
2. build the Astro site
3. upload the `dist/` output
4. deploy to GitHub Pages

## GitHub settings checklist

In the GitHub repository:

1. Open `Settings`
2. Open `Pages`
3. Set `Source` to `GitHub Actions`

No extra hosting or database is required.

## Notes on the sample content

- The calendar content is populated from the supplied research PDF
- Some workshop and event entries are date-specific for spring 2026
- Those date-sensitive items should be refreshed when the calendar is rolled forward
- One source entry from the research PDF points indirectly rather than to a clean venue page:
  - `wildebeest-lunch`
  - replace its `bookingLink` with the direct official venue page if you want cleaner source handling

## Project structure

```text
.
├── .github/workflows/
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── package.json
└── README.md
```

## Major decisions

- One master `activities` collection is reused by weeks and categories to avoid duplicated editing.
- Licensed local stock photography is stored in the repo so GitHub Pages stays self-contained and stable.
- Placeholder SVGs remain available as a fallback when a specific image has not been chosen yet.
- Filtering is lightweight client-side JavaScript only on the categories page, so the rest of the site stays simple and fast.
- The layout is mobile-first and print-friendly.

# Quickstart Validation Guide: Research Project Website

**Feature**: Electron Microscopy Surface Defect Research Website
**Date**: 2026-07-06

---

## Prerequisites

- Node.js >= 18 (Eleventy 3.x minimum)
- pnpm >= 11 (per `package.json` devEngines)

## Setup

```bash
pnpm install
```

## Development Server

```bash
npx @11ty/eleventy --serve
```

Serves the site at `http://localhost:8080/` with live reload. Input from `src/`, output to `_site/`.

## Production Build

```bash
npx @11ty/eleventy
```

Outputs static files to `_site/`. To preview the production build:

```bash
npx serve _site
```

## GitHub Pages Build (with pathPrefix)

```bash
npx @11ty/eleventy --pathprefix=/demo-project-site/
```

Use this when deploying to a project page (`<user>.github.io/demo-project-site/`). For user/org pages or custom domains, omit `--pathprefix`.

---

## Validation Scenarios

### VS-1: Navigation (FR-001, FR-003, SC-001)

1. Open `http://localhost:8080/` in a browser.
2. Verify the left-side navigation bar is visible with 4 links: "About", "The Team", "Outputs", "Work with Us".
3. Click each link — verify it navigates to the correct page in a single click.
4. Verify the current page link has `aria-current="page"` (visible active state).

### VS-2: About Page Content (FR-004, SC-002)

1. Navigate to `/about/`.
2. Read the page — verify it describes the electron microscopy method, its applications, and limitations.
3. After 5 minutes of reading, verify you can explain the method and name at least 3 engineering applications.

### VS-3: Team Page (FR-005)

1. Navigate to `/team/`.
2. Verify each team member shows: name, role, and biography.
3. Verify photographs are displayed where provided.
4. Verify entries without photos display gracefully (no broken image icon).
5. Inspect a team photo `<img>` — verify it has descriptive `alt` text.

### VS-4: Outputs Page (FR-006, FR-007, SC-004)

1. Navigate to `/outputs/`.
2. Verify outputs are grouped under headings: "Publications", "Datasets", "Software".
3. Click an output link — verify it opens the full external resource.
4. If any category has no entries, verify it shows an "empty state" message (not a blank section).

### VS-5: Work with Us Page (FR-008, FR-009, SC-003)

1. Navigate to `/work-with-us/`.
2. Verify the page explains the engagement process for commercial companies.
3. Verify a project email address is displayed as visible, copyable text.
4. Click the email link — verify it opens a mailto compose window (or, if no email client, the text is still visible and copyable).
5. Verify there are no form fields or data-collection inputs on the page.
6. Within 3 minutes of arriving on the site, verify you can identify the engagement process and contact method.

### VS-6: Responsive Layout (FR-010, SC-005)

1. Open the site on a desktop browser (width >= 1024px) — verify left nav and content render side by side.
2. Resize to tablet width (768px) — verify layout adapts, nav remains usable.
3. Resize to mobile width (375px) — verify nav remains accessible and content reflows to single column.
4. Verify no horizontal scrolling is required on mobile.

### VS-7: Accessibility (FR-013, SC-007)

1. Press `Tab` from page load — verify focus moves to the skip link first, then through the nav items, then into the content.
2. Verify a visible focus outline is present on all links.
3. Verify `<html lang="en">` is set in the page source.
4. Verify each page has a unique `<title>`.
5. Verify the left nav is wrapped in `<nav aria-label="Main navigation">`.
6. Verify main content is wrapped in `<main id="main-content">`.
7. Run a browser accessibility audit (e.g., axe DevTools extension) on each page — verify no WCAG 2.1 AA violations.

### VS-8: Brand Guidelines

1. Inspect heading elements — verify they use the Impact font family (with fallbacks).
2. Inspect body text — verify it uses the Georgia font family (with fallbacks).
3. Verify King's Red #E2231A is used as the primary colour (active nav, headings, links, accents).
4. Verify colour contrast: red text on white backgrounds, white text on red backgrounds — both should pass AA contrast (4.5:1 minimum).

### VS-9: KCL Identification (FR-012)

1. Verify "King's College London" appears on every page (in the header/footer/nav area).

### VS-10: Home Page (FR-002)

1. Navigate to `/`.
2. Verify the page introduces the project at a glance.
3. Verify links to all four main pages are available from the home page.

---

## Optional CI Accessibility Testing

If `pa11y-ci` or `@axe-core/cli` is approved as a devDependency (per AGENTS.md — ask first):

```bash
# Build and serve
npx @11ty/eleventy && npx serve _site -l 8080 &

# Run pa11y-ci against all pages
npx pa11y-ci
```

This tests all pages against WCAG 2.1 AA criteria and exits with a non-zero code on violations.

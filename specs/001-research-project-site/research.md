# Phase 0 Research: Eleventy 3.x, GitHub Pages, WCAG 2.1 AA

**Feature**: Electron Microscopy Surface Defect Research Website
**Date**: 2026-07-06

---

## 1. Eleventy 3.x Configuration

### Decision
Expand `eleventy.config.js` to use both the callback function shape (for full Configuration API access: passthrough copy, plugins) and the named export `config` object (for directory settings). Set Nunjucks as the markdown and HTML template engine.

### Rationale
The current config (`export const config = { dir: { input: "src" } }`) only supports static options. The callback function shape gives access to `addPassthroughCopy()`, `addPlugin()`, `addFilter()`, etc. — all needed for modular layouts, asset copying, and pathPrefix handling. Nunjucks is the most feature-complete Eleventy template engine, supporting `{% include %}`, `{% import %}`, and macros for modular component re-use.

### Alternatives considered
- **Liquid**: Simpler but lacks macros and imports; less suitable for modular components.
- **11ty.js templates**: JavaScript-based, but more verbose for HTML templates and less familiar for content-heavy pages.
- **Keeping only `export const config`**: Insufficient — no access to Configuration API for passthrough copy or plugins.

### Key config details
- `dir.input`: `"src"` (already set)
- `dir.includes`: `"_includes"` (default, resolves to `src/_includes/`)
- `dir.data`: `"_data"` (default, resolves to `src/_data/`)
- `dir.output`: `"_site"` (default, at project root)
- `markdownTemplateEngine`: `"njk"` (process Markdown through Nunjucks)
- `htmlTemplateEngine`: `"njk"`
- `pathPrefix`: `"/"` by default; set to `"/demo-project-site/"` for GitHub project pages via CLI flag `--pathprefix=/demo-project-site/`

---

## 2. Modular Layouts and Includes

### Decision
Use Nunjucks with `{% include %}` for layout partials (nav, footer) and macros for parameterized reusable components (team cards, output items). Organize `_includes/` with `layouts/` and `components/` subdirectories.

### Rationale
`{% include %}` shares the current context automatically — ideal for nav, which needs `page.url` for active state. Macros are better for parameterized components (team cards iterated over team members) but are synchronous-only (cannot use async filters inside). This split gives the best of both patterns.

### Alternatives considered
- **All macros**: Loses async support and context sharing; awkward for layout-level includes.
- **All includes**: No parameter passing for reusable cards; would require `{% set %}` workarounds.
- **Web Components/JS components**: Adds complexity, no SSR, unnecessary for a static site.

### Key patterns
- **Layout chaining**: Page frontmatter `layout: layouts/base.njk` → `base.njk` wraps content as `{{ content | safe }}`
- **Active nav state**: Compare `page.url` against each nav item URL; use `aria-current="page"` (WCAG-correct, not just a CSS class)
- **Asset URLs**: Use `{{ "/assets/css/styles.css" | url }}` filter to prepend pathPrefix
- **Passthrough copy**: `eleventyConfig.addPassthroughCopy("src/assets")` for static assets

---

## 3. GitHub Pages Deployment

### Decision
Deploy via GitHub Actions workflow using the official `actions/upload-pages-artifact` + `actions/deploy-pages` pattern. Use `--pathprefix` CLI flag at build time for project pages. Enable "GitHub Actions" as the Pages source in repo settings.

### Rationale
GitHub Actions is the recommended deployment method for GitHub Pages (the legacy "deploy from branch" approach is deprecated). The two-job pattern (build → deploy) is the standard approach from the `eleventy-base-blog` reference. Using the CLI `--pathprefix` flag avoids hardcoding the pathPrefix in the config, keeping the config portable for local development (where pathPrefix is `/`).

### Alternatives considered
- **Hardcode pathPrefix in config**: Breaks local development (links would have `/demo-project-site/` prefix locally).
- **Deploy from `gh-pages` branch**: Legacy approach, deprecated by GitHub in favour of Actions.
- **User/org pages (`username.github.io` repo)**: No pathPrefix needed but requires a dedicated repo name; not the current setup.

### Key deployment details
- Build command: `npx @11ty/eleventy --pathprefix=/demo-project-site/`
- Artifact upload from `_site/` directory
- Permissions: `pages: write`, `id-token: write` for deploy job; `contents: write` for build
- Concurrency group to prevent parallel deploy conflicts
- pnpm cache + Eleventy `.cache` cache for faster CI

---

## 4. WCAG 2.1 AA Conformance

### Decision
Build accessibility into the site structure from the start (semantic HTML, skip link, aria-current, alt text, focus visible) and validate with automated tools (pa11y-ci or @axe-core/cli) as a CI step, plus manual review.

### Rationale
WCAG 2.1 AA is a legal requirement for UK public-sector sites under the 2018 regulations (confirmed in spec clarification). Automated tools catch ~57% of issues; manual review is required for the rest. Building correctly from the start (semantic landmarks, skip link, proper alt text, contrast-safe colours) prevents rework.

### Alternatives considered
- **GOV.UK Design System (`@x-govuk/govuk-eleventy-plugin`)**: Provides an accessible baseline aligned with UK public-sector standards, but would override the custom brand guidelines (Impact, Georgia, King's Red). Not suitable when custom branding is required.
- **Lighthouse CI only**: Accessibility audit is a subset of WCAG, not a complete conformance check. Better as regression trending than sign-off.
- **Manual-only testing**: Insufficient for CI; errors can regress without detection.

### Key accessibility details
- **Skip link**: First focusable element, links to `#main-content` (bypasses persistent left nav — WCAG 2.4.1)
- **Semantic landmarks**: `<nav aria-label="Main navigation">`, `<main id="main-content">`, `<header>`, `<footer>`
- **Active nav state**: `aria-current="page"` (not just CSS class — screen readers announce it)
- **Image alt text**: Team photos get descriptive alt; missing photos degrade to a styled placeholder with `alt=""` or no image element
- **Focus visible**: Visible focus outline on all interactive elements; do not remove `:focus` outline
- **Colour contrast**: King's Red #E2231A on white = 4.68:1 (passes AA, marginal). Use for headings/links on white. White on #E2231A = 4.68:1 (passes for active nav/buttons). Avoid red text on grey backgrounds (fails AA for normal text).
- **Font fallbacks**: Impact → `Impact, "Haettenschweiler", "Arial Narrow Bold", "Oswald", sans-serif` (large headings only). Georgia → `Georgia, "Times New Roman", Times, serif` (body, >= 16px, line-height 1.5).
- **Viewport**: Never disable user zoom (`user-scalable=no` forbidden — WCAG 1.4.4)
- **Page titles**: Unique `<title>` per page via frontmatter `title` property

---

## 5. Brand Guidelines Implementation

### Decision
Implement brand guidelines via CSS custom properties (CSS variables) in a single `styles.css` file. No web font downloads (both Impact and Georgia are system/web-safe fonts).

### Rationale
CSS custom properties centralise brand tokens for easy maintenance and ensure consistent application. System fonts have zero download cost, supporting the 3-second interactivity goal (SC-006). Fallback stacks ensure graceful degradation on platforms lacking the primary font (especially Linux, which may not have Impact).

### Key brand tokens
```css
:root {
  --colour-primary: #E2231A;        /* King's Red */
  --colour-primary-hover: #C01F16;  /* Darker for hover states */
  --colour-text: #1a1a1a;           /* Near-black for body text (high contrast) */
  --colour-background: #FFFFFF;
  --colour-surface: #F8F8F8;        /* Light grey for cards/sections */
  --font-heading: Impact, "Haettenschweiler", "Arial Narrow Bold", "Osward", sans-serif;
  --font-body: Georgia, "Times New Roman", Times, serif;
}
```

### Contrast notes
- `#E2231A` text on `#FFFFFF`: 4.68:1 — passes AA (marginal, use for headings/links not body text)
- `#E2231A` text on `#F8F8F8` or darker greys: FAILS AA for normal text — use only for large text
- `#FFFFFF` text on `#E2231A`: 4.68:1 — passes AA (use for active nav, buttons)
- Body text uses `#1a1a1a` on white for maximum readability (contrast ratio ~16:1)

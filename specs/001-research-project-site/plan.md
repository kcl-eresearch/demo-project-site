# Implementation Plan: Electron Microscopy Surface Defect Research Website

**Branch**: `001-research-project-site` | **Date**: 2026-07-06 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-research-project-site/spec.md`

## Summary

Build a static, informational academic website for a King's College London research project (electron microscopy for surface defect identification). The site has five pages (home, about, the team, outputs, work with us) with a persistent left-side navigation bar. Built with Eleventy 3.x (already installed), deployed to GitHub Pages, no backend. Modular Nunjucks layouts and components for re-use. Brand: Impact headings, Georgia body, King's Red #E2231A primary colour. WCAG 2.1 AA conformance target.

## Technical Context

**Language/Version**: JavaScript (ESM), Node.js >= 18 (Eleventy 3.x minimum). Project `package.json` has `"type": "module"`.

**Primary Dependencies**: `@11ty/eleventy` ^3.1.6 (installed). Nunjucks as the primary template engine (bundled with Eleventy). No additional runtime dependencies required.

**Storage**: N/A — static site, no backend, no database. All content stored as files in the repository (Markdown pages, JSON data files, static assets).

**Testing**: Manual validation against acceptance scenarios (see [quickstart.md](quickstart.md)). Optional CI accessibility testing with `pa11y-ci` or `@axe-core/cli` (devDependencies — requires user approval before adding per AGENTS.md). No automated test framework needed for MVP.

**Target Platform**: GitHub Pages (static hosting). Deployed via GitHub Actions workflow. Supports both project pages (`<user>.github.io/<repo>/` with pathPrefix) and user/org pages (no pathPrefix).

**Project Type**: Static website (static site generator).

**Performance Goals**: Site becomes interactive within 3 seconds on a standard broadband connection (SC-006). No web font downloads (system fonts only: Impact, Georgia) — zero font loading cost.

**Constraints**:
- WCAG 2.1 level AA conformance across all pages (FR-013, SC-007)
- Responsive: desktop, tablet, and mobile (FR-010, SC-005)
- No backend, no personal data collection (FR-009)
- No additional dependencies without user approval (AGENTS.md)
- Left-side navigation on every page with active state (FR-001, FR-003)
- Brand: Impact font for headers, Georgia for body, King's Red #E2231A primary colour

**Scale/Scope**: 5 pages (home, about, team, outputs, work-with-us), ~5-10 team members, ~10-20 research outputs. Small enough to list directly without search, filtering, or pagination.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project's `.specify/memory/constitution.md` is an unfilled template with placeholder text (`[PRINCIPLE_1_NAME]`, `[PRINCIPLE_1_DESCRIPTION]`, etc.). No project-specific principles, governance rules, or constraints have been defined.

**Gate result**: PASS — no active constitution principles to evaluate against. No violations possible. The AGENTS.md file provides practical guidance (favour simplicity, JSDoc on new functions, ask before adding dependencies, Conventional Commits, signed commits) which is followed throughout this plan.

## Project Structure

### Documentation (this feature)

```text
specs/001-research-project-site/
├── plan.md              # This file
├── research.md          # Phase 0 output — research findings and decisions
├── data-model.md        # Phase 1 output — entities, fields, validation
├── quickstart.md        # Phase 1 output — validation/run guide
├── contracts/           # Phase 1 output — UI and data contracts
│   ├── ui-contracts.md  # Page-level UI contracts
│   └── data-contracts.md # JSON data file schemas
└── tasks.md             # Phase 2 output (created by /speckit.tasks — NOT this command)
```

### Source Code (repository root)

```text
src/
├── _includes/
│   ├── layouts/
│   │   └── base.njk          # Base HTML shell: <head>, left nav, <main>, footer
│   └── components/
│       ├── nav.njk           # Left navigation with active state (aria-current)
│       ├── team-card.njk     # Reusable team member card (photo, name, role, bio)
│       ├── output-list.njk   # Outputs grouped by type (publications, datasets, software)
│       └── contact-link.njk # Mailto link with visible text fallback
├── _data/
│   ├── site.json             # Site metadata: name, institution, contact email, nav items
│   ├── team.json             # Team members array (name, role, bio, photo)
│   └── outputs.json          # Research outputs array (title, type, description, url)
├── assets/
│   ├── css/
│   │   └── styles.css        # Brand styles: Impact headers, Georgia body, King's Red
│   └── images/
│       └── team/             # Team member photographs
├── index.md                 # Home/landing page
├── about.md                  # About — detailed method description
├── team.md                   # The Team — renders from team.json data
├── outputs.md                # Outputs — renders from outputs.json data
└── work-with-us.md           # Work with Us — engagement process + contact link
```

**Structure Decision**: Single-project static site following Eleventy conventions. `_includes/` split into `layouts/` (page-level wrappers) and `components/` (reusable partials) for modularity. Data-driven content (team members, outputs) stored in `_data/` JSON files so content updates don't require template changes. Static assets in `assets/` with passthrough copy. Nunjucks (`.njk`) as the template engine for layouts and components; Markdown (`.md`) for page content with Nunjucks as the markdown template engine.

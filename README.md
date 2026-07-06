# Electron Microscopy Surface Defect Research Website

An academic research website for the Electron Microscopy Surface Defect Research project at King's College London. Built with Eleventy 3.x and deployed to GitHub Pages.

## Features

- **Home page** — Project overview with links to all sections
- **About** — Detailed description of the electron microscopy method, its applications, and limitations
- **The Team** — Team member profiles with photos (graceful degradation when no photo available)
- **Outputs** — Research publications, datasets, and software grouped by type, each linking to the full resource
- **Work with Us** — Commercial engagement process with a mailto contact link
- **Left-side navigation** — Persistent sidebar on every page with active state highlighting
- **Responsive** — Desktop, tablet, and mobile layouts
- **Accessible** — WCAG 2.1 level AA conformance (skip link, keyboard navigation, semantic landmarks, focus visible, aria-current)

## Tech Stack

- **Static Site Generator**: [Eleventy](https://www.11ty.dev/) 3.x
- **Template Engine**: Nunjucks (`.njk`) for layouts and components; Markdown (`.md`) for content pages
- **Package Manager**: pnpm
- **Hosting**: GitHub Pages via GitHub Actions
- **Fonts**: Impact (headings), Georgia (body) — system fonts, no web font downloads
- **Brand Colour**: King's Red `#E2231A`

## Setup

### Prerequisites

- Node.js >= 18
- pnpm >= 11

### Install and Run

```bash
pnpm install
pnpm run serve    # Development server at http://localhost:8080/
pnpm run build    # Production build to _site/
```

### GitHub Pages Build

```bash
pnpm run build-ghpages    # Builds with --pathprefix=/demo-project-site/
```

## Project Structure

```text
src/
├── _includes/
│   ├── layouts/
│   │   └── base.njk           # Base HTML shell (skip link, nav, main, footer)
│   └── components/
│       ├── nav.njk            # Left navigation with aria-current active state
│       ├── team-card.njk      # Reusable team member card
│       ├── output-list.njk    # Outputs grouped by type (publications, datasets, software)
│       └── contact-link.njk  # Mailto link with visible text fallback
├── _data/
│   ├── site.json              # Site metadata (name, institution, contact email, nav items)
│   ├── team.json             # Team members (name, role, bio, photo)
│   └── outputs.json          # Research outputs (title, type, description, url)
├── assets/
│   ├── css/
│   │   └── styles.css         # Brand styles, responsive layout, component styles
│   └── images/
│       └── team/              # Team member photographs
├── index.md                  # Home page
├── about.md                   # About page
├── team.njk                   # Team page (data-driven)
├── outputs.njk                # Outputs page (data-driven)
└── work-with-us.md            # Work with Us page
```

## Data Model

Content is managed via JSON data files in `src/_data/`:

- **site.json** — Site-wide metadata: name, institution, contactEmail, navItems
- **team.json** — Array of team members: name, role, bio, photo (optional)
- **outputs.json** — Array of research outputs: title, type (publication/dataset/software), description, url, year (optional), authors (optional)

To add or update content, edit the relevant JSON file and rebuild.

## Deployment

The site deploys automatically to GitHub Pages when pushing to `main`. The GitHub Actions workflow (`.github/workflows/deploy-gh-pages.yml`) builds the site with the `--pathprefix=/demo-project-site/` flag and deploys the `_site/` directory.

To enable deployment:
1. Go to the repository Settings > Pages
2. Under "Build and deployment", set Source to "GitHub Actions"

## Brand Guidelines

- **Heading font**: Impact (with fallbacks: Haettenschweiler, Arial Narrow Bold, Oswald, sans-serif)
- **Body font**: Georgia (with fallbacks: Times New Roman, Times, serif)
- **Primary colour**: King's Red `#E2231A` (contrast ratio 4.68:1 on white — passes WCAG 2.1 AA)

## Accessibility

The site targets WCAG 2.1 level AA conformance per the UK Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018:

- Skip link to main content
- Semantic HTML landmarks (`<nav>`, `<main>`, `<header>`, `<footer>`)
- `aria-current="page"` on active navigation
- Keyboard-navigable with visible focus outlines
- Descriptive alt text on images (graceful degradation when no photo)
- Colour contrast meets AA standards (4.5:1 minimum)
- Responsive layout (no horizontal scroll on mobile)

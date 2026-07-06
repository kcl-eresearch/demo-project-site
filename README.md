# Electron Microscopy Surface Defect Research Website

An example academic research website demonstrating a static project site for the (fictional) Electron Microscopy Surface Defect Research project at King's College London. Built with Eleventy 3.x and deployed to GitHub Pages.

## Features

- **Home page** — Hero banner, project overview, and links to all sections
- **About** — Detailed description of the electron microscopy method, its applications, and limitations
- **The Team** — Team member profiles with photos (graceful degradation when no photo available)
- **Outputs** — Research publications, datasets, software, and industry outputs grouped by type, each linking to the full resource
- **News** — Recent updates including publications, partnerships, and events, listed in reverse chronological order
- **Collaborators** — Industry partners and academic collaborators with role descriptions
- **Work with Us** — Commercial engagement process with a mailto contact link
- **Example site banner** — Persistent banner on every page making clear this is an example static site with fictional people and outputs
- **Left-side navigation** — Persistent sidebar on every page with active state highlighting
- **King's brand theme** — Impact/Georgia typography, King's colour palette, hero and alternate section treatments
- **Responsive** — Desktop, tablet, and mobile layouts
- **Accessible** — WCAG 2.1 level AA conformance (skip link, keyboard navigation, semantic landmarks, focus visible, aria-current)

## Tech Stack

- **Static Site Generator**: [Eleventy](https://www.11ty.dev/) 3.x
- **Template Engine**: Liquid (`.liquid`) for layouts and components; Markdown (`.md`) for all content pages (processed with Liquid by default)
- **Package Manager**: pnpm
- **Hosting**: GitHub Pages via GitHub Actions
- **Fonts**: Impact (headings), Georgia (body) — system fonts, no web font downloads
- **Branding**: King's colour palette and recommended theme (see [specs/kings-branding.md](specs/kings-branding.md))

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
│   │   └── base.liquid        # Base HTML shell (skip link, nav, main, footer)
│   └── components/
│       ├── nav.liquid         # Left navigation with aria-current active state
│       ├── team-card.liquid   # Reusable team member card
│       ├── output-list.liquid    # Outputs grouped by type (publications, datasets, software, industry)
│       ├── contact-link.liquid   # Mailto link with visible text fallback
│       ├── news-list.liquid      # Reusable news item with date, title, and summary
│       └── collaborator-card.liquid # Reusable collaborator card with name, type, and description
├── _data/
│   ├── site.json              # Site metadata (name, institution, contact email, nav items)
│   ├── team.json              # Team members (name, role, bio, photo)
│   ├── outputs.json           # Research outputs (title, type, description, url)
│   ├── news.json              # News items (title, date, summary, link)
│   └── collaborators.json     # Collaborators (name, type, description, url)
├── assets/
│   ├── css/
│   │   └── styles.css         # Brand styles, responsive layout, component styles
│   └── images/
│       └── team/              # Team member photographs
├── index.md                   # Home page
├── about.md                   # About page
├── team.md                    # Team page (data-driven)
├── outputs.md                 # Outputs page (data-driven)
├── work-with-us.md            # Work with Us page
├── news.md                    # News page (data-driven)
└── collaborators.md           # Collaborators page (data-driven)
```

## Data Model

Content is managed via JSON data files in `src/_data/`:

- **site.json** — Site-wide metadata: name, institution, contactEmail, navItems
- **team.json** — Array of team members: name, role, bio, photo (optional)
- **outputs.json** — Array of research outputs: title, type (publication/dataset/software/industry), description, url, year (optional), authors (optional)
- **news.json** — Array of news items: title, date, summary, link (optional), linkText (optional)
- **collaborators.json** — Array of collaborators: name, type, description, url (optional)

To add or update content, edit the relevant JSON file and rebuild.

## Deployment

The site deploys automatically to GitHub Pages when pushing to `main`. The GitHub Actions workflow (`.github/workflows/deploy-gh-pages.yml`) builds the site with the `--pathprefix=/demo-project-site/` flag and deploys the `_site/` directory.

To enable deployment:
1. Go to the repository Settings > Pages
2. Under "Build and deployment", set Source to "GitHub Actions"

## Brand Guidelines

The site follows the King's Brand Essentials. The full colour palette, typography, and recommended theme are defined in `specs/kings-branding.md` (kept local; not in the repo).

- **Heading font**: Impact (with fallbacks: Haettenschweiler, Arial Narrow Bold, Oswald, sans-serif)
- **Body font**: Georgia (with fallbacks: Times New Roman, Times, serif)
- Headings use sentence case and are left-aligned; body text is left-aligned (no justified text)
- Colour tokens, theme mapping, and contrast notes are defined in `src/assets/css/styles.css`

## Accessibility

The site targets WCAG 2.1 level AA conformance per the UK Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018:

- Skip link to main content
- Semantic HTML landmarks (`<nav>`, `<main>`, `<header>`, `<footer>`)
- `aria-current="page"` on active navigation
- Keyboard-navigable with visible focus outlines
- Descriptive alt text on images (graceful degradation when no photo)
- Colour contrast meets AA standards (4.5:1 minimum)
- Responsive layout (no horizontal scroll on mobile)

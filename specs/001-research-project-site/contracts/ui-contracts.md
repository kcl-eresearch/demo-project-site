# UI Contracts: Research Project Website

**Feature**: Electron Microscopy Surface Defect Research Website
**Date**: 2026-07-06
**Source**: Functional requirements from [spec.md](spec.md)

---

## Shared Layout Contract

Every page uses `layouts/base.njk` which provides:

| Element | Requirement | Spec ref |
| --- | --- | --- |
| `<html lang="en">` | Language attribute on root element | WCAG 3.1.1 |
| `<title>` | Unique per page from frontmatter `title` | WCAG 2.4.2 |
| Skip link | First focusable element, links to `#main-content` | WCAG 2.4.1 |
| Left navigation | `<nav aria-label="Main navigation">` with all 4 page links + active state | FR-001, FR-003 |
| `<main id="main-content">` | Main content area | WCAG 1.3.1 |
| Brand header | Site name + KCL identification, links to home | FR-012 |
| Footer | Institution name, contact email link | FR-012 |
| Stylesheet | `assets/css/styles.css` with brand tokens (Impact, Georgia, King's Red) | Brand guidelines |
| Responsive | CSS media queries for desktop, tablet, mobile | FR-010, SC-005 |

### Left Navigation Component (`components/nav.njk`)

| Element | Requirement |
| --- | --- |
| Nav items | Iterated from `site.navItems` data |
| Active state | `aria-current="page"` on the link matching `page.url` |
| Link URLs | Passed through `| url` filter for pathPrefix |
| Keyboard | All links reachable via Tab, visible focus outline |

---

## Page Contracts

### Home Page (`index.md`)

| Aspect | Detail |
| --- | --- |
| **Route** | `/` |
| **Layout** | `layouts/base.njk` |
| **Data** | `site` (name, institution) |
| **Content** | Brief project introduction, links to all four main pages |
| **Acceptance** | FR-002 — introduces the project at a glance and provides access to the four main pages |

### About Page (`about.md`)

| Aspect | Detail |
| --- | --- |
| **Route** | `/about/` |
| **Layout** | `layouts/base.njk` |
| **Data** | None (page-specific content only) |
| **Content** | Detailed description of electron microscopy method, applications, limitations |
| **Acceptance** | FR-004 — method, applications, and limitations. SC-002 — visitor can explain the method and 3 applications after 5 minutes |

### The Team Page (`team.md`)

| Aspect | Detail |
| --- | --- |
| **Route** | `/team/` |
| **Layout** | `layouts/base.njk` |
| **Data** | `team` (array of Team Member entities) |
| **Content** | Iterates team members using `components/team-card.njk` |
| **Acceptance** | FR-005 — name, role, biography, photo where available. Edge case: missing photo degrades gracefully (no broken image) |

### Team Card Component (`components/team-card.njk`)

| Element | Requirement |
| --- | --- |
| Member name | `<h2>` heading |
| Role | `<p class="role">` |
| Photo | `<img>` with `alt="[member name]"` if photo provided; styled placeholder if not |
| Bio | `<div class="bio">` with biography text |

### Outputs Page (`outputs.md`)

| Aspect | Detail |
| --- | --- |
| **Route** | `/outputs/` |
| **Layout** | `layouts/base.njk` |
| **Data** | `outputs` (array of Output entities) |
| **Content** | Groups outputs by `type` (publications, datasets, software) using `components/output-list.njk` |
| **Acceptance** | FR-006 — grouped by type. FR-007 — each entry links to full resource. SC-004 — 100% categorised and linked. Edge case: empty category shows "nothing listed yet" message |

### Output List Component (`components/output-list.njk`)

| Element | Requirement |
| --- | --- |
| Group headings | `<h2>` for each type: "Publications", "Datasets", "Software" |
| Output entries | Title as link to `url`, description below |
| Empty state | If no outputs of a type, display "No [type] listed yet" |
| External links | `target="_blank"` with `rel="noopener noreferrer"` |

### Work with Us Page (`work-with-us.md`)

| Aspect | Detail |
| --- | --- |
| **Route** | `/work-with-us/` |
| **Layout** | `layouts/base.njk` |
| **Data** | `site.contactEmail` |
| **Content** | Engagement process explanation + `components/contact-link.njk` |
| **Acceptance** | FR-008 — explains how a commercial company can engage. FR-009 — displays project email as mailto link, no personal data collected. SC-003 — company can identify engagement process and contact within 3 minutes |

### Contact Link Component (`components/contact-link.njk`)

| Element | Requirement |
| --- | --- |
| Mailto link | `<a href="mailto:[email]">[email]</a>` |
| Visible text | Email address shown as visible, copyable text (edge case: no email client configured) |
| No form | No input fields, no data collection (FR-009) |

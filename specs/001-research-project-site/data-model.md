# Data Model: Research Project Website

**Feature**: Electron Microscopy Surface Defect Research Website
**Date**: 2026-07-06
**Source**: Entities defined in [spec.md](spec.md) Key Entities section

---

## Entities

### Site

Site-wide metadata and configuration. Stored as `src/_data/site.json`. Available globally to all templates as `site`.

| Field | Type | Required | Validation | Description |
| --- | --- | --- | --- | --- |
| `name` | string | yes | non-empty | Project name (e.g., "Electron Microscopy Surface Defect Research") |
| `institution` | string | yes | non-empty | Institution name — "King's College London" (FR-012) |
| `contactEmail` | string | yes | valid email format | Project email address for the mailto link (FR-009) |
| `navItems` | array | yes | min 4 items | Navigation items for the left sidebar (FR-001) |

#### NavItem (nested in Site)

| Field | Type | Required | Validation | Description |
| --- | --- | --- | --- | --- |
| `label` | string | yes | non-empty | Display label (e.g., "About", "The Team") |
| `url` | string | yes | starts with `/` | Root-relative URL path (e.g., `/about/`) |

**Notes**:
- `navItems` must include entries for all four pages: The Team, Outputs, Work with Us, About (FR-001).
- The home page is not listed in `navItems` (the site title/logo links to home instead).
- `url` values are root-relative; the Eleventy `url` filter prepends `pathPrefix` at render time.

---

### Team Member

A person on the project team. Stored as an array in `src/_data/team.json`. Available globally as `team`.

| Field | Type | Required | Validation | Description |
| --- | --- | --- | --- | --- |
| `name` | string | yes | non-empty | Full name (e.g., "Dr. Jane Smith") |
| `role` | string | yes | non-empty | Role/title (e.g., "Principal Investigator") |
| `bio` | string | yes | non-empty | Biography text |
| `photo` | string | no | root-relative path or empty string | Path to photograph (e.g., `/assets/images/team/jane-smith.jpg`). Empty string or omitted = no photo (edge case: degrade gracefully, spec line 86) |

**Validation rules**:
- If `photo` is provided, it must be a root-relative path starting with `/assets/images/`.
- If `photo` is empty or omitted, the template renders a styled placeholder (no broken image — spec edge case, FR-005).
- No uniqueness constraints (names could theoretically repeat, but unlikely for a small team).

**Relationships**: None — team members are independent entities displayed as a list.

---

### Output

A research artefact produced by the project. Stored as an array in `src/_data/outputs.json`. Available globally as `outputs`.

| Field | Type | Required | Validation | Description |
| --- | --- | --- | --- | --- |
| `title` | string | yes | non-empty | Title of the publication, dataset, or software |
| `type` | enum | yes | one of: `publication`, `dataset`, `software` | Output category (FR-006) |
| `description` | string | yes | non-empty | Short description of the output |
| `url` | string | yes | valid URL (http/https) | Link to the full resource (FR-007) |
| `year` | number | no | 4-digit year | Publication/release year (for display ordering) |
| `authors` | string | no | non-empty | Author list (primarily for publications) |

**Validation rules**:
- `type` must be exactly one of the three enum values; templates group outputs by this field (FR-006).
- `url` must be a valid absolute URL to the external resource (DOI link, Zenodo record, GitHub repo, etc.).
- If no outputs exist for a given type, the template displays an "empty state" message (spec edge case, line 87).

**Relationships**: None — outputs are independent entities grouped by `type` for display.

---

## State Transitions

Not applicable — all entities are static data (no lifecycle, no state machine). Content is updated by editing the JSON data files and re-deploying.

## Data Volume Assumptions

Per spec Assumptions (line 137): the number of team members and outputs is small enough (typical for a single research project) that all items can be listed directly without search, filtering, or pagination.

- Team members: ~5-10
- Outputs: ~10-20 (across all three types)

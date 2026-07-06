# Data Contracts: Research Project Website

**Feature**: Electron Microscopy Surface Defect Research Website
**Date**: 2026-07-06
**Source**: Entities defined in [data-model.md](../data-model.md)

---

## Overview

All data is stored as JSON files in `src/_data/`. Eleventy reads these automatically and exposes them globally to all templates by their filename (without extension).

---

## `site.json` — Site Metadata

**File**: `src/_data/site.json`
**Template access**: `site.*`

```json
{
  "name": "Electron Microscopy Surface Defect Research",
  "institution": "King's College London",
  "contactEmail": "project-team@kcl.ac.uk",
  "navItems": [
    { "label": "About", "url": "/about/" },
    { "label": "The Team", "url": "/team/" },
    { "label": "Outputs", "url": "/outputs/" },
    { "label": "Work with Us", "url": "/work-with-us/" }
  ]
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Project display name |
| `institution` | string | yes | Must be "King's College London" (FR-012) |
| `contactEmail` | string | yes | Valid email for mailto link (FR-009) |
| `navItems` | array | yes | Exactly 4 nav entries matching the 4 pages (FR-001) |
| `navItems[].label` | string | yes | Display label |
| `navItems[].url` | string | yes | Root-relative URL starting with `/` |

---

## `team.json` — Team Members

**File**: `src/_data/team.json`
**Template access**: `team` (array)

```json
[
  {
    "name": "Dr. Jane Smith",
    "role": "Principal Investigator",
    "bio": "Jane leads the electron microscopy research group at King's College London.",
    "photo": "/assets/images/team/jane-smith.jpg"
  },
  {
    "name": "Dr. John Doe",
    "role": "Research Associate",
    "bio": "John specializes in surface defect analysis techniques.",
    "photo": ""
  }
]
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Full name (non-empty) |
| `role` | string | yes | Role/title (non-empty) |
| `bio` | string | yes | Biography text (non-empty) |
| `photo` | string | no | Root-relative path to image, or empty string/omitted for no photo |

**Edge case handling**: When `photo` is empty or omitted, the template must not render an `<img>` tag. A styled placeholder div may be shown instead. No broken image icon (spec edge case, line 86).

---

## `outputs.json` — Research Outputs

**File**: `src/_data/outputs.json`
**Template access**: `outputs` (array)

```json
[
  {
    "title": "Novel electron microscopy techniques for defect detection",
    "type": "publication",
    "description": "Peer-reviewed paper on surface defect identification methods.",
    "url": "https://doi.org/10.1234/example",
    "year": 2024,
    "authors": "Smith, J., Doe, J."
  },
  {
    "title": "Surface defect dataset v1.0",
    "type": "dataset",
    "description": "Annotated microscopy images of surface defects in engineering components.",
    "url": "https://zenodo.org/record/example",
    "year": 2024
  },
  {
    "title": "Defect analyzer tool",
    "type": "software",
    "description": "Open-source software for automated defect classification.",
    "url": "https://github.com/example/defect-analyzer",
    "year": 2025
  }
]
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | string | yes | Output title (non-empty) |
| `type` | enum | yes | One of: `"publication"`, `"dataset"`, `"software"` |
| `description` | string | yes | Short description (non-empty) |
| `url` | string | yes | Absolute URL to the full resource (FR-007) |
| `year` | number | no | 4-digit year for display ordering |
| `authors` | string | no | Author list (primarily for publications) |

**Edge case handling**: If no outputs exist for a given `type`, the template displays "No [type] listed yet" instead of an empty section (spec edge case, line 87).

**Grouping**: Templates group outputs by `type` into three sections: Publications, Datasets, Software (FR-006).

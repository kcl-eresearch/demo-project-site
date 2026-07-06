# Tasks: Electron Microscopy Surface Defect Research Website

**Input**: Design documents from `/specs/001-research-project-site/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No automated tests — manual validation per quickstart.md scenarios. No test framework needed for a static site.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Static site**: `src/` at repository root (Eleventy input directory)
- `_includes/` for layouts and components, `_data/` for JSON data files
- `assets/` for static CSS and images (passthrough copy)
- `.github/workflows/` for CI/CD

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, Eleventy configuration, and deployment pipeline

- [X] T001 Create directory structure per plan.md: `src/_includes/layouts/`, `src/_includes/components/`, `src/_data/`, `src/assets/css/`, `src/assets/images/team/`
- [X] T002 Expand `eleventy.config.js` with callback function shape for Configuration API access (passthrough copy for `src/assets`, Nunjucks as markdown and HTML template engine, html/Markdown template engine set to `njk`)
- [X] T003 [P] Add `build`, `build-ghpages`, and `serve` scripts to `package.json`
- [X] T004 [P] Create GitHub Actions deployment workflow in `.github/workflows/deploy-gh-pages.yml` (pnpm install, build with `--pathprefix=/demo-project-site/`, upload artifact, deploy to Pages)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout, navigation, styling, and home page that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 [P] Create `src/_data/site.json` with site metadata (name, institution "King's College London", contactEmail, navItems array with 4 page links per data-contracts.md schema)
- [X] T006 [P] Create `src/assets/css/styles.css` with brand tokens (CSS variables: King's Red #E2231A, Impact heading font with fallbacks, Georgia body font with fallbacks), responsive left-nav + content layout (desktop side-by-side, mobile reflow), skip link styles, visible focus outlines, base typography (body >= 16px, line-height 1.5)
- [X] T007 Create `src/_includes/components/nav.njk` — left navigation component iterating `site.navItems`, active state via `aria-current="page"` comparing `page.url`, links passed through `| url` filter (depends on T005)
- [X] T008 Create `src/_includes/layouts/base.njk` — base HTML shell with `<html lang="en">`, `<head>` (title from frontmatter, stylesheet link via `| url` filter), skip link to `#main-content`, nav include, `<main id="main-content">{{ content | safe }}</main>`, footer with KCL name and contact email (depends on T007)
- [X] T009 Create `src/index.md` home page with frontmatter `layout: layouts/base.njk` and `title`, brief project introduction, and links to all four main pages (depends on T008)
- [X] T010 Verify build succeeds (`npx @11ty/eleventy --serve`) and home page renders at `http://localhost:8080/` with left navigation visible and functional

**Checkpoint**: Foundation ready — home page renders, navigation works, brand styles applied. User story implementation can now begin.

---

## Phase 3: User Story 1 - Understand the Research Method (Priority: P1) MVP

**Goal**: Detailed About page explaining the electron microscopy method, its applications, and limitations

**Independent Test**: Open `/about/` and verify a reader with no prior knowledge can explain the method, its purpose, and at least three engineering applications after reading it (VS-2 in quickstart.md)

### Implementation for User Story 1

- [X] T011 [P] [US1] Create `src/about.md` with frontmatter `layout: layouts/base.njk` and `title: "About"`, containing a detailed, structured description of how electron microscopy identifies surface defects in engineering components — covering the method, its applications, and its limitations per FR-004
- [X] T012 [US1] Verify About page renders at `/about/` with correct active nav state, content covers method/applications/limitations, and meets SC-002 (reader can explain method and 3 applications after 5 minutes)

**Checkpoint**: User Story 1 fully functional — About page delivers the core value of explaining the research method. This is the MVP.

---

## Phase 4: User Story 2 - Engage as Commercial Partner (Priority: P2)

**Goal**: Work with Us page explaining the commercial engagement process with a mailto contact link

**Independent Test**: Open `/work-with-us/` and verify a commercial company can identify the engagement process and a contact pathway (mailto link with visible text) within 3 minutes (VS-5 in quickstart.md)

### Implementation for User Story 2

- [X] T013 [P] [US2] Create `src/_includes/components/contact-link.njk` — mailto link component using `site.contactEmail`, rendering the email as both a `<a href="mailto:...">` link and visible copyable text (per FR-009 and edge case: no email client configured)
- [X] T014 [US2] Create `src/work-with-us.md` with frontmatter `layout: layouts/base.njk` and `title: "Work with Us"`, explaining how a commercial engineering company can engage the team to assess components for defects, and including the `contact-link.njk` component (depends on T013)
- [X] T015 [US2] Verify Work with Us page renders at `/work-with-us/` with engagement process explanation, visible mailto link, no form fields or data collection, and meets SC-003 (engagement process and contact identifiable within 3 minutes)

**Checkpoint**: User Stories 1 AND 2 both work independently — site now explains the method and enables commercial engagement.

---

## Phase 5: User Story 3 - Browse Research Outputs (Priority: P3)

**Goal**: Outputs page listing publications, datasets, and software grouped by type, each linking to the full resource

**Independent Test**: Open `/outputs/` and verify every listed output is categorised by type and links to its full resource; empty categories show an "empty state" message (VS-4 in quickstart.md)

### Implementation for User Story 3

- [X] T016 [P] [US3] Create `src/_data/outputs.json` with sample research outputs array per data-contracts.md schema (title, type enum: publication/dataset/software, description, url, optional year and authors)
- [X] T017 [P] [US3] Create `src/_includes/components/output-list.njk` — component that groups `outputs` by `type` into three sections (Publications, Datasets, Software) with `<h2>` headings, renders each output as a link to its `url` with description, and displays "No [type] listed yet" for empty categories (per FR-006, FR-007, edge case)
- [X] T018 [US3] Create `src/outputs.njk` with frontmatter `layout: layouts/base.njk` and `title: "Outputs"`, including the `output-list.njk` component (depends on T016, T017)
- [X] T019 [US3] Verify Outputs page renders at `/outputs/` with outputs grouped by type, each entry linking to its external resource, and empty categories showing the "empty state" message per SC-004

**Checkpoint**: User Stories 1, 2, AND 3 all work independently — site now explains the method, enables engagement, and lists research outputs.

---

## Phase 6: User Story 4 - Meet the Project Team (Priority: P4)

**Goal**: Team page displaying each member's name, role, biography, and photograph (where available)

**Independent Test**: Open `/team/` and verify each member shows name, role, and biography, with photos where provided and graceful degradation where not (VS-3 in quickstart.md)

### Implementation for User Story 4

- [X] T020 [P] [US4] Create `src/_data/team.json` with sample team members array per data-contracts.md schema (name, role, bio, photo — include at least one member with empty photo to test graceful degradation)
- [X] T021 [P] [US4] Create `src/_includes/components/team-card.njk` — reusable component rendering a team member card with `<h2>` name, `<p>` role, photo `<img>` with descriptive `alt` if photo provided, styled placeholder if not (no broken image), and `<div>` bio (per FR-005 and edge case)
- [X] T022 [US4] Create `src/team.njk` with frontmatter `layout: layouts/base.njk` and `title: "The Team"`, iterating `team` array using the `team-card.njk` component (depends on T020, T021)
- [X] T023 [US4] Verify Team page renders at `/team/` with each member showing name, role, bio, and photo where available; verify member without photo degrades gracefully (no broken image) per FR-005

**Checkpoint**: All four user stories now work independently — the site is feature-complete.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, documentation, and cross-cutting verification

- [ ] T024 [P] Create `README.md` with project overview, features, tech stack (Eleventy 3.x, GitHub Pages), setup instructions, directory structure, and data model summary
- [ ] T025 [P] Run quickstart.md validation scenarios VS-1 through VS-10 to verify all functional requirements
- [ ] T026 [P] Verify WCAG 2.1 AA conformance across all pages: skip link, keyboard navigation, visible focus, `aria-current` on active nav, image alt text, semantic landmarks (`<nav>`, `<main>`, `<header>`), `<html lang="en">`, unique page titles, colour contrast (King's Red on white)
- [ ] T027 Verify responsive layout: test all pages at desktop (>= 1024px), tablet (768px), and mobile (375px) widths — left nav remains usable, content reflows, no horizontal scroll on mobile
- [ ] T028 Verify GitHub Pages production build: run `npx @11ty/eleventy --pathprefix=/demo-project-site/` and confirm all links and assets resolve correctly with the path prefix

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001 for directories) — BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion (T010 checkpoint)
  - User stories can proceed in parallel (if staffed) or sequentially in priority order (P1 to P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1) — About**: Can start after Foundational (Phase 2). No dependencies on other stories. MVP.
- **User Story 2 (P2) — Work with Us**: Can start after Foundational (Phase 2). Independently testable. Uses `site.contactEmail` from site.json (created in Phase 2).
- **User Story 3 (P3) — Outputs**: Can start after Foundational (Phase 2). Independently testable. Creates its own data file and component.
- **User Story 4 (P4) — Team**: Can start after Foundational (Phase 2). Independently testable. Creates its own data file and component.

### Within Each User Story

- Data files and components marked [P] can be created in parallel
- Page content (`.md`) depends on its components being created first
- Verification task depends on implementation tasks being complete

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003, T004 after T001)
- Foundational data/styles (T005, T006) can run in parallel
- Once Foundational phase completes, all user stories can start in parallel
- Within each story, data files and components marked [P] can run in parallel
- Polish tasks T024, T025, T026 can run in parallel

---

## Parallel Example: User Story 3 (Outputs)

```bash
# Launch data file and component creation in parallel:
Task: "Create outputs.json in src/_data/outputs.json"
Task: "Create output-list.njk in src/_includes/components/output-list.njk"

# After both complete, create the page:
Task: "Create outputs.md in src/outputs.md"

# Then verify:
Task: "Verify Outputs page renders with grouped outputs and external links"
```

---

## Parallel Example: User Story 4 (Team)

```bash
# Launch data file and component creation in parallel:
Task: "Create team.json in src/_data/team.json"
Task: "Create team-card.njk in src/_includes/components/team-card.njk"

# After both complete, create the page:
Task: "Create team.md in src/team.md"

# Then verify:
Task: "Verify Team page renders with member details and graceful photo degradation"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T010) — CRITICAL, blocks all stories
3. Complete Phase 3: User Story 1 — About page (T011-T012)
4. **STOP and VALIDATE**: Verify About page independently (VS-2 in quickstart.md)
5. Deploy/demo the MVP — a working site with navigation, home page, and the About page

### Incremental Delivery

1. Complete Setup + Foundational — foundation ready (home page, nav, styles)
2. Add User Story 1 (About) — test independently — deploy/demo (MVP!)
3. Add User Story 2 (Work with Us) — test independently — deploy/demo
4. Add User Story 3 (Outputs) — test independently — deploy/demo
5. Add User Story 4 (Team) — test independently — deploy/demo
6. Polish phase — validate all scenarios, accessibility, responsiveness, README

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done (T010 checkpoint):
   - Developer A: User Story 1 (About) — 2 tasks
   - Developer B: User Story 2 (Work with Us) — 3 tasks
   - Developer C: User Story 3 (Outputs) — 4 tasks
   - Developer D: User Story 4 (Team) — 4 tasks
3. Stories complete and integrate independently — no cross-story dependencies
4. Team collaborates on Polish phase

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- No automated tests — validation is manual per quickstart.md scenarios
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All pages use the same base layout and nav component from Phase 2

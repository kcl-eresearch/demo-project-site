# Feature Specification: Electron Microscopy Surface Defect Research Website

**Feature Branch**: `001-research-project-site`

**Created**: 2026-07-06

**Status**: Draft

**Input**: User description: "We're building an academic website for a research project team at King's College London. The project uses electron microscopy to identify surface defects in engineering components. The site should have a navbar on the left side which links to all pages. The pages are: 'the team' - bios and photos of the project team; 'outputs' - a place to list publications, datasets and software; 'work with us' - a page about how you as a commercial engineering company can work with them to assess your components for defects; 'about' - a much more detailed description of how the method works and what it can be used for."

## Clarifications

### Session 2026-07-06

- Q: How should a commercial company initiate contact on the "Work with Us" page? → A: Display a project email address as a mailto link; the site collects no personal data.
- Q: Which accessibility conformance level should the site target? → A: WCAG 2.1 level AA (UK public-sector standard).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the Research Method and Applications (Priority: P1)

A visitor (academic peer, student, or interested professional) arrives at the site wanting to understand what the project does. Through the left navigation they open the "About" page, which provides a detailed explanation of how electron microscopy is used to identify surface defects in engineering components, what the method can and cannot be used for, and the real-world engineering problems it addresses.

**Why this priority**: The About page is the foundation of the site's value. Without understanding the method, no other page (team, outputs, collaboration) carries meaning. It is the entry point that establishes the project's purpose and credibility for every audience.

**Independent Test**: Can be fully tested by opening the About page and verifying that a reader with no prior knowledge can explain the method, its purpose, and at least three engineering applications after reading it.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on any page, **When** they click the "About" link in the left navigation, **Then** they are taken to a page presenting a detailed, structured description of the electron microscopy method and its applications.
2. **Given** a visitor on the About page, **When** they read through the content, **Then** they can identify what the method does, what types of defects it detects, what components it applies to, and its limitations.
3. **Given** a visitor on the About page, **When** they wish to explore further, **Then** they can use the left navigation to reach any other page in a single click.

---

### User Story 2 - Engage as a Commercial Engineering Partner (Priority: P2)

A commercial engineering company that manufactures or maintains components wants to assess their parts for surface defects. They visit the site, learn enough from the About page to confirm relevance, then open the "Work with Us" page to understand how they can engage the team, what the collaboration process looks like, and how to make contact to initiate an assessment of their components.

**Why this priority**: Commercial engagement is the project's primary pathway to real-world impact and sustained funding. It converts the research into tangible benefit for industry, which is a core goal of the project alongside academic output.

**Independent Test**: Can be fully tested by opening the "Work with Us" page and verifying that a commercial company can identify the engagement process and a clear contact pathway without any external help.

**Acceptance Scenarios**:

1. **Given** a representative of a commercial engineering company on the site, **When** they open the "Work with Us" page, **Then** they see an explanation of how the team can assess their components for defects and what the collaboration involves.
2. **Given** a commercial visitor on the "Work with Us" page, **When** they decide to proceed, **Then** they can find a displayed project email address (as a mailto link) to initiate the engagement.
3. **Given** a commercial visitor who wants to validate the team's credibility, **When** they navigate to "The Team" and "Outputs", **Then** they can review the team's expertise and prior publications, datasets, and software.

---

### User Story 3 - Browse Research Outputs (Priority: P3)

A researcher, peer reviewer, or developer wants to find and access the project's published work. Through the left navigation they open the "Outputs" page, which lists the project's publications, datasets, and software grouped by type, with each entry linking to the full resource so they can read papers, download datasets, or access software.

**Why this priority**: Outputs are the academic record of the project and a key deliverable for funding bodies and the wider research community. They are prioritized below understanding and engagement because they serve a narrower, specialist audience.

**Independent Test**: Can be fully tested by opening the "Outputs" page and verifying that every listed output is categorized by type and links to its full resource.

**Acceptance Scenarios**:

1. **Given** a researcher on any page, **When** they click the "Outputs" link in the left navigation, **Then** they are taken to a page listing publications, datasets, and software.
2. **Given** a visitor on the "Outputs" page, **When** they view the list, **Then** outputs are grouped by type (publications, datasets, software) so they can locate what they need.
3. **Given** a visitor on the "Outputs" page, **When** they select an output entry, **Then** they are directed to the full resource (publication, dataset, or software).

---

### User Story 4 - Meet the Project Team (Priority: P4)

A visitor wants to know who is behind the research — to assess credibility, find a collaborator, or contact a specific researcher. Through the left navigation they open the "The Team" page, which presents each team member's name, role, biography, and photograph.

**Why this priority**: The team page builds trust and humanises the project but is supporting context rather than a primary deliverable. It complements the About and Outputs pages rather than standing alone as the core value.

**Independent Test**: Can be fully tested by opening "The Team" page and verifying that each listed member shows a name, role, and biography, with a photograph where one is available.

**Acceptance Scenarios**:

1. **Given** a visitor on any page, **When** they click the "The Team" link in the left navigation, **Then** they are taken to a page presenting the project team members.
2. **Given** a visitor on "The Team" page, **When** they view a team member's entry, **Then** they see the member's name, role, and biography, and a photograph where one has been provided.
3. **Given** a visitor on "The Team" page, **When** a team member has no photograph available, **Then** that member's entry still displays clearly without a broken image.

---

### Edge Cases

- What happens when a team member has not yet provided a photograph or biography? Their entry must degrade gracefully (show available information, no broken image placeholder).
- What happens when the "Outputs" page has no entries in a given category (e.g., no software yet published)? The category must indicate that nothing is listed yet rather than appearing empty or broken.
- What happens when a visitor accesses the site on a small screen (mobile)? The left-side navigation must remain usable and not overflow or hide page links.
- What happens when a visitor lands on a deep link to a specific page rather than the home page? The left navigation must still be present so they can orient themselves and reach other pages.
- What happens when a commercial partner tries to make contact but the contact details are out of date? The site must present a clear, primary contact route that the team can keep current.
- What happens when a visitor clicks the contact email link but has no email client configured? The email address must also be shown as visible, copyable text so it can be used manually.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST display a left-side navigation bar on every page, containing links to all four pages: "The Team", "Outputs", "Work with Us", and "About".
- **FR-002**: The site MUST include a landing/home page that introduces the project at a glance and provides access to the four main pages.
- **FR-003**: The left navigation MUST indicate which page the visitor is currently viewing (active state).
- **FR-004**: The site MUST include an "About" page presenting a detailed description of how electron microscopy is used to identify surface defects in engineering components, including the method, its applications, and its limitations.
- **FR-005**: The site MUST include a "The Team" page displaying each project team member's name, role, and biography, with a photograph shown where one has been provided.
- **FR-006**: The site MUST include an "Outputs" page listing the project's publications, datasets, and software, grouped by output type.
- **FR-007**: Each output entry MUST link to its full underlying resource (the publication, the dataset, or the software).
- **FR-008**: The site MUST include a "Work with Us" page explaining how a commercial engineering company can engage the team to assess their components for surface defects.
- **FR-009**: The "Work with Us" page MUST display a project email address as a mailto link, enabling a commercial company to initiate engagement. The site MUST NOT collect personal data through this contact pathway.
- **FR-010**: The site MUST display correctly and remain navigable across desktop, tablet, and mobile screen sizes.
- **FR-011**: The site MUST present all content in clear, non-technical language appropriate for a mixed audience of academics, industry professionals, and the interested public.
- **FR-012**: The site MUST clearly identify the project as belonging to King's College London.
- **FR-013**: The site MUST meet WCAG 2.1 level AA conformance across all pages, covering perceivable, operable, understandable, and robust guidelines (e.g., text alternatives for images, keyboard navigation, sufficient colour contrast, and predictable page structure).

### Key Entities *(include if feature involves data)*

- **Team Member**: A person on the project team. Key attributes: name, role/title, biography, and photograph (optional). Displayed on "The Team" page.
- **Output**: A research artefact produced by the project. Categorised into three types — Publication, Dataset, and Software. Key attributes: title, type, description, and a link to the full resource. Displayed on the "Outputs" page.
- **Page**: A navigable section of the site. Key attributes: title, body content, and a navigation entry in the left navigation bar. The four main pages are About, The Team, Outputs, and Work with Us.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can reach any of the four main pages in a single click from any other page using the left navigation.
- **SC-002**: A first-time visitor with no prior knowledge can explain the electron microscopy method and at least three of its engineering applications after spending no more than 5 minutes on the About page.
- **SC-003**: A commercial engineering company can identify the engagement process and a contact pathway within 3 minutes of arriving on the site.
- **SC-004**: 100% of outputs listed on the Outputs page are categorised by type and link to their full underlying resource.
- **SC-005**: Every page renders correctly and remains fully navigable on desktop, tablet, and mobile screen sizes.
- **SC-006**: The site becomes interactive for a visitor within 3 seconds on a standard broadband connection.
- **SC-007**: All pages pass WCAG 2.1 level AA validation against the published checklist criteria (e.g., automated and manual accessibility audits report no level AA failures).

## Assumptions

- The site is an informational, read-only website; it does not require user accounts, login, or authenticated areas.
- All content (team biographies, photographs, publication lists, datasets, software links, and method descriptions) will be supplied by the project team at King's College London.
- The site is primarily aimed at a UK academic and engineering-industry audience but should be accessible to international visitors.
- All content is in English.
- As a King's College London site, the site falls under the UK Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018, so it targets WCAG 2.1 level AA conformance.
- Engagement with commercial partners is initiated via a displayed project email address (mailto link) rather than a live booking, transaction system, or contact form; the site does not collect personal data.
- The number of team members and outputs is small enough (typical for a single research project) that all items can be listed directly without search, filtering, or pagination.
- Content is updated periodically by the project team rather than continuously contributed by visitors.
- A landing/home page exists in addition to the four named pages to introduce the project and orient first-time visitors.

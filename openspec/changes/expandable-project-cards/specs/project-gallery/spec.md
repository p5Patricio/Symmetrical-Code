# Project Gallery Specification

## Purpose

Define the behavior of the interactive project grid where cards expand inline to reveal detailed project information with image carousel, description, and technology icons.

## Requirements

### Requirement: Expandable Card Layout

The system MUST support clicking a project card to expand it to full grid width, displacing other cards below.

#### Scenario: Card Expansion

- GIVEN the project grid is rendered with multiple cards
- WHEN the user clicks a collapsed card
- THEN the clicked card expands to span all grid columns
- AND all other cards flow beneath the expanded card

#### Scenario: Card Replacement

- GIVEN one card is already expanded
- WHEN the user clicks a different collapsed card
- THEN the previously expanded card collapses
- AND the newly clicked card expands in its place

#### Scenario: Card Collapse

- GIVEN a card is expanded
- WHEN the user clicks the close (X) button
- THEN the expanded card collapses to its original grid size
- AND the grid returns to its standard layout

### Requirement: Expanded Card Content

The system MUST display a two-column layout inside the expanded card on desktop (carousel left, details right) and a stacked layout on mobile.

#### Scenario: Desktop Layout

- GIVEN a card is expanded on a viewport ≥768px
- THEN the left 55% shows an image carousel
- AND the right 45% shows title, description, tags with icons, and links

#### Scenario: Mobile Layout

- GIVEN a card is expanded on a viewport <768px
- THEN the carousel appears at the top
- AND the details section stacks below it
- AND horizontal padding adjusts for safe viewing

### Requirement: GitHub Open Graph Image Carousel

The system MUST display GitHub Open Graph images in the expanded card carousel with fallback handling.

#### Scenario: OG Image Load

- GIVEN a project has a valid `ogImageUrl`
- WHEN the expanded card renders
- THEN the carousel displays the OG image as the first slide
- AND shows navigation controls if multiple images exist

#### Scenario: OG Image Failure

- GIVEN a project's OG image fails to load
- WHEN the error occurs
- THEN the carousel falls back to the ProjectImage placeholder
- AND the user can still navigate other slides

### Requirement: Technology Icon Display

The system MUST display each project tag with its corresponding technology SVG icon.

#### Scenario: Known Technology

- GIVEN a project tag matches an entry in the icon mapping (e.g., "React", "Python", "Vue")
- WHEN the expanded card renders
- THEN the tag displays the SVG icon to the left of the text
- AND the icon uses the tag's accent color

#### Scenario: Unknown Technology

- GIVEN a project tag has no matching icon
- WHEN the expanded card renders
- THEN the tag displays a generic code-bracket icon
- AND the text remains readable

### Requirement: Project Links

The system MUST provide clickable links to the project's GitHub repository and optional demo/backend URLs.

#### Scenario: Links Render

- GIVEN a project has `githubUrl`
- WHEN the expanded card renders
- THEN a "Ver código" button links to `githubUrl`
- AND if `demoUrl` exists, a "Ver demo" button appears
- AND if `backendUrl` exists, a "Backend" button appears

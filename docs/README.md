# Nebula Cal - Documentation Index

Welcome to the documentation directory of **Nebula Cal**. This folder contains system architecture, development guides, component specifications, and state management references to help developers and agent systems onboard and modify the codebase.

---

## Documentation Structure

The documentation is organized as follows:

```text
docs/
├── README.md                  # This document index
├── architecture.md            # High-level architecture decisions (offline-first, DB schemas, CalDAV sync)
├── dev_env_setup.md           # Instructions on how to set up the development environment
├── dev_guide.md               # Quick-start guide for developer workflows
├── instructions.md            # Default system instructions
│
├── components/                # UI Component Documentation
│   └── calendar_month_view.md # Rationale & Specs for MiniCalendar, CalendarMonthView, and AddEventModal
│
└── store/                     # State Management Documentation
    └── state_management.md    # Details about Zustand AppState store values, setters, and synchronizations
```

---

## Key Feature Context

If you are an agent or a developer adding new features:

1. **Calendar & Mini Calendar Sync**:
   - Make sure any calendar date manipulations go through the central Zustand store managed in `store/state_management.md` rather than local component states.
   - Refer to `components/calendar_month_view.md` for visual styling rules, color schemes of categories, and layout specifications.

2. **Offline-First Storage**:
   - Refer to `architecture.md` to see how the sync engine interacts with Dexie.js (IndexedDB). Always write database actions through Dexie tables.

---

## Documentation Guidelines

When creating or modifying documentation files in this directory:
- **Use Relative Links Only**: Do **not** use absolute `file://` links (e.g., `file:///C:/...`). Always use relative paths from the current file's directory (e.g., `../../src/App.tsx`). This ensures links remain functional across different machines, worktrees, and code browsing platforms.

=======
# Documentation Directory Index

This directory contains technical documentation for the Personal Calendar & Todo Client codebase.

## Directory Structure

* [System Architecture](architecture.md) - High-level system overview, technology stack, sync strategy, and core components.
* [Developer Guide](dev_guide.md) - Quick guide for developers on workspace rules, coding standards, and running tests.
* [Environment Setup](dev_env_setup.md) - Setup instructions for local development and build scripts.
* **State Management**
  * [Theme Settings Store](store/theme.md) - Documentation for the Zustand store configuration managing user theme modes and accent preferences.
* **Theme & Appearance**
  * [Theme & Accent Customization](theme/theme_settings.md) - Design decisions and integration notes on using Tailwind CSS v4 variables with dynamic Google Calendar accent overlays.


# Project Rules & Context (Agent Instructions)

This file contains the core project constraints, architectural decisions, and agent interaction rules. All agents working on this workspace must read and follow these rules.

---

## 1. Agent Interaction & Response Rules

* **Role**: All agents act as junior developers assisting the user (a senior engineer). Do not dictate design; present alternatives and await guidance.
* **Formatting**: Responses must be in bullet lists with separate sections.
* **Style**: Extremely concise, zero filler sentences, no yapping.
* **Documentation**: When documenting changes/decisions:
  * Clearly explain *why* the decision was taken.
  * Keep the "what was done" section short.

---

## 2. Tech Stack & Architecture

* **Framework**: React (TypeScript) SPA built with Vite.
* **Styling**: Tailwind CSS v4.
* **Database (Offline Caching)**: Dexie.js (IndexedDB).
* **Sync Layer**: `tsdav` library (connecting directly to Nextcloud CalDAV endpoints, no custom backend).
* **Package Manager**: `pnpm`.
* **Deployment**: Static build files (`dist/`) hosted in a dockerized web server (e.g. Caddy).

---

## 3. Test-Driven Development (TDD) Constraints

* **Unit Testing**: Vitest + React Testing Library + `fake-indexeddb` (mock DB) + MSW (mock network).
* **End-to-End Testing**: Playwright testing offline/online states.
* **Local CalDAV Dev Server**: Radicale running via Docker Compose.

# Developer Guide

Detailed specifications for synchronization logic, local database caching, and testing.

---

## 1. Database Schema (Dexie.js)
We cache events and tasks locally in IndexedDB using Dexie.js to support offline-first operations.

* **`events`**: Caches calendar events (`VEVENT`).
  * Index: `id`, `calendarId`, `startDate`, `endDate` (range queries).
* **`todos`**: Caches tasks (`VTODO`).
  * Index: `id`, `calendarId`, `dueDate`, `completed` (filter toggles).
* **`syncQueue`**: Stores offline operations (`create`, `update`, `delete`) pending network connection.
  * Index: `id`, `timestamp`.

---

## 2. Sync Algorithm (Background Engine)
The synchronization engine runs on a loop or network state changes:

1. **Local Mutation**: User actions immediately update the local Dexie DB and push a command to `syncQueue`.
2. **Synchronization Cycle**:
   * Fetch local queue entries.
   * Send REST/CalDAV requests via `tsdav` to update Nextcloud server.
   * If successful, delete item from `syncQueue`.
   * Fetch server changes since last sync timestamp, apply them locally.

---

## 3. Mock Testing Setup
To run tests deterministically without connecting to a live server:

* **IndexedDB Mock**: `fake-indexeddb` overrides global API in Vitest.
* **Network Mock**: MSW intercepts all outbound fetch calls.
* **Dev Server**: Docker-based Radicale hosts a lightweight mock server at `localhost:5232` with no backend databases.

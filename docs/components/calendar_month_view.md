# Component Documentation - Calendar Month View & Sidebar Mini Calendar

This document details the newly added calendar components, their design rationale, interfaces, and architecture. These components were designed to provide a premium, modern month view matching the "Untitled UI" mockup, but rendered in a sleek dark-mode glassmorphism theme to match **Nebula Cal**.

---

## 1. Component Architecture Overview

The calendar system is split into three main components to ensure separation of concerns, high performance, and ease of future maintenance:

1. **`CalendarMonthView`** ([`CalendarMonthView.tsx`](file:///C:/Users/me/.gemini/antigravity/worktrees/personal-calendar/implement_calendar_month_view/src/components/CalendarMonthView.tsx)): The main calendar area. Displays the month grid, controls, active filters, and search bar.
2. **`MiniCalendar`** ([`MiniCalendar.tsx`](file:///C:/Users/me/.gemini/antigravity/worktrees/personal-calendar/implement_calendar_month_view/src/components/MiniCalendar.tsx)): A compact navigation calendar rendered in the sidebar. Used for quick selection of dates and synchronizing the viewed month.
3. **`AddEventModal`** ([`AddEventModal.tsx`](file:///C:/Users/me/.gemini/antigravity/worktrees/personal-calendar/implement_calendar_month_view/src/components/AddEventModal.tsx)): A dialog form for creating, editing, and deleting events from the local database.

---

## 2. Technical Decisions & Rationale

### 2.1 Monday-Start Grid
* **Decision**: All calendar views start on **Monday** (`weekStartsOn: 1` option in `date-fns` functions).
* **Rationale**: This matches the mockup layout and complies with international standards (ISO 8601) for calendar layouts.

### 2.2 Shared Date & Month State in Zustand
* **Decision**: Date state is moved out of individual components and managed centrally in the Zustand store.
* **Rationale**: This keeps the sidebar `MiniCalendar` and the main `CalendarMonthView` perfectly synchronized. Changing the month/date in the sidebar instantly updates the main calendar grid, and clicking "Today" in the main grid updates the sidebar.

### 2.3 Live Filtering & Search in Memory
* **Decision**: Events are fetched in bulk from the local Dexie IndexedDB and filtered in-memory using React states (`activeFilter`, `searchQuery`).
* **Rationale**: 
  * Avoids repeated asynchronous database queries while typing in the search bar.
  * Enhances typing responsiveness.
  * Works perfectly offline since the dataset is fully stored locally.

### 2.4 Event Color Schemes & Categories
* **Decision**: Calendar categories map to `calendarId` fields:
  * `work`: Indigo/Blue
  * `personal`: Emerald/Green
  * `meeting`: Purple/Violet
  * `task`: Amber/Orange
  * `important`: Rose/Red
* **Rationale**: Provides clear visual grouping and allows the user to immediately identify event categories on the calendar grid.

---

## 3. Detailed Component Reference

### 3.1 `CalendarMonthView`
* **Features**:
  * Date range header showing the month and year range.
  * Navigation controls (Previous Month, Next Month, Today).
  * Filter pills to filter visible events by category tab.
  * Search input to filter events by title, description, or location.
  * Main 7-column grid displaying days and event pills (displays start time + title, with a maximum of 3 pills per cell, showing a "+ X more" pill if needed).
  * Clicking on empty grid cell opens the create modal. Clicking on a pill opens the edit/delete modal.

### 3.2 `MiniCalendar`
* **Features**:
  * Clean, compact 7-column grid fitting into the sidebar.
  * Highlights "Today" with an border-ring and the selected day with a solid indigo circle.
  * Clicking any day selects that date and updates the main month view.

### 3.3 `AddEventModal`
* **Features**:
  * Form fields for: Title, Category/Calendar, Start Date/Time, End Date/Time, Location, Description.
  * Input validations (e.g. End Date/Time must be after Start Date/Time).
  * Saves to database using `db.events.add` (creates new event with a random UUID) or `db.events.put` (updates existing event).
  * Contains a "Delete" button when editing an existing event.

# Store Documentation - AppState Zustand Store

This document explains the store extensions made in [`useStore.ts`](file:///C:/Users/me/.gemini/antigravity/worktrees/personal-calendar/implement_calendar_month_view/src/store/useStore.ts) to support the Calendar Month View and Mini Calendar feature.

---

## 1. Store State Extensions

We added the following states and functions to the main `AppState` store interface:

| State Key | Type | Description |
| :--- | :--- | :--- |
| `selectedDate` | `Date` | The currently selected/clicked calendar date. |
| `currentMonth` | `Date` | A date representing the currently active month view (the day/time is ignored; only the month and year are read). |

| Setter Key | Type | Description |
| :--- | :--- | :--- |
| `setSelectedDate` | `(date: Date) => void` | Updates `selectedDate` state. |
| `setCurrentMonth` | `(month: Date) => void` | Updates `currentMonth` state. |

---

## 2. Design Rationale

1. **Avoid Prop Drilling**: Rather than passing the selected date state and month state from `App.tsx` down through several layers of layout containers, the state is managed in the global store.
2. **Synchronization of Views**: Because the calendar has two active month representations (the sidebar Mini Calendar and the main Calendar Month View), they must stay in sync:
   - When the user navigates to the Next/Previous month on the main view, the Mini Calendar should update to display that month.
   - When the user clicks a date in a different month inside the Mini Calendar, the main view should jump to that month grid.
   Using a unified store makes this synchronization atomic and simple.
3. **Resetting to Defaults**: In unit tests, the store can be easily reset using `useStore.setState(...)`.

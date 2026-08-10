import Dexie, { type Table } from 'dexie';

export interface CalendarEvent {
  id?: string; // CalDAV UID
  calendarId: string;
  title: string;
  startDate: string; // ISO String
  endDate: string; // ISO String
  location?: string;
  description?: string;
  lastModified: number; // UTC timestamp
}

export interface TodoTask {
  id?: string; // CalDAV UID
  calendarId: string;
  title: string;
  dueDate?: string; // ISO String
  completed: number; // 0 for active, 1 for completed (numeric for easier indexing)
  description?: string;
  lastModified: number; // UTC timestamp
}

export interface SyncQueueItem {
  id?: string;
  action: 'create' | 'update' | 'delete';
  entityType: 'event' | 'todo';
  payload: any;
  timestamp: number;
}

export class PersonalCalendarDB extends Dexie {
  events!: Table<CalendarEvent>;
  todos!: Table<TodoTask>;
  syncQueue!: Table<SyncQueueItem>;

  constructor() {
    super('PersonalCalendarDB');
    this.version(1).stores({
      events: 'id, calendarId, startDate, endDate',
      todos: 'id, calendarId, dueDate, completed',
      syncQueue: 'id, timestamp'
    });
  }
}

export const db = new PersonalCalendarDB();

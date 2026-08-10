import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../src/db/db';

describe('Local Database', () => {
  beforeEach(async () => {
    await db.events.clear();
    await db.todos.clear();
  });

  it('should add and retrieve an event', async () => {
    const event = {
      id: 'test-event-1',
      calendarId: 'personal',
      title: 'Test Meeting',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      lastModified: Date.now(),
    };

    await db.events.add(event);
    const retrieved = await db.events.get('test-event-1');
    expect(retrieved).toBeDefined();
    expect(retrieved?.title).toBe('Test Meeting');
  });

  it('should add and retrieve a todo task', async () => {
    const todo = {
      id: 'test-todo-1',
      calendarId: 'personal',
      title: 'Test Task',
      completed: 0,
      lastModified: Date.now(),
    };

    await db.todos.add(todo);
    const retrieved = await db.todos.get('test-todo-1');
    expect(retrieved).toBeDefined();
    expect(retrieved?.title).toBe('Test Task');
    expect(retrieved?.completed).toBe(0);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../src/store/useStore';
import { startOfMonth } from 'date-fns';

describe('Zustand store (AppState)', () => {
  beforeEach(() => {
    // Reset Zustand store state to defaults
    useStore.setState({
      selectedDate: new Date(2026, 7, 11), // Aug 11, 2026
      currentMonth: new Date(2026, 7, 11),
      activeTab: 'calendar',
    });
  });

  it('should change active tab', () => {
    const store = useStore.getState();
    expect(store.activeTab).toBe('calendar');
    
    store.setActiveTab('todos');
    expect(useStore.getState().activeTab).toBe('todos');
  });

  it('should update selected date and current month', () => {
    const store = useStore.getState();
    const newDate = new Date(2026, 8, 15); // Sep 15, 2026
    
    store.setSelectedDate(newDate);
    expect(useStore.getState().selectedDate.getTime()).toBe(newDate.getTime());

    const newMonth = startOfMonth(new Date(2026, 9, 1)); // Oct 1, 2026
    store.setCurrentMonth(newMonth);
    expect(useStore.getState().currentMonth.getTime()).toBe(newMonth.getTime());
  });
});

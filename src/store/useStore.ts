import { create } from 'zustand';

interface AppState {
  isOnline: boolean;
  activeTab: 'calendar' | 'todos';
  caldavUrl: string;
  caldavUser: string;
  isSyncing: boolean;
  selectedDate: Date;
  currentMonth: Date;
  setIsOnline: (status: boolean) => void;
  setActiveTab: (tab: 'calendar' | 'todos') => void;
  setCaldavCredentials: (url: string, user: string) => void;
  setIsSyncing: (syncing: boolean) => void;
  setSelectedDate: (date: Date) => void;
  setCurrentMonth: (month: Date) => void;
}

export const useStore = create<AppState>((set) => ({
  isOnline: navigator.onLine,
  activeTab: 'calendar',
  caldavUrl: '',
  caldavUser: '',
  isSyncing: false,
  selectedDate: new Date(),
  currentMonth: new Date(),
  setIsOnline: (status) => set({ isOnline: status }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setCaldavCredentials: (url, user) => set({ caldavUrl: url, caldavUser: user }),
  setIsSyncing: (syncing) => set({ isSyncing: syncing }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setCurrentMonth: (month) => set({ currentMonth: month }),
}));

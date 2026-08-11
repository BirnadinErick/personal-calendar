import { create } from 'zustand';

export type ThemeMode = 'system' | 'light' | 'dark';

interface AppState {
  isOnline: boolean;
  activeTab: 'calendar' | 'todos' | 'settings';
  caldavUrl: string;
  caldavUser: string;
  isSyncing: boolean;
  selectedDate: Date;
  currentMonth: Date;
  themeMode: ThemeMode;
  accentColorId: string;
  setIsOnline: (status: boolean) => void;
  setActiveTab: (tab: 'calendar' | 'todos' | 'settings') => void;
  setCaldavCredentials: (url: string, user: string) => void;
  setIsSyncing: (syncing: boolean) => void;
  setSelectedDate: (date: Date) => void;
  setCurrentMonth: (month: Date) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setAccentColorId: (id: string) => void;
}

const getSafeStorage = (key: string, fallback: string): string => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key) || fallback;
    }
  } catch (e) {
    // Ignore
  }
  return fallback;
};

const setSafeStorage = (key: string, value: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {
    // Ignore
  }
};

export const useStore = create<AppState>((set) => ({
  isOnline: navigator.onLine,
  activeTab: 'calendar',
  caldavUrl: '',
  caldavUser: '',
  isSyncing: false,
  selectedDate: new Date(),
  currentMonth: new Date(),
  themeMode: getSafeStorage('theme-mode', 'light') as ThemeMode,
  accentColorId: getSafeStorage('theme-accent', 'blue'),
  setIsOnline: (status) => set({ isOnline: status }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setCaldavCredentials: (url, user) => set({ caldavUrl: url, caldavUser: user }),
  setIsSyncing: (syncing) => set({ isSyncing: syncing }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setThemeMode: (themeMode) => set(() => {
    setSafeStorage('theme-mode', themeMode);
    return { themeMode };
  }),
  setAccentColorId: (accentColorId) => set(() => {
    setSafeStorage('theme-accent', accentColorId);
    return { accentColorId };
  }),
}));

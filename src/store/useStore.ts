import { create } from 'zustand';

interface AppState {
  isOnline: boolean;
  activeTab: 'calendar' | 'todos';
  caldavUrl: string;
  caldavUser: string;
  isSyncing: boolean;
  setIsOnline: (status: boolean) => void;
  setActiveTab: (tab: 'calendar' | 'todos') => void;
  setCaldavCredentials: (url: string, user: string) => void;
  setIsSyncing: (syncing: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  isOnline: navigator.onLine,
  activeTab: 'calendar',
  caldavUrl: '',
  caldavUser: '',
  isSyncing: false,
  setIsOnline: (status) => set({ isOnline: status }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setCaldavCredentials: (url, user) => set({ caldavUrl: url, caldavUser: user }),
  setIsSyncing: (syncing) => set({ isSyncing: syncing }),
}));

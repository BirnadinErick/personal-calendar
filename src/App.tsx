import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { applyTheme, ACCENT_COLORS } from './theme';
import { 
  Calendar, 
  CheckSquare, 
  Settings, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Sun, 
  Moon, 
  Monitor, 
  Palette 
} from 'lucide-react';

export default function App() {
  const { 
    isOnline, 
    setIsOnline, 
    activeTab, 
    setActiveTab, 
    themeMode, 
    setThemeMode, 
    accentColorId, 
    setAccentColorId 
  } = useStore();

  // Apply theme when themeMode or accentColorId changes
  useEffect(() => {
    applyTheme(themeMode, accentColorId);

    // If themeMode is system, listen to preferences dynamically
    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => {
        applyTheme('system', accentColorId);
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', listener);
      } else {
        mediaQuery.addListener(listener);
      }

      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', listener);
        } else {
          mediaQuery.removeListener(listener);
        }
      };
    }
    return undefined;
  }, [themeMode, accentColorId]);

  // Triggered when network status changes
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setIsOnline]);

  return (
    <div className="flex h-screen bg-bg-app text-text-main font-sans overflow-hidden transition-colors duration-200">
      {/* Sidebar Layout */}
      <aside className="w-64 bg-bg-sidebar border-r border-border-subtle flex flex-col justify-between p-4 transition-colors duration-200">
        <div>
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 px-2">
            <div className="bg-brand-primary p-2 rounded-xl text-white shadow-md shadow-brand-primary/20 transition-all duration-200">
              <Calendar size={20} />
            </div>
            <span className="font-semibold text-lg tracking-wide bg-gradient-to-r from-brand-primary to-brand-hover bg-clip-text text-transparent transition-all duration-200">
              Nebula Cal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-brand-light text-brand-text font-semibold shadow-xs'
                  : 'text-text-muted hover:bg-bg-hover hover:text-text-main'
              }`}
            >
              <Calendar size={18} />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setActiveTab('todos')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'todos'
                  ? 'bg-brand-light text-brand-text font-semibold shadow-xs'
                  : 'text-text-muted hover:bg-bg-hover hover:text-text-main'
              }`}
            >
              <CheckSquare size={18} />
              <span>Tasks & Todos</span>
            </button>
          </nav>
        </div>

        {/* Sync & Connection Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-bg-app border border-border-subtle text-xs transition-colors duration-200">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <>
                  <Wifi size={14} className="text-emerald-500" />
                  <span className="text-text-muted">Online</span>
                </>
              ) : (
                <>
                  <WifiOff size={14} className="text-rose-500" />
                  <span className="text-text-muted">Offline Caching</span>
                </>
              )}
            </div>
            <button className="text-text-muted hover:text-text-main transition-colors cursor-pointer">
              <RefreshCw size={12} className={isOnline ? "" : "animate-spin-slow"} />
            </button>
          </div>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-center space-x-2 px-3 py-2 border transition-all duration-200 rounded-lg text-xs cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-brand-light border-brand-primary/20 text-brand-text font-semibold'
                : 'border-border-subtle bg-transparent text-text-muted hover:bg-bg-hover hover:text-text-main'
            }`}
          >
            <Settings size={14} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Work Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-bg-app p-6 transition-colors duration-200">
        <header className="flex items-center justify-between pb-4 border-b border-border-subtle mb-6 transition-colors duration-200">
          <h1 className="text-2xl font-bold tracking-tight text-text-main capitalize">
            {activeTab === 'settings' ? 'Settings' : `${activeTab} View`}
          </h1>
          <div className="text-sm text-text-muted">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        {/* View Layouts */}
        <div className="flex-1 bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-xs relative overflow-hidden transition-colors duration-200">
          {activeTab === 'settings' ? (
            /* Settings View */
            <div className="max-w-2xl mx-auto space-y-8 py-4">
              {/* Appearance Section */}
              <section className="bg-bg-sidebar border border-border-subtle rounded-2xl p-6 shadow-xs transition-all duration-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-brand-light rounded-xl text-brand-text transition-colors duration-200">
                    <Sun size={20} className="dark:hidden" />
                    <Moon size={20} className="hidden dark:block" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-text-main">Appearance</h3>
                    <p className="text-xs text-text-muted">Customize how Nebula Cal looks on your device.</p>
                  </div>
                </div>

                {/* Theme Selector Toggle */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-text-main mb-3">Theme Mode</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['light', 'dark', 'system'] as const).map((mode) => {
                      const isActive = themeMode === mode;
                      const Icon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor;
                      const label = mode === 'light' ? 'Light' : mode === 'dark' ? 'Dark' : 'System';
                      
                      return (
                        <button
                          key={mode}
                          onClick={() => setThemeMode(mode)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'border-brand-primary bg-brand-light text-brand-text shadow-xs scale-[1.02]'
                              : 'border-border-subtle bg-bg-app text-text-muted hover:border-text-muted/30 hover:text-text-main'
                          }`}
                        >
                          <Icon size={20} className="mb-2" />
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Accent Color Selector */}
                <div>
                  <label className="block text-sm font-medium text-text-main mb-3 flex items-center space-x-1.5">
                    <Palette size={16} />
                    <span>Accent Color</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {ACCENT_COLORS.map((accent) => {
                      const isActive = accentColorId === accent.id;
                      return (
                        <button
                          key={accent.id}
                          onClick={() => setAccentColorId(accent.id)}
                          className="group relative flex items-center justify-center cursor-pointer focus:outline-hidden"
                          title={accent.name}
                        >
                          {/* Outer selection ring */}
                          <div
                            className={`absolute inset-0 -m-1.5 rounded-full border-2 transition-all duration-200 ${
                              isActive
                                ? 'border-brand-primary scale-100 opacity-100'
                                : 'border-transparent scale-75 opacity-0 group-hover:scale-95 group-hover:opacity-40 group-hover:border-text-muted'
                            }`}
                          />
                          {/* Inner color bubble */}
                          <div
                            className="w-8 h-8 rounded-full shadow-xs flex items-center justify-center text-white transition-all duration-200"
                            style={{ backgroundColor: accent.colorCode }}
                          >
                            {isActive && (
                              <svg
                                className="w-4 h-4 text-white drop-shadow-xs font-bold"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-text-muted mt-3">
                    Accent colors are based on Google Calendar themes with optimized shades for light and dark modes.
                  </p>
                </div>
              </section>

              {/* Server Credentials Section */}
              <section className="bg-bg-sidebar border border-border-subtle rounded-2xl p-6 shadow-xs transition-all duration-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-brand-light rounded-xl text-brand-text transition-colors duration-200">
                    <Settings size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-text-main">CalDAV Sync</h3>
                    <p className="text-xs text-text-muted">Configure connection details for your remote calendar server.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="caldav-url" className="block text-sm font-medium text-text-main mb-1.5">
                      Server URL
                    </label>
                    <input
                      id="caldav-url"
                      type="url"
                      placeholder="https://caldav.example.com/principals/user/"
                      className="w-full px-3.5 py-2 border border-border-subtle rounded-xl bg-bg-app text-text-main placeholder-text-muted/50 text-sm focus:outline-hidden focus:border-brand-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="caldav-username" className="block text-sm font-medium text-text-main mb-1.5">
                      Username
                    </label>
                    <input
                      id="caldav-username"
                      type="text"
                      placeholder="username"
                      className="w-full px-3.5 py-2 border border-border-subtle rounded-xl bg-bg-app text-text-main placeholder-text-muted/50 text-sm focus:outline-hidden focus:border-brand-primary transition-colors"
                    />
                  </div>
                  
                  <button className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white rounded-xl text-sm font-medium transition-colors shadow-xs cursor-pointer">
                    Save Connection Settings
                  </button>
                </div>
              </section>
            </div>
          ) : (
            /* Main Dashboard Welcome Card */
            <div className="h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-transparent to-transparent pointer-events-none" />
              <div className="text-center">
                <p className="text-brand-text text-sm font-medium mb-2 bg-brand-light px-3 py-1 rounded-full inline-block">
                  Workspace Ready
                </p>
                <h2 className="text-2xl font-bold text-text-main mb-2">
                  Welcome to Nebula Cal
                </h2>
                <p className="text-text-muted text-sm max-w-sm mx-auto mb-6">
                  Successfully loaded the personal-calendar application workspace. Toggle themes and accents in settings!
                </p>
                <p className="text-text-muted text-xs">
                  Edit <code className="text-brand-text bg-brand-light px-1.5 py-0.5 rounded font-mono">src/App.tsx</code> to begin coding.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

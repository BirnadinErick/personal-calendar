import React from 'react';
import { Calendar, CheckSquare, Settings, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useStore } from './store/useStore';
import MiniCalendar from './components/MiniCalendar';
import CalendarMonthView from './components/CalendarMonthView';

export default function App() {
  const { isOnline, activeTab, setIsOnline, setActiveTab } = useStore();

  // Triggered when network status changes
  React.useEffect(() => {
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
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar Layout */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4">
        <div>
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 px-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
              <Calendar size={20} />
            </div>
            <span className="font-semibold text-lg tracking-wide bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Nebula Cal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 mb-6">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                activeTab === 'calendar'
                  ? 'bg-slate-800/80 text-white font-medium shadow-inner'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <Calendar size={18} />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setActiveTab('todos')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                activeTab === 'todos'
                  ? 'bg-slate-800/80 text-white font-medium shadow-inner'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <CheckSquare size={18} />
              <span>Tasks & Todos</span>
            </button>
          </nav>

          {/* Mini Calendar widget */}
          {activeTab === 'calendar' && (
            <div className="px-1 border-t border-slate-800/50 pt-6">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block mb-3 px-2">
                Mini Calendar
              </span>
              <MiniCalendar />
            </div>
          )}
        </div>

        {/* Sync & Connection Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-slate-800/30 border border-slate-800/50 text-xs">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <>
                  <Wifi size={14} className="text-emerald-400" />
                  <span className="text-slate-300">Online</span>
                </>
              ) : (
                <>
                  <WifiOff size={14} className="text-rose-400" />
                  <span className="text-slate-400">Offline Caching</span>
                </>
              )}
            </div>
            <button className="text-slate-500 hover:text-slate-300 transition-colors">
              <RefreshCw size={12} className="animate-spin-slow" />
            </button>
          </div>

          <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-slate-800 hover:bg-slate-800/50 text-slate-300 rounded-lg text-xs transition-colors">
            <Settings size={14} />
            <span>Server Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Work Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-950 p-6">
        <header className="flex items-center justify-between pb-4 border-b border-slate-900 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white capitalize">
            {activeTab} View
          </h1>
          <div className="text-sm text-slate-400">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        {/* View Layouts */}
        {activeTab === 'calendar' ? (
          <CalendarMonthView />
        ) : (
          <div className="flex-1 bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-purple-500/0 to-transparent pointer-events-none" />
            <div className="text-center">
              <CheckSquare size={48} className="text-slate-600 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-slate-200">
                Tasks & Todos
              </h2>
              <p className="text-slate-500 text-xs mt-2">
                Task management and CalDAV sync functionality is available.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

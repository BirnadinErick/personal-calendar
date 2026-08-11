import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns';
import { useStore } from '../store/useStore';
import { db, CalendarEvent } from '../db/db';
import AddEventModal from './AddEventModal';

export default function CalendarMonthView() {
  const { selectedDate, currentMonth, setSelectedDate, setCurrentMonth } = useStore();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [modalInitialDate, setModalInitialDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all'); // 'all', 'work', 'personal', 'meeting', 'task', 'important'

  // Load events from DB
  const loadEvents = async () => {
    try {
      const allEvents = await db.events.toArray();
      setEvents(allEvents);
    } catch (err) {
      console.error('Failed to load events:', err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  // Monday start
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
  };

  const handleOpenAddModal = (date: Date, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingEvent(null);
    setModalInitialDate(date);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // Filter events based on active category tab and search query
  const filteredEvents = events.filter((evt) => {
    const matchesCategory = activeFilter === 'all' || evt.calendarId === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.description && evt.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (evt.location && evt.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter((evt) => {
      const evtStart = new Date(evt.startDate);
      return isSameDay(day, evtStart);
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  };

  const formatEventTime = (isoString: string) => {
    return format(new Date(isoString), 'h:mm a');
  };

  const getCategoryColorStyles = (category: string) => {
    switch (category) {
      case 'work':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25 hover:bg-indigo-500/20';
      case 'personal':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20';
      case 'meeting':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/25 hover:bg-purple-500/20';
      case 'task':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/25 hover:bg-amber-500/20';
      case 'important':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/25 hover:bg-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/25 hover:bg-slate-500/20';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-950/20">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-900 mb-5">
        {/* Category Tabs */}
        <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800/80 self-start">
          {[
            { id: 'all', label: 'All events' },
            { id: 'work', label: 'Work' },
            { id: 'personal', label: 'Personal' },
            { id: 'meeting', label: 'Meetings' },
            { id: 'task', label: 'Tasks' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === tab.id
                  ? 'bg-slate-800 text-white shadow-inner font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800/80 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/50 text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-4 py-2 text-xs outline-none transition-all"
          />
        </div>
      </div>

      {/* Navigation and Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 select-none">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {format(monthStart, 'MMM d, yyyy')} - {format(monthEnd, 'MMM d, yyyy')}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Prev/Next Month */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <button
              onClick={handlePrevMonth}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="w-[1px] bg-slate-800" />
            <button
              onClick={handleNextMonth}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button
            onClick={handleToday}
            className="px-3 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold rounded-lg transition-colors"
          >
            Today
          </button>

          {/* View Dropdown Mock */}
          <div className="relative">
            <select
              disabled
              className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 cursor-not-allowed opacity-90"
            >
              <option>Month view</option>
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-500 text-[10px]">
              ▼
            </span>
          </div>

          {/* Add Event */}
          <button
            onClick={(e) => handleOpenAddModal(selectedDate, e)}
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-indigo-600/10 transition-all"
          >
            <Plus size={14} />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="flex-1 min-h-[400px] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col bg-slate-900/10">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-900/40 text-center text-xs font-semibold text-slate-400 py-3">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>

        {/* Days Grid Cells */}
        <div className="grid grid-cols-7 flex-1 divide-x divide-y divide-slate-800/70 border-l border-t border-slate-800/0">
          {days.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isDayToday = isToday(day);
            const isSelected = isSameDay(day, selectedDate);
            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={idx}
                onClick={(e) => {
                  setSelectedDate(day);
                  handleOpenAddModal(day, e);
                }}
                className={`min-h-[100px] p-2 flex flex-col justify-between group transition-all cursor-pointer relative ${
                  isCurrentMonth ? 'bg-slate-900/10' : 'bg-slate-950/20'
                } ${
                  isSelected ? 'ring-1 ring-indigo-500/40 bg-indigo-500/[0.02]' : 'hover:bg-slate-800/[0.15]'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      isDayToday
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : isCurrentMonth
                        ? 'text-slate-300 group-hover:text-white'
                        : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                  {/* Plus button visible on cell hover */}
                  <span className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-indigo-400 p-0.5 rounded transition-all">
                    <Plus size={12} />
                  </span>
                </div>

                {/* Day Events Container */}
                <div className="flex-1 flex flex-col gap-1 overflow-y-auto max-h-[85px] no-scrollbar">
                  {dayEvents.slice(0, 3).map((evt) => (
                    <div
                      key={evt.id}
                      onClick={(e) => handleOpenEditModal(evt, e)}
                      className={`px-2 py-1 text-[10px] font-medium border rounded-md truncate transition-all select-none ${getCategoryColorStyles(
                        evt.calendarId
                      )}`}
                      title={`${evt.title} (${formatEventTime(evt.startDate)} - ${formatEventTime(
                        evt.endDate
                      )})`}
                    >
                      <div className="font-semibold truncate">{evt.title}</div>
                      <div className="opacity-75 text-[9px]">{formatEventTime(evt.startDate)}</div>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-[9px] font-medium text-slate-500 pl-2">
                      + {dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add / Edit Event Modal */}
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDate={modalInitialDate}
        eventToEdit={editingEvent}
        onSave={loadEvents}
      />
    </div>
  );
}

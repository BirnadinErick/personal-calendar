import { ChevronLeft, ChevronRight } from 'lucide-react';
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

export default function MiniCalendar() {
  const { selectedDate, currentMonth, setSelectedDate, setCurrentMonth } = useStore();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  // weekStartsOn: 1 means Monday start
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // If the clicked date is in a different month, update currentMonth to keep views in sync
    if (!isSameMonth(date, currentMonth)) {
      setCurrentMonth(startOfMonth(date));
    }
  };

  return (
    <div className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl p-3 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-300">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <div className="flex space-x-1">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-[10px] font-medium text-slate-500 mb-1">
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
      </div>

      {/* Grid Days */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-0.5">
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = isSameDay(day, selectedDate);
          const isDayToday = isToday(day);

          return (
            <button
              key={idx}
              onClick={() => handleDateClick(day)}
              className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-[11px] font-medium transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : isDayToday
                  ? 'border border-indigo-500/50 text-indigo-400'
                  : isCurrentMonth
                  ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'text-slate-600 hover:bg-slate-800/50 hover:text-slate-400'
              }`}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}

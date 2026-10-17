import React, { useState, useEffect } from 'react';
import { X, Calendar as CalIcon, MapPin, AlignLeft, Tag, Trash2 } from 'lucide-react';
import { db, CalendarEvent } from '../db/db';
import { format } from 'date-fns';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
  eventToEdit?: CalendarEvent | null;
  onSave: () => void;
}

const CATEGORIES = [
  { id: 'work', name: 'Work', color: 'indigo' },
  { id: 'personal', name: 'Personal', color: 'emerald' },
  { id: 'meeting', name: 'Meeting', color: 'purple' },
  { id: 'task', name: 'Task', color: 'amber' },
  { id: 'important', name: 'Important', color: 'rose' },
];

export default function AddEventModal({
  isOpen,
  onClose,
  initialDate,
  eventToEdit,
  onSave,
}: AddEventModalProps) {
  const [title, setTitle] = useState('');
  const [calendarId, setCalendarId] = useState('work');
  const [startDateStr, setStartDateStr] = useState('');
  const [endDateStr, setEndDateStr] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      if (eventToEdit) {
        setTitle(eventToEdit.title);
        setCalendarId(eventToEdit.calendarId || 'work');
        // Convert ISO to datetime-local compatible string (YYYY-MM-DDTHH:MM)
        setStartDateStr(eventToEdit.startDate.substring(0, 16));
        setEndDateStr(eventToEdit.endDate.substring(0, 16));
        setLocation(eventToEdit.location || '');
        setDescription(eventToEdit.description || '');
      } else {
        setTitle('');
        setCalendarId('work');
        const start = initialDate ? new Date(initialDate) : new Date();
        start.setHours(9, 0, 0, 0); // default to 9:00 AM
        const end = new Date(start);
        end.setHours(10, 0, 0, 0); // default to 10:00 AM

        setStartDateStr(format(start, "yyyy-MM-dd'T'HH:mm"));
        setEndDateStr(format(end, "yyyy-MM-dd'T'HH:mm"));
        setLocation('');
        setDescription('');
      }
    }
  }, [isOpen, eventToEdit, initialDate]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter an event title.');
      return;
    }

    const startISO = new Date(startDateStr).toISOString();
    const endISO = new Date(endDateStr).toISOString();

    if (new Date(startISO) >= new Date(endISO)) {
      setError('End date & time must be after the start date & time.');
      return;
    }

    const eventData: CalendarEvent = {
      title: title.trim(),
      calendarId,
      startDate: startISO,
      endDate: endISO,
      location: location.trim() || undefined,
      description: description.trim() || undefined,
      lastModified: Date.now(),
    };

    try {
      if (eventToEdit && eventToEdit.id) {
        eventData.id = eventToEdit.id;
        await db.events.put(eventData);
      } else {
        eventData.id = crypto.randomUUID();
        await db.events.add(eventData);
      }
      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to save the event. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (eventToEdit && eventToEdit.id) {
      if (confirm('Are you sure you want to delete this event?')) {
        try {
          await db.events.delete(eventToEdit.id);
          onSave();
          onClose();
        } catch (err) {
          console.error(err);
          setError('Failed to delete the event.');
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/50">
          <h3 className="text-base font-semibold text-white">
            {eventToEdit ? 'Edit Event' : 'Create Event'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 flex-1 overflow-y-auto">
          {error && (
            <div className="p-3 text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Title</label>
            <input
              type="text"
              placeholder="e.g. Weekly Sync Meeting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 placeholder-slate-600 rounded-lg px-3 py-2 text-sm outline-none transition-all"
              autoFocus
            />
          </div>

          {/* Category Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Tag size={12} /> Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = calendarId === cat.id;
                let activeClass = '';
                if (cat.color === 'indigo') activeClass = 'bg-indigo-600/20 text-indigo-400 border-indigo-500/40';
                if (cat.color === 'emerald') activeClass = 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40';
                if (cat.color === 'purple') activeClass = 'bg-purple-600/20 text-purple-400 border-purple-500/40';
                if (cat.color === 'amber') activeClass = 'bg-amber-600/20 text-amber-400 border-amber-500/40';
                if (cat.color === 'rose') activeClass = 'bg-rose-600/20 text-rose-400 border-rose-500/40';

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCalendarId(cat.id)}
                    className={`px-3 py-1.5 border border-slate-800 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? activeClass
                        : 'text-slate-500 hover:text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <CalIcon size={12} /> Starts
              </label>
              <input
                type="datetime-local"
                value={startDateStr}
                onChange={(e) => setStartDateStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 rounded-lg px-3 py-2 text-sm outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <CalIcon size={12} /> Ends
              </label>
              <input
                type="datetime-local"
                value={endDateStr}
                onChange={(e) => setEndDateStr(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 rounded-lg px-3 py-2 text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <MapPin size={12} /> Location
            </label>
            <input
              type="text"
              placeholder="e.g. Conference Room A, Zoom"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 placeholder-slate-600 rounded-lg px-3 py-2 text-sm outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <AlignLeft size={12} /> Description
            </label>
            <textarea
              placeholder="Add details about this event..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 placeholder-slate-600 rounded-lg px-3 py-2 text-sm outline-none resize-none transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-6">
            {eventToEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            ) : (
              <div />
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/20 transition-all"
              >
                {eventToEdit ? 'Save Changes' : 'Add Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { Sidebar } from "@/src/components/layout/navbar";
import { Search, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  // View & Date State
  const [viewMode, setViewMode] = useState('year'); // 'year' | 'month' | 'week'
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Brand colors for the grids
  const bgColors = [
    'bg-white/5',                 // Level 0 (Empty)
    'bg-[#008235]/40 text-white', // Level 1
    'bg-[#008235]/60 text-white', // Level 2
    'bg-[#008235]/80 text-white', // Level 3
    'bg-[#008235] text-white'     // Level 4
  ];

  // --- NAVIGATION LOGIC ---
  const isNextDisabled = () => {
    const now = new Date();
    
    if (viewMode === 'year') {
      return currentDate.getFullYear() >= now.getFullYear();
    }
    
    if (viewMode === 'month') {
      return (
        currentDate.getFullYear() > now.getFullYear() ||
        (currentDate.getFullYear() === now.getFullYear() && currentDate.getMonth() >= now.getMonth())
      );
    }
    
    if (viewMode === 'week') {
      const getStartOfWeek = (d: Date) => {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        date.setDate(diff);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      };
      return getStartOfWeek(currentDate) >= getStartOfWeek(now);
    }
    
    return false;
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'year') newDate.setFullYear(newDate.getFullYear() - 1);
    else if (viewMode === 'month') newDate.setMonth(newDate.getMonth() - 1);
    else if (viewMode === 'week') newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    if (isNextDisabled()) return; // Guard clause
    const newDate = new Date(currentDate);
    if (viewMode === 'year') newDate.setFullYear(newDate.getFullYear() + 1);
    else if (viewMode === 'month') newDate.setMonth(newDate.getMonth() + 1);
    else if (viewMode === 'week') newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // --- DYNAMIC TITLES ---
  const getInnerHeaderTitle = () => {
    if (viewMode === 'year') {
      return currentDate.getFullYear().toString();
    }
    if (viewMode === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    if (viewMode === 'week') {
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
      startOfWeek.setDate(diff);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const startStr = startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endStr = endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `Week of ${startStr} – ${endStr}`;
    }
  };

  // --- RENDER HELPERS ---
  const renderYearView = () => (
    <div className="overflow-x-auto w-full animate-in fade-in duration-300">
      <div className="min-w-[750px] flex flex-col gap-2 w-full">
        <div className="flex justify-between text-xs text-gray-500 w-full px-1">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
        <div suppressHydrationWarning className="grid grid-rows-7 grid-flow-col justify-between gap-y-1 w-full">
          {Array.from({ length: 364 }).map((_, index) => {
            // Pseudo-random generation so it re-renders on date changes
            const rand = Math.random();
            let level = 0;
            if (rand > 0.95) level = 4;
            else if (rand > 0.85) level = 3;
            else if (rand > 0.70) level = 2;
            else if (rand > 0.50) level = 1;

            return (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm transition-colors duration-300 ${bgColors[level]}`}
                title={`Activity level ${level}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Standard 35-cell calendar grid
    const cells = Array.from({ length: 35 }, (_, i) => {
      const isCurrentMonth = i >= firstDay && i < firstDay + daysInMonth;
      const dayNum = isCurrentMonth 
        ? i - firstDay + 1 
        : (i < firstDay ? prevMonthDays - firstDay + i + 1 : i - firstDay - daysInMonth + 1);
      const level = isCurrentMonth && Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0;
      
      return { day: dayNum, isCurrentMonth, level };
    });

    return (
      <div className="w-full animate-in fade-in duration-300">
        <div className="grid grid-cols-7 mb-2 text-center text-xs font-semibold text-gray-500">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
        </div>
        <div suppressHydrationWarning className="grid grid-cols-7 gap-2">
          {cells.map((data, index) => (
            <div 
              key={index} 
              // Changed from aspect-square to a tighter fixed height
              className={`h-16 md:h-20 rounded-lg flex flex-col items-center justify-center transition-colors duration-300 ${bgColors[data.level]} ${!data.isCurrentMonth && 'opacity-20'}`}
            >
              <span className="font-bold text-lg">{data.day}</span>
              {data.level > 0 && (
                <span className="text-[10px] md:text-xs font-medium opacity-80 text-center">
                  {data.level} session{data.level > 1 ? 's' : ''}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      return {
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        isWeekend: d.getDay() === 0 || d.getDay() === 6
      };
    });

    const timeSlots = ['6–11 AM', '12–4 PM', '5–9 PM', '9 PM–1 AM'];

    return (
      <div className="w-full overflow-x-auto animate-in fade-in duration-300">
        <div className="min-w-[800px]">
          {/* Week Header */}
          <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-2">
            <div></div> {/* Empty top-left cell */}
            {days.map((d, idx) => (
              <div key={idx} className="flex flex-col items-center text-sm">
                <span className="text-gray-500 font-semibold">{d.name}</span>
                <span className={`font-bold text-lg ${d.isWeekend ? 'text-blue-400' : 'text-white'}`}>{d.date}</span>
              </div>
            ))}
          </div>
          
          {/* Week Grid */}
          <div suppressHydrationWarning className="flex flex-col gap-2">
            {timeSlots.map((slot) => (
              <div key={slot} className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 items-center">
                <div className="text-xs text-gray-500 font-medium text-right pr-4">{slot}</div>
                {days.map((_, colIndex) => {
                  const level = Math.random() > 0.5 ? Math.floor(Math.random() * 4) + 1 : 0;
                  return (
                    <div 
                      key={colIndex} 
                      className={`h-14 rounded-lg flex items-center justify-center transition-colors duration-300 font-bold ${bgColors[level]}`}
                    >
                      {level > 0 ? level : ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden font-inter text-white">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="max-w-6xl w-full mx-auto space-y-12">
          
          {/* Top Bar: Search & Settings */}
          <div className="flex justify-between items-center">
            <div className="relative w-64 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#141414] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#008235] transition-colors"
              />
            </div>
            <button className="bg-[#008235] hover:bg-green-700 transition-colors p-2.5 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Greeting Section */}
          <div className="flex flex-col">
            <h1 suppressHydrationWarning className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {greeting}, Jules
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              Ready to run a session?
            </p>
          </div>

          {/* QM Activity Section */}
          <div className="bg-[#141414] border border-white/10 rounded-xl p-6 flex flex-col w-full">
            
            {/* Outer Header & Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              
              {/* Added Explanatory Subtext here */}
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white mb-1">
                  QM Activity
                </h2>
                <p className="text-sm text-gray-400">
                  See how often you run sessions.
                </p>
              </div>
              
              <div className="relative">
                <select 
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="appearance-none bg-transparent border border-white/10 text-white text-sm rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-[#008235] cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <option value="year" className="bg-[#141414]">Year</option>
                  <option value="month" className="bg-[#141414]">Month</option>
                  <option value="week" className="bg-[#141414]">Week</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Inner Gray Container */}
            <div className="bg-[#181818] border border-white/5 rounded-xl p-6 flex flex-col gap-6">
              
              {/* Inner Header with Dynamic Title & Nav */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 suppressHydrationWarning className="text-lg font-bold text-white">
                  {getInnerHeaderTitle()}
                </h3>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrev} 
                    className="px-4 py-1.5 rounded-lg border border-white/10 text-sm hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    &larr; Prev
                  </button>
                  <button 
                    onClick={handleNext} 
                    disabled={isNextDisabled()}
                    className={`px-4 py-1.5 rounded-lg border border-white/10 text-sm transition-colors ${
                      isNextDisabled() ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/5 cursor-pointer'
                    }`}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>

              {/* Dynamic Grid Rendering */}
              {viewMode === 'year' && renderYearView()}
              {viewMode === 'month' && renderMonthView()}
              {viewMode === 'week' && renderWeekView()}

            </div>

            {/* Legend (Less -> More) */}
            <div className="flex items-center justify-end gap-1.5 text-xs text-gray-400 mt-4 w-full border-t border-white/5 pt-4">
              <span className="mr-1">Less</span>
              <div className="w-3 h-3 rounded-sm bg-white/5"></div>
              <div className="w-3 h-3 rounded-sm bg-[#008235]/30"></div>
              <div className="w-3 h-3 rounded-sm bg-[#008235]/60"></div>
              <div className="w-3 h-3 rounded-sm bg-[#008235]/80"></div>
              <div className="w-3 h-3 rounded-sm bg-[#008235]"></div>
              <span className="ml-1">More</span>
            </div>

          </div>

          {/* Content Grids */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full">
            <div className="bg-[#141414] border border-white/10 rounded-xl p-6 min-h-[250px] flex flex-col">
              <h3 className="font-bold text-lg mb-4 text-white">Active Sessions</h3>
              <div className="flex-1 border-2 border-dashed border-white/5 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">No active sessions</span>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-xl p-6 min-h-[250px] flex flex-col">
              <h3 className="font-bold text-lg mb-4 text-white">Recent Sessions</h3>
              <div className="flex-1 border-2 border-dashed border-white/5 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">No history found</span>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-xl p-6 min-h-[250px] flex flex-col">
              <h3 className="font-bold text-lg mb-4 text-white">Player Registry</h3>
              <div className="flex-1 border-2 border-dashed border-white/5 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Registry empty</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
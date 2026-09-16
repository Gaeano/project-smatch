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

  // Updated to generate activity levels from 0 to 4 instead of booleans
  const [activityMap] = useState(() => 
    Array.from({ length: 364 }, () => {
      // Skew the randomizer so there are more empty days (0) than highly active days (4)
      const rand = Math.random();
      if (rand > 0.95) return 4;
      if (rand > 0.85) return 3;
      if (rand > 0.70) return 2;
      if (rand > 0.50) return 1;
      return 0;
    })
  );

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

          {/* QM Activity Grid */}
          <div className="bg-[#141414] border border-white/10 rounded-xl p-6 flex flex-col w-full">
            
            {/* Header & Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">QM Activity</h2>
                <p suppressHydrationWarning className="text-sm text-gray-400 mt-1">
                  Your activity for this year {new Date().getFullYear()}
                </p>
              </div>
              
              {/* Dropdowns / Buttons */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select className="appearance-none bg-transparent border border-white/10 text-white text-sm rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-[#008235] cursor-pointer hover:bg-white/5 transition-colors">
                    <option value="year" className="bg-[#141414]">Year</option>
                    <option value="month" className="bg-[#141414]">Month</option>
                    <option value="week" className="bg-[#141414]">Week</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Scrollable Container for Grid and Months */}
            <div className="overflow-x-auto pb-4 w-full">
              <div className="min-w-[750px] flex flex-col gap-2 w-full">
                
                {/* Months Row */}
                <div className="flex justify-between text-xs text-gray-500 w-full px-1">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>

                {/* 52-Week Activity Grid */}
                <div suppressHydrationWarning className="grid grid-rows-7 grid-flow-col justify-between gap-y-1 w-full">
                  {activityMap.map((level, index) => {
                    const bgColors = [
                      'bg-white/5', 
                      'bg-[#008235]/30', 
                      'bg-[#008235]/60', 
                      'bg-[#008235]/80', 
                      'bg-[#008235]'
                    ];
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
            
            {/* Legend (Less -> More) */}
            <div className="flex items-center justify-end gap-1.5 text-xs text-gray-400 mt-2 w-full">
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
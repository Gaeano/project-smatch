'use client';
import {Home, Layers, Plus, LogOut, PanelLeft} from "lucide-react";
import {useState} from "react";
import Link from "next/link";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`relative h-screen bg-[#0A0A0A] border-r border-white/10 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col w-full">
        
        {/* Header & Toggle */}
        <div className={`flex items-center h-20 px-6 ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <p className={`text-white text-3xl font-bebas tracking-widest overflow-hidden transition-all duration-300 ${
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}>
            SMATCH
          </p>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <PanelLeft size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 px-4 mt-4">
          
          {/* Quick Start Button */}
          <button className="flex items-center gap-3 w-full bg-white text-black p-3 rounded-lg hover:bg-gray-200 transition-colors mb-6 group font-semibold">
            <div className="flex items-center justify-center min-w-[24px]">
              <Plus size={20} className="text-black" />
            </div>
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
            }`}>
              Quick Create
            </span>
          </button>

          <p className={`text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 overflow-hidden whitespace-nowrap transition-all ${isCollapsed ? "hidden" : "block px-2"}`}>
            Dashboards
          </p>

          {/* Home (Active) */}
          <Link 
            href="/" 
            className="flex items-center gap-3 w-full bg-[#008235] text-white p-3 rounded-lg transition-colors font-medium"
          >
            <div className="flex items-center justify-center min-w-[24px]">
              <Home size={20} />
            </div>
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
            }`}>
              Home
            </span>
          </Link>

          {/* Sessions */}
          <Link 
            href="/sessions" 
            className="flex items-center gap-3 w-full text-gray-400 hover:text-white hover:bg-white/5 p-3 rounded-lg transition-colors font-medium"
          >
            <div className="flex items-center justify-center min-w-[24px]">
              <Layers size={20} />
            </div>
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
            }`}>
              Sessions
            </span>
          </Link>

        </div>
      </div>

      {/* Bottom Section: Profile */}
      <div className={`transition-all duration-300 ${isCollapsed ? "p-3" : "p-4"}`}>
        <div className={`flex items-center bg-gradient-to-br from-[#008235] to-green-800 rounded-xl transition-all duration-300 ${
          isCollapsed ? "justify-center p-2" : "justify-between p-3 gap-3"
        }`}>
          
          <div className={`flex items-center overflow-hidden transition-all duration-300 ${isCollapsed ? "gap-0" : "gap-3"}`}>
            <div className="min-w-[36px] w-[36px] h-[36px] rounded-md bg-white/20 overflow-hidden flex-shrink-0">
              <img 
                src="https://github.com/ladajules.png" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className={`flex flex-col overflow-hidden whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}>
              <p className="text-white text-sm font-bold leading-tight">Jules Gimenez</p>
              <p className="text-white/70 text-xs leading-tight">juleslada35@gmail.com</p>
            </div>
          </div>

          {!isCollapsed && (
            <button className="text-white/80 hover:text-white transition-colors flex-shrink-0">
              <LogOut size={18} />
            </button>
          )}

        </div>
      </div>
    </aside>
  );
}
import React, { useState } from 'react';
import { View, Theme, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Home, MessageSquare, Settings, User, Box, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setView: (view: View) => void;
  language: Language;
  theme: Theme;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, language, theme }) => {
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navItems = [
    { id: 'home', icon: Home, label: t.home },
    { id: 'chats', icon: MessageSquare, label: t.chats },
    { id: 'settings', icon: Settings, label: t.settings },
    { id: 'profile', icon: User, label: t.profile },
    { id: 'products', icon: Box, label: t.products },
    { id: 'help', icon: HelpCircle, label: t.help },
  ];

  return (
    <div className={`flex flex-col h-full w-full overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black text-zinc-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Dynamic Header */}
      <header className={`px-6 py-4 safe-pt flex items-center justify-between border-b transition-colors duration-300 ${isDark ? 'bg-black/80 border-zinc-800' : 'bg-white/80 border-slate-200'} backdrop-blur-md z-50`}>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className={`font-black text-lg tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>Element</span>
            <span className="intelligent-gradient font-black text-lg tracking-tight">Intelligent</span>
          </div>
          <span className="text-blue-500 font-black text-[9px] tracking-[0.4em] uppercase opacity-80">CeloraAI Platform</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-blue-500/20">
          C2
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <div className="w-full h-full max-w-xl mx-auto flex flex-col">
          {children}
        </div>
      </main>

      {/* Navigation Layer */}
      <div className={`fixed bottom-0 left-0 right-0 z-[60] safe-pb transition-all duration-500 transform ${isNavVisible ? 'translate-y-0' : 'translate-y-[80%]'}`}>
        {/* Toggle Bar */}
        <div className="flex justify-center -mb-2">
            <button 
              onClick={() => setIsNavVisible(!isNavVisible)}
              className={`flex items-center space-x-2 px-6 py-2 rounded-t-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all backdrop-blur-md ${
                isDark ? 'bg-zinc-900/90 text-zinc-500 border-x border-t border-zinc-800' : 'bg-white/90 border border-slate-200 text-slate-400 shadow-xl'
              }`}
            >
              {isNavVisible ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
        </div>

        {/* Bottom Nav */}
        <nav className={`px-2 py-3 flex justify-around items-center backdrop-blur-xl border-t transition-all ${
            isDark ? 'bg-zinc-950/95 border-zinc-800 text-zinc-400' : 'bg-white/95 border-slate-200 text-slate-400 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]'
          }`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as View)}
                className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 relative ${
                  isActive 
                    ? 'text-blue-500' 
                    : (isDark ? 'hover:text-zinc-200' : 'hover:text-slate-700')
                }`}
              >
                {isActive && <div className="absolute -top-3 w-1 h-1 bg-blue-500 rounded-full blur-[1px]"></div>}
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[7px] mt-1.5 font-black uppercase tracking-widest text-center line-clamp-1">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
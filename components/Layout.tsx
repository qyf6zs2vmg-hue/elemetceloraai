
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
    <div className={`flex flex-col h-screen-dynamic overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Branding Header */}
      <header className={`p-4 pt-safe flex flex-col items-center border-b transition-colors duration-300 ${isDark ? 'bg-black border-zinc-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center space-x-2">
          <span className={`font-black text-xl tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'}`}>Element</span>
          <span className="intelligent-gradient font-black text-xl tracking-tight">Intelligent</span>
        </div>
        <div className="flex items-center space-x-2 mt-0.5">
          <span className="text-blue-500 font-black text-[10px] tracking-[0.3em] uppercase">CeloraAI</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative pb-4">
        <div className="max-w-2xl mx-auto h-full">
          {children}
        </div>
      </main>

      {/* Navigation Control Button */}
      <div className="flex justify-center mb-1">
        <button 
          onClick={() => setIsNavVisible(!isNavVisible)}
          className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
            isDark ? 'bg-zinc-900 text-zinc-500 hover:text-blue-500' : 'bg-white border border-slate-200 text-slate-400 hover:text-blue-500'
          }`}
        >
          {isNavVisible ? (
            <>
              <ChevronDown size={14} />
              <span>{t.hideNav}</span>
            </>
          ) : (
            <>
              <ChevronUp size={14} />
              <span>{t.showNav}</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className={`pb-safe pt-2 px-1 border-t flex justify-around items-center transition-all duration-300 ${
        isNavVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none h-0 pt-0 border-none'
      } ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200 shadow-2xl'}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`flex flex-col items-center py-2 px-1.5 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'text-blue-500 scale-110' 
                  : (isDark ? 'text-zinc-500' : 'text-slate-400')
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[8px] mt-1 font-black uppercase tracking-tighter text-center line-clamp-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
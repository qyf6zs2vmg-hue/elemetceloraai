
import React from 'react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';
import { Moon, Sun, Globe, LogOut, ChevronRight } from 'lucide-react';

interface SettingsProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ language, setLanguage, theme, setTheme, onLogout }) => {
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'Русский' },
    { code: 'uz', label: "O'zbekcha" },
    { code: 'en', label: 'English' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold tracking-tight mb-8">{t.settings}</h2>

      <div className="space-y-6">
        {/* Language Selection */}
        <section className={`p-5 rounded-3xl ${isDark ? 'bg-zinc-900' : 'bg-white shadow-sm border border-slate-100'}`}>
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="text-blue-500" />
            <h3 className="font-bold">{t.language}</h3>
          </div>
          <div className="flex flex-col space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                  language === lang.code 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : (isDark ? 'hover:bg-zinc-800 text-slate-300' : 'hover:bg-slate-50 text-slate-600')
                }`}
              >
                <span className="font-medium">{lang.label}</span>
                {language === lang.code && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </button>
            ))}
          </div>
        </section>

        {/* Theme Selection */}
        <section className={`p-5 rounded-3xl ${isDark ? 'bg-zinc-900' : 'bg-white shadow-sm border border-slate-100'}`}>
          <div className="flex items-center space-x-3 mb-6">
            <Sparkles className="text-blue-500" />
            <h3 className="font-bold">{t.theme}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${
                theme === 'light' 
                  ? 'border-blue-500 bg-blue-50 text-blue-600' 
                  : (isDark ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-400')
              }`}
            >
              <Sun size={24} className="mb-2" />
              <span className="text-sm font-bold">{t.lightMode}</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${
                theme === 'dark' 
                  ? 'border-blue-500 bg-zinc-800 text-blue-400 shadow-xl' 
                  : (isDark ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-400')
              }`}
            >
              <Moon size={24} className="mb-2" />
              <span className="text-sm font-bold">{t.darkMode}</span>
            </button>
          </div>
        </section>

        {/* General Actions */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center justify-between p-5 rounded-3xl transition-all ${
            isDark ? 'bg-zinc-900 text-red-400 hover:bg-zinc-800' : 'bg-white text-red-500 shadow-sm border border-slate-100 hover:bg-red-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <LogOut size={20} />
            <span className="font-bold">{t.logout}</span>
          </div>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

// Helper for icon
const Sparkles: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

export default Settings;

import React, { useState, useEffect } from 'react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';
import { Moon, Sun, Globe, LogOut, ChevronRight, Key, Eye, EyeOff, Sparkles } from 'lucide-react';

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
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('mistral_api_key') || '';
    setApiKey(savedKey);
  }, []);

  const handleKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem('mistral_api_key', val);
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'Русский' },
    { code: 'uz', label: "O'zbekcha" },
    { code: 'en', label: 'English' },
  ];

  return (
    <div className="p-8 pb-32 space-y-10 fade-in">
      <div className="mb-2">
        <h2 className={`text-4xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.settings}</h2>
        <p className={`text-[10px] font-black uppercase tracking-[0.4em] mt-1 text-blue-500`}>Configuration Node</p>
      </div>

      <div className="space-y-6">
        {/* Mistral AI Key */}
        <section className={`p-6 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl"><Key size={20} /></div>
            <h3 className="font-black text-sm uppercase tracking-widest">Neural Key</h3>
          </div>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => handleKeyChange(e.target.value)}
              placeholder="Mistral-7B / Large Key"
              className={`w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all font-bold text-sm ${
                isDark 
                  ? 'bg-zinc-950 border-zinc-800 text-white focus:border-blue-500' 
                  : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-blue-500'
              }`}
            />
            <button 
              onClick={() => setShowKey(!showKey)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-blue-500"
            >
              {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </section>

        {/* Language Selection */}
        <section className={`p-6 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl"><Globe size={20} /></div>
            <h3 className="font-black text-sm uppercase tracking-widest">{t.language}</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center justify-between p-5 rounded-2xl transition-all border-2 ${
                  language === lang.code 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20' 
                    : (isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-400' : 'bg-slate-50 border-slate-50 text-slate-600')
                }`}
              >
                <span className="font-black uppercase tracking-widest text-[10px]">{lang.label}</span>
                {language === lang.code && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
              </button>
            ))}
          </div>
        </section>

        {/* Theme Selection */}
        <section className={`p-6 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl"><Sparkles size={20} /></div>
            <h3 className="font-black text-sm uppercase tracking-widest">{t.theme}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`flex flex-col items-center p-6 rounded-[2rem] border-2 transition-all ${
                theme === 'light' 
                  ? 'border-blue-500 bg-blue-50 text-blue-600' 
                  : (isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-600' : 'border-slate-100 bg-slate-50 text-slate-400')
              }`}
            >
              <Sun size={24} strokeWidth={3} className="mb-2" />
              <span className="text-[10px] font-black uppercase tracking-widest">{t.lightMode}</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex flex-col items-center p-6 rounded-[2rem] border-2 transition-all ${
                theme === 'dark' 
                  ? 'border-blue-500 bg-zinc-950 text-blue-500 shadow-xl shadow-blue-500/10' 
                  : (isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-600' : 'border-slate-100 bg-slate-50 text-slate-400')
              }`}
            >
              <Moon size={24} strokeWidth={3} className="mb-2" />
              <span className="text-[10px] font-black uppercase tracking-widest">{t.darkMode}</span>
            </button>
          </div>
        </section>

        {/* Logout */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center justify-between p-6 rounded-[2.5rem] transition-all border-2 ${
            isDark ? 'bg-zinc-900 border-zinc-800 text-red-500' : 'bg-white border-slate-100 text-red-600 shadow-sm'
          }`}
        >
          <div className="flex items-center space-x-4">
            <LogOut size={20} />
            <span className="font-black uppercase tracking-widest text-[10px]">{t.logout}</span>
          </div>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Settings;
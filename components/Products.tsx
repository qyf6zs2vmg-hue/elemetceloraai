
import React from 'react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';
import { Brain, Camera, Mic, Zap, Globe } from 'lucide-react';

interface ProductsProps {
  language: Language;
  theme: Theme;
}

const Products: React.FC<ProductsProps> = ({ language, theme }) => {
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  const upcomingProducts = [
    { title: 'Celora Vision', icon: Camera, desc: 'Image analysis and generation', color: 'text-pink-500' },
    { title: 'Celora Voice', icon: Mic, desc: 'Real-time vocal conversations', color: 'text-blue-500' },
    { title: 'Element Hub', icon: Zap, desc: 'Integration for professional workflows', color: 'text-yellow-500' },
    { title: 'Neural Connect', icon: Brain, desc: 'Advanced thought-mapping engine', color: 'text-purple-500' },
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-3xl font-extrabold tracking-tight mb-2">Element Lab</h2>
      <p className={`mb-8 text-sm ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Innovation roadmap for CeloraAI ecosystem</p>

      <div className="space-y-4">
        {upcomingProducts.map((p, i) => (
          <div 
            key={i} 
            className={`p-6 rounded-[32px] border transition-all flex items-center space-x-6 relative overflow-hidden group ${
              isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm'
            }`}
          >
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-zinc-800' : 'bg-slate-50'} ${p.color}`}>
              <p.icon size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-lg">{p.title}</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{p.desc}</p>
            </div>
            <div className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-tighter">
              {t.comingSoon}
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      <div className={`mt-auto p-8 rounded-[40px] text-center relative overflow-hidden ${isDark ? 'bg-blue-600' : 'bg-blue-600 shadow-2xl shadow-blue-500/40'}`}>
        <Globe size={120} className="absolute -bottom-10 -right-10 text-blue-400 opacity-20 rotate-12" />
        <h3 className="text-white text-2xl font-black mb-2">Global Intelligent Network</h3>
        <p className="text-blue-100 text-xs mb-6 max-w-[200px] mx-auto">Connecting minds across English, Russian, and Uzbek markets.</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transform transition active:scale-95">
          Join Element
        </button>
      </div>
    </div>
  );
};

export default Products;

import React, { useState } from 'react';
import { User as UserType, Theme, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { User, Mail, Lock, ShieldCheck, ChevronRight, Zap } from 'lucide-react';

interface AuthProps {
  onLogin: (user: UserType) => void;
  theme: Theme;
  language: Language;
}

const Auth: React.FC<AuthProps> = ({ onLogin, theme, language }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin({ 
        email: email || 'user@celora.ai', 
        name: name || 'Explorer' 
      });
      setLoading(false);
    }, 1200);
  };

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const cardColor = isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200';
  const inputColor = isDark ? 'bg-zinc-900/80 border-zinc-700 text-white placeholder:text-zinc-600' : 'bg-white border-slate-200 text-slate-900';

  return (
    <div className={`flex flex-col items-center justify-center h-full w-full px-8 safe-pt safe-pb transition-colors duration-500 ${bgColor} relative overflow-hidden`}>
      <div className="bg-glow"></div>
      
      <div className="text-center mb-12 fade-in z-20">
        <h1 className="text-4xl font-black tracking-tighter mb-1">
          <span className={isDark ? 'text-white' : 'text-black'}>Element</span>{' '}
          <span className="intelligent-gradient">Intelligent</span>
        </h1>
        <div className="flex items-center justify-center space-x-3 opacity-60">
          <div className="h-[1px] w-6 bg-blue-500"></div>
          <h2 className="text-[10px] font-black text-blue-500 tracking-[0.5em] uppercase">Celora AI</h2>
          <div className="h-[1px] w-6 bg-blue-500"></div>
        </div>
      </div>

      <div className={`w-full max-w-sm p-8 rounded-[3rem] border backdrop-blur-2xl transition-all relative overflow-hidden fade-in shadow-2xl ${cardColor}`}>
        {loading && <div className="scanner-line"></div>}
        
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-500 rounded-xl text-white">
              <Zap size={18} fill="currentColor" />
            </div>
            <h3 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {isRegister ? 'New Link' : 'Access Gate'}
            </h3>
          </div>
          <p className={`text-[9px] uppercase font-black tracking-widest opacity-60 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
            Secure Neural Authentication Protocol
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 opacity-40" size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-12 pr-5 py-4 rounded-2xl outline-none border-2 transition-all text-sm font-semibold focus:border-blue-500 ${inputColor}`}
                placeholder={t.name}
              />
            </div>
          )}
          
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 opacity-40" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-12 pr-5 py-4 rounded-2xl outline-none border-2 transition-all text-sm font-semibold focus:border-blue-500 ${inputColor}`}
              placeholder={t.email}
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 opacity-40" size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-12 pr-5 py-4 rounded-2xl outline-none border-2 transition-all text-sm font-semibold focus:border-blue-500 ${inputColor}`}
              placeholder={t.password}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all transform active:scale-95 shadow-xl shadow-blue-500/30 uppercase text-[10px] tracking-[0.2em] flex items-center justify-center space-x-2 disabled:opacity-50 mt-4`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{isRegister ? 'Initialize Account' : 'Authenticate'}</span>
                <ChevronRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 hover:text-blue-400 font-black text-[10px] uppercase tracking-widest transition-all"
          >
            {isRegister ? 'Switch to Login' : 'Create New Identity'}
          </button>
        </div>
      </div>

      <div className="mt-12 text-center opacity-40 z-20">
        <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Element Core v2.5 // Node Alpha</p>
      </div>
    </div>
  );
};

export default Auth;
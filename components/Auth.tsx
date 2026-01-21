import React, { useState } from 'react';
import { User, Theme, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { auth, googleProvider, appleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../services/firebase';

interface AuthProps {
  onLogin: (user: User) => void;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        onLogin({ email: userCredential.user.email!, name: name || email.split('@')[0] });
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onLogin({ email: userCredential.user.email!, name: userCredential.user.displayName || email.split('@')[0] });
      }
    } catch (error: any) {
      console.error("Auth error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin({ email: result.user.email!, name: result.user.displayName || 'Google User' });
    } catch (error: any) {
      console.error("Google login error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, appleProvider);
      onLogin({ email: result.user.email!, name: result.user.displayName || 'Apple User' });
    } catch (error: any) {
      console.error("Apple login error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';
  const elementColor = isDark ? 'text-white' : 'text-black';

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen-dynamic px-6 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
      <div className="text-center mb-12 fade-in">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
          <span className={`${elementColor} transition-colors duration-300`}>Element</span>{' '}
          <span className="intelligent-gradient">Intelligent</span>
        </h1>
        <h2 className="text-xl font-black text-blue-500 tracking-[0.3em] uppercase opacity-90">CeloraAI</h2>
      </div>

      <div className={`w-full max-w-sm p-8 rounded-[2.5rem] shadow-2xl border transition-all ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100'}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all ${isDark ? 'bg-zinc-800 border-transparent text-white focus:border-blue-500' : 'bg-slate-50 border-transparent text-slate-900 focus:border-blue-500'}`}
              placeholder={t.name}
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all ${isDark ? 'bg-zinc-800 border-transparent text-white focus:border-blue-500' : 'bg-slate-50 border-transparent text-slate-900 focus:border-blue-500'}`}
            placeholder={t.email}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-5 py-4 rounded-2xl outline-none border-2 transition-all ${isDark ? 'bg-zinc-800 border-transparent text-white focus:border-blue-500' : 'bg-slate-50 border-transparent text-slate-900 focus:border-blue-500'}`}
            placeholder={t.password}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all transform active:scale-95 shadow-xl shadow-blue-600/20 uppercase text-xs tracking-widest disabled:opacity-50"
          >
            {loading ? '...' : (isRegister ? t.register : t.login)}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between space-x-4">
          <div className={`h-[1px] flex-1 ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`}></div>
          <span className={`text-[10px] uppercase font-black tracking-widest ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>OR</span>
          <div className={`h-[1px] flex-1 ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`}></div>
        </div>

        <div className="mt-6 space-y-3">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-3 py-4 px-4 rounded-2xl border transition-all active:scale-95 ${isDark ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
            <span className="font-bold text-xs uppercase tracking-tight">{t.continueWithGoogle}</span>
          </button>
          <button 
            onClick={handleAppleLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-3 py-4 px-4 rounded-2xl border transition-all active:scale-95 ${isDark ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}
          >
            <svg viewBox="0 0 384 512" className="w-5 h-5 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
            <span className="font-bold text-xs uppercase tracking-tight">{t.continueWithApple}</span>
          </button>
        </div>

        <p className="mt-8 text-center text-sm">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 hover:underline font-bold text-xs uppercase tracking-widest"
          >
            {isRegister ? t.login : t.register}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
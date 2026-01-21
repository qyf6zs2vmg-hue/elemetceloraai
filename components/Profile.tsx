
import React from 'react';
import { User, Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';
import { Mail, Shield, Award, Calendar } from 'lucide-react';

interface ProfileProps {
  user: User;
  language: Language;
  theme: Theme;
}

const Profile: React.FC<ProfileProps> = ({ user, language, theme }) => {
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full max-w-lg">
        {/* User Card */}
        <div className={`p-8 rounded-[40px] text-center mb-8 relative overflow-hidden ${isDark ? 'bg-zinc-900' : 'bg-white shadow-xl'}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full -translate-y-12 translate-x-12"></div>
          
          <div className="inline-flex p-1 rounded-full bg-blue-500 mb-6 relative">
            <img 
              src={`https://picsum.photos/seed/${user.email}/200`} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
          </div>

          <h2 className="text-2xl font-black mb-1">{user.name}</h2>
          <p className="text-blue-500 font-bold text-sm tracking-wide uppercase mb-6 opacity-80 italic">Element Intelligent Pioneer</p>
          
          <div className={`flex items-center justify-center space-x-3 px-4 py-2 rounded-2xl ${isDark ? 'bg-zinc-800' : 'bg-slate-100'}`}>
            <Mail size={16} className="text-blue-500" />
            <span className="text-sm font-medium opacity-80">{user.email}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-6 rounded-3xl ${isDark ? 'bg-zinc-900' : 'bg-white shadow-sm'}`}>
            <Shield className="text-blue-500 mb-4" />
            <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">Security</h4>
            <p className="text-sm font-bold">Standard Account</p>
          </div>
          <div className={`p-6 rounded-3xl ${isDark ? 'bg-zinc-900' : 'bg-white shadow-sm'}`}>
            <Award className="text-purple-500 mb-4" />
            <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">Tier</h4>
            <p className="text-sm font-bold">Beta Tester</p>
          </div>
          <div className={`p-6 rounded-3xl col-span-2 ${isDark ? 'bg-zinc-900' : 'bg-white shadow-sm'}`}>
             <div className="flex items-center justify-between">
                <div>
                  <Calendar className="text-orange-500 mb-4" />
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">Member Since</h4>
                  <p className="text-sm font-bold">October 2024</p>
                </div>
                <div className="h-12 w-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                   <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

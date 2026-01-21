
import React from 'react';
import { ChatSession, Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';
import { Trash2, MessageSquare, Plus, ExternalLink } from 'lucide-react';

interface ChatsProps {
  sessions: ChatSession[];
  onDelete: (id: string) => void;
  onResume: (id: string) => void;
  onCreateNew: () => void;
  language: Language;
  theme: Theme;
}

const Chats: React.FC<ChatsProps> = ({ sessions, onDelete, onResume, onCreateNew, language, theme }) => {
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">{t.chats}</h2>
        <button
          onClick={onCreateNew}
          className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      {sessions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
          <MessageSquare size={64} className="mb-4" />
          <p className="text-lg">No active chats yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((session) => (
            <div 
              key={session.id}
              className={`p-5 rounded-3xl border transition-all group relative overflow-hidden ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${isDark ? 'bg-zinc-800 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm line-clamp-1">{session.title}</h3>
                    <p className="text-[10px] opacity-50 uppercase tracking-wider font-bold">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <p className={`text-xs line-clamp-2 mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {session.messages.length > 0 
                  ? session.messages[session.messages.length - 1].text 
                  : "No messages yet"}
              </p>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onResume(session.id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl transition-all"
                >
                  <ExternalLink size={14} />
                  <span>{t.resumeChat}</span>
                </button>
                <button
                  onClick={() => onDelete(session.id)}
                  className={`p-3 rounded-xl transition-all ${
                    isDark 
                      ? 'bg-zinc-800 text-red-400 hover:bg-red-500 hover:text-white' 
                      : 'bg-slate-100 text-red-500 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chats;

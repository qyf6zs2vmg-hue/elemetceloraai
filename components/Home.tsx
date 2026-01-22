import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Sparkles } from 'lucide-react';
import { ChatSession, Message, Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';
import { sendMessageToGemini } from '../services/gemini';

interface HomeProps {
  activeChatId: string | null;
  chatSessions: ChatSession[];
  updateMessages: (id: string, messages: Message[]) => void;
  language: Language;
  theme: Theme;
  createNewChat: () => void;
}

const Home: React.FC<HomeProps> = ({ activeChatId, chatSessions, updateMessages, language, theme, createNewChat }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  const activeChat = chatSessions.find(c => c.id === activeChatId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat?.messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading || !activeChatId) return;

    const chatId = activeChatId;
    const currentMessages = activeChat?.messages || [];

    const userMessage: Message = {
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    const newMessages = [...currentMessages, userMessage];
    updateMessages(chatId, newMessages);
    setInput('');
    setLoading(true);

    try {
      const responseText = await sendMessageToGemini(input, currentMessages);
      const aiMessage: Message = {
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      updateMessages(chatId, [...newMessages, aiMessage]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!activeChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-8 fade-in relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
        <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-blue-500/40 relative z-10 animate-pulse">
          <Sparkles size={56} className="text-white" />
        </div>
        <div className="z-10">
          <h2 className={`text-4xl font-black mb-3 tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.welcome}</h2>
          <p className={`text-sm font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
            Ready for neural interaction
          </p>
        </div>
        <button
          onClick={createNewChat}
          className="z-10 flex items-center space-x-4 bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl shadow-blue-500/40 active:scale-95 transition-all transform"
        >
          <Plus size={20} strokeWidth={3} />
          <span>{t.newChat}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full fade-in relative bg-transparent">
      {/* Messages Container */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-40">
        {activeChat.messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 opacity-20 select-none">
            <div className="p-6 rounded-full border-2 border-blue-500 border-dashed animate-spin-slow">
               <Sparkles size={40} className="text-blue-500" />
            </div>
            <p className="mt-8 font-black uppercase tracking-[0.5em] text-[10px]">Awaiting Uplink</p>
          </div>
        )}
        
        {activeChat.messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}>
            <div 
              className={`max-w-[90%] px-5 py-4 rounded-[2rem] shadow-sm text-[14px] leading-relaxed relative ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : (isDark ? 'bg-zinc-900 text-zinc-100 border border-zinc-800' : 'bg-white text-slate-800 border border-slate-100 shadow-xl') + ' rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap font-medium">{msg.text}</div>
              <div className={`text-[8px] mt-2 font-black uppercase tracking-widest opacity-50 ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className={`px-6 py-4 rounded-[2rem] rounded-tl-none ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-slate-100 shadow-lg'}`}>
              <div className="flex space-x-2 py-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div className="h-4" />
      </div>

      {/* Input Overlay */}
      <div className="absolute bottom-6 left-0 right-0 px-6 z-40">
        <div className={`flex items-center p-2 rounded-[2.5rem] border-2 shadow-2xl transition-all backdrop-blur-3xl ${
          isDark 
            ? 'bg-zinc-900/80 border-zinc-800 focus-within:border-blue-600' 
            : 'bg-white/90 border-slate-200 focus-within:border-blue-500 shadow-slate-200/50'
        }`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t.typeMessage}
            className="flex-1 bg-transparent border-none outline-none px-5 py-3 text-[14px] font-semibold resize-none max-h-32 placeholder:text-zinc-500 placeholder:opacity-50"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`p-4 rounded-full transition-all transform active:scale-90 ${
              input.trim() && !loading 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40' 
                : 'bg-zinc-800/50 text-zinc-600'
            }`}
          >
            <Send size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
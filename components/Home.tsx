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
          <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6 fade-in">
            <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-600/20 animate-bounce">
              <Sparkles size={48} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black mb-2 tracking-tight">{t.welcome}</h2>
              <p className={`text-sm font-medium ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                Element Intelligent's advanced neural companion.
              </p>
            </div>
            <button
              onClick={createNewChat}
              className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[1.8rem] font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-600/30 active:scale-95 transition-all"
            >
              <Plus size={20} />
              <span>{t.newChat}</span>
            </button>
          </div>
        );
      }

      return (
        <div className="flex flex-col h-full fade-in">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
            {activeChat.messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full opacity-30 select-none">
                <Sparkles size={64} className="text-blue-500 mb-4" />
                <p className="text-center font-black uppercase tracking-widest text-xs">Awaiting neural input</p>
              </div>
            )}
            {activeChat.messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div 
                  className={`max-w-[85%] px-5 py-4 rounded-[1.8rem] shadow-sm text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : (isDark ? 'bg-zinc-900 text-slate-100 border border-zinc-800' : 'bg-white text-slate-800 border border-slate-100 shadow-lg') + ' rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className={`text-[9px] mt-2 font-black uppercase tracking-widest opacity-40 ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className={`px-5 py-4 rounded-[1.8rem] rounded-tl-none ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-slate-100 shadow-lg'}`}>
                  <div className="flex space-x-1.5 py-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div className="h-4" />
          </div>

          <div className={`p-4 transition-colors duration-300 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl border-t ${isDark ? 'border-zinc-800' : 'border-slate-100'}`}>
            <div className={`flex items-center p-1.5 rounded-[1.8rem] border-2 transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 focus-within:border-blue-600' : 'bg-slate-50 border-slate-100 focus-within:border-blue-500'}`}>
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
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm resize-none max-h-32 placeholder:text-zinc-500"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className={`p-4 rounded-2xl transition-all transform ${
                  input.trim() && !loading 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 scale-100' 
                    : 'bg-zinc-800 text-zinc-600 scale-95 opacity-40'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      );
    };

    export default Home;
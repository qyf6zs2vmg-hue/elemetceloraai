
import React, { useState, useEffect, useCallback } from 'react';
import { View, User, Theme, Language, ChatSession, Message } from './types';
import { TRANSLATIONS } from './constants';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Home from './components/Home';
import Chats from './components/Chats';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Products from './components/Products';
import HelpCenter from './components/HelpCenter';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('ru');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('celora_user');
    const savedTheme = localStorage.getItem('celora_theme') as Theme;
    const savedLang = localStorage.getItem('celora_lang') as Language;
    const savedChats = localStorage.getItem('celora_chats');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
    if (savedChats) setChatSessions(JSON.parse(savedChats));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('celora_theme', theme);
    localStorage.setItem('celora_lang', language);
    localStorage.setItem('celora_chats', JSON.stringify(chatSessions));
    if (user) localStorage.setItem('celora_user', JSON.stringify(user));
  }, [theme, language, chatSessions, user]);

  const t = TRANSLATIONS[language];

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('celora_user');
    setCurrentView('home');
  };

  const createNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: `${t.newChat} ${chatSessions.length + 1}`,
      messages: [],
      updatedAt: Date.now(),
    };
    setChatSessions([newChat, ...chatSessions]);
    setActiveChatId(newChat.id);
    setCurrentView('home');
  };

  const deleteChat = (id: string) => {
    setChatSessions(chatSessions.filter(c => c.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  const resumeChat = (id: string) => {
    setActiveChatId(id);
    setCurrentView('home');
  };

  const updateMessages = (chatId: string, messages: Message[]) => {
    setChatSessions(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages,
          updatedAt: Date.now(),
          title: messages.length > 0 ? (messages[0].text.slice(0, 30) + (messages[0].text.length > 30 ? '...' : '')) : chat.title
        };
      }
      return chat;
    }));
  };

  if (!user) {
    return <Auth onLogin={handleLogin} theme={theme} language={language} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home 
            activeChatId={activeChatId} 
            chatSessions={chatSessions} 
            updateMessages={updateMessages}
            language={language}
            theme={theme}
            createNewChat={createNewChat}
          />
        );
      case 'chats':
        return (
          <Chats 
            sessions={chatSessions} 
            onDelete={deleteChat} 
            onResume={resumeChat}
            onCreateNew={createNewChat}
            language={language}
            theme={theme}
          />
        );
      case 'settings':
        return (
          <Settings 
            language={language} 
            setLanguage={setLanguage} 
            theme={theme} 
            setTheme={setTheme} 
            onLogout={handleLogout}
          />
        );
      case 'profile':
        return <Profile user={user} language={language} theme={theme} />;
      case 'products':
        return <Products language={language} theme={theme} />;
      case 'help':
        return <HelpCenter language={language} theme={theme} />;
      default:
        return <Home 
          activeChatId={activeChatId} 
          chatSessions={chatSessions} 
          updateMessages={updateMessages}
          language={language}
          theme={theme}
          createNewChat={createNewChat}
        />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Layout 
        currentView={currentView} 
        setView={setCurrentView} 
        language={language} 
        theme={theme}
      >
        {renderContent()}
      </Layout>
    </div>
  );
};

export default App;

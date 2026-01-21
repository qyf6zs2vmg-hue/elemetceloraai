
export type Language = 'en' | 'ru' | 'uz';
export type Theme = 'light' | 'dark';
export type View = 'home' | 'chats' | 'settings' | 'profile' | 'products' | 'help';

export interface User {
  name: string;
  email: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

export interface Translations {
  welcome: string;
  login: string;
  register: string;
  email: string;
  password: string;
  name: string;
  continueWithGoogle: string;
  continueWithApple: string;
  home: string;
  chats: string;
  settings: string;
  profile: string;
  products: string;
  help: string;
  language: string;
  theme: string;
  lightMode: string;
  darkMode: string;
  logout: string;
  newChat: string;
  typeMessage: string;
  howToUse: string;
  whyNeed: string;
  howHelp: string;
  faq: string;
  whatIsCelora: string;
  isDataSafe: string;
  whoIsElement: string;
  comingSoon: string;
  deleteChat: string;
  resumeChat: string;
  showNav: string;
  hideNav: string;
}
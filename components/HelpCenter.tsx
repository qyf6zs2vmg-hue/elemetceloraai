
import React, { useState } from 'react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../constants';
import { ChevronDown, ChevronUp, BookOpen, HeartHandshake, Lightbulb, CheckCircle, Info, Sparkles } from 'lucide-react';

interface HelpCenterProps {
  language: Language;
  theme: Theme;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ language, theme }) => {
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeInfoSection, setActiveInfoSection] = useState<'use' | 'need' | 'help' | null>(null);

  const faqData = [
    { 
      q: t.whatIsCelora, 
      a: language === 'en' 
        ? "CeloraAI is a state-of-the-art conversational AI platform built by Element Intelligent using the latest language model technologies." 
        : language === 'ru'
        ? "CeloraAI — это ультрасовременная диалоговая ИИ-платформа, созданная Element Intelligent с использованием новейших технологий языковых моделей."
        : "CeloraAI - bu Element Intelligent tomonidan eng so'nggi til modeli texnologiyalaridan foydalangan holda qurilgan zamonaviy suhbatdosh sun'iy intellekt platformasi."
    },
    { 
      q: t.isDataSafe, 
      a: language === 'en'
        ? "Yes, we prioritize security. Your data is encrypted and used only to improve your personalized experience."
        : language === 'ru'
        ? "Да, мы уделяем приоритетное внимание безопасности. Ваши данные зашифрованы и используются только для улучшения вашего персонального опыта."
        : "Ha, biz xavfsizlikka ustuvor ahamiyat beramiz. Ma'lumotlaringiz shifrlangan va faqat shaxsiy tajribangizni yaxshilash uchun ishlatiladi."
    },
    { 
      q: t.whoIsElement, 
      a: language === 'en'
        ? "Element Intelligent is a tech venture dedicated to making advanced AI accessible to everyone, focusing on localization and user-friendly design."
        : language === 'ru'
        ? "Element Intelligent — это технологическое предприятие, целью которого является сделать продвинутый ИИ доступным для всех, уделяя особое внимание локализации и удобному дизайну."
        : "Element Intelligent - bu ilg'or sun'iy intellektni hamma uchun ochiq qilishga bag'ishlangan texnologik korxona bo'lib, mahalliylashtirish va foydalanuvchilar uchun qulay dizaynga e'tibor qaratadi."
    }
  ];

  const infoContent = {
    use: {
      title: t.howToUse,
      icon: BookOpen,
      color: 'text-blue-500',
      items: language === 'ru' ? [
        "Введите ваш запрос в текстовое поле на главном экране.",
        "Используйте раздел 'Чаты' для управления историей переписки.",
        "Меняйте язык и тему в настройках для комфортной работы.",
        "Создавайте новые чаты кнопкой '+' в любое время."
      ] : language === 'uz' ? [
        "Asosiy ekrandagi matn maydoniga so'rovingizni kiriting.",
        "Suhbatlar tarixini boshqarish uchun 'Chatlar' bo'limidan foydalaning.",
        "Qulay ishlash uchun sozlamalarda til va mavzuni o'zgartiring.",
        "Istalgan vaqtda '+' tugmasi bilan yangi chatlar yarating."
      ] : [
        "Enter your query in the text field on the main screen.",
        "Use the 'Chats' section to manage your conversation history.",
        "Change the language and theme in settings for a comfortable experience.",
        "Create new chats with the '+' button at any time."
      ]
    },
    need: {
      title: t.whyNeed,
      icon: Lightbulb,
      color: 'text-yellow-500',
      items: language === 'ru' ? [
        "Мгновенные ответы на сложные вопросы в любое время.",
        "Помощь в написании кода, текстов и переводов.",
        "Локализованный опыт с поддержкой узбекского языка.",
        "Инструмент для повышения продуктивности и креативности."
      ] : language === 'uz' ? [
        "Istalgan vaqtda murakkab savollarga lahzali javoblar.",
        "Kod yozish, matnlar va tarjimalarda yordam.",
        "O'zbek tili qo'llab-quvvatlanadigan mahalliylashtirilgan tajriba.",
        "Mahsuldorlik va ijodkorlikni oshirish vositasi."
      ] : [
        "Instant answers to complex questions at any time.",
        "Help with coding, writing, and translations.",
        "Localized experience with Uzbek language support.",
        "A tool to boost productivity and creativity."
      ]
    },
    help: {
      title: t.howHelp,
      icon: HeartHandshake,
      color: 'text-green-500',
      items: language === 'ru' ? [
        "Автоматизация рутинных задач и экономия времени.",
        "Предоставление точной и структурированной информации.",
        "Поддержка в обучении и освоении новых навыков.",
        "Безопасная среда для ваших данных и идей."
      ] : language === 'uz' ? [
        "Muntazam vazifalarni avtomatlashtirish va vaqtni tejash.",
        "Aniq va tizimli ma'lumotlarni taqdim etish.",
        "O'rganish va yangi ko'nikmalarni egallashda yordam.",
        "Ma'lumotlaringiz va g'oyalaringiz uchun xavfsiz muhit."
      ] : [
        "Automating routine tasks and saving time.",
        "Providing accurate and structured information.",
        "Support in learning and mastering new skills.",
        "A secure environment for your data and ideas."
      ]
    }
  };

  return (
    <div className="p-6 pb-20 fade-in">
      <h2 className="text-3xl font-black tracking-tight mb-8">{t.help}</h2>

      {/* Main Interactive Sections */}
      <div className="grid grid-cols-1 gap-4 mb-10">
        {(Object.entries(infoContent) as [keyof typeof infoContent, typeof infoContent['use']][]).map(([key, section]) => (
          <div 
            key={key} 
            onClick={() => setActiveInfoSection(activeInfoSection === key ? null : key)}
            className={`p-6 rounded-[2rem] border transition-all cursor-pointer group ${
              activeInfoSection === key 
                ? (isDark ? 'bg-zinc-800 border-blue-500' : 'bg-blue-50 border-blue-200')
                : (isDark ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-slate-100 shadow-sm')
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-2xl ${isDark ? 'bg-zinc-800' : 'bg-slate-50'} ${section.color}`}>
                  <section.icon size={24} />
                </div>
                <span className="font-black text-sm uppercase tracking-wider">{section.title}</span>
              </div>
              {activeInfoSection === key ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="opacity-30" />}
            </div>
            
            {activeInfoSection === key && (
              <div className="mt-6 space-y-3 fade-in">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle size={16} className={`${section.color} mt-0.5 flex-shrink-0`} />
                    <p className={`text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 className="text-xl font-black mb-6 flex items-center space-x-2">
        <Sparkles className="text-blue-500" size={20} />
        <span>{t.faq}</span>
      </h3>

      <div className="space-y-3 mb-10">
        {faqData.map((item, idx) => (
          <div 
            key={idx} 
            className={`rounded-[2rem] border transition-all overflow-hidden ${
              isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm'
            }`}
          >
            <button 
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full p-6 flex items-center justify-between text-left"
            >
              <span className="font-bold text-sm pr-4">{item.q}</span>
              {openFaq === idx ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="opacity-30" />}
            </button>
            {openFaq === idx && (
              <div className={`px-6 pb-6 text-xs leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'} fade-in`}>
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-zinc-800' : 'bg-slate-50'}`}>
                  {item.a}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={`p-8 rounded-[3rem] text-center border-2 border-dashed ${isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-slate-200 bg-slate-50'}`}>
        <Info className="mx-auto mb-4 text-blue-500" size={32} />
        <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Element Support</p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default HelpCenter;
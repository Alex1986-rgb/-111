
import React, { useEffect, useState } from 'react';
import { ViewId } from '../types';
import { Menu, X, ChevronRight, Send, MessageCircle, Crown, Apple, Zap } from 'lucide-react';

interface HeaderProps {
  setView: (view: ViewId) => void;
  currentView: ViewId;
}

const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [slots, setSlots] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlots(prev => (prev > 1 ? prev - 1 : 4));
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  const links = [
    { id: 'home', label: 'Главная' },
    { id: 'pricing', label: 'Цены' },
    { id: 'cases', label: 'Кейсы' },
    { id: 'blog', label: 'Блог' },
    { id: 'reviews', label: 'Отзывы' },
    { id: 'contacts', label: 'Контакты' },
  ];

  const navigate = (id: ViewId) => {
    setView(id);
    setMobileMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] glass border-b border-slate-200/50 backdrop-blur-xl transition-all h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => navigate('home')}
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-indigo-200">
              <Crown className="text-white w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">Text<span className="text-indigo-600">Flow</span></span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Copy Agency</span>
            </div>
          </div>

          <nav className="hidden xl:flex space-x-10 items-center">
            {links.map((item) => (
              <button 
                key={item.id}
                onClick={() => navigate(item.id as ViewId)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-2 group ${
                  currentView === item.id ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left transition-transform duration-300 ${currentView === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('pricing')}
              className="hidden sm:flex bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100 items-center gap-2 hover:scale-105 active:scale-95 group"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-indigo-400 group-hover:animate-pulse" />
              Заказать текст
            </button>
            <button 
              onClick={() => setMobileMenu(!mobileMenu)}
              className="xl:hidden p-3 text-slate-900 bg-slate-50 rounded-2xl transition-all border border-slate-100"
            >
              {mobileMenu ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div className="xl:hidden fixed inset-0 top-20 bg-white z-[90] animate-in slide-in-from-right duration-500 flex flex-col p-6">
          <div className="space-y-3">
            {links.map((item) => (
              <button 
                key={item.id}
                onClick={() => navigate(item.id as ViewId)}
                className={`flex items-center justify-between w-full text-left p-6 rounded-[2rem] font-black uppercase tracking-widest transition-all ${
                  currentView === item.id ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className={`w-5 h-5 stroke-[3] ${currentView === item.id ? 'text-indigo-200' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

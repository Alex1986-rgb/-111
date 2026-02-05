
import React from 'react';
import { View } from '../types';
import { Send, MessageCircle, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  setView: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  const socialLinks = [
    { name: 'Telegram', icon: Send, color: 'hover:bg-[#229ED9]', shadow: 'hover:shadow-[#229ED9]/40', link: 'https://t.me/textflow_agency' },
    { name: 'WhatsApp', icon: MessageCircle, color: 'hover:bg-[#25D366]', shadow: 'hover:shadow-[#25D366]/40', link: 'https://wa.me/79991234567' },
    { name: 'YouTube', icon: Youtube, color: 'hover:bg-[#FF0000]', shadow: 'hover:shadow-[#FF0000]/40', link: '#' },
    { name: 'Instagram', icon: Instagram, color: 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]', shadow: 'hover:shadow-[#ee2a7b]/40', link: '#' },
  ];

  const seoTags = [
    "Копирайтинг Москва", "Тексты для сайта цена", "Заказать SEO статьи", 
    "Написание карточек WB", "Копирайтер для Ozon", "LSI тексты на заказ",
    "Копирайтинг СПб", "Тексты для бизнеса", "Аудит контента AI"
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center space-x-2.5 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-black text-xl">TF</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Text<span className="text-indigo-600">Flow</span></span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed mb-8">
            Агентство экспертного копирайтинга №1 в РФ. Создаем тексты, которые обожают поисковые системы и живые люди. Работаем с 2024 года.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(s => {
              const Icon = s.icon;
              return (
                <a 
                  key={s.name} 
                  href={s.link} 
                  target="_blank" 
                  rel="noopener"
                  aria-label={s.name}
                  className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-all cursor-pointer text-white border border-white/10 hover:border-transparent hover:-translate-y-1 ${s.color} ${s.shadow} hover:shadow-xl`}
                >
                  <Icon className="w-5 h-5 fill-current" />
                </a>
              );
            })}
          </div>
        </div>
        
        <div>
          <h4 className="font-black text-white uppercase text-xs tracking-widest mb-6">Услуги</h4>
          <ul className="space-y-4 text-sm font-medium">
            {[
              { label: 'SEO-копирайтинг', id: 'pricing' },
              { label: 'Тексты для маркетплейсов', id: 'bulk_order' },
              { label: 'Статьи для блога', id: 'blog' },
              { label: 'LSI-тексты на заказ', id: 'pricing' },
              { label: 'Наполнение сайтов', id: 'pricing' }
            ].map(item => (
              <li key={item.label} onClick={() => setView(item.id as View)} className="hover:text-indigo-400 cursor-pointer transition-colors">{item.label}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white uppercase text-xs tracking-widest mb-6">Навигация</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li onClick={() => setView('home')} className="hover:text-indigo-400 cursor-pointer transition-colors">Главная</li>
            <li onClick={() => setView('pricing')} className="hover:text-indigo-400 cursor-pointer transition-colors">Цены за 1000 знаков</li>
            <li onClick={() => setView('cases')} className="hover:text-indigo-400 cursor-pointer transition-colors">Кейсы и результаты</li>
            <li onClick={() => setView('blog')} className="hover:text-indigo-400 cursor-pointer transition-colors">Блог экспертов</li>
            <li onClick={() => setView('reviews')} className="hover:text-indigo-400 cursor-pointer transition-colors">Отзывы клиентов</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white uppercase text-xs tracking-widest mb-6">Связаться</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li onClick={() => setView('contacts')} className="hover:text-indigo-400 cursor-pointer transition-colors">Контакты в Москве</li>
            <li>hello@textflow.ru</li>
            <li className="text-white font-bold">+7 (999) 123-45-67</li>
            <li onClick={() => setView('admin')} className="text-indigo-500 font-bold uppercase text-[10px] tracking-widest cursor-pointer hover:text-indigo-400 pt-4">Панель администратора</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-16 pt-8 border-t border-white/5">
         <div className="flex flex-wrap gap-3">
            {seoTags.map(tag => (
              <span key={tag} className="text-[10px] font-black uppercase tracking-tighter text-slate-600 hover:text-indigo-500 cursor-default transition-colors">
                • {tag}
              </span>
            ))}
         </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest text-center md:text-left gap-6">
        <p>© 2024-2025 TextFlow Russia. Все права защищены. Тексты любой сложности от 1000 знаков без пробелов.</p>
        <div className="flex space-x-8">
          <span className="hover:text-white cursor-pointer transition-colors">Конфиденциальность</span>
          <span className="hover:text-white cursor-pointer transition-colors">Оферта</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

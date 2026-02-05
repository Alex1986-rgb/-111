
import React, { useState } from 'react';
import { MessageCircle, Send, X, MessageSquareText, Apple, MessageCircleMore } from 'lucide-react';

const MessengerFab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const messengers = [
    { 
      name: 'iMessage', 
      icon: Apple, 
      color: 'bg-gradient-to-br from-[#007AFF] to-[#00C6FF]', 
      shadow: 'shadow-blue-500/40',
      link: 'sms:+79991234567',
      desc: 'Для пользователей Apple'
    },
    { 
      name: 'Telegram', 
      icon: Send, 
      color: 'bg-[#229ED9]', 
      shadow: 'shadow-[#229ED9]/30',
      link: 'https://t.me/textflow_agency',
      desc: '@textflow_agency'
    },
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      color: 'bg-[#25D366]', 
      shadow: 'shadow-[#25D366]/30',
      link: 'https://wa.me/79991234567',
      desc: 'Быстрый чат'
    }
  ];

  return (
    <div className="fixed bottom-24 right-6 z-[120] flex flex-col items-end gap-5">
      {isOpen && (
        <div className="flex flex-col gap-4 mb-2">
          {messengers.map((m, idx) => {
            const Icon = m.icon;
            return (
              <a
                key={m.name}
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group animate-in slide-in-from-bottom-6 fade-in duration-300 fill-mode-both"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <div className="bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-[1.2rem] shadow-2xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0 scale-90 group-hover:scale-100">
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-900">{m.name}</div>
                   <div className="text-[9px] font-bold text-slate-400 whitespace-nowrap">{m.desc}</div>
                </div>
                <div className={`${m.color} ${m.shadow} text-white w-14 h-14 rounded-[1.4rem] flex items-center justify-center shadow-2xl hover:scale-110 hover:-rotate-6 transition-all active:scale-95 ring-2 ring-white/50`}>
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
              </a>
            );
          })}
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-18 h-18 rounded-[2rem] flex items-center justify-center shadow-3xl transition-all duration-500 relative group overflow-hidden ${isOpen ? 'bg-slate-900 rotate-90 scale-90' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/40 p-5'}`}
        style={{ width: '4.5rem', height: '4.5rem' }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
        {isOpen ? (
          <X className="w-8 h-8 text-white relative z-10 stroke-[3]" />
        ) : (
          <div className="relative z-10">
            <MessageCircleMore className="w-9 h-9 text-white group-hover:scale-110 transition-transform stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-emerald-500 border-3 border-indigo-600 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default MessengerFab;

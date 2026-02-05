
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Zap } from 'lucide-react';

const activities = [
  { name: "Алексей из Москвы", task: "заказал 15 карточек WB", time: "2 мин назад" },
  { name: "Елена, SEO-лид", task: "купила аудит лонгрида", time: "15 мин назад" },
  { name: "Студия 'Мебель+',", task: "заказали наполнение блога", time: "1 ч назад" },
  { name: "Иван Г.", task: "оформил срочный SEO-текст", time: "34 мин назад" }
];

const LiveNotifications: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 5000);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % activities.length);
        setVisible(true);
      }, 1000);
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  const item = activities[currentIdx];

  return (
    <div className="fixed bottom-6 left-6 z-[100] animate-in slide-in-from-left-8 fade-in duration-700">
      <div className="bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[2rem] shadow-2xl border border-slate-100 flex items-center gap-4 max-w-[320px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl -z-10"></div>
        <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
           <ShoppingBag className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
           <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1 flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> Новое действие
           </div>
           <div className="text-xs font-black text-slate-900 leading-tight mb-1">
             {item.name} <span className="text-slate-500 font-medium">{item.task}</span>
           </div>
           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.time}</div>
        </div>
        <button onClick={() => setVisible(false)} className="absolute top-3 right-3 text-slate-300 hover:text-slate-900 transition-colors">
          <Star className="w-3 h-3 fill-current" />
        </button>
      </div>
    </div>
  );
};

export default LiveNotifications;

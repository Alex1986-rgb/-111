
import React from 'react';
import { Quote, Sparkles, TrendingUp, Target } from 'lucide-react';

const quotes = [
  { text: "Слова — это валюта 21 века. Мы сделаем ваш бизнес самым богатым в нише.", icon: Sparkles, author: "Философия TextFlow" },
  { text: "Ваш контент — это ваш круглосуточный отдел продаж. Пусть он говорит красиво.", icon: Target, author: "Стратегия Роста" },
  { text: "Хороший текст не просто читают. На него кликают, его покупают, им гордятся.", icon: TrendingUp, author: "Тренды 2025" }
];

const MotivationalQuote: React.FC<{ index?: number }> = ({ index = 0 }) => {
  const quote = quotes[index % quotes.length];
  const Icon = quote.icon;

  return (
    <div className="my-20 relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[3.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
      <div className="relative bg-white border border-slate-100 p-12 md:p-16 rounded-[3.5rem] shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Quote className="w-48 h-48 rotate-12" />
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-8 h-8 stroke-[2.5]" />
          </div>
          
          <blockquote className="text-2xl md:text-4xl font-black text-slate-900 leading-tight tracking-tighter mb-8 max-w-3xl">
            «{quote.text}»
          </blockquote>
          
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-indigo-600"></div>
            <cite className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 not-italic">{quote.author}</cite>
            <div className="h-px w-8 bg-indigo-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuote;

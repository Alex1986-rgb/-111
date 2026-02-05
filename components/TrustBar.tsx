
import React from 'react';

const logos = [
  'Яндекс', 'Сбер', 'Альфа-Банк', 'Ozon', 'Wildberries', 'Avito', 'Tinkoff', 'ВТБ', 'Газпром', 'МТС', 'Мегафон'
];

const TrustBar: React.FC = () => {
  return (
    <div className="py-16 border-y border-slate-100 bg-white overflow-hidden relative">
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Партнеры и экосистемы</p>
      </div>

      <div className="flex overflow-hidden group">
        <div className="flex space-x-20 animate-marquee whitespace-nowrap py-4">
          {[...logos, ...logos].map((logo, i) => (
            <span 
              key={i} 
              className="text-3xl md:text-4xl font-black tracking-tighter text-slate-200 hover:text-indigo-600 transition-colors cursor-default select-none"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TrustBar;

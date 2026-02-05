
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { ArrowRight, Layers, Zap, ShoppingBasket, BriefcaseBusiness, Terminal, TrendingUp, Sparkles, Star, Target, ShieldCheck } from 'lucide-react';
import SEODataTable from './SEODataTable';

interface HeroProps {
  setView: (view: View) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  const [activeNiche, setActiveNiche] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const niches = [
    { id: 'all', label: 'Универсально', title: 'Контент, который берет ТОП', desc: 'Агентство контента нового поколения. Мы создаем цифровые активы, которые превращают поисковый трафик в реальный капитал.', icon: Zap, color: 'indigo' },
    { id: 'wb', label: 'Маркетплейсы', title: 'Взрывные продажи на WB и Ozon', desc: 'Алгоритмический копирайтинг для карточек. Поднимаем товары в ТОП-3 выдачи без лишних затрат на продвижение.', icon: ShoppingBasket, color: 'emerald' },
    { id: 'it', label: 'IT и Технологии', title: 'Смыслы вашего продукта в тексте', desc: 'Экспертные лонгриды о сложных технологиях. Хабр и VC.ru материалы, которые дочитывают до конца.', icon: Terminal, color: 'blue' },
    { id: 'b2b', label: 'Сложный B2B', title: 'Тексты для принятия решений', desc: 'Коммерческие предложения и аналитика, которые выстраивают доверие на уровне миллионных контрактов.', icon: BriefcaseBusiness, color: 'slate' }
  ];

  const trendingKeywords = [
    "lsi копирайтинг 2025", "статья на vc.ru цена", "seo карточки wildberries", 
    "автонаполнение сайта api", "редакционная политика", "lsi семантика яндекс",
    "контент-стратегия", "экспертный копирайтер", "тексты для нейросетей"
  ];

  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-white selection:bg-indigo-100">
      {/* Декоративные элементы фона */}
      <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 -z-10 transition-colors duration-1000 ${
        activeNiche === 0 ? 'bg-indigo-400' : activeNiche === 1 ? 'bg-emerald-400' : activeNiche === 2 ? 'bg-blue-400' : 'bg-slate-400'
      }`}></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 xl:col-span-8 text-left">
            <div className="flex flex-wrap gap-2 mb-8">
               {niches.map((n, i) => {
                 const Icon = n.icon;
                 return (
                   <button 
                    key={n.id}
                    onClick={() => setActiveNiche(i)}
                    className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all duration-500 ${
                      activeNiche === i 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200 -translate-y-1' 
                        : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-200 hover:text-slate-600'
                    }`}
                   >
                     <Icon className={`w-3.5 h-3.5 stroke-[2.5] ${activeNiche === i ? 'text-indigo-400' : 'text-slate-300'}`} />
                     {n.label}
                   </button>
                 );
               })}
            </div>
            
            <h1 className="text-5xl md:text-7xl xl:text-[6.5rem] font-black tracking-tighter text-slate-900 mb-8 leading-[0.9] transition-all duration-700">
              {niches[activeNiche].title.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-3">
                  {['берет', 'продажи', 'смыслы', 'решений'].includes(word.toLowerCase())
                    ? <span className="gradient-text italic px-1"> {word} </span> 
                    : word}
                </span>
              ))}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl font-medium">
              {niches[activeNiche].desc}
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 mb-16">
              <button 
                onClick={() => setView('pricing')}
                className="group relative px-10 py-5 bg-indigo-600 text-white rounded-[1.8rem] font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-100 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Начать проект</span>
                <ArrowRight className="w-5 h-5 stroke-[3] group-hover:translate-x-1 transition-transform relative z-10" />
              </button>
              
              <div className="flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-[1.8rem] border border-slate-100">
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?u=user${i}`} className="w-8 h-8 rounded-full border-2 border-white" alt="Клиент" />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[8px] font-black text-white border-2 border-white">+40</div>
                 </div>
                 <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Нам <span className="text-slate-900 text-[10px]">доверяют</span> лидеры
                 </div>
              </div>
            </div>

            <div className="flex items-center gap-5 py-4 px-6 bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden relative shadow-2xl">
               <div className="shrink-0 flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-widest bg-indigo-600 px-3 py-1.5 rounded-lg">
                 <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" /> Тренды Live
               </div>
               <div className="flex overflow-hidden relative w-full">
                  <div className="flex space-x-10 animate-ticker whitespace-nowrap">
                    {[...trendingKeywords, ...trendingKeywords].map((kw, i) => (
                      <span key={i} className="text-[10px] font-black uppercase text-slate-500 tracking-widest hover:text-indigo-400 transition-colors cursor-default">
                        # {kw}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 relative">
             <div className="relative animate-fade-in py-10">
                {/* Виджеты статистики */}
                <div className="absolute top-0 -left-6 z-20 bg-white p-5 rounded-[1.8rem] shadow-2xl border border-slate-50 animate-bounce-slow">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                         <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                         <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Индекс роста</div>
                         <div className="text-lg font-black text-slate-900">+142%</div>
                      </div>
                   </div>
                </div>

                <div className="absolute bottom-4 -right-2 z-20 bg-slate-900 p-5 rounded-[1.8rem] shadow-2xl text-white">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center">
                         <Target className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                         <div className="text-[8px] font-black text-indigo-300 uppercase tracking-widest leading-none mb-1">Качество</div>
                         <div className="text-lg font-black text-white">9.8/10</div>
                      </div>
                   </div>
                </div>

                <div className="scale-100 lg:scale-110 xl:scale-115 origin-center">
                   <SEODataTable 
                      type="comparison"
                      title="Матрица эффективности"
                      data={[
                        { label: "LSI Глубокий анализ", us: true, others: false },
                        { label: "AI + Редактор (Гибрид)", us: true, others: false },
                        { label: "SEO Карта интентов", us: true, others: true },
                        { label: "Гарантия индексации", us: true, others: false }
                      ]}
                   />
                </div>
             </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;

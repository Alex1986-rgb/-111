
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CASE_STUDIES } from '../constants';
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  Quote, 
  ChevronRight, 
  ChevronLeft,
  X, 
  Zap, 
  ArrowRight,
  Trophy,
  Maximize2
} from 'lucide-react';
import { CaseStudy } from '../types';
import SEOSection from './SEOSection';

interface CaseStudiesProps {
  showTitle?: boolean;
  showSEO?: boolean;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ showTitle = true, showSEO = false }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<number | null>(null);

  const nextCase = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % CASE_STUDIES.length);
  }, []);

  const prevCase = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = window.setInterval(nextCase, 8000) as unknown as number;
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, nextCase]);

  const handleManualNav = (fn: () => void) => {
    setIsAutoPlaying(false);
    fn();
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const casesFaqs = [
    { q: 'Насколько реальны цифры в кейсах?', a: 'Все цифры подтверждены данными из Яндекс.Метрики, Google Analytics и внутренних кабинетов маркетплейсов наших клиентов. Мы не используем "рисованные" показатели.' },
    { q: 'Как быстро вы достигаете таких результатов?', a: 'SEO — это игра вдолгую. Первые результаты (рост позиций) обычно видны через 4-6 недель. Кратный рост трафика, как в наших кейсах, обычно достигается на горизонте 4-8 месяцев активной работы.' },
    { q: 'Можете ли вы гарантировать такой же результат для моего бизнеса?', a: 'Мы гарантируем качество контента и соблюдение всех SEO-стандартов. Итоговый результат также зависит от технического состояния вашего сайта и активности конкурентов, но наш опыт позволяет минимизировать риски.' },
    { q: 'Работаете ли вы с новыми проектами без истории?', a: 'Да, запуск контент-стратегии для нового домена — одна из наших любимых задач. Это позволяет заложить правильный фундамент и избежать ошибок, которые потом сложно исправлять.' }
  ];

  return (
    <>
      <section className="py-16 bg-slate-50 relative overflow-hidden font-inter">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {showTitle && (
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-white border border-slate-200 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest mb-4">
                   <Trophy className="w-3 h-3" /> Кейс-стади
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter text-slate-900 leading-[0.95]">
                  Наши <span className="text-indigo-600">результаты</span>
                </h2>
                <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
                  Посмотрите, как мы решаем реальные задачи бизнеса.
                </p>
              </div>
              
              <div className="hidden md:flex gap-2">
                <button 
                  onClick={() => handleManualNav(prevCase)}
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all active:scale-90 group shadow-sm"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button 
                  onClick={() => handleManualNav(nextCase)}
                  className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition-all active:scale-90 group shadow-lg shadow-indigo-100"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )}

          <div className="relative min-h-[500px] md:min-h-[550px]">
            {CASE_STUDIES.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div 
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isActive ? 'opacity-100 z-20 pointer-events-auto scale-100' : 'opacity-0 z-10 pointer-events-none scale-98'
                  }`}
                >
                  <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col lg:flex-row h-full">
                    
                    <div className="lg:w-5/12 relative overflow-hidden h-64 lg:h-auto">
                      <img 
                        src={item.image + '&w=1000'} 
                        alt={item.title} 
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover transition-transform duration-[8s] ${isActive ? 'scale-105' : 'scale-100'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/40 via-transparent to-transparent"></div>
                      
                      <div className="absolute bottom-6 left-6 right-6 hidden md:grid grid-cols-2 gap-3">
                         {item.metrics.slice(0, 2).map((m, i) => (
                           <div 
                            key={i} 
                            className={`bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg transition-all duration-500 delay-[400ms] ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                           >
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 flex items-center gap-1">
                                 <TrendingUp className="w-2.5 h-2.5 text-emerald-500" /> {m.label}
                              </div>
                              <div className="text-xl font-black text-indigo-600 tracking-tighter">{m.value}</div>
                           </div>
                         ))}
                      </div>

                      <button 
                        onClick={() => setSelectedCase(item)}
                        className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-xl group"
                      >
                        <Maximize2 className="w-5 h-5 group-hover:scale-110" />
                      </button>
                    </div>

                    <div className="lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                      <div className={`transition-all duration-500 delay-200 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                        <div className="flex items-center gap-3 text-indigo-600 font-black text-[9px] uppercase tracking-[0.3em] mb-4">
                           <span className="w-8 h-0.5 bg-indigo-600 rounded-full"></span>
                           {item.category}
                        </div>
                        <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed font-medium">
                          {item.description}
                        </p>
                      </div>
                      
                      <div className={`flex items-center gap-4 mb-8 transition-all duration-500 delay-300 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                         <button 
                          onClick={() => setSelectedCase(item)}
                          className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 active:scale-95 group"
                         >
                            Подробнее <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                         </button>
                      </div>

                      <div className={`pt-8 border-t border-slate-50 flex items-center gap-6 transition-all duration-500 delay-400 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                          <Quote className="w-7 h-7 fill-current opacity-20" />
                        </div>
                        <div>
                          <p className="text-sm italic font-bold text-slate-800 mb-1 leading-snug">«{item.quote.text}»</p>
                          <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                            {item.quote.author} <span className="mx-2 text-indigo-200">|</span> {item.quote.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex gap-2.5">
                {CASE_STUDIES.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => handleManualNav(() => setCurrentIndex(i))}
                    className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-12 bg-indigo-600 shadow-sm' : 'w-3 bg-slate-200 hover:bg-slate-300'}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
             </div>
             
             <div className="flex items-center gap-4">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   {String(currentIndex + 1).padStart(2, '0')} <span className="text-slate-200 mx-2">/</span> {String(CASE_STUDIES.length).padStart(2, '0')}
                </div>
             </div>
          </div>
        </div>

        {selectedCase && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedCase(null)}></div>
            
            <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl animate-in zoom-in slide-in-from-bottom-8 duration-500 flex flex-col md:flex-row max-h-[85vh]">
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-6 right-6 z-30 w-12 h-12 bg-white/90 backdrop-blur rounded-2xl flex items-center justify-center text-slate-900 shadow-xl hover:rotate-90 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="md:w-5/12 relative overflow-hidden hidden md:block">
                 <img src={selectedCase.image + '&w=1000'} className="w-full h-full object-cover" alt={selectedCase.title} loading="lazy" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex flex-col justify-end p-12">
                    <h2 className="text-3xl font-black text-white leading-tight mb-4">{selectedCase.title}</h2>
                    <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest w-fit">
                      {selectedCase.category}
                    </div>
                 </div>
              </div>
              
              <div className="md:w-7/12 p-10 overflow-y-auto bg-slate-50 custom-scrollbar">
                 <div className="space-y-12">
                    <section>
                      <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                         <BarChart3 className="w-4 h-4" /> Показатели
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                         {selectedCase.metrics.map((m, i) => (
                           <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</div>
                              <div className="text-2xl font-black text-indigo-600 tracking-tighter">{m.value}</div>
                           </div>
                         ))}
                      </div>
                    </section>
                    
                    <section className="space-y-6">
                      <div>
                        <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4">Детали</h4>
                        <p className="text-slate-600 text-base leading-relaxed font-medium">{selectedCase.resultsDetail}</p>
                      </div>
                      
                      <div className="p-8 bg-indigo-600 rounded-[2rem] text-white shadow-xl">
                         <h4 className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Стратегия
                         </h4>
                         <p className="text-sm font-bold leading-relaxed">
                            Мы использовали фокус на боли аудитории и LSI-семантику для достижения максимального охвата в этой нише.
                         </p>
                      </div>
                    </section>

                    <button className="w-full py-6 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95">
                      Получить консультацию <ArrowRight className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {showSEO && (
        <SEOSection 
          title="Как контент влияет на бизнес-показатели"
          subtitle="Наши кейсы — это не просто красивые картинки, а реальные истории роста выручки и трафика."
          seoText={`
            <p>В этом разделе мы собрали наиболее показательные примеры нашей работы. Каждый кейс демонстрирует комплексный подход TextFlow к решению задач клиента: от глубокого аудита ниши до финальной LSI-оптимизации контента.</p>
            <p><strong>Что объединяет наши успешные проекты?</strong> Во-первых, это работа с интентом пользователя. Мы не просто пишем тексты, мы отвечаем на вопросы, которые задает ваша аудитория. Во-вторых, это техническая безупречность: правильная структура заголовков, отсутствие переспама и высокая уникальность.</p>
            <p>Мы работаем в самых разных нишах: от высококонкурентного E-commerce и недвижимости до сложных IT-продуктов и медицины. Наш опыт позволяет быстро находить точки роста для любого бизнеса через качественный контент.</p>
          `}
          faqs={casesFaqs}
        />
      )}
    </>
  );
};

export default CaseStudies;

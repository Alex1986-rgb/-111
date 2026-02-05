
import React, { useState } from 'react';
import { Target, Zap, TrendingUp, Users, ArrowRight, CheckCircle, Gift, RefreshCcw } from 'lucide-react';

interface QuizStep {
  question: string;
  options: {
    label: string;
    icon: any;
    value: string;
    desc: string;
  }[];
}

const steps: QuizStep[] = [
  {
    question: "Какая основная цель вашего контента?",
    options: [
      { label: "SEO Трафик", icon: TrendingUp, value: "seo", desc: "Выход в ТОП Яндекса и Google" },
      { label: "Продажи", icon: Zap, value: "sales", desc: "Максимальная конверсия в покупку" },
      { label: "Репутация", icon: Users, value: "brand", desc: "Статус эксперта и доверие бренда" },
    ]
  },
  {
    question: "Где вы планируете размещать тексты?",
    options: [
      { label: "Свой сайт / Блог", icon: Target, value: "site", desc: "Развитие собственного ресурса" },
      { label: "Маркетплейсы", icon: Gift, value: "market", desc: "WB, Ozon, Яндекс.Маркет" },
      { label: "СМИ / VC.ru", icon: CheckCircle, value: "pr", desc: "Внешние площадки для охвата" },
    ]
  }
];

const ConversionQuiz: React.FC<{ onComplete: (serviceId: string) => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    if (answers.includes('market')) return { id: 'bulk', name: 'Массовое создание карточек', discount: '10%' };
    if (answers.includes('seo')) return { id: 'seo', name: 'LSI-копирайтинг', discount: '5%' };
    return { id: 'blog', name: 'Экспертные статьи', discount: '7%' };
  };

  const rec = getRecommendation();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-50 rounded-[3.5rem] p-10 md:p-16 border border-slate-100 shadow-sm relative overflow-hidden">
          {!showResult ? (
            <div className="animate-in fade-in slide-in-from-right duration-500">
              <div className="flex justify-between items-center mb-10">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Шаг {currentStep + 1} из {steps.length}</div>
                <div className="flex gap-1">
                  {steps.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all ${i <= currentStep ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`}></div>
                  ))}
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-12 tracking-tighter leading-none">
                {steps[currentStep].question}
              </h2>
              <div className="grid gap-4">
                {steps[currentStep].options.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="flex items-center gap-6 p-6 bg-white border-2 border-transparent hover:border-indigo-600 rounded-[2rem] text-left transition-all hover:shadow-xl hover:-translate-y-1 group"
                    >
                      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-lg">{opt.label}</div>
                        <div className="text-sm text-slate-400 font-medium">{opt.desc}</div>
                      </div>
                      <ArrowRight className="ml-auto w-6 h-6 text-slate-200 group-hover:text-indigo-600 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">Ваша идеальная стратегия готова!</h2>
              <p className="text-slate-500 text-lg mb-10 font-medium">Основываясь на ваших целях, мы рекомендуем тариф:</p>
              
              <div className="bg-white p-8 rounded-[2.5rem] border-2 border-emerald-500/20 shadow-2xl mb-12 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4">
                    <div className="bg-emerald-500 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">Скидка {rec.discount}</div>
                 </div>
                 <h3 className="text-3xl font-black text-indigo-600 mb-2">{rec.name}</h3>
                 <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Персональное предложение для вас</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => onComplete(rec.id)}
                  className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  Перейти к расчету <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => { setShowResult(false); setCurrentStep(0); setAnswers([]); }}
                  className="px-10 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
                >
                  <RefreshCcw className="w-5 h-5" /> Сначала
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConversionQuiz;

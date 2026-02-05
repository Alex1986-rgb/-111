
import React from 'react';
import { MousePointer2, ClipboardCheck, Sparkles, SendHorizontal } from 'lucide-react';

const steps = [
  {
    icon: MousePointer2,
    title: 'Аудит и расчет',
    desc: 'Рассчитайте стоимость на базе LSI-метрик. Мы анализируем нишу еще до старта работы.'
  },
  {
    icon: ClipboardCheck,
    title: 'Сбор семантики',
    desc: 'Наши редакторы формируют карту смыслов и ключевых запросов для максимального охвата.'
  },
  {
    icon: Sparkles,
    title: 'Создание актива',
    desc: 'Эксперт пишет текст, внедряя психологические триггеры и SEO-оптимизацию 2025 года.'
  },
  {
    icon: SendHorizontal,
    title: 'Ваш результат',
    desc: 'Получаете контент, готовый к публикации. Тексты, которые начинают работать сразу.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100">
            Workflow 2.0
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Путь к <span className="text-indigo-600">ТОП-1</span> в 4 шага</h2>
          <p className="text-slate-500 font-medium text-lg">Прозрачный процесс от первичного аудита до взрывного роста трафика.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 relative">
          <div className="hidden md:block absolute top-16 left-24 right-24 h-1 bg-slate-50 -z-0"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-32 h-32 bg-white border-4 border-slate-50 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-sm group-hover:border-indigo-600 transition-all duration-500">
                <step.icon className="w-12 h-12 text-indigo-600 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-indigo-600 transition-colors">{step.title}</h3>
              <p className="text-base text-slate-500 leading-relaxed px-6 font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface LeadCaptureProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
}

// Переиспользуемый лид-блок: email -> заявка (открывает Telegram).
const LeadCapture: React.FC<LeadCaptureProps> = ({
  title = 'Бесплатный расчёт и SEO-аудит за 30 минут',
  subtitle = 'Оставьте e-mail — менеджер подготовит смету и стратегию контента под вашу нишу. Без обязательств.',
  buttonText = 'Получить расчёт',
  className = '',
}) => {
  return (
    <section className={`py-8 ${className}`} aria-label="Получить расчёт">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-indigo-700 p-7 md:p-12 relative overflow-hidden">
          <div className="absolute -top-16 -right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 leading-tight">{title}</h2>
              <p className="text-indigo-100 text-sm md:text-base leading-snug max-w-md">{subtitle}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-xs font-medium text-indigo-100">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Ответ за 30 минут</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Бесплатно</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Без спама</span>
              </div>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); window.open('https://t.me/textflow_agency', '_blank', 'noopener'); }}
              className="bg-white rounded-2xl sm:rounded-full p-2 flex flex-col sm:flex-row gap-2 shadow-2xl"
            >
              <input
                type="email"
                required
                placeholder="Ваш e-mail"
                aria-label="E-mail для расчёта"
                className="flex-1 bg-transparent px-5 py-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl sm:rounded-full bg-slate-900 text-white font-semibold text-sm tracking-tight hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {buttonText} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;

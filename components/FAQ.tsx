
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Как вы гарантируете экспертность в узких нишах?',
    a: 'Мы привлекаем профильных экспертов для консультаций. Если мы пишем о финтехе, текст проходит проверку у специалиста с опытом в банковской сфере. Это позволяет избежать "воды" и фактических ошибок.'
  },
  {
    q: 'Чем LSI-копирайтинг отличается от обычного SEO?',
    a: 'Обычное SEO — это вписывание ключей. LSI — это работа со смыслами. Мы используем тематически связанные слова (латентно-семантическое индексирование), что делает текст естественным для людей и эталонным для поисковиков.'
  },
  {
    q: 'Работаете ли вы с большими объемами (100+ текстов в неделю)?',
    a: 'Да, у нас выстроена конвейерная система с сохранением качества. Для крупных заказов мы выделяем персонального выпускающего редактора и фиксированную команду авторов.'
  },
  {
    q: 'Предоставляете ли вы отчеты по уникальности и SEO-метрикам?',
    a: 'К каждому тексту прилагается отчет: проверка на плагиат (Text.ru), показатели "тошноты", плотность ключей и соответствие ТЗ. Мы сдаем работу, которая не требует доработок.'
  },
  {
    q: 'Как быстро окупаются инвестиции в контент?',
    a: 'Информационные статьи начинают приносить трафик через 2-4 месяца и работают годами. Карточки на маркетплейсах реагируют быстрее: рост позиций обычно заметен через 7-14 дней после обновления описания.'
  }
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4">Ответы на <span className="text-indigo-600">важные вопросы</span></h2>
        <p className="text-slate-500">Все, что нужно знать перед стартом работы с лучшей редакцией страны.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className={`border-2 rounded-[2rem] transition-all overflow-hidden ${open === i ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
          >
            <button 
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full p-8 flex justify-between items-center text-left"
            >
              <span className="text-lg font-black text-slate-900 leading-tight">{faq.q}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${open === i ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            {open === i && (
              <div className="px-8 pb-8 text-slate-500 leading-relaxed animate-in slide-in-from-top-2 duration-300">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

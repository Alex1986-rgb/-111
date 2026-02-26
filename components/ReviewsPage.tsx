
import React from 'react';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';
import { View } from '../types';
import SEOSection from './SEOSection';

interface ReviewsPageProps {
  setView?: (view: View) => void;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ setView }) => {
  const reviewsFaqs = [
    { q: 'Как я могу оставить отзыв?', a: 'После завершения проекта и принятия работы в личном кабинете, вам придет ссылка на форму обратной связи. Мы ценим честные отзывы, так как они помогают нам становиться лучше.' },
    { q: 'Проходят ли отзывы модерацию?', a: 'Мы публикуем все отзывы от реальных клиентов, с которыми у нас был заключен договор. Модерация проверяет только отсутствие нецензурной лексики и персональных данных третьих лиц.' },
    { q: 'Могу ли я связаться с кем-то из ваших клиентов для рекомендации?', a: 'Из соображений конфиденциальности мы не передаем прямые контакты клиентов. Однако многие отзывы содержат названия компаний, и вы можете найти их представителей в LinkedIn или на официальных сайтах.' },
    { q: 'Что делать, если я недоволен работой?', a: 'В первую очередь — сообщите об этом вашему аккаунт-менеджеру. Мы гарантируем бесплатные правки и приложим все усилия, чтобы исправить ситуацию. Ваша удовлетворенность — наш приоритет.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Что о нас <span className="text-indigo-600">говорят</span></h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">Мы дорожим каждым клиентом и стремимся делать лучший контент на рынке.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {REVIEWS.map((review) => (
          <div key={review.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:shadow-2xl transition-all duration-500">
            <Quote className="absolute top-10 right-10 w-12 h-12 text-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
              ))}
            </div>
            <p className="text-slate-600 leading-relaxed mb-8 italic">
              "{review.text}"
            </p>
            <div className="flex items-center gap-4">
              <img src={review.avatar} alt={review.author} className="w-14 h-14 rounded-full border-4 border-slate-50 shadow-sm" />
              <div>
                <div className="font-black text-slate-900">{review.author}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{review.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SEOSection 
        title="Репутация, построенная на качестве"
        subtitle="Почему сотни компаний доверяют свой контент именно редакции TextFlow."
        seoText={`
          <p>Отзывы наших клиентов — это лучшее подтверждение нашей экспертности. Мы работаем как с небольшими стартапами, так и с крупными международными брендами, обеспечивая неизменно высокий уровень сервиса и качества текстов.</p>
          <p><strong>Что чаще всего отмечают наши заказчики?</strong> В первую очередь, это глубокое погружение в специфику бизнеса. Мы не пишем "общие слова", а оперируем фактами и цифрами, важными для вашей аудитории. Также клиенты ценят строгое соблюдение дедлайнов и прозрачность всех процессов.</p>
          <p>Мы открыты к любой обратной связи и постоянно совершенствуем наши внутренние стандарты качества на основе ваших пожеланий. Ваш успех в поисковой выдаче и рост конверсии — это и наш успех тоже.</p>
        `}
        faqs={reviewsFaqs}
        className="mt-20"
      />

      <div className="mt-20 bg-indigo-600 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full"></div>
        <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">Станьте нашим довольным клиентом</h2>
        <p className="text-indigo-100 mb-10 text-lg max-w-2xl mx-auto relative z-10">Доверьте нам свой контент, и мы покажем, как правильные слова могут развивать ваш бизнес.</p>
        <button 
          onClick={() => setView && setView('pricing')}
          className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl relative z-10"
        >
          Начать проект
        </button>
      </div>
    </div>
  );
};

export default ReviewsPage;

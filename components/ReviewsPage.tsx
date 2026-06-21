
import React from 'react';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';
import { View } from '../types';
import SEOSection from './SEOSection';
import LeadCapture from './LeadCapture';
import { PAGE_CONTENT } from './pageContent';

interface ReviewsPageProps {
  setView?: (view: View) => void;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ setView }) => {

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-black mb-4">Что о нас <span className="text-indigo-600">говорят</span></h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-base">Мы дорожим каждым клиентом и стремимся делать лучший контент на рынке.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REVIEWS.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:shadow-2xl transition-all duration-500">
            <Quote className="absolute top-10 right-10 w-12 h-12 text-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
              ))}
            </div>
            <p className="text-slate-600 leading-relaxed mb-5 italic">
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

      <LeadCapture title="Хотите оказаться среди довольных клиентов?" subtitle="Оставьте e-mail — бесплатно рассчитаем стоимость и проведём аудит вашего контента." className="mt-6" />

      <SEOSection
        title="Репутация, построенная на качестве"
        subtitle="Почему сотни компаний доверяют свой контент именно редакции TextFlow."
        seoText={PAGE_CONTENT.reviews.seo}
        faqs={PAGE_CONTENT.reviews.faq}
        className="mt-6"
      />

      <div className="mt-6 bg-indigo-600 rounded-[4rem] p-6 md:p-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full"></div>
        <h2 className="text-3xl md:text-4xl font-black mb-4 relative z-10">Станьте нашим довольным клиентом</h2>
        <p className="text-indigo-100 mb-4 text-base max-w-2xl mx-auto relative z-10">Доверьте нам свой контент, и мы покажем, как правильные слова могут развивать ваш бизнес.</p>
        <button 
          onClick={() => setView && setView('pricing')}
          className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl relative z-10"
        >
          Начать проект
        </button>
      </div>
    </div>
  );
};

export default ReviewsPage;


import React, { useState } from 'react';
import { Service } from '../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  PlusCircle, 
  MinusCircle,
  ChevronLeft,
  ShoppingBag,
  Search,
  Database,
  Code,
  Megaphone,
  Share2,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';

const iconsMap: Record<string, any> = {
  Database, Search, Layers: ShoppingBag, Zap, Code, Megaphone, Share2, Sparkles, LayoutDashboard
};

interface ServicePageProps {
  service: Service;
  onBack: () => void;
  onOrder: (serviceId: string, symbols: number, price: number) => void;
}

const ServicePage: React.FC<ServicePageProps> = ({ service, onBack, onOrder }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const Icon = iconsMap[service.icon] || Zap;

  const defaultFeatures = [
    "100% уникальность по Text.ru",
    "LSI-оптимизация под Яндекс и Google",
    "Проверка экспертности (E-E-A-T)",
    "Трехуровневая редактура",
    "Гарантия индексации"
  ];

  const features = service.features || defaultFeatures;

  const defaultFaq = [
    { q: "Как быстро будет готов текст?", a: "Срок выполнения зависит от объема, но в среднем составляет 2-3 рабочих дня для статьи в 5-7 тысяч знаков." },
    { q: "Можно ли внести правки?", a: "Да, мы предоставляем 2 круга бесплатных правок в рамках изначального ТЗ." },
    { q: "Вы работаете с НДС?", a: "Да, мы работаем как с физлицами, так и с юрлицами (ИП, ООО) с предоставлением всех закрывающих документов." }
  ];

  const faq = service.faq || defaultFaq;

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-12 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Назад к услугам
          </button>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <Icon className="w-3.5 h-3.5" /> {service.name}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8">
                {service.seoTitle || service.name}
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
                {service.seoDescription || service.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <button 
                  onClick={() => onOrder(service.id, 2000, service.pricePer1k * 2)}
                  className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-3 shadow-xl shadow-indigo-100"
                >
                  Заказать сейчас
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">От</div>
                  <div className="text-2xl font-black text-slate-900">{service.pricePer1k} ₽</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">за 1к зн.</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 relative z-10">
                <h3 className="text-2xl font-black text-slate-900 mb-8">Что включено в стоимость:</h3>
                <div className="space-y-5">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-indigo-100 transition-all">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-bold leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">Почему стоит выбрать {service.name} от TextFlow?</h2>
            <div className="text-slate-600 leading-relaxed space-y-8 font-medium">
              {service.fullContent ? (
                <div dangerouslySetInnerHTML={{ __html: service.fullContent }} />
              ) : (
                <>
                  <p>
                    В современном мире контент — это не просто набор слов, а мощный инструмент коммуникации и продвижения. Наша услуга <strong>{service.name}</strong> разработана специально для того, чтобы ваш бизнес выделялся на фоне конкурентов и занимал лидирующие позиции в поисковой выдаче.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 my-12">
                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                      <TrendingUp className="w-10 h-10 text-indigo-600 mb-6" />
                      <h4 className="text-xl font-black text-slate-900 mb-4">Рост трафика</h4>
                      <p className="text-sm text-slate-500">Наши тексты оптимизированы под актуальные алгоритмы Яндекса и Google, что гарантирует стабильный приток целевой аудитории.</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                      <Target className="w-10 h-10 text-emerald-600 mb-6" />
                      <h4 className="text-xl font-black text-slate-900 mb-4">Конверсия</h4>
                      <p className="text-sm text-slate-500">Мы используем психологические триггеры и маркетинговые формулы, чтобы превращать читателей в реальных покупателей.</p>
                    </div>
                  </div>
                  <p>
                    Мы не просто пишем тексты — мы создаем смыслы. Каждый проект начинается с глубокого анализа вашей ниши, конкурентов и целевой аудитории. Это позволяет нам создавать контент, который действительно резонирует с вашими клиентами.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-16 text-center tracking-tight">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:border-indigo-100 transition-all">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 flex justify-between items-center text-left"
                >
                  <span className="text-lg font-black text-slate-900 leading-tight">{item.q}</span>
                  <div className="shrink-0 ml-4">
                    {activeFaq === i ? <MinusCircle className="w-6 h-6 text-indigo-600" /> : <PlusCircle className="w-6 h-6 text-slate-300" />}
                  </div>
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-8 text-slate-500 leading-relaxed font-medium animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent)]"></div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 tracking-tight">
              Готовы заказать <br /> <span className="text-indigo-400">{service.name}?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto relative z-10">
              Начните работу с профессионалами сегодня и получите первые результаты уже через несколько дней.
            </p>
            <button 
              onClick={() => onOrder(service.id, 2000, service.pricePer1k * 2)}
              className="px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/20 relative z-10 hover:scale-105 active:scale-95"
            >
              Заказать проект
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;


import React, { useState } from 'react';
import { Service } from '../types';
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  Target,
  Clock,
  ChevronLeft,
  ChevronDown,
  ShoppingBag,
  Search,
  Database,
  Code,
  Megaphone,
  Share2,
  Sparkles,
  LayoutDashboard,
  Star,
  Users,
  FileSearch,
  PenLine,
  Rocket,
  Send,
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
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const Icon = iconsMap[service.icon] || Zap;

  const features = service.features || [
    "100% уникальность по Text.ru",
    "LSI-оптимизация под Яндекс и Google",
    "Проверка экспертности (E-E-A-T)",
    "Трехуровневая редактура",
    "Гарантия индексации",
  ];

  const faq = service.faq || [
    { q: "Как быстро будет готов текст?", a: "Срок выполнения зависит от объема, но в среднем составляет 2-3 рабочих дня для статьи в 5-7 тысяч знаков." },
    { q: "Можно ли внести правки?", a: "Да, мы предоставляем 2 круга бесплатных правок в рамках изначального ТЗ." },
    { q: "Вы работаете с НДС?", a: "Да, мы работаем как с физлицами, так и с юрлицами (ИП, ООО) с предоставлением всех закрывающих документов." },
  ];

  const stats = [
    { value: "1200+", label: "проектов сдано", icon: Rocket },
    { value: "98%", label: "довольных клиентов", icon: Star },
    { value: "2–3 дня", label: "средний срок", icon: Clock },
    { value: "100%", label: "уникальность", icon: ShieldCheck },
  ];

  const steps = [
    { icon: FileSearch, title: "Бриф и аудит", text: "Изучаем нишу, конкурентов и цели. Согласуем ТЗ и семантику." },
    { icon: PenLine, title: "Написание", text: "Профильный автор создаёт текст под контролем выпускающего редактора." },
    { icon: ShieldCheck, title: "Проверка", text: "Уникальность, тошнота, LSI, факт-чек и соответствие E-E-A-T." },
    { icon: Rocket, title: "Публикация", text: "Сдаём готовый материал или публикуем напрямую в вашу CMS." },
  ];

  const benefits = [
    { icon: TrendingUp, color: "text-indigo-600 bg-indigo-50", title: "Рост трафика", text: "Тексты заточены под актуальные алгоритмы Яндекса и Google — стабильный приток целевой аудитории." },
    { icon: Target, color: "text-emerald-600 bg-emerald-50", title: "Рост конверсии", text: "Маркетинговые формулы и психологические триггеры превращают читателей в покупателей." },
    { icon: Clock, color: "text-amber-600 bg-amber-50", title: "Экономия времени", text: "Берём на себя весь цикл — от исследования до публикации. Вы занимаетесь бизнесом." },
  ];

  const orderNow = () => onOrder(service.id, 2000, service.pricePer1k * 2);

  return (
    <div className="bg-white animate-fade-in text-[var(--color-apple-ink)]">
      {/* ===== Hero ===== */}
      <section className="relative pt-28 pb-12 overflow-hidden bg-[var(--color-apple-mist)]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[var(--color-apple-grey)] hover:text-indigo-600 font-semibold text-xs tracking-tight mb-5 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Назад к услугам
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600 text-white rounded-full text-[11px] font-semibold tracking-tight mb-4">
                <Icon className="w-3.5 h-3.5" /> {service.name}
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] mb-4">
                {(service.seoTitle || service.name).split('|')[0].trim()}
              </h1>
              <p className="text-base md:text-lg text-[var(--color-apple-grey)] font-normal leading-snug mb-6 max-w-xl">
                {service.seoDescription || service.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <button
                  onClick={orderNow}
                  className="apple-btn px-8 py-4 text-sm"
                >
                  Заказать сейчас <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2.5 px-5 py-3.5 bg-white rounded-full border border-black/[0.06] shadow-sm">
                  <span className="text-[11px] font-medium text-[var(--color-apple-grey)] tracking-tight">от</span>
                  <span className="text-xl font-semibold">{service.pricePer1k} ₽</span>
                  <span className="text-[11px] font-medium text-[var(--color-apple-grey)] tracking-tight">/ 1к зн.</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[var(--color-apple-grey)] tracking-tight">
                <span className="inline-flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 5.0 рейтинг</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 2 круга правок</span>
                <span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-indigo-500" /> 1200+ клиентов</span>
              </div>
            </div>

            <div className="relative">
              <div className="apple-card p-6 md:p-8 relative z-10">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" /> Что входит в услугу
                </h3>
                <div className="space-y-2.5">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-[var(--color-apple-mist)] rounded-2xl">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl -z-0"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats bar ===== */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="apple-card p-5 flex items-center gap-4">
                <div className="apple-chip w-11 h-11 flex items-center justify-center text-indigo-600 shrink-0">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight leading-none">{s.value}</div>
                  <div className="text-xs font-medium text-[var(--color-apple-grey)] tracking-tight mt-1">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="py-10 bg-[var(--color-apple-mist)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-6">
            <div className="apple-pill-label mb-3"><Zap className="w-3.5 h-3.5 text-indigo-600" /> Процесс</div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">Как мы работаем</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="apple-card p-6 relative">
                <div className="text-5xl font-semibold text-black/[0.05] absolute top-4 right-5 select-none">0{i + 1}</div>
                <div className="apple-chip w-12 h-12 flex items-center justify-center text-indigo-600 mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-apple-grey)] font-normal leading-snug">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Benefits ===== */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-6">
            <div className="apple-pill-label mb-3"><Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Выгоды</div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">Что вы получаете</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="apple-card p-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${b.color}`}>
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2">{b.title}</h3>
                <p className="text-sm text-[var(--color-apple-grey)] font-normal leading-snug">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Detailed content ===== */}
      <section className="py-10 bg-[var(--color-apple-mist)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Почему стоит выбрать «{service.name}» от TextFlow
          </h2>
          <div className="prose prose-slate prose-sm md:prose-base max-w-none text-slate-600 font-medium leading-relaxed">
            {service.fullContent ? (
              <div dangerouslySetInnerHTML={{ __html: service.fullContent }} />
            ) : (
              <>
                <p>
                  Контент — это не просто набор слов, а инструмент продвижения. Услуга <strong>«{service.name}»</strong> создана, чтобы ваш бизнес выделялся среди конкурентов и занимал лидирующие позиции в поисковой выдаче.
                </p>
                <p>
                  Мы не просто пишем тексты — мы создаём смыслы. Каждый проект начинается с глубокого анализа ниши, конкурентов и целевой аудитории. Это позволяет создавать контент, который действительно резонирует с вашими клиентами и приносит измеримый результат.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5 text-center">Частые вопросы</h2>
          <div className="space-y-2.5">
            {faq.map((item, i) => (
              <div key={i} className={`border rounded-2xl overflow-hidden transition-all ${activeFaq === i ? 'border-indigo-600 bg-white shadow-lg shadow-indigo-50' : 'border-slate-100 bg-[var(--color-apple-mist)] hover:border-slate-200'}`}>
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-5 py-4 flex justify-between items-center text-left gap-4"
                >
                  <span className="text-sm md:text-base font-semibold leading-tight">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-indigo-600 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-4 text-sm text-[var(--color-apple-grey)] leading-relaxed font-normal animate-in slide-in-from-top-2 duration-300">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(79,70,229,0.18),transparent_60%)]"></div>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-3 relative z-10 tracking-tight">
              Готовы заказать <span className="text-indigo-400">«{service.name}»</span>?
            </h2>
            <p className="text-base text-slate-400 mb-7 max-w-xl mx-auto relative z-10 leading-snug">
              Начните работу с профессионалами сегодня — первые результаты уже через несколько дней.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
              <button
                onClick={orderNow}
                className="apple-btn px-9 py-4 text-base"
              >
                Заказать проект <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="https://t.me/textflow_agency"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 text-white font-semibold text-base tracking-tight hover:bg-white/15 transition-colors"
              >
                <Send className="w-5 h-5" /> Задать вопрос
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;


import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { REVIEWS } from '../constants';
import { getServiceFaq, getServiceSeoHtml } from './serviceContent';
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  Target,
  Clock,
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
  Quote,
  Home,
  Info,
} from 'lucide-react';

const iconsMap: Record<string, any> = {
  Database, Search, Layers: ShoppingBag, Zap, Code, Megaphone, Share2, Sparkles, LayoutDashboard
};

interface ServicePageProps {
  service: Service;
  services?: Service[];
  onBack: () => void;
  onOrder: (serviceId: string, symbols: number, price: number) => void;
  onSelectService?: (id: string) => void;
}

const ServicePage: React.FC<ServicePageProps> = ({ service, services = [], onBack, onOrder, onSelectService }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const Icon = iconsMap[service.icon] || Zap;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 320;
      setShowStickyBar(y > 620 && !nearBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const features = service.features || [
    "100% уникальность по Text.ru",
    "LSI-оптимизация под Яндекс и Google",
    "Проверка экспертности (E-E-A-T)",
    "Трехуровневая редактура",
    "Гарантия индексации",
  ];

  const faq = getServiceFaq(service);
  const seoHtml = getServiceSeoHtml(service);
  // Видимая часть = интро + первая таблица-сравнение; остальное раскрывается по кнопке
  let seoFirst: string;
  let seoRest: string;
  const firstTableEnd = seoHtml.indexOf('</table>');
  if (firstTableEnd !== -1) {
    const closeIdx = seoHtml.indexOf('</div>', firstTableEnd);
    const cut = closeIdx !== -1 ? closeIdx + '</div>'.length : firstTableEnd + '</table>'.length;
    seoFirst = seoHtml.slice(0, cut);
    seoRest = seoHtml.slice(cut);
  } else {
    const parts = seoHtml.split(/(?<=<\/p>)/i).map((s) => s.trim()).filter(Boolean);
    seoFirst = parts[0] || seoHtml;
    seoRest = parts.slice(1).join('');
  }

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

  const reviews = REVIEWS.slice(0, 3);
  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  const orderNow = () => onOrder(service.id, 2000, service.pricePer1k * 2);

  // ===== Schema.org structured data (SEO canon) =====
  const baseUrl = 'https://alex1986-rgb.github.io/-111';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.name,
        serviceType: service.name,
        description: service.seoDescription || service.description,
        provider: { '@type': 'Organization', name: 'TextFlow', url: baseUrl + '/' },
        areaServed: { '@type': 'Country', name: 'Russia' },
        offers: {
          '@type': 'Offer',
          price: service.pricePer1k,
          priceCurrency: 'RUB',
          description: 'Стоимость за 1000 знаков',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '1200', bestRating: '5' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: baseUrl + '/' },
          { '@type': 'ListItem', position: 2, name: 'Услуги', item: baseUrl + '/#услуги' },
          { '@type': 'ListItem', position: 3, name: service.name },
        ],
      },
    ],
  };

  return (
    <div className="bg-white animate-fade-in text-[var(--color-apple-ink)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ===== Sticky order bar ===== */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${showStickyBar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
      >
        <div className="flex items-center gap-3 sm:gap-4 bg-white/90 backdrop-blur-xl border border-black/[0.06] rounded-full shadow-2xl shadow-black/10 pl-5 pr-2 py-2">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center"><Icon className="w-4 h-4" /></span>
            <span className="text-sm font-semibold tracking-tight max-w-[160px] truncate">{service.name}</span>
          </div>
          <span className="text-sm font-semibold tracking-tight">от {service.pricePer1k} ₽<span className="text-[var(--color-apple-grey)] font-normal text-xs">/1к</span></span>
          <button onClick={orderNow} className="apple-btn px-5 py-2.5 text-sm">
            Заказать <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* ===== Hero ===== */}
      <section className="relative pt-28 pb-12 overflow-hidden bg-[var(--color-apple-mist)]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Хлебные крошки" className="mb-5">
            <ol className="flex items-center flex-wrap gap-2 text-xs font-medium text-[var(--color-apple-grey)] tracking-tight">
              <li>
                <button onClick={onBack} className="inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                  <Home className="w-3.5 h-3.5" /> Главная
                </button>
              </li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li>
                <button onClick={onBack} className="hover:text-indigo-600 transition-colors">Услуги</button>
              </li>
              <li aria-hidden="true" className="text-slate-300">/</li>
              <li aria-current="page" className="text-[var(--color-apple-ink)] font-semibold">{service.name}</li>
            </ol>
          </nav>

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
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" /> Что входит в услугу
                </h2>
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

      {/* ===== SEO long-read (collapsible) ===== */}
      <section className="py-10 bg-[var(--color-apple-mist)]" aria-label="Подробно об услуге">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="apple-pill-label mb-3"><Info className="w-3.5 h-3.5 text-indigo-600" /> Экспертный разбор</div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Всё об услуге «{service.name}»: тарифы, сравнения, гарантии
          </h2>
          <div className="seo-richtext max-w-none">
            <div dangerouslySetInnerHTML={{ __html: seoFirst }} />
            {seoRest && (
              <div className={`grid transition-all duration-500 ease-out ${seoExpanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div dangerouslySetInnerHTML={{ __html: seoRest }} />
                </div>
              </div>
            )}
          </div>
          {seoRest && (
            <button
              onClick={() => setSeoExpanded(!seoExpanded)}
              aria-expanded={seoExpanded}
              className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-600 hover:opacity-70 transition-opacity"
            >
              {seoExpanded ? 'Свернуть' : 'Читать полностью'}
              <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${seoExpanded ? 'rotate-180' : ''}`} />
              </span>
            </button>
          )}
        </div>
      </section>

      {/* ===== Lead capture ===== */}
      <section className="py-10 bg-white" aria-label="Получить расчёт">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-indigo-700 p-7 md:p-12 relative overflow-hidden">
            <div className="absolute -top-16 -right-10 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 leading-tight">Бесплатный расчёт стоимости за 30 минут</h2>
                <p className="text-indigo-100 text-sm md:text-base leading-snug max-w-md">
                  Оставьте заявку — менеджер подготовит точную смету и стратегию контента под вашу нишу. Без обязательств.
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-xs font-medium text-indigo-100">
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Ответ за 30 минут</span>
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Бесплатно</span>
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Без спама</span>
                </div>
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); orderNow(); }}
                className="bg-white rounded-3xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl"
              >
                <input
                  type="email"
                  required
                  placeholder="Ваш e-mail"
                  className="flex-1 bg-transparent px-5 py-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  aria-label="E-mail для расчёта"
                />
                <button type="submit" className="apple-btn px-6 py-3.5 text-sm whitespace-nowrap">
                  Получить расчёт <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-10 bg-white" aria-label="Отзывы клиентов">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-6">
            <div className="apple-pill-label mb-3"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Отзывы</div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">Нам доверяют 1200+ клиентов</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((rev) => (
              <figure key={rev.id} className="apple-card p-6 flex flex-col">
                <Quote className="w-7 h-7 text-indigo-200 fill-current mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-600 font-medium leading-snug mb-5 flex-1">«{rev.text}»</blockquote>
                <figcaption className="flex items-center gap-3 pt-4 border-t border-black/[0.06]">
                  <img src={rev.avatar} alt={rev.author} loading="lazy" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold tracking-tight leading-none">{rev.author}</div>
                    <div className="text-xs font-medium text-[var(--color-apple-grey)] tracking-tight mt-1">{rev.company}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ (10 questions, 2 blocks of 5) ===== */}
      <section className="py-10 bg-white" aria-label="Частые вопросы">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="apple-pill-label mb-3 mx-auto w-fit"><Info className="w-3.5 h-3.5 text-indigo-600" /> FAQ</div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Частые вопросы об услуге</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
            {[faq.slice(0, 5), faq.slice(5, 10)].map((block, b) => (
              <div key={b} className="space-y-2.5">
                {block.map((item, j) => {
                  const i = b * 5 + j;
                  return (
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
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Related services ===== */}
      {related.length > 0 && onSelectService && (
        <section className="py-10 bg-[var(--color-apple-mist)]" aria-label="Похожие услуги">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-6">
              <div className="apple-pill-label mb-3"><Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Ещё услуги</div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">Похожие услуги</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((s) => {
                const RIcon = iconsMap[s.icon] || Zap;
                return (
                  <button
                    key={s.id}
                    onClick={() => { onSelectService(s.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="group apple-card p-6 text-left flex flex-col"
                  >
                    <div className="apple-chip w-11 h-11 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <RIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight mb-1.5 group-hover:text-indigo-600 transition-colors">{s.name}</h3>
                    <p className="text-sm text-[var(--color-apple-grey)] font-normal leading-snug line-clamp-2 mb-4">{s.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-black/[0.06]">
                      <span className="text-sm font-semibold">от {s.pricePer1k} ₽</span>
                      <span className="w-8 h-8 apple-chip flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors"><ArrowRight className="w-4 h-4" /></span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

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

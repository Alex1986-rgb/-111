
import React from 'react';
import { Service } from '../types';
import { 
  FileText, 
  Search, 
  Share2, 
  ShoppingBag, 
  Code, 
  Megaphone, 
  Zap, 
  Layers, 
  Sparkles, 
  ArrowUpRight,
  Database,
  StickyNote,
  LayoutDashboard,
  Star
} from 'lucide-react';

const iconsMap: Record<string, any> = {
  FileText: StickyNote,
  Search, 
  Share2, 
  ShoppingBag, 
  Code, 
  Megaphone, 
  Zap, 
  Layers, 
  Sparkles,
  Database,
  LayoutDashboard
};

interface ServicesGridProps {
  services: Service[];
  onOrder: (serviceId: string, symbols: number, price: number) => void;
  onExplore: (serviceId: string) => void;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ services, onOrder, onExplore }) => {
  return (
    <section className="py-24 bg-[var(--color-apple-mist)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="apple-pill-label">
                <Zap className="w-3.5 h-3.5 fill-current text-[var(--color-apple-blue)]" aria-hidden="true" /> Копирайтинг для бизнеса
              </div>
              <div className="apple-pill-label">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5.0 · 1200+ отзывов
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold text-[var(--color-apple-ink)] tracking-tight leading-[1.05]">
              Профессиональные <br /><span className="text-[var(--color-apple-blue)]">тексты на заказ</span>
            </h2>
          </div>
          <p className="text-[var(--color-apple-grey)] text-lg font-normal max-w-sm leading-relaxed">
            Оптимизированный контент, который решает задачи бизнеса: от SEO-продвижения до роста конверсии карточек.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconsMap[service.icon] || StickyNote;
            return (
              <div
                key={service.id}
                className="group apple-card relative p-10 flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 fill-mode-both cursor-pointer"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => onExplore(service.id)}
                itemScope itemType="https://schema.org/Service"
              >
                <meta itemProp="serviceType" content={service.name} />
                <meta itemProp="description" content={service.description} />

                <div
                  className="apple-chip w-16 h-16 flex items-center justify-center mb-10 group-hover:bg-[var(--color-apple-blue)] group-hover:text-white group-hover:scale-105"
                >
                  <Icon className="w-8 h-8 stroke-[2] transition-transform duration-500 ease-out" />
                </div>

                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-semibold text-[var(--color-apple-ink)] tracking-tight" itemProp="name">
                    {service.name}
                  </h3>
                  <div className="text-xs font-semibold text-[var(--color-apple-blue)] tracking-tight opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Подробнее <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-[var(--color-apple-grey)] text-base leading-relaxed mb-10 font-normal">
                  {service.description}
                </p>

                <div className="mt-auto pt-8 border-t border-black/[0.06] flex items-center justify-between" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                       <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                       </div>
                       <span className="text-xs font-medium text-[var(--color-apple-grey)] tracking-tight">98% довольных</span>
                    </div>
                    <div className="text-xs font-medium text-[var(--color-apple-grey)] tracking-tight mb-1.5">Стоимость за 1к зн.</div>
                    <div className="text-2xl font-semibold text-[var(--color-apple-ink)] tracking-tight">
                      <span itemProp="price">{service.pricePer1k}</span> <span className="text-sm font-normal text-[var(--color-apple-grey)]" itemProp="priceCurrency" content="RUB">₽</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOrder(service.id, 2000, service.pricePer1k * 2);
                    }}
                    className="apple-btn w-14 h-14 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-500"
                    aria-label={`Заказать ${service.name}`}
                  >
                    <Zap className="w-6 h-6 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

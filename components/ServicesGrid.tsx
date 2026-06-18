
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
    <section className="py-9 bg-[var(--color-apple-mist)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="apple-pill-label">
                <Zap className="w-3.5 h-3.5 fill-current text-[var(--color-apple-blue)]" aria-hidden="true" /> Копирайтинг для бизнеса
              </div>
              <div className="apple-pill-label">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5.0 · 1200+ отзывов
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-apple-ink)] tracking-tight leading-tight">
              Профессиональные <span className="text-[var(--color-apple-blue)]">тексты на заказ</span>
            </h2>
          </div>
          <p className="text-[var(--color-apple-grey)] text-sm font-normal max-w-sm leading-snug">
            Оптимизированный контент, который решает задачи бизнеса: от SEO-продвижения до роста конверсии карточек.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const Icon = iconsMap[service.icon] || StickyNote;
            return (
              <div
                key={service.id}
                className="group apple-card relative p-5 flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 fill-mode-both cursor-pointer"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => onExplore(service.id)}
                itemScope itemType="https://schema.org/Service"
              >
                <meta itemProp="serviceType" content={service.name} />
                <meta itemProp="description" content={service.description} />

                <div className="flex items-start gap-3 mb-2">
                  <div
                    className="apple-chip w-11 h-11 shrink-0 flex items-center justify-center group-hover:bg-[var(--color-apple-blue)] group-hover:text-white group-hover:scale-105"
                  >
                    <Icon className="w-6 h-6 stroke-[2] transition-transform duration-500 ease-out" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-apple-ink)] tracking-tight leading-tight pt-0.5" itemProp="name">
                    {service.name}
                  </h3>
                </div>

                <p className="text-[var(--color-apple-grey)] text-sm leading-snug mb-3 font-normal line-clamp-2">
                  {service.description}
                </p>

                <div className="mt-auto pt-3 border-t border-black/[0.06] flex items-center justify-between" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <div>
                    <div className="text-[11px] font-medium text-[var(--color-apple-grey)] tracking-tight">Стоимость за 1к зн.</div>
                    <div className="text-xl font-semibold text-[var(--color-apple-ink)] tracking-tight">
                      <span itemProp="price">{service.pricePer1k}</span> <span className="text-sm font-normal text-[var(--color-apple-grey)]" itemProp="priceCurrency" content="RUB">₽</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOrder(service.id, 2000, service.pricePer1k * 2);
                    }}
                    className="apple-btn w-11 h-11 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-500"
                    aria-label={`Заказать ${service.name}`}
                  >
                    <Zap className="w-5 h-5 fill-current" />
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

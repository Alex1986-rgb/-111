
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
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 stroke-[2.5] fill-current animate-pulse" aria-hidden="true" /> Копирайтинг для бизнеса
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                <Star className="w-3 h-3 fill-current" /> 5.0 (1200+ отзывов)
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
              Профессиональные <br /><span className="text-indigo-600">тексты на заказ</span>
            </h2>
          </div>
          <p className="text-slate-500 text-lg font-medium max-w-sm opacity-80">
            Оптимизированный контент, который решает задачи бизнеса: от SEO-продвижения до роста конверсии карточек.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconsMap[service.icon] || StickyNote;
            return (
              <div 
                key={service.id} 
                className="group relative p-10 bg-slate-50 rounded-[3rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-700 ease-out flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 fill-mode-both cursor-pointer"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => onExplore(service.id)}
                itemScope itemType="https://schema.org/Service"
              >
                <meta itemProp="serviceType" content={service.name} />
                <meta itemProp="description" content={service.description} />
                
                <div 
                  className="w-16 h-16 bg-white text-indigo-600 rounded-2xl flex items-center justify-center mb-10 shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-indigo-200 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-6 group-hover:scale-110"
                >
                  <Icon className="w-8 h-8 stroke-[2.5] transition-transform duration-500 ease-out group-hover:rotate-[-6deg] group-hover:scale-110" />
                </div>
                
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors duration-300" itemProp="name">
                    {service.name}
                  </h3>
                  <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Подробнее <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
                
                <p className="text-slate-500 text-base leading-relaxed mb-10 font-medium group-hover:text-slate-600 transition-colors duration-300">
                  {service.description}
                </p>

                <div className="mt-auto pt-8 border-t border-slate-200/50 flex items-center justify-between" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                       <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                       </div>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">98% довольных</span>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Стоимость за 1к зн.</div>
                    <div className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                      <span itemProp="price">{service.pricePer1k}</span> <span className="text-sm font-medium text-slate-400 group-hover:text-indigo-300 transition-colors" itemProp="priceCurrency" content="RUB">₽</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOrder(service.id, 2000, service.pricePer1k * 2);
                    }}
                    className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-all active:scale-90 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-500 ease-out shadow-lg"
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

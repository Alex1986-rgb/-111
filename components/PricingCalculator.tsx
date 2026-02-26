
import React, { useState, useMemo } from 'react';
import { Service } from '../types';
import { Calculator, ShoppingBasket, Zap, CheckCircle2, AlertCircle, Info, ReceiptText, ShieldCheck, BarChart3 } from 'lucide-react';
import SEODataTable from './SEODataTable';
import SEOSection from './SEOSection';

interface PricingCalculatorProps {
  services: Service[];
  onStartOrder: (serviceId: string, symbols: number, price: number) => void;
  showSEO?: boolean;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ services, onStartOrder, showSEO = false }) => {
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);
  const [symbols, setSymbols] = useState(2000);
  const [isUrgent, setIsUrgent] = useState(false);

  const selectedService = services.find(s => s.id === selectedServiceId)!;
  
  const discount = useMemo(() => {
    if (symbols >= 10000) return 0.15;
    if (symbols >= 5000) return 0.10;
    return 0;
  }, [symbols]);

  const totalPrice = useMemo(() => {
    let base = (symbols / 1000) * selectedService.pricePer1k;
    base = base * (1 - discount);
    return isUrgent ? base * 1.5 : base;
  }, [symbols, selectedService, isUrgent, discount]);

  const handleOrder = () => {
    onStartOrder(selectedServiceId, symbols, Math.round(totalPrice));
  };

  const pricingFaqs = [
    { q: 'От чего зависит стоимость текста?', a: 'Цена формируется исходя из сложности темы, необходимого объема (в знаках без пробелов) и срочности выполнения. Для сложных технических или медицинских текстов тариф выше из-за привлечения узких экспертов.' },
    { q: 'Есть ли скидки при больших заказах?', a: 'Да, наша система автоматически применяет скидку 10% при заказе от 5 000 знаков и 15% при заказе от 10 000 знаков. Для Enterprise-клиентов с объемами от 1 млн знаков действуют индивидуальные условия.' },
    { q: 'Как оплатить заказ?', a: 'Мы принимаем оплату банковскими картами, через СБП, а также работаем по безналичному расчету с выставлением счета для юридических лиц (ИП, ООО).' },
    { q: 'Что если мне не понравится результат?', a: 'В стоимость каждого заказа включено 2 круга бесплатных правок. Мы работаем до тех пор, пока текст не будет полностью соответствовать вашему ТЗ.' }
  ];

  return (
    <>
      <section id="pricing-calc" className="py-20 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] -z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-start relative z-10">
          <div>
            <div className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-500/30">
               Smart Pricing Engine
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
              Рассчитайте выгоду <br />вашего контента
            </h2>
            
            <div className="space-y-10 mt-12">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Тип контента</label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedServiceId(s.id)}
                      className={`p-5 rounded-[1.5rem] border-2 text-left transition-all duration-300 ${
                        selectedServiceId === s.id 
                          ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-[0_0_30px_rgba(79,70,229,0.15)]' 
                          : 'border-slate-800 hover:border-slate-700 text-slate-500'
                      }`}
                    >
                      <div className="text-sm font-black mb-1">{s.name}</div>
                      <div className="text-[10px] font-bold opacity-60">{s.pricePer1k} ₽ / 1к зн.</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-6">
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Объем текста</label>
                     <div className="text-4xl font-black text-indigo-400 mt-1">{symbols.toLocaleString()} <span className="text-lg text-slate-500">зн.</span></div>
                  </div>
                  {discount > 0 && (
                    <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 animate-pulse">
                       Скидка за объем -{discount * 100}%
                    </div>
                  )}
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="30000" 
                  step="500"
                  value={symbols}
                  onChange={(e) => setSymbols(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="bg-white/5 p-4 rounded-[2.5rem]">
                 <SEODataTable 
                   type="specs"
                   title="Что входит в стоимость"
                   data={[
                     { category: "Quality", label: "Проверка по 15 параметрам", profit: "Included" },
                     { category: "SEO", label: "LSI ядро и вхождение ключей", profit: "Included" },
                     { category: "Legal", label: "Передача авторских прав", profit: "Included" }
                   ]}
                 />
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-12 rounded-[4rem] text-slate-900 shadow-3xl lg:sticky lg:top-24">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black">Ваш заказ</h3>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                 <ReceiptText className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>
            
            <div className="space-y-6 mb-12">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Тариф</span>
                <span className="font-black text-sm">{selectedService.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Объем</span>
                <span className="font-black text-sm">{(symbols/1000).toFixed(1)}к знаков</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between py-2 border-b border-slate-50 text-emerald-600">
                  <span className="text-[10px] font-black uppercase tracking-widest">Скидка за объем</span>
                  <span className="font-black text-sm">-{Math.round((symbols/1000)*selectedService.pricePer1k*discount)} ₽</span>
                </div>
              )}
              <div 
                onClick={() => setIsUrgent(!isUrgent)}
                className={`flex justify-between items-center p-4 rounded-2xl transition-all cursor-pointer ${isUrgent ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50 border border-slate-50'}`}
              >
                <div className="flex items-center gap-2">
                   <Zap className={`w-4 h-4 stroke-[2.5] ${isUrgent ? 'text-amber-500 fill-current' : 'text-slate-300'}`} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Срочность (24ч)</span>
                </div>
                <div className={`w-10 h-6 rounded-full relative p-1 transition-all ${isUrgent ? 'bg-amber-500' : 'bg-slate-300'}`}>
                   <div className={`w-4 h-4 bg-white rounded-full transition-all ${isUrgent ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[3rem] text-center mb-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 blur-2xl"></div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Итоговая сумма</div>
              <div className="text-7xl font-black tracking-tighter">
                {Math.round(totalPrice).toLocaleString()} <span className="text-xl text-slate-500 font-medium">₽</span>
              </div>
            </div>

            <button 
              onClick={handleOrder}
              className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-indigo-100 group"
            >
              <ShoppingBasket className="w-6 h-6 stroke-[2.5] group-hover:animate-bounce" />
              <span>Оформить заказ</span>
            </button>
          </div>
        </div>
      </section>

      {showSEO && (
        <SEOSection 
          title="Прозрачное ценообразование на копирайтинг"
          subtitle="Мы верим, что качественный контент должен иметь понятную и честную стоимость."
          seoText={`
            <p>Стоимость услуг копирайтинга в 2025 году сильно варьируется, но в TextFlow мы придерживаемся модели "все включено". Заказывая текст у нас, вы платите не просто за знаки, а за глубокое исследование темы, SEO-оптимизацию и многоуровневую редактуру.</p>
            <p>Наш онлайн-калькулятор позволяет мгновенно рассчитать стоимость проекта с учетом всех скидок. Мы предлагаем гибкие тарифы: от бюджетного наполнения карточек товаров до премиального PR-контента для крупных СМИ.</p>
            <p><strong>Почему наши цены оправданы?</strong> Каждый текст проходит проверку на уникальность, отсутствие "воды" и соответствие стандартам E-E-A-T. Мы инвестируем в экспертов, которые знают вашу нишу изнутри.</p>
          `}
          faqs={pricingFaqs}
        />
      )}
    </>
  );
};

export default PricingCalculator;

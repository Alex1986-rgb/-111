
import React, { useState, useRef } from 'react';
import { Layers, Upload, FileText, CheckCircle2, Trash2, Plus, ArrowRight, Zap, Info, ShieldCheck, Database, Rocket, PlusCircle, MinusCircle, FileSpreadsheet, Download, FileJson, Code } from 'lucide-react';
import { INITIAL_SERVICES } from '../constants';

interface BulkItem {
  id: string;
  title: string;
  keywords: string;
  length: number;
}

interface BulkOrderViewProps {
  onBack: () => void;
  onConfirm: (totalSymbols: number, totalItems: number, totalPrice: number) => void;
}

const BulkOrderView: React.FC<BulkOrderViewProps> = ({ onBack, onConfirm }) => {
  const [items, setItems] = useState<BulkItem[]>([
    { id: '1', title: '', keywords: '', length: 2000 }
  ]);
  const [dragActive, setDragActive] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bulkService = INITIAL_SERVICES.find(s => s.id === 'bulk')!;

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), title: '', keywords: '', length: 2000 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof BulkItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const totalSymbols = items.reduce((sum, item) => sum + Number(item.length), 0);
  const totalItems = items.length;
  const bulkDiscount = totalItems >= 5 ? 0.9 : 1;
  const totalPrice = Math.round((totalSymbols / 1000) * bulkService.pricePer1k * bulkDiscount);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      alert('Файл принят! Мы распознали структуру и добавили 10 новых позиций в список.');
      const newItems = Array.from({ length: 10 }).map(() => ({
        id: Math.random().toString(),
        title: 'Текст из файла',
        keywords: 'ключ1, ключ2',
        length: 2500
      }));
      setItems([...items, ...newItems]);
    }
  };

  const bulkFaqs = [
    {
      q: "В каком виде я получу готовые тексты для сайта?",
      a: "Мы предоставляем контент в любом удобном формате: Excel (таблица), CSV (для импорта), JSON (для разработчиков) или Google Таблицы. Это позволяет загрузить сотни описаний на ваш сайт за считанные минуты."
    },
    {
      q: "Какое максимальное количество текстов можно заказать за раз?",
      a: "Наша система технически не ограничена. Мы успешно обрабатывали заказы на 500+ описаний товаров для маркетплейсов в неделю. При заказе от 100 текстов предоставляются индивидуальные условия и персональный редактор."
    },
    {
      q: "Как проверяется качество при массовом создании?",
      a: "Каждый текст проходит трехуровневую проверку: 1. Автоматизированный аудит на соответствие ТЗ и стилистику. 2. Проверка уникальности по алгоритмам Text.ru. 3. Обязательная проверка выпускающим редактором перед отправкой."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fade-in">
      <nav className="mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-xs tracking-widest group">
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Назад к услугам
        </button>
      </nav>

      <header className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-100">
           <Database className="w-3 h-3" /> Enterprise Content Automation
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-[1] max-w-5xl mx-auto">
          Масштабное создание <span className="gradient-text">SEO-контента</span> для тысяч страниц
        </h1>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
          Наполняем многостраничные сайты, интернет-магазины и порталы уникальным контентом: от Meta-тегов до развернутых FAQ. Масштабируем ваш бизнес в органическом поиске.
        </p>
      </header>

      <div className="grid md:grid-cols-4 gap-6 mb-24">
         {[
           { icon: FileSpreadsheet, title: "Полный пакет Meta", desc: "Создаем Title и Description для каждой страницы с учетом ключевых слов и LSI." },
           { icon: ShieldCheck, title: "Уникальность 100%", desc: "Каждый текст проходит проверку на плагиат. Никакого дублирования контента даже на 100 000 страницах." },
           { icon: Rocket, title: "FAQ для каждой страницы", desc: "Разрабатываем блоки часто задаваемых вопросов (Schema.org), которые повышают CTR в выдаче." },
           { icon: Download, title: "Мгновенный импорт", desc: "Выгрузка в CSV/XLSX/JSON, готовая для загрузки в вашу CMS за считанные минуты." }
         ].map((benefit, i) => (
           <section key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
             <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <benefit.icon className="w-7 h-7" />
             </div>
             <h3 className="text-lg font-black text-slate-900 mb-3">{benefit.title}</h3>
             <p className="text-slate-500 text-xs leading-relaxed">{benefit.desc}</p>
           </section>
         ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start mb-24">
        <div className="lg:col-span-8 space-y-12">
          
          <section>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xs">1</div>
               <h2 className="text-2xl font-black text-slate-900">Загрузка списка страниц</h2>
            </div>
            <div 
              className={`relative group p-12 rounded-[3rem] border-4 border-dashed transition-all cursor-pointer text-center ${dragActive ? 'border-indigo-600 bg-indigo-50 scale-[1.01]' : 'border-slate-100 hover:border-indigo-200 bg-white shadow-sm'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" className="hidden" accept=".csv,.xlsx,.xls" />
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Загрузить файл со списком URL или ключевых слов</h3>
              <p className="text-slate-500 text-sm mb-6">Загрузите список страниц, которые нужно наполнить. Мы создадим для них контент, мета-теги и FAQ.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors">
                   <FileSpreadsheet className="w-4 h-4" /> Шаблон для интернет-магазина
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                   <FileText className="w-4 h-4" /> Шаблон для инфо-портала
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xs">2</div>
                 <h2 className="text-2xl font-black text-slate-900">Предпросмотр структуры</h2>
              </div>
              <button 
                onClick={addItem}
                className="flex items-center gap-2 text-indigo-600 font-black uppercase text-xs tracking-widest hover:opacity-70 group"
              >
                <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" /> Добавить страницу вручную
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-end md:items-center group hover:border-indigo-200 transition-all">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center font-black text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 w-full space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">URL / Название страницы</label>
                    <input 
                      type="text" 
                      placeholder="Напр: /category/smartphones/samsung-s23" 
                      value={item.title}
                      onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold text-sm"
                    />
                  </div>
                  <div className="w-full md:w-32 space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Объем (зн.)</label>
                    <input 
                      type="number" 
                      step="500"
                      value={item.length}
                      onChange={(e) => updateItem(item.id, 'length', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-black text-sm"
                    />
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    aria-label="Удалить"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="prose prose-slate max-w-none bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
             <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Как мы создаем десятки тысяч страниц?</h2>
             <div className="space-y-6 text-slate-300">
                <p>
                  Наша технология Enterprise Content Engine объединяет современные инструменты оптимизации и экспертную редактуру. Мы не просто пишем тексты — мы создаем полноценную SEO-структуру для каждой страницы вашего сайта силами нашей большой команды.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                      <h4 className="font-black text-white mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-indigo-400" />
                        Meta + FAQ + Text
                      </h4>
                      <p className="text-xs">Для каждой страницы вы получаете: уникальный Title, Description, H1, основной текст и 3-5 вопросов FAQ с разметкой Schema.org.</p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                      <h4 className="font-black text-white mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-indigo-400" />
                        Готовность к импорту
                      </h4>
                      <p className="text-xs">Результат — таблица, которую ваша CMS (Bitrix, WP, Magento) проглотит мгновенно. Никакого ручного копипаста.</p>
                   </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/10">
                   <h3 className="text-xl font-black text-white mb-6">Пример структуры выгрузки (JSON/CSV/HTML):</h3>
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                            <FileJson className="w-4 h-4" /> JSON Формат
                         </div>
                         <div className="bg-black/40 rounded-2xl p-6 font-mono text-[10px] overflow-x-auto border border-white/5 text-indigo-300">
                            <pre>{`{
  "slug": "konteynernye-perevozki-vageningen",
  "h1": "Услуги контейнерных перевозок...",
  "title": "Контейнерные перевозки...",
  "description": "Профессиональная доставка...",
  "text": "<h2>Комплексный подход...</h2>...",
  "faq": "#### Какие документы?..."
}`}</pre>
                         </div>
                      </div>
                      <div className="space-y-4">
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-400">
                            <Code className="w-4 h-4" /> HTML Превью
                         </div>
                         <div className="bg-white rounded-2xl p-6 font-inter text-[10px] overflow-x-auto border border-white/5 text-slate-900 shadow-inner h-[140px]">
                            <h2 className="text-sm font-black mb-2">Комплексный подход к доставке</h2>
                            <p className="mb-2">Международная доставка грузов морем остается краеугольным камнем...</p>
                            <table className="w-full border-collapse border border-slate-100 mb-2">
                               <tr className="bg-slate-50">
                                  <th className="border border-slate-100 p-1">Параметр</th>
                                  <th className="border border-slate-100 p-1">Значение</th>
                               </tr>
                               <tr>
                                  <td className="border border-slate-100 p-1">Тип</td>
                                  <td className="border border-slate-100 p-1">Контейнерная</td>
                               </tr>
                            </table>
                         </div>
                      </div>
                   </div>
                   <p className="text-[10px] text-slate-500 mt-6 italic">
                     * Мы предоставляем контент в любом формате, включая чистый HTML для прямой вставки в базу данных или CSV для массового импорта в CMS.
                   </p>
                </div>
             </div>
          </section>
        </div>

        <aside className="lg:col-span-4 sticky top-28">
          <div className="bg-white rounded-[3rem] p-10 text-slate-900 shadow-2xl border border-slate-100 relative overflow-hidden">
            <h3 className="text-2xl font-black mb-8 border-b border-slate-50 pb-6">Резюме проекта</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium">Кол-во текстов:</span>
                <span className="text-xl font-black">{totalItems} шт.</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium">Общий объем:</span>
                <span className="text-xl font-black">{(totalSymbols / 1000).toFixed(1)}к знаков</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium">Базовая ставка:</span>
                <span className="text-xl font-black">{bulkService.pricePer1k} ₽/1к</span>
              </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-center mb-10 text-white shadow-xl shadow-slate-100">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Общая стоимость</div>
              <div className="text-6xl font-black tracking-tight">{totalPrice.toLocaleString()} <span className="text-xl font-medium text-slate-500">₽</span></div>
            </div>

            <button 
              onClick={() => onConfirm(totalSymbols, totalItems, totalPrice)}
              className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              <span>Заказать проект</span>
              <Zap className="w-5 h-5 fill-current" />
            </button>
          </div>
        </aside>
      </div>

      <section className="py-24 border-t border-slate-100">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">FAQ по массовым заказам</h2>
            <div className="space-y-4">
              {bulkFaqs.map((faq, i) => (
                <div key={i} className="bg-white border-2 border-slate-50 rounded-[2rem] overflow-hidden hover:border-indigo-100 transition-all">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-8 flex justify-between items-center text-left"
                    aria-expanded={activeFaq === i}
                  >
                    <span className="text-lg font-black text-slate-900 leading-tight">{faq.q}</span>
                    <div className="shrink-0 ml-4">
                       {activeFaq === i ? <MinusCircle className="w-6 h-6 text-indigo-600" /> : <PlusCircle className="w-6 h-6 text-slate-300" />}
                    </div>
                  </button>
                  {activeFaq === i && (
                    <div className="px-8 pb-8 text-slate-500 leading-relaxed text-sm md:text-base animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
         </div>
      </section>

      <section className="mt-12 py-12 bg-slate-50 rounded-[4rem] px-8 md:px-16">
         <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 underline">Ключевые преимущества TextFlow Enterprise:</h3>
         <div className="grid md:grid-cols-3 gap-8 text-[10px] text-slate-400 leading-relaxed">
            <p><strong>Описания товаров для Wildberries:</strong> Оптимизация под внутренние алгоритмы поиска маркетплейсов для повышения конверсии карточек.</p>
            <p><strong>SEO тексты оптом:</strong> Создание контента с учетом LSI-семантики и плотности ключевых слов для быстрого выхода в ТОП Яндекса.</p>
            <p><strong>Автозаполнение блогов:</strong> Регулярное наполнение информационных разделов уникальным контентом с выгрузкой в JSON/CSV.</p>
         </div>
      </section>
    </div>
  );
};

export default BulkOrderView;

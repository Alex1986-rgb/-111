
import React from 'react';
import { Layers, FileJson, FileSpreadsheet, Code, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

interface EnterpriseSectionProps {
  onNavigate: () => void;
}

const EnterpriseSection: React.FC<EnterpriseSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <Layers className="w-3.5 h-3.5" /> Enterprise Solutions
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8">
              Массовое создание <br />
              <span className="text-indigo-600">SEO-контента</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
              Наполняем сайты на 10 000+ страниц за считанные дни. Наша команда создает не просто текст, а полный пакет данных: Meta-теги, FAQ с разметкой и уникальные статьи, готовые к импорту.
            </p>

            <div className="space-y-4 mb-12">
              {[
                "Создание Meta Title & Description для каждой страницы",
                "Разработка блоков FAQ с разметкой Schema.org",
                "100% уникальность и LSI-оптимизация",
                "Экспорт в CSV, XLSX, JSON и HTML"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <button 
              onClick={onNavigate}
              className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-3 shadow-xl shadow-slate-200"
            >
              Подробнее о массовом создании
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-200">
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <FileJson className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Форматы выгрузки</span>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black">READY</div>
                </div>
              </div>

              <div className="space-y-4">
                {/* JSON Example */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-[10px] text-indigo-600 overflow-hidden">
                  <div className="flex items-center gap-2 mb-2 text-slate-400">
                    <FileJson className="w-3 h-3" /> export.json
                  </div>
                  <pre className="opacity-80">{`{
  "slug": "seo-text-page-1",
  "title": "Купить контейнеры...",
  "html": "<h2>Преимущества...</h2>",
  "faq": [{ "q": "...", "a": "..." }]
}`}</pre>
                </div>

                {/* CSV Example */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-[10px] text-emerald-600 overflow-hidden">
                  <div className="flex items-center gap-2 mb-2 text-slate-400">
                    <FileSpreadsheet className="w-3 h-3" /> data.csv
                  </div>
                  <div className="opacity-80">
                    URL;Title;Description;H1;Content;FAQ<br />
                    /page-1;Купить...;Лучшие цены...;Контейнеры...;{`<html>...</html>`};...
                  </div>
                </div>

                {/* HTML Example */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-[10px] text-amber-600 overflow-hidden">
                  <div className="flex items-center gap-2 mb-2 text-slate-400">
                    <Code className="w-3 h-3" /> preview.html
                  </div>
                  <div className="opacity-80">
                    {`<!DOCTYPE html>`}<br />
                    {`<article class="seo-content">`}<br />
                    {`  <h1>Массовое создание...</h1>`}<br />
                    {`  <p>SEO-оптимизированный текст...</p>`}<br />
                    {`</article>`}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white p-8 rounded-full shadow-2xl rotate-12 flex flex-col items-center justify-center">
                <Zap className="w-6 h-6 mb-1 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest">Fast Import</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;

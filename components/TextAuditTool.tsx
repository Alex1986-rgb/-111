
import React, { useState } from 'react';
import { ShieldAlert, Zap, Search, CheckCircle, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../App';
import { TextFlowAPI } from '../services/api';

const TextAuditTool: React.FC = () => {
  const { addLog } = useApp();
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const performAudit = async () => {
    if (inputText.length < 100) return alert('Минимум 100 символов.');
    setLoading(true);
    addLog('info', 'Запуск экспертного аудита текста');
    
    try {
      const result = await TextFlowAPI.auditText(inputText);
      setAnalysis(result);
      addLog('success', `Аудит завершен успешно. Score: ${result.score}/100`);
    } catch (e) {
      addLog('error', 'Сбой системы аудита');
      alert('Ошибка. Проверьте API_KEY в окружении.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-indigo-600 rounded-[4rem] mx-4 md:mx-8 my-20 relative overflow-hidden shadow-3xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3 h-3 fill-current" /> Аналитическая лаборатория
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Текст под микроскопом экспертов</h2>
          <p className="text-indigo-100 text-lg font-medium opacity-80">Мгновенный аудит по стандартам Яндекса 2025.</p>
        </div>

        <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl relative">
          {loading && (
            <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center animate-in fade-in duration-300">
               <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
               <div className="text-slate-900 font-black uppercase text-xs tracking-[0.2em]">Синхронизация с базой LSI...</div>
            </div>
          )}

          {!analysis ? (
            <div className="relative">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Вставьте ваш текст здесь..."
                className="w-full h-64 p-8 rounded-[2rem] text-slate-900 placeholder:text-slate-300 focus:outline-none text-lg font-medium resize-none bg-slate-50/30"
              ></textarea>
              <div className="absolute bottom-6 right-6 flex items-center gap-4">
                <button 
                  onClick={performAudit}
                  disabled={inputText.length < 100}
                  className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-900 transition-all shadow-xl disabled:bg-slate-100 active:scale-95"
                >
                  <Search className="w-5 h-5" /> Запустить аудит
                </button>
              </div>
            </div>
          ) : (
            <div className="p-10 animate-in zoom-in duration-500">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900">Отчет сформирован</h3>
                <button onClick={() => setAnalysis(null)} className="text-indigo-600 font-black text-[10px] uppercase hover:underline">Новый тест</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { label: "Балл", val: analysis.score, c: "text-indigo-600" },
                  { label: "SEO", val: analysis.params.seo + "%", c: "text-slate-900" },
                  { label: "Readable", val: analysis.params.readability + "%", c: "text-slate-900" },
                  { label: "Water", val: analysis.params.water + "%", c: "text-emerald-500" }
                ].map((s, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                     <div className={`text-3xl font-black mb-1 ${s.c}`}>{s.val}</div>
                     <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100 mb-10">
                 <p className="text-indigo-900 font-bold text-lg mb-6 leading-tight">"{analysis.verdict}"</p>
                 <div className="space-y-3">
                    {analysis.tips.map((tip: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-indigo-700 font-medium">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-indigo-400" /> {tip}
                      </div>
                    ))}
                 </div>
              </div>
              <button 
                onClick={() => document.getElementById('pricing-calc')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-slate-900 text-white py-6 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-indigo-600 transition-all shadow-2xl active:scale-95"
              >
                Исправить с TextFlow <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextAuditTool;

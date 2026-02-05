
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ShieldAlert, Zap, Search, CheckCircle, BarChart, Loader2, ArrowRight } from 'lucide-react';

const TextAuditTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const performAudit = async () => {
    if (inputText.length < 100) return alert('Пожалуйста, введите хотя бы 100 символов для анализа.');
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Проведи SEO и стилистический аудит следующего текста. 
        Оцени по 100-балльной шкале следующие параметры: SEO-оптимизация, Читаемость, Уникальность (предположительно), Отсутствие "воды". 
        Выдай результат СТРОГО в формате JSON: 
        {"score": 85, "params": {"seo": 70, "readability": 90, "water": 10}, "verdict": "короткий вердикт", "tips": ["совет 1", "совет 2"]}.
        Текст для анализа: ${inputText}`,
        config: { responseMimeType: "application/json" }
      });
      
      const result = JSON.parse(response.text);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      alert('Ошибка при анализе. Попробуйте другой текст.');
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
            <Zap className="w-3 h-3 fill-current" /> Бесплатный AI инструмент
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Проверьте свой текст <br />на «профпригодность»
          </h2>
          <p className="text-indigo-100 text-lg font-medium opacity-80">
            Наш ИИ оценит ваш контент по стандартам поисковиков 2025 года за 5 секунд.
          </p>
        </div>

        <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl">
          {!analysis ? (
            <div className="relative">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Вставьте ваш текст или описание товара здесь (мин. 100 символов)..."
                className="w-full h-64 p-8 rounded-[2rem] text-slate-900 placeholder:text-slate-300 focus:outline-none text-lg font-medium resize-none"
              ></textarea>
              <div className="absolute bottom-6 right-6 flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{inputText.length} символов</span>
                <button 
                  onClick={performAudit}
                  disabled={loading || inputText.length < 100}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-900 transition-all shadow-xl disabled:bg-slate-100 disabled:text-slate-300"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                  Запустить аудит
                </button>
              </div>
            </div>
          ) : (
            <div className="p-10 animate-in zoom-in duration-500">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900">Результат анализа</h3>
                <button onClick={() => setAnalysis(null)} className="text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest">Новая проверка</button>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="bg-slate-50 p-6 rounded-3xl text-center">
                   <div className="text-4xl font-black text-indigo-600 mb-1">{analysis.score}</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Общий балл</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl text-center">
                   <div className="text-4xl font-black text-slate-900 mb-1">{analysis.params.seo}%</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SEO Оптимизация</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl text-center">
                   <div className="text-4xl font-black text-slate-900 mb-1">{analysis.params.readability}%</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Читаемость</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl text-center">
                   <div className="text-4xl font-black text-emerald-500 mb-1">{analysis.params.water}%</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Уровень "воды"</div>
                </div>
              </div>

              <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100 mb-10">
                 <div className="flex items-center gap-3 mb-4 text-indigo-600">
                    <ShieldAlert className="w-6 h-6" />
                    <span className="font-black uppercase text-xs tracking-widest">Вердикт эксперта</span>
                 </div>
                 <p className="text-indigo-900 font-bold text-lg mb-6">"{analysis.verdict}"</p>
                 <ul className="space-y-3">
                    {analysis.tips.map((tip: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-indigo-700 font-medium">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> {tip}
                      </li>
                    ))}
                 </ul>
              </div>

              <button 
                onClick={() => document.getElementById('pricing-calc')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-slate-900 text-white py-6 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-indigo-600 transition-all shadow-2xl"
              >
                Исправить текст силами TextFlow <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextAuditTool;

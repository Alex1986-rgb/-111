
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, SendHorizontal, Loader2, BotMessageSquare, X } from 'lucide-react';

const AIHelper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResponse('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Ты - экспертный копирайтер агентства TextFlow. Помоги клиенту составить структуру статьи или придумай 5 цепляющих заголовков для темы: ${prompt}`,
        config: {
          systemInstruction: 'Отвечай на русском языке. Будь кратким, профессиональным и вдохновляющим.'
        }
      });
      
      setResponse(res.text || 'Не удалось сгенерировать ответ.');
    } catch (error) {
      console.error(error);
      setResponse('Произошла ошибка при работе с AI. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-indigo-600 p-6 flex justify-between items-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-2xl rounded-full"></div>
            <div className="flex items-center gap-3 font-black uppercase text-xs tracking-widest relative z-10">
              <BotMessageSquare className="w-6 h-6 stroke-[2.5]" />
              <span>AI Помощник</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:rotate-90 transition-transform relative z-10 p-1 bg-white/10 rounded-lg"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
          
          <div className="p-6 h-96 flex flex-col bg-slate-50/30">
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 custom-scrollbar">
              <div className="bg-white p-4 rounded-3xl rounded-tl-none text-sm text-slate-600 shadow-sm border border-slate-100 font-medium">
                Привет! Я помогу вам придумать темы или структуру будущего текста. Что планируете написать?
              </div>
              {response && (
                <div className="bg-indigo-600 p-4 rounded-3xl rounded-tr-none text-sm text-white ml-auto max-w-[90%] whitespace-pre-wrap shadow-xl shadow-indigo-100 font-medium animate-in slide-in-from-right-2">
                  {response}
                </div>
              )}
              {loading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin stroke-[2.5]" />
                </div>
              )}
            </div>

            <div className="relative group">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Тема статьи или заголовок..."
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-bold shadow-sm"
              />
              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:bg-slate-300 transition-all shadow-lg active:scale-95"
              >
                <SendHorizontal className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white w-16 h-16 rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:rotate-6 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 to-indigo-500"></div>
          <Sparkles className="w-8 h-8 stroke-[2.5] relative z-10 group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
};

export default AIHelper;

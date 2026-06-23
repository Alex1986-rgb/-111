
import React, { useState } from 'react';
import { 
  Mail, 
  FileEdit, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  MessageSquare, 
  Target, 
  Zap, 
  Sparkles,
  ShieldCheck,
  Globe,
  Smile,
  GraduationCap,
  Flame,
  MousePointer2,
  Send
} from 'lucide-react';
import { INITIAL_SERVICES } from '../constants';
import { BriefDetails } from '../types';

interface OrderFormProps {
  pendingOrder: {serviceId: string, symbols: number, price: number, isBulk?: boolean, bulkItemsCount?: number} | null;
  onFinalize: (details: { email: string, description: string, brief?: Partial<BriefDetails> }) => void;
  onCancel: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ pendingOrder, onFinalize, onCancel }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState<BriefDetails['toneOfVoice']>('expert');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!pendingOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileEdit className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Заказ не выбран</h1>
        <p className="text-slate-500 font-medium mb-8">Вернитесь на главную и выберите услугу или рассчитайте стоимость в калькуляторе.</p>
        <button onClick={onCancel} className="apple-btn px-8 py-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> На главную
        </button>
      </div>
    );
  }

  const service = INITIAL_SERVICES.find(s => s.id === pendingOrder.serviceId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2 && !pendingOrder.isBulk) {
      setStep(2);
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      onFinalize({ 
        email, 
        description: description || 'Массовый заказ',
        brief: { toneOfVoice: tone, targetAudience: audience, keywords }
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const tones = [
    { id: 'expert', label: 'Экспертный', icon: GraduationCap, desc: 'Строгий, научный, вызывающий доверие.' },
    { id: 'friendly', label: 'Дружелюбный', icon: Smile, desc: 'Легкий, понятный, "на ты" с читателем.' },
    { id: 'aggressive', label: 'Продающий', icon: Flame, desc: 'Яркие триггеры, активные призывы к действию.' },
    { id: 'minimalist', label: 'Лаконичный', icon: Globe, desc: 'Только факты, минимум воды, сдержанность.' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header & Back button */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-black uppercase text-[10px] tracking-[0.2em] group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" /> Отмена заказа
        </button>
        <div className="flex gap-2">
           {[1, 2].map(i => !pendingOrder.isBulk && (
             <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-indigo-600' : 'w-4 bg-slate-200'}`}></div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Form Body */}
        <div className="lg:col-span-8 apple-card overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-[var(--color-apple-ink)] mb-3 tracking-tight leading-tight">
              {pendingOrder.isBulk ? 'Массовый заказ' : step === 1 ? 'Контактные данные' : 'Детали проекта'}
            </h1>
            <p className="text-slate-500 font-medium mb-4">
              {pendingOrder.isBulk 
                ? 'Подтвердите почту для получения готовых таблиц.' 
                : step === 1 ? 'Начнем с малого. Как нам с вами связаться?' : 'Опишите характер будущего текста для идеального попадания в цель.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 || pendingOrder.isBulk ? (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Рабочий Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                      <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@company.ru"
                        className="w-full bg-slate-50 border border-black/[0.06] rounded-[1.5rem] py-5 pl-16 pr-8 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm mb-1">Защита данных</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">Мы гарантируем конфиденциальность вашего ТЗ и контактных данных. Никакого спама, только рабочая коммуникация по проекту.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in slide-in-from-right-8 duration-500">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Стиль подачи (Tone of Voice)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tones.map((t) => {
                        const Icon = t.icon;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setTone(t.id as any)}
                            className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${tone === t.id ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-black/[0.06] bg-[var(--color-apple-mist)] hover:border-slate-300'}`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tone === t.id ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>
                               <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-black text-slate-900 text-sm">{t.label}</div>
                              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">{t.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Целевая аудитория</label>
                      <div className="relative group">
                         <Target className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                         <input 
                          type="text" 
                          value={audience}
                          onChange={(e) => setAudience(e.target.value)}
                          placeholder="Напр: B2B собственники бизнеса"
                          className="w-full bg-slate-50 border border-black/[0.06] rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-sm"
                         />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Ключевые слова</label>
                      <div className="relative group">
                         <Sparkles className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                         <input 
                          type="text" 
                          value={keywords}
                          onChange={(e) => setKeywords(e.target.value)}
                          placeholder="купить, заказать, цена..."
                          className="w-full bg-slate-50 border border-black/[0.06] rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-sm"
                         />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Описание задачи</label>
                      <button type="button" className="text-[10px] font-black text-indigo-600 flex items-center gap-1 uppercase hover:opacity-70">
                         <Zap className="w-3 h-3 fill-current" /> Помощь редактора
                      </button>
                    </div>
                    <div className="relative group">
                       <FileEdit className="absolute left-6 top-6 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                       <textarea 
                        required
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="О чем должен быть текст? Какие основные тезисы нужно раскрыть?"
                        className="w-full bg-slate-50 border border-black/[0.06] rounded-[2rem] py-6 pl-16 pr-8 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium resize-none"
                       ></textarea>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-7 py-4 bg-[var(--color-apple-mist)] text-[var(--color-apple-ink)] rounded-full font-semibold text-sm tracking-tight hover:bg-slate-200 transition-all active:scale-95"
                  >
                    Назад
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="apple-btn flex-1 py-4 text-base disabled:opacity-50 disabled:pointer-events-none group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      {pendingOrder.isBulk || step === 2 ? 'Оформить заказ' : 'Далее'}
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Floating Order Summary (Live Check) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
          <div className="bg-slate-900 rounded-[3rem] p-6 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/20 blur-3xl -translate-y-12 translate-x-12"></div>
            
            <h3 className="text-lg font-black mb-5 flex items-center gap-3">
               <Zap className="w-5 h-5 text-indigo-400 fill-current" /> Чек заказа
            </h3>
            
            <div className="space-y-4 mb-4">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Услуга</span>
                <span className="font-bold text-sm">{service?.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Объем</span>
                <span className="font-bold text-sm">{(pendingOrder.symbols / 1000).toFixed(1)}к знаков</span>
              </div>
              {pendingOrder.isBulk && (
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Позиций</span>
                  <span className="font-bold text-sm">{pendingOrder.bulkItemsCount} шт.</span>
                </div>
              )}
              {tone && step === 2 && (
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Стиль</span>
                  <span className="font-bold text-sm text-indigo-400">{tones.find(t => t.id === tone)?.label}</span>
                </div>
              )}
            </div>

            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 text-center mb-5">
               <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Итоговая сумма</div>
               <div className="text-4xl font-black tracking-tight">{pendingOrder.price.toLocaleString()} <span className="text-base text-slate-500">₽</span></div>
            </div>

            <div className="space-y-4 mb-5">
               <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Уникальность по Text.ru 100%
               </div>
               <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> SEO-оптимизация (H1-H3, Meta)
               </div>
            </div>

            <a 
              href="https://t.me/textflow_agency" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#229ED9] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-indigo-500/10"
            >
               <Send className="w-4 h-4 fill-current" /> Обсудить в Telegram
            </a>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center gap-5">
             <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
             </div>
             <div>
                <div className="text-sm font-black text-slate-900 leading-tight">Нужна помощь?</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Чат с редактором 24/7</div>
             </div>
             <a href="https://wa.me/79991234567" target="_blank" rel="noopener" className="ml-auto w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <MousePointer2 className="w-4 h-4" />
             </a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderForm;


import React from 'react';
import { Check, X, ArrowRight, Zap, Target, ShieldCheck, BarChart3, TrendingUp, Sparkles, Activity } from 'lucide-react';

interface SEODataTableProps {
  type: 'comparison' | 'roadmap' | 'specs';
  title: string;
  data: any[];
}

const SEODataTable: React.FC<SEODataTableProps> = ({ type, title, data }) => {
  if (type === 'comparison') {
    return (
      <div className="my-4 md:my-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="bg-white/40 backdrop-blur-3xl p-1 rounded-[2.5rem] border border-white/50 shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
          <div className="bg-slate-900 rounded-[2.3rem] p-6 md:p-7 text-white relative overflow-hidden">
             {/* Сетчатый узор */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4F46E5 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}></div>
             
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                         <Activity className="w-4.5 h-4.5 text-white" />
                      </div>
                      <h3 className="text-base font-black tracking-tight">{title}</h3>
                   </div>
                   <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Системы активны
                   </div>
                </div>

                <div className="space-y-0.5">
                   {/* Заголовки столбцов */}
                   <div className="grid grid-cols-12 gap-2 mb-3">
                      <div className="col-span-6"></div>
                      <div className="col-span-3 text-center text-[7px] font-black text-indigo-400 uppercase tracking-widest">TextFlow</div>
                      <div className="col-span-3 text-center text-[7px] font-black text-slate-600 uppercase tracking-widest">Другие</div>
                   </div>

                   {data.map((item, i) => (
                     <div key={i} className="grid grid-cols-12 gap-2 items-center py-4 border-b border-white/5 last:border-0 group">
                        <div className="col-span-6">
                           <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">{item.label}</div>
                        </div>
                        <div className="col-span-3 flex justify-center">
                           <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                             item.us 
                               ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30 group-hover:scale-110 shadow-lg shadow-emerald-500/10' 
                               : 'bg-white/5 text-slate-700'
                           }`}>
                              {item.us ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <X className="w-3.5 h-3.5" />}
                           </div>
                        </div>
                        <div className="col-span-3 flex justify-center">
                           <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 text-slate-700">
                              {item.others ? <Check className="w-3.5 h-3.5 text-slate-500" /> : <X className="w-3.5 h-3.5 text-slate-800" />}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                   <div className="flex -space-x-1.5">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-5 h-5 rounded-full border border-slate-900 bg-slate-800 overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?u=avatar${i+20}`} alt="user" className="w-full h-full object-cover" />
                        </div>
                      ))}
                   </div>
                   <button className="text-[9px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors flex items-center gap-2 group">
                      Анализ стратегии <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'roadmap') {
    return (
      <div className="my-12">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
           <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
              <Zap className="w-3 h-3 fill-current" /> Быстрая доставка
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.map((step, i) => (
            <div key={i} className="relative group p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="text-[32px] font-black text-slate-50 mb-3 group-hover:text-indigo-50 transition-colors">0{i+1}</div>
              <div className="relative z-10">
                <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1.5">{step.label}</div>
                <div className="text-sm font-bold text-slate-900 mb-4 leading-tight">{step.value}</div>
                <div className="w-8 h-1 bg-indigo-100 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-12 bg-slate-900 p-8 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-[80px]"></div>
      <h3 className="text-xl font-black mb-8 flex items-center gap-3">
        <BarChart3 className="w-5 h-5 text-indigo-400" /> {title}
      </h3>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
            <div className="mb-3 md:mb-0">
               <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">{item.category}</div>
               <div className="text-base font-black">{item.label}</div>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right">
                  <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Профит</div>
                  <div className="text-emerald-400 font-black">{item.profit}</div>
               </div>
               <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SEODataTable;

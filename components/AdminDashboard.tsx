
import React, { useState, useMemo } from 'react';
import { useApp } from '../App';
import { 
  ShieldCheck, CheckCircle, Clock, 
  Lock, KeyRound, ArrowRight, LogOut,
  Terminal, Settings, Package, TrendingUp,
  Wallet, Landmark, ArrowUpRight, BarChart3
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { auth, setAuthStatus, services, orders, transactions, updateOrderStatus, updatePrice, logs } = useApp();
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'prices' | 'finance' | 'logs'>('orders');

  const stats = useMemo(() => {
    const revenue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const avgCheck = transactions.length > 0 ? Math.round(revenue / transactions.length) : 0;
    return { revenue, avgCheck, txCount: transactions.length, orderCount: orders.length };
  }, [transactions, orders]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setAuthStatus({ isAuthenticated: true, token: 'tf_session_' + Date.now(), role: 'admin' });
    } else {
      alert('Ошибка доступа');
    }
  };

  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center animate-in zoom-in duration-500">
           <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
              <Lock className="w-10 h-10" />
           </div>
           <h2 className="text-3xl font-black text-slate-900 mb-2">SaaS Entry</h2>
           <p className="text-slate-400 font-medium mb-10">Авторизуйтесь для управления системой</p>
           <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin Key"
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-5 px-6 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-center"
              />
              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl">
                 Войти <ArrowRight className="w-5 h-5" />
              </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg"><ShieldCheck /></div>
                 <div className="text-sm font-black uppercase tracking-widest">Root Console</div>
              </div>
              <div className="space-y-1">
                 {[
                   { id: 'orders', label: 'Потоки', icon: Package },
                   { id: 'finance', label: 'Финансы', icon: Wallet },
                   { id: 'prices', label: 'Прайс', icon: Settings },
                   { id: 'logs', label: 'Ядро', icon: Terminal }
                 ].map(tab => (
                   <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}
                   >
                     <tab.icon className="w-4 h-4" /> {tab.label}
                   </button>
                 ))}
              </div>
              <button 
                onClick={() => setAuthStatus({ isAuthenticated: false, token: null, role: null })}
                className="w-full mt-12 flex items-center gap-4 px-6 py-4 text-red-400 hover:text-red-600 text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                <LogOut className="w-4 h-4" /> Выход
              </button>
           </div>
        </div>

        {/* Main */}
        <div className="lg:col-span-9 space-y-8">
           {/* Stats Row */}
           <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                 <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Выручка (Total)</div>
                 <div className="text-3xl font-black">{stats.revenue.toLocaleString()} ₽</div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                 <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Средний чек</div>
                 <div className="text-3xl font-black text-slate-900">{stats.avgCheck.toLocaleString()} ₽</div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                 <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Оплат (SaaS)</div>
                 <div className="text-3xl font-black text-emerald-500">{stats.txCount}</div>
              </div>
           </div>

           {activeTab === 'orders' && (
             <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition-all">
                     <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${order.paymentStatus === 'paid' ? 'bg-emerald-500 shadow-emerald-100' : 'bg-amber-500 shadow-amber-100'} shadow-lg`}>
                           {order.paymentStatus === 'paid' ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                        </div>
                        <div>
                           <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{order.id} • {order.clientEmail}</div>
                           <h3 className="text-lg font-black text-slate-900">{services.find(s => s.id === order.serviceId)?.name}</h3>
                        </div>
                     </div>
                     <select 
                        value={order.status} 
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase py-2 px-4 focus:ring-2 focus:ring-indigo-600"
                     >
                        <option value="pending">Ожидание</option>
                        <option value="in_progress">В работе</option>
                        <option value="completed">Готов</option>
                     </select>
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'finance' && (
             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                         <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400">ID Транзакции</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400">Метод</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400">Сумма</th>
                         <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400">Дата</th>
                      </tr>
                   </thead>
                   <tbody>
                      {transactions.map(tx => (
                        <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                           <td className="px-8 py-6 font-mono text-xs font-bold text-slate-400">{tx.id}</td>
                           <td className="px-8 py-6">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                                 {tx.method === 'sbp' ? <Landmark className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                 {tx.method.toUpperCase()}
                              </span>
                           </td>
                           <td className="px-8 py-6 font-black text-slate-900">{tx.amount.toLocaleString()} ₽</td>
                           <td className="px-8 py-6 text-xs text-slate-400 font-medium">{new Date(tx.timestamp).toLocaleString()}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           )}

           {activeTab === 'logs' && (
             <div className="bg-slate-900 rounded-[2.5rem] p-8 h-[500px] overflow-y-auto font-mono text-xs custom-scrollbar">
                {logs.map(log => (
                  <div key={log.id} className="mb-2 flex gap-4">
                     <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                     <span className={log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : 'text-indigo-400'}>{log.type.toUpperCase()}:</span>
                     <span className="text-slate-300">{log.message}</span>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

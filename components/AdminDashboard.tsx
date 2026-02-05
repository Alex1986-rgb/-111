
import React, { useState } from 'react';
import { Service, Order } from '../types';
import { Save, Settings, DollarSign, List, CheckCircle, Clock, XCircle, ChevronRight, Download, FileJson, FileSpreadsheet, BarChart3, TrendingUp, Package, LayoutDashboard, MessageSquareText, Search, ShieldCheck, Wallet } from 'lucide-react';

interface AdminDashboardProps {
  services: Service[];
  updatePrice: (id: string, newPrice: number) => void;
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
  updateOrderAdminResponse?: (id: string, response: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ services, updatePrice, orders, updateOrderStatus, updateOrderAdminResponse }) => {
  const [activeTab, setActiveTab] = useState<'prices' | 'orders'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPrices, setEditingPrices] = useState<Record<string, number>>(
    services.reduce((acc, s) => ({ ...acc, [s.id]: s.pricePer1k }), {})
  );

  const filteredOrders = orders.filter(o => 
    o.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePriceChange = (id: string, value: string) => {
    const num = parseInt(value) || 0;
    setEditingPrices(prev => ({ ...prev, [id]: num }));
  };

  const savePrices = () => {
    Object.entries(editingPrices).forEach(([id, price]) => {
      updatePrice(id, price);
    });
    alert('Прайс обновлен');
  };

  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
             <ShieldCheck className="w-3 h-3" /> Root Access
          </div>
          <h1 className="text-4xl font-black text-slate-900">Управление TextFlow</h1>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl min-w-[180px]">
            <div className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-2 flex justify-between">
              Выручка <Wallet className="w-3 h-3" />
            </div>
            <div className="text-2xl font-black text-emerald-700">{totalRevenue.toLocaleString()} ₽</div>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-3xl min-w-[180px]">
            <div className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-2 flex justify-between">
              Активных заказов <Package className="w-3 h-3" />
            </div>
            <div className="text-2xl font-black text-indigo-700">{orders.filter(o => o.status !== 'completed').length}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
          <button onClick={() => setActiveTab('orders')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>Заказы</button>
          <button onClick={() => setActiveTab('prices')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'prices' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>Цены</button>
        </div>
        
        {activeTab === 'orders' && (
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input 
              type="text" 
              placeholder="Поиск по Email или ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>
        )}
      </div>

      {activeTab === 'orders' ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${order.paymentStatus === 'paid' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}>
                    <DollarSign className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-[10px] text-slate-400">#{order.id}</span>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {order.paymentStatus === 'paid' ? 'Оплачено' : 'Ожидает оплаты'}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900">{order.clientEmail}</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">{services.find(s => s.id === order.serviceId)?.name} • {order.totalPrice.toLocaleString()} ₽</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => updateOrderStatus(order.id, 'in_progress')} className="px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">В работу</button>
                  <button onClick={() => updateOrderStatus(order.id, 'completed')} className="px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">Завершить</button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <div className="text-[10px] font-black uppercase text-slate-400 mb-3">Описание задачи</div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed italic">"{order.description}"</p>
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-black uppercase text-slate-400 ml-2">Ответ администратора</div>
                  <div className="relative group">
                    <MessageSquareText className="absolute left-4 top-4 w-4 h-4 text-slate-300" />
                    <textarea 
                      placeholder="Ссылка на готовый документ или сообщение клиенту..."
                      value={order.adminResponse || ''}
                      onChange={(e) => updateOrderAdminResponse?.(order.id, e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 text-xs font-bold focus:outline-none focus:border-indigo-600 min-h-[100px] transition-all"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {services.map(s => (
               <div key={s.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{s.name}</div>
                 <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">₽</span>
                   <input 
                     type="number"
                     value={editingPrices[s.id]}
                     onChange={(e) => handlePriceChange(s.id, e.target.value)}
                     className="w-full bg-white border border-slate-100 rounded-xl py-4 pl-10 pr-4 font-black text-xl"
                   />
                 </div>
               </div>
             ))}
           </div>
           <button onClick={savePrices} className="mt-10 w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
             Сохранить изменения прайса
           </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

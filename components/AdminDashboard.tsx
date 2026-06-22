
import React, { useState, useMemo } from 'react';
import { useApp } from '../App';
import {
  ShieldCheck, CheckCircle2, Clock, Lock, ArrowRight, LogOut,
  Terminal, Settings, Inbox, Wallet, Landmark, TrendingUp,
  Search, RefreshCw, Star, Mail, Tag,
} from 'lucide-react';

// Palette for avatar circles (Яндекс.Почта-style colored initials)
const AVA = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-sky-500', 'bg-violet-500'];
const colorFor = (s: string) => AVA[(s.charCodeAt(0) + s.length) % AVA.length];
const initials = (email: string) => (email || '?').replace(/[^a-zа-я0-9]/gi, '').slice(0, 2).toUpperCase() || '?';

const AdminDashboard: React.FC = () => {
  const { auth, setAuthStatus, services, orders, transactions, updateOrderStatus, updatePrice, logs } = useApp();
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'prices' | 'finance' | 'logs'>('orders');
  const [search, setSearch] = useState('');

  const stats = useMemo(() => {
    const revenue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const avgCheck = transactions.length > 0 ? Math.round(revenue / transactions.length) : 0;
    return { revenue, avgCheck, txCount: transactions.length, orderCount: orders.length };
  }, [transactions, orders]);

  const unpaidCount = useMemo(() => orders.filter(o => o.paymentStatus !== 'paid').length, [orders]);

  const filteredOrders = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return orders;
    return orders.filter(o =>
      (o.id || '').toLowerCase().includes(q) ||
      (o.clientEmail || '').toLowerCase().includes(q) ||
      (services.find(s => s.id === o.serviceId)?.name || '').toLowerCase().includes(q)
    );
  }, [orders, search, services]);

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
        <div className="max-w-md w-full apple-card p-8 text-center animate-in zoom-in duration-500">
          <div className="w-16 h-16 apple-chip text-indigo-600 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-apple-ink)] mb-2">Личный кабинет</h1>
          <p className="text-[var(--color-apple-grey)] font-normal mb-6">Авторизуйтесь для управления заказами</p>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Key"
              className="w-full bg-[var(--color-apple-mist)] border border-black/[0.06] rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium text-center"
            />
            <button className="apple-btn w-full py-4">
              Войти <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  const folders = [
    { id: 'orders', label: 'Заказы', icon: Inbox, count: unpaidCount },
    { id: 'finance', label: 'Финансы', icon: Wallet, count: 0 },
    { id: 'prices', label: 'Тарифы', icon: Settings, count: 0 },
    { id: 'logs', label: 'Журнал', icon: Terminal, count: 0 },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="apple-card overflow-hidden flex flex-col lg:flex-row min-h-[640px] !rounded-[2rem]">
        {/* ===== Sidebar (mail folders) ===== */}
        <aside className="lg:w-64 shrink-0 bg-[var(--color-apple-mist)] lg:border-r border-black/[0.06] p-4 flex flex-col">
          <div className="flex items-center gap-2.5 px-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center"><ShieldCheck className="w-4 h-4" /></div>
            <span className="font-semibold tracking-tight text-[var(--color-apple-ink)]">Кабинет</span>
          </div>

          <button
            onClick={() => { setSearch(''); setActiveTab('orders'); }}
            className="apple-btn w-full py-3 mb-4 text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Обновить
          </button>

          <nav className="space-y-1 flex-1">
            {folders.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveTab(f.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium tracking-tight transition-all ${activeTab === f.id ? 'bg-white text-indigo-600 shadow-sm font-semibold' : 'text-[var(--color-apple-grey)] hover:bg-white/60'}`}
              >
                <f.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{f.label}</span>
                {f.count > 0 && <span className="text-xs font-bold text-amber-500">{f.count}</span>}
              </button>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-black/[0.06] space-y-1">
            <div className="px-4 py-2 rounded-xl bg-white/60">
              <div className="text-[10px] font-medium text-[var(--color-apple-grey)] uppercase tracking-widest">Выручка</div>
              <div className="text-lg font-semibold tracking-tight text-[var(--color-apple-ink)]">{stats.revenue.toLocaleString()} ₽</div>
            </div>
            <button
              onClick={() => setAuthStatus({ isAuthenticated: false, token: null, role: null })}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 text-sm font-medium tracking-tight transition-colors"
            >
              <LogOut className="w-4 h-4" /> Выход
            </button>
          </div>
        </aside>

        {/* ===== Main ===== */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar: search + count */}
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-black/[0.06]">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по заказам, email, услуге…"
                className="w-full bg-[var(--color-apple-mist)] rounded-full py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[var(--color-apple-grey)] tracking-tight">
              <Mail className="w-4 h-4" /> {filteredOrders.length} / {orders.length}
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-px bg-black/[0.06] border-b border-black/[0.06]">
            {[
              { label: 'Заказов', value: stats.orderCount, cls: 'text-[var(--color-apple-ink)]' },
              { label: 'Средний чек', value: stats.avgCheck.toLocaleString() + ' ₽', cls: 'text-[var(--color-apple-ink)]' },
              { label: 'Оплат', value: stats.txCount, cls: 'text-emerald-500' },
            ].map((s, i) => (
              <div key={i} className="bg-white px-4 sm:px-6 py-3">
                <div className="text-[10px] font-medium text-[var(--color-apple-grey)] uppercase tracking-widest">{s.label}</div>
                <div className={`text-lg font-semibold tracking-tight ${s.cls}`}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* ===== Content ===== */}
          <div className="flex-1 overflow-y-auto">
            {/* Orders — email-style list */}
            {activeTab === 'orders' && (
              <div>
                {filteredOrders.length === 0 && (
                  <div className="text-center py-20 text-[var(--color-apple-grey)]">
                    <Inbox className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm font-medium">{orders.length === 0 ? 'Заказов пока нет' : 'Ничего не найдено'}</p>
                  </div>
                )}
                {filteredOrders.map(order => {
                  const paid = order.paymentStatus === 'paid';
                  const svc = services.find(s => s.id === order.serviceId)?.name || order.serviceId;
                  const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) : '';
                  return (
                    <div
                      key={order.id}
                      className={`group flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-black/[0.04] cursor-default transition-colors ${paid ? 'hover:bg-[var(--color-apple-mist)]' : 'bg-amber-50/40 hover:bg-amber-50/70'}`}
                    >
                      <span className={`w-2 h-2 rounded-full shrink-0 ${paid ? 'bg-transparent' : 'bg-amber-500'}`} aria-hidden="true" />
                      <Star className="w-4 h-4 shrink-0 text-slate-200 group-hover:text-slate-300" />
                      <div className={`w-9 h-9 rounded-full ${colorFor(order.clientEmail || svc)} text-white text-xs font-semibold flex items-center justify-center shrink-0`}>
                        {initials(order.clientEmail)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm truncate ${paid ? 'font-medium text-[var(--color-apple-ink)]' : 'font-bold text-[var(--color-apple-ink)]'}`}>{order.clientEmail || 'Без email'}</span>
                          <span className="text-[10px] font-medium text-[var(--color-apple-grey)] shrink-0">{order.id}</span>
                        </div>
                        <div className="text-sm text-[var(--color-apple-grey)] truncate">
                          <span className="font-medium text-[var(--color-apple-ink)]">{svc}</span>
                          <span className="mx-1.5 text-slate-300">·</span>
                          {order.totalPrice?.toLocaleString()} ₽
                          {order.symbols ? <span className="text-slate-400"> · {(order.symbols / 1000).toFixed(1)}к зн.</span> : null}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-tight ${paid ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {paid ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {paid ? 'Оплачен' : 'Не оплачен'}
                        </span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="bg-[var(--color-apple-mist)] border-none rounded-lg text-[11px] font-semibold py-1.5 px-2 focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
                        >
                          <option value="pending">Ожидание</option>
                          <option value="in_progress">В работе</option>
                          <option value="completed">Готов</option>
                        </select>
                        <span className="text-xs font-medium text-[var(--color-apple-grey)] w-12 text-right tabular-nums">{date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Prices */}
            {activeTab === 'prices' && (
              <div className="p-4 sm:p-6 space-y-2.5">
                {services.map(s => (
                  <div key={s.id} className="flex items-center justify-between gap-4 p-4 bg-[var(--color-apple-mist)] rounded-2xl">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 apple-chip text-indigo-600 flex items-center justify-center shrink-0"><Tag className="w-4 h-4" /></div>
                      <span className="text-sm font-semibold text-[var(--color-apple-ink)] truncate">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="number"
                        defaultValue={s.pricePer1k}
                        onBlur={(e) => updatePrice(s.id, Number(e.target.value))}
                        className="w-24 bg-white border border-black/[0.06] rounded-xl py-2 px-3 text-sm font-semibold text-right focus:outline-none focus:border-indigo-600"
                      />
                      <span className="text-xs font-medium text-[var(--color-apple-grey)]">₽ / 1к</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Finance */}
            {activeTab === 'finance' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[560px]">
                  <thead className="bg-[var(--color-apple-mist)] border-b border-black/[0.06]">
                    <tr>
                      {['ID транзакции', 'Метод', 'Сумма', 'Дата'].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-apple-grey)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 && (
                      <tr><td colSpan={4} className="px-6 py-16 text-center text-sm text-[var(--color-apple-grey)]">Транзакций пока нет</td></tr>
                    )}
                    {transactions.map(tx => (
                      <tr key={tx.id} className="border-b border-black/[0.04] hover:bg-[var(--color-apple-mist)] transition-colors">
                        <td className="px-6 py-4 font-mono text-xs font-medium text-[var(--color-apple-grey)]">{tx.id}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-semibold tracking-tight">
                            {tx.method === 'sbp' ? <Landmark className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                            {tx.method.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-[var(--color-apple-ink)]">{tx.amount.toLocaleString()} ₽</td>
                        <td className="px-6 py-4 text-xs text-[var(--color-apple-grey)] font-medium">{new Date(tx.timestamp).toLocaleString('ru-RU')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Logs */}
            {activeTab === 'logs' && (
              <div className="bg-slate-900 m-4 sm:m-6 rounded-2xl p-5 h-[460px] overflow-y-auto font-mono text-xs custom-scrollbar">
                {logs.map(log => (
                  <div key={log.id} className="mb-2 flex gap-3">
                    <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                    <span className={log.type === 'error' ? 'text-rose-400' : log.type === 'success' ? 'text-emerald-400' : 'text-indigo-400'}>{log.type.toUpperCase()}:</span>
                    <span className="text-slate-300">{log.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

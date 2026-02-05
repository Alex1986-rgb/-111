
import React, { useState } from 'react';
import { CreditCard, QrCode, ShieldCheck, Lock, ArrowRight, CheckCircle2, Loader2, Landmark } from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  orderId: string;
  onSuccess: (method: 'card' | 'sbp') => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, orderId, onSuccess }) => {
  const [method, setMethod] = useState<'card' | 'sbp'>('card');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handlePay = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => onSuccess(method), 1500);
    }, 2500);
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Оплата прошла успешно</h2>
        <p className="text-slate-500 font-medium">Заказ #{orderId} передан в работу</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8">
      <div className="bg-slate-900 p-8 text-white relative">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Landmark className="w-24 h-24" /></div>
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order Pay ID: {orderId}</div>
          <Lock className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="relative z-10">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Сумма к оплате</div>
          <div className="text-5xl font-black tracking-tight">{amount.toLocaleString()} <span className="text-xl text-slate-500">₽</span></div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setMethod('card')}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all ${method === 'card' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-50 text-slate-400 grayscale'}`}
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase">Карта РФ</span>
          </button>
          <button 
            onClick={() => setMethod('sbp')}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all ${method === 'sbp' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-50 text-slate-400 grayscale'}`}
          >
            <QrCode className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase">СБП</span>
          </button>
        </div>

        {method === 'card' ? (
          <div className="space-y-4">
            <input type="text" placeholder="Номер карты" className="w-full bg-slate-50 border-2 border-slate-50 rounded-xl py-4 px-6 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="ММ/ГГ" className="w-full bg-slate-50 border-2 border-slate-50 rounded-xl py-4 px-6 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all" />
              <input type="password" placeholder="CVC" className="w-full bg-slate-50 border-2 border-slate-50 rounded-xl py-4 px-6 font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all" />
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 p-6 rounded-3xl flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center border-2 border-slate-100 mb-4 shadow-sm">
               <QrCode className="w-24 h-24 text-slate-900" />
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 leading-tight">Отсканируйте QR-код <br /> в приложении банка</p>
          </div>
        )}

        <button 
          onClick={handlePay}
          disabled={status === 'processing'}
          className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:bg-slate-300 group"
        >
          {status === 'processing' ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Подтвердить оплату <ArrowRight className="w-5 h-5 group-hover:translate-x-1" /></>}
        </button>

        <div className="flex items-center justify-center gap-6 opacity-30">
          <ShieldCheck className="w-8 h-8" />
          <div className="text-[8px] font-black uppercase tracking-widest text-slate-900">Защищено PCI DSS <br /> Security Standard</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;

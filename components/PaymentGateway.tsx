
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
      <div className="flex flex-col items-center justify-center py-16 animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-apple-ink)] mb-2">Оплата прошла успешно</h2>
        <p className="text-[var(--color-apple-grey)] font-normal">Заказ #{orderId} передан в работу</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-10 apple-card overflow-hidden animate-in fade-in slide-in-from-bottom-8">
      <div className="bg-slate-900 p-7 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Landmark className="w-24 h-24" /></div>
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="text-[11px] font-medium tracking-tight text-slate-400">Заказ № {orderId}</div>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400"><Lock className="w-3.5 h-3.5" /> Безопасно</span>
        </div>
        <div className="relative z-10">
          <div className="text-[11px] font-medium tracking-tight text-slate-500 mb-1">Сумма к оплате</div>
          <div className="text-4xl font-semibold tracking-tight">{amount.toLocaleString()} <span className="text-lg font-normal text-slate-500">₽</span></div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMethod('card')}
            className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border transition-all ${method === 'card' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-black/[0.06] text-[var(--color-apple-grey)] hover:border-slate-300'}`}
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-xs font-semibold tracking-tight">Карта РФ</span>
          </button>
          <button
            onClick={() => setMethod('sbp')}
            className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border transition-all ${method === 'sbp' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-black/[0.06] text-[var(--color-apple-grey)] hover:border-slate-300'}`}
          >
            <QrCode className="w-6 h-6" />
            <span className="text-xs font-semibold tracking-tight">СБП</span>
          </button>
        </div>

        {method === 'card' ? (
          <div className="space-y-3">
            <input type="text" placeholder="Номер карты" className="w-full bg-[var(--color-apple-mist)] border border-black/[0.06] rounded-2xl py-3.5 px-5 font-medium text-[var(--color-apple-ink)] focus:outline-none focus:border-indigo-600 focus:bg-white transition-all" />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="ММ/ГГ" className="w-full bg-[var(--color-apple-mist)] border border-black/[0.06] rounded-2xl py-3.5 px-5 font-medium text-[var(--color-apple-ink)] focus:outline-none focus:border-indigo-600 focus:bg-white transition-all" />
              <input type="password" placeholder="CVC" className="w-full bg-[var(--color-apple-mist)] border border-black/[0.06] rounded-2xl py-3.5 px-5 font-medium text-[var(--color-apple-ink)] focus:outline-none focus:border-indigo-600 focus:bg-white transition-all" />
            </div>
          </div>
        ) : (
          <div className="bg-[var(--color-apple-mist)] p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center border border-black/[0.06] mb-4 shadow-sm">
               <QrCode className="w-24 h-24 text-slate-900" />
            </div>
            <p className="text-xs font-medium text-[var(--color-apple-grey)] leading-snug">Отсканируйте QR-код<br />в приложении банка</p>
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={status === 'processing'}
          className="apple-btn w-full py-4 text-base disabled:opacity-50 disabled:pointer-events-none group"
        >
          {status === 'processing' ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Подтвердить оплату <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
        </button>

        <div className="flex items-center justify-center gap-2.5 text-[var(--color-apple-grey)]">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-[11px] font-medium tracking-tight">Защищено стандартом PCI DSS</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;

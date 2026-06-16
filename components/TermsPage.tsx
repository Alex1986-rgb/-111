
import React from 'react';
import { ScrollText, FileSignature, CreditCard, RefreshCw } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-12">
      <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom duration-700">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
          <ScrollText className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Договор <span className="text-indigo-600">публичной оферты</span></h1>
        <p className="text-slate-500 text-lg font-medium">Последнее обновление: 26 февраля 2026 г.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-sm space-y-12 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
              <FileSignature className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">1. Общие положения</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            Настоящий документ является официальным предложением (публичной офертой) TextFlow (далее — Исполнитель) и содержит все существенные условия оказания услуг копирайтинга, SEO-редакции и наполнения сайтов контентом. В соответствии со статьёй 437 Гражданского кодекса РФ, в случае принятия изложенных ниже условий физическое или юридическое лицо (далее — Заказчик) становится стороной договора на условиях настоящей оферты.
          </p>
          <p className="text-slate-600 leading-relaxed font-medium">
            Акцептом оферты считается оформление заказа и/или оплата услуг на сайте. С момента акцепта договор считается заключённым.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
              <ScrollText className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">2. Предмет договора</h2>
          </div>
          <ul className="space-y-4 text-slate-600 font-medium list-disc pl-6">
            <li>Написание SEO-оптимизированных текстов, статей и экспертного контента;</li>
            <li>Создание и наполнение карточек товаров для маркетплейсов;</li>
            <li>Массовое создание текстов и наполнение сайтов;</li>
            <li>Аудит и редактирование готового контента.</li>
          </ul>
          <p className="text-slate-600 leading-relaxed font-medium">
            Объём, сроки и стоимость каждой услуги согласуются индивидуально при оформлении заказа и фиксируются в брифе.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">3. Стоимость и порядок оплаты</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            Стоимость услуг рассчитывается исходя из объёма текста (за 1000 знаков без пробелов) и выбранного типа услуги. Оплата производится в размере 100% предоплаты через банковскую карту или Систему быстрых платежей (СБП). Услуга считается оплаченной с момента поступления денежных средств Исполнителю.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">4. Правки и возврат средств</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            Исполнитель гарантирует бесплатные правки в рамках первоначального технического задания. Возврат средств осуществляется в соответствии с Законом РФ «О защите прав потребителей» в случае, если услуга не была оказана или оказана ненадлежащим образом и не может быть исправлена.
          </p>
        </section>

        <div className="pt-5 border-t border-slate-100">
          <p className="text-slate-400 text-sm font-bold text-center uppercase tracking-widest">
            TextFlow — Прозрачные условия сотрудничества
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

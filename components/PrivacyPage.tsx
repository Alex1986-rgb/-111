
import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Политика <span className="text-indigo-600">конфиденциальности</span></h1>
        <p className="text-slate-500 text-lg font-medium">Последнее обновление: 26 февраля 2026 г.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-sm space-y-12 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">1. Общие положения</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые TextFlow (далее — Оператор).
          </p>
          <p className="text-slate-600 leading-relaxed font-medium">
            Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">2. Какие данные мы собираем</h2>
          </div>
          <ul className="space-y-4 text-slate-600 font-medium list-disc pl-6">
            <li>Фамилия, имя, отчество;</li>
            <li>Электронный адрес;</li>
            <li>Номера телефонов;</li>
            <li>Обезличенные данные о посетителях (в т.ч. файлы «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика и Гугл Аналитика и других).</li>
          </ul>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">3. Цели обработки</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            Цель обработки персональных данных Пользователя — информирование Пользователя посредством отправки электронных писем; предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте; уточнение деталей заказа и оказание услуг копирайтинга.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">4. Безопасность данных</h2>
          <p className="text-slate-600 leading-relaxed font-medium">
            Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.
          </p>
          <p className="text-slate-600 leading-relaxed font-medium">
            Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.
          </p>
        </section>

        <div className="pt-8 border-t border-slate-100">
          <p className="text-slate-400 text-sm font-bold text-center uppercase tracking-widest">
            TextFlow — Мы уважаем вашу приватность
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

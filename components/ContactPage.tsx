
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const socialLinks = [
    { 
      name: 'Telegram', 
      link: 'https://t.me/textflow_agency', 
      icon: Send, 
      color: 'bg-[#229ED9]', 
      shadow: 'shadow-[#229ED9]/30',
      desc: 'Самый быстрый ответ' 
    },
    { 
      name: 'WhatsApp', 
      link: 'https://wa.me/79991234567', 
      icon: MessageCircle, 
      color: 'bg-[#25D366]', 
      shadow: 'shadow-[#25D366]/30',
      desc: 'Удобно для аудио' 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
        <div className="animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-4xl md:text-7xl font-black mb-8 md:mb-12 tracking-tighter leading-none">Давайте <br /><span className="text-indigo-600">обсудим</span> проект</h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium mb-12 md:mb-16 leading-relaxed">
            Заполните форму или свяжитесь с нами удобным способом. Мы подготовим индивидуальное предложение под ваш бюджет.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a 
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all group relative overflow-hidden"
                >
                  <div className={`w-14 h-14 ${s.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl ${s.shadow} group-hover:rotate-6 transition-transform`}>
                    <Icon className="w-7 h-7 fill-current" />
                  </div>
                  <div className="font-black text-slate-900 text-2xl mb-1">{s.name}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.desc}</div>
                  <ExternalLink className="absolute top-8 right-8 w-5 h-5 text-slate-100 group-hover:text-indigo-600 transition-colors" />
                  <div className={`absolute bottom-0 left-0 w-full h-1 ${s.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                </a>
              );
            })}
          </div>

          <div className="space-y-10">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-1">Email</h4>
                <a href="mailto:hello@textflow.ru" className="text-xl md:text-2xl font-black text-slate-900 hover:text-indigo-600 transition-colors">hello@textflow.ru</a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-1">Звонки / СМС</h4>
                <a href="tel:+79991234567" className="text-xl md:text-2xl font-black text-slate-900 hover:text-indigo-600 transition-colors">+7 (999) 123-45-67</a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest mb-1">Офис</h4>
                <p className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Москва, Пресненская наб., 12 <br /><span className="text-slate-300 text-sm">Башня Федерация</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-10 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-right duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full"></div>
          
          {sent ? (
            <div className="text-center py-24 animate-in fade-in zoom-in">
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
                <Send className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Сообщение отправлено!</h3>
              <p className="text-slate-400 font-medium mb-12">Мы получили вашу заявку и свяжемся с вами в течение 30 минут.</p>
              <button onClick={() => setSent(false)} className="text-indigo-400 font-black uppercase text-xs tracking-widest border-b-2 border-indigo-400 pb-1">Отправить еще одно</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-4">
                 <h2 className="text-3xl font-black text-white tracking-tight">Быстрая заявка</h2>
                 <p className="text-slate-400 text-sm font-medium">Оставьте свои контакты, и наш редактор перезвонит вам для уточнения деталей.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Имя</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all font-bold" placeholder="Иван" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all font-bold" placeholder="ivan@mail.ru" />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">О проекте</label>
                <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 px-6 text-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all resize-none font-medium" placeholder="Расскажите о вашей задаче..."></textarea>
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white py-6 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98] group">
                Отправить бриф <ArrowRight className="w-6 h-6 group-hover:translate-x-1" />
              </button>
              
              <p className="text-[9px] text-slate-500 text-center uppercase font-black tracking-widest opacity-50">
                Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

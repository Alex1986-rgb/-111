
import React, { useState } from 'react';
import { Plus, Minus, Info } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface SEOSectionProps {
  title: string;
  subtitle?: string;
  seoText: string;
  faqs: FAQItem[];
  className?: string;
}

const SEOSection: React.FC<SEOSectionProps> = ({ title, subtitle, seoText, faqs, className = "" }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className={`py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* SEO Text Content */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
              <Info className="w-3 h-3" /> SEO Оптимизация
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base text-slate-500 font-medium leading-snug">
                {subtitle}
              </p>
            )}
            <div
              className="prose prose-slate prose-sm max-w-none text-slate-600 font-medium leading-snug space-y-3"
              dangerouslySetInnerHTML={{ __html: seoText }}
            />
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            <h3 className="text-xl font-black text-slate-900 mb-3">Часто задаваемые вопросы</h3>
            <div className="space-y-2.5">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`border rounded-2xl transition-all overflow-hidden ${openFaq === i ? 'border-indigo-600 bg-white shadow-lg shadow-indigo-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-5 py-4 flex justify-between items-center text-left gap-4"
                  >
                    <span className="text-sm md:text-base font-black text-slate-900 leading-tight">{faq.q}</span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${openFaq === i ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-slate-500 text-sm leading-relaxed font-medium animate-in slide-in-from-top-2 duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOSection;

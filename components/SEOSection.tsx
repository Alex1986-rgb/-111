
import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface SEOSectionProps {
  title: string;
  subtitle?: string;
  seoText: string;
  faqs?: FAQItem[];
  hideFaq?: boolean;
  className?: string;
}

const SEOSection: React.FC<SEOSectionProps> = ({ title, subtitle, seoText, faqs = [], hideFaq = false, className = "" }) => {
  const [expanded, setExpanded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Разбиваем HTML на абзацы, сохраняя теги </p>
  const parts = seoText.split(/(?<=<\/p>)/i).map(s => s.trim()).filter(Boolean);
  const firstPara = parts[0] || seoText;
  const restHtml = parts.slice(1).join('');
  const hasMore = restHtml.length > 0;

  const showFaq = !hideFaq && faqs.length > 0;
  const faqLd = showFaq ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null;

  return (
    <section className={`py-8 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-3">
          <Info className="w-3 h-3" /> SEO Оптимизация
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base md:text-lg text-slate-500 font-medium leading-snug mb-5">
            {subtitle}
          </p>
        )}

        <div className="seo-richtext max-w-none">
          <div dangerouslySetInnerHTML={{ __html: firstPara }} />
          {hasMore && (
            <div
              className={`grid transition-all duration-500 ease-out ${expanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden space-y-3">
                <div dangerouslySetInnerHTML={{ __html: restHtml }} />
              </div>
            </div>
          )}
        </div>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-600 hover:opacity-70 transition-opacity"
          >
            {expanded ? 'Свернуть' : 'Читать полностью'}
            <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </span>
          </button>
        )}

        {showFaq && (
          <div className="mt-10" aria-label="Частые вопросы">
            {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-5">Частые вопросы</h3>
            <div className="space-y-2.5">
              {faqs.map((item, i) => (
                <div key={i} className={`border rounded-2xl overflow-hidden transition-all ${openFaq === i ? 'border-indigo-600 bg-white shadow-lg shadow-indigo-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="w-full px-5 py-4 flex justify-between items-center text-left gap-4"
                  >
                    <span className="text-sm md:text-base font-semibold text-slate-900 leading-tight">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-indigo-600 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed font-normal animate-in slide-in-from-top-2 duration-300">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SEOSection;

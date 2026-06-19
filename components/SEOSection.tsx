
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
  className?: string;
}

const SEOSection: React.FC<SEOSectionProps> = ({ title, subtitle, seoText, className = "" }) => {
  const [expanded, setExpanded] = useState(false);

  // Разбиваем HTML на абзацы, сохраняя теги </p>
  const parts = seoText.split(/(?<=<\/p>)/i).map(s => s.trim()).filter(Boolean);
  const firstPara = parts[0] || seoText;
  const restHtml = parts.slice(1).join('');
  const hasMore = restHtml.length > 0;

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

        <div className="prose prose-slate prose-sm md:prose-base max-w-none text-slate-600 font-medium leading-relaxed">
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
      </div>
    </section>
  );
};

export default SEOSection;

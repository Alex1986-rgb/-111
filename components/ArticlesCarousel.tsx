
import React, { useRef } from 'react';
import { Article } from '../types';
import { Calendar, Clock, ArrowUpRight, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface ArticlesCarouselProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  onSeeAll?: () => void;
}

const ArticlesCarousel: React.FC<ArticlesCarouselProps> = ({ articles, onArticleClick, onSeeAll }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  if (!articles || articles.length === 0) return null;

  const scrollByCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 16 : 320;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="py-10 bg-[var(--color-apple-mist)]" aria-label="Статьи из блога">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div className="apple-pill-label mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[var(--color-apple-blue)]" /> Из блога
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-apple-ink)] tracking-tight leading-tight">
              Читайте также
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {onSeeAll && (
              <button
                onClick={onSeeAll}
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-apple-blue)] tracking-tight hover:opacity-70 transition-opacity mr-2"
              >
                Все статьи <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Предыдущая статья"
              className="apple-chip w-10 h-10 flex items-center justify-center hover:bg-[var(--color-apple-blue)] hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Следующая статья"
              className="apple-chip w-10 h-10 flex items-center justify-center hover:bg-[var(--color-apple-blue)] hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {articles.map((article) => (
            <article
              key={article.id}
              data-card
              onClick={() => onArticleClick(article)}
              className="group apple-card snap-start shrink-0 basis-[85%] sm:basis-[47%] lg:basis-[31.5%] overflow-hidden cursor-pointer flex flex-col"
            >
              <div className="relative overflow-hidden h-40">
                <img
                  src={article.image + '&w=600'}
                  alt={article.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/80 backdrop-blur-xl text-[var(--color-apple-ink)] text-[11px] font-semibold px-3 py-1 rounded-full tracking-tight shadow-sm border border-white/50">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[var(--color-apple-grey)] text-xs font-medium tracking-tight mb-2">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readingTime} мин</span>
                </div>
                <h3 className="text-base font-semibold text-[var(--color-apple-ink)] tracking-tight leading-snug mb-3 line-clamp-2 group-hover:text-[var(--color-apple-blue)] transition-colors">
                  {article.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-black/[0.06]">
                  <div className="flex items-center gap-2">
                    <img src={article.author.avatar} alt={article.author.name} loading="lazy" className="w-7 h-7 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    <span className="text-xs font-semibold text-[var(--color-apple-ink)] tracking-tight">{article.author.name}</span>
                  </div>
                  <div className="w-8 h-8 apple-chip flex items-center justify-center group-hover:bg-[var(--color-apple-blue)] group-hover:text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesCarousel;

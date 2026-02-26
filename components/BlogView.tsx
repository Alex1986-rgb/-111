
import React, { useState, useMemo } from 'react';
import { BLOG_ARTICLES } from '../constants';
import { Article } from '../types';
import { Calendar, Search, ArrowRight, Clock, Tag, X } from 'lucide-react';
import SEOSection from './SEOSection';

interface BlogViewProps {
  onArticleClick: (article: Article) => void;
}

const BlogView: React.FC<BlogViewProps> = ({ onArticleClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = useMemo(() => ['Все', ...Array.from(new Set(BLOG_ARTICLES.map(a => a.category)))], []);
  const allTags = useMemo(() => Array.from(new Set(BLOG_ARTICLES.flatMap(a => a.tags))), []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const blogFaqs = [
    { q: 'Как часто выходят новые статьи?', a: 'Мы обновляем блог 2-3 раза в неделю. Наши редакторы постоянно следят за обновлениями алгоритмов поисковых систем и трендами в контент-маркетинге, чтобы вы получали только актуальную информацию.' },
    { q: 'Могу ли я использовать ваши материалы на своем сайте?', a: 'Да, при условии обязательной активной ссылки на первоисточник (нашу статью). Мы приветствуем распространение знаний, но уважаем авторское право.' },
    { q: 'Принимаете ли вы гостевые посты?', a: 'Мы открыты к сотрудничеству с экспертами. Если у вас есть уникальный опыт или интересное исследование в области контента, напишите нашему главному редактору.' },
    { q: 'Как подписаться на обновления?', a: 'Вы можете подписаться на наш Telegram-канал или рассылку в футере сайта. Там мы анонсируем все новые материалы и делимся эксклюзивными чек-листами.' }
  ];

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || article.category === selectedCategory;
      const matchesTags = selectedTags.length === 0 || selectedTags.every(t => article.tags.includes(t));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-100">База знаний TEXTFLOW</div>
        <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter text-slate-900 leading-[1] md:leading-[0.9]">
          Экспертный <br />
          <span className="gradient-text">Блог</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium px-4">Аналитика, тренды и практические советы по контенту для вашего бизнеса.</p>
      </div>

      <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-xl border border-slate-100 mb-12 md:mb-16 animate-in fade-in slide-in-from-top-4">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="lg:col-span-4 space-y-3 md:space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 md:ml-4">Поиск по статьям</label>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Что вы ищете?..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-14 pr-6 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all font-medium text-sm md:text-base"
              />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3 md:space-y-4">
            <div className="flex justify-between items-center px-2 md:px-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Категории контента</label>
               { (selectedCategory !== 'Все' || selectedTags.length > 0 || searchQuery) && (
                 <button 
                  onClick={() => { setSelectedCategory('Все'); setSelectedTags([]); setSearchQuery(''); }}
                  className="text-[10px] font-black uppercase text-indigo-600 flex items-center gap-1 hover:opacity-70 transition-opacity"
                 >
                   <X className="w-3 h-3" /> Сбросить
                 </button>
               )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-12 space-y-3 md:space-y-4 pt-4 border-t border-slate-50">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 md:ml-4">Популярные темы</label>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[9px] md:text-[10px] font-bold transition-all border ${
                    selectedTags.includes(tag) 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-100'
                  }`}
                >
                  <Tag className={`w-3 h-3 ${selectedTags.includes(tag) ? 'fill-indigo-600' : ''}`} />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {filteredArticles.map((article) => (
            <article 
              key={article.id} 
              className="group bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer flex flex-col h-full"
              onClick={() => onArticleClick(article)}
            >
              <div className="relative overflow-hidden h-56 md:h-72">
                <img 
                  src={article.image + '&w=800'} 
                  alt={article.imageAlt} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute top-4 md:top-6 left-4 md:left-6">
                  <span className="bg-white/95 backdrop-blur-md text-indigo-600 text-[9px] md:text-[10px] font-black px-4 md:px-5 py-1.5 md:py-2 rounded-full uppercase tracking-widest shadow-xl border border-white/50">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-10 flex flex-col flex-1">
                <div className="flex items-center gap-4 md:gap-6 text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Calendar className="w-3.5 md:w-4 h-3.5 md:h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Clock className="w-3.5 md:w-4 h-3.5 md:h-4" />
                    <span>{article.readingTime} мин</span>
                  </div>
                </div>
                <h2 className="text-xl md:text-3xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                  {article.title}
                </h2>
                <p className="text-slate-500 text-sm md:text-base mb-6 md:mb-8 line-clamp-3 leading-relaxed font-medium">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-[8px] md:text-[9px] font-black uppercase text-slate-300">#{tag}</span>
                  ))}
                </div>

                <div className="mt-auto pt-6 md:pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                     <img 
                        src={article.author.avatar} 
                        alt={article.author.name} 
                        loading="lazy"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-md" 
                      />
                     <div>
                        <div className="text-[9px] md:text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">{article.author.name}</div>
                        <div className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{article.author.role}</div>
                     </div>
                  </div>
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-indigo-50 text-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                     <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 md:py-40 bg-white rounded-[2rem] md:rounded-[4rem] border border-dashed border-slate-200 mx-4">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 md:w-10 h-8 md:h-10" />
           </div>
           <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">Статьи не найдены</h3>
           <p className="text-slate-500 text-sm md:text-base px-6">Попробуйте изменить параметры фильтрации или поисковый запрос.</p>
           <button 
             onClick={() => { setSelectedCategory('Все'); setSelectedTags([]); setSearchQuery(''); }}
             className="mt-8 text-indigo-600 font-black uppercase text-xs tracking-[0.2em] hover:opacity-70"
           >
             Сбросить все фильтры
           </button>
        </div>
      )}

      <SEOSection 
        title="Ваш путеводитель в мире контент-маркетинга"
        subtitle="Мы делимся знаниями, которые помогают бизнесу расти быстрее и эффективнее."
        seoText={`
          <p>Блог TextFlow — это не просто набор статей, а полноценная база знаний для предпринимателей, маркетологов и SEO-специалистов. Мы пишем о том, что проверили на собственном опыте и опыте наших клиентов.</p>
          <p><strong>О чем мы рассказываем?</strong> В нашем блоге вы найдете подробные гайды по LSI-копирайтингу, советы по наполнению карточек товаров на маркетплейсах, аналитику изменений алгоритмов Яндекс и Google, а также практические кейсы по автоматизации создания контента.</p>
          <p>Наша цель — сделать рынок контента прозрачным и понятным. Мы верим, что качественная информация помогает нашим клиентам принимать правильные бизнес-решения и достигать поставленных целей в органическом поиске.</p>
        `}
        faqs={blogFaqs}
        className="mt-20"
      />
    </div>
  );
};

export default BlogView;

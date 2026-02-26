
import React, { useEffect, useState, useMemo } from 'react';
import { Article } from '../types';
import { 
  Calendar, 
  Clock, 
  Home, 
  ChevronRight,
  Plus,
  Minus,
  Zap,
  ArrowRight,
  Share2,
  Bookmark,
  X,
  Send,
  Mail,
  Link as LinkIcon,
  Check
} from 'lucide-react';
import SEODataTable from './SEODataTable';
import MotivationalQuote from './MotivationalQuote';
import { BLOG_ARTICLES } from '../constants';

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
  onNavigateToArticle: (article: Article) => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack, onNavigateToArticle }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const relatedArticles = useMemo(() => {
    return BLOG_ARTICLES
      .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
      .slice(0, 3);
  }, [article.id, article.category, article.tags]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeFontSize = (delta: number) => {
    setFontSize(prev => Math.min(Math.max(prev + delta, 14), 28));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
        setIsShareModalOpen(true);
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`,
      color: 'bg-[#0088cc]'
    },
    {
      name: 'WhatsApp',
      icon: <div className="font-bold text-lg">W</div>,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`,
      color: 'bg-[#25D366]'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(article.excerpt + '\n\n' + window.location.href)}`,
      color: 'bg-slate-600'
    }
  ];

  const parseInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-900 font-black">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const middleIndex = Math.floor(lines.length / 2);
    
    return lines.map((line, i) => {
      const elements = [];
      
      if (i === middleIndex) {
        elements.push(<MotivationalQuote key={`mq-${i}`} index={parseInt(article.id)} />);
      }

      // Добавляем таблицу Roadmap после введения
      if (line.startsWith('## Глава 1')) {
        elements.push(
          <SEODataTable 
            key={`roadmap-${i}`}
            type="roadmap"
            title="Этапы реализации стратегии"
            data={[
              { label: "Анализ", value: "Сбор семантики и конкурентов" },
              { label: "Текст", value: "LSI-копирайтинг и редактура" },
              { label: "SEO", value: "Оптимизация Meta и заголовков" },
              { label: "Финиш", value: "Публикация и индексация" }
            ]}
          />
        );
      }

      // Добавляем таблицу сравнения в Главе 2
      if (line.startsWith('## Глава 2')) {
        elements.push(
          <SEODataTable 
            key={`comparison-${i}`}
            type="comparison"
            title="Сравнение подходов"
            data={[
              { feature: "Глубина проработки", old: "Поверхностно", new: "Экспертно" },
              { feature: "LSI-ключи", old: "Отсутствуют", new: "15-20 фраз" },
              { feature: "Форматирование", old: "Сплошной текст", new: "Rich Content" },
              { feature: "Конверсия", old: "0.5%", new: "2.8%" }
            ]}
          />
        );
      }

      // Добавляем таблицу аналитики в конце
      if (line.startsWith('## Заключение')) {
        elements.push(
          <SEODataTable 
            key={`specs-${i}`}
            type="specs"
            title="Прогноз эффективности"
            data={[
              { category: "SEO", label: "Видимость в Яндексе", profit: "+120%" },
              { category: "UX", label: "Глубина просмотра", profit: "3.5 мин" },
              { category: "Business", label: "Стоимость лида", profit: "-30%" }
            ]}
          />
        );
      }

      // Семантическая обработка заголовков
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 sm:mt-16 mb-6 tracking-tight flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
            <span className="w-1.5 h-6 sm:h-8 bg-indigo-600 rounded-full shrink-0"></span>
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mt-16 sm:mt-24 mb-8 sm:mb-12 tracking-tighter leading-tight bg-slate-50/50 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border-l-[8px] sm:border-l-[10px] border-indigo-600 shadow-sm animate-in fade-in slide-in-from-left duration-700">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="my-8 sm:my-10 p-6 sm:p-8 bg-indigo-50 border-l-8 border-indigo-600 rounded-r-2xl sm:rounded-r-[2.5rem] italic text-indigo-900 font-bold text-base sm:text-lg shadow-inner">
            {parseInlineMarkdown(line.replace('> ', ''))}
          </blockquote>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="ml-6 sm:ml-8 mb-4 list-none relative text-slate-700 font-medium text-sm sm:text-base">
            <span className="absolute -left-5 sm:-left-6 top-2 w-2 h-2 bg-indigo-400 rounded-full"></span>
            {parseInlineMarkdown(line.replace('- ', ''))}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        // Нумерованные списки
        elements.push(
          <div key={i} className="flex gap-4 mb-6 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-sm shadow-lg shadow-indigo-100">
              {line.match(/^\d+/)?.[0]}
            </span>
            <p className="text-slate-700 font-medium leading-relaxed pt-1">
              {parseInlineMarkdown(line.replace(/^\d+\.\s/, ''))}
            </p>
          </div>
        );
      } else if (line.trim() === '') {
        elements.push(<div key={i} className="h-4 sm:h-6" />);
      } else {
        elements.push(<p key={i} className="mb-6 sm:mb-8 leading-relaxed text-slate-600 font-medium">{parseInlineMarkdown(line)}</p>);
      }
      
      return elements;
    });
  };

  return (
    <article className="min-h-screen bg-white pb-20 sm:pb-32">
      {/* Прогресс-бар чтения */}
      <div className="fixed top-20 left-0 w-full h-1 sm:h-1.5 z-[110] bg-slate-50">
        <div 
          className="h-full bg-indigo-600 transition-all duration-200 ease-out shadow-[0_0_15px_rgba(79,70,229,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsShareModalOpen(false)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 sm:p-10 relative z-10 shadow-3xl animate-in zoom-in duration-300">
            <button 
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-black text-slate-900 mb-2">Поделиться</h3>
            <p className="text-slate-500 text-sm font-medium mb-8">Расскажите об этой статье своим коллегам и друзьям.</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {shareLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className={`w-14 h-14 ${link.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    {link.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">{link.name}</span>
                </a>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <LinkIcon className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                readOnly 
                value={window.location.href}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-24 text-xs font-medium text-slate-500 focus:outline-none"
              />
              <button 
                onClick={copyToClipboard}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                {isCopied ? <><Check className="w-3 h-3" /> Ок</> : 'Копировать'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 sm:mb-12 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
           <button onClick={() => onBack()} className="hover:text-indigo-600 flex items-center gap-1.5 shrink-0 transition-colors">
              <Home className="w-3.5 h-3.5" /> Главная
           </button>
           <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-200" />
           <button onClick={() => onBack()} className="hover:text-indigo-600 shrink-0 transition-colors">Блог агентства</button>
           <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-200" />
           <span className="text-slate-900 truncate max-w-[150px] sm:max-w-[200px]">{article.title}</span>
        </nav>

        <header className="mb-12 sm:mb-20">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
            <div className="bg-indigo-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100">
              {article.category}
            </div>
            <div className="flex items-center gap-4 sm:gap-6 text-slate-400 font-black text-[9px] sm:text-[10px] uppercase tracking-widest">
              <div className="flex items-center gap-2 sm:gap-2.5"><Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-indigo-400" /> {article.readingTime} мин</div>
              <div className="flex items-center gap-2 sm:gap-2.5"><Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-indigo-400" /> {article.date}</div>
            </div>
          </div>
          
          {/* H1 - Главный заголовок статьи (оптимизирован для мобильных) */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1] sm:leading-[0.9] mb-10 sm:mb-16 tracking-tighter animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {article.title}
          </h1>

          <div className="relative group overflow-hidden rounded-[2rem] sm:rounded-[4rem] shadow-3xl animate-in zoom-in duration-1000 ring-1 ring-slate-100">
            <img 
              src={article.image + '&w=1400'} 
              alt={article.imageAlt} 
              className="w-full h-[250px] sm:h-[400px] md:h-[600px] lg:h-[750px] object-cover transition-transform duration-[15s] group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-12">
               <div className="text-white/60 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] mb-2 sm:mb-4">Original Expert Content</div>
               <div className="h-1 sm:h-1.5 w-16 sm:w-24 bg-indigo-500 rounded-full"></div>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 sm:gap-20 relative">
          <div className="lg:w-8/12">
            <div className="max-w-none transition-all duration-500" style={{ fontSize: `${fontSize}px` }}>
              {renderContent(article.content)}
            </div>

            {/* Секция автора внизу статьи */}
            <div className="mt-20 p-8 sm:p-12 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col sm:flex-row items-center gap-8">
               <img 
                  src={article.author.avatar} 
                  alt={article.author.name} 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] object-cover shadow-xl grayscale hover:grayscale-0 transition-all"
               />
               <div className="text-center sm:text-left">
                  <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Автор материала</div>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">{article.author.name}</h4>
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-tight mb-4">{article.author.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-md">Эксперт в области {article.category.toLowerCase()}. Более 10 лет опыта в создании контента, который не только нравится людям, но и приносит прибыль бизнесу.</p>
               </div>
            </div>
          </div>

          <div className="lg:w-4/12">
            <div className="sticky top-32 space-y-8 sm:space-y-10">
              {/* Параметры чтения */}
              <section className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-100/50">
                <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-6 sm:mb-8 border-b border-slate-50 pb-4">Параметры чтения</h4>
                <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-50 rounded-[1.2rem] sm:rounded-[1.5rem] border border-slate-100 mb-6">
                  <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Шрифт</span>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button onClick={() => changeFontSize(-2)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all active:scale-90 border border-slate-100 text-xs sm:text-base"><Minus className="w-3.5 sm:w-4 h-3.5 sm:h-4" /></button>
                    <span className="text-sm sm:text-base font-black w-6 sm:w-8 text-center text-indigo-600">{fontSize}</span>
                    <button onClick={() => changeFontSize(2)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all active:scale-90 border border-slate-100 text-xs sm:text-base"><Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" /></button>
                  </div>
                </div>
                <div className="flex gap-4">
                   <button 
                    onClick={handleShare}
                    className="flex-1 py-3 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                   >
                      <Share2 className="w-4 h-4" /> <span className="text-[10px] font-black uppercase">Поделиться</span>
                   </button>
                   <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                      <Bookmark className="w-4 h-4" />
                   </button>
                </div>
              </section>

              {/* Рекламный блок */}
              <section className="bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-indigo-500/20 rounded-full blur-[50px] sm:blur-[60px] -translate-y-12 translate-x-12 group-hover:bg-indigo-500/40 transition-colors"></div>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-black mb-4 sm:mb-6 leading-tight relative z-10">Статья была <br /><span className="text-indigo-400">полезна?</span></h4>
                <p className="text-xs sm:text-sm text-slate-400 mb-8 sm:mb-10 leading-relaxed font-medium relative z-10">Закажите экспертный контент у авторов этого материала. Сделаем глубокий аудит вашего сайта бесплатно.</p>
                <button className="w-full py-5 sm:py-6 bg-indigo-600 text-white rounded-[1.2rem] sm:rounded-[1.5rem] font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-700 hover:scale-[1.02] transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 active:scale-95">
                  Обсудить проект <ArrowRight className="w-4 h-4" />
                </button>
              </section>

              <div className="p-6 sm:p-8 border-2 border-dashed border-slate-100 rounded-[2rem] sm:rounded-[3rem] text-center">
                 <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-100 mx-auto mb-3 sm:mb-4" />
                 <p className="text-[8px] sm:text-[10px] font-black text-slate-300 uppercase tracking-widest">TextFlow Editorial System v2.5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Секция похожих статей */}
        {relatedArticles.length > 0 && (
          <section className="mt-32 pt-20 border-t border-slate-100">
            <div className="flex items-end justify-between mb-12">
               <div>
                  <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4">Читайте далее</div>
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">Похожие <span className="text-indigo-600">материалы</span></h2>
               </div>
               <button onClick={() => onBack()} className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors">
                  Все статьи <ArrowRight className="w-4 h-4" />
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {relatedArticles.map((rel) => (
                 <div 
                  key={rel.id} 
                  onClick={() => { onNavigateToArticle(rel); window.scrollTo(0, 0); }}
                  className="group cursor-pointer"
                 >
                    <div className="relative overflow-hidden rounded-[2rem] h-48 mb-6">
                       <img src={rel.image + '&w=600'} alt={rel.imageAlt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-indigo-600 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{rel.category}</span>
                       </div>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">{rel.title}</h4>
                    <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-4">{rel.excerpt}</p>
                    <div className="flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                       <Clock className="w-3 h-3" /> {rel.readingTime} мин
                    </div>
                 </div>
               ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

export default ArticlePage;


import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { 
  Calendar, 
  Clock, 
  Home, 
  ChevronRight,
  Plus,
  Minus,
  Zap,
  ArrowRight
} from 'lucide-react';
import SEODataTable from './SEODataTable';
import MotivationalQuote from './MotivationalQuote';

interface ArticlePageProps {
  article: Article;
  onBack: () => void;
  onNavigateToArticle: (article: Article) => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack, onNavigateToArticle }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState(18);

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
        // H3 - Подразделы (оптимизировано для мобильных)
        elements.push(
          <h3 key={i} className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-12 sm:mt-16 mb-6 tracking-tight flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
            <span className="w-1.5 h-6 sm:h-8 bg-indigo-600 rounded-full shrink-0"></span>
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        // H2 - Основные разделы (оптимизировано для мобильных)
        elements.push(
          <h2 key={i} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mt-16 sm:mt-24 mb-8 sm:mb-12 tracking-tighter leading-tight bg-slate-50/50 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border-l-[8px] sm:border-l-[10px] border-indigo-600 shadow-sm animate-in fade-in slide-in-from-left duration-700">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('**')) {
        elements.push(<p key={i} className="mb-6 font-bold text-slate-900 leading-relaxed">{line.replace(/\*\*/g, '')}</p>);
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="my-8 sm:my-10 p-6 sm:p-8 bg-indigo-50 border-l-8 border-indigo-600 rounded-r-2xl sm:rounded-r-[2.5rem] italic text-indigo-900 font-bold text-base sm:text-lg shadow-inner">
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="ml-6 sm:ml-8 mb-4 list-none relative text-slate-700 font-medium text-sm sm:text-base">
            <span className="absolute -left-5 sm:-left-6 top-2 w-2 h-2 bg-indigo-400 rounded-full"></span>
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.trim() === '') {
        elements.push(<div key={i} className="h-4 sm:h-6" />);
      } else {
        elements.push(<p key={i} className="mb-6 sm:mb-8 leading-relaxed text-slate-600 font-medium">{line}</p>);
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
          </div>

          <div className="lg:w-4/12">
            <div className="sticky top-32 space-y-8 sm:space-y-10">
              {/* Параметры чтения */}
              <section className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-100/50">
                <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-6 sm:mb-8 border-b border-slate-50 pb-4">Параметры чтения</h4>
                <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-50 rounded-[1.2rem] sm:rounded-[1.5rem] border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Шрифт</span>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button onClick={() => changeFontSize(-2)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all active:scale-90 border border-slate-100 text-xs sm:text-base"><Minus className="w-3.5 sm:w-4 h-3.5 sm:h-4" /></button>
                    <span className="text-sm sm:text-base font-black w-6 sm:w-8 text-center text-indigo-600">{fontSize}</span>
                    <button onClick={() => changeFontSize(2)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all active:scale-90 border border-slate-100 text-xs sm:text-base"><Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" /></button>
                  </div>
                </div>
              </section>

              {/* Рекламный блок */}
              <section className="bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] text-white shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-indigo-500/20 rounded-full blur-[50px] sm:blur-[60px] -translate-y-12 translate-x-12 group-hover:bg-indigo-500/40 transition-colors"></div>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-black mb-4 sm:mb-6 leading-tight relative z-10">Статья была <br /><span className="text-indigo-400">полезна?</span></h4>
                <p className="text-xs sm:text-sm text-slate-400 mb-8 sm:mb-10 leading-relaxed font-medium relative z-10">Закажите экспертный контент у авторов этого материала. Сделаем SEO-аудит вашего сайта бесплатно.</p>
                <button className="w-full py-5 sm:py-6 bg-indigo-600 text-white rounded-[1.2rem] sm:rounded-[1.5rem] font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-700 hover:scale-[1.02] transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 active:scale-95">
                  Обсудить проект <ArrowRight className="w-4 h-4" />
                </button>
              </section>

              <div className="p-6 sm:p-8 border-2 border-dashed border-slate-100 rounded-[2rem] sm:rounded-[3rem] text-center">
                 <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-100 mx-auto mb-3 sm:mb-4" />
                 <p className="text-[8px] sm:text-[10px] font-black text-slate-300 uppercase tracking-widest">TextFlow AI Editorial System v2.5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;

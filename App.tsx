
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { INITIAL_SERVICES, BLOG_ARTICLES, REVIEWS } from './constants';
import { Service, ViewId, Order, Article, Route, AuthState, SystemLog, Transaction } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import PricingCalculator from './components/PricingCalculator';
import AdminDashboard from './components/AdminDashboard';
import ServicesGrid from './components/ServicesGrid';
import OrderForm from './components/OrderForm';
import BlogView from './components/BlogView';
import ArticlePage from './components/ArticlePage';
import PaymentGateway from './components/PaymentGateway';
import Footer from './components/Footer';
import EditorialAssistant from './components/AIHelper';
import MessengerFab from './components/MessengerFab';
import TextAuditTool from './components/TextAuditTool';
import LiveNotifications from './components/LiveNotifications';
import ContactPage from './components/ContactPage';
import TrustBar from './components/TrustBar';
import CaseStudies from './components/CaseStudies';
import FAQ from './components/FAQ';
import HowItWorks from './components/HowItWorks';
import TestimonialCarousel from './components/TestimonialCarousel';
import ConversionQuiz from './components/ConversionQuiz';
import ReviewsPage from './components/ReviewsPage';
import BulkOrderView from './components/BulkOrderView';
import EnterpriseSection from './components/EnterpriseSection';
import ServicePage from './components/ServicePage';

import SEOSection from './components/SEOSection';

// --- GLOBAL STATE PROVIDER ---
interface AppContextType {
  services: Service[];
  orders: Order[];
  transactions: Transaction[];
  auth: AuthState;
  logs: SystemLog[];
  addLog: (type: SystemLog['type'], message: string) => void;
  navigate: (view: ViewId, slug?: string) => void;
  updatePrice: (id: string, price: number) => void;
  createOrder: (order: Partial<Order>) => void;
  setAuthStatus: (auth: AuthState) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  recordTransaction: (tx: Transaction) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

/** SEO Manager: Инъекция Meta и JSON-LD */
const SEOManager: React.FC<{ route: Route, article?: Article | null, service?: Service | null }> = ({ route, article, service }) => {
  useEffect(() => {
    let title = "TextFlow | Экспертный копирайтинг и SEO-редакция 2025";
    let desc = "Тексты, которые выводят бизнес в ТОП Яндекса. Профессиональное агентство контента с глубокой экспертной проверкой.";
    
    switch (route.view) {
      case 'blog':
        title = "База знаний по маркетингу и SEO | Блог TextFlow";
        desc = "Читайте экспертные статьи о копирайтинге, продвижении на маркетплейсах и трендах в контенте.";
        break;
      case 'article':
        if (article) {
          title = `${article.title} | TextFlow`;
          desc = article.excerpt;
        }
        break;
      case 'service':
        if (service) {
          title = service.seoTitle || `${service.name} | TextFlow`;
          desc = service.seoDescription || service.description;
        }
        break;
      case 'pricing':
        title = "Цены на копирайтинг и SEO-тексты | Калькулятор TextFlow";
        desc = "Рассчитайте стоимость вашего проекта онлайн. Прозрачное ценообразование за 1000 знаков.";
        break;
      case 'cases':
        title = "Кейсы и результаты клиентов | Портфолио TextFlow";
        desc = "Посмотрите, как мы помогаем бизнесу расти: рост трафика на 300%, охваты 120к+ на VC.ru и продажи на WB.";
        break;
      case 'reviews':
        title = "Отзывы клиентов об агентстве TextFlow";
        desc = "Что о нас говорят лидеры рынка: Яндекс, Сбер, Ozon и другие. Честные отзывы о качестве контента.";
        break;
      case 'bulk':
        title = "Массовое наполнение сайтов контентом | TextFlow Enterprise";
        desc = "Профессиональное создание сотен текстов для интернет-магазинов и маркетплейсов силами нашей редакции.";
        break;
      case 'contact':
        title = "Контакты агентства TextFlow | Обсудить проект";
        desc = "Свяжитесь с нами через Telegram, WhatsApp или оставьте заявку на сайте. Офис в Москва-Сити.";
        break;
      case 'admin':
        title = "Панель управления | TextFlow Admin";
        desc = "Внутренняя система управления заказами и ценами.";
        break;
    }

    document.title = title;
    
    // JSON-LD Injection
    const schema = {
      "@context": "https://schema.org",
      "@type": route.view === 'article' ? "Article" : "WebSite",
      "name": title,
      "description": desc,
      "url": window.location.href,
      "publisher": {
        "@type": "Organization",
        "name": "TextFlow",
        "logo": {
          "@type": "ImageObject",
          "url": "https://textflow.ru/logo.png"
        }
      }
    };
    
    let script = document.getElementById('json-ld-dynamic');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-dynamic';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [route, article]);
  return null;
};

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>(() => {
    const hash = window.location.hash.replace('#/', '');
    if (!hash) return { view: 'home' };
    const parts = hash.split('/');
    return { view: parts[0] as ViewId, params: { slug: parts[1] } };
  });

  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem('tf_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch (e) {
      console.error("Failed to parse services from localStorage", e);
      return INITIAL_SERVICES;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('tf_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse orders from localStorage", e);
      return [];
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('tf_transactions');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse transactions from localStorage", e);
      return [];
    }
  });

  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const saved = localStorage.getItem('tf_auth');
      return saved ? JSON.parse(saved) : { isAuthenticated: false, token: null, role: null };
    } catch (e) {
      console.error("Failed to parse auth from localStorage", e);
      return { isAuthenticated: false, token: null, role: null };
    }
  });

  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [pendingOrderData, setPendingOrderData] = useState<any>(null);

  const addLog = (type: SystemLog['type'], message: string) => {
    const newLog: SystemLog = { id: Math.random().toString(36).substr(2, 9), type, message, timestamp: new Date().toLocaleTimeString() };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  const navigate = useCallback((view: ViewId, slug?: string) => {
    if (view === 'admin' && !auth.isAuthenticated) {
      addLog('warning', 'Попытка входа в панель без авторизации');
    }
    const path = slug ? `#/${view}/${slug}` : `#/${view}`;
    window.location.hash = path;
    window.scrollTo(0, 0);
  }, [auth]);

  const updatePrice = (id: string, price: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, pricePer1k: price } : s));
    addLog('info', `Цена услуги ${id} изменена: ${price}₽`);
  };

  const createOrder = (orderData: any) => {
    if (orderData.serviceId === 'bulk') {
      navigate('bulk');
      return;
    }
    setPendingOrderData(orderData);
    navigate('order');
  };

  const finalizeOrder = (details: any) => {
    const newOrder: Order = {
      id: 'TF-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      serviceId: pendingOrderData.serviceId,
      symbols: pendingOrderData.symbols,
      totalPrice: pendingOrderData.price,
      status: 'pending',
      paymentStatus: 'unpaid',
      clientEmail: details.email,
      description: details.description,
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
    addLog('success', `Создан заказ ${newOrder.id}`);
    navigate('payment', newOrder.id);
  };

  const recordTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
    setOrders(prev => prev.map(o => o.id === tx.orderId ? { ...o, paymentStatus: 'paid', status: 'in_progress' } : o));
    addLog('success', `Оплата заказа ${tx.orderId} подтверждена (${tx.amount}₽)`);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    addLog('info', `Заказ ${id} -> ${status}`);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '');
      const parts = hash.split('/');
      setRoute({ view: (parts[0] || 'home') as ViewId, params: { slug: parts[1] } });
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    localStorage.setItem('tf_services', JSON.stringify(services));
    localStorage.setItem('tf_orders', JSON.stringify(orders));
    localStorage.setItem('tf_transactions', JSON.stringify(transactions));
    localStorage.setItem('tf_auth', JSON.stringify(auth));
  }, [services, orders, transactions, auth]);

  return (
    <AppContext.Provider value={{ 
      services, orders, transactions, auth, logs, addLog, navigate, 
      updatePrice, createOrder, setAuthStatus: setAuth, updateOrderStatus, recordTransaction 
    }}>
      <div className="min-h-screen flex flex-col font-inter selection:bg-indigo-600 selection:text-white">
        <SEOManager 
          route={route} 
          article={BLOG_ARTICLES.find(a => a.slug === route.params?.slug)} 
          service={services.find(s => s.id === route.params?.slug)}
        />
        <Header setView={navigate} currentView={route.view} />
        
        <main className="flex-grow pt-20">
          {route.view === 'home' && (
            <div className="animate-fade-in">
              <Hero setView={navigate} />
              <TrustBar />
              <HowItWorks />
              <TextAuditTool />
              <ServicesGrid 
              services={services} 
              onOrder={createOrder} 
              onExplore={(id) => navigate('service', id)}
            />
              <EnterpriseSection onNavigate={() => navigate('bulk')} />
              <ConversionQuiz onComplete={() => navigate('pricing')} />
              <CaseStudies />
              <PricingCalculator services={services} onStartOrder={createOrder} />
              <TestimonialCarousel reviews={REVIEWS} />
              <FAQ />
              <SEOSection 
                title="Лидеры рынка копирайтинга и SEO-контента"
                subtitle="Мы создаем тексты, которые не просто читают, а которые приносят прибыль вашему бизнесу."
                seoText={`
                  <p>TextFlow — это современное агентство контент-маркетинга, специализирующееся на создании высокоэффективных текстов для бизнеса. В 2025 году, когда алгоритмы поисковых систем становятся все более требовательными к качеству (E-E-A-T), мы предлагаем решения, которые гарантируют результат.</p>
                  <p><strong>Наши ключевые преимущества:</strong> Мы используем передовые технологии LSI-копирайтинга и многоуровневую систему проверки качества. Наша команда состоит из опытных редакторов, SEO-специалистов и профильных экспертов в различных нишах: от финтеха и IT до медицины и недвижимости.</p>
                  <p>Мы предлагаем полный спектр услуг: от написания экспертных статей в блог и PR-материалов для СМИ до массового наполнения карточек товаров на маркетплейсах (Wildberries, Ozon, Яндекс.Маркет). Доверьте свой контент профессионалам и наблюдайте за ростом ваших позиций в органической выдаче.</p>
                `}
                faqs={[
                  { q: 'Почему стоит выбрать именно TextFlow?', a: 'Мы не просто пишем тексты, мы решаем бизнес-задачи. Наш подход основан на данных, глубоком анализе конкурентов и использовании авторских методик SEO-оптимизации, которые работают в современных реалиях.' },
                  { q: 'Как вы контролируете качество?', a: 'Каждый текст проходит 3 этапа проверки: корректор (ошибки и опечатки), SEO-специалист (ключи и структура) и выпускающий редактор (стилистика и фактология).' }
                ]}
              />
            </div>
          )}

          {route.view === 'admin' && <AdminDashboard />}
          {route.view === 'blog' && <BlogView onArticleClick={(a) => navigate('article', a.slug)} />}
          {route.view === 'article' && <ArticlePage article={BLOG_ARTICLES.find(a => a.slug === route.params?.slug) || BLOG_ARTICLES[0]} onBack={() => navigate('blog')} onNavigateToArticle={(a) => navigate('article', a.slug)} />}
          {route.view === 'pricing' && <PricingCalculator services={services} onStartOrder={createOrder} showSEO={true} />}
          {route.view === 'cases' && <CaseStudies showSEO={true} />}
          {route.view === 'reviews' && <ReviewsPage setView={navigate} />}
          {route.view === 'service' && <ServicePage 
            service={services.find(s => s.id === route.params?.slug) || services[0]} 
            onBack={() => navigate('home')} 
            onOrder={createOrder} 
          />}
          {route.view === 'bulk' && <BulkOrderView onBack={() => navigate('home')} onConfirm={(symbols, items, price) => {
            setPendingOrderData({ serviceId: 'bulk', symbols, price });
            navigate('order');
          }} />}
          {route.view === 'order' && <OrderForm pendingOrder={pendingOrderData} onFinalize={finalizeOrder} onCancel={() => navigate('home')} />}
          {route.view === 'payment' && <PaymentGateway amount={orders.find(o => o.id === route.params?.slug)?.totalPrice || 0} orderId={route.params?.slug || ''} onSuccess={(method) => recordTransaction({
            id: 'TX-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
            orderId: route.params?.slug || '',
            amount: orders.find(o => o.id === route.params?.slug)?.totalPrice || 0,
            method,
            timestamp: new Date().toISOString(),
            status: 'success'
          })} />}
          {route.view === 'contacts' && <ContactPage />}
        </main>

        <EditorialAssistant />
        <MessengerFab />
        <LiveNotifications />
        <Footer setView={navigate} />
      </div>
    </AppContext.Provider>
  );
};

export default App;

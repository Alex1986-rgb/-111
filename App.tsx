
import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { INITIAL_SERVICES, BLOG_ARTICLES, REVIEWS } from './constants';
import { Service, View, Order, Article, SEOTask, BriefDetails } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import PricingCalculator from './components/PricingCalculator';
import AdminDashboard from './components/AdminDashboard';
import ServicesGrid from './components/ServicesGrid';
import HowItWorks from './components/HowItWorks';
import CaseStudies from './components/CaseStudies';
import OrderForm from './components/OrderForm';
import BlogView from './components/BlogView';
import ArticlePage from './components/ArticlePage';
import ReviewsPage from './components/ReviewsPage';
import ContactPage from './components/ContactPage';
import FAQ from './components/FAQ';
import TrustBar from './components/TrustBar';
import Footer from './components/Footer';
import AIHelper from './components/AIHelper';
import MessengerFab from './components/MessengerFab';
import TextAuditTool from './components/TextAuditTool';
import TestimonialCarousel from './components/TestimonialCarousel';
import BulkOrderView from './components/BulkOrderView';
import ConversionQuiz from './components/ConversionQuiz';
import LiveNotifications from './components/LiveNotifications';
import PaymentGateway from './components/PaymentGateway';

const App: React.FC = () => {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('tf_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });
  
  const [view, setView] = useState<View>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('tf_orders');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [pendingOrder, setPendingOrder] = useState<{serviceId: string, symbols: number, price: number, isBulk?: boolean, bulkItemsCount?: number, seoTasks?: SEOTask[]} | null>(null);
  const [orderToPay, setOrderToPay] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem('tf_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('tf_orders', JSON.stringify(orders));
  }, [orders]);

  const updatePrice = (id: string, newPrice: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, pricePer1k: newPrice } : s));
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const updateOrderAdminResponse = (orderId: string, response: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, adminResponse: response } : o));
  };

  const startOrder = (serviceId: string, symbols: number, price: number) => {
    setPendingOrder({ serviceId, symbols, price });
    setView('order');
  };

  const finalizeOrder = (details: { email: string, description: string, brief?: Partial<BriefDetails> }) => {
    if (!pendingOrder) return;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      serviceId: pendingOrder.serviceId as any,
      symbols: pendingOrder.symbols,
      totalPrice: pendingOrder.price,
      status: 'pending',
      paymentStatus: 'unpaid',
      clientEmail: details.email,
      description: details.description,
      brief: details.brief,
      createdAt: new Date().toISOString(),
      isBulk: pendingOrder.isBulk,
      bulkItemsCount: pendingOrder.bulkItemsCount,
      seoTasks: pendingOrder.seoTasks,
    };
    
    setOrderToPay(newOrder);
    setView('payment');
  };

  const handlePaymentSuccess = (method: 'card' | 'sbp') => {
    if (!orderToPay) return;
    const paidOrder: Order = { ...orderToPay, paymentStatus: 'paid', paymentMethod: method };
    setOrders([paidOrder, ...orders]);
    setOrderToPay(null);
    setPendingOrder(null);
    setView('home');
    alert('Заказ оплачен и передан в работу!');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      <Header setView={setView} currentView={view} />
      
      <main className="flex-grow pt-20">
        {view === 'home' && (
          <div className="animate-fade-in">
            <Hero setView={setView} />
            <TrustBar />
            <HowItWorks />
            <TextAuditTool />
            <ServicesGrid services={services} onOrder={startOrder} />
            <ConversionQuiz onComplete={() => document.getElementById('pricing-calc')?.scrollIntoView({ behavior: 'smooth' })} />
            <CaseStudies />
            <PricingCalculator services={services} onStartOrder={startOrder} />
            <TestimonialCarousel reviews={REVIEWS} />
            <FAQ />
            <AIHelper />
          </div>
        )}

        {view === 'payment' && orderToPay && (
          <div className="py-20 bg-slate-50 min-h-screen">
            <PaymentGateway 
              amount={orderToPay.totalPrice} 
              orderId={orderToPay.id} 
              onSuccess={handlePaymentSuccess} 
            />
          </div>
        )}

        {view === 'order' && <OrderForm pendingOrder={pendingOrder} onFinalize={finalizeOrder} onCancel={() => setView('home')} />}
        {view === 'admin' && <AdminDashboard services={services} updatePrice={updatePrice} orders={orders} updateOrderStatus={updateOrderStatus} updateOrderAdminResponse={updateOrderAdminResponse} />}
        {view === 'pricing' && <PricingCalculator services={services} onStartOrder={startOrder} />}
        {view === 'blog' && <BlogView onArticleClick={(a) => { setSelectedArticle(a); setView('article'); }} />}
        {view === 'article' && selectedArticle && <ArticlePage article={selectedArticle} onBack={() => setView('blog')} onNavigateToArticle={(a) => setSelectedArticle(a)} />}
        {view === 'cases' && <CaseStudies />}
        {view === 'reviews' && <ReviewsPage setView={setView} />}
        {view === 'contacts' && <ContactPage />}
      </main>

      <MessengerFab />
      <LiveNotifications />
      <Footer setView={setView} />
    </div>
  );
};

export default App;

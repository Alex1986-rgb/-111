
export type ServiceId = 'blog' | 'seo' | 'social' | 'product' | 'technical' | 'ad' | 'bulk' | 'autofill' | 'custom';

export interface Service {
  id: ServiceId;
  name: string;
  pricePer1k: number;
  description: string;
  icon: string;
}

export interface BriefDetails {
  email: string;
  description: string;
  toneOfVoice: 'expert' | 'friendly' | 'aggressive' | 'minimalist';
  targetAudience: string;
  keywords: string;
}

export interface SEOTask {
  id: string;
  url: string;
  keyword: string;
  targetLength: number;
  status: 'pending' | 'writing' | 'seo_audit' | 'published';
  content?: string;
}

export interface Order {
  id: string;
  serviceId: ServiceId;
  symbols: number;
  totalPrice: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'processing';
  paymentMethod?: 'card' | 'sbp' | 'invoice';
  adminResponse?: string;
  clientEmail: string;
  description: string;
  brief?: Partial<BriefDetails>;
  createdAt: string;
  isBulk?: boolean;
  bulkItemsCount?: number;
  seoTasks?: SEOTask[];
  apiKey?: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down';
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: CaseStudyMetric[];
  resultsDetail: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
  image: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  date: string;
  image: string;
  imageAlt: string;
  readingTime: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  expertQuote?: string;
  checklist?: string[];
  faq?: { q: string, a: string }[];
  sources?: string[];
}

export interface Review {
  id: string;
  author: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

export type View = 'home' | 'pricing' | 'admin' | 'order' | 'payment' | 'cases' | 'blog' | 'article' | 'reviews' | 'contacts' | 'bulk_order' | 'connector';

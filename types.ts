
export type ServiceId = 'blog' | 'seo' | 'social' | 'product' | 'technical' | 'ad' | 'bulk' | 'autofill' | 'custom';

export interface Service {
  id: ServiceId;
  name: string;
  pricePer1k: number;
  description: string;
  icon: string;
}

export interface OrderItem {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: string;
}

export interface Order {
  id: string;
  serviceId: ServiceId;
  symbols: number;
  totalPrice: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'processing';
  paymentMethod?: 'card' | 'sbp' | 'invoice';
  clientEmail: string;
  description: string;
  createdAt: string;
  isBulk?: boolean;
  items?: OrderItem[];
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  method: 'card' | 'sbp' | 'invoice';
  timestamp: string;
  status: 'success' | 'failed';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  image: string;
  imageAlt: string;
  readingTime: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export type ViewId = 'home' | 'pricing' | 'admin' | 'order' | 'payment' | 'cases' | 'blog' | 'article' | 'reviews' | 'contacts';
export type View = ViewId;

export interface Route {
  view: ViewId;
  params?: Record<string, string>;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: 'admin' | 'user' | null;
}

export interface SystemLog {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
}

// Added CaseStudy interface to resolve errors in constants.ts and CaseStudies.tsx
export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  description: string;
  resultsDetail: string;
  metrics: { label: string; value: string; trend: 'up' | 'down' }[];
  quote: { text: string; author: string; role: string };
  image: string;
}

// Added Review interface to resolve errors in constants.ts and TestimonialCarousel.tsx
export interface Review {
  id: string;
  author: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

// Added BriefDetails interface to resolve error in OrderForm.tsx
export interface BriefDetails {
  toneOfVoice: 'expert' | 'friendly' | 'aggressive' | 'minimalist';
  targetAudience: string;
  keywords: string;
}

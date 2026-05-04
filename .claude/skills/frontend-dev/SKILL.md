---
name: frontend-dev
description: Frontend разработчик - React компоненты, стилизация, интеграция с API
version: 1.0.0
model: kr/claude-haiku-4.5
---

# Frontend Developer - React/TypeScript разработчик

Специалист по созданию пользовательских интерфейсов на React.

## Использование

```bash
/frontend-dev <задача>
```

## Примеры

```bash
# Создать компонент
/frontend-dev "Создать компонент для отображения статистики аудита"

# Добавить стили
/frontend-dev "Улучшить стили формы заказа"

# Интеграция с API
/frontend-dev "Подключить компонент к API endpoint /api/stats"

# Responsive design
/frontend-dev "Сделать таблицу адаптивной для мобильных"
```

## Обязанности

### 1. Создание компонентов
- React functional components
- TypeScript типизация
- Props validation
- State management

### 2. Стилизация
- Tailwind CSS
- Responsive design
- Animations
- Theme system

### 3. Интеграция с API
- Fetch/Axios
- React Query
- Error handling
- Loading states

### 4. Accessibility
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management

## Стек технологий

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool

### Styling
- **Tailwind CSS 4** - Utility-first CSS
- **Lucide React** - Icons

### Data Fetching
- **React Query** - Server state
- **Axios** - HTTP client

### State Management
- **React Context** - Global state
- **useState/useReducer** - Local state

## Процесс создания компонента

### Шаг 1: Типизация
```typescript
interface StatsCardProps {
  title: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}
```

### Шаг 2: Компонент
```typescript
const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, icon: Icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {trend === 'up' && (
          <span className="text-green-600 text-sm">↗ +12%</span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
```

### Шаг 3: Использование
```typescript
<StatsCard
  title="Total Audits"
  value={1234}
  trend="up"
  icon={TrendingUp}
/>
```

## Best Practices

### 1. Component Composition
```typescript
// ✅ Хорошо: Маленькие переиспользуемые компоненты
const Button = ({ children, onClick, variant = 'primary' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg ${
      variant === 'primary' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
    }`}
  >
    {children}
  </button>
);

// ❌ Плохо: Монолитный компонент
const Form = () => {
  // 300 строк кода
};
```

### 2. Custom Hooks
```typescript
// Выносим логику в hook
const useAuditStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats().then(setStats).finally(() => setLoading(false));
  }, []);

  return { stats, loading };
};

// Использование
const Dashboard = () => {
  const { stats, loading } = useAuditStats();
  
  if (loading) return <Spinner />;
  return <StatsGrid stats={stats} />;
};
```

### 3. Мемоизация
```typescript
// Мемоизация дорогих вычислений
const processedData = useMemo(() => {
  return data.map(item => ({
    ...item,
    score: calculateScore(item)
  }));
}, [data]);

// Мемоизация компонентов
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* ... */}</div>;
});
```

### 4. Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## Tailwind CSS Patterns

### Layout
```tsx
// Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Flex
<div className="flex items-center justify-between">
```

### Responsive
```tsx
// Mobile first
<div className="text-sm md:text-base lg:text-lg">

// Hidden on mobile
<div className="hidden md:block">

// Different layout
<div className="flex-col md:flex-row">
```

### States
```tsx
// Hover
<button className="hover:bg-indigo-700 transition">

// Focus
<input className="focus:ring-2 focus:ring-indigo-500">

// Disabled
<button className="disabled:opacity-50 disabled:cursor-not-allowed">
```

## API Integration

### React Query
```typescript
// Fetch data
const { data, isLoading, error } = useQuery({
  queryKey: ['audits'],
  queryFn: fetchAudits,
  staleTime: 5 * 60 * 1000
});

// Mutation
const mutation = useMutation({
  mutationFn: createAudit,
  onSuccess: () => {
    queryClient.invalidateQueries(['audits']);
  }
});
```

### Error Handling
```typescript
if (error) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-red-800">Error: {error.message}</p>
    </div>
  );
}
```

### Loading States
```typescript
if (isLoading) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
    </div>
  );
}
```

## Accessibility

### ARIA Attributes
```tsx
<button
  aria-label="Close modal"
  aria-pressed={isOpen}
  role="button"
>
  <X className="w-5 h-5" />
</button>
```

### Keyboard Navigation
```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    onClick();
  }
};

<div
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={onClick}
>
```

### Focus Management
```tsx
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

<input ref={inputRef} />
```

## Performance Optimization

### Code Splitting
```typescript
// Lazy loading
const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
```

### Image Optimization
```tsx
<img
  src="/image.jpg"
  alt="Description"
  loading="lazy"
  width={800}
  height={600}
/>
```

### Debouncing
```typescript
const debouncedSearch = useMemo(
  () => debounce((value: string) => {
    performSearch(value);
  }, 300),
  []
);
```

## Testing

### Component Tests
```typescript
import { render, screen } from '@testing-library/react';

test('renders stats card', () => {
  render(<StatsCard title="Test" value={100} trend="up" icon={TrendingUp} />);
  
  expect(screen.getByText('Test')).toBeInTheDocument();
  expect(screen.getByText('100')).toBeInTheDocument();
});
```

### User Interactions
```typescript
import { fireEvent } from '@testing-library/react';

test('button click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalled();
});
```

## Checklist

### Перед коммитом
- [ ] TypeScript ошибок нет
- [ ] Компонент работает на всех разрешениях
- [ ] Accessibility проверена
- [ ] Loading и error states добавлены
- [ ] Код отформатирован (Prettier)
- [ ] Нет console.log
- [ ] Props типизированы
- [ ] Тесты написаны

---

*Скил создан: 4 мая 2026*  
*Роль: Frontend Developer*  
*Модель: Haiku 4.5*

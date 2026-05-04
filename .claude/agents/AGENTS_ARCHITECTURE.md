# 🤖 Архитектура агентов для TextFlow

## Распределение моделей по задачам

### 🎯 Sonnet 4.5 (kr/claude-sonnet-4.5) - Сложные задачи
**Когда использовать:** Архитектурные решения, сложная логика, интеграции

**Задачи:**
- Разработка новых компонентов с бизнес-логикой
- Интеграция с внешними API (Gemini, платежи)
- Рефакторинг архитектуры
- Написание сложных алгоритмов (SEO-анализ, краулинг)
- Code review критичных модулей
- Security audit

**Примерная стоимость:** ~$3 за 1M input tokens

---

### ⚡ Haiku 4.5 (kr/claude-haiku-4.5) - Быстрые операции
**Когда использовать:** Рутинные задачи, простые правки, документация

**Задачи:**
- Исправление багов (простых)
- Обновление стилей (CSS/Tailwind)
- Генерация документации
- Написание тестов
- Форматирование кода
- Простые CRUD операции
- Валидация форм

**Примерная стоимость:** ~$0.25 за 1M input tokens (в 12 раз дешевле!)

---

## 🎭 Система агентов

### 1. **Master Agent** (Sonnet 4.5)
**Роль:** Координатор, принимает решения о делегировании

**Обязанности:**
- Анализ задачи и выбор подходящего агента
- Распределение работы между субагентами
- Контроль качества результатов
- Интеграция результатов от разных агентов

**Пример:**
```typescript
interface TaskDistribution {
  task: string;
  complexity: 'simple' | 'medium' | 'complex';
  assignedAgent: 'haiku' | 'sonnet';
  estimatedCost: number;
}

function distributeTask(task: string): TaskDistribution {
  // Анализ сложности
  if (isArchitectural(task) || isSecurityCritical(task)) {
    return { task, complexity: 'complex', assignedAgent: 'sonnet', estimatedCost: 0.003 };
  }
  return { task, complexity: 'simple', assignedAgent: 'haiku', estimatedCost: 0.00025 };
}
```

---

### 2. **SEO Superpower Agent** (Sonnet 4.5)
**Роль:** Комплексный SEO-анализ сайтов

**Модули:**
- ✅ Performance Analyzer
- ✅ SEO Combinator
- ✅ Code Review
- ✅ Security Review
- ✅ Frontend Design
- ✅ Memory Profile

**Входные данные:**
```typescript
interface SEOAuditInput {
  url: string;
  maxPages: number;
  depth: number;
  modules: ('performance' | 'seo' | 'code' | 'security' | 'design' | 'memory')[];
}
```

**Выходные данные:**
```typescript
interface SuperpowerResult {
  performance: {
    performance_score: number;
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
    issues: string[];
  };
  seo_combinator: {
    seo_combinator_score: number;
    missing_titles: string[];
    duplicate_content: string[];
    broken_links: string[];
    recommendations: string[];
  };
  code_review: {
    code_quality_score: number;
    html_issues: string[];
    css_issues: string[];
    js_issues: string[];
    best_practices: string[];
  };
  security_review: {
    security_score: number;
    vulnerabilities: string[];
    https_status: boolean;
    headers: Record<string, string>;
  };
  frontend_design: {
    design_score: number;
    accessibility_score: number;
    mobile_friendly: boolean;
    ui_issues: string[];
  };
  memory_profile: {
    memory_efficiency_score: number;
    dom_size: number;
    resource_count: number;
    optimization_tips: string[];
  };
}
```

---

### 3. **Content Generator Agent** (Haiku 4.5 для простых, Sonnet 4.5 для сложных)
**Роль:** Массовая генерация контента

**Распределение:**
- **Haiku:** Простые описания товаров (шаблонные)
- **Sonnet:** Экспертные статьи, уникальный контент

**Пример:**
```typescript
async function generateContent(type: 'simple' | 'expert', data: any) {
  if (type === 'simple') {
    // Используем Haiku для экономии
    return await haikuAgent.generate({
      template: 'product_description',
      data: data
    });
  } else {
    // Используем Sonnet для качества
    return await sonnetAgent.generate({
      template: 'expert_article',
      data: data,
      tone: 'professional'
    });
  }
}
```

---

### 4. **Code Reviewer Agent** (Sonnet 4.5)
**Роль:** Проверка качества кода

**Проверки:**
- Архитектурные паттерны
- Безопасность (XSS, SQL injection, CSRF)
- Производительность
- Читаемость и maintainability
- TypeScript типизация
- React best practices

**Выход:**
```typescript
interface CodeReviewResult {
  score: number; // 0-100
  issues: {
    severity: 'critical' | 'high' | 'medium' | 'low';
    type: 'security' | 'performance' | 'maintainability' | 'style';
    file: string;
    line: number;
    message: string;
    suggestion: string;
  }[];
  summary: string;
}
```

---

### 5. **Security Scanner Agent** (Sonnet 4.5)
**Роль:** Поиск уязвимостей

**Проверки:**
- OWASP Top 10
- Dependency vulnerabilities (npm audit)
- API security
- Authentication/Authorization
- Data validation
- HTTPS/SSL
- Security headers

---

### 6. **Frontend Design Agent** (Haiku 4.5)
**Роль:** Анализ UI/UX

**Проверки:**
- Accessibility (WCAG 2.1)
- Mobile responsiveness
- Color contrast
- Typography
- Layout consistency
- Loading states
- Error handling UI

---

### 7. **Performance Optimizer Agent** (Sonnet 4.5)
**Роль:** Оптимизация производительности

**Задачи:**
- Bundle size analysis
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Database query optimization

---

## 🛠️ Скилы (Skills)

### Skill 1: `/seo-audit-full`
**Модель:** Sonnet 4.5
**Описание:** Полный SEO-аудит с всеми модулями Superpower

**Использование:**
```bash
/seo-audit-full https://example.com --max-pages 1000
```

**Что делает:**
1. Краулинг сайта (Puppeteer)
2. Анализ всех 6 модулей
3. Генерация отчета
4. Создание файлов с исправлениями (CSV, JSON, XLSX)

---

### Skill 2: `/content-bulk-generate`
**Модель:** Haiku 4.5 (массовые) / Sonnet 4.5 (экспертные)
**Описание:** Массовая генерация контента

**Использование:**
```bash
/content-bulk-generate products.csv --type simple --count 1000
```

**Что делает:**
1. Импорт CSV
2. Генерация описаний (параллельно)
3. SEO-оптимизация
4. Экспорт в нужном формате

---

### Skill 3: `/code-review-security`
**Модель:** Sonnet 4.5
**Описание:** Code review + Security audit

**Использование:**
```bash
/code-review-security ./src --focus security
```

**Что делает:**
1. Анализ всех файлов
2. Поиск уязвимостей
3. Проверка best practices
4. Генерация отчета с приоритетами

---

### Skill 4: `/design-audit`
**Модель:** Haiku 4.5
**Описание:** Анализ UI/UX и accessibility

**Использование:**
```bash
/design-audit http://localhost:3000
```

**Что делает:**
1. Проверка accessibility
2. Mobile responsiveness
3. Color contrast
4. Typography
5. Генерация рекомендаций

---

### Skill 5: `/performance-optimize`
**Модель:** Sonnet 4.5
**Описание:** Оптимизация производительности

**Использование:**
```bash
/performance-optimize --target lighthouse-100
```

**Что делает:**
1. Lighthouse audit
2. Bundle analysis
3. Автоматические оптимизации
4. Генерация оптимизированного кода

---

## 📊 Экономия бюджета

### Пример распределения задач (1000 операций):

| Задача | Модель | Количество | Стоимость |
|--------|--------|------------|-----------|
| Простые описания товаров | Haiku | 800 | $0.20 |
| Экспертные статьи | Sonnet | 50 | $0.15 |
| Code review | Sonnet | 100 | $0.30 |
| Design audit | Haiku | 50 | $0.01 |
| **ИТОГО** | - | **1000** | **$0.66** |

**Если бы все на Sonnet:** $3.00
**Экономия:** 78% 💰

---

## 🔄 Workflow интеграции

### Этап 1: Создание агентов
```bash
# Создать директорию для агентов
mkdir -p .claude/agents

# Создать конфигурацию
cat > .claude/agents/config.json << EOF
{
  "agents": {
    "master": { "model": "kr/claude-sonnet-4.5" },
    "seo": { "model": "kr/claude-sonnet-4.5" },
    "content-simple": { "model": "kr/claude-haiku-4.5" },
    "content-expert": { "model": "kr/claude-sonnet-4.5" },
    "code-reviewer": { "model": "kr/claude-sonnet-4.5" },
    "security": { "model": "kr/claude-sonnet-4.5" },
    "design": { "model": "kr/claude-haiku-4.5" },
    "performance": { "model": "kr/claude-sonnet-4.5" }
  }
}
EOF
```

### Этап 2: Создание скилов
```bash
# Создать директорию для скилов
mkdir -p ~/.claude/skills/textflow-suite

# Скопировать скилы
cp -r .claude/skills/* ~/.claude/skills/textflow-suite/
```

### Этап 3: Интеграция в проект
```typescript
// src/services/AgentOrchestrator.ts
export class AgentOrchestrator {
  async executeTask(task: Task): Promise<Result> {
    const agent = this.selectAgent(task);
    return await agent.execute(task);
  }
  
  private selectAgent(task: Task): Agent {
    if (task.complexity === 'high') return this.sonnetAgent;
    return this.haikuAgent;
  }
}
```

---

## 🎯 Приоритеты внедрения

### Неделя 1: Базовая инфраструктура
- [ ] Создать систему агентов
- [ ] Настроить распределение по моделям
- [ ] Создать базовые скилы

### Неделя 2: SEO Superpower
- [ ] Интегрировать Performance модуль
- [ ] Интегрировать SEO Combinator
- [ ] Интегрировать Code Review
- [ ] Интегрировать Security Review

### Неделя 3: Frontend & Memory
- [ ] Интегрировать Frontend Design
- [ ] Интегрировать Memory Profile
- [ ] Создать единый дашборд

### Неделя 4: Автоматизация
- [ ] Настроить CI/CD с агентами
- [ ] Автоматический code review на PR
- [ ] Автоматический security scan

---

*Документ создан: 4 мая 2026*
*Для проекта: TextFlow - AI-Powered Development*

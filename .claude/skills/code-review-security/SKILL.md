---
name: code-review-security
description: Комплексная проверка кода на качество, безопасность и best practices
version: 1.0.0
model: kr/claude-sonnet-4.5
---

# Code Review & Security - Проверка кода и безопасности

Автоматический анализ кода на качество, архитектуру, безопасность и производительность.

## Использование

```bash
/code-review-security <path> [options]
```

## Опции

- `--focus <area>` - Фокус проверки: security, performance, architecture, style (по умолчанию: all)
- `--severity <level>` - Минимальный уровень: critical, high, medium, low (по умолчанию: medium)
- `--fix` - Автоматически исправить простые проблемы
- `--report <format>` - Формат отчета: json, html, markdown (по умолчанию: markdown)

## Примеры

```bash
# Полная проверка проекта
/code-review-security ./src

# Только проблемы безопасности
/code-review-security ./src --focus security --severity high

# С автоматическим исправлением
/code-review-security ./src --fix

# Генерация HTML отчета
/code-review-security ./src --report html
```

## Проверки

### 1. Security (Безопасность)
- ✅ XSS vulnerabilities
- ✅ SQL injection
- ✅ CSRF protection
- ✅ Authentication/Authorization
- ✅ Sensitive data exposure
- ✅ Insecure dependencies
- ✅ API security
- ✅ Input validation

### 2. Code Quality (Качество кода)
- ✅ TypeScript strict mode
- ✅ Unused variables/imports
- ✅ Code duplication
- ✅ Cyclomatic complexity
- ✅ Function length
- ✅ Naming conventions
- ✅ Comments quality

### 3. Performance (Производительность)
- ✅ Unnecessary re-renders (React)
- ✅ Memory leaks
- ✅ Large bundle size
- ✅ Inefficient algorithms
- ✅ Database query optimization
- ✅ N+1 queries

### 4. Architecture (Архитектура)
- ✅ SOLID principles
- ✅ Design patterns
- ✅ Separation of concerns
- ✅ Dependency injection
- ✅ Module coupling
- ✅ Code organization

### 5. React Best Practices
- ✅ Hooks rules
- ✅ Component composition
- ✅ Props drilling
- ✅ State management
- ✅ Error boundaries
- ✅ Accessibility

## Выходные данные

### Markdown отчет
```markdown
# Code Review Report

## Summary
- Total files: 45
- Total issues: 23
- Critical: 2
- High: 8
- Medium: 10
- Low: 3

## Critical Issues

### 1. SQL Injection vulnerability
**File:** `src/api/users.ts:45`
**Severity:** Critical
**Type:** Security

```typescript
// ❌ Vulnerable code
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Fixed code
const query = `SELECT * FROM users WHERE id = ?`;
db.query(query, [userId]);
```

**Recommendation:** Use parameterized queries to prevent SQL injection.
```

### JSON отчет
```json
{
  "summary": {
    "total_files": 45,
    "total_issues": 23,
    "by_severity": {
      "critical": 2,
      "high": 8,
      "medium": 10,
      "low": 3
    }
  },
  "issues": [
    {
      "id": "SEC-001",
      "severity": "critical",
      "type": "security",
      "category": "sql_injection",
      "file": "src/api/users.ts",
      "line": 45,
      "message": "SQL Injection vulnerability detected",
      "code_snippet": "const query = `SELECT * FROM users WHERE id = ${userId}`;",
      "recommendation": "Use parameterized queries",
      "fix": "const query = `SELECT * FROM users WHERE id = ?`;\ndb.query(query, [userId]);"
    }
  ]
}
```

## Автоматические исправления

### Что исправляется автоматически (--fix)
- ✅ Unused imports
- ✅ Missing semicolons
- ✅ Formatting issues
- ✅ Simple type errors
- ✅ Console.log statements
- ✅ Deprecated API usage

### Что требует ручного исправления
- ❌ Security vulnerabilities
- ❌ Architecture issues
- ❌ Complex refactoring
- ❌ Business logic bugs

## Интеграция с CI/CD

### GitHub Actions
```yaml
name: Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Code Review
        run: |
          claude /code-review-security ./src --severity high
      - name: Comment PR
        uses: actions/github-script@v6
        with:
          script: |
            const report = require('./code-review-report.json');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              body: `## Code Review Results\n\nFound ${report.summary.total_issues} issues`
            });
```

### Pre-commit Hook
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running code review..."
claude /code-review-security ./src --severity critical

if [ $? -ne 0 ]; then
  echo "❌ Critical issues found. Commit blocked."
  exit 1
fi

echo "✅ Code review passed"
```

## Примеры найденных проблем

### Security Issue
```typescript
// ❌ BAD: XSS vulnerability
function renderHTML(userInput: string) {
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
}

// ✅ GOOD: Sanitized input
import DOMPurify from 'dompurify';

function renderHTML(userInput: string) {
  const clean = DOMPurify.sanitize(userInput);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

### Performance Issue
```typescript
// ❌ BAD: Unnecessary re-renders
function UserList({ users }) {
  return users.map(user => <UserCard key={Math.random()} user={user} />);
}

// ✅ GOOD: Stable keys
function UserList({ users }) {
  return users.map(user => <UserCard key={user.id} user={user} />);
}
```

### Architecture Issue
```typescript
// ❌ BAD: Tight coupling
class OrderService {
  processOrder(order: Order) {
    const db = new Database();
    const email = new EmailService();
    // ...
  }
}

// ✅ GOOD: Dependency injection
class OrderService {
  constructor(
    private db: IDatabase,
    private email: IEmailService
  ) {}
  
  processOrder(order: Order) {
    // ...
  }
}
```

## Стоимость

- **Модель:** Sonnet 4.5
- **Средний проект (50 файлов):** ~$0.15
- **Большой проект (500 файлов):** ~$1.50

## Roadmap

- [ ] Интеграция с ESLint/TSLint
- [ ] Кастомные правила проверки
- [ ] AI-powered рефакторинг
- [ ] Сравнение с best practices
- [ ] Обучение на вашем кодстайле

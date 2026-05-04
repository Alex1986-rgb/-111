---
name: seo-audit-full
description: Полный SEO-аудит сайта с модулями Superpower (Performance, SEO, Code, Security, Design, Memory)
version: 1.0.0
model: kr/claude-sonnet-4.5
---

# SEO Audit Full - Комплексный анализ сайта

Этот скил выполняет полный SEO-аудит сайта с использованием 6 модулей анализа.

## Использование

```bash
/seo-audit-full <url> [options]
```

## Опции

- `--max-pages <number>` - Максимальное количество страниц для анализа (по умолчанию: 100)
- `--depth <number>` - Глубина краулинга (по умолчанию: 3)
- `--modules <list>` - Модули для анализа (по умолчанию: все)
- `--export <format>` - Формат экспорта: csv, json, xlsx, sql (по умолчанию: json)
- `--output <path>` - Путь для сохранения результатов

## Примеры

```bash
# Базовый аудит
/seo-audit-full https://example.com

# Полный аудит с экспортом
/seo-audit-full https://example.com --max-pages 1000 --export csv,json,xlsx

# Только Performance и SEO
/seo-audit-full https://example.com --modules performance,seo

# С указанием пути
/seo-audit-full https://example.com --output ./audit-results/
```

## Модули анализа

### 1. Performance (Производительность)
- Core Web Vitals (LCP, FID, CLS)
- Lighthouse Score
- TTFB (Time to First Byte)
- Resource loading times
- Bundle size analysis

### 2. SEO Combinator (SEO-оптимизация)
- Meta tags (title, description)
- Heading structure (H1-H6)
- Content quality
- Internal linking
- Schema.org markup
- Canonical URLs
- Sitemap & robots.txt

### 3. Code Review (Качество кода)
- HTML validation
- CSS best practices
- JavaScript errors
- TypeScript types
- React patterns
- Code duplication

### 4. Security Review (Безопасность)
- HTTPS status
- Security headers
- OWASP Top 10
- Dependency vulnerabilities
- XSS/CSRF protection
- API security

### 5. Frontend Design (Дизайн)
- Accessibility (WCAG 2.1)
- Mobile responsiveness
- Color contrast
- Typography
- UI consistency
- Loading states

### 6. Memory Profile (Память)
- DOM size
- Resource count
- Memory leaks
- Optimization opportunities

## Выходные данные

### JSON формат
```json
{
  "audit_id": "audit_20260504_123456",
  "url": "https://example.com",
  "timestamp": "2026-05-04T12:34:56Z",
  "total_pages": 150,
  "total_issues": 234,
  "modules": {
    "performance": {
      "score": 85,
      "lcp": 2.1,
      "fid": 45,
      "cls": 0.05,
      "issues": [...]
    },
    "seo_combinator": {
      "score": 78,
      "missing_titles": [...],
      "recommendations": [...]
    },
    ...
  }
}
```

### CSV формат (для импорта)
```csv
URL,Issue Type,Priority,Current Value,Recommended Value,Module
https://example.com/page1,missing_title,critical,"","Product X | Shop",seo
https://example.com/page2,slow_lcp,high,4.5s,<2.5s,performance
```

## Интеграция с проектом

Скил автоматически создает файлы в директории проекта:

```
/audit-results/
  ├── audit_YYYYMMDD_HHMMSS.json      # Полный отчет
  ├── fixes.csv                        # Исправления для импорта
  ├── fixes.xlsx                       # Excel файл
  ├── fixes.sql                        # SQL скрипты
  └── report.html                      # Визуальный отчет
```

## Технические детали

### Используемые инструменты
- Puppeteer - для краулинга
- Lighthouse - для Performance
- Cheerio - для парсинга HTML
- axe-core - для Accessibility
- ESLint/TSLint - для Code Review

### Производительность
- Параллельная обработка страниц (до 10 одновременно)
- Кэширование результатов
- Инкрементальный анализ (только измененные страницы)

### Стоимость
- Модель: Sonnet 4.5
- Примерная стоимость: $0.003 за 1000 токенов
- Средний аудит (100 страниц): ~$0.30

## Автоматизация

### GitHub Actions
```yaml
name: SEO Audit
on:
  schedule:
    - cron: '0 0 * * 0'  # Каждое воскресенье
  workflow_dispatch:

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run SEO Audit
        run: |
          claude /seo-audit-full https://mysite.com --export json
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: seo-audit-results
          path: audit-results/
```

## Troubleshooting

### Проблема: Timeout при краулинге
**Решение:** Уменьшите `--max-pages` или увеличьте `--timeout`

### Проблема: Недостаточно памяти
**Решение:** Используйте `--batch-size` для обработки меньшими порциями

### Проблема: Блокировка ботов
**Решение:** Добавьте `--user-agent` и `--delay` между запросами

## Roadmap

- [ ] Интеграция с Google Search Console
- [ ] Сравнение с конкурентами
- [ ] AI-рекомендации по улучшению
- [ ] Автоматическое применение исправлений
- [ ] Мониторинг изменений во времени

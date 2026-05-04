---
name: design-audit
description: Анализ UI/UX, accessibility и mobile-friendly с использованием Haiku для быстрой проверки
version: 1.0.0
model: kr/claude-haiku-4.5
---

# Design Audit - Анализ дизайна и UX

Быстрая проверка UI/UX, accessibility (WCAG 2.1), mobile responsiveness и визуального дизайна.

## Использование

```bash
/design-audit <url> [options]
```

## Опции

- `--checks <list>` - Типы проверок: accessibility, responsive, contrast, typography (по умолчанию: all)
- `--wcag-level <level>` - Уровень WCAG: A, AA, AAA (по умолчанию: AA)
- `--devices <list>` - Устройства для проверки: mobile, tablet, desktop (по умолчанию: all)
- `--report <format>` - Формат отчета: json, html, pdf (по умолчанию: html)

## Примеры

```bash
# Полная проверка дизайна
/design-audit http://localhost:3000

# Только accessibility
/design-audit http://localhost:3000 --checks accessibility --wcag-level AAA

# Проверка на мобильных
/design-audit http://localhost:3000 --devices mobile,tablet

# С PDF отчетом
/design-audit http://localhost:3000 --report pdf
```

## Проверки

### 1. Accessibility (Доступность)
- ✅ WCAG 2.1 compliance
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA attributes
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ Form labels
- ✅ Semantic HTML

### 2. Responsive Design
- ✅ Mobile viewport
- ✅ Tablet viewport
- ✅ Desktop viewport
- ✅ Touch targets (min 44x44px)
- ✅ Text readability
- ✅ Image scaling
- ✅ Layout breakpoints

### 3. Color Contrast
- ✅ Text contrast ratio (WCAG AA: 4.5:1)
- ✅ Large text contrast (WCAG AA: 3:1)
- ✅ UI components contrast
- ✅ Focus indicators contrast
- ✅ Color blindness simulation

### 4. Typography
- ✅ Font sizes (min 16px for body)
- ✅ Line height (1.5 for body)
- ✅ Line length (45-75 characters)
- ✅ Font weights
- ✅ Heading hierarchy
- ✅ Text spacing

### 5. UI Consistency
- ✅ Button styles
- ✅ Form elements
- ✅ Icons
- ✅ Spacing system
- ✅ Color palette
- ✅ Border radius

### 6. Loading States
- ✅ Skeleton screens
- ✅ Spinners
- ✅ Progress indicators
- ✅ Error states
- ✅ Empty states

## Выходные данные

### HTML отчет
```html
<!DOCTYPE html>
<html>
<head>
  <title>Design Audit Report</title>
</head>
<body>
  <h1>Design Audit Report</h1>
  
  <section class="summary">
    <h2>Summary</h2>
    <div class="score">
      <span class="label">Overall Score:</span>
      <span class="value">85/100</span>
    </div>
    <ul>
      <li>Accessibility: 92/100 ✅</li>
      <li>Responsive: 88/100 ✅</li>
      <li>Contrast: 75/100 ⚠️</li>
      <li>Typography: 90/100 ✅</li>
    </ul>
  </section>
  
  <section class="issues">
    <h2>Issues Found</h2>
    
    <div class="issue critical">
      <h3>Low contrast ratio</h3>
      <p><strong>Element:</strong> .btn-secondary</p>
      <p><strong>Current:</strong> 3.2:1</p>
      <p><strong>Required:</strong> 4.5:1 (WCAG AA)</p>
      <p><strong>Fix:</strong> Darken text color to #333333</p>
    </div>
  </section>
</body>
</html>
```

### JSON отчет
```json
{
  "url": "http://localhost:3000",
  "timestamp": "2026-05-04T12:00:00Z",
  "overall_score": 85,
  "scores": {
    "accessibility": 92,
    "responsive": 88,
    "contrast": 75,
    "typography": 90,
    "consistency": 82
  },
  "issues": [
    {
      "id": "CONTRAST-001",
      "severity": "high",
      "category": "contrast",
      "element": ".btn-secondary",
      "message": "Text contrast ratio too low",
      "current_value": "3.2:1",
      "required_value": "4.5:1",
      "fix": "Change text color to #333333",
      "wcag_level": "AA"
    }
  ],
  "devices": {
    "mobile": {
      "score": 85,
      "issues": ["Touch targets too small on .nav-link"]
    },
    "tablet": {
      "score": 90,
      "issues": []
    },
    "desktop": {
      "score": 95,
      "issues": []
    }
  }
}
```

## Автоматические исправления

### CSS фиксы
```css
/* ❌ Before: Low contrast */
.btn-secondary {
  background: #f0f0f0;
  color: #999999; /* 3.2:1 */
}

/* ✅ After: WCAG AA compliant */
.btn-secondary {
  background: #f0f0f0;
  color: #333333; /* 4.8:1 */
}

/* ❌ Before: Small touch targets */
.nav-link {
  padding: 8px 12px; /* 32px height */
}

/* ✅ After: Accessible touch targets */
.nav-link {
  padding: 12px 16px; /* 48px height */
}

/* ❌ Before: Poor line height */
p {
  line-height: 1.2;
}

/* ✅ After: Readable line height */
p {
  line-height: 1.6;
}
```

## Визуализация проблем

### Скриншоты с аннотациями
```
/design-audit-results/
  ├── screenshots/
  │   ├── desktop-annotated.png      # С отметками проблем
  │   ├── mobile-annotated.png
  │   └── tablet-annotated.png
  ├── contrast-map.png               # Карта контрастности
  ├── touch-targets.png              # Визуализация touch targets
  └── report.html                    # Интерактивный отчет
```

## Интеграция с Figma

### Экспорт рекомендаций в Figma
```bash
/design-audit http://localhost:3000 --export-figma

# Создает файл для импорта в Figma:
# - Цветовая палитра
# - Типографика
# - Spacing system
# - Component library
```

## Accessibility Testing

### Keyboard Navigation
```
✅ Tab order is logical
✅ All interactive elements are focusable
✅ Focus indicators are visible
⚠️ Skip to main content link missing
❌ Modal trap not implemented
```

### Screen Reader
```
✅ All images have alt text
✅ Form inputs have labels
✅ ARIA landmarks present
⚠️ Some buttons lack aria-label
❌ Live regions not announced
```

### Color Blindness Simulation
```
Protanopia (Red-blind):
  ✅ Information not conveyed by color alone
  ✅ Links distinguishable from text

Deuteranopia (Green-blind):
  ✅ Success/error states have icons
  ⚠️ Chart colors may be confusing

Tritanopia (Blue-blind):
  ✅ All UI elements distinguishable
```

## Mobile Responsiveness

### Viewport Tests
```
iPhone SE (375x667):
  ✅ Layout adapts correctly
  ⚠️ Some text too small (14px)
  
iPad (768x1024):
  ✅ Perfect layout
  ✅ Touch targets adequate
  
Desktop (1920x1080):
  ✅ Optimal layout
  ✅ No horizontal scroll
```

## Performance Impact

### Модель: Haiku 4.5
- **Стоимость:** ~$0.00025 за 1000 токенов
- **Средний сайт:** ~$0.01
- **Скорость:** ~30 секунд

### Сравнение с ручной проверкой
- **Ручная проверка:** 2-4 часа
- **Автоматическая:** 30 секунд
- **Экономия времени:** 99%

## CI/CD Integration

### GitHub Actions
```yaml
name: Design Audit
on: [pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Start dev server
        run: npm run dev &
      - name: Wait for server
        run: sleep 10
      - name: Run Design Audit
        run: |
          claude /design-audit http://localhost:3000 --report json
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: design-audit
          path: design-audit-results/
```

## Примеры найденных проблем

### Проблема 1: Низкий контраст
```
Element: .text-muted
Current: #999999 on #ffffff (2.8:1)
Required: 4.5:1 (WCAG AA)
Fix: Use #666666 (5.7:1)
```

### Проблема 2: Маленькие touch targets
```
Element: .close-button
Current: 24x24px
Required: 44x44px (iOS HIG)
Fix: Increase padding or size
```

### Проблема 3: Отсутствие alt-текста
```
Element: <img src="product.jpg">
Issue: Missing alt attribute
Fix: <img src="product.jpg" alt="Product name">
```

## Roadmap

- [ ] Интеграция с Lighthouse
- [ ] Автоматическое исправление CSS
- [ ] Генерация Figma components
- [ ] A/B тестирование дизайна
- [ ] Heatmap анализ

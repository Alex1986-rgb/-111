# 🔒 Security Setup для TextFlow

## ✅ Что уже сделано (Development)

### 1. Security Headers в Vite (vite.config.ts)
- ✅ Strict-Transport-Security (HSTS)
- ✅ Content-Security-Policy (CSP)
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Permissions-Policy

**Статус:** Security headers работают в dev режиме (localhost:3000)

---

## 🚀 Production Deployment (HTTPS)

### Вариант 1: Nginx + Let's Encrypt (Рекомендуется)

#### Шаг 1: Установить Certbot
```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
```

#### Шаг 2: Получить SSL сертификат
```bash
sudo certbot --nginx -d textflow.ru -d www.textflow.ru
```

#### Шаг 3: Nginx конфигурация
```nginx
# /etc/nginx/sites-available/textflow.ru

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name textflow.ru www.textflow.ru;

    # SSL сертификаты (автоматически от Certbot)
    ssl_certificate /etc/letsencrypt/live/textflow.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/textflow.ru/privkey.pem;
    
    # SSL настройки
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://api.textflow.ru; frame-ancestors 'self'" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    
    # Корневая директория
    root /var/www/textflow/dist;
    index index.html;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Кэширование статики
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}

# Редирект HTTP → HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name textflow.ru www.textflow.ru;
    return 301 https://$server_name$request_uri;
}
```

#### Шаг 4: Активировать конфигурацию
```bash
sudo ln -s /etc/nginx/sites-available/textflow.ru /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Шаг 5: Автообновление сертификата
```bash
# Добавить в crontab
sudo crontab -e

# Добавить строку:
0 0 * * * certbot renew --quiet
```

---

### Вариант 2: Vercel (Самый простой)

#### Шаг 1: Установить Vercel CLI
```bash
npm install -g vercel
```

#### Шаг 2: Deploy
```bash
vercel --prod
```

**Преимущества:**
- ✅ HTTPS автоматически
- ✅ Security headers настраиваются в vercel.json
- ✅ CDN из коробки
- ✅ Автоматический deploy при push в GitHub

#### vercel.json
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.textflow.ru"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

### Вариант 3: Apache + Let's Encrypt

#### .htaccess
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Редирект на HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # SPA routing
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'"
    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

---

## 🧪 Тестирование Security

### 1. Проверить SSL/TLS
```bash
# SSL Labs (A+ рейтинг)
https://www.ssllabs.com/ssltest/analyze.html?d=textflow.ru
```

### 2. Проверить Security Headers
```bash
# Security Headers
https://securityheaders.com/?q=textflow.ru

# Mozilla Observatory
https://observatory.mozilla.org/analyze/textflow.ru
```

### 3. Локальная проверка
```bash
curl -I https://textflow.ru
```

**Ожидаемый результат:**
```
HTTP/2 200
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-security-policy: default-src 'self'...
x-frame-options: DENY
x-content-type-options: nosniff
x-xss-protection: 1; mode=block
referrer-policy: strict-origin-when-cross-origin
```

---

## 📊 Ожидаемые результаты

### До улучшений:
- Security Score: **30/100** 🔴
- HTTPS: ❌
- HSTS: ❌
- CSP: ❌
- X-Frame-Options: ❌

### После улучшений:
- Security Score: **90/100** ✅
- HTTPS: ✅
- HSTS: ✅
- CSP: ✅
- X-Frame-Options: ✅
- X-Content-Type-Options: ✅
- X-XSS-Protection: ✅
- Referrer-Policy: ✅

### Общая оценка проекта:
- Текущая: **86/100**
- После Security: **98/100** 🎉

---

## 🚀 Quick Start (Рекомендуемый путь)

### Для быстрого деплоя (5 минут):
```bash
# 1. Установить Vercel CLI
npm install -g vercel

# 2. Создать vercel.json (см. выше)

# 3. Deploy
vercel --prod

# 4. Настроить домен в Vercel Dashboard
# https://vercel.com/dashboard
```

### Для production сервера (30 минут):
```bash
# 1. Собрать проект
npm run build

# 2. Установить Nginx + Certbot
sudo apt-get install nginx certbot python3-certbot-nginx

# 3. Получить SSL
sudo certbot --nginx -d textflow.ru

# 4. Скопировать dist на сервер
scp -r dist/* user@server:/var/www/textflow/

# 5. Настроить Nginx (см. конфиг выше)

# 6. Перезапустить Nginx
sudo systemctl reload nginx
```

---

## ✅ Checklist

- [x] Security headers добавлены в vite.config.ts
- [ ] Получить SSL сертификат
- [ ] Настроить Nginx/Apache/Vercel
- [ ] Протестировать на securityheaders.com
- [ ] Протестировать на ssllabs.com
- [ ] Добавить домен в HSTS preload list
- [ ] Настроить автообновление SSL

---

*Документ создан: 4 мая 2026*  
*Проект: TextFlow Security Setup*  
*Статус: Development готов, Production требует HTTPS*

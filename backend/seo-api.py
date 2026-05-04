#!/usr/bin/env python3
"""
SEO Superpower API Backend для TextFlow
Интеграция всех 6 модулей с React фронтендом
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import json
import time
from datetime import datetime
import re
from typing import List, Dict, Optional
import sqlite3
import hashlib
import threading
from queue import Queue
import csv
import io

app = Flask(__name__)
CORS(app)

# Хранилище активных задач
active_audits = {}
audit_lock = threading.Lock()

class SuperPowerAnalyzer:
    """Все 6 модулей SEO Superpower"""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

    def analyze_superpower(self, url: str, soup: BeautifulSoup, response) -> Dict:
        """Полный анализ со всеми 6 модулями"""
        try:
            return {
                'url': url,
                'timestamp': datetime.now().isoformat(),
                'performance': self.analyze_performance(response, soup),
                'seo_combinator': self.analyze_seo_combinator(url, soup, response),
                'code_review': self.analyze_code_quality(soup, response),
                'security_review': self.analyze_security(url, response, soup),
                'frontend_design': self.analyze_frontend_design(soup),
                'memory_profile': self.analyze_memory_usage(response, soup)
            }
        except Exception as e:
            return {
                'error': str(e),
                'performance': {'performance_score': 0},
                'seo_combinator': {'seo_combinator_score': 0},
                'code_review': {'code_quality_score': 0},
                'security_review': {'security_score': 0},
                'frontend_design': {'design_score': 0},
                'memory_profile': {'memory_efficiency_score': 0}
            }

    def analyze_performance(self, response, soup: BeautifulSoup) -> Dict:
        """Performance Analyzer"""
        try:
            # Время загрузки
            load_time = response.elapsed.total_seconds()

            # Размер страницы
            page_size = len(response.content) / 1024  # KB

            # Количество ресурсов
            css_count = len(soup.find_all('link', rel='stylesheet'))
            js_count = len(soup.find_all('script', src=True))
            img_count = len(soup.find_all('img'))

            # Оценка производительности
            score = 100
            if load_time > 3:
                score -= 30
            elif load_time > 2:
                score -= 20
            elif load_time > 1:
                score -= 10

            if page_size > 1000:
                score -= 20
            elif page_size > 500:
                score -= 10

            if css_count + js_count > 20:
                score -= 15

            # Симуляция Core Web Vitals
            lcp = load_time * 1.2  # Largest Contentful Paint
            fid = 50 if load_time < 2 else 100  # First Input Delay
            cls = 0.05 if page_size < 500 else 0.15  # Cumulative Layout Shift

            return {
                'performance_score': max(0, score),
                'load_time': round(load_time, 2),
                'page_size_kb': round(page_size, 2),
                'resource_count': css_count + js_count + img_count,
                'lcp': round(lcp, 2),
                'fid': fid,
                'cls': round(cls, 3),
                'issues': self._get_performance_issues(load_time, page_size, css_count, js_count)
            }
        except:
            return {'performance_score': 0}

    def analyze_seo_combinator(self, url: str, soup: BeautifulSoup, response) -> Dict:
        """SEO Combinator Stack"""
        try:
            # Meta теги
            title = soup.find('title')
            meta_desc = soup.find('meta', attrs={'name': 'description'})

            # Заголовки
            h1_tags = soup.find_all('h1')
            h2_tags = soup.find_all('h2')

            # Изображения
            images = soup.find_all('img')
            images_without_alt = [img for img in images if not img.get('alt')]

            # Ссылки
            links = soup.find_all('a', href=True)
            internal_links = [l for l in links if urlparse(l['href']).netloc == '' or urlparse(url).netloc in l['href']]
            external_links = [l for l in links if l not in internal_links]

            # Schema.org
            schema_scripts = soup.find_all('script', type='application/ld+json')

            # Оценка SEO
            score = 100
            if not title or len(title.text) < 10:
                score -= 20
            if not meta_desc:
                score -= 15
            if len(h1_tags) != 1:
                score -= 10
            if len(images_without_alt) > 0:
                score -= 15
            if len(schema_scripts) == 0:
                score -= 10

            return {
                'seo_combinator_score': max(0, score),
                'title': title.text if title else None,
                'title_length': len(title.text) if title else 0,
                'meta_description': meta_desc.get('content') if meta_desc else None,
                'h1_count': len(h1_tags),
                'h2_count': len(h2_tags),
                'images_total': len(images),
                'images_without_alt': len(images_without_alt),
                'internal_links': len(internal_links),
                'external_links': len(external_links),
                'has_schema': len(schema_scripts) > 0,
                'recommendations': self._get_seo_recommendations(title, meta_desc, h1_tags, images_without_alt)
            }
        except:
            return {'seo_combinator_score': 0}

    def analyze_code_quality(self, soup: BeautifulSoup, response) -> Dict:
        """Code Review"""
        try:
            # Устаревшие теги
            deprecated_tags = soup.find_all(['font', 'center', 'marquee', 'blink'])

            # Семантические теги
            semantic_tags = soup.find_all(['header', 'nav', 'main', 'article', 'section', 'footer', 'aside'])

            # Inline стили и скрипты
            inline_styles = len(soup.find_all(style=True))
            inline_scripts = len(soup.find_all('script', src=False))

            # DOCTYPE
            has_doctype = '<!DOCTYPE' in str(response.content[:200])

            # Оценка качества кода
            score = 100
            score -= len(deprecated_tags) * 5
            score += min(len(semantic_tags) * 3, 20)
            score -= min(inline_styles * 2, 20)
            score -= min(inline_scripts * 3, 15)
            if not has_doctype:
                score -= 20

            return {
                'code_quality_score': max(0, min(100, score)),
                'deprecated_tags': len(deprecated_tags),
                'semantic_tags': len(semantic_tags),
                'inline_styles': inline_styles,
                'inline_scripts': inline_scripts,
                'has_doctype': has_doctype,
                'html_issues': self._get_code_issues(deprecated_tags, semantic_tags, has_doctype)
            }
        except:
            return {'code_quality_score': 0}

    def analyze_security(self, url: str, response, soup: BeautifulSoup) -> Dict:
        """Security Review"""
        try:
            # HTTPS
            is_https = url.startswith('https://')

            # Security headers
            headers = response.headers
            has_hsts = 'Strict-Transport-Security' in headers
            has_csp = 'Content-Security-Policy' in headers
            has_xframe = 'X-Frame-Options' in headers
            has_xcontent = 'X-Content-Type-Options' in headers

            # Формы
            forms = soup.find_all('form')
            forms_without_csrf = []
            for form in forms:
                if not form.find('input', attrs={'name': re.compile('csrf|token', re.I)}):
                    forms_without_csrf.append(form)

            # Внешние скрипты
            external_scripts = soup.find_all('script', src=True)
            insecure_scripts = [s for s in external_scripts if s.get('src', '').startswith('http://')]

            # Оценка безопасности
            score = 100
            if not is_https:
                score -= 30
            if not has_hsts:
                score -= 10
            if not has_csp:
                score -= 15
            if not has_xframe:
                score -= 10
            if not has_xcontent:
                score -= 5
            if len(forms_without_csrf) > 0:
                score -= 15
            if len(insecure_scripts) > 0:
                score -= 15

            return {
                'security_score': max(0, score),
                'https': is_https,
                'hsts': has_hsts,
                'csp': has_csp,
                'x_frame_options': has_xframe,
                'x_content_type_options': has_xcontent,
                'forms_count': len(forms),
                'forms_without_csrf': len(forms_without_csrf),
                'insecure_scripts': len(insecure_scripts),
                'vulnerabilities': self._get_security_issues(is_https, has_hsts, has_csp, forms_without_csrf, insecure_scripts)
            }
        except:
            return {'security_score': 0}

    def analyze_frontend_design(self, soup: BeautifulSoup) -> Dict:
        """Frontend Design"""
        try:
            # CSS файлы
            css_links = soup.find_all('link', rel='stylesheet')
            inline_styles = soup.find_all('style')

            # JavaScript файлы
            js_scripts = soup.find_all('script', src=True)

            # Viewport
            viewport = soup.find('meta', attrs={'name': 'viewport'})

            # Accessibility
            images_with_alt = len([img for img in soup.find_all('img') if img.get('alt')])
            total_images = len(soup.find_all('img'))

            # Оценка дизайна
            score = 100
            if len(inline_styles) > 5:
                score -= 10
            if not viewport:
                score -= 20
            if total_images > 0:
                alt_ratio = images_with_alt / total_images
                if alt_ratio < 0.5:
                    score -= 20
                elif alt_ratio < 0.8:
                    score -= 10

            return {
                'design_score': max(0, score),
                'css_files': len(css_links),
                'inline_styles': len(inline_styles),
                'js_files': len(js_scripts),
                'has_viewport': viewport is not None,
                'accessibility_score': round((images_with_alt / total_images * 100) if total_images > 0 else 100, 2),
                'mobile_friendly': viewport is not None
            }
        except:
            return {'design_score': 0}

    def analyze_memory_usage(self, response, soup: BeautifulSoup) -> Dict:
        """Memory Profile"""
        try:
            # DOM size
            dom_size = len(str(soup))
            dom_elements = len(soup.find_all())

            # Ресурсы
            css_count = len(soup.find_all('link', rel='stylesheet'))
            js_count = len(soup.find_all('script'))
            img_count = len(soup.find_all('img'))
            total_resources = css_count + js_count + img_count

            # Оценка эффективности памяти
            score = 100
            if dom_elements > 1500:
                score -= 20
            elif dom_elements > 1000:
                score -= 10

            if total_resources > 50:
                score -= 20
            elif total_resources > 30:
                score -= 10

            return {
                'memory_efficiency_score': max(0, score),
                'dom_size': dom_size,
                'dom_elements': dom_elements,
                'total_resources': total_resources,
                'css_files': css_count,
                'js_files': js_count,
                'images': img_count,
                'optimization_tips': self._get_memory_tips(dom_elements, total_resources)
            }
        except:
            return {'memory_efficiency_score': 0}

    def _get_performance_issues(self, load_time, page_size, css_count, js_count):
        issues = []
        if load_time > 3:
            issues.append('Slow page load time (>3s)')
        if page_size > 1000:
            issues.append('Large page size (>1MB)')
        if css_count + js_count > 20:
            issues.append('Too many CSS/JS files')
        return issues

    def _get_seo_recommendations(self, title, meta_desc, h1_tags, images_without_alt):
        recs = []
        if not title or len(title.text) < 10:
            recs.append('Add descriptive title (50-60 characters)')
        if not meta_desc:
            recs.append('Add meta description (150-160 characters)')
        if len(h1_tags) != 1:
            recs.append('Use exactly one H1 tag per page')
        if len(images_without_alt) > 0:
            recs.append(f'Add alt text to {len(images_without_alt)} images')
        return recs

    def _get_code_issues(self, deprecated_tags, semantic_tags, has_doctype):
        issues = []
        if len(deprecated_tags) > 0:
            issues.append(f'Remove {len(deprecated_tags)} deprecated HTML tags')
        if len(semantic_tags) < 3:
            issues.append('Use more semantic HTML5 tags')
        if not has_doctype:
            issues.append('Add DOCTYPE declaration')
        return issues

    def _get_security_issues(self, is_https, has_hsts, has_csp, forms_without_csrf, insecure_scripts):
        issues = []
        if not is_https:
            issues.append('Enable HTTPS')
        if not has_hsts:
            issues.append('Add HSTS header')
        if not has_csp:
            issues.append('Add Content-Security-Policy header')
        if len(forms_without_csrf) > 0:
            issues.append(f'Add CSRF protection to {len(forms_without_csrf)} forms')
        if len(insecure_scripts) > 0:
            issues.append(f'Fix {len(insecure_scripts)} insecure script sources')
        return issues

    def _get_memory_tips(self, dom_elements, total_resources):
        tips = []
        if dom_elements > 1500:
            tips.append('Reduce DOM complexity')
        if total_resources > 50:
            tips.append('Optimize resource loading (lazy loading, code splitting)')
        return tips

# API Endpoints

@app.route('/api/audit/start', methods=['POST'])
def start_audit():
    """Запуск SEO-аудита"""
    try:
        data = request.json
        url = data.get('url')
        max_pages = data.get('maxPages', 100)
        modules = data.get('modules', ['all'])

        if not url:
            return jsonify({'error': 'URL is required'}), 400

        # Создаем ID задачи
        audit_id = hashlib.md5(f"{url}{time.time()}".encode()).hexdigest()[:12]

        # Сохраняем задачу
        with audit_lock:
            active_audits[audit_id] = {
                'status': 'processing',
                'progress': 0,
                'url': url,
                'max_pages': max_pages,
                'modules': modules,
                'start_time': datetime.now().isoformat(),
                'results': None
            }

        # Запускаем анализ в отдельном потоке
        thread = threading.Thread(target=run_audit, args=(audit_id, url, max_pages, modules))
        thread.daemon = True
        thread.start()

        return jsonify({
            'audit_id': audit_id,
            'status': 'started',
            'message': 'Audit started successfully'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/audit/<audit_id>/status', methods=['GET'])
def get_audit_status(audit_id):
    """Получить статус аудита"""
    with audit_lock:
        audit = active_audits.get(audit_id)
        if not audit:
            return jsonify({'error': 'Audit not found'}), 404
        return jsonify(audit)

@app.route('/api/audit/<audit_id>/export', methods=['GET'])
def export_audit(audit_id):
    """Экспорт результатов"""
    format_type = request.args.get('format', 'json')

    with audit_lock:
        audit = active_audits.get(audit_id)
        if not audit or not audit.get('results'):
            return jsonify({'error': 'Audit not found or not completed'}), 404

    results = audit['results']

    if format_type == 'csv':
        return export_csv(results)
    elif format_type == 'json':
        return jsonify(results)
    else:
        return jsonify({'error': 'Invalid format'}), 400

def export_csv(results):
    """Экспорт в CSV"""
    output = io.StringIO()
    writer = csv.writer(output)

    # Заголовки
    writer.writerow(['URL', 'Module', 'Score', 'Issues'])

    # Данные
    for module_name, module_data in results.items():
        if isinstance(module_data, dict) and 'score' in str(module_data):
            score_key = [k for k in module_data.keys() if 'score' in k.lower()]
            score = module_data.get(score_key[0], 0) if score_key else 0
            issues = module_data.get('issues', module_data.get('recommendations', []))
            writer.writerow([
                results.get('url', ''),
                module_name,
                score,
                '; '.join(issues) if isinstance(issues, list) else issues
            ])

    output.seek(0)
    return output.getvalue(), 200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': f'attachment; filename=seo-audit-{results.get("url", "export")}.csv'
    }

def run_audit(audit_id, url, max_pages, modules):
    """Выполнение аудита"""
    try:
        analyzer = SuperPowerAnalyzer()

        # Обновляем прогресс
        with audit_lock:
            active_audits[audit_id]['progress'] = 10
            active_audits[audit_id]['status'] = 'Fetching page...'

        # Получаем страницу
        response = analyzer.session.get(url, timeout=30)
        soup = BeautifulSoup(response.content, 'html.parser')

        with audit_lock:
            active_audits[audit_id]['progress'] = 30
            active_audits[audit_id]['status'] = 'Analyzing...'

        # Анализируем
        results = analyzer.analyze_superpower(url, soup, response)

        with audit_lock:
            active_audits[audit_id]['progress'] = 100
            active_audits[audit_id]['status'] = 'completed'
            active_audits[audit_id]['results'] = results
            active_audits[audit_id]['completed_at'] = datetime.now().isoformat()

    except Exception as e:
        with audit_lock:
            active_audits[audit_id]['status'] = 'error'
            active_audits[audit_id]['error'] = str(e)

if __name__ == '__main__':
    print("🚀 SEO Superpower API Backend starting...")
    print("📊 Available endpoints:")
    print("  POST /api/audit/start - Start new audit")
    print("  GET  /api/audit/<id>/status - Get audit status")
    print("  GET  /api/audit/<id>/export?format=csv|json - Export results")
    print("")
    print("🌐 Server running on http://localhost:5001")
    app.run(host='0.0.0.0', port=5001, debug=True)

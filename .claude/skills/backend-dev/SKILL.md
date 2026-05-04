---
name: backend-dev
description: Backend разработчик - API, бизнес-логика, интеграции, оптимизация
version: 1.0.0
model: kr/claude-sonnet-4.5
---

# Backend Developer - Python/Node.js разработчик

Специалист по серверной разработке и API.

## Использование

```bash
/backend-dev <задача>
```

## Примеры

```bash
# Создать API endpoint
/backend-dev "Создать endpoint для экспорта отчета в PDF"

# Оптимизация
/backend-dev "Оптимизировать запрос к БД для получения статистики"

# Интеграция
/backend-dev "Интегрировать Stripe для приема платежей"

# Фоновые задачи
/backend-dev "Добавить фоновую обработку больших файлов"
```

## Стек технологий

### Core
- **Python 3.10+** - Основной язык
- **Flask** - Web framework
- **SQLAlchemy** - ORM
- **Celery** - Background tasks

### Database
- **PostgreSQL** - Primary DB
- **Redis** - Caching & Queue
- **SQLite** - Development

### Tools
- **Pydantic** - Data validation
- **Alembic** - Migrations
- **pytest** - Testing

## API Design

### RESTful Endpoints
```python
# GET - Получение данных
@app.route('/api/audits', methods=['GET'])
def get_audits():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    audits = Audit.query.paginate(page=page, per_page=per_page)
    
    return jsonify({
        'data': [audit.to_dict() for audit in audits.items],
        'total': audits.total,
        'page': page,
        'pages': audits.pages
    })

# POST - Создание
@app.route('/api/audits', methods=['POST'])
def create_audit():
    data = request.get_json()
    
    # Валидация
    if not data.get('url'):
        return jsonify({'error': 'URL is required'}), 400
    
    # Создание
    audit = Audit(url=data['url'], status='pending')
    db.session.add(audit)
    db.session.commit()
    
    # Запуск фоновой задачи
    run_audit.delay(audit.id)
    
    return jsonify(audit.to_dict()), 201

# PUT - Обновление
@app.route('/api/audits/<int:id>', methods=['PUT'])
def update_audit(id):
    audit = Audit.query.get_or_404(id)
    data = request.get_json()
    
    audit.status = data.get('status', audit.status)
    db.session.commit()
    
    return jsonify(audit.to_dict())

# DELETE - Удаление
@app.route('/api/audits/<int:id>', methods=['DELETE'])
def delete_audit(id):
    audit = Audit.query.get_or_404(id)
    db.session.delete(audit)
    db.session.commit()
    
    return '', 204
```

### Error Handling
```python
from werkzeug.exceptions import HTTPException

@app.errorhandler(HTTPException)
def handle_exception(e):
    return jsonify({
        'error': e.name,
        'message': e.description,
        'status': e.code
    }), e.code

@app.errorhandler(Exception)
def handle_unexpected_error(e):
    app.logger.error(f'Unexpected error: {str(e)}')
    return jsonify({
        'error': 'Internal Server Error',
        'message': 'An unexpected error occurred'
    }), 500
```

### Validation
```python
from pydantic import BaseModel, validator, HttpUrl

class AuditCreate(BaseModel):
    url: HttpUrl
    max_pages: int = 100
    
    @validator('max_pages')
    def validate_max_pages(cls, v):
        if v < 1 or v > 10000:
            raise ValueError('max_pages must be between 1 and 10000')
        return v

@app.route('/api/audits', methods=['POST'])
def create_audit():
    try:
        data = AuditCreate(**request.get_json())
    except ValidationError as e:
        return jsonify({'errors': e.errors()}), 400
    
    # Создание аудита
    ...
```

## Database

### Models
```python
from sqlalchemy import Column, Integer, String, DateTime, JSON
from datetime import datetime

class Audit(db.Model):
    __tablename__ = 'audits'
    
    id = Column(Integer, primary_key=True)
    url = Column(String(500), nullable=False)
    status = Column(String(50), default='pending')
    results = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'status': self.status,
            'results': self.results,
            'created_at': self.created_at.isoformat(),
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }
```

### Queries
```python
# Оптимизированный запрос
audits = Audit.query\
    .filter(Audit.status == 'completed')\
    .order_by(Audit.created_at.desc())\
    .limit(10)\
    .all()

# Join
results = db.session.query(Audit, User)\
    .join(User, Audit.user_id == User.id)\
    .filter(User.email == 'user@example.com')\
    .all()

# Aggregation
stats = db.session.query(
    func.count(Audit.id).label('total'),
    func.avg(Audit.score).label('avg_score')
).filter(Audit.status == 'completed').first()
```

### Migrations
```python
# alembic/versions/001_create_audits.py
def upgrade():
    op.create_table(
        'audits',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('url', sa.String(500), nullable=False),
        sa.Column('status', sa.String(50), default='pending'),
        sa.Column('results', sa.JSON()),
        sa.Column('created_at', sa.DateTime(), default=datetime.utcnow)
    )
    
    op.create_index('idx_audits_status', 'audits', ['status'])

def downgrade():
    op.drop_table('audits')
```

## Background Tasks

### Celery Setup
```python
from celery import Celery

celery = Celery(
    'tasks',
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/0'
)

@celery.task
def run_audit(audit_id):
    audit = Audit.query.get(audit_id)
    audit.status = 'processing'
    db.session.commit()
    
    try:
        # Выполнение аудита
        results = perform_audit(audit.url)
        
        audit.status = 'completed'
        audit.results = results
        audit.completed_at = datetime.utcnow()
        db.session.commit()
        
    except Exception as e:
        audit.status = 'failed'
        audit.error = str(e)
        db.session.commit()
```

### Periodic Tasks
```python
from celery.schedules import crontab

celery.conf.beat_schedule = {
    'cleanup-old-audits': {
        'task': 'tasks.cleanup_old_audits',
        'schedule': crontab(hour=2, minute=0),  # 2 AM daily
    },
}

@celery.task
def cleanup_old_audits():
    threshold = datetime.utcnow() - timedelta(days=30)
    Audit.query.filter(Audit.created_at < threshold).delete()
    db.session.commit()
```

## Caching

### Redis Cache
```python
import redis
import json

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def get_cached_audit(audit_id):
    key = f'audit:{audit_id}'
    cached = redis_client.get(key)
    
    if cached:
        return json.loads(cached)
    
    audit = Audit.query.get(audit_id)
    if audit:
        redis_client.setex(key, 300, json.dumps(audit.to_dict()))  # 5 min TTL
        return audit.to_dict()
    
    return None
```

### Decorator
```python
from functools import wraps

def cache_result(ttl=300):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            key = f'cache:{f.__name__}:{args}:{kwargs}'
            cached = redis_client.get(key)
            
            if cached:
                return json.loads(cached)
            
            result = f(*args, **kwargs)
            redis_client.setex(key, ttl, json.dumps(result))
            return result
        
        return wrapper
    return decorator

@cache_result(ttl=600)
def get_statistics():
    # Тяжелый запрос
    return calculate_stats()
```

## Security

### Authentication
```python
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

jwt = JWTManager(app)

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token})
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({'message': 'Access granted'})
```

### Rate Limiting
```python
from flask_limiter import Limiter

limiter = Limiter(
    app,
    key_func=lambda: request.remote_addr,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/api/audits', methods=['POST'])
@limiter.limit("10 per minute")
def create_audit():
    # Максимум 10 аудитов в минуту
    ...
```

### Input Sanitization
```python
import bleach

def sanitize_input(text):
    return bleach.clean(text, tags=[], strip=True)

@app.route('/api/comments', methods=['POST'])
def create_comment():
    data = request.get_json()
    clean_text = sanitize_input(data['text'])
    
    comment = Comment(text=clean_text)
    db.session.add(comment)
    db.session.commit()
    
    return jsonify(comment.to_dict())
```

## Testing

### Unit Tests
```python
import pytest

def test_create_audit(client):
    response = client.post('/api/audits', json={
        'url': 'https://example.com',
        'max_pages': 10
    })
    
    assert response.status_code == 201
    data = response.get_json()
    assert data['url'] == 'https://example.com'
    assert data['status'] == 'pending'

def test_invalid_url(client):
    response = client.post('/api/audits', json={
        'url': 'not-a-url'
    })
    
    assert response.status_code == 400
```

### Integration Tests
```python
def test_audit_workflow(client, db):
    # Создание
    response = client.post('/api/audits', json={'url': 'https://example.com'})
    audit_id = response.get_json()['id']
    
    # Проверка статуса
    response = client.get(f'/api/audits/{audit_id}')
    assert response.get_json()['status'] == 'pending'
    
    # Симуляция завершения
    audit = Audit.query.get(audit_id)
    audit.status = 'completed'
    db.session.commit()
    
    # Проверка результата
    response = client.get(f'/api/audits/{audit_id}')
    assert response.get_json()['status'] == 'completed'
```

## Performance

### Database Optimization
```python
# N+1 problem
# ❌ Плохо
audits = Audit.query.all()
for audit in audits:
    print(audit.user.name)  # N+1 запросов

# ✅ Хорошо
audits = Audit.query.options(joinedload(Audit.user)).all()
for audit in audits:
    print(audit.user.name)  # 1 запрос
```

### Async Processing
```python
import asyncio
import aiohttp

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def fetch_multiple_urls(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Использование
results = asyncio.run(fetch_multiple_urls(urls))
```

## Monitoring

### Logging
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

@app.route('/api/audits', methods=['POST'])
def create_audit():
    logger.info(f'Creating audit for URL: {data["url"]}')
    
    try:
        audit = create_audit_logic(data)
        logger.info(f'Audit created: {audit.id}')
        return jsonify(audit.to_dict())
    except Exception as e:
        logger.error(f'Error creating audit: {str(e)}', exc_info=True)
        raise
```

### Metrics
```python
from prometheus_client import Counter, Histogram

audit_counter = Counter('audits_created_total', 'Total audits created')
audit_duration = Histogram('audit_duration_seconds', 'Audit duration')

@app.route('/api/audits', methods=['POST'])
def create_audit():
    audit_counter.inc()
    
    with audit_duration.time():
        # Создание аудита
        ...
```

---

*Скил создан: 4 мая 2026*  
*Роль: Backend Developer*  
*Модель: Sonnet 4.5*

#!/bin/bash
# Скрипт для запуска SEO Superpower Backend

echo "🚀 Starting SEO Superpower Backend..."
echo ""

# Проверка Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3.8+"
    exit 1
fi

# Переход в директорию backend
cd "$(dirname "$0")"

# Проверка виртуального окружения
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Активация виртуального окружения
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Установка зависимостей
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt

# Запуск сервера
echo ""
echo "✅ Backend ready!"
echo "🌐 API running on http://localhost:5001"
echo ""
echo "Available endpoints:"
echo "  POST /api/audit/start"
echo "  GET  /api/audit/<id>/status"
echo "  GET  /api/audit/<id>/export?format=csv|json"
echo ""
echo "Press Ctrl+C to stop"
echo ""

python3 seo-api.py

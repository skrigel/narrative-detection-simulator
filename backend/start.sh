#!/usr/bin/env bash
set -e  # Exit on failure

echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

echo "🚀 Installing spaCy model..."
python -m spacy download en_core_web_sm

echo "✅ spaCy model ready."

echo "🟢 Starting Uvicorn..."
exec uvicorn app.main:app --host=0.0.0.0 --port=$PORT
#!/usr/bin/env bash
set -e  # Exit immediately on failure

echo "🚀 Installing spaCy model..."
python -m spacy download en_core_web_sm

echo "✅ spaCy model installed."

# Optional: install newspaper dependencies manually (in case they're flaky)
echo "📦 Ensuring newspaper dependencies..."
pip install -r requirements.txt

echo "🟢 Starting Uvicorn..."
exec uvicorn app.main:app --host=0.0.0.0 --port=${PORT:-8000}
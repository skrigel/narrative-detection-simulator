# 🐍 Backend – FastAPI + Poetry + Uvicorn

This is the backend service for the Narrative Detection Simulator. It includes:
- REST API (FastAPI)
- Synthetic graph and simulation engines
- Narrative variant generation and detection logic

Built with:

- 🐍 FastAPI
- ⚡ Uvicorn (ASGI server)
- 🧱 Pydantic (data models)
- 🧠 Ready for GenAI integrations (e.g., Amazon Bedrock)


## ⚙️ Setup Instructions

### Prerequisites
- Python 3.11
- Poetry >= 1.8.0

### 1. Install Dependencies
```bash
poetry install
```

### 1. Run the application
```bash
uvicorn app.main:app --reload
```

## Key files

```markdown
- app/main.py – FastAPI entrypoint

- api/ – Route modules (e.g., narratives, simulation)

- services/ – Core business logic (generation, simulation, detection)
```

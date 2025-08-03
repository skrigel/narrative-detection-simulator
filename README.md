# Narrative Detection Simulator 🧠⚡️

A full-stack boilerplate for building Generative AI applications with:

- ⚛️ Frontend: React + TypeScript + Vite + Tailwind
- 🐍 Backend: FastAPI + Pydantic + Uvicorn
- ☁️ Ready for integration with AWS (e.g. Bedrock, Lambda, S3)

---

## 📁 Project Structure Overview
```markdown
├── frontend/ # React web app (Vite, Tailwind, TypeScript)
├── backend/ # FastAPI backend for GenAI APIs 
├── README
├── docker-compose.yaml
└── LICENSE
```

## 🚀 Quick Start Setup

### Prerequisites
- Node.js >= 18.x (for frontend)
- Python 3.11 (recommended)
- Poetry >= 1.8.0 (for backend)

---

### 🔧 Local Development

#### ⬅️ Backend Setup (FastAPI + Poetry)
```bash
cd backend
poetry install
poetry env use python3.11
source $(poetry env info --path)/bin/activate
uvicorn app.main:app --reload
```

#### Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```

## Module Overview
```
                        ┌────────────────────────────┐
                        │        Frontend UI         │
                        │ (React or Angular + TS)    │
                        └────────────┬───────────────┘
                                     │ REST API / WebSocket
                        ┌────────────▼───────────────┐
                        │       FastAPI Backend      │
                        └────────────┬───────────────┘
                                     │
       ┌─────────────────────────────┴────────────────────────────┐
       │                          Core Modules                    │
       ├────────────┬──────────────┬─────────────┬────────────────┤
       │ Simulation │ Narrative    │ Detection   │  Storage Layer │
       │ Engine     │ Generator    │ Pipeline    │ (SQLite/Postgres)
       └────────────┴──────────────┴─────────────┴────────────────┘
```
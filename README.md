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

## Project Structure Detail
```markdown
project-root/
├── LICENSE
├── README.md
├── docker-compose.yaml

├── backend/
│   ├── README.md
│   ├── requirements.txt
│   └── app/
│       ├── main.py                  # FastAPI app entry
│       ├── config.py                # App-wide config/env vars

│       ├── api/                     # Route handlers (controllers)
│       │   ├── __init__.py
│       │   ├── routes_narratives.py  # /narratives endpoints
│       │   ├── routes_simulation.py  # /simulate endpoints
│       │   ├── routes_graphs.py      # /graphs endpoints
│       │   └── routes_detection.py   # /detect endpoints

│       ├── models/                  # Pydantic + DB models
│       │   ├── __init__.py
│       │   ├── narrative_models.py   # Narrative metadata schema
│       │   ├── simulation_models.py  # Simulation input/output schema
│       │   └── graph_models.py       # Node, Edge, and Graph schemas

│       ├── services/                # Business logic layer
│       │   ├── __init__.py
│       │   ├── narrative_service.py  # Variant generation logic
│       │   ├── graph_service.py      # Synthetic social graph builder
│       │   ├── simulation_service.py # Diffusion engine
│       │   ├── detection_service.py  # Heuristics/ML for detection
│       │   └── storage_service.py    # Optional: File/DB storage wrapper

│       ├── core/                    # Optional: shared logic/utilities
│       │   ├── llm_client.py         # GPT integration
│       │   ├── utils.py              # Helpers, constants, etc.
│       │   └── graph_algorithms.py   # Spread/diffusion logic

│       ├── schemas/                 # Request/response I/O
│       │   ├── __init__.py
│       │   ├── narrative_schema.py
│       │   ├── simulation_schema.py
│       │   └── detection_schema.py

│       └── tests/                   # Unit + integration tests
│           ├── test_simulation.py
│           ├── test_detection.py
│           └── test_narratives.py


├── frontend/
│   ├── README.md
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── src/
│       ├── main.tsx
│       ├── index.css
│       ├── App.tsx
│       ├── App.css

│       ├── assets/                  # Logos, illustrations, etc.
│       ├── components/              # UI units (cards, charts, graphs)
│       │   ├── NarrativeCard.tsx
│       │   ├── SpreadGraph.tsx
│       │   └── DetectionPanel.tsx

│       ├── context/                 # Global state (simulation settings)
│       │   ├── AppContext.tsx

│       ├── pages/                   # Top-level views
│       │   ├── NarrativeLibraryView.tsx
│       │   ├── GraphView.tsx
│       │   ├── SimulationView.tsx
│       │   └── DashboardView.tsx

│       ├── api/                     # API service wrappers
│       │   ├── narrativeService.ts
│       │   ├── simulationService.ts
│       │   ├── graphService.ts
│       │   └── detectionService.ts

│       └── types/                   # TypeScript interfaces
│           ├── narrative.ts
│           ├── graph.ts
│           ├── simulation.ts
│           └── detection.ts

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
# GenAI Backend

This is the backend API for your Generative AI project, built with:

- 🐍 FastAPI
- ⚡ Uvicorn (ASGI server)
- 🧱 Pydantic (data models)
- 🧠 Ready for GenAI integrations (e.g., Amazon Bedrock)

---

## ✅ Setup

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Folder Structure
```markdown
├── README.md
├── app
│   ├── api
│   │   ├── __init__.py
│   │   └── routes.py
│   ├── config.py
│   ├── main.py
│   ├── models
│   │   └── schema.py
│   └── services
│       └── generator.py
└── requirements.txt
```
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_health import router as health_router
from app.api.routes_narratives import router as narratives_router
from app.api.routes_synthetic import router as synthetic_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://narrative-detection-simulator-1.onrender.com", "https://narrative-detection-simulator.onrender.com"],  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(narratives_router, prefix="/api")
app.include_router(health_router, prefix="/api")
app.include_router(synthetic_router, prefix="/api")

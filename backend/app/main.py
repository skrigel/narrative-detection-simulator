from fastapi import FastAPI
from app.api.routes_health import router as health_router
from app.api.routes_narratives import router as narratives_router
    

app = FastAPI()

app.include_router(narratives_router, prefix="/api")
app.include_router(health_router, prefix="/api")

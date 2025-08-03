from fastapi import APIRouter
from typing import List
from app.models.schema import DataGenerationRequest, GeneratedRecord
from app.services.generator import generate_synthetic_data

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.post("/generate", response_model=List[GeneratedRecord])
def generate_data(payload: DataGenerationRequest):
    return generate_synthetic_data(payload)
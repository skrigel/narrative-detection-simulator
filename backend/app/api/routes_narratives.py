from fastapi import APIRouter
from models.narrative_models import NarrativeRequest, NarrativeResponse
from services.narrative_service import generate_variants

router = APIRouter()

@router.post("/narratives/generate", response_model=NarrativeResponse)
def generate_narratives(payload: NarrativeRequest):
    return generate_variants(payload)
from fastapi import APIRouter
from app.models.narrative_models import NarrativeRequest, NarrativeResponse
from app.services.narrative_service import generate_variants

router = APIRouter()

@router.post("/narratives/generate", response_model=NarrativeResponse)
def generate_narratives(payload: NarrativeRequest):
    print("Generating narrative variants...")
    response = generate_variants(payload)
    print(f"Generated variants.")
    return response
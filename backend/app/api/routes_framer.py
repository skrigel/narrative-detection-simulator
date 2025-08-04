from fastapi import APIRouter
from app.models.narrative_models import NarrativeRequest, NarrativeResponse
from app.models.chat_models import Message, ChatCompletionRequest
from app.services.framer_service import extract_article_text
from app.core.llm_client import call_together_api
from app.services.framer_service import extract_frame_from_url
from app.core.nlp_utils import extract_entities_emotion_ideology
import json

router = APIRouter()


@router.get("/framer/from_url", response_model=NarrativeResponse)
def generate_synthetic_narratives(url: str):
    
    print("Generating synthetic narrative variants...")
    fields = extract_frame_from_url(url)

    print(f"Generated synthetic variants.")
    return fields
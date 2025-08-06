from fastapi import APIRouter, Query
from app.models.narrative_models import NarrativeResponse
from app.models.framer_models import NarrativeFrame, NarrativeFrameList
from app.services.framer_service import extract_frame_from_url, extract_popular_frames
from app.core.nlp_utils import extract_entities_emotion_ideology

router = APIRouter()


@router.get("/framer/from_url", response_model=NarrativeFrame)
def generate_frames_from_url(
    url: str = Query(..., description="URL to extract frames from"),
    emotion: str = Query("neutral", description="Optional emotion context")
):
    print("Generating synthetic narrative variants...")
    fields = extract_frame_from_url(url=url)
    print("Generated synthetic variants.")
    return fields


@router.get("/framer/popular", response_model=NarrativeFrameList)
def generate_popular_frames(
    num_articles: int = Query(10, description="Number of articles to generate frames from")
):
    print("Generating popular narrative frames...")
    fields = extract_popular_frames(num_articles=num_articles)
    print("Generated popular frames.")


    return fields
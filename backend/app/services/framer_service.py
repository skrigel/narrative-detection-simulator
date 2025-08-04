from app.models.framer_models import NarrativeFrame
from app.services.scrapers.news_scraper import extract_article_text
from app.core.nlp_utils import extract_entities_emotion_ideology
import uuid


def extract_frame_from_url(url: str) -> NarrativeFrame:
    text, source = extract_article_text(url)
    frame = text.split(".")[0]  # naive summary — refine later
    metadata = extract_entities_emotion_ideology(text)

    return NarrativeFrame(
        id=uuid.uuid4().int,
        frame=frame,
        source=source,
        ideology=metadata["ideology"],
        emotion=metadata["emotion"],
        entities=metadata["entities"],
    )



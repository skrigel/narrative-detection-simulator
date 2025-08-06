from app.models.framer_models import NarrativeFrame
from app.services.scrapers.news_scraper import extract_article_text, extract_popular_urls
from app.core.nlp_utils import extract_entities_emotion_ideology
import uuid


def extract_frame_from_url(url: str) -> NarrativeFrame | None:
    out = extract_article_text(url)
    if not out:
        return None

    text, source = out
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

def extract_popular_frames(num_articles: int) -> list[NarrativeFrame]:
    articles = extract_popular_urls(number_of_articles=num_articles)
    frames = []
    for text, source in articles:
        frame = text.split(".")[0]  # naive summary — refine later
        metadata = extract_entities_emotion_ideology(text)
        frames.append(
            NarrativeFrame(
                id=uuid.uuid4().int,
                frame=frame,
                source=source,
                ideology=metadata["ideology"],
                emotion=metadata["emotion"],
                entities=metadata["entities"],
            )
        )
    return frames



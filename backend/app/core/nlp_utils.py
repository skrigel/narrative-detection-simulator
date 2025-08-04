import spacy
nlp = spacy.load("en_core_web_sm")

def extract_entities_emotion_ideology(text: str) -> dict:
    doc = nlp(text)
    entities = list(set([ent.text for ent in doc.ents if ent.label_ in {"ORG", "PERSON", "GPE"}]))

    # Placeholder logic — replace with LLM/heuristics
    emotion = "anger" if "accuse" in text.lower() else "neutral"
    ideology = "left" if "climate" in text.lower() else "unknown"

    return {
        "entities": entities,
        "emotion": emotion,
        "ideology": ideology,
    }


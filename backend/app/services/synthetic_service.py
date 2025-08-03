from app.models.narrative_models import NarrativeRequest

def generate_prompt(payload: NarrativeRequest):
    # Generate a prompt for the LLM based on the input payload
    return f"""Generate a narrative with {payload.frame} in a {payload.tone} tone representing {payload.emotion} emotion. Please return only a JSON of the following format: 
    {{\"content\": "Generated narrative", \"virality_score\": "Potential virality of generated narrative, from 0.0-1.0"}}"""


def generate_synthetic_variants(payload: NarrativeRequest):
    # Placeholder logic — eventually use LLM or prompt engine
    frame = payload.frame
    tone = payload.tone
    emotion = payload.emotion
    return {
        "content": "placeholder content",
        "variant": f"{tone.upper()} variant of: {frame}",
        "tone": tone,
        "emotion": emotion,
        "format": "text",
        "virality_score": 0.7
    }

def generate_variants(payload):
    # Placeholder logic — eventually use LLM or prompt engine
    frame = payload.frame
    tone = payload.tone
    return {
        "variant": f"{tone.upper()} variant of: {frame}",
        "emotion": "neutral",
        "virality_score": 0.7
    }
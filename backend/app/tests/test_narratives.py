def test_generate_variants():
    from models.narrative_models import NarrativeRequest
    from services.narrative_service import generate_variants

    payload = NarrativeRequest(frame="Brand X accused of greenwashing", tone="angry")
    result = generate_variants(payload)

    assert isinstance(result["variant"], str)
    assert "Brand X" in result["variant"]
    assert 0 <= result["virality_score"] <= 1
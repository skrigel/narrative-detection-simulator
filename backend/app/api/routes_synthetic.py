from fastapi import APIRouter
from app.models.narrative_models import NarrativeRequest, NarrativeResponse
from app.models.chat_models import Message, ChatCompletionRequest
from app.services.synthetic_service import generate_synthetic_variants, generate_prompt
from app.core.llm_client import call_together_api
import json

router = APIRouter()


@router.post("/synthetic/generate", response_model=NarrativeResponse)
def generate_synthetic_narratives(payload: NarrativeRequest):
    print("Generating synthetic narrative variants...")
    response = generate_synthetic_variants(payload)
    print(f"Generated synthetic variants.")
    return response


@router.post("/synthetic/generate_completion", response_model=NarrativeResponse)
def generate_narratives_completion(payload: NarrativeRequest):
    # Build prompt with full context (optionally include platform & user_type)
    prompt = generate_prompt(payload)

    if payload.platform:
        prompt += f"\nThe target platform is {payload.platform}."
    if payload.user_type:
        prompt += f"\nThe narrative is written as if from a {payload.user_type}."

    # Create chat messages for LLM
    messages = [
        Message(role="system", content="You are a political narrative strategist."),
        Message(role="user", content=prompt),
    ]

    # Call Together LLM
    response_text = call_together_api(messages=messages, model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free")

    try:
        response_text_json = json.loads(response_text)
    except json.JSONDecodeError:
        raise ValueError("Error decoding response from Together API (expected JSON)")

    content = response_text_json.get("content", "")
    virality_score = response_text_json.get("virality_score", 0.0)

    return NarrativeResponse(
        content=content,
        variant=payload.frame,
        tone=payload.tone,
        emotion=payload.emotion,
        virality_score=virality_score
    )

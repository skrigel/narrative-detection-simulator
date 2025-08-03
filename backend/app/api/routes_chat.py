from fastapi import APIRouter, HTTPException, Depends
from app.models.chat_models import ChatCompletionRequest, Message
from starlette.responses import StreamingResponse
from app.services.chat_service import verify_api_key, call_together_api
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

router = APIRouter()

@router.post("/chat/completions", dependencies=[Depends(verify_api_key)])
async def chat_completions(request: ChatCompletionRequest):
    if not request.messages:
        raise HTTPException(status_code=400, detail="No messages provided")

    response_text = call_together_api(messages=request.messages, model=request.model)
    return {"response": response_text}

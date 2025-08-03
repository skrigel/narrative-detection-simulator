from urllib import response
from fastapi import Depends, HTTPException
from fastapi.security.api_key import APIKeyHeader
from app.models.chat_models import Message, ChatCompletionRequest
import openai
from openai.types.chat import (
    ChatCompletionUserMessageParam,
    ChatCompletionSystemMessageParam,
    ChatCompletionMessageParam,
)
from together import Together
import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPEN_AI_KEY")  # Your OpenAI API key
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")  # Your Together API key
from openai import OpenAI

client = OpenAI(
    api_key=TOGETHER_API_KEY,
    base_url="https://api.together.xyz/v1"
)

openai.api_key = OPENAI_API_KEY
API_KEY_NAME = "Authorization"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def verify_api_key(api_key: str = Depends(api_key_header)):
    if api_key is None:
        raise HTTPException(status_code=403, detail="API key is missing")
    if api_key != f"Bearer {TOGETHER_API_KEY}":
        raise HTTPException(status_code=403, detail="Invalid API key")


def call_together_api(messages: list[Message], model: str = "gpt-3.5-turbo") -> str:
    # Implement the call to the Together API here

    formatted_messages = []
    for m in messages:
        if m.role == "user":
            formatted_messages.append(ChatCompletionUserMessageParam(role="user", content=m.content))
        elif m.role == "system":
            formatted_messages.append(ChatCompletionSystemMessageParam(role="system", content=m.content))
        else:
            raise ValueError(f"Unsupported role: {m.role}")

    response = client.chat.completions.create(
    model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    messages=formatted_messages,
    temperature=0.7,
    max_tokens=512
    )

    if not response.choices or not response.choices[0].message.content:
        return "No valid response from Together API"

    return response.choices[0].message.content
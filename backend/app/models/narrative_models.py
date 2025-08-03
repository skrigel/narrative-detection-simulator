from pydantic import BaseModel
from typing import Optional 

class NarrativeRequest(BaseModel):
    frame: str
    tone: str = "neutral"
    emotion: str
    platform: Optional[str] = None
    user_type: Optional[str] = None

class NarrativeResponse(BaseModel):
    content: str
    variant: str
    tone: str
    emotion: str
    format: str = 'text'
    virality_score: float
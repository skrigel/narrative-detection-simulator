from pydantic import BaseModel

class NarrativeRequest(BaseModel):
    frame: str
    tone: str = "neutral"

class NarrativeResponse(BaseModel):
    variant: str
    emotion: str
    virality_score: float
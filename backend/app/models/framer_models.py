from pydantic import BaseModel
from typing import List

class NarrativeFrame(BaseModel):
    id: int
    frame: str
    source: str
    ideology: str
    emotion: str
    entities: List[str]

NarrativeFrameList = List[NarrativeFrame]

class NarrativeDomain(BaseModel):
    name: str
    description: str

## TODO: Do we want to pick a single entity to focus on?

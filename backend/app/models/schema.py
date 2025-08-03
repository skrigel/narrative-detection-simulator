from pydantic import BaseModel
from typing import List, Dict, Optional

class SchemaField(BaseModel):
    name: str
    type: str
    constraints: Optional[Dict[str, str]] = None

class DataGenerationRequest(BaseModel):
    domain: str
    data_schema: List[SchemaField]
    num_rows: int = 100

class GeneratedRecord(BaseModel):
    data: Dict[str, str]
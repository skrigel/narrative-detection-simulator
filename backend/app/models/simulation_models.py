import string
from typing import List, Optional

from pydantic import BaseModel

class SimulationRequest(BaseModel):
    num_nodes: int
    clusters: int
    steps: int
    model: str
    injection_type: str
    rewiring_prob: float

class SocialNode(BaseModel):
    id: int
    name: str
    ideology: str
    influence: float
    engagement: float
    activation_step: int

class SocialEdge(BaseModel):
    source: int
    target: int
    type: str


class GraphConfig(BaseModel):
    num_nodes: int
    num_clusters: int
    model: str
    rewiring_prob: float

class DiffusionConfig(BaseModel):
    num_steps: int
    injection_type: str


class SimulationConfig(BaseModel):
    graph: GraphConfig
    simulation: DiffusionConfig



class SimulationStep(BaseModel):
    step: int
    nodes: List[SocialNode]
    links: List[SocialEdge]

class SimulationResponse(BaseModel):
    steps: List[SimulationStep]
           


class SocialGraph(BaseModel):
    id: int
    nodes: List[SocialNode]
    edges: List[SocialEdge]


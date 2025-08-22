
export interface SimulationRequest {
    num_nodes: number;
    clusters: number;
    steps: number;
    model: string;
    injection_type: string;
    rewiring_prob: number;
}

export interface SocialNode {
  id: number;
  name: string;
  ideology: string;
  influence: number;
  engagement: number;
  activation_step: number;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export interface SocialEdge {
  source: number;
  target: number;
  type: string;
}

export interface SimulationStep {
  step: number;
  nodes: SocialNode[];
  links: SocialEdge[];
}


export interface SimulationResponse {
    steps: SimulationStep[];
}

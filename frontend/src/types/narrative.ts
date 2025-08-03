// frontend/src/api/narrativeService.ts
export interface NarrativeRequest {
  frame: string;
  tone: string;
}

export interface NarrativeResponse {
  variant: string;
  emotion: string;
  virality_score: number;
}

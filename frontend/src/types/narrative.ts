// frontend/src/api/narrativeService.ts
export interface NarrativeRequest extends Record<string, string> {
  frame: string;
  tone: string;
  emotion: string;
}

export interface PlatformNarrativeRequest extends NarrativeRequest {
  platform: string;
  user_type: string;
}

export interface NarrativeResponse {
  content: string;
  variant: string;
  tone: string;
  emotion: string;
  format: string;
  virality_score: number;
}

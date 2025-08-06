

export interface SimpleFrameRequest extends Record<string, string | number> {
  url: string;
}

export interface PopularNarrativeRequest extends SimpleFrameRequest {
    num_articles: number;
}

export interface NarrativeFrame {
    id: number;
    frame: string;
    source: string;
    ideology: string;
    emotion: string;
    entities: string[];
}

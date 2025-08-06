import { type SimpleFrameRequest, type PopularNarrativeRequest, type NarrativeFrame } from "../types/frame";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
console.log(import.meta.env.VITE_API_URL);


export const generateFrameFromURL = async (
  payload: SimpleFrameRequest
): Promise<NarrativeFrame> => {
  const queryParams = new URLSearchParams({
    url: payload.url,
  });

  const response = await fetch(`${API_BASE_URL}/framer/from_url?${queryParams}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate narrative: ${errorText}`);
  }

  return response.json();
};

export const generatePopularFrames = async (
  payload: PopularNarrativeRequest
): Promise<NarrativeFrame[]> => {
  const queryParams = new URLSearchParams({
    num_articles: payload.num_articles.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/framer/popular?${queryParams}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate narrative: ${errorText}`);
  }

  return response.json();
};

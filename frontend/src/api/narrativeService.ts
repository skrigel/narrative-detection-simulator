import { type NarrativeRequest, type NarrativeResponse } from "../types/narrative";
const API_BASE_URL = import.meta.env.FAST_API_URL || "http://localhost:8000/api";

export const generateNarrative = async (payload: NarrativeRequest): Promise<NarrativeResponse> => {
  const response = await fetch(`${API_BASE_URL}/narratives/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to generate narrative");
  }

  return response.json();
};

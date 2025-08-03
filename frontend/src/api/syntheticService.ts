import { type NarrativeRequest, type NarrativeResponse, type PlatformNarrativeRequest } from "../types/narrative";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
console.log(import.meta.env.VITE_API_URL);

type AnyNarrativeRequest = NarrativeRequest | PlatformNarrativeRequest;

export const generateSyntheticNarrative = async (
  payload: AnyNarrativeRequest
): Promise<NarrativeResponse> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if ("platform" in payload) headers["platform"] = payload.platform;
  if ("user_type" in payload) headers["user_type"] = payload.user_type;

  const response = await fetch(`${API_BASE_URL}/synthetic/generate_completion`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate narrative: ${errorText}`);
  }

  return response.json();
};
import { type SimulationRequest, type SimulationResponse } from "../types/simulation";
const API_BASE_URL = import.meta.env.FAST_API_URL || "http://localhost:8000/api";

export const generateSimulation = async (payload: SimulationRequest): Promise<SimulationResponse> => {
  const response = await fetch(`${API_BASE_URL}/simulation/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to run simulation");
  }

  return response.json();
};

import { useState } from "react";
import { generateNarrative } from "../api/narrativeService";
import { type NarrativeRequest, type NarrativeResponse } from "../types/narrative";

export default function NarrativeLibraryView() {
  const [input, setInput] = useState<NarrativeRequest>({ frame: "", tone: "neutral" });
  const [result, setResult] = useState<NarrativeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const generated = await generateNarrative(input);
      setResult(generated);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Generate Narrative</h2>

      <input
        type="text"
        placeholder="Narrative frame"
        className="border p-2 mb-2 w-full"
        value={input.frame}
        onChange={(e) => setInput({ ...input, frame: e.target.value })}
      />

      <select
        value={input.tone}
        onChange={(e) => setInput({ ...input, tone: e.target.value })}
        className="border p-2 mb-4 w-full"
      >
        <option value="neutral">Neutral</option>
        <option value="angry">Angry</option>
        <option value="supportive">Supportive</option>
      </select>

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Generate
      </button>

      {result && (
        <div className="mt-4 p-4 border bg-gray-50">
          <p><strong>Variant:</strong> {result.variant}</p>
          <p><strong>Emotion:</strong> {result.emotion}</p>
          <p><strong>Virality Score:</strong> {result.virality_score}</p>
        </div>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
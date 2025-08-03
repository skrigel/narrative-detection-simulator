import { useState } from "react";
import { type NarrativeResponse } from "../types/narrative"


type NarrativeRequestBase = {
  frame: string;
  tone: string;
  emotion: string;
  [key: string]: string | undefined; // Allow extension (e.g., platform, user_type)
};


interface NarrativeGeneratorProps<T extends NarrativeRequestBase> {
  title: string;
  initialRequest: T;
  generator: (payload: T) => Promise<NarrativeResponse>;
}

export default function NarrativeGenerator<T extends NarrativeRequestBase>({
  title,
  initialRequest,
  generator,
}: NarrativeGeneratorProps<T>) {
  const [input, setInput] = useState<T>(initialRequest);
  const [result, setResult] = useState<NarrativeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!input.frame || !input.tone || !input.emotion) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const generated = await generator(input);
      setResult(generated);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-7xl px-4 border-gray-300">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">{title}</h2>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Narrative frame"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          value={input.frame}
          onChange={(e) => setInput({ ...input, frame: e.target.value })}
        />

        <input
          type="text"
          placeholder="Emotion (e.g. fear, anger)"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          value={input.emotion}
          onChange={(e) => setInput({ ...input, emotion: e.target.value })}
        />

        <select
          value={input.tone}
          onChange={(e) => setInput({ ...input, tone: e.target.value })}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        >
          <option value="">Select tone</option>
          <option value="neutral">Neutral</option>
          <option value="negative">Negative</option>
          <option value="positive">Positive</option>
        </select>

        {("platform" in input || "user_type" in input) && (
          <>
            {"platform" in input && (
              <input
                type="text"
                placeholder="Platform (e.g. Twitter, TikTok)"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                value={input.platform}
                onChange={(e) => setInput({ ...input, platform: e.target.value })}
              />
            )}
            {"user_type" in input && (
              <input
                type="text"
                placeholder="User Type (e.g. bot, influencer)"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                value={input.user_type}
                onChange={(e) => setInput({ ...input, user_type: e.target.value })}
              />
            )}
          </>
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Generate
        </button>
      </div>

      {result && (
        <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
          <p className="mb-2">
            <span className="font-semibold">Narrative Content:</span> {result.content}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Variant:</span> {result.variant}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Emotion:</span> {result.emotion}
          </p>
          <p>
            <span className="font-semibold">Virality Score:</span> {result.virality_score}
          </p>
        </div>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
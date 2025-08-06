import { useState } from "react";
import FrameResultWrapper from "../pages/FrameResultWrapper";
import { type NarrativeFrame } from "../types/frame";

type FramerRequestBase = {
  url?: string;
  [key: string]: string | number | undefined;
};

interface FramerGeneratorProps<T extends FramerRequestBase> {
  title: string;
  type: string;
  initialRequest: T;
  framer: (payload: T) => Promise<NarrativeFrame | NarrativeFrame[]>;
}

export default function FramerGenerator<T extends FramerRequestBase>({
  title,
  type,
  initialRequest,
  framer,
}: FramerGeneratorProps<T>) {
  const [input, setInput] = useState<T>(initialRequest);
  const [result, setResult] = useState<NarrativeFrame | NarrativeFrame[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!input.url && type !== "popular") {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      setResult(null);
      const frames = await framer(input);
      setResult(frames);
      setIsLoading(false);
      setError(null);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-7xl px-4 border-gray-300">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">{title}</h2>

      {type === "basic" && (
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="URL to extract from"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={input.url || ""}
            onChange={(e) => setInput({ ...input, url: e.target.value })}
          />
        </div>
      )}

      <button 
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-5 py-2 mb-6 rounded hover:bg-blue-700 transition"
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>

      <FrameResultWrapper result={result} />

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
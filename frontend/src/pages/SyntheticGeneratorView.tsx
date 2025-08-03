import NarrativeGenerator from "../components/NarrativeGenerator";
import { generateSyntheticNarrative } from "../api/syntheticService";
import { type NarrativeRequest, type PlatformNarrativeRequest } from "../types/narrative";
import { useState } from "react";

export default function SyntheticGeneratorView() {
  const [narrativeType, setNarrativeType] = useState<"basic" | "platform">("basic");

  return (
    <>
    {/* <div className="max-w-4xl mx-auto bg-gray-500 rounded-2xl max-w-10xl">
      <header>Generate synthetic narratives for various sentiments, topics, and platforms.</header>
    </div>
    */}
 
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-10 max-w-8xl mx-auto">
      {/* Left panel: Selector */}
      <div className="lg:w-1/4 w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Select Narrative Type</h2>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setNarrativeType("basic")}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              narrativeType === "basic"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Basic
          </button>
          <button
            onClick={() => setNarrativeType("platform")}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              narrativeType === "platform"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Platform-Specific
          </button>
        </div>
      </div>

      {/* Right panel: Generator */}
      <div className="lg:w-3/4 w-full">
        {narrativeType === "basic" && (
          <NarrativeGenerator<NarrativeRequest>
            title="Basic Narrative Generator"
            initialRequest={{ frame: "", tone: "", emotion: "" }}
            generator={generateSyntheticNarrative}
          />
        )}
        {narrativeType === "platform" && (
          <NarrativeGenerator<PlatformNarrativeRequest>
            title="Platform-Specific Generator"
            initialRequest={{ frame: "", tone: "", emotion: "", platform: "", user_type: "" }}
            generator={generateSyntheticNarrative}
          />
        )}
      </div>
    </div>
    </>

   
  );
}

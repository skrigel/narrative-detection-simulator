import NarrativeGenerator from "../components/NarrativeGenerator";
import FramerGenerator from "../components/FramerGenerator";
import { generateFrameFromURL, generatePopularFrames } from "../api/framerService";
import { generateSyntheticNarrative } from "../api/syntheticService";
import { type NarrativeRequest, type PlatformNarrativeRequest } from "../types/narrative";
import { useState } from "react";

export default function SyntheticGeneratorView() {
  const [narrativeType, setNarrativeType] = useState<"basic" | "platform">("basic");
  const [framerType, setFramerType] = useState<"basic" | "popular">("basic");

  return (
    <>
<div className="flex flex-col gap-10 px-4 py-10 max-w-8xl mx-auto">
  {/* --- Row 1: Narrative Generator --- */}
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Left: Narrative Selector */}
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

    {/* Right: Narrative Generator */}
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

  {/* --- Row 2: Framer Generator --- */}
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Left: Framer Selector */}
    <div className="lg:w-1/4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Select Framer Type</h2>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => setFramerType("basic")}
          className={`px-4 py-2 rounded-md border text-sm font-medium ${
            framerType === "basic"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setFramerType("popular")}
          className={`px-4 py-2 rounded-md border text-sm font-medium ${
            framerType === "popular"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Popular
        </button>
      </div>
    </div>

    {/* Right: Framer Generator */}
    <div className="lg:w-3/4 w-full">
      {framerType === "basic" && (
        <FramerGenerator
          title="Frame From URL"
          type="basic"
          initialRequest={{ url: "", emotion: "" }}
          framer={generateFrameFromURL}
        />
      )}
      {framerType === "popular" && (
        <FramerGenerator
          title="Popular Frame Generator"
          type="popular"
          initialRequest={{ url: "", num_articles: 5 }}
          framer={generatePopularFrames}
        />
      )}
    </div>
  </div>
</div>

</>
   
  );
}

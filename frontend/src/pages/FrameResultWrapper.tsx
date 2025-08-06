import SingleFrameDisplay from "../components/SingleFrameDisplay";
import MultipleFramesDisplay from "../components/MultipleFrameDisplay";
import { type NarrativeFrame } from "../types/frame";

export default function FrameResultWrapper({
  result,
}: {
  result: NarrativeFrame | NarrativeFrame[] | null;
}) {
  if (!result) {
    return (
      <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
        <p className="mb-2">No frame generated yet.</p>
      </div>
    );
  }

  if (Array.isArray(result)) {
    return <MultipleFramesDisplay frames={result} />;
  }

  return <SingleFrameDisplay frame={result} />;
}

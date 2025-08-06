import { type NarrativeFrame } from "../types/frame";

export default function MultipleFramesDisplay({ frames }: { frames: NarrativeFrame[] }) {
  return (
    <div className="space-y-4 mt-6">
      {frames.map((frame, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded shadow-sm p-6">
          <p className="mb-2">
            <span className="font-semibold">Frame Content:</span> {frame.frame}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Ideology:</span> {frame.ideology}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Relevant Entities:</span>{" "}
            {frame.entities.join(", ")}
          </p>
        <p className="mb-1">
        <span className="font-semibold">Source:</span> {frame.source}
      </p>
        </div>
      ))}
    </div>
  );
}

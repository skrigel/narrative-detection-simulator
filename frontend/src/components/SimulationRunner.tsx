// components/SimulationRunner.tsx
import React, { useState } from "react";
import { generateSimulation } from "../api/simulationService";
import { type SimulationRequest, type SimulationResponse } from "../types/simulation";
import ForceGraph from "./ForceGraph"; // your existing progressive graph visualizer

const defaultPayload: SimulationRequest = {
  num_nodes: 200,
  clusters: 4,
  steps: 15,
  model: "barabasi_albert",
  injection_type: "organic",
  rewiring_prob: 0.3,
};

const SimulationRunner: React.FC = () => {
  const [data, setData] = useState<SimulationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<SimulationRequest>(defaultPayload);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const result = await generateSimulation(config);
      setData(result);
    } catch (err) {
      console.error("Simulation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      
      {/* Control Panel */}
      <div className="bg-white rounded-lg p-6 max-w-4xl border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Network Parameters */}
          <div className="space-y-4">
            <h3 className="text-gray-800 text-lg font-semibold">Network Parameters</h3>
            
            <div>
              <label className="block text-gray-700 text-sm mb-1">Number of Nodes</label>
              <input
                type="number"
                min="100"
                max="2000"
                value={config.num_nodes}
                onChange={(e) => setConfig({...config, num_nodes: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-white text-gray-800 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm mb-1">Clusters/Connections</label>
              <input
                type="number"
                min="1"
                max="8"
                value={config.clusters}
                onChange={(e) => setConfig({...config, clusters: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-white text-gray-800 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm mb-1">Network Model</label>
              <select
                value={config.model}
                onChange={(e) => setConfig({...config, model: e.target.value as 'barabasi_albert'})}
                className="w-full px-3 py-2 bg-white text-gray-800 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              >
                {/* <option value="watts_strogatz">Watts-Strogatz (Small World)</option> */}
                <option value="barabasi_albert">Barabási-Albert (Scale-free)</option>
              </select>
            </div>
          </div>

          {/* Simulation Parameters */}
          <div className="space-y-4">
            <h3 className="text-gray-800 text-lg font-semibold">Simulation Parameters</h3>
            
            <div>
              <label className="block text-gray-700 text-sm mb-1">Max Steps</label>
              <input
                type="number"
                min="5"
                max="50"
                value={config.steps}
                onChange={(e) => setConfig({...config, steps: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-white text-gray-800 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm mb-1">Injection Type</label>
              <select
                value={config.injection_type}
                onChange={(e) => setConfig({...config, injection_type: e.target.value as 'organic'})}
                className="w-full px-3 py-2 bg-white text-gray-800 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              >
                <option value="organic">Organic Spread</option>
                {/* <option value="influencer">Influencer-driven</option> */}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm mb-1">Rewiring Probability</label>
              <input
                type="number"
                min="0.01"
                max="1.0"
                step="0.01"
                value={config.rewiring_prob}
                onChange={(e) => setConfig({...config, rewiring_prob: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 bg-white text-gray-800 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-800 text-lg font-semibold">Current Configuration</h3>
            <div className="bg-gray-50 rounded p-4 space-y-2 text-sm border border-gray-200">
              <div className="text-gray-700">
                <span className="text-blue-600 font-medium">Network:</span> {config.model === 'watts_strogatz' ? 'Small World' : 'Scale-free'}
              </div>
              <div className="text-gray-700">
                <span className="text-green-600 font-medium">Nodes:</span> {config.num_nodes.toLocaleString()}
              </div>
              <div className="text-gray-700">
                <span className="text-yellow-600 font-medium">Connections:</span> {config.clusters}
              </div>
              <div className="text-gray-700">
                <span className="text-purple-600 font-medium">Max Steps:</span> {config.steps}
              </div>
              <div className="text-gray-700">
                <span className="text-orange-600 font-medium">Spread:</span> {config.injection_type}
              </div>
              <div className="text-gray-700">
                <span className="text-red-600 font-medium">Rewiring:</span> {(config.rewiring_prob * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={runSimulation}
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
        >
          {loading ? 'Running Simulation...' : 'Run Simulation'}
        </button>
        
        {data && data.steps && data.steps.length > 0 && (
          <div className="mt-4 p-4 bg-green-50 rounded border-l-4 border-green-500">
            <p className="text-green-700 text-sm">
              ✓ Simulation executed with {config.num_nodes} nodes using {config.model} model
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        {data && data.steps && data.steps.length > 0 ? (
          <ForceGraph steps={data.steps} />
        ) : (
          <p className="text-gray-500 text-center py-8">
            No simulation data yet. Configure your parameters and click "Run Simulation" to begin.
          </p>
        )}
      </div>
    </div>
  );
};

export default SimulationRunner;
// const SimulationRunner: React.FC = () => {
//   const [data, setData] = useState<SimulationResponse | null>(null);
//   const [loading, setLoading] = useState(false);

//   const runSimulation = async () => {
//     setLoading(true);
//     try {
//       const result = await generateSimulation(defaultPayload);
//       setData(result);
//     } catch (err) {
//       console.error("Simulation failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Brand Narrative Simulation</h2>
//       <button onClick={runSimulation} disabled={loading}>
//         {loading ? "Running..." : "Run Simulation"}
//       </button>

//       {data && data.steps.length > 0 ? (
//         <ForceGraph steps={data.steps} />
//       ) : (
//         <p>No simulation data yet.</p>
//       )}
      
//     </div>
//   );
// };

// export default SimulationRunner;